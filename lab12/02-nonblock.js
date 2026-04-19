import express from "express"
const app = express()

// non-blocking code
app.get("/task", (req, res) => {
     // delegate the task to node API ( a new thread )
     setTimeout( () => {
        res.send("Waited for 10 seconds")
     }, 10000) // starts async task
     // res.send("Waited for 10 seconds") // doesn't work
})

app.get("/", (req, res) => {
    const time = new Date().toLocaleTimeString("tr-TR", {
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
   res.send(`<h1>Welcome to the page : ${time} </h1>`)
})

app.listen(3000, () => console.log("started"))