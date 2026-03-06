import express from "express"
import {body, validationResult} from "express-validator"
const app = express()
app.set("view engine", "ejs") //use ejs format
app.use( express.urlencoded({extended: true}))

//express validator provides 2 functions, body and validationResult
app.get("/", (req, res) => {
    res.render("form", {method:"GET", form: null, errorList: null}) //we sent the form to make it simple
})

app.post("/" ,

body("name").trim().notEmpty().withMessage("Enter a valid name"),
body("department").notEmpty(),
body("gender").exists(),
body("agree").exists(),
(req, res) => {
    const errors = validationResult(req)
    const errorList = errors.isEmpty() ? null : errors.mapped() //returns an object

    res.render("form", {method: "POST", form: req.body, errorList}) //req.body is the submitted form data request.body
}) //middleware does it, thats why we use express.urlencoded

app.listen(3000, () => console.log("started on 3000"))