import express from "express";
import "dotenv/config";
import bcrypt from "bcrypt";
import session from "express-session";
import db from "./db.js";
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: false
}));

app.get("/", (req, res) => {
  const error = req.query.error;
  if (req.session.isAuthenticated) {
    return res.redirect("/dashboard");
  }
  res.render("index", { error , message: req.session.message });
  req.session.message = null;
  // delete req.session.message; // Clear message after displaying
});

app.post("/login", async (req, res) => {
    const { email, password, remember } = req.body;
    const [rows] = await db.query("SELECT * FROM auth WHERE email = ?", [email]);
    if (rows.length > 0) {
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.user = user;
            req.session.isAuthenticated = true;
            if (remember) {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
            }  
            res.redirect("/dashboard");
        } else {
            req.session.message = "Invalid username or password";
            res.redirect("/");
        }
    } else {
        req.session.message = "Invalid username or password";   
        res.redirect("/");
    }
});

app.get("/dashboard", (req, res) => {
    if (!req.session.isAuthenticated) {
        req.session.message = "Please login to access the dashboard";
        return res.redirect("/");
    }
    res.render("dashboard", { user: req.session.user });
});

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {  
            return res.redirect("/dashboard");
        }
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO auth (email, password, name) VALUES (?, ?, ?)", [email, hashedPassword, name]);
    req.session.message = "Registration successful. Please login.";
    res.redirect("/");
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});