//Display notes on load
var loadContent = document.getElementById('notes_container');
window.addEventListener('load', getRequest);
var noteData;
function getRequest(event) {
    event.preventDefault();
    fetch('/notes')
    .then((response) => response.json())
    .then(function(data) {
        noteData = data;
           for (var i in data) {
                let textExcerpt = data[i].noteText.slice(0, 100);
               document.getElementById("notes_container").innerHTML += 
                    
                    '<a data-toggle="modal" data-target="#exampleModal"><div class="card single_note" onClick="grabId(this)" id="note_'+ i +'">' +
                    '<img src="https://i1.wp.com/tinyleaps.fm/wp-content/uploads/2020/05/uqyhjogyxyy-scaled.jpg" class="card-img-top" alt="...">' +
                    '<div class="card-body">' +
                    '<p class="card-title">' + 
                    data[i].noteTitle + 
                    '</p> <p class="card-text">'+
                    textExcerpt + '<br /><br />View Note</div> </div></a>'
                    
            } 
            
    });
       
}


//Search notes by title
var searchContent = document.getElementById('search');
searchContent.addEventListener('submit', getByTitle);

function getByTitle(event) {  
    event.preventDefault();
    
    document.getElementById("notes_container").innerHTML = "";
    var noteName = event.target.q.value;
   
    fetch(`/notes/search?q=${noteName}`)
    .then((response) => response.json())
    .then(function(data) {
        for (var i in data) {
            let textExcerpt = data[i].noteText.slice(0, 100);
            document.getElementById("notes_container").innerHTML += 
                    
                    '<div class="card single_note">' +
                    '<img src="https://i1.wp.com/tinyleaps.fm/wp-content/uploads/2020/05/uqyhjogyxyy-scaled.jpg" class="card-img-top" alt="...">' +
                    '<div class="card-body">' +
                    '<p class="card-title">' + 
                    data[i].noteTitle + 
                    '</p> <p class="card-text">'+
                    textExcerpt + '<br /><br />View Note</div> </div>'
            
        }
   
    });
                           
}

//Create new note
var createNote = document.getElementById('create_note');
createNote.addEventListener('submit', newNote);

function newNote(event, post) {
    console.log("Hello from inside the function");
    var noteTitle = event.target.noteTitle.value;
    var noteText = event.target.noteText.value;
    
    post = {
        noteTitle: noteTitle,
        noteText: noteText
    }
    
    const options = {
        method: 'POST',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    
    return fetch('/notes', options) 
        .then (res => res.json())
        .then (res => console.log(res))
        .then (error => console.error('error: ', error));
}


//Edit note

function grabId(card) {
    var openNote = document.getElementById(card.id);
    var noteTitle = document.getElementById('newNoteTitle');
    var noteText = document.getElementById('newNoteText');
    var integer = /[0-9]/;

   for (var i in noteData) {
        if (integer.test(openNote.id) == i) {
            noteTitle.value = noteData[i-1].noteTitle;
            noteText.value = noteData[i-1].noteText;
            
        }
    }
    

}






       



