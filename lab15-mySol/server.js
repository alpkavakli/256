import express from "express";
import multer from "multer";
import {pool} from "db.js";
//why do we need to import path amk
const app = express();
const port = 3001;


app.get("/", async (req, res) => {
    
})


app.listen(port, () => {
    console.log("Server started on " + port);
})