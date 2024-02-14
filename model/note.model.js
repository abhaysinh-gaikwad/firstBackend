const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    userID: {type: String, required: true},
    author: {type: String, required: true}
},{
    versionKey: false
});

const NoteModel = mongoose.model("notes", noteSchema);

module.exports={
    NoteModel
}