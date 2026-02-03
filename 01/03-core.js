import fs from "fs"
import os from "os"
import process from "process"

function logMessage(msg) {
    const time = new Date().toLocaleDateString("tr-TR",
     {
        year: "numeric", month: "long", day: "2-digit",
        hour: "2-digit", minute:"2-digit", second: "2-digit"
     }
    )

    const platform = os.platform();
    const pid = process.pid
    /* const user = os.userInfo(); */
    const logLine = `${time} | PID: ${pid}  | ${platform} | ${msg}\n`
    fs.appendFile("log.txt ", logLine, err => {})
}

console.log("Logging a message....")
logMessage("App started...")
