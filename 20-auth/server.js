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

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", async (req, res) => {
    
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
    
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});