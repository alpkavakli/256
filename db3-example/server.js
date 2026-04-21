import express from "express";
import pool from "./db.js";
const port = 3001;
const app = express();
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));
app.use(express.urlencoded({ extended: true }));  // to read HTML form posts

app.get("/", async (req, res) => {
    try{
       
        const [rows, err] = await pool.query("select * from todo");
        console.log(rows[0]);
         res.render("index.ejs", {rows});
    }
    catch(err){
        console.log("error " + err);
    }

})

app.listen(port, () => {
    console.log("Server has started on port " + port);
});


