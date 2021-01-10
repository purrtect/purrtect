from cat import Cat
import logging
import authentication
from share import share
from errors import InvalidAPICall, AuthenticationError
from firestore import get_emissions, new_product, make_cat, get_cat
from carbon_footprint_calculator import carbon_footprint

from flask import current_app, flash, Flask, Markup, redirect, render_template, jsonify, session
from flask import request, url_for
from google.cloud import error_reporting
import google.cloud.logging

app = Flask(__name__)

app.secret_key = '\x16\xbe8\xff\x0e\xed;\x80\x8d\xec3R.\xc3\x7f\xfdN\xc7\xb4&\xdc3\xa9'
app.config['SESSION_TYPE'] = 'redis'

app.debug = False
app.testing = False

@app.route('/', methods=['GET', 'POST'])
def homepage():
    return '<h1>testing</h1>'

@app.route('/stuff')
def stuffpage():
    return '<h1>stuff</h1>'

# /emissions
# params (GET OR POST):
#   product: product name
#   category: category name
#   isPrime: true or false - is prime delivery offered
#   weight: mass of the object
#   zip1: source zip/postal code
#   zip2: destination zip/postal code
@app.route('/emissions', methods=['GET', 'POST'])
def emissions():
    product = request.values.get("product")
    category = request.values.get("category")
    isPrime = True if request.values.get("isPrime").lower() == 'true' else False if request.values.get("isPrime").lower() == 'false' else None
    # I understand that weight is measured in Newtons and this variable should be mass,
    # but steven made his function take in weight, and therefore the variable is called weight.
    weight = request.values.get("weight")
    price = float(request.values.get("price")) if request.values['price'] is not None else None
    zip1 = request.values.get("zip1")
    zip2 = request.values.get("zip2")
    if category is None and product is None:
        raise InvalidAPICall('Please include product and/category in POST or GET.', 400)
    else:
        # get cat
        cat = Cat('placeholder', 0)

        # search for product
        if product is not None:
            prod = get_emissions('Product', product)
            if prod is not None:
                emissions_orig = prod[0]
                zip2 = prod[1]
                emissions = carbon_footprint(isPrime, emissions_orig, zip1, zip2, weight)
                return jsonify({
                    'type': 'product',
                    'name': product,
                    'emissions':
                    {
                        'total_emissions': emissions[0],
                        'shipping_emissions': emissions[1],
                        'product_emissions': emissions[2]
                    },
                    'loc1': emissions[3][0] if emissions[4] is not None else None,
                    'loc2': emissions[4][0] if emissions[4] is not None else None,
                    'success': True,
                    'hp_change': cat.get_hp_from_carbon(emissions[0], price) if cat else 'N/A'
                })
        
        # search for category
        if isPrime is None:
            raise InvalidAPICall('Please include isPrime, weight, zip1, and zip2 in POST or GET if using category.', 400)
        emissions_orig = get_emissions('Category', category)

        if emissions_orig is not None:
            if product is not None:
                # cache product emissions
                new_product(product, emissions_orig, zip2)
            
            emissions = carbon_footprint(isPrime, emissions_orig, zip1, zip2, weight)
            return jsonify({
                'type': 'category',
                'name': category.lower(),
                'emissions':
                {
                    'total_emissions': emissions[0],
                    'shipping_emissions': emissions[1],
                    'product_emissions': emissions[2]
                },
                'loc1': emissions[3][0] if emissions[4] is not None else None,
                'loc2': emissions[4][0] if emissions[4] is not None else None,
                'success': True,
                'hp_change': cat.get_hp_from_carbon(emissions[0], price) if cat else 'N/A'
            })
        else:
            return jsonify({
                'isPrime': isPrime,
                'emissions': emissions_orig,
                'zip1': zip1,
                'zip2': zip2,
                'success': False
            })

@app.route('/authentication', methods=['GET', 'POST'])
def auth():
    # replace with request.form in deployment
    username = request.values["username"]
    password = request.values["password"]
    if authentication.login(username,password):
        session['authenticated'] = True
        session['username'] = username
        return jsonify({
            "success": True,
            "username": username
        })
    else:
        return jsonify({
            "success": False
        })
    # return jsonify(authentication.login(username, password))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    # replace with request.form in deployment
    username = request.values["username"]
    password = request.values["password"]
    if authentication.signup(username,password):
        return jsonify({
            'success': True,
            'user_exists': False,
            'username': username
        })
    else:
        return jsonify({
            'success': False,
            'user_exists': True,
            'username': username
        })

@app.route('/catcreation', methods=['GET', 'POST'])
def cat_creation():
    cat_name = request.values["name"]
    if not session['authenticated'] == None and session['authenticated']:
        cat = make_cat(session['username'], cat_name)
        return jsonify({
            'success': True,
            'cat': cat.to_dict(),
            'username': session['username']
        })
    else:
        raise AuthenticationError()

@app.route('/cat', methods=['GET', 'POST'])
def ret_cat():
    if not session['authenticated'] == None and session['authenticated']:
        cat = get_cat(session['username']).to_dict()
        if not cat:
            return jsonify({
                'success': False,
                'cat_created': False,
                'username': session['username']
            })
        else:
            return jsonify({
                'success': True,
                'cat_created': True,
                'username': session['username'],
                'cat': cat
            })
    else:
        raise AuthenticationError()

@app.route('/share', methods=['GET', 'POST'])
def get_social_url():
    site = request.values['site']
    subject = request.values['subject']
    message = request.values['message']
    link = request.values['link']
    if subject is None:
        subject = ''
    if message is None:
        message = ''
    ret_link = share(site, subject, message, link)
    return redirect(ret_link, code=302)

@app.route('/debug', methods=['GET', 'POST'])
def debug():
    return f"{session['authenticated']} | {session['username']}"

@app.route('/user', methods=['GET', 'POST'])
def get_user():
    # get user from firestore
    user = authentication.get_user(session['username'])
    del user['password']
    del user['salt']
    return jsonify(user)

@app.errorhandler(InvalidAPICall)
def handle_invalid_usage(error):
    ret = jsonify(error.to_dict())
    ret.status_code = error.status
    return ret

@app.errorhandler(AuthenticationError)
def handle_invalid_auth(error):
    ret = jsonify(error.to_dict())
    ret.status_code = error.status
    return ret


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)