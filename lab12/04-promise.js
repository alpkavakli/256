console.log("Starting the program...");

// Create a Promise and start an asynchronous task
const asyncTask = new Promise((resolve, reject) => {
    // start an asynchronous task (e.g., wait for 2 seconds)
    setTimeout(() => {
        if ( Math.random() > 0.5) {     
            resolve("Async Task completed successfully");
        } else {
            reject("Error: Async Task failed");
        }
    }, 2000);
});

// Register a callback to be executed when the task is completed
asyncTask.then((msg) => {
    console.log(msg);
}).catch((err) => {
    console.log(err);
});

console.log("Finished the program");