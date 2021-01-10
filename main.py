import logging
from errors import InvalidAPICall
from firestore import get_emissions

from flask import current_app, flash, Flask, Markup, redirect, render_template,jsonify
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

@app.route('/product', methods=['GET', 'POST'])
def return_category():
    product = request.values.get("product")
    category = request.values.get("category")
    if category is None and product is None:
        raise InvalidAPICall('Please include product and/category in POST or GET.', 400)
    else:
        # search for product
        if product is not None:
            emissions = get_emissions('Product', product)
            if emissions is not None:
                # TODO: format and return product emissions
                return str(emissions)
        
        # search for category
        ret = get_emissions('Category', category)
        if ret is not None:
            # TODO: format and return category emissions
            return str(ret)
        else:
            return "error"

@app.errorhandler(InvalidAPICall)
def handle_invalid_usage(error):
    ret = jsonify(error.to_dict())
    ret.status_code = error.status
    return ret

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)