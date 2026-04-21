import express from "express";
import multer from "multer";
import pool from "./db.js";
//why do we need to import path amk
const app = express();
const port = 3001;
app.set("view engine", "ejs"); //its auto views folder
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));  // to read HTML form posts

app.get("/", async (req, res) => {
    try{
        res.render("index.ejs", { error: [], photos: []});
    }
    catch{
        console.log("root error");
    }
})
app.post("/", async (req, res ) => {
    try{
        
        res.redirect("/");
    }
    catch{

    }
})

app.listen(port, () => {
    console.log("Server started on " + port);
})