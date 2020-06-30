//Display notes on load
var loadContent = document.getElementById('notes_container');
window.addEventListener('load', getRequest);

function getRequest(event) {
    event.preventDefault();
    fetch('/notes')
    .then((response) => response.json())
    .then(function(data) {

           for (var i in data) {
                document.getElementById("notes_container").innerHTML += 
                    
                    '<div class="card single_note" style="">' +
                    '<img src="https://i1.wp.com/tinyleaps.fm/wp-content/uploads/2020/05/uqyhjogyxyy-scaled.jpg" class="card-img-top" alt="...">' +
                    '<div class="card-body">' +
                    '<p class="card-title">' + 
                    data[i].noteTitle + 
                    '</p> <p class="card-text">'+
                    data[i].noteText + '</div> </div>'
                    
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
            document.getElementById("notes_container").innerHTML += 
                    
                    '<div class="card single_note" style="width: 18rem;">' +
                    '<img src="https://i1.wp.com/tinyleaps.fm/wp-content/uploads/2020/05/uqyhjogyxyy-scaled.jpg" class="card-img-top" alt="...">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' + 
                    data[i].noteTitle + 
                    '</h5> <p class="card-text">'+
                    data[i].noteText + '</div> </div>'
            
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



       



