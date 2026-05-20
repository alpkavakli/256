import express from "express";
import pool  from "../db.js"; 
const router = express.Router();


router.get("/rows", async (req, res) => {
    try{
    const [rows] = await pool.query("select * from projects");
    res.json(rows)
    }
    catch{
        console.log("row error");
    }
})

router.get("/tags/:id", async (req, res) => {
    let id = req.params.id;
    try{
    const [tags] = await pool.query("select * from tags where team = ?", [id])
    res.json(tags);
    }
    catch{
        console.log(`tags ${id} error`);
    }
})


router.get("/tags/", async (req, res) => {
    try{
    const [tags] = await pool.query("select * from tags")
    res.json(tags);
    }
    catch{
        console.log(`tags error`);
    }
})

export default router;