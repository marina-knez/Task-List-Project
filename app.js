const addBtn = document.querySelector('#btn-1');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('#btn-2');

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    addBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', removeTask);
    taskList.addEventListener('click', taskDone);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}



function getTasks() {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        
        li.appendChild(link);

        const check = document.createElement('a');
        check.className = 'check-box';
        check.innerHTML = '<i class="fa fa-check"></i>';
        li.appendChild(check);

        taskList.appendChild(li);   
    });
}



function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a Task.');
    } else {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        const check = document.createElement('a');
        check.className = 'check-box';
        check.innerHTML = '<i class="fa fa-check"></i>';
        li.appendChild(check);

        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }

    e.preventDefault();
}



function storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function removeTask(e) {

    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You sure?')) {
        e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}



function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function taskDone(e) {
    if(e.target.parentElement.classList.contains('check-box')) {
        e.target.parentElement.previousElementSibling.parentElement.style.color = 'lightgrey';
        e.target.parentElement.previousElementSibling.parentElement.style.textDecoration = 'line-through';
        e.target.parentElement.previousElementSibling.parentElement.style.fontStyle = 'italic';
        e.target.style.display = 'none';
        e.target.parentElement.previousElementSibling.style.color = 'darkorange';
    } 
}



function clearTasks(e) {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}



function clearTasksFromLocalStorage() {
    localStorage.clear();
}



function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}