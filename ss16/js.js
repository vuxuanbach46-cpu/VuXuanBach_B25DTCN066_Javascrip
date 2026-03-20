
let form = document.querySelector("form");
let fullNameInput = document.getElementById("fullName");
let emailInput = document.getElementById("email");
let dobInput = document.getElementById("dateOfBirth");
let positionInput = document.getElementById("position");
let tbody = document.querySelector("tbody");
let badge = document.querySelector(".badge");
let footer = document.querySelector(".footer span");
let submitBtn = document.querySelector(".btn-primary");

let employees = [];
let editId = null;

// Ngày
function formatDate(dateStr) {
  let d = new Date(dateStr);

  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return day + "/" + month + "/" + year;
}

// Email
function checkEmail(email) {
  if (email.indexOf("@") === -1) return false;
  if (email.indexOf(".") === -1) return false;
  return true;
}

function resetForm() {
  form.reset();
  editId = null;
  submitBtn.innerText = "Thêm Nhân Viên";
}

function updateCount() {
  badge.innerText = employees.length + " nhân viên";
  footer.innerText = "Tổng số nhân viên: " + employees.length;
}

function renderTable() {
  tbody.innerHTML = "";

  for (let i = 0; i < employees.length; i++) {
    let emp = employees[i];

    let tr = document.createElement("tr");

    tr.innerHTML =
      "<td>" + emp.id + "</td>" +
      "<td>" + emp.fullName + "</td>" +
      "<td>" + emp.email + "</td>" +
      "<td>" + formatDate(emp.dob) + "</td>" +
      "<td>" + emp.position + "</td>" +
      "<td>" +
      "<button class='btn btn-sm btn-edit' data-id='" + emp.id + "'>Sửa</button> " +
      "<button class='btn btn-sm btn-delete' data-id='" + emp.id + "'>Xóa</button>" +
      "</td>";

    tbody.appendChild(tr);
  }

  updateCount();
}

function validate() {
  let fullName = fullNameInput.value;
  let email = emailInput.value;
  let dob = dobInput.value;
  let position = positionInput.value;

  if (fullName === "" || email === "" || dob === "" || position === "") {
    alert("Vui lòng nhập đầy đủ thông tin");
    return false;
  }

  if (!checkEmail(email)) {
    alert("Email không hợp lệ");
    return false;
  }

  return true;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validate()) return;

  let data = {
    fullName: fullNameInput.value,
    email: emailInput.value,
    dob: dobInput.value,
    position: positionInput.value
  };

  if (editId === null) {
    // THÊM
    let newEmp = {
      id: new Date().getTime(),
      fullName: data.fullName,
      email: data.email,
      dob: data.dob,
      position: data.position
    };

    employees.push(newEmp);
  } else {
    // SỬA
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === editId) {
        employees[i].fullName = data.fullName;
        employees[i].email = data.email;
        employees[i].dob = data.dob;
        employees[i].position = data.position;
      }
    }
  }

  renderTable();
  resetForm();
});

tbody.addEventListener("click", function (e) {
  let id = Number(e.target.getAttribute("data-id"));

  // XÓA
  if (e.target.classList.contains("btn-delete")) {
    let confirmDelete = confirm("Bạn có chắc muốn xóa không?");
    if (!confirmDelete) return;

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1);
        break;
      }
    }

    if (editId === id) {
      resetForm();
    }

    renderTable();
  }

  // SỬA
  if (e.target.classList.contains("btn-edit")) {
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        let emp = employees[i];

        fullNameInput.value = emp.fullName;
        emailInput.value = emp.email;
        dobInput.value = emp.dob;
        positionInput.value = emp.position;

        editId = id;
        submitBtn.innerText = "Cập Nhật";

        window.scrollTo(0, 0);
      }
    }
  }
});
form.addEventListener("reset", function () {
  resetForm();
});

renderTable();