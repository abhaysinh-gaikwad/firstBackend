const express = require("express");
const { NoteModel } = require("../model/note.model");
const { auth } = require("../middleware/auth.middleware");

const noteRouter = express.Router();

noteRouter.post("/", auth, async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "Note created successfully", note });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// get the notes opd logged in user or a user can read his/her notes only 
noteRouter.get("/", auth, async (req, res) => {
    try{
        // userid in  notes === userid who is making the request
        const notes = await NoteModel.find({userID: req.body.userID});
        res.status(200).send({msg: "List of notes for logged in user", notes})
    }catch(err){
        res.status(400).send({msg: err})
    }
});

noteRouter.patch("/:noteID",auth,  async (req, res) => {
    const {noteID} = req.params
    try{
        const note = await NoteModel.findOne({_id: noteID});
        if(note.userID === req.body.userID){
            await NoteModel.findByIdAndUpdate({_id: noteID}, req.body);
            res.status(200).send({msg: `The note with id ${noteID} has been updated`})
        }else{
            res.status(400).send({msg: "You are not authorized to update this note"})
        }
    }catch(err){
        res.status(400).send({msg: err})
    }
});

noteRouter.delete("/:noteID",auth, async (req, res) => {
    const {noteID} = req.params
    try{
        const note = await NoteModel.findOne({_id: noteID});
        if(note.userID === req.body.userID){
            await NoteModel.findByIdAndDelete({_id: noteID}, req.body);
            res.status(200).send({msg: `The note with id ${noteID} has been deleted`})
        }else{
            res.status(400).send({msg: "You are not authorized to delete this note"})
        }
    }catch(err){
        res.status(400).send({msg: err})
    }
});

module.exports = {
  noteRouter,
};

//create
//read
//update
//delete
