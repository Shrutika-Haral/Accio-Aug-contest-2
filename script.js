const students = [
    {
      ID: 1,
      name: 'Shrutika',
      age: 20,
      grade: 'A+',
      degree: 'BSC',
      email: 'shrutika@gmail.com'
    },
    {
      ID: 2,
      name: 'Anna',
      age: 22,
      grade: 'B',
      degree: 'MCom',
      email: 'Anna@example.com'
    },
    {
      ID: 3,
      name: '',
      age: 20,
      grade: 'C',
      degree: 'Arts',
      email: 'charlie@example.com'
    }
  ];
  
  // DOM elements
  const searchInput = document.getElementById('searchInput');
  const studentForm = document.getElementById('studentForm');
  const studentTableBody = document.getElementById('studentTableBody');
  const addEditButton = document.getElementById('addEditButton');
  
  // Initialize the table
  updateStudentTable(students);
  
  // Event listeners
  studentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const studentId = document.getElementById('studentId').value;
    const name = document.getElementById('nameInput').value;
    const age = document.getElementById('ageInput').value;
    const grade = document.getElementById('gradeInput').value;
    const degree = document.getElementById('degreeInput').value;
    const email = document.getElementById('emailInput').value;
  
    if (studentId) {
      // Edit existing student
      const index = students.findIndex(student => student.ID == studentId);
      if (index !== -1) {
        students[index] = { ID: studentId, name, age, grade, degree, email };
      }
    } else {
      // Add new student
      const newId = students.length + 1;
      students.push({ ID: newId, name, age, grade, degree, email });
    }
  
    // Clear form fields
    clearForm();
  
    // Update the table
    updateStudentTable(students);
  });
  
  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.degree.toLowerCase().includes(searchTerm)
    );
    updateStudentTable(filteredStudents);
  });
  
  function updateStudentTable(studentArray) {
    studentTableBody.innerHTML = '';
  
    studentArray.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <head>
      <style>
      button {
        border: none;
        cursor: pointer;
        appearance: none;
        background-color: inherit;
      }
      button:hover{
        transition: all ease 0.2s;
        filter: drop-shadow(0px 1px 8px #ffffff);
      }
      </style>
      </head>

        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>
          <button onclick="editStudent(${student.ID})"><img src="edit.svg"></button>
          <button onclick="deleteStudent(${student.ID})"><img src="trash.svg"></button>
        </td>
      `;
  
      studentTableBody.appendChild(row);
    });
  }
  
  function editStudent(studentId) {
    const student = students.find(student => student.ID == studentId);
    if (student) {
      document.getElementById('studentId').value = student.ID;
      document.getElementById('nameInput').value = student.name;
      document.getElementById('ageInput').value = student.age;
      document.getElementById('gradeInput').value = student.grade;
      document.getElementById('degreeInput').value = student.degree;
      document.getElementById('emailInput').value = student.email;
  
      addEditButton.innerText = 'Edit Student';
    }
  }
  
  function deleteStudent(studentId) {
    const index = students.findIndex(student => student.ID == studentId);
    if (index !== -1) {
      students.splice(index, 1);
      updateStudentTable(students);
    }
  }
  
  function clearForm() {
    document.getElementById('studentId').value = '';
    document.getElementById('nameInput').value = '';
    document.getElementById('ageInput').value = '';
    document.getElementById('gradeInput').value = '';
    document.getElementById('degreeInput').value = '';
    document.getElementById('emailInput').value = '';
  
    addEditButton.innerText = 'Add Student';
  }
