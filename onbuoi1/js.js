// let todos=[
//     {id: 1, name: "Học", deadline:"2026-03-16",status:"to do"},
//     {id: 2, name: "Chơi", deadline:"2026-03-16",status:"pending"},
//     {id: 3, name: "Làm việc nhà", deadline:"2026-03-16",status:"to do"},
// ];
// localStorage.setItem("todos",JSON.stringify(todos));

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  let todosList = document.getElementById("todos-list");
  todosList.innerHTML = "";
  todos.forEach((ele, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
    <li>${ele.name} - ${formatDate(ele.deadline)} - ${ele.status} 
    <button class="btn-update" onclick = "updateTode(${ele.id})">Sửa</button>  
    <button class="btn-delete" onclick = "deleteTodo(${index})">Xóa</button></li></br>   
    `;
    todosList.appendChild(li);
  });
  console.log(todos);
  
}
function formatDate(deadline) {
  let tach = deadline.split("-");
  return tach[2] + "/" + tach[1] + "/" + tach[0] ;
}

renderTodos();

function addTodosList() {
  // e.prevenDefault();                                                                             
  let todosValue = document.getElementById("name-todo").value;
  let deadlineValue = document.getElementById("deadline").value;
  let statusValue = document.getElementById("status").value;

  let newTodos = {
    id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
    name: todosValue,
    deadline: deadlineValue,
    status: statusValue,
  };
  todos.push(newTodos);
  localStorage.setItem("todos", JSON.stringify(todos));

  document.getElementById("name-todo").value = "";
  document.getElementById("deadline").value = "";
  document.getElementById("status").value = "";
  renderTodos();
}

// Xóa
function deleteTodo(index) {
  let xacNhan = confirm("Bạn có chắc chắn muốn xóa");
  if (xacNhan) {
    todos.splice(index, 1)    ;
    renderTodos();
    localStorage.setItem("todos", JSON.stringify(todos));
  } else alert("Đã hủy thao tác xóa");
}
s
//Sửa
let editId = null ;
function updateTode(id) {
  let thongTinTodo = todos.find((element) => element.id === id);
  editId = id ;
  document.getElementById("name-todo").value = thongTinTodo.name ;
  document.getElementById("deadline").value = thongTinTodo.deadline ;
  document.getElementById("status").value = thongTinTodo.status ;

  document.getElementById("nut").innerHTML = "Cập nhật";
}
