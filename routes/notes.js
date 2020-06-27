const express = require('express');
const router = express.Router();
const Note = require('../models/note.js');



//GET ALL
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
    
});


//GET BY TITLE
router.get('/search', findNotes, async(req, res) => {
    res.json(res.foundNotes);
});

//GET SINGLE
router.get('/:id', getNote, async(req, res) => {
        res.json(res.note);
});


//POST
router.post('/', async(req, res) => {  
    const note = new Note({
        noteTitle: req.body.noteTitle,
        noteText: req.body.noteText
    });
    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({message: err.mesage})
    }
     
});

//PATCH
router.patch('/:id', getNote, async(req, res) => {
    if (req.body.noteTitle != null) {
        res.note.noteTitle = req.body.noteTitle;
    }
    if (req.body.noteText != null) {
        res.note.noteText = req.body.noteText;
    }
    try {
        const updatedNote = await res.note.save();
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: 'Note not updated'});

    }
    
    
});

//DELETE
router.delete('/:id', getNote, async(req, res) => {
    const currentDate = new Date()
    const dayOfWeek = currentDate.getDate();
    const monthOfYear = currentDate.getMonth()+1;
    const year = currentDate.getFullYear();
    const today = monthOfYear + '/' + dayOfWeek + '/' + year;
    try {
        await res.note.remove();
        res.json({message: `deleted note: ${res.note.noteTitle} on ${today}`});
    } catch (err) {
        res.status(400).json({ message: 'Note not deleted'});

    }
    
    
});


//Middleware

//Find note by ID
async function getNote(req, res, next) {
    let note;
    try {
        note = await Note.findById(req.params.id);
        if (note == null) {
            return res.send(404), json({message: 'Cannot find note.'});
        }
    } catch (err) {
        return res.status(500).json({message: 'The ID selected was not found.'});
    }
    res.note = note;
    next();
}

//Find note by string
async function findNotes(req, res, next) {
    let foundNotes;// = req.query.q;
    
    try {
      foundNotes = await Note.find({noteTitle: req.query.q});
        if (foundNotes.length == 0) {
            foundNotes = 'Nothing to see here';
            };
    } catch (err) {
        return err;
    }
    
    res.foundNotes = foundNotes;
    next();

}




module.exports = router;
