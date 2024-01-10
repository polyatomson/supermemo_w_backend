import random
from dataclasses import dataclass
from collections import Counter
from typing import Optional

@dataclass
class Guess:
    line: list[str]
    black: int
    white: int

    def analize_colors(self, checked):
        cols = Counter(self.line)
        cols = [c for c in cols if checked[c] != 0]
        definite = [c for c in cols if checked[c] == 1]
        confirmed = self.black+self.white
        if len(cols) == confirmed:
            for c in cols:
                if checked[c] is None:
                    checked[c] = 1
        elif len(definite) == confirmed:
            for c in cols:
                if checked[c] is None:
                    checked[c] = 0
        
        return checked
    
    def maybe(self, checked):
        cols = Counter(self.line)
        definite = [c for c in cols if checked[c] == 1]
        confirmed = self.black+self.white
        n_unaccounted = confirmed - len(definite)
        if n_unaccounted > 0:
            possible = [c for c in cols if checked[c] is None]
            return possible, n_unaccounted
        else:
            return None

@dataclass
class Guesses:
    guesses: list[Guess]
    
    def checked_colors(self):
        checked = {}
        for g in self.guesses:
            for c in g.line:
                if g.black == 0 and g.white == 0:
                    checked[c] = 0 # impossible
                elif c not in checked:
                    checked[c] = None # possible
        return checked
    
    def colors_reduce(self):
        checked = self.checked_colors()

        for g in self.guesses:
            checked  = g.analize_colors(checked)
        for g in reversed(self.guesses):
            checked = g.analize_colors(checked)

        maybes = {}
        for i, g in enumerate(self.guesses):
            maybe = g.maybe(checked)
            if maybe is not None:
                maybes[i] = maybe

        in_comb = [c for c, res in checked.items() if res == 1]
        not_in_comb = [c for c, res in checked.items() if res == 0]

        return in_comb, not_in_comb, maybes


colors = {"w":"white",
          "y":"yellow",
          "l":"blue",
          "g":"green",
          "b":"brown",
          "k":"black",
          "r":"red",
          "o":"orange"}

def invent_comb():
    cols = list(colors.values())
    comb = []
    for i in range(5):
        picked = random.choice(cols)
        comb.append(picked)
        cols.pop(cols.index(picked))
    return comb


def get_line():
    guess = input("Insert your guess: ")
    guess = guess.split(" ")
    try:
        assert len(guess) == 5
    except:
        raise AssertionError("Check the length of the input")
    try:
        guess = [colors[g] for g in guess]
        return guess
    except:
        raise Exception("looks like you misspelled the color code")

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


def round():
    mycomb = invent_comb()
    # mycomb = ['orange', 'black', 'brown', 'white', 'yellow']
    black = 0
    n_tries = 0
    checked_lines = Guesses([])
    while black != 5:
        try:
            user_inp = get_line()
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

round()