import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userid : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
});

const Note = mongoose.model(Note, noteSchema);

export default Note;