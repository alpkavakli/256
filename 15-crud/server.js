import express from "express"
import { pool } from "./dbpool.js"
import { getRandomStudent } from "./names.js"

const app = express()
app.set("view engine", "ejs")
//middlewares
app.use(express.static("public"))
// Endpoints
app.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("Select * from students")
        res.render("index", { students: rows})
        /* console.log(rows) */
    } catch(err) { /* finding out db error ain't easy so use try catch */
        res.status(500).send(`DB-Error : ${err.code}`)
    }
})

app.listen(3000, () => {
    console.log("Server started bazinga")
})

app.get("/delete/:id", async (req, res) => {
    try{
        const stdId = req.params.id;
        await pool.query("DELETE from students where id = ?", [stdId])
        res.redirect("/");

    } catch(err){
        res.status(500).send(`DB-Error : ${err.code}`)
    }
})
app.post("/create", async (req, res) => {
    try{
        const std = getRandomStudent();
        await pool.query("INSERT INTO students (name, lastname, cgpa, bday) VALUES (?,?,?,?)", 
            [std.name, std.lastname, std.cgpa, std.bday]
        )
            res.redirect("/")
    }catch(err) {
        res.status(500).send(`DB-Error : ${err.code}`)
    }
})

app.get("/update/:id", async (req, res) => {
    try {
        const stdId = req.params.id;
        const cgpa = (Math.floor(Math.random() *201) + 200 ) / 100
        await pool.query("UPDATE students SET cgpa=? where id = ? ", [cgpa, stdId])
        res.redirect("/");
    } catch (err) {

    }
})