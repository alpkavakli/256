import express from "express";
import session from "express-session";
import { products } from "./products.js"; 
// Load environment variables from .env file
import  dotenv from  "dotenv";
dotenv.config();
// import "dotenv/config"; // Alternative way to load environment variables

const app = express();
app.set("view engine", "ejs");

// Middleware to manage sessions 
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
//  homepage route to display products, recently viewed products, and counter
app.get("/", (req, res) => {
  // get recently viewed products and counter from session, or set to default values
  const recentlyViewed = req.session.recentlyViewed ?? [];
  // get counter from session, or set to 0 if it doesn't exist
  const counter = req.session.counter ?? 0;
  res.render("home", { products, recentlyViewed, counter });
});

// route to display product details and manage recently viewed products and counter
app.get("/product/:id", (req, res) => {
  const id = Number(req.params.id);
  // find product by id
  const product = products.find((p) => p.id === id);

  // create counter for number of products viewed
  req.session.counter = (req.session.counter ?? 0) + 1;

  // create recently viewed products array in session if it doesn't exist
  if (!req.session.recentlyViewed) {
    req.session.recentlyViewed = [];
  }
  // remove product from recently viewed if it already exists
  req.session.recentlyViewed = req.session.recentlyViewed.filter(
    (p) => p.id !== product.id
  );
  // add product to the beginning of recently viewed array
  req.session.recentlyViewed.unshift(product);
  // keep only the 3 most recent products in the recently viewed array
  req.session.recentlyViewed = req.session.recentlyViewed.slice(0, 3);

  res.render("product", { product });
});

// route to clear recently viewed products and reset counter
app.post("/recently-viewed/clear", (req, res) => {
  delete req.session.recentlyViewed;
  req.session.counter = 0;
  res.redirect("/");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});


