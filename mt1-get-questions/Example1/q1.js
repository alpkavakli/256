import express from "express";
import {countries, cities} from "./db.js"

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true}))


app.get("/", (req, res) => {

    let result = Object.values(cities);
    const filterBy = req.query.filterBy ??  "ALL" ;
    
    if (filterBy === "ALL")
    {
        res.render("q1", {filterBy, cities, countries, result})
    }
    else{
     result = result.filter(x => x.code ===  countries.find(c => c.name === filterBy).code )
     res.render("q1", {filterBy, cities, countries, result})
    }



})


app.listen(3000, () => {
    console.log("server is running");
})