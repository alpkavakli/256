import express from "express";
import { body, validationResult } from "express-validator"; //we exported 2 functions
const app = express();

app.set("view engine", "ejs"); // Set EJS as the view engine

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Application Routes
app.get("/", (req, res) => {
  res.render("form", {errors: {}}); // Render the form.ejs template with result set to undefined
});

app.post("/", (req, res) => {
  body("n1").isFloat().withMessage("n1 is invalid bazinga"),
    body("n2").isFloat().withMessage("n2 is invalid bazinga"),
    (req, res) => {
      const errors = validationResult(req);
      console.log(errors.mapped());
    };
  console.log(req.body); // Log the form data to the console
  let result;
  if (errors.isEmpty()) {
    const n1 = parseFloat(req.body.n1);
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
  }
  res.render("form", { result, data: req.body, errors: errors.mapped() }); // Render the form.ejs template with the sum variable
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
