import Note from "../models/Note.js"
export async function getAllNotes(req,res){
    try{
        const notes=await Note.find().sort({createdAt:-1}) //shows newest first
        res.status(200).json(notes)
    }
    catch(error){
        console.error("Error in getAllNotes controller",error)
        res.status(500).json({message:"Internal Server error"})
    }
}
export async function getNoteById(req,res){
    try{
        const findNote=await Note.findById(req.params.id)
        if(!findNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json(findNote)
    }
    catch(error){
        console.error("Error in getNotebyId controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}
// CREATE newnote contains writing title and content
export async function createNote(req,res){
    try{
        const{title,content}=req.body
        const newNote= new Note({title:title,content:content})
        const savedNote= await newNote.save()
        res.status(201).json(savedNote)
    }
    catch(error){
        console.error("Error in createNote controller",error)
        res.status(500).json({message:"Internal server error"})
    }
} 
export async function updateNote(req,res){
    try{
    const {title,content}=req.body
    const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,content})
    if(!updatedNote) return res.status(404).json({message:"Note not found"})
    res.status(200).json({message:"Note updated successully"})
    }
    catch(error){
        console.error("Error in updateNote controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}
export async function deleteNote(req,res){
    try{
    const deletedNote=await Note.findByIdAndDelete(req.params.id)
    if(!deletedNote) return res.status(404).json({message:"Note not found"})
    res.status(201).json({message:"Note deleted successfully"});
    }
    catch(error){
        console.error("Error in deleteNote controller",error)
        res.status(500).json({message:"Internal server error"})
    }    
}