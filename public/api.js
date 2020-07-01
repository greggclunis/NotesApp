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
                    
                    '<a data-toggle="modal" data-target="#editModal"><div class="card single_note" onClick="grabId(this)" id="note_'+ i +'">' +
                    '<div class="card-body">' +
                    '<p class="card-title"><b>' + 
                    data[i].noteTitle + 
                    '</b></p> <p class="card-text">'+
                    textExcerpt + '</div> </div></a>'
                    
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
var editNoteId;
function grabId(card) {
    
//Get data from target note and print to modal screen 
const openNote = document.getElementById(card.id);
const noteTitle = document.getElementById('editNoteTitle');
const noteText = document.getElementById('editNoteText');
const integer = /[0-9]/;

    for (var i in noteData) {
       const x = integer.exec(openNote.id);
       if (x == i) {
            noteTitle.value = noteData[i].noteTitle;
            noteText.value = noteData[i].noteText;
           editNoteId = noteData[i].id;
        }
    }
     
}

const editPost = document.getElementById('edit_note');
editPost.addEventListener('submit', submitEdit);
    
function submitEdit (event, patch) {
    var noteTitle = event.target.noteTitle.value;
    var noteText = event.target.noteText.value;
    
    post = {
        noteTitle: noteTitle,
        noteText: noteText
    }
    
    const options = {
        method: 'PATCH',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    
    const URL = `/notes/${editNoteId}`;
    
    return fetch(URL, options)
    .then(response => response.json())
    .then(data => console.log('movie to update: ', data));
        
}






       



