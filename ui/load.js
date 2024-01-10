function restore_from_storage(e) {
    console.log('local storage', localStorage)
    if (localStorage.length == 0) {
      create_combination()
    //   console.log('comb', combination)
    //   return combination
    }
    
    else {
    var row_records = JSON.parse(localStorage.getItem("guesses"))
    console.log(row_records)
    var table = document.getElementById("guesses")
    var row_ids = []
    // for (row_id in row_records) {
    //     row_ids.push
    // }
    var i = 0
    for (row_id in row_records) {
        // var row_place = table.rows.length-i
        var restored_row = table.insertRow(i)
        i++
        restored_row.id = row_id
        restored_row.innerHTML = `<td class="positions" id='input1'>
    <span class="marble">1</span>
    </td>
    <td id='input2' class="positions">
    <span class="marble">2</span>
    </td>
    <td id='input3' class="positions">
    <span class="marble">3</span>
    </td>
    <td id='input4' class="positions">
    <span class="marble">4</span>
    </td>
    <td id='input5' class="positions">
    <span class="marble">5</span>
    </td>
    <td class="row_result">
                        <div>
                            <span class="pin"></span>
                            <span class="pin"></span>
                            <span class="pin"></span>
                        </div>
                        <div>
                            <span class="pin"></span>
                            <span class="pin"></span>
                        </div>
                    </td>`
        var marbles = restored_row.querySelectorAll('#'+row_id+' .marble')
        var restored_colors = row_records[row_id]
        // var restored_colors_ids = restored_colors.keys()
        console.log(restored_colors)
        console.log(restored_colors.keys())
        for (each_id in [0,1,2,3,4]) {
            var restored_color = restored_colors[each_id]
            var coloring_marble = marbles[each_id]
            console.log(coloring_marble)
            coloring_marble.classList.add(restored_color)
            console.log(marbles.classList)
        }
        check_row(restored_colors, row_id)
    };
  }
}
  
window.addEventListener("load", restore_from_storage)

function load_new_game(e) {
    var load_new = confirm('Are you sure you want to end this game and start a new one?')
    if (load_new == true) {
        localStorage.clear()
        location.reload()
    }
}

let new_game = document.getElementById("new_game")
new_game.addEventListener("click", load_new_game)