// Adding core modules
import fs from "fs";
import os from "os";
import process from "process";

 function logMessage(message) {
  const timestamp = new Date().toLocaleDateString("tr-TR", {
    year: "numeric", month: "long", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });

  const platform = os.platform();
  const pid = process.pid;

  const logLine =
    `${timestamp} | PID:${pid} | ${platform} | ${message}\n`;

  fs.appendFile("log.txt", logLine, (err) => {});
}

console.log("Logging a message to a file...");
logMessage("Application started");                            


