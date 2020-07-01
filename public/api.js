//DISPLAY ALL NOTES ON LOAD
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
                let textExcerpt = data[i].noteText.slice(0, 200);
               document.getElementById("notes_container").innerHTML += 
                    
                    '<a data-toggle="modal" data-target="#editModal"><div class="card single_note" onClick="grabId(this)" id="note_'+ i +'">' +
                    '<div class="card-body">' +
                    '<p class="card-title"><b>' + 
                    data[i].noteTitle + 
                    '</b></p><hr /><p class="card-text">'+
                    textExcerpt + '</div> </div></a>'                  
            }           
    });
       
}


//SEARCH NOTES BY TITLE
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
                let textExcerpt = data[i].noteText.slice(0, 200);
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

//CREATE NOTE
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


//EDIT NOTE
var editNoteId;
//Get data from target note and print to modal screen 
function grabId(card) {
    
const openNote = document.getElementById(card.id);
const noteTitle = document.getElementById('editNoteTitle');
const noteText = document.getElementById('editNoteText');
const findInt = /[0-9]/;
    for (var i in noteData) {
       let x = findInt.exec(openNote.id);
       if (x == i) {
            noteTitle.value = noteData[i].noteTitle;
            noteText.value = noteData[i].noteText;
            editNoteId = noteData[i]._id;          
       }
    }
}

//Take new value of note and pass to database
const editPost = document.getElementById('edit_note');
editPost.addEventListener('submit', submitEdit);
function submitEdit(event) {
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
    .then(data => console.log('note to update: ', data));
}


//DELETE NOTE
const startDelete = document.getElementById('startDelete');
startDelete.addEventListener('click', deletePost);

function deletePost(event) {
    
    const options = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            noteID: editNoteId
        })
    }
    const URL = `/notes/${editNoteId}`;
    
    fetch(URL, options)
    .then(response => response.json())
    .then(data => console.log('note to delete: ', data))
    .then(location.reload());

}











       



