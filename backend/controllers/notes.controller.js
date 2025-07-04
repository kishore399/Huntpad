import Note from "../models/notes.model.js";

export const listNotes = async (req,res) => {
    try{
        const userId = req.user._id;

        const notes = await Note.find({ userId }).sort({ isPinned: -1, updatedAt: -1}).select("-content -userId");
        if (!notes) {
            return res.status(404).json({ message: "No notes found" });
        }

        return res.status(200).json(notes);

    }catch (err) {
        console.log("Error in listNotes controller", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getNote = async (req,res) => {
    try {
        const userId = req.user._id;
        const noteId = req.params.id

        const note = await Note.findById(noteId).select("content userId");
        if (!note) {
            return res.status(404).json({ message: "No notes found" });
        }

        if(note.userId != userId) {
            return res.status(401).json({ message: "Unauthorized Access" })
        }

        return res.status(200).json(note);

    } catch (err) {
        console.log("error in getNote controller", err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const createNote = async (req,res) => {
    try {
        const userId = req.user._id;

        const { title, content } = req.body;
        if (!title) {
            return res.status(400).json({ message : "Title cannot be empty" });
        }
        if (!content) {
            return res.status(400).json({ message : "Content cannot be empty" });
        }

        const newNote = new Note({
            userId,
            title,
            content
        });
        await newNote.save();
        return res.status(201).json(newNote);

    } catch (err) {
        console.log("Error in createNote controller", err);
        return res.status(500).json({ message : "Internal Server Error" });
    }
}

export const updateNote = async (req,res) => {
    try {
        const noteId = req.params.id;
        const { title, content } = req.body || {};
        if (!title && !content) {
            return res.status(400).json({ message : "Oops! You didn't make any changes" })
        }

        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message : "Note not found"})
        }

        if (title) note.title = title;
        if (content) note.content = content;

        await note.save();
        return res.status(200).json(note);

    } catch (err) {
        console.log("Error in updateNote controller", err);
        return res.status(500).json({ message : "Internal Server Error" });
    }
}

export const deleteNote = async (req,res) => {
    try {
        const noteId = req.params.id;

        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message : "Note not found" });
        }

        await note.deleteOne();
        return res.status(200).json({message : "Note deleted successfully" });

    } catch (err) {
        console.log("Error in deleteNote controller", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const pinNote = async (req,res) => {
    try {
        const noteId = req.params.id;

        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message : "Note not found"})
        }

        note.isPinned = !note.isPinned;

        await note.save();
        return res.status(200).json(note);

    } catch (err) {
        console.log("Error in pinNote controller", err);
        return res.status(500).json({ message : "Internal Server Error" });
    }
}