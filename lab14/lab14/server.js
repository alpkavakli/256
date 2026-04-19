import express from "express";
import { pool } from "./dbpool.js";   
import { getRandomStudent } from "./names.js";  
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  const createdId = req.query.createdId;
  try {
    const [rows] = await pool.query("SELECT * FROM students");
    res.render("index", { students: rows, createdId });
  } catch (err) {
    res.status(500).send("Error retrieving students " +  err.code);
  }
});

app.get("/delete/:id", async (req, res) => {
  const studentId = req.params.id;  
    try {
        await pool.query("DELETE FROM students WHERE id = ?", [studentId]);
        res.redirect("/");
    } catch (err) { res.status(500).send("Error deleting student " + err.code);  }
});

app.post("/create", async (req, res) => {
  try {
    const student = getRandomStudent();
    const [result] = await pool.query(
      "INSERT INTO students (name, lastname, cgpa, bday) VALUES (?, ?, ?, ?)",
      [student.name, student.lastname, student.cgpa, student.bday]
    );
    res.redirect("/?createdId=" + result.insertId);
  } catch (err) { res.status(500).send("Database error");  }
});
app.get("/update/:id", async (req, res) => {
  const studentId = req.params.id;  
    try {   
        const newCgpa = (Math.floor(Math.random() * 201) + 200) / 100;
        await pool.query("UPDATE students SET cgpa = ? WHERE id = ?", 
             [newCgpa, studentId]);
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error updating student " + err.code);
    }   
});

app.get("/edit/:id", async (req, res) => {
  const studentId = req.params.id;
    try {
        const [rows] = await pool.query("SELECT * FROM students WHERE id = ?", [studentId]);
        rows[0].bday = rows[0].bday.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD
        res.render("edit", { std: rows[0] });
    } catch (err) {
        res.status(500).send("Error retrieving student " + err.code);
    }
});
app.post("/edit/:id", async (req, res) => {
  const studentId = req.params.id;
    const { name, lastname, cgpa, bday } = req.body;  
    try {
        await pool.query(
            "UPDATE students SET name = ?, lastname = ?, cgpa = ?, bday = ? WHERE id = ?",
            [name, lastname, cgpa, bday, studentId]
        );
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error updating student " + err.code);
    } 
});

app.listen(3000, () => { console.log("Server is running on port 3000"); });
