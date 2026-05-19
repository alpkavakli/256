import express from "express";
import bcrypt from "bcrypt";
import session from "express-session";
import db from "./db.js";
import "dotenv/config";
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

//show login page
app.get("/", (req, res) => {
  res.render("index");
});

//Authentication
app.post("/login", async (req, res) => {
    const {email, password, remember} = req.body;
    const [rows ] = await db.query("select * from auth where email=?", [email]);
    console.log(rows);
    //if console.log(rows)
    if (rows.length > 0)
    {
      const uer = rows[0];
      const match = await bcrypt.compare(); //row password and hash password is required one comes from db one comes from idk
      if (match) {
        //authenticated
        req.session.user = user;
        req.session.isAuth = true;
        red.redirect("/dashboard");
      }
      else{
        res.redirect("/");
        //password error btw
      }
    } else{
      //email error
      res.redirect("/");
    }
});

app.get("/dashboard", (req, res) => {
   
    res.render("dashboard");
});

app.get("/logout", (req, res) => {
   
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
  const {email, name, password} = req.body;
  const hashed = await bcrypt.hash(password, 10);
  //console.log(hashed);
  await db.query("insert into auth (email, password, name) values (? , ? , ?)",
      [email, hashed, name]);


  res.redirect("/");
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});