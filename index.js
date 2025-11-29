import express from "express";
const app = express();

app.get("/", (req,res)=> res.send("Docker works!"));

app.listen(3000, ()=> console.log("Server on 3000"));
