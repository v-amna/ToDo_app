// Array to store all tasks
let task=[];

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
};

document.getElementById("newTask").addEventListener('click', function(e){
   e.preventDefault();
    addTask();
});