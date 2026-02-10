import http from "http"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const port = 3000
/* console.log(__filename)
console.log(__dirname) */

// request handler
const webserver = (req, res ) => { 
    if ( req.url === "/"){
        req.url = "index.html"
    }
    //logical path to physical path
    // /img/logo.png --> D:\labs\s3\04-ws\public.img\logo.png
    const file = path.join(__dirname, "public", req.url)
    const ext = path.extname(file) // ".png"
    const mimetypes = {
        ".html":"text/html", ".jpg" : "image/png",
        ".pdf" : "application/pdf", ".css" : "text/css", ".js" : "text/javascript"
    }
    if (ext in mimetypes) {
        fs.readFile(file, (err, data) => { //if it exists it puts the data into data else it gives an err message
            if (err){
                //not found error
                notFound(res)
                return
            }
            res.statusCode = 200
            res.setHeader("Content-Type", mimetypes[ext])
            res.write(data)
            res.end()
        })
    }
    else
    {
        //insert not found error here
        notFound(res)
    }
    
}

function notFound(res) {
    res.statusCode = 404
    res.end("<h1>file not found : BAZINGA 404</h1>")
}


const server = http.createServer(webserver)
server.listen(port, () => { console.log("Running at 3000")})