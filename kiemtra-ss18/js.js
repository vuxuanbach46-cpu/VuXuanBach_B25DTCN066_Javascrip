let products = [
  {
    stt: 1,
    name: "Nguyễn Văn A",
    sdt: "0901234567",
    email: "nguyenvanan@email.com",
  },
  {
    stt: 2,
    name: "Trần Thị Bình",
    sdt: "0912345678",
    email: "tranthibinh@email.com",
  },
];

// Hàm hiển thị
let domRender = document.getElementById("contact-tbody");
function renderProduct() {
  domRender.innerHTML = "";
  products.forEach((element, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${element.stt}</td>
                <td>${element.name}</td>
                <td>${element.sdt}</td>
                <td>${element.email}</td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-edit" onclick="updateProduct(${element.id})" >Sửa</button>
                    <button class="btn-delete" onclick="deleteProduct(${index})">Xóa</button>
                  </div>
                </td>`;
    domRender.appendChild(tr);
  });
}
renderProduct();
// Cập nhật sản phẩm mới
function updateProduct(id) {

  let productUpdate = products.find(element => element.id === id);

  document.getElementById("contact-name").value = productUpdate.name ;
  document.getElementById("contact-phone").value = productUpdate.sdt ;
  document.getElementById("contact-email").value = productUpdate.email ;

}
// Xóa sản phẩm
function deleteProduct(index) {
  let xacNhan = confirm("Bạn có chắn chắn muốn xóa không");
  if (xacNhan) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProduct();
  } else {
    alert("Đã hủy thao tác xóa");
  }
}
