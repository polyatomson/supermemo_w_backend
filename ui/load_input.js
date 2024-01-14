function get_row() {
    var table = document.getElementById("guesses")
    submitted_row = document.getElementById("blank")
    marbles = submitted_row.querySelectorAll('.marble')
    
    // collecting the picked color set
    var picked_colors = Array()
    marbles.forEach(marble => {
        // console.log(marble.classList[1])
        if (marble.classList[1] !== undefined) {
            picked_colors.push(marble.classList[1])
        }
        else {
            return false
        }
    });
    
    // checking if all the 5 positions are filled
    if (picked_colors.length != 5) {
        alert('All positions should be filled')
        return false
    }

    // assigning an incremented id to the filled row
    var row_lengths = table.rows.length
    var new_id = 'guess'+String(row_lengths)
    submitted_row.id = String(new_id)
    
    // adding the "duplicate" button for the submitted row
    var duplicate_cell = submitted_row.querySelectorAll(".duplicate")[0];
    duplicate_cell.innerHTML = '<a data-bs-toggle="tooltip" data-bs-placement="left" title="Duplicate this row"><img src="assets/copy_icon.svg" width="25"></a>';
    duplicate_button = duplicate_cell.children[0];
    duplicate_button.id = new_id+"_dupl"
    new bootstrap.Tooltip(duplicate_button)
    duplicate_button.addEventListener('click', duplicate_row)

    // adding the filled row records to the local storage
    var previous_guesses_str = localStorage.getItem('guesses')
    var previous_guesses = JSON.parse(previous_guesses_str)
    previous_guesses[new_id] = picked_colors
    localStorage.setItem('guesses', JSON.stringify(previous_guesses))

    // sending the row to the api for evaluation and displaying results
    
    var evaluate_info = {"input_line": picked_colors, "combination": JSON.parse(localStorage.getItem("combination"))}
    fetch (API+'/check_line', {    
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
      },
    body: JSON.stringify(evaluate_info),
    }).then(function (resp) {
        return resp.json()
    }).then(function (resp_json) {
        // console.log(resp_json)
        var allresults = JSON.parse(localStorage.getItem("results"))
        allresults[new_id] = resp_json
        localStorage.setItem("results", JSON.stringify(allresults))
        return resp_json
    }).then(function (resp_json){
        display_row_results(new_id, resp_json)
    });

    // removing listeners from the filled row
    cells = submitted_row.querySelectorAll('td.positions')
    cells.forEach(cell => {
        cell.removeAttribute('id')
        cell.removeEventListener('dragstart', handleDragStart);
        cell.removeEventListener('drop', handleDrop)
        cell.removeEventListener('dragover', handleDragOver)
        cell.removeEventListener('dragenter', handleDragEnter)
        cell.removeEventListener('dragend', handleDragEnd)
        cell.removeEventListener('dragleave', handleDragLeave)
        cell.children[0].draggable = false
        });

    // adding a new blank row at the bottom of the table
    var row = table.insertRow(-1)
    row.id = 'blank'
    row.innerHTML = `<td class="duplicate align-middle"></td>
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
    
    // adding listeners to the newly added blank row
    let positions = document.querySelectorAll('#blank td.positions')
    // console.log(positions)
        positions.forEach(function (position) {
            position.addEventListener('dragstart', handleDragStart);
            position.addEventListener('dragstart', handleDragStart);
            position.addEventListener('dragover', handleDragOver);
            position.addEventListener('dragenter', handleDragEnter);
            position.addEventListener('dragleave', handleDragLeave);
            position.addEventListener('dragend', handleDragEnd);
            position.addEventListener('drop', handleDrop);
        });
    
    };

// for the button "suggest a random row"
function generate_row() {
    console.log('generating a random row')
    var blank_marbles = document.querySelectorAll("#blank .marble")
    const possible_colors = ["white","yellow","blue","green","brown","black","red","orange"]
    for (each_marble of blank_marbles) {
        picked = possible_colors[Math.floor(Math.random()*possible_colors.length)];
        each_marble.className = "marble"
        each_marble.classList.add(picked)
        each_marble.draggable = true
    }
}

function duplicate_row(e) {
    console.log('duplicating a row')
    var blank_marbles = document.querySelectorAll("#blank .marble")
    var source_row_id  = e.currentTarget.id
    source_row_id = source_row_id.split('_')[0]
    var source_marbles = JSON.parse(localStorage.getItem("guesses"))[source_row_id]
    for (let index = 0; index < 5; index++) {
        blank_marbles[index].className = "marble"
        blank_marbles[index].classList.add(source_marbles[index])
        blank_marbles[index].draggable = true
    }
}

subm_button = document.getElementById("input_submit")
subm_button.addEventListener('click', get_row);
subm_button = document.getElementById("submit_random")
subm_button.addEventListener('click', generate_row);
