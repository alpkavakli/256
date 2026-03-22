
import express from "express";
const app = express();
app.set("view engine", "ejs"); // Set EJS as the template engine

app.get("/", (req, res) => {
  res.render("example", {
    title: "Students",
    rawHtml: "<em style='color: blue;'>This is italic text</em>",
    students: ["Alice", "Bob", "Charlie", "David"],
  });
});
// although you change the html output, 
// you don't need to change the code in the route handler, 
// which is a big advantage of using template engines

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});