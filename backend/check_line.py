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