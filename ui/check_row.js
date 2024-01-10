
function check_row(picked_colors, row_id) {
    console.log("checked_row input", picked_colors)
    console.log("row_id", row_id)
    var combination = localStorage.getItem("combination")
    combination = JSON.parse(combination)
    console.log("checking against", combination)
    var checked_colors = {}
    Object.keys(picked_colors).forEach(i => {
        var picked_color = picked_colors[i]
        console.log(picked_color in combination)
        if (combination.includes(picked_color)) {
            console.log('in combination', picked_color)
            if (picked_color == combination[i]) {
                checked_colors[picked_color] = 1
            }
            else {
                if (!(Object.keys(checked_colors).includes(picked_color))) {
                checked_colors[picked_color] = 0
                }
            }
        }
    })
    console.log(checked_colors)
    
    var blacks = []
    var whites = []
    Object.keys(checked_colors).forEach(function(color) {
        if (checked_colors[color] == 0) {
            whites.push(color)
        }
        else {
            blacks.push(color)
        }
    })
    console.log('blacks', blacks)
    console.log('whites', whites)
    var pins = document.querySelectorAll('#' + row_id+' td.row_result span.pin')
    // var pins = new_res.querySelector(".pin")
    console.log(pins)
    var blacks_n = Object.keys(blacks)
    console.log(blacks_n)
    blacks_n.forEach(function(i){
        pins[i].classList.add('black')
        // console.log(pins[i])
    })
    var whites_n = Object.keys(whites)
    console.log(whites_n)
    var next_pin = blacks.length
    console.log('next_pin', next_pin)
    whites_n.forEach(function(i){
        var next = String(next_pin+Number(i))
        console.log('next', next)
        pins[next].classList.add('white')
        // console.log(pins[blacks_n+1])
    })
    if (blacks.length == 5) {
        // var table = document.getElementById("guesses")
        // var blank = table.getElementById("blank")
        const node = document.getElementById("blank");
        if (node.parentNode) {
                node.parentNode.removeChild(node);
        }
        var marble_set = document.getElementById("marble_set")
        marble_set.innerHTML = '<h3>Congratulations, you won!</h3>'
    }

    }