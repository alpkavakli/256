import express from "express"
import session from "express-session"
import { products } from "./products.js"
import "dotenv/config"

const app = express()
app.set("view engine", "ejs")

app.use(session(
    {
        secret: "21242352352def",
        resave:false,
        saveUninitialized: true 
    }))

app.get("/", (req, res) => {
    const recentlyViewed = req.session.recentlyViewed ?? []

    const count = req.session.count ?? 0
    res.render("home", {products, recentlyViewed, count})
})

app.get("/product/:id", (req, res) => {
    const id = Number(req.params.id)
    const product = products.find( p => p.id === id)


    //Counter
    req.session.count = req.session.count ?? 0
    req.session.count++
    if (!req.session.recentlyViewed) {
        req.session.recentlyViewed = []
    }
    req.session.recentlyViewed = req.session.recentlyViewed
                                    .filter(p => p.id !== id)


    req.session.recentlyViewed.unshift(product)
    req.session.recentlyViewed = req.session.recentlyViewed.slice(0, 3)
    res.render("product", {product})
})

app.post("/recently-viewed/clear", (req, res) => {
    /* const id = Number(req.params.id)
    const product = products.find( p => p.id === id)
    req.session.recentlyViewed = []
    res.render("product", {product}) */

    delete req.session.recentlyViewed
    res.redirect("/")
})


app.listen(3000, () => {
    console.log("Server is on on port 3000 bazinga")
})
