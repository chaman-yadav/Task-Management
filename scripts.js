document.addEventListener('DOMContentLoaded', () => {
  const tasks = [];
  let editIndex = -1;

  const taskForm = document.getElementById('taskForm');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const taskList = document.getElementById('taskList');

  taskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (editIndex === -1) {
          createTask();
      } else {
          updateTask();
      }
  });

  resetBtn.addEventListener('click', resetForm);
  searchBtn.addEventListener('click', searchTasks);

  function createTask() {
      const title = document.getElementById('taskTitle').value;
      const description = document.getElementById('taskDescription').value;
      const task = { title, description };
      tasks.push(task);
      renderTasks();
      resetForm();
  }

  function resetForm() {
      document.getElementById('taskTitle').value = '';
      document.getElementById('taskDescription').value = '';
      submitBtn.textContent = 'Submit';
      editIndex = -1;
  }

  function renderTasks(filteredTasks = tasks) {
      taskList.innerHTML = '';
      filteredTasks.forEach((task, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <th scope="row">${index + 1}</th>
              <td>${task.title}</td>
              <td>${task.description}</td>
              <td>
                  <button class="btn btn-sm btn-warning" onclick="editTask(${index})">Edit</button>
              </td>
              <td>
                  <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
              </td>
          `;
          taskList.appendChild(row);
      });
  }

  window.editTask = function(index) {
      const task = tasks[index];
      document.getElementById('taskTitle').value = task.title;
      document.getElementById('taskDescription').value = task.description;
      submitBtn.textContent = 'Update';
      editIndex = index;
  };

  function updateTask() {
      const title = document.getElementById('taskTitle').value;
      const description = document.getElementById('taskDescription').value;
      tasks[editIndex] = { title, description };
      renderTasks();
      resetForm();
  }

  window.deleteTask = function(index) {
      tasks.splice(index, 1);
      renderTasks();
  };

  function searchTasks() {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredTasks = tasks.filter(task =>
          task.title.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm)
      );
      renderTasks(filteredTasks);
  }

  renderTasks();
});
