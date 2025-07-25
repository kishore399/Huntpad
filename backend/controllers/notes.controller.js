import Note from "../models/notes.model.js";

export const listNotes = async (req,res) => {
    try{
        const userId = req.user._id;

        const notes = await Note.find({ userId }).sort({ isPinned: -1, updatedAt: -1}).select("-content");
        console.log(notes)
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
        const { content } = req.body || "";

        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message : "Note not found"})
        }

        note.content = content;

        await note.save();
        return res.status(200).json(note);

    } catch (err) {
        console.log("Error in updateNote controller", err);
        return res.status(500).json({ message : "Internal Server Error" });
    }
}

export const updateTitle = async (req,res) => {
    try {
        const noteId = req.params.id;
        const { title } = req.body;

        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message : "Note not found" });
        }

        note.title = title;
        await note.save();
        return res.status(200).json(note);

    } catch (err) {
        console.log("Error in updateTitle controller", err);
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
        const userId = req.user._id;

        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message : "Note not found"})
        }

        note.isPinned = !note.isPinned;

        await note.save();

        const notes = await Note.find({ userId }).sort({ isPinned: -1, updatedAt: -1 }).select("-content");
        return res.status(200).json(notes);

    } catch (err) {
        console.log("Error in pinNote controller", err);
        return res.status(500).json({ message : "Internal Server Error" });
    }
}

export const publishNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        note.isPublished = !note.isPublished;
        await note.save();
        return res.status(200).json("Published");
    } catch (err) {
        console.log("Error in publishNote controller", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getPreview = async (req, res) => {
    try {
        const noteId = req.params.id;

        const note = await Note.findById(noteId).select("content title cover isPublished");
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.isPublished === false) {
            return res.status(403).json({ message: "Unauthorized Access" });
        }
        return res.status(200).json(note);
    } catch (err) {
        console.log("Error in getPreview controller", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}