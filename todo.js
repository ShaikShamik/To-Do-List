const input = document.querySelector("#wrapper input")
const addbutton = document.querySelector("#add-btn")
const taskscontainer = document.querySelector("#tasks")
const error = document.getElementById("error")
const count = document.querySelector(".count-value")

let taskcount = 0

const displaycount = (taskcount) => {
    count.innerText = taskcount;
}
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskcount = savedTasks.length;
    displaycount(taskcount);

    savedTasks.forEach((taskData) => {
        const task = createTaskElement(taskData.name, taskData.completed);
        taskscontainer.appendChild(task);
    });
});

const createTaskElement = (taskname, completed) => {
    const task = document.createElement('div');
    task.className = 'task';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-check';
    checkbox.checked = completed;

    const taskNameSpan = document.createElement('span');
    taskNameSpan.className = 'taskname';
    taskNameSpan.innerText = taskname;

    const editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';

    task.appendChild(checkbox);
    task.appendChild(taskNameSpan);
    task.appendChild(editButton);
    task.appendChild(deleteButton);

    checkbox.onchange = () => {
        taskNameSpan.classList.toggle('completed', checkbox.checked);
        saveTasksToLocalStorage();
        displaycount(taskcount);
    };

    editButton.onclick = (e) => {
        let targetElement = e.target;
        if (e.target.className !== 'edit') {
            targetElement = e.target.parentElement;
        }
        input.value = targetElement.previousElementSibling?.innerText;
        targetElement.parentNode.remove();
        taskcount -= 1;
        displaycount(taskcount);
        saveTasksToLocalStorage();
    };

    deleteButton.onclick = () => {
        task.remove();
        taskcount -= 1;
        displaycount(taskcount);
        saveTasksToLocalStorage();
    };

    return task;
};

const saveTasksToLocalStorage = () => {
    const tasks = [];
    const taskElements = document.querySelectorAll('.task');
    taskElements.forEach((taskElement) => {
        const taskName = taskElement.querySelector('.taskname').innerText;
        const completed = taskElement.querySelector('.task-check').checked;
        tasks.push({ name: taskName, completed: completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskName = input.value.trim();
    error.style.display = 'none';
    if (!taskName) {
        setTimeout(() => {
            error.style.display = 'block';
        }, 200);
        return;
    }
    const task = createTaskElement(taskName, false);
    taskscontainer.appendChild(task);
    taskcount += 1;
    displaycount(taskcount);
    saveTasksToLocalStorage();
};

addbutton.addEventListener('click', addTask);