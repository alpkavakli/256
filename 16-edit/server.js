import express from "express"
import { pool } from "./dbpool.js"
import { getRandomStudent } from "./names.js"

const app = express()
app.set("view engine", "ejs")
//middlewares
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
// Endpoints
app.get("/", async (req, res) => {
    const createId = req.query.createId
    try {
        const [rows] = await pool.query("Select * from students")
        res.render("index", { students: rows, createId}) //error in here??
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
        const [result] = await pool.query("INSERT INTO students (name, lastname, cgpa, bday) VALUES (?,?,?,?)", 
            [std.name, std.lastname, std.cgpa, std.bday] //ee id almak istedik idyi de db auto incrementleyip verio onun için resultla alıyoz sonra da .insertid ile çekcez
        )
            res.redirect("/?createId=" + result.insertId)
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
        res.status(500).send("error blablablabla" + errcode);
    }
})

app.get("/edit/:id", async (req, res) => {
    const id = req.params.id
    try {
        const [rows] = await pool.query("SELECT * FROM students where id=?"
        ,[id])
        console.log(rows[0])

        const std = rows[0]
        std.bday = std.bday.toLocaleDateString("en-CA")
        res.render("edit", {std})
    }
    catch(err){
        res.status(500).send("error blablablabla" + errcode);
    }
})

app.post("/edit/:id", async (req, res) => {
    const id = req.params.id
    console.log(req.body)
    const {name, lastname, cgpa, bday} = req.body
    try{
        await pool.query("UPDATE students SET name=?, lastname=?, cgpa=?, bday=? where id=?"
            , [name, lastname, cgpa, bday, id])
            res.redirect("/")
    }
    catch(err) {
        res.status(500).send("Error saving student" + err.code);
    }
})