import express from "express";
import { body, validationResult } from "express-validator";
const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("q2", { errors: {}, form: {}, price: null });
});

app.post("/", [
  body("units").isInt({ min: 1 }).withMessage("Error: The Unit should be a positive integer number"),
  body("storage").exists().withMessage("Error: Select a storage"),
], (req, res) => {
  const errors = validationResult(req);
  let price , model ;
  if (errors.isEmpty()) {
      const basePrice = [70000, 65000, 50000]
      const storage = [1, 1.1, 1.25]
      price = basePrice[req.body.model] * storage[req.body.storage] * req.body.units;
      price += req.body.shipping ? 500 : 0;
      const models = ["S25 Ultra", "S25 Edge", "S25+"]
      model = models[req.body.model]
    //   console.log(price)
  }
  res.render("q2", { errors: errors.mapped(), form: req.body, price, model });
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));