import express from "express"
const app = express() // createApplication() -> express object

/* Routing express ( we define endpoint) */
app.get("/", (req,res) => {
    res.send("<h1>Homepage: Welcome</h1>")
})

app.get("/users", (req,res) => {
    //it expects page and sort query params
    const page = req.query.page ?? 1
    const sort = req.query.sort ?? "name"
    res.send(`<h2>User list : sort: ${sort}
            page: ${page}
            `)
})

app.get("/users/:id", (req, res) => {
    res.send(`
        "User Id : ${req.params.id}`)

})

app.get("/users/:id/posts", (req, res) => {
    const page = req.query.page ?? 1
    res.send(`
        Posts of User ${req.params.id} for Page ${page}
    `)
})

app.listen(3000, () => {console.log("App started at 3000")})
