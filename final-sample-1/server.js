//Özelliği sadece kelime aratmayı kelimeyi tam girdiğinde değil harflerini girdiğinde de o harfleri bulunduruyorsa gösterecek şekilde yap.
//finaldeyken ejs de olacak ama ajax da kullanacağız

import express from "express";
import homeRouter from "./routers/homeRouter.js"
import { pool } from "./db.js";  

const app = express();
const port = 3000;

app.set("view engine, ejs");

//app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}))


app.use('/', homeRouter);

app.listen(port, () => {
    console.log("Server is running on port 3000");
})