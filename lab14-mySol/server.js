import express from "express"; //sending date to form is in this lab(lab14)
import { pool } from "./dbpool.js";   
import { getRandomStudent } from "./names.js";
const app = express();
const port = 3001;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));  // to read HTML form posts


app.get("/", async (req, res) => {
    
    try {
        const [rows] = await pool.query("SELECT * FROM students");

        res.render("index.ejs", {students: rows, createdId: false }
        );
    }
    catch{
        console.log("eror database");
    }
    
})
app.post("/create", async (req, res) => {
    try{
       let student = getRandomStudent();
        const [rows] = await pool.query( "INSERT INTO students (name, lastname, cgpa, bday) VALUES (?, ?, ?, ?)",
      [student.name, student.lastname, student.cgpa, student.bday]); 
      res.redirect("/");
    }
    catch{
        console.log("something went wrong");
    }
})

app.get("/delete/:id", async (req, res) => {
    try{
        const [rows] = await pool.query("Delete from students where id = ?",
             [req.params.id]);
        res.redirect("/");
    }
    catch{
        console.log("delete eror");
    }
})

app.get("/update/:id", async (req, res) => {
    try{
        const [rows] = await pool.query("update students set cgpa = ? where id = ? ",
            [ Math.random()*4 , req.params.id] //(Math.floor(Math.random() * 201) + 200) / 100
        )
       res.redirect("/");
    } catch{
        console.log("updt eror")
    }
})

app.get("/edit/:id", async (req, res) => {
    try{
        const [rows] = await pool.query("select * from students where id = ?", 
            [ req.params.id] )
        rows[0].bday = rows[0].bday.toLocaleDateString('en-CA'); //amınakoyim ya
        res.render("edit", {std: rows[0]});
    }
    catch{
        console.log("edit eror")
    }
})

app.post("/edit/:id", async (req, res) => {
    try{
        const name = req.body.name;
        const lastname = req.body.lastname;
        const cgpa = req.body.cgpa;
        const bday = req.body.bday;
        const [rows] = await pool.query( "update students set name = ?, lastname = ?, cgpa = ?,  bday = ? where id = ?",
      [name, lastname, cgpa, bday, req.params.id]); 
      res.redirect("/");
    }
    catch{
        console.log("edit eror");
    }
})

app.listen(port, () => {
    console.log("Server has started on " + port );
})