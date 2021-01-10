import logging
import authentication
from errors import InvalidAPICall
from firestore import get_emissions

from flask import current_app, flash, Flask, Markup, redirect, render_template, jsonify, session
from flask import request, url_for
from google.cloud import error_reporting
import google.cloud.logging

app = Flask(__name__)

app.debug = False
app.testing = False

@app.route('/', methods=['GET', 'POST'])
def homepage():
    return '<h1>testing</h1>'

@app.route('/stuff')
def stuffpage():
    return '<h1>stuff</h1>'

@app.route('/emissions', methods=['GET', 'POST'])
def emissions():
    product = request.values.get("product")
    category = request.values.get("category")
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
        emissions = get_emissions('Category', category)
        if emissions is not None:
            # TODO: Insert Steven Function
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
    return f'{authentication.login(username,password)}'
    return jsonify(authentication.login(username, password))


@app.errorhandler(InvalidAPICall)
def handle_invalid_usage(error):
    ret = jsonify(error.to_dict())
    ret.status_code = error.status
    return ret

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)