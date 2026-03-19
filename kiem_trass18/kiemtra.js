// ● Thêm sản phẩm mới
// ○ Khi người dùng nhấn nút "Thêm" hoặc nhấn phím Enter trong form:
// ■ Lấy giá trị từ 3 input: Mã sản phẩm, Tên sản phẩm, Giá sản
// phẩm
// ■ Validate dữ liệu trước khi thêm (xem phần Validation)
// ■ Thêm sản phẩm mới vào bảng danh sách
// ■ Reset form sau khi thêm thành công
// ■ Hiển thị alert thông báo "Thêm sản phẩm thành công

let products = [];

document.getElementById("btn-add").addEventListener("click", addProduct);

let form = document.getElementById("form-section");

function addProduct(event) {
  event.preventDefault();
  let valueCode = document.getElementById("product-code").value;
  let valueName = document.getElementById("product-name").value;
  let valuePricea = document.getElementById("product-price").value;
  let valuePrice = +valuePricea ;

  let newProduct = {
    id: Date.now(),
    code: valueCode,
    name: valueName,
    price: valuePrice,
  };

  products.push(newProduct);
  alert("Sản phẩm thêm thành công");

  console.log(products);

  render();
}

// ● Hiển thị danh sách sản phẩm
// ○ Hiển thị tất cả sản phẩm trong bảng với đầy đủ thông tin:
// ■ STT: Số thứ tự tự động (1, 2, 3, ...)
// ■ Mã: Mã sản phẩm
// ■ Tên: Tên sản phẩm
// ■ Giá: Giá sản phẩm (format số với dấu phẩy, ví dụ: 25,000,000 đ)
// ■ Hành động: 2 nút Sửa và Xóa
// ○ Mỗi trang hiển thị tối đa 5 sản phẩm
// ○ Cập nhật STT tự động khi thêm/xóa/sửa


function render() {
let danhSach = document.getElementById("product-tbody");
danhSach.innerHTML = "";
  products.forEach((element) => {
    let domRender = document.createElement("tr");

    domRender.innerHTML = `
    <td>${element.id}</td>
                <td>${element.code}</td>
                <td>${element.name}</td>
                <td>${element.prices}</td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-edit">Sửa</button>
                    <button class="btn-delete">Xóa</button>
                  </div>
                </td> `;

    danhSach.appendChild(domRender);
  });
}
render();
