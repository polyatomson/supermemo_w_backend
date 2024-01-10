from dataclasses import dataclass
from collections import Counter

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
