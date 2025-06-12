import express from 'express';
import { createNote, deleteNote, getAllNotes, updateNote } from '../controllers/notes.controller.js';
import { validateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/all", validateUser, getAllNotes);

router.post("/create", validateUser, createNote);

router.put("/update/:id", validateUser, updateNote);

router.delete("/delete/:id", validateUser, deleteNote);

export default router;