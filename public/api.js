/*var loadContent = document.getElementById('user_form');
loadContent.addEventListener('submit', getRequest);

function getRequest(event) {
    event.preventDefault();
    
    document.getElementById("notes_container").innerHTML = "";
    var noteId = event.target.noteId.value;
    
    fetch(`/notes/${noteId}`)
    .then((response) => response.json())
    .then(function(data) {
        
        if(!noteId){
            for (var i in data) {
                document.getElementById("notes_container").innerHTML += data[i].noteTitle + '<br />'
            }
        } else {
            document.getElementById("notes_container").innerHTML += data.noteTitle;  
            
        }
            
        console.log(data);
    });
       
}*/



var loadContent = document.getElementById('notes_container');
window.addEventListener('load', getRequest);

function getRequest(event) {
    fetch('/notes')
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
            
        console.log(data);
    });
       
}



