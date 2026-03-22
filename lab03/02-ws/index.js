import http from "http"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// console.log(__filename)
// console.log(__dirname)
const port = 3000
const mimetypes = {
    ".html" : "text/html", 
    ".jpg" : "image/jpg", 
    ".png" : "image/png",
    ".pdf" : "application/pdf", 
    ".css" : "text/css", 
    ".js" : "text/javascript"
   }

// request handler
const webserver = (req, res) => {
   if ( req.url === "/") {
    req.url = "index.html"
   }
   // logical path to physical path (file system)
   // /img/logo.png --> D:\labs\s3\04-ws\public\img\logo.png
   const file = path.join(__dirname, "public", req.url)
   const ext = path.extname(file)  // ".png" , ".html", ".pdf", etc
   if ( ext in mimetypes) {
     fs.readFile(file, (err, data) => {
        if (err) {
            notFound(res) // file not found
            return
        }
        res.statusCode = 200
        res.setHeader("Content-Type", mimetypes[ext])
        res.write(data) // send file content to client
        res.end()
     })
   } else {
     notFound(res, "Unsupported file type : " + ext)
   }
}

function notFound(res, msg = "File not found") {
    res.statusCode = 404
    res.end("<h1>" + msg + "</h1>")
}

const server = http.createServer(webserver)

server.listen(port, () => { 
    console.log("Web Server is running at port " + port)
})
server.on("error", (err) => {
    console.log("Error : " + err.message)
})