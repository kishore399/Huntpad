import notes from "../models/notes.model.js";

export const getAllNotes = (req,res) => {
    return res.status(200).json({message: "Get all notes"});
}

export const createNote = (req,res) => {
    return res.status(200).json({message: "Create notes"});
}

export const updateNote = (req,res) => {
    return res.status(200).json({message: "Update notes"});
}

export const deleteNote = (req,res) => {
    return res.status(200).json({message: "Delete notes"});
}