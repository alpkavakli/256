const radius = 5;
let area = Math.PI * (radius ** 2); // ** means power of
console.log(`Area of the circle is ${area}`);

console.log("Function starting...");
fn();
console.log("Function ended.");

function fn() {
    console.log("Hello World");
}

// To debug code in Chrome DevTools
// 1. node --inspect-brk 01-helloWorld.js
// 2. Open Chrome, and type chrome://inspect in the address bar
// 3. Click on "inspect" link under "Remote Target"

