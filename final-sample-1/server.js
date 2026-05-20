// ============================================================
// server.js  -  main entry point of the app
// Run with:  node server.js   (or: npm start)
// ============================================================

import express from "express";
import session from "express-session";
import homeRouter from "./routers/homeRouter.js"; // pages + non-ajax actions
import apiRouter from "./routers/rowRouter.js";   // ajax web service

const app = express();
const port = 3000;

// --- View engine -------------------------------------------------
// We render HTML on the SERVER with EJS. EJS files live in /views.
// "index.ejs" is the page we build the project table inside.
app.set("view engine", "ejs");

// --- Static files ------------------------------------------------
// css / images / loader.gif are reached at  /assets/...
// e.g. <link href="/assets/css/app.css"> reads assets/css/app.css
app.use("/assets", express.static("assets"));

// --- Body parsers ------------------------------------------------
// urlencoded -> reads data from <form> posts (the search bar)
// json       -> reads JSON bodies (used by the AJAX fetch calls)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Session -----------------------------------------------------
// The session gives every visitor their own server-side storage.
// We use it to remember the list of SEARCH TAGS (req.session.searchTags).
app.use(session({
    secret: "secret",          // signs the session cookie
    resave: false,
    saveUninitialized: true,   // create a session even before we store anything
}));

// --- Routes ------------------------------------------------------
app.use("/", homeRouter);      // "/", "/search", "/add-tag", "/remove-tag", "/like" (no ajax)
app.use("/api", apiRouter);    // "/api/like/:team"  -> the AJAX web service

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
