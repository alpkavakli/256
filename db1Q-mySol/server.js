import express from "express";
import pool from "./db.js";
const app = express();
const port = 3001;
app.set("view engine", "ejs"); //its auto views folder
app.use("/asset", express.static("asset"));
app.use(express.urlencoded({ extended: true }));  // to read HTML form posts

app.get("/", async (req, res) => {
    let error;
    try{
        let [rows] = await pool.query("select * from courses where id not in ( select id from addedcourse)");
        console.log(rows);
        let courses = rows;
        let coursesTaken;
        [coursesTaken, error] = await pool.query("select * from addedcourse A, courses C where A.id = C.id order by C.id")
        console.log(coursesTaken)
        res.render("index.ejs", {classes: rows, coursesTaken});
    }catch(err){
       console.log("get / eror " + err) 
    }

})

app.post("/", async (req, res) => {
    const id = req.body.classes; 
    try{
        const [rows] = await pool.query("insert into addedcourse (id) values ( ? )",
            [id]
        );
        res.redirect("/");
    }
    catch{
        console.log("post / error")
    }
})
app.get("/delete/:id", async (req, res) => {
    try{
        const [rows] = await pool.query("delete from addedcourse where id = ?",
            [req.params.id]
        );

        res.redirect("/");
    }
    catch{

    }
})
app.listen(port, () => {
    console.log("Server started on " + port);
})