import { renderTasks } from './render.js';

const categories = ['Работа', 'Дом', 'Учёба', 'Спорт'];
const assignees = ['Я', 'Катя', 'Команда', 'Не важно'];

function populateSelect(selectElement, options) {
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    selectElement.appendChild(opt);
  });
}

populateSelect(document.querySelector('#categorySelect'), categories);
populateSelect(document.querySelector('#assigneeSelect'), assignees);

let tasks = [];

const form = document.querySelector('#taskForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const category = document.querySelector('#categorySelect').value;
  const deadline = document.querySelector('#deadline').value;
  const assignedTo = document.querySelector('#assigneeSelect').value.trim();

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
