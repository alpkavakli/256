import express from "express";
import { products } from "./db.js";

const app = express();
// Serve static files from the "public" directory and set EJS as the view engine
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // Get the 'pos' query parameter, default to 0 if not provided
  let pos = req.query.pos ?? 0 
  pos = parseInt(pos)
  const { id } =  req.query

  // Flags to determine if "Previous" and "Next" buttons should be enabled
  const prevFlag = pos > 0
  const nextFlag = pos + 2 < products.length

  // Pagination logic: Get 3 products starting from the position 'pos'
  const paginatedProducts = products.slice(pos, pos + 3)

  res.render("q1", { products: paginatedProducts, pos, prevFlag, nextFlag, id });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});