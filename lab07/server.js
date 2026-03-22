// Middleware runs before the route handler.
// It can read/modify req/res, end the response, or call next().

// http://localhost:3000/ -> Middlewares -> Route Handler
// http://localhost:3000/info -> Middlewares -> Route-specific Middleware -> Route Handler 

import express from "express";
const app = express();

// Metadata Middleware: Adds course and time information to the request object
app.use( (req, res, next) => {
  req.course = "CTIS256";
  req.time = new Date().toISOString();
  next();
});

// User-Agent Middleware
app.use( (req, res, next) => {
  const ua = req.headers["user-agent"] ?? "";
  req.isMobile = ua.includes("Mobile");
  next();
});

// only for the "/info" route
const infoRouteMw = (req, res, next) => {
  req.info = "This is some route-specific information.";
  next();
};

app.get("/", (req, res) => {
  res.send(`Course: ${req.course} <br> 
            Time: ${req.time} <br> 
            Is Mobile: ${req.isMobile} <br>
            Info: ${req.info ?? "Route-level middleware did not run"}  
            `);
});

app.get("/info", infoRouteMw, (req, res) => {
  res.send(`About Page - Time: ${req.time}, <br>Info: ${req.info}`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});