

function create_combination() {
    fetch (API+'/create_comb', {    
    method: 'GET',
    headers: {
        "Content-Type": "application/json"
      }
    }).then(function (resp) {
        return resp.json()
    }).then(function (resp_json) {
        // console.log(resp_json)
        return resp_json
    }).then(function (combination) {
        localStorage.setItem("combination", JSON.stringify(combination))
    });    
}