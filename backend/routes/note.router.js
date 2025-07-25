import express from 'express';
import { createNote, deleteNote, listNotes, getNote, updateNote, pinNote, updateTitle, getPreview } from '../controllers/notes.controller.js';
import { validateUser } from '../middlewares/auth.middleware.js';
import { get } from 'mongoose';

const router = express.Router();

router.get("/", validateUser, listNotes);

router.get("/:id", validateUser, getNote);

router.post("/", validateUser, createNote);

router.put("/:id", validateUser, updateNote);

router.put("/title/:id", validateUser, updateTitle);

router.delete("/:id", validateUser, deleteNote);

router.put("/pin/:id", validateUser, pinNote);

router.get("/preview/:id", getPreview);

export default router;