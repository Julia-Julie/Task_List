// Define variables
const form = document.querySelector("form");
const inpTask = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clrBtn = document.querySelector(".btn");
const filter = document.getElementById("filter");

loadEventListeners();
// Event Listeners
function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clrBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

// The page is loaded
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    const link = document.createElement("a");
    link.className = "delete-item";
    link.innerHTML = '<i class="far fa-trash-alt"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

// Add the task
function addTask(e) {
  if (inpTask.value === "") {
    alert("Please, add a task!");
  } else {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(inpTask.value));
    const link = document.createElement("a");
    link.className = "delete-item";
    link.innerHTML = '<i class="far fa-trash-alt"></i>';
    li.appendChild(link);
    taskList.appendChild(li);

    // Store in Local Storage
    storeTasksInLocalStorage(inpTask.value);

    inpTask.value = "";
    // console.log(inpTask.value);
  }

  e.preventDefault();
}

// Store in Local Storage
function storeTasksInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  
}

// Remove the Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }

}
  // Remove from Local Storage
  function removeTaskFromLS(getItem){
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(currTask, index){
      if(getItem.textContent === currTask){
        tasks.splice(index, 1);
      }
     
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))

  } 


// Clear the Tasks
function clearTasks(e) {
  // First method
  //  taskList.innerHTML = '';

  // Second method
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear from Local Storage
  clearFromLS();
}
  function clearFromLS(){
    localStorage.clear();
  }

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    // console.log(item);

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

// sessionStorage.setItem("name1", "julia");
// const name1 = sessionStorage.getItem("name1");
// const name2 = JSON.parse(sessionStorage.getItem("name1"));
// console.log(typeof name1);
