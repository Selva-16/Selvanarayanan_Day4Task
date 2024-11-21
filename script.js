const addBut = document.getElementById('ad');
const ti = document.getElementById('ti');
const tl = document.getElementById('tl');

load(); // To load tasks

// Add a Task
function addTask() {
    const task = ti.value.trim();
    if (task) {
        // Call Another Function
        createTask(task); 
        ti.value = '';
        // Call to store local
        save(); 
    } else {
        alert('Please Enter a Task..');
    }
}

// Set Listener for Add Task
addBut.addEventListener('click', addTask);

function createTask(task) {
    const liitem = document.createElement('li');
    liitem.textContent = task;

    // Add hover effect for line-through
    liitem.addEventListener('mouseover', () => {
        liitem.style.textDecoration = 'line-through';
        liitem.style.color = '#888';
    });

    liitem.addEventListener('mouseout', () => {
        liitem.style.textDecoration = 'none';
        liitem.style.color = '#000';
    });

    // Create Delete Button
    const db = document.createElement('button');
    db.textContent = 'Delete';
    db.className = 'delTask';
    liitem.append(db); // Append delete button
    tl.append(liitem);

    // Set Listener for delete button
    db.addEventListener('click', function () {
        tl.removeChild(liitem);
        save();
    });
}

// Save locally
function save() {
    let tasks = [];
    tl.querySelectorAll('li').forEach(function (item) {
        const taskText = item.childNodes[0].textContent.trim();
        tasks.push(taskText);
    });

    // Store locally
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks
function load() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTask);
}
