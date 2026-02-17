export const students = [
  { id: 1, name: "Alice", lastname: "Brown", department: "CTIS", class: 2, cgpa: 3.21 },
  { id: 2, name: "Bob", lastname: "Smith", department: "MATH", class: 3, cgpa: 2.87 },
  { id: 3, name: "Charlie", lastname: "Adams", department: "CTIS", class: 1, cgpa: 2.34 },
  { id: 4, name: "Diana", lastname: "White", department: "PHYS", class: 2, cgpa: 3.02 },
  { id: 5, name: "Ethan", lastname: "Clark", department: "CTIS", class: 4, cgpa: 3.68 },
  { id: 6, name: "Fiona", lastname: "Green", department: "MATH", class: 1, cgpa: 2.11 },
  { id: 7, name: "George", lastname: "Hall", department: "PHYS", class: 3, cgpa: 2.95 },
  { id: 8, name: "Hannah", lastname: "Young", department: "CTIS", class: 2, cgpa: 3.44 },
  { id: 9, name: "Ian", lastname: "King", department: "MATH", class: 2, cgpa: 2.73 },
  { id: 10, name: "Julia", lastname: "Scott", department: "PHYS", class: 4, cgpa: 3.59 },
  { id: 11, name: "Kevin", lastname: "Turner", department: "CTIS", class: 1, cgpa: 2.48 },
  { id: 12, name: "Laura", lastname: "Baker", department: "MATH", class: 4, cgpa: 3.81 },
  { id: 13, name: "Mia", lastname: "Evans", department: "PHYS", class: 1, cgpa: 2.06 },
  { id: 14, name: "Noah", lastname: "Carter", department: "CTIS", class: 3, cgpa: 3.12 },
  { id: 15, name: "Olivia", lastname: "Mitchell", department: "MATH", class: 2, cgpa: 2.64 },
  { id: 16, name: "Peter", lastname: "Roberts", department: "PHYS", class: 2, cgpa: 3.27 },
  { id: 17, name: "Quinn", lastname: "Collins", department: "CTIS", class: 4, cgpa: 3.93 },
  { id: 18, name: "Ruby", lastname: "Phillips", department: "MATH", class: 1, cgpa: 1.94 },
  { id: 19, name: "Sara", lastname: "Campbell", department: "PHYS", class: 3, cgpa: 2.89 },
  { id: 20, name: "Tom", lastname: "Parker", department: "CTIS", class: 2, cgpa: 3.36 }
];


export const courses = [
  { code: "CTIS151", name: "Introduction to Programming", credit: 3, department: "CTIS" },
  { code: "CTIS152", name: "Algorithms and Data Structures", credit: 3, department: "CTIS" },
  { code: "CTIS255", name: "Frontend Web Technologies", credit: 3, department: "CTIS" },
  { code: "CTIS256", name: "Introduction to Backend Development", credit: 3, department: "CTIS" },
  { code: "MATH101", name: "Calculus I", credit: 4, department: "MATH" },
  { code: "MATH102", name: "Calculus II", credit: 4, department: "MATH" },
  { code: "MATH223", name: "Linear Algebra I", credit: 3, department: "MATH" },
  { code: "MATH224", name: "Linear Algebra II", credit: 3, department: "MATH" },
  { code: "PHYS101", name: "General Physics I", credit: 4, department: "PHYS" },
  { code: "PHYS102", name: "General Physics II", credit: 4, department: "PHYS" },
  { code: "PHYS211", name: "Waves & Optics", credit: 4, department: "PHYS" },
  { code: "PHYS212", name: "Modern Physics", credit: 4, department: "PHYS" },
];

export const enrollments = [
  { studentId: 1, courseCode: "CTIS255" },
  { studentId: 1, courseCode: "MATH101" },
  { studentId: 1, courseCode: "PHYS101" },
  { studentId: 1, courseCode: "MATH223" },

  { studentId: 2, courseCode: "MATH101" },
  { studentId: 2, courseCode: "MATH223" },
  { studentId: 2, courseCode: "PHYS101" },

  { studentId: 3, courseCode: "CTIS256" },
  { studentId: 3, courseCode: "PHYS101" },
  { studentId: 3, courseCode: "MATH102" },

  { studentId: 4, courseCode: "PHYS101" },
  { studentId: 4, courseCode: "PHYS102" },
  { studentId: 4, courseCode: "MATH101" },
  { studentId: 4, courseCode: "MATH102" },

  { studentId: 5, courseCode: "CTIS151" },
  { studentId: 5, courseCode: "CTIS152" },
  { studentId: 5, courseCode: "CTIS256" },
  { studentId: 5, courseCode: "MATH223" },

  { studentId: 6, courseCode: "MATH101" },
  { studentId: 6, courseCode: "MATH102" },
  { studentId: 6, courseCode: "MATH224" },

  { studentId: 7, courseCode: "PHYS211" },
  { studentId: 7, courseCode: "PHYS212" },
  { studentId: 7, courseCode: "MATH102" },

  { studentId: 8, courseCode: "CTIS255" },
  { studentId: 8, courseCode: "CTIS256" },
  { studentId: 8, courseCode: "MATH101" },

  { studentId: 9, courseCode: "MATH223" },
  { studentId: 9, courseCode: "MATH224" },
  { studentId: 9, courseCode: "PHYS101" },

  { studentId: 10, courseCode: "PHYS101" },
  { studentId: 10, courseCode: "PHYS212" },

  { studentId: 11, courseCode: "CTIS151" },
  { studentId: 11, courseCode: "CTIS255" },

  { studentId: 12, courseCode: "MATH101" },
  { studentId: 12, courseCode: "MATH102" },
  { studentId: 12, courseCode: "MATH223" },

  { studentId: 13, courseCode: "PHYS101" },
  { studentId: 13, courseCode: "PHYS211" },

  { studentId: 14, courseCode: "CTIS152" },
  { studentId: 14, courseCode: "CTIS255" },
  { studentId: 14, courseCode: "MATH102" },

  { studentId: 15, courseCode: "MATH224" },
  { studentId: 15, courseCode: "PHYS102" },

  { studentId: 16, courseCode: "PHYS102" },
  { studentId: 16, courseCode: "PHYS212" },
  { studentId: 16, courseCode: "MATH101" },

  { studentId: 17, courseCode: "CTIS151" },
  { studentId: 17, courseCode: "CTIS256" },

  { studentId: 18, courseCode: "MATH101" },
  { studentId: 18, courseCode: "MATH223" },

  { studentId: 19, courseCode: "PHYS211" },
  { studentId: 19, courseCode: "PHYS212" },

  { studentId: 20, courseCode: "CTIS255" },
  { studentId: 20, courseCode: "PHYS101" },
  { studentId: 20, courseCode: "MATH223" }
];
