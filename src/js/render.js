const taskList = document.querySelector('#taskList');

export function renderTasks(tasks, updateTaskStatus) {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    const deadlineDate = new Date(task.deadline);
    const isOverdue = !task.completed && deadlineDate < new Date();

    li.innerHTML = `
      <div>
        <strong>${task.title}</strong> 
        <em>(${task.category})</em> 
        <span>→ ${task.assignedTo}</span> 
        <time>${deadlineDate.toLocaleString()}</time>
        ${isOverdue ? '<span class="overdue">⚠️ Просрочено</span>' : ''}
      </div>
      <button data-id="${task.id}">✓</button>
    `;

    li.querySelector('button').addEventListener('click', () => {
      updateTaskStatus(task.id);
    });

    if (task.completed) {
      li.classList.add('completed');
    }

    if (isOverdue) {
      li.classList.add('overdue');
    }

    taskList.appendChild(li);
  });
}
