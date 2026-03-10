/* import { values } from "lodash" */

const task = new Promise( (resolve, reject) => {
    //starts an async task
    setTimeout( () => {
        resolve(500)
    }, 4000)
})
//register "then" handler
//when the task is completed call this function
//and use its output (Value)    
task.then( (value => {
    console.log("value is " + value)
}))