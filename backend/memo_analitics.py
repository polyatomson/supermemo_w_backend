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
    
    @staticmethod
    def load_guesses(guesses: dict[str, list[str]], results: dict[str, dict[str, int]]) -> 'Guesses':
        # {'guess1': ['blue', 'black', 'blue', 'blue', 'yellow']}
        # {'guess1': {'black': 0, 'white': 2}}
        attempts = list()
        for guess_id, color_list in guesses.items():
            attempt = Guess(line=color_list, 
                            black=results[guess_id]["black"], 
                            white=results[guess_id]["white"])
            attempts.append(attempt)
        return Guesses(attempts)


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

def create_a_hint(guesses: dict[str, list[str]], results: dict[str, dict[str, int]]):
    ready_guesses = Guesses.load_guesses(guesses, results)
    in_comb, not_in_comb, maybes = ready_guesses.colors_reduce()
    hint_ready = ""
    if len(in_comb) != 5:
        if in_comb != []:
            hint_ready += "In the combination: " + ", ".join(in_comb) + "\n"
        if not_in_comb != []:
            hint_ready += "NOT in the combination: " + ", ".join(not_in_comb) + "\n"
        if len(maybes) != 0:
            maybe_hint = ""
            for maybe in maybes.values():
                maybe_hint += f"Exactly {str(maybe[1])} out of {', '.join(maybe[0])}\n"
            hint_ready += maybe_hint
    else:
        hint_ready += "The correct color set is: " + ", ".join(in_comb)
    
    return hint_ready