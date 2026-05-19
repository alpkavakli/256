import express from "express";
import { pool } from "./db.js"; 
const router = express.Router();

router.use(express.json())//gerek yok

router.get("/", async (req, res) => {
    try{
        const [rows] = await pool.query("select * from projects");
        const [tags] = await pool.query("select * from team");
        res.render("/views/index.ejs", { rows, tags } );
        //likeit is 1 or 0
    }
    catch{
        console.log("eror db");
        res.render("/views/index.ejs")
    }
    

})