import express from 'express';
import { createNote, deleteNote, listNotes, getNote, updateNote, pinNote } from '../controllers/notes.controller.js';
import { validateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/", validateUser, listNotes);

router.get("/:id", validateUser, getNote);

router.post("/", validateUser, createNote);

router.put("/:id", validateUser, updateNote);

router.delete("/:id", validateUser, deleteNote);

router.put("/pin/:id", validateUser, pinNote);

export default router;