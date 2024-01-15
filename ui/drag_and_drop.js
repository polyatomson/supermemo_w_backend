
  function handleDragStart(e) {
    e.dataTransfer.items.add(e.target.classList, "text_class");
    // console.log("moving from", this.id)
    e.dataTransfer.items.add(this.id, "text_id");
    
  }

  function handleDragEnd(e) {    
  };

  function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('over');
    return false;
  }

  function handleDragEnter(e) {
    // console.log(e);
    // this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    e.stopPropagation(); // stops the browser from redirecting.
    this.classList.remove('over');
    var new_class = e.dataTransfer.getData("text_class");
    var previous_id = e.dataTransfer.getData("text_id");
    var blank_line = document.getElementById("blank")
    // console.log("previous_id", previous_id)
    if (e.target.classList[0] == "marble") {
        if (previous_id !== '') {
            var previous_cell = blank_line.querySelector('#'+previous_id)
            // console.log("previous cell", previous_cell)
            previous_cell.children[0].classList = e.target.classList
          }
        e.target.classList = new_class;
        e.target.draggable = true;
    }
    else {
        if (previous_id !== '') {
          var previous_cell = blank_line.querySelector('#'+previous_id)
            // console.log("previous cell", previous_cell)
            previous_cell.children[0].classList = e.target.children[0].classList
          }
        e.target.children[0].classList = new_class
        e.target.children[0].draggable = true;
    }
  };

  let colors = document.querySelectorAll('.colors');
    // console.log(colors)
    colors.forEach(function (color) {
        color.addEventListener('dragstart', handleDragStart);
        color.addEventListener('dragleave', handleDragLeave);
        color.addEventListener('dragend', handleDragEnd);
        
  });

  let positions = document.querySelectorAll('#blank td.positions');
    // console.log(positions)
    positions.forEach(function (position) {
        position.addEventListener('dragstart', handleDragStart);
        position.addEventListener('dragover', handleDragOver);
        position.addEventListener('dragenter', handleDragEnter);
        position.addEventListener('dragleave', handleDragLeave);
        position.addEventListener('dragend', handleDragEnd);
        position.addEventListener('drop', handleDrop);
    });


function reset_row() {
  let positions_current = document.querySelectorAll('#blank td.positions');
  positions_current.forEach(function (position) {
    var pos_classes = position.children[0].classList
    // console.log('pos_classes', pos_classes)
    if (pos_classes.length > 1) {
      pos_classes.remove(pos_classes[1])
      position.children[0].draggable = false
    }
  });
}
  let reset_btn = document.getElementById('input_reset')
  reset_btn.addEventListener('click', reset_row)
  
function provide_color_hint() {
  console.log("Fetching a hint")
  const guesses = JSON.parse(localStorage.getItem("guesses"))
  const results = JSON.parse(localStorage.getItem("results"))
  const data_for_hint = {"guesses": guesses, "results": results}

  var hint_area = document.getElementById("hint_area")
  if (hint_area.children.length == 0) {
    hint_area.innerHTML = `<div class="alert alert-warning alert-dismissible fade show mt-4" role="alert" id="hinting">
        <p id="hinting_message"></p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">&times;</button>
      </div>`
  }
  var hint_message = document.getElementById("hinting_message")

  fetch (API+'/hint', {    
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
      },
    body: JSON.stringify(data_for_hint)
    }).then(function (resp) {
        return resp.text()
    }).then(function (resp_text) {
        console.log(resp_text)
        hint_message.innerHTML = resp_text
    });    

}