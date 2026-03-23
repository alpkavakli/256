// 1. GET request with links

import express from "express";
//data.js importu yap students courses enrollmentsları alcan
import {students, enrollments, courses} from "./data.js"; //dont forget to use ./
const app = express();

app.get("/students", (req, res) => {
  // Sorting, according to sort criteria in query parameter, default is "name"
  let result = [...students]; 
  const sortBy = req.query.sort ?? "name";
  const isAsc = req.query.isAsc ?? "1";
  if (isAsc=== "1")
  result.sort((a, b) => { //to sort an array, we must first select the property we want to sort:
    const aValue = a[sortBy]; //as its an array of objects, a["name"] refers to name property, so we use 
    // it to choose which parameter we want  
    const bValue = b[sortBy];
    if (typeof aValue === "number") {
      return aValue - bValue;
    }
    if (typeof aValue === "string") {
      return aValue.localeCompare(bValue); //normal string comparation
    }
  });
  else
      result.sort((a, b) => { //to sort an array, we must first select the property we want to sort:
    const aValue = a[sortBy]; //as its an array of objects, a["name"] refers to name property, so we use 
    // it to choose which parameter we want  
    const bValue = b[sortBy];
    if (typeof aValue === "number") {
      return  bValue-aValue;
    }
    if (typeof aValue === "string") {
      return bValue.localeCompare(aValue); //normal string comparation
    }
  });

  // Pagination
  let page = req.query.page ?? 1;
  page = Number(page);
  const limit = 6;
  const offset = (page - 1) * limit;
  result = result.slice(offset, offset + limit); // copies between offset's index to offset + limit -1's indexes.
  const pageCount = Math.ceil(students.length / limit); //total page count is element count / element cnt 
  // in a page, but take ceiling cuz last page may exist without being full
  //homework, do the pagination in descending when clicked twice.
  let html = ` 
    <style>
      table {  border-collapse: collapse; margin: 20px auto; }
      th, td { border: 1px solid black; padding: 8px; }
      th { background-color: #f2f2f2; }
      h1, p { text-align: center; }
      a { text-decoration: none; color: blue; }
      .pagination { text-align: center; margin: 20px; }
      .pagination a { margin: 0 5px; }
      .pagination strong { margin: 0 5px; color: yellow; background-color: black; padding:2px 4px; }
    </style>
    <h1>Students</h1>
    <p>Sorted by: ${sortBy}</p>
    <p>Page: ${page}</p>
    <table>
      <thead>
        <tr>`
          /* ${
            Object.keys(result[0]).map( p => {
              if (isAsc === "1")
           return `<th><a href="/students?sort=${p}&isAsc=0">${p[0].toUpperCase() + p.slice(1)}</a></th>`
              else
          return `<th><a href="/students?sort=${p}&isAsc=1">${p[0].toUpperCase() + p.slice(1)}</a></th>`
            }
          ).join("")} */
          Object.keys(result[0]).forEach(p => {
             const nextOrder = (p === sortBy && isAsc === "1") ? "0" : "1";
            html += `<th><a href="/students?sort=${p}&isAsc=${nextOrder}">${p[0].toUpperCase() + p.slice(1)}</a></th>`
          
         })
          

         

    html += `</tr>
      </thead>
      <tbody>
        ${result
          .map(
            s => `
              <tr>
                <td>${s.id}</td>
                <td><a href="/student/${s.id}?sort=${sortBy}&page=${page}">${s.name}</a></td>
                <td>${s.lastname}</td>
                <td>${s.department}</td>
                <td>${s.class}</td>
                <td>${s.cgpa}</td>
              </tr>`
          )
          .join("")}
      </tbody>
    </table>
    <div class="pagination">
    [`

    for (let p = 1; p <= pageCount; p++) {
      if (p === page) {
        html += ` <strong>${p}</strong> `;
      } else {
        html += ` <a href="/students?sort=${sortBy}&page=${p}">${p}</a> `;
      }
    }
    html += ` ]</div>`;

  res.send(html);
});


app.get("/student/:stdId", (req, res) => {
  const stdId = Number(req.params.stdId); //to convert it to num
  if (Number.isNaN( stdId) )
    res.send("<h2>ERRORRR Enter number after /student/</h2>")
  else if (stdId > students.length)
    res.send("The stdId doesn't exists, enter smaller ids")
  const sortBy = req.query.sort ;
  const page = req.query.page ;
//we have one student corresponding to 1..* classes in enrollments object.
  const student = students.find(s => s.id === stdId); //finds and returns the first matching element, notindex
  const studentCourses = enrollments.filter(e => e.studentId === stdId) //gets all the matching elements as an array
  .map(e => courses.find(c => c.code === e.courseCode)); //maps an array of matching courseCodes from enrolls and courses

  const html = `
    <h1>${student.name} ${student.lastname}</h1>
    <p>Department: ${student.department}</p>
    <p>Class: ${student.class}</p>

    <h2>Courses</h2>
    <ul>
      ${studentCourses
        .map(c => `<li>${c.code} - ${c.name} (${c.credit})</li>`).join("")
      }
    </ul>

    <a href="/students?sort=${sortBy}&page=${page}">Back to list</a>
  `;

  res.send(html);
});


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


/* import { students, courses, enrollments } from "./data.js"; */