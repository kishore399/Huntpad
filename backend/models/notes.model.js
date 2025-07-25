import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        userId : {
            type : String,
            required : true
        },
        title : {
            type : String,
            required : true
        },
        content : {
            type : mongoose.Schema.Types.Mixed,
            required : true
        },
        isPinned : {
            type : Boolean,
            default : false
        },
        isPublished : {
            type : Boolean,
            default : false
        },
        cover : {
            type : String,
            required : false
        }
    }, 
    { 
        timestamps : true ,
        versionKey : false
    }
);
    
const Note = mongoose.model("Note", noteSchema);

export default Note;