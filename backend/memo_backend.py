from flask import Flask, request, jsonify
import config
from invent_comb import invent_comb
from check_line import check_line
# import flask
import json
# import random
# from memo_analitics import Guess, Guesses
# import os

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def main_page():
    return 'api'

@app.route('/create_comb', methods=['GET'])
def pass_comb():
    combination = invent_comb()
    return jsonify(combination)

@app.route('/check_line', methods=['GET','POST'])
def get_color_line():
    data = request.get_json()
    print(type(data))
    # data = json.loads(data)
    user_line = data["input_line"]
    combination = data["combination"]
    row_result = check_line(user_line, combination)
    return jsonify(row_result)

@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', config.UI_SERVER)
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response


if __name__ == '__main__':
    app.run("localhost", config.API_SERVER)