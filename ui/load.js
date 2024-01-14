const API = 'http://localhost:7000'

function restore_from_storage(e) {
    // console.log('local storage', localStorage)
    if (localStorage.length == 0) {
        console.log("creating a new combination")
        create_combination()
        localStorage.setItem('results',JSON.stringify({}))
        localStorage.setItem('guesses',JSON.stringify({}))
}
    else {
    console.log("restoring the game")
    // getting the saved row color sets
    var row_records = JSON.parse(localStorage.getItem("guesses"))
    var row_results = JSON.parse(localStorage.getItem("results"))
    
    // creating a table row for each saved row
    var table = document.getElementById("guesses")
    var i = 0
    for (row_id in row_records) {
        var restored_row = table.insertRow(i)
        i++
        restored_row.id = row_id
        restored_row.innerHTML = `<td class="duplicate align-middle"></td>
        <td id='input1' class="positions">
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
        // coloring 5 marbles
        for (each_index in [0,1,2,3,4]) {
            var restored_color = restored_colors[each_index]
            var coloring_marble = marbles[each_index]
            coloring_marble.classList.add(restored_color)
        }
        
        // adding the duplicate button
        duplicate_cell = restored_row.querySelectorAll(".duplicate")[0]
        duplicate_cell.innerHTML = '<a data-bs-toggle="tooltip" data-bs-placement="left" title="Duplicate this row"><img src="assets/copy_icon.svg" width="25"></a>'
        duplicate_cell.children[0].id = row_id+'_dupl'
        duplicate_cell.children[0].addEventListener('click', duplicate_row)
        new bootstrap.Tooltip(duplicate_cell.children[0])
        
        // adding the row result
        var restored_result = row_results[row_id]
        display_row_results(row_id, restored_result)
        
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