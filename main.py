import logging
import authentication
from errors import InvalidAPICall
from firestore import get_emissions
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
    zip1 = request.values.get("zip1")
    zip2 = request.values.get("zip2")
    if category is None and product is None:
        raise InvalidAPICall('Please include product and/category in POST or GET.', 400)
    else:
        # search for product
        if product is not None:
            emissions = get_emissions('Product', product)
            if emissions is not None:
                return jsonify({
                'type': 'product',
                'name': product.lower(),
                'emissions': emissions,
                'success': True
            })
        
        # search for category
        if isPrime is None or weight is None or zip1 is None or zip2 is None:
            raise InvalidAPICall('Please include isPrime, weight, zip1, and zip2 in POST or GET if using category.', 400)
        emissions = get_emissions('Category', category)
        if emissions is not None:
            emissions = carbon_footprint(isPrime, emissions, zip1, zip2, weight)
            return jsonify({
                'type': 'category',
                'name': category.lower(),
                'emissions': emissions,
                'success': True
            })
        else:
            return jsonify({
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

@app.route('/debug', methods=['GET'])
def debug():
    return f"{session['authenticated']} | {session['username']}"

@app.errorhandler(InvalidAPICall)
def handle_invalid_usage(error):
    ret = jsonify(error.to_dict())
    ret.status_code = error.status
    return ret

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)