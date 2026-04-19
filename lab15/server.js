import express from "express"
import multer from "multer"
import db from "./db.js"
import path from "path"
const app = express()


app.set("view engine", "ejs")
app.use(express.static("public"))

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) ?? "";
    const name = path.basename(file.originalname, ext);
    cb(null, `${Date.now()}-${name}${ext}`);
  }
});
const upload = multer({ storage });

const errorMsg = {
  "1": "Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed."
}
app.get("/", async (req, res) => {
  const [photos] = await db.query("SELECT * FROM album order by created_at desc")
  res.render("index", { photos, error: errorMsg[req.query.error] })
})

app.post("/", upload.single("photo"), async (req, res) => {
  const ext = path.extname(req.file.originalname).toLowerCase()
  if (![".jpg", ".jpeg", ".png", ".gif"].includes(ext)) {
    return res.redirect("/?error=1")
  }
  await db.query("INSERT INTO album (filename, original, tags) VALUES (?, ?, ?)", 
    [ req.file.filename, req.file.originalname, req.body.tags ])
  res.redirect("/")
})  

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
