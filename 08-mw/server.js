import express from "express"
const app = express()
//Middleware
app.use( (req,res,next )=> {
    req.course = "CTIS256-- Bazinga Development"
    //res.status(400).send("bad bazinga")
    req.time= new Date().toISOString()
    next(); //Remember to write next
})

app.use( (req,res,next)=>{
    const ua = req.headers["user-agent"]
    req.isMobile = ua.includes("Mobile") //user agent string
    next()
})

const infoMw = (req, res, next) => {
    req.info = "This is a route specific message"
    next()


}
//Routing/Endpoints
app.get("/", (req,res)=>{
    res.send(`
        <h1>Homepage</h1>
        <p>Course: ${req.course} </p>
        <p>Time : ${req.time} </p>
        <p>Mobile: ${req.isMobile} </p>
        <p>Info: ${req.info} </p>
    `)
})
app.get("/info", infoMw, (req,res) => {
    res.send(`
        <h1>Information Page</h1>
        <p>Course: ${req.course} </p>
        <p>Time : ${req.time} </p>
        <p>Info: ${req.info} </p>
    `)
})



app.listen(3000, () => console.log("Started"))