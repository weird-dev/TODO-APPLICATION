const todoList = document.getElementById('todoList');
const newTodoInput = document.getElementById('newTodo');
const todos = JSON.parse(localStorage.getItem('todos')) || [];

function loadTodos() {
    todoList.innerHTML = "";
    todos.forEach(todo => addTodoElement(todo.text, todo.completed));
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
    const todoText = newTodoInput.value.trim();
    if (todoText !== "") {
       addTodoElement(todoText, false);
       newTodoInput.value = "";
       saveTodos();
    }
}

function addTodoElement(todoText, completed) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todoText}</span>
      <button onclick="completeTodo(this)">Complete</button>`;
    if (completed) {
        li.classList.add("completed");
    } 
    todoList.appendChild(li)
    todos.push({text: todoText, completed});

    saveTodos();
} 

function completeTodo(button) {
    const listItem = button.parentNode;
    listItem.classList.toggle("completed");

    const todoText = listItem.querySelector("span").innerText;
    const index = todos.findIndex(todo => todo.text === todoText);
    if (index !== -1) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
    }
}

loadTodos();
