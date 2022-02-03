console.log("This is my First Bootstrap site")
showNotes();

// If a user add a note, add it to a local storage
let addbtn = document.getElementById('addbtn')

addbtn.addEventListener('click', function(e){
    let addtxt = document.getElementById("addtxt");
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    console.log(notesObj);
    showNotes();
})

//Function to show notes from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html ="";
    notesObj.forEach(function(element, index){
        html += `
        <div class="notecart my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="class-txt">${element}</p>
            <button id="${index}" onClick ="deleteNote(this.id)"  class="btn btn-primary">Delete Note</button>
        </div>
        </div>`;
    })

    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show! Use a "Note" above note section`
    }
}

//Function to delete a note
function deleteNote(index){
    // console.log("i am deleting", index);

    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");

search.addEventListener("input", function() {
    let inputVal = search.value.toLowerCase();
    let notecart = document.getElementsByClassName('notecart');
    Array.from(notecart).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardtxt);
        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    })
})