import express from "express";
import pool from "./db.js";
const app = express();
const port = 3001;
app.set("view engine", "ejs"); //its auto views folder
app.use("/assets", express.static("assets"));
app.use(express.urlencoded({ extended: true }));  // to read HTML form posts


app.get("/", async (req, res) => {
 try{
    let page = req.query.page ?? 1;
    page = Number(page);
    const limit = 3;
    const offset = (page -1 ) * limit;

    let [rows, err] = await pool.query("select * from products limit ?, ?", [offset, limit]);
    //console.log(rows);

    res.render("index.ejs", {items: rows, page});
 }
 catch(err) {
    console.log("/ error: " + err);
 }

})



app.listen(port, () => {
    console.log("App started on port " + port);
})