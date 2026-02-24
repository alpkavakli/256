import express from "express";
import { threejs } from "./asset/data.js";
console.log(threejs);
const app = express();
app.set("view engine", "ejs")
app.use( express.static("./asset/public"))

app.get("/", (req, res) => {
  res.render("homepage", {data: threejs});
});


app.listen(3000, () => console.log("Started"));
