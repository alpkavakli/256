import express from "express"
const app = express()

// Blocks the JS thread
// all other request must wait
// Client A → /wait → blocks server (10s)
// Client B → /     → must wait
// Client C → /     → must wait
function waitSync(ms) {
    const start = Date.now();   
    while (Date.now() - start < ms) {
        // do nothing
    }
}

app.get("/wait", (req, res) => {
     waitSync(10000)  //😓 blocks the server
     res.send("Waited for 10 seconds")
})

app.get("/", (req, res) => {
    const time = new Date().toLocaleTimeString("tr-TR", {
    hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
   res.send(`<h1>Welcome to the page : ${time} </h1>`)
})

app.listen(3000, () => console.log("started"))