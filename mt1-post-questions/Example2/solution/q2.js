import express from "express";
import { body, validationResult } from "express-validator";
import { xrates } from "./db.js";
const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("q2", { xrates, form: {}, value: null, errorMsg: null });
})

app.post("/", 
    body("amount").isFloat({ min: 0 }).withMessage("Error: The amount should be a positive number"),
    (req, res) => {
        const errors = validationResult(req);
        let value = null, errorMsg = null;
        if (errors.isEmpty()) {
            const rate = xrates[req.body.currency];
            value = req.body.amount * rate.price;
        } else {
            errorMsg = errors.mapped().amount.msg;
        }
        res.render("q2", { xrates, form: req.body, value, errorMsg });
    }
);

app.listen(3000, () => console.log("Started on 3000"))