//const express=require("express")
import upstash from "./config/upstash.js";
import express from "express"
import cors from "cors"
import path from "path"
import notesRoute from "./routes/notesRoute.js";
import{connectDB} from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app=express()
const __dirname=path.resolve()
if(process.env.NODE_ENV!=="production"){
app.use(
    cors({
        origin:"http://localhost:5173",
    })
)
}
app.use(express.json()); //gets access for req.body()
app.use(rateLimiter)

const PORT=process.env.PORT || 5001
app.use("/api/notes",notesRoute);
if(process.env.NODE_ENV==="production"){
app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})
}
// app.get("/api/notes",(req,res)=>{
//     res.status(200).send("hello you got nothing here");  
// });
// app.post("/api/notes",(req,res)=>{
//     res.status(201).json({message:"Note created successfully!"});
// }); 
// app.put("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"Note updated successfully!"});
// });
// app.delete("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"Note deleted successfully!"});
// });
connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server started on Port:",PORT)
})
})

