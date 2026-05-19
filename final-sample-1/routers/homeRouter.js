import express from "express";
const router = express.Router();

router.use(express.json())//gerek yok

router.get("/", async (req, res) => {

    
    res.render("/views/index.ejs")

})