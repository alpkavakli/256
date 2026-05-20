import express from "express";
import session from "express-session";
import apiRouter from "./routers/itemsRouter.js";

const app = express();
const port = 3000;

app.use(express.static("views"));              // index.html
app.use("/assets", express.static("assets"));  // images, css, js

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session holds the bag (item ids) + the max value reached so far
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));

app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
