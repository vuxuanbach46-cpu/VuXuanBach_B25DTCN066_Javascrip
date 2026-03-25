let works = [];

// Thêm công việc
let buttonWork = document.getElementById("addBtn");
buttonWork.addEventListener("click", addWork);

// Nhấn phím enter để thêm
let enterInput = document.getElementById("taskInput");
enterInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addWork(event);
  }
});

function addWork(event) {
  event.preventDefault();
  let domInputWork = document.getElementById("taskInput");
  let valueInputWork = domInputWork.value;

  newWork = {
    id: works.length !== 0 ? works[works.length - 1].id + 1 : 1,
    name: valueInputWork,
    status: false,
  };

  works.push(newWork);
  domInputWork.value = "";
  renderWorks();
}

// Hiển thị
function renderWorks() {
  let domRender = document.getElementById("empty-state");
  domRender.innerHTML = "";
  if (works.length === 0) {
    let valueRenderRong = document.createElement("div");
    valueRenderRong.innerHTML = `<div class="empty-state-icon">📋</div>
          <div class="empty-state-text">
            Chưa có công việc nào. Hãy thêm công việc mới!
          </div>`;
    domRender.appendChild(valueRenderRong);
  } else {
    works.forEach((element) => {
      let valueRender = document.createElement("div");
      valueRender.innerHTML = ` 
          <input type="checkbox" class="task-checkbox" />
          <span class="task-text"
            >${element.name}</span
          >
          <div class="task-actions">
            <button class="btn-edit">✏️ Sửa</button
            ><button class="btn-delete">🗑️ Xóa</button>
          </div>`;
      domRender.appendChild(valueRender);
    });
  }
}
renderWorks();

// Đánh dấu hoàn thành
