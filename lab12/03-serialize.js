// Problem:
// 1. We have three tasks that generate random numbers and print them.
// 2. We want to calculate the sum of these three random numbers and print it.
// 3. We want to ensure that the sum is printed only after all three random numbers 
//    have been generated and printed.

// Solution:
// We can use nested setTimeout functions to ensure that each task is executed in sequence, 
// and the sum is calculated only after all tasks are completed.       

// Terminal application:
//  node 03-serialize.js
setTimeout(() => {
    let r1 = Math.floor(Math.random() * 100);
    console.log("Task 1:", r1);
    setTimeout(() => {
        let r2 = Math.floor(Math.random() * 100);
        console.log("Task 2:", r2);
        setTimeout(() => {
            let r3 = Math.floor(Math.random() * 100);
            console.log("Task 3:", r3);
            setTimeout(() => {
                let sum = r1 + r2 + r3;
                console.log("Sum:", sum);
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);
