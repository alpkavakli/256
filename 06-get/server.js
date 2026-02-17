import express from "express"
import { students, courses, enrollments} from "./data.js"
/* console.log(students) */

const app = express()

//End points
app.get("/students", (req, res) =>{

    let html = 
        `<style>
            table { border-collapse: collapse; margin: 20px auto}
            th, td { border: 1px solid black; padding: 8px}
            th { background: #f2f2f2}
            h1, p { text-align:center}
            a { text-decoration: none; color: blue}
        </style>
        <h1>Students</h1>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Lastname</th>
                <th>Department</th>
                <th>Class</th>
                <th>CGPA</th>
                ${students.map(s => `
                <tr>
                    <td>${s.id}</td>
                    <td><a href="/student/${s.id}">${s.name}</td>
                    <td>${s.lastname}</td>
                    <td>${s.department}</td>
                    <td>${s.class}</td>
                    <td>${s.cgpa}</td>
              
                </tr>`).join("")}
            </tr>
        </table>`
    res.send(html)
}) //If your receiving an incoming packet with get from /students

//Endpoint 2
app.get("/student/:stdId", (req, res) => {
    const stdId = Number(req.params.stdId) //params is an object and it contains all parameters?
    const student = students.find( s => s.id == stdId)
    const studentCourses = enrollments.filter( e=> e.studentId == stdId)
                                        .map( e=> courses.find(c=> c.code == e.courseCode))
    
    
    res.send(studentCourses)

})

app.listen(3000, () => { console.log("server is running at 3000")})