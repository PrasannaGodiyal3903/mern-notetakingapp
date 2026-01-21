import mongoose from "mongoose";

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
},
    {timestamps:true} //shows createdat, updatedat automatically

)
//creating schema(above)
//model based off of that schema(below)
const Note=mongoose.model("Note",noteSchema)
export default Note;