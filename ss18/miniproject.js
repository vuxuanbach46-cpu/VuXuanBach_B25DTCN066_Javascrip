let products = JSON.parse(localStorage.getItem("products")) || [];
  
// Thêm sản phẩm mới
let form = document.getElementById("productForm");
form.addEventListener("submit", function addProduct(event) {
  event.preventDefault();
  let valueName = document.getElementById("productName").value;
  let valueCategoty = document.getElementById("productCategory").value;
  let valuePrice = Number(document.getElementById("productPrice").value);
  let valueQuantity = Number(document.getElementById("productQuantity").value);
  let valueDescription = document.getElementById("productDescription").value;

  if(valueName === ""){
    alert("Tên không được để trống")
    return ;
  }
   if(valueCategoty === ""){
    alert("Danh mục không được để trống")
    return ;
  }
  if (valuePrice < 0){
    alert("Giá phải >= 0")
    return ;
  }
  if (valueQuantity < 0){
    alert("Số lượng phải >= 0");
    return ;
  }
   if(valueDescription === ""){
    alert("Mô tả không được để trống")
    return ;
  }

  let newProduct = {
    id: products.length !== 0 ? products[products.length - 1].id + 1 : 1,
    name: valueName,
    category: valueCategoty,
    price: valuePrice,
    quantity: valueQuantity,
    describe: valueDescription,
  };

  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
  console.log(products);
  
  console.log(products);
  
  form.reset();
});

// Hiển thị sản phẩm
let productsList = document.getElementById("product-list");

function renderProducts() {
  productsList.innerHTML = "";
  
  products.forEach((element, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>${element.category}</td>
      <td>${Number(element.price).toLocaleString("vi-VN")}</td>
      <td>${element.quantity}</td>
      <td>${element.describe}</td>
      <td>
        <button id ="fix" onclick="updateProduct(${element.id})" > ✏️ Sửa</button>
        <button id = "delete" onclick="deleteProduct(${index})"> 🗑️ Xóa</button>
      </td>
      `;
    productsList.appendChild(tr);
  });
}
renderProducts();

// // // sửa
// // Tạo biến xem đang sửa hay đang thêm
// let isEditMode = false;
// // Đang sửa sản phẩm nào
// let editID = null;
// function updateProduct(id) {
//   // Tìm sản phẩm để sửa
//   let fixProduct = products.find((element) => element.id === id);
//   // Đẩy thông tin lên các ô nhập
//   document.getElementById("productName").value = fixProduct.name;
//   document.getElementById("productCategory").value = fixProduct.category;
//   document.getElementById("productPrice").value = fixProduct.price;
//   document.getElementById("productQuantity").value = fixProduct.quantity;
//   document.getElementById("productDescription").value = fixProduct.describe;

//   // Chuyển trạng thái đang sửa
//   isEditMode = true;
//   editID = id;

//   // Đổi giao diện
//   formTitle.innerText = "Chỉnh Sửa Sản Phẩm";
//   submitBtn.innerText = "Cập Nhật";
//   cancelBtn.style.display = "inline-block";

//   // Cuộn trang lên trên cùng
//   window.scrollTo({top : 0 , behavior : "smooth"});
//   let domName = document.getElementById("productName");
//   domName.focus();
  
//   // Cập nhật thông tin Sửa
//   if (isEditMode) {
//     let indexFixProduct = products.findIndex(element => element.id === id);

//     products[indexFixProduct] = {

//     }
//   }
// }

// // Chức năng 4: Xóa sản phẩm
// // Nếu đang sửa sản phẩm bị xóa: Reset form
// function deleteProduct(index) {
//   let xacNhan = confirm("Bạn có chắn chắn muốn xóa không");
//   if (xacNhan) {
//     products.splice(index, 1);
//     localStorage.setItem("products", JSON.stringify(products));
//     renderProducts();
//   } else {
//     alert("Đã hủy thao tác xóa");
//   }
// }
