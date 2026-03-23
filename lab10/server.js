// Validation with express-validator
import express from "express";
import { body, validationResult } from "express-validator";
const app = express();
app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Application Routes
app.get("/", (req, res) => {
    res.render("form-sticky", { errors: {}, data: {}}); // Render the form-sticky.ejs template 
    // with result set to undefined, errors and data are the variables we passed
});
app.post("/",
    // Validation rules
    body("n1").isFloat().withMessage("n1 must be a number"), //withMessage sets error msg to errors object
    body("n2").isFloat().withMessage("n2 must be a number"),
    body("op").isIn(["add", "sub", "mul", "div"]).withMessage("Invalid operator"),
    (req, res) => {
        const errors = validationResult(req); //collect all errors, errorhandling part
        // console.log(errors.mapped());
        let result ;
        if (errors.isEmpty()) {
            const n1 = parseFloat(req.body.n1); //convert string to decimal
            const n2 = parseFloat(req.body.n2);
            const op = req.body.op;
            switch (op) {
                case "add":
                    result = n1 + n2;
                    break;
                case "sub":
                    result = n1 - n2;
                    break;
                case "mul":
                    result = n1 * n2;
                    break;
                case "div":
                    result = n1 / n2;
                    break;  
            }
        } else {
            res.status(400); // Bad Request, will be sent in rendering below
        }
        res.render("form-sticky", { errors: errors.mapped(), data: req.body , result }); // Render the form.ejs template with validation errors and input values
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});