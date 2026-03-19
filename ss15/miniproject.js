let works = [];

// Chức năng 1: Thêm công việc mới
function addWork() {
  let domName = document.getElementById("taskInput");
  let buttonAdd = document
    .getElementById("addBtn")
    .addEventListener("click", function () {
      let valuName = domName.value.trim();
      console.log(valuName);
      if (valuName === "") {
        alert("Tên không đc để trống");
        domName.focus();
        return;
      }

      works.push({
        id: Date.now(),
        name: valuName,
        completed: false,
      });

      domName.value = "";
      domName.focus();
    });
  renderWork();
}

addWork();

// // Hiển thị
// Render danh sách công việc từ mảng dữ liệu
// Mỗi công việc hiển thị đầy đủ: checkbox, tên, nút sửa, nút xóa
// Áp dụng style khác nhau cho công việc đã hoàn thành và chưa hoàn thành
function renderWork() {
  let taskList = document.getElementById("taskList");
  let totalCount = document.getElementById("totalCount");
  let completedCount = document.getElementById("completedCount");

  // Nếu không có dữ liệu
  if (works.length === 0) {
    taskList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <div class="empty-state-text">
          Chưa có công việc nào. Hãy thêm công việc mới!
        </div>
      </div>
    `;
    totalCount.innerText = 0;
    completedCount.innerText = 0;
    return;
  }

  // Nếu không có dữ liệu
  if (works.length === 0) {
    taskList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <div class="empty-state-text">
          Chưa có công việc nào. Hãy thêm công việc mới!
        </div>
      </div>
    `;
    totalCount.innerText = 0;
    completedCount.innerText = 0;
    return;
  }

  // Render danh sách
  let html = "";
  let completed = 0;

  works.forEach(work => {
    if (work.completed) completed++;

    html += `
      <div class="task-item" data-id="${work.id}">
        <input type="checkbox" class="task-checkbox" ${work.completed ? "checked" : ""} />
        
        <span class="task-text ${work.completed ? "completed" : ""}">
          ${work.name}
        </span>

        <div class="task-actions">
          <button class="btn-edit">✏️ Sửa</button>
          <button class="btn-delete">🗑️ Xóa</button>
        </div>
      </div>
    `;
  });

  taskList.innerHTML = html;

  // Cập nhật counter
  totalCount.innerText = works.length;
  completedCount.innerText = completed;
}
