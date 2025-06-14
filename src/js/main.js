import { renderTasks } from './render.js';

let tasks = [];

const form = document.querySelector('#taskForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const category = document.querySelector('#category').value;
  const deadline = document.querySelector('#deadline').value;
  const assignedTo = document.querySelector('#assignedTo').value.trim();

  const task = {
    id: Date.now(),
    title,
    category,
    deadline,
    assignedTo,
    completed: false,
  };

  tasks.push(task);
  form.reset();
  renderTasks(tasks, updateTaskStatus);
});

function updateTaskStatus(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks(tasks, updateTaskStatus);
  }
}
