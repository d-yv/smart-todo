import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { renderTasks } from './render.js';

const categories = ['Работа', 'Дом', 'Учёба', 'Спорт'];
const assignees = ['Юра', 'Катя', 'Таня', 'Надя'];

const date = document.querySelector('#deadline');

let userSelectedDate = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const dateNow = new Date();
    let dateVerify = selectedDates[0];
    if (dateVerify > dateNow) {
      userSelectedDate = dateVerify;
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
  },
};

flatpickr(date, options);

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
  const assignedTo = document.querySelector('#assigneeSelect').value;

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
