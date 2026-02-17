import express from "express"
import { students, courses, enrollments} from "./data.js"
/* console.log(students) */

const app = express()

//End points
app.get("/students", (req, res) =>{
    //sorting part
    let result = [...students]
    let sortBy = req.query.sort ?? "name" //write sort instead of bazinga, i fixed it anyway
    let orderBy = req.query.order ?? "asc"
    if (orderBy === "asc"){
    result.sort((a,b) => {
        const aVal = a[sortBy]
        const bVal = b[sortBy]

        if (typeof aVal === "number"){
            return aVal - bVal
        }

        if (typeof aVal === "string"){
            return aVal.localeCompare(bVal)
        }
    })
}
    else if (orderBy === "desc") {
    result.sort((b,a) => {
        const aVal = a[sortBy]
        const bVal = b[sortBy]

        if (typeof aVal === "number"){
            return aVal - bVal
        }

        if (typeof aVal === "string"){
            return aVal.localeCompare(bVal)
        }
    })
    }
    //pagination part
    let page = req.query.page ?? 1
    page = Number(page)
    const limit = 6
    const offset = (page -1) * limit
    result = result.slice(offset, offset + limit)
    const pageCount = Math.ceil(students.length/limit)


    let html = 
        `<style>
            table { border-collapse: collapse; margin: 20px auto}
            th, td { border: 1px solid black; padding: 8px}
            th { background: #f2f2f2}
            h1, p { text-align:center}
            a { text-decoration: none; color: blue}
            .pagination {text-align: center; margin: 20px auto}
            .pagination a {margin: 0 5 px;}
            .pagination strong {argin: 0 5 px; color: yellow;
            background:black; padding: 2px 4 px}
        </style>
        <h1>Students</h1>
        <table>
            <tr>
                <th>ID</th>
                <th><a href="/students?sort=name">Name</th>
                <th><a href="/students?sort=lastname">Lastname</th>
                <th><a href="/students?sort=department">Department</th>
                <th><a href="/students?sort=class">Class</th>
                <th><a href="/students?sort=cgpa">CGPA</th>
                ${result.map(s => `
                <tr>
                    <td>${s.id}</td>
                    <td><a href="/student/${s.id}?page=${page}">${s.name}</td>
                    <td>${s.lastname}</td>` + `
                    <td>${s.department}</td>
                    <td>${s.class}</td>
                    <td>${s.cgpa}</td>
              
                </tr>`).join("")}
            </tr>
        </table>
        <div class="pagination">[
        `
        for(let p=1; p <= pageCount; p++){
            if (p == page){
                html += `<strong>${p}</strong>`
            } else{
                html += `<a href="/students?page=${p}&sort=${sortBy}">${p}</a>"`
            }
        }


    res.send(html)
}) //If your receiving an incoming packet with get from /students

//Endpoint 2
app.get("/student/:stdId", (req, res) => {
    const stdId = Number(req.params.stdId) //params is an object and it contains all parameters?
    const student = students.find( s => s.id == stdId)
    const studentCourses = enrollments.filter( e=> e.studentId == stdId)
                                        .map( e=> courses.find(c=> c.code == e.courseCode))
    let html = 
    `<h1>${student.name} ${student.lastname}</h1>
    <p>Department: ${student.department} </p>
    <p>Class: ${student.class}</p>
    <h2>courses: ${student.name}</h2>
    <ul> ${studentCourses.map(c => `<li>${c.code} - ${c.name} (${c.credit})`)}
    </ul>
    <a href="/students?page=${req.query.page}&sort=${req.query.sort}">Back to List</a>`
    //some parts are missing
    
    res.send(studentCourses)

})

app.listen(3000, () => { console.log("server is running at 3000")})