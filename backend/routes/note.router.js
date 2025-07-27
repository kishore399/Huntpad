import express from 'express';
import { createNote, deleteNote, listNotes, getNote, updateNote, pinNote, updateTitle, getPreview, publishNote, updateCoverPic } from '../controllers/notes.controller.js';
import { validateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/", validateUser, listNotes);

router.get("/:id", validateUser, getNote);

router.post("/", validateUser, createNote);

router.put("/:id", validateUser, updateNote);

router.put("/title/:id", validateUser, updateTitle);

router.delete("/:id", validateUser, deleteNote);

router.put("/pin/:id", validateUser, pinNote);

router.put("/publish/:id",validateUser, publishNote);

router.get("/preview/:id", getPreview);

router.put("/cover/:id", validateUser, updateCoverPic);

export default router;