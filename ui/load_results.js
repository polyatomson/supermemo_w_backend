
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
    
    // Adding a tooltip with an explanation
    // const colors_grammar = {1:"1 color", 2:"2 colors", 3:"3 colors", 4:"4 colors", 5: "All colors"}
    if (blacks_n > 0) {
        var expln_blacks = "Placed correctly: " + String(blacks_n) + " "
    }
    else {
        var expln_blacks = ""
    }
    if (whites_n > 0) {
        var expln_whites = "Misplaced: " + String(whites_n) + " "
    }
    else {
        var expln_whites = ""
    }
    var expln = expln_blacks + expln_whites
    var alltogether = blacks_n+whites_n
    if (alltogether == 0) {
        expln = "No match"
    }
    else {
        expln = "Color matches: " + String(alltogether) + " " + expln
    }
    
    var results_group = document.querySelectorAll('#' + row_id+' td.row_result')[0]
    results_group.setAttribute("data-bs-toggle", "tooltip")
    results_group.setAttribute("data-bs-placement", "right")
    results_group.setAttribute("title", expln)
    new bootstrap.Tooltip(results_group)

    }