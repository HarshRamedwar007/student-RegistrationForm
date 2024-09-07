document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('student-form');
  const listContainer = document.getElementById('student-list');
  let editMode = false;
  let editIndex = null;

  let students = JSON.parse(localStorage.getItem('students')) || [];

  function displayStudents() {
    listContainer.innerHTML = `
      <div style="display: flex; justify-content: center;">
        <table style="border-collapse: separate; border-spacing: 15px; width: 80%; margin: 0 auto; background-color: #f2f2f2; font-family: Arial, sans-serif;" id="student-table">
          <thead>
            <tr>
              <th style="text-align: center;">Name </th>
              <th style="text-align: center;">ClassId </th>
              <th style="text-align: center;">Email </th>
              <th style="text-align: center;">Contact </th>
              <th style="text-align: center;">Actions </th>
            </tr>
          </thead>
          ${createTbody(students)}
        </table>
      </div>
    `;
  }

  function createTbody(students) {
    let tbodyHtml = '';
    students.forEach((student, index) => {
      tbodyHtml += `
        <tr>
          <td style="padding: 5px; text-align: center;">${student.name} </td>
          <td style="padding: 5px; text-align: center;">${student.classid} </td>
          <td style="padding: 5px; text-align: center;">${student.email} </td>
          <td style="padding: 5px; text-align: center;">${student.contact} </td>
          <td>
            <button style="background-color: #4CAF50; color: #fff;" class="edit-btn" data-index="${index}">Edit</button>
            <button style="background-color: #f44336; color: #fff;" class="delete-btn" data-index="${index}">Delete</button>
          </td>
        </tr>
      `;
    });
    return `<tbody id="student-table-body">${tbodyHtml}</tbody>`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const studentData = {
      name: formData.get('name'),
      classid: formData.get('classid'),
      email: formData.get('email'),
      contact: formData.get('contact'),
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
      form.email.value = student.email;
      form.contact.value = student.contact;
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