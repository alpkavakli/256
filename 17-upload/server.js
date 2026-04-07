import express from "express"
import multer from "multer"
import db from "./db.js"
import path from "path"
const app = express()
app.set("view engine", "ejs")
app.use(express.static("public")) //there is a webserver and it delivers all static folder in public folder
// Multer settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null,"public/uploads"),//null part is used to say there aint any error
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) 
        const name = path.basename(file.originalname, ext) //we removed the extension idk wtfs gonig
        cb(null, `${Date.now()}-${name}${ext}-Bazinga`) //custom format of how files are stored e number fln vardı ya 23151254fabsd231q23 amacımız uniq yapmak
    }
 
})
const upload = multer( {storage})
// Endpoints
const errMsg = {
    "1" : "Invalid file type (expected jpg png and gif)"
}
app.get("/", async (req, res )=> {
    const [photos] = await db.query("select * from album")
    res.render("index", {photos, error: errMsg[req.query.error]})
})
app.post("/", upload.single("photo"), async(req, res) => {

    // verify uploaded file
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (![".jpg", ".png", "gif",].includes(ext))
    {
        return res.redirect("?error=1")
    }



    await db.query("INSERT INTO album (filename, original, tags) VALUES (?,?,?)",
        [req.file.filename, req.file.originalname, req.body.tags])
    res.redirect("/")
})


app.listen(3000, () => {
    console.log("Application started on port 3000")
})



