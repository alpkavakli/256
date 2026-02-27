import express from "express"
const app = express()
app.set("view engine", "ejs")
// Middleware, must be written before routing it matters
//it build  req.body <--- parsed urlencoded form data
app.use( express.urlencoded({extended: true}))

// Routing/Endpoints. We need 2 for a web form, first is get
app.get("/", (req, res ) => {
    //res.send("Hello...")
    res.render("form")
})

app.post("/", (req, res) => {
    /* console.log( req.body) */
    const n1 = parseFloat(req.body.n1)
    const n2 = Number(req.body.n2)
    const op = req.body.op
    /* res.send("POST request sent") */

    let result ;
    switch ( op ) {
        case "add" : result = n1 + n2 ; break;
        case "sub" : result = n1 - n2 ; break;
        case "mul" : result = n1 * n2 ; break;
        case "div" : result = n1 / n2 ; break;
    }

    res.render("form", {result, ...req.body}) //n1, n2 op
/*     res.send(`
        <p>Result: ${result}</p>
        <p><a href="/"> Go back to Form</a></p>
    `) */
})
app.listen(3000, () => console.log("Started..."))


