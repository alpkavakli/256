import http from "http";
import {UAParser} from "ua-parser-js";
const port = 3000;

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const host = req.headers.host;
  const userAgent = req.headers["user-agent"];
  console.log(method, url, host, userAgent)
  // Parse the User-Agent header to get more detailed info about the client
  const info = new UAParser(userAgent).getResult();

  // Prepare the response
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  res.write(`
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Incoming Request</h1>
        <ul>
          <li><b>Method:</b> ${method}</li>
          <li><b>URL:</b> ${url}</li>
          <li><b>Host:</b> ${host}</li>
          <li><b>User-Agent:</b> ${userAgent}</li>
          <li><b>Browser:</b> ${info.browser.name} ${info.browser.version}</li>
          <li><b>OS:</b> ${info.os.name} ${info.os.version}</li>
        </ul>
      </body>
    </html>
  `);
  res.end();
});

// Server-level error handling only
server.on("error", (err) => {
  console.error("Server error:", err.message);
});

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
