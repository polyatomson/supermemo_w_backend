
function display_row_results(row_id, row_results) {
    console.log("displaying results for", row_id)
    
    var pins = document.querySelectorAll('#' + row_id+' td.row_result span.pin')
    // console.log(pins)
    var blacks_n = row_results["black"]
    for (let index = 0; index < blacks_n; index++) {
        pins[index].classList.add('black')
        
    }
    var whites_n = row_results["white"]
    for (let index = blacks_n; index < whites_n+blacks_n; index++) {
        pins[index].classList.add('white')
        
    }
    if (blacks_n == 5) {
        const blank_node = document.getElementById("blank");
        if (blank_node.parentNode) {
            blank_node.parentNode.removeChild(blank_node);
        }

        const overall_guesses = JSON.parse(localStorage.getItem("guesses"))
        const n_guesses = Object.keys(overall_guesses).length
        var marble_set = document.getElementById("marble_set")
        marble_set.innerHTML = '<h3>Congratulations, you won in <mark>' + String(n_guesses) + '</mark> guesses! </h3>'
    }

    }