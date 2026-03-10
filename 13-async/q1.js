import express from "express"
const app = express()

app.get("/", (req, res) => {
    const time = new Date().toLocaleTimeString("tr-TR",
    {
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    })
    res.send(`
        <h2>Welcome to the Page</h2>
        <h3>${time}</h3>
        `)
    /* Task(3000)
    res.send(`<p>Task is completed in 3 seconds </p>`) */
       
})

app.get("/task", (req, res)=> {
    Task(10000000)
    res.send(`<p>Task is completed in 10 seconds </p>`)
})

function Task(ms){
    const start = Date.now()    //returns timestamp in ms
    while( Date.now() - start < ms) {}
}



app.listen(3000)
