// Define variables
const form = document.querySelector("form");
const inpTask = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clrBtn = document.querySelector(".btn");
const filter = document.getElementById("filter");

form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clrBtn.addEventListener("click", clearTasks);
filter.addEventListener("keyup", filterTasks);

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
    inpTask.value = "";

    console.log(inpTask.value);
  }

  e.preventDefault();
}

// Remove the Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }

  //   console.log(e.target);
}

// Clear the Tasks
function clearTasks(e) {
  // First method
  //  taskList.innerHTML = '';

  // Second method
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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

sessionStorage.setItem("name1", "julia");
const name1 = sessionStorage.getItem("name1");
const name2 = JSON.parse(sessionStorage.getItem("name1"));
// console.log(typeof name1);
