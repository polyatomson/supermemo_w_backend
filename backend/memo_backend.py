from flask import Flask, request, jsonify
import flask
import json
import random
from memo_analitics import Guess, Guesses
import os

app = Flask(__name__, template_folder=os.path.dirname(__file__))


@app.route('/', methods=['GET', 'POST'])
def main_page():
    return flask.render_template('index.html')

@app.route('/get_input', methods=['POST'])
def get_color_line():
    return "Getting user's colors"

colors = ["white","yellow","blue","green","brown","black","red","orange"]

def invent_comb():
    cols = colors[:]
    comb = []
    for i in range(5):
        picked = random.choice(cols)
        comb.append(picked)
        cols.pop(cols.index(picked))
    return comb

def check_line(user_line: list[str], comb: list[str]):
    checked_colors = {}
    for i, c in enumerate(user_line):
        if c in comb:
            if i == comb.index(c):
                # if c not in checked_colors or checked_colors[c] == 'white':
                checked_colors[c] = 'black'
            else:
                if c not in checked_colors:
                    checked_colors[c] = 'white'
    black = sum([1 for res in checked_colors.values() if res == 'black'])
    white = sum([1 for res in checked_colors.values() if res == 'white'])
    return black, white

def game():
    mycomb = invent_comb()
    black = 0
    n_tries = 0
    checked_lines = Guesses([])
    while black != 5:
        try:
            user_inp = get_input()
            n_tries += 1
        except Exception as ex:
            print(ex)
            continue
        black, white = check_line(user_inp, mycomb)
        
        record = Guess(line=user_inp, black=black, white=white)
        checked_lines.guesses.append(record)

        black_numb = 's' if black != 1 else ''
        white_numb = 's' if white != 1 else ''
        print(f"{str(black)} black{black_numb}, {str(white)} white{white_numb}")
        
        in_comb, not_in_comb, maybes = checked_lines.colors_reduce()
        
        if len(in_comb) != 5:
            if in_comb != []:
                print("Hint: in the combination:", ", ".join(in_comb))
            if not_in_comb != []:
                print("Hint: NOT in the combination:", ", ".join(not_in_comb))            
            if len(maybes) != 0:
                print("Hint:")
                for maybe in maybes.values():
                    print(f"exactly {str(maybe[1])} out of {', '.join(maybe[0])}")
        else:
            ("The correct color set is:", ", ".join(in_comb))
        print()


    print(f"Congratulations, you won in {str(n_tries)} tries")

if __name__ == '__main__':
    app.run("localhost", 6969)