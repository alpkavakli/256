import express from "express";
const router = express.Router();

router.use(express.json())//gerek yok

router.get("/",  (req, res) => {    
    res.render("index.html")
    
})

export default router