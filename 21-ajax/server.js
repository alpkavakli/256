import express from "express"
const app = express()
const port = 3000;
app.use(express.static("public"))

//REST API http://localhost:3000/api/exchange

app.get("/api/exchange", (req, res) => {
    const baseUSD = 45
    const baseEUR = 52.80
    const baseGBP = 60.95
    const offset = Math.random()
    const data = [
        {cur:"USD", buy: baseUSD + offset, sell: baseUSD + 0.5 + offset},
        {cur:"EUR", buy: baseEUR + offset, sell: baseEUR + 0.5 + offset},
        {cur:"GBP", buy: baseGBP + offset, sell: baseGBP + 0.5 + offset}
    ]
    res.json(data)
})

app.listen(port, () => {
    console.log("Server is on, on port " + port);
})