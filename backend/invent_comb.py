import random

def invent_comb():
    colors = ["white","yellow","blue","green","brown","black","red","orange"]
    cols = colors[:]
    comb = []
    for i in range(5):
        picked = random.choice(cols)
        comb.append(picked)
        cols.pop(cols.index(picked))
    return comb