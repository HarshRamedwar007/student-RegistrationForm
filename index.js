document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('student-form');
  const listContainer = document.getElementById('student-list');
  let editMode = false;
  let editIndex = null;

  let students = JSON.parse(localStorage.getItem('students')) || [];

  function displayStudents() {
    listContainer.innerHTML = `
     <div style="display: flex; justify-content: center;">
      <table style="  border-collapse: separate; border-spacing: 15px;  width: 80%; margin: 0 auto; background-color: #f2f2f2; font-family: Arial, sans-serif;" id="student-table">
        <thead>
          <tr>
            <th style="text-align: center;">Name </th>
            <th style="text-align: center;">ClassId </th>
            <th style="text-align: center;">Class </th>
            <th style="text-align: center;">RollNumber </th>
            <th style="text-align: center;">Actions </th>
          </tr>
        </thead>
        <tbody id="student-table-body">
        </tbody>
      </table></div>
    `;
  
    students.forEach((student, index) => {
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `
        <td style="padding: 5px; text-align: center;">${student.name} </td>
        <td style="padding: 5px; text-align: center;">${student.classid} </td>
        <td style="padding: 5px; text-align: center;">${student.class} </td>
        <td style="padding: 5px; text-align: center;">${student.rollnumber} </td>
        <td>
          <button style="background-color: #4CAF50; color: #fff;" class="edit-btn" data-index="${index}">Edit</button>
          <button style="background-color: #f44336; color: #fff;" class="delete-btn" data-index="${index}">Delete</button>
        </td>
      `;
      document.getElementById('student-table-body').appendChild(tableRow);
    });
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const studentData = {
      name: formData.get('name'),
      classid: formData.get('classid'),
      class: formData.get('class'),
      rollnumber: formData.get('rollnumber'),
    };

    if (editMode) {
      students[editIndex] = studentData;
      editMode = false;
      editIndex = null;
    } else {
      students.push(studentData);
    }

    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    form.reset();
  });

  listContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
      const index = e.target.dataset.index;
      const student = students[index];
      form.name.value = student.name;
      form.classid.value = student.classid;
      form.class.value = student.class;
      form.rollnumber.value = student.rollnumber;
      editMode = true;
      editIndex = index;
    } else if (e.target.classList.contains('delete-btn')) {
      const index = e.target.dataset.index;
      students.splice(index, 1);
      localStorage.setItem('students', JSON.stringify(students));
      displayStudents();
    }
  });

  displayStudents(); // Add this line to list of students
});