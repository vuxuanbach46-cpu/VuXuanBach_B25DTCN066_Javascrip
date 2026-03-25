// Thêm nhân viên mới
let staffs = [
  {
    id: 1,
    fullname: "Vũ Xuân Bách",
    email: "vuxuanbach46@gmail.com",
    date: "2007-11-09",
    position: "Giám đốc",
  },
];

let themNhanVien = document.querySelector("form");
themNhanVien.addEventListener("submit", function (event) {
  event.preventDefault();
  let domName = document.getElementById("fullName");
  let domEmail = document.getElementById("email");
  let domDate = document.getElementById("dateOfBirth");
  let domPosition = document.getElementById("position");

  let valueName = domName.value;
  if (valueName === "") {
    alert("Tên không được để trống");
    return;
  }
  let valueEmail = domEmail.value;
  if (valueEmail === "") {
    alert("Email không được để trống");
    return;
  }
  let valueDate = domDate.value;
  if (valueDate === "") {
    alert("Ngày sinh không được để trống");
    return;
  }
  let valuePosition = domPosition.value;
  if (valuePosition === "") {
    alert("Chức vụ không được để trống");
    return;
  }

  if (editId === null) {
    let newStaff = {
      id: staffs.length !== 0 ? staffs[staffs.length - 1].id + 1 : 1,
      fullname: valueName,
      email: valueEmail,
      date: valueDate,
      position: valuePosition,
    };

    staffs.push(newStaff);
  } else {
    let staff = staffs.find((element) => element.id === editId);
    staff.fullname = valueName;
    staff.email = valueEmail;
    staff.date = valueDate;
    staff.position = valuePosition;

    editId = null;
    document.querySelector(".btn-primary").textContent = "Thêm nhân viên";
  }

  updateQuantity();
  renderStaffs();
  console.log(staffs);

  domName.value = "";
  domName.focus();
  domEmail.value = "";
  domDate.value = "";
  domPosition.value = "";
});

// Cập nhật số lượng ở phần footer
function updateQuantity() {
  let total = staffs.length;
  let valuBadge = document.querySelector(".badge");
  valuBadge.innerHTML = total + " nhân viên";

  let valueFooter = document.querySelector(".footer span");
  valueFooter.innerHTML = "Tổng số nhân viên: " + total;
}

// Hiển thị danh sách
function renderStaffs() {
  let domRender = document.getElementById("render");
  domRender.innerHTML = "";
  staffs.forEach((element, index) => {
    let staff = document.createElement("tr");

    staff.innerHTML = `
      <td>${element.id}</td>
      <td>${element.fullname}</td>
      <td>${element.email}</td>
      <td>${formatDate(element.date)}</td>
      <td>${element.position}</td>
      <td class="actions">
        <button class="btn btn-sm btn-edit" onclick = "updateStaff(${element.id})" >Sửa</button>
        <button class="btn btn-sm btn-delete" onclick = "deleteStaff(${index})">Xóa</button>
      </td>
    `;
    domRender.appendChild(staff);
  });
}

// Ngày sinh được format sang định dạng dd/mm/yy
function formatDate(date) {
  let tach = date.split("-");
  return tach[2] + "/" + tach[1] + "/" + tach[0];
}

// Sửa thông tin nhân viên
let editId = null;
function updateStaff(id) {
  let thongTinStaff = staffs.find((element) => element.id === id);

  let domName = document.getElementById("fullName");
  let domEmail = document.getElementById("email");
  let domDate = document.getElementById("dateOfBirth");
  let domPosition = document.getElementById("position");

  domName.value = thongTinStaff.fullname;
  domEmail.value = thongTinStaff.email;
  domDate.value = thongTinStaff.date;
  domPosition.value = thongTinStaff.position;

  document.querySelector(".btn-primary").textContent = "Cập nhật";
  document.querySelector(".btn-secondary").textContent = "Hủy";
  document.querySelector(".header h1").textContent = "Chỉnh Sửa Nhân Viên";

  editId = id;
}

// Xóa nhan viên
function deleteStaff(index) {
  let xacNhan = confirm("Bạn có chắn chắn muốn xóa không");

  if (xacNhan) {
    staffs.splice(index, 1);

    renderStaffs();
    updateQuantity();
    console.log(staffs);

    document.querySelector(".btn-primary").textContent = "Thêm nhân viên";
    document.querySelector(".btn-secondary").textContent = "Nhập lại";
    document.querySelector(".header h1").textContent = "Quản Lý Nhân Viên";
  } else {
    alert("Đã hủy thao tác xóa");
  }
}
// Sửa nút hủy
let btnCancel = document.querySelector(".btn-secondary");

btnCancel.addEventListener("click", function (event) {
  event.preventDefault();

  editId = null;

  document.querySelector("form").reset();

  document.querySelector(".btn-primary").textContent = "Thêm Nhân Viên";
  document.querySelector(".header h1").textContent = "Quản Lý Nhân Viên";

  document.getElementById("fullName").focus();
});
