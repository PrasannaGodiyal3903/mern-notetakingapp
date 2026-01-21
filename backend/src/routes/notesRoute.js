import express from "express"

const router=express.Router();

export default router;
import {createNote,getNoteById, deleteNote, getAllNotes, updateNote} from "../controllers/notesController.js"
router.get("/",getAllNotes)
router.get("/:id",getNoteById)
router.post("/",createNote)
router.put("/:id",updateNote)
router.delete("/:id",deleteNote)

//mongodb+srv://abc:abc12345@cluster0.8yjypx0.mongodb.net/?appName=Cluster0