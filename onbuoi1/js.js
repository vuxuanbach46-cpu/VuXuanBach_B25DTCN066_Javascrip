
// let todos = [
//     { id: 1, todo: "Học", deadLine: "2026-03-26", status: "to do" },
//     { id: 2, todo: "Chơi", deadLine: "2026-03-26", status: "pending" },
//     { id: 3, todo: "Làm việc nhà", deadLine: "2026-03-26", status: "to do" }
// ];

// localStorage.setItem("todos", JSON.stringify(todos));

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editTodoId = 0;

function renderTodos(todos) {
    const todoListElement = document.getElementById("todoList");
    todoListElement.innerHTML = "";
    todos.forEach(todo => {
        todoListElement.innerHTML += `<li class="input-container">
                <span>
                    ${todo.todo} - ${todo.deadLine} - ${todo.status}
                </span>
                <span>
                    <button onclick="startEdit(${todo.id})">Sửa</button> <button onclick="deleteTodo(${todo.id})">Xóa</button>
                </span>
            </li>`
    })
}

function addOrEditTodo() {
    const todoInputElement = document.getElementById("todoInput");
    const todoDateElement = document.getElementById("todoDate");
    const todoStatusElement = document.getElementById("todoStatus");
    const todoInput = todoInputElement.value;
    const todoDate = todoDateElement.value;
    const todoStatus = todoStatusElement.value;
    if (editTodoId === 0) {
        const newTodo = {
            todo: todoInput,
            deadLine: todoDate,
            status: todoStatus,
            id: todos.length !== 0 ? todos[todos.length - 1].id + 1 : 1
        };
        todos.push(newTodo);
    } else {
        const todoButton = document.getElementById("todoBtn");
        let editTodoIndex = todos.findIndex(todo => todo.id === editTodoId);
        todos[editTodoIndex].todo = todoInput;
        todos[editTodoIndex].deadLine = todoDate;
        todos[editTodoIndex].status = todoStatus;
        editTodoId = 0;
        todoButton.innerText = "Thêm công việc";
    }
    todoInputElement.value = "";
    todoDateElement.value = "";
    todoStatusElement.value = "";
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos);
}

function deleteTodo(todoId) {
    todos = todos.filter(todo => todo.id !== todoId);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos);
}

function findTodoByName() {
    const findInputElement = document.getElementById("findInput");
    const findInput = findInputElement.value;
    let findTodos = todos.filter(todo => todo.todo.includes(findInput));
    renderTodos(findTodos);
}

function filterTodoByStatus() {
    const filterTodoElement = document.getElementById("filterInput");
    const filterStatus = filterTodoElement.value;
    const filterTodos = todos.filter(todo => todo.status === filterStatus);
    renderTodos(filterTodos);
}

function startEdit(todoId) {
    const editTodo = todos.find(todo => todo.id === todoId);
    const todoInputElement = document.getElementById("todoInput");
    const todoDeadlineElement = document.getElementById("todoDate");
    const todoStatusElement = document.getElementById("todoStatus");
    const todoButton = document.getElementById("todoBtn");
    todoInputElement.value = editTodo.todo;
    todoDeadlineElement.value = editTodo.deadLine;
    todoStatusElement.value = editTodo.status;
    todoButton.innerText = "Lưu";
    editTodoId = todoId;
}

renderTodos(todos);
