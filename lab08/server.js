// static middleware example
import express from "express";
import { threejs } from "./data.js"; // Importing data from data.js
const app = express();  
app.set("view engine", "ejs"); // set EJS as the view engine

app.use(express.static("public")); // serve static files from "public" directory

// Application Routes
app.get("/", (req, res) => {
  res.render("homepage", { data : threejs }); // Render the homepage view and pass the threejs data
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});