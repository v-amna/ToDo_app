// Array to store all tasks
let task=[];

// Local storage key
const TASKS_KEY = "todo.tasks";

// Load tasks from local storage
const loadTasks = () => {
    const stored = localStorage.getItem(TASKS_KEY);
    task = stored ? JSON.parse(stored) : [];
};

// Save tasks to local storage
const saveTasks = () => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(task));
};

//Add Task Function
const addTask = ()=> {
    const taskInput= document.getElementById('taskInput');
    const text= taskInput.value.trim();

    // Validate input: prevent empty tasks
    if(text===""){
       
        
        alert("Please enter a task");
        return;
    }
    // Add new task to array
     task.push({
        text:text, 
        completed:false
    });
    // Clear input field
     taskInput.value="";
    
     // Update UI
     updateTasksList();
    saveTasks();

};
//Update Task List
const updateTasksList = () => {
    const tasksList= document.getElementById('task-list');
    tasksList.innerHTML = ""// Clear old tasks

    // Loop through each task in the array
    task.forEach((item, Index) => {

        const listItem= document.createElement("li");
        // Create task row with checkbox, text, and delete button
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task">
             <input type="checkbox" ${item.completed ? "checked" : ""} 
                        onclick="toggleTask(${Index})">
                    <p class="${item.completed ? "completed" : ""}">
                        ${item.text}
                    </p>
                </div>
                <div class="icons">
                    <button onclick="deleteTask(${Index})" aria-label="Delete task">🗑</button>
                </div>
            </div>   

        `;
        tasksList.appendChild(listItem);
    });
    updateProgress();

};
// Switches task.completed between true or false
const toggleTask = (Index) => {
    task[Index].completed=!task[Index].completed;
    updateTasksList();
    saveTasks();

};
//  Update Progress Bar
const updateProgress = () => {
    const completedTasks = task.filter(t => t.completed).length;
    const totalTasks = task.length;

    const progress = document.getElementById("progress");
    const numbers = document.getElementById("numbers");

    // Show completed / total
    numbers.textContent = `${completedTasks}/${totalTasks}`;
    
    /*Update width of progress bar*/
    let percentage;

    if (totalTasks === 0) {
        percentage = 0; // No tasks, so progress is 0%
    } else {
        percentage = (completedTasks / totalTasks) * 100;
    }

    progress.style.width = percentage + "%";

};

// Removes task from array by index
const deleteTask = (Index) => {
    task.splice(Index, 1);
    updateTasksList();
    saveTasks();
};

// Initialize UI and register event handlers once DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    // Ensure the task list and progress reflect current state
    updateTasksList();

    // Add task button
    const newTaskBtn = document.getElementById("newTask");
    if (newTaskBtn) {
        newTaskBtn.addEventListener('click', function(e){
            e.preventDefault();
            addTask();
        });
    }

    // Allow Enter key in the input to add a task
    const taskInput = document.getElementById('taskInput');
    if (taskInput) {
        taskInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTask();
            }
        });
    }
});