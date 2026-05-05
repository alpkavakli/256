import express from "express"
import todoRouter from "./routes/todos.js"
const app = express()
const port = 3001;
//public şeyini kullanmayı yazmadın
app.use(express.static("public"))

app.use(express.json())
//main shouldn't contain endpoints usually
app.use("/api/todos", todoRouter)
//app.use("/api/users", userRouter)
//app.use("/api/users", todoRouter)
//app.use("/api/users", todoRouter)

app.listen(port, () => {
console.log("App is running on port: " +  port);
})