import express from "express";
import { body, validationResult } from "express-validator";

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("form", { method: "GET", form: null, errorList: null }); //we are sending the method too
});

app.post(
  "/",
  // VALIDATION MIDDLEWARE
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("department").notEmpty().withMessage("Department is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("agree").exists().withMessage("You must agree to the terms and conditions"),
  (req, res) => {
    const errors = validationResult(req);
    let errorList  = errors.isEmpty() ? null : errors.mapped(); //converts errors to an object 
    // keyed by field name like gender/name from above
    res.render("form", { method: "POST", form: req.body, errorList }); //we passed the entire form data
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
