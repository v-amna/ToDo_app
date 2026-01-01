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
                    <button onclick="deleteTask(${index})">🗑</button>
                </div>
            </div>   

        `;
        tasksList.appendChild(listItem);
    });

};


document.getElementById("newTask").addEventListener('click', function(e){
   e.preventDefault();
    addTask();
})