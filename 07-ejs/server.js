import express from "express"
const app = express()
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("example", {
        title: "Student List",
        rawHtml : "<em style=`color:blue`>This is italic</em>",
        students : ["Std1", "Std2"] //this part aint working check it
    } ) //we don't have to write the .ejs
})

app.listen(3000, ()=> { console.log("started at 3000")})