/* console.log("Started") */
import http from "http" // or node:http
const port = 4000 //3000

const server = http.createServer((req, res) => {
    // This request handler is our application
    const method = req.method
    const path = req.url

    // Homepage Endpoint
    if ( method === "GET" && path === "/")
    {
        // Prepare HTTP Response Packet
        res.statusCode = 200
        // tesxt/html, image/png, application/pdf : mime types
        res.setHeader("Content-Type", "text/html")
        res.write(`
            <h1>Homepage</h1>
            <p>Method: ${method}</p>
            <p>Path: ${path}</p>
            <p><a href="/about">About Page</a></p>
        `)
        res.end()
    }   

    //About Endpoint
    if ( method ==="GET" && path === "/about"){
        //generate about page
        res.statusCode = 200
        res.setHeader("Content-Type", "text/html")
        res.write(`
            <h1> About Page </h1>
            <p>This page is served by Nodejs</p>
            <p><a href="/">Homepage</a><p>
        `)
        res.end()
    }
    // 404 Not found
    res.statusCode = 404
    res.setHeader("Content-Type", "text/html")
    res.write(`
        <h1>Service not Found : ${path} </h1>
    `)
    res.end()
})

server.listen(port, () => {
    // callback function, it is invoked when the server works fine
    console.log("Bazinga at " + port) //Server is working on
})

server.on("error", (err) => {
    console.log("Failed: " + err.message)
})

