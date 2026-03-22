// 1. GET request with links

import express from "express";
import { students, courses, enrollments } from "./data.js";

const app = express();

app.get("/students", (req, res) => {
  // Sorting
  let result = [...students];
  const sortBy = req.query.sort ?? "name";
  result.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (typeof aValue === "number") {
      return aValue - bValue;
    }
    if (typeof aValue === "string") {
      return aValue.localeCompare(bValue);
    }
  });

  // Pagination
  let page = req.query.page ?? 1;
  page = Number(page);
  const limit = 6;
  const offset = (page - 1) * limit;
  result = result.slice(offset, offset + limit);
  const pageCount = Math.ceil(students.length / limit);

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
        <tr>
          <th>Id</th>
          <th><a href="/students?sort=name">Name</a></th>
          <th><a href="/students?sort=lastname">Last Name</a></th>
          <th><a href="/students?sort=department">Department</a></th>
          <th><a href="/students?sort=class">Class</a></th>
          <th><a href="/students?sort=cgpa">CGPA</a></th>
        </tr>
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
  const stdId = Number(req.params.stdId);
  const sortBy = req.query.sort ;
  const page = req.query.page ;

  const student = students.find(s => s.id === stdId);
  const studentCourses = enrollments.filter(e => e.studentId === stdId)
                                    .map(e => courses.find(c => c.code === e.courseCode));

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
