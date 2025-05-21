


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let sortAscending = true;
let isDarkMode = false;

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const desc = document.getElementById("taskDesc").value.trim();
  const category = document.getElementById("taskCategory").value;
  const dueDate = document.getElementById("taskDate").value;

  if (!title || !dueDate) {
    alert("Please enter at least Title and Due Date.");
    return;
  }

  const newTask = {
    title,
    desc,
    category,
    dueDate,
    completed: false
  };

  tasks.push(newTask);
  saveAndRender();
  clearForm();
}

function clearForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
  document.getElementById("taskCategory").value = "Work";
  document.getElementById("taskDate").value = "";
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = [...tasks];

  const selectedCategory = document.getElementById("filterCategory").value;
  const selectedStatus = document.getElementById("filterStatus").value;

  if (selectedCategory !== "All") {
    filtered = filtered.filter(task => task.category === selectedCategory);
  }

  if (selectedStatus !== "All") {
    const isCompleted = selectedStatus === "Completed";
    filtered = filtered.filter(task => task.completed === isCompleted);
  }

  filtered.sort((a, b) => {
    return sortAscending
      ? new Date(a.dueDate) - new Date(b.dueDate)
      : new Date(b.dueDate) - new Date(a.dueDate);
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-title">${task.title}</div>
      <div>${task.desc}</div>
      <div>📅 ${task.dueDate} | 📁 ${task.category}</div>
      <div class="task-controls">
        <button onclick="toggleComplete(${index})">${task.completed ? "✅ Undo" : "✔️ Complete"}</button>
        <button onclick="deleteTask(${index})">❌ Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveAndRender();
  }
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleSort() {
  sortAscending = !sortAscending;
  renderTasks();
}

function toggleMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
}

window.onload = renderTasks;
