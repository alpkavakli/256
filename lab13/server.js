import express from "express";
import { pool } from "./dbpool.js";   
import { getRandomStudent } from "./names.js";  
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM students");
    res.render("index", { students: rows });
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
    await pool.query(
      "INSERT INTO students (name, lastname, cgpa, bday) VALUES (?, ?, ?, ?)",
      [student.name, student.lastname, student.cgpa, student.bday]
    );
    res.redirect("/");
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

app.listen(3000, () => { console.log("Server is running on port 3000"); });
