let task=[];
const addTask = ()=> {
    const taskInput= document.getElementById('taskInput')
    const text= taskInput.value.trim()
    if(text===""){
       
        
        alert("Please enter a task");
        return;
    }
     task.push({
        text:text, 
        completed:false
    });
     taskInput.value="";
     updateTasksList();

};
const updateTasksList = () => {
    const tasksList= document.getElementById('task-list');
    tasksList.innerHTML = ""

    task.forEach((item, Index) => {

        const listItem= document.createElement("li");
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
                    <button onclick="deleteTask(${Index})">🗑</button>
                </div>
            </div>   

        `;
        tasksList.appendChild(listItem);
    });
    updateProgress();

};

const toggleTask=(Index) => {
    task[Index].completed=!task[Index].completed;
    updateTasksList();

};

const updateProgress = () => {
    const completedTasks = task.filter(t => t.completed).length;
    const totalTasks = task.length;

    const progress = document.getElementById("progress");
    const numbers = document.getElementById("numbers");

    numbers.textContent = `${completedTasks}/${totalTasks}`;

    const percentage = totalTasks === 0 
        ? 0 
        : (completedTasks / totalTasks) * 100;

    progress.style.width = `${percentage}%`;
};

const deleteTask = (Index) => {
    task.splice(Index, 1);
    updateTasksList();
}

document.getElementById("newTask").addEventListener('click', function(e){
   e.preventDefault();
    addTask();
})