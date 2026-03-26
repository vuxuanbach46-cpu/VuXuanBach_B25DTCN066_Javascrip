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

  if (valueName === "") {
    alert("Tên không được để trống");
    return;
  }
  if (valueCategoty === "") {
    alert("Danh mục không được để trống");
    return;
  }
  if (valuePrice < 0) {
    alert("Giá phải >= 0");
    return;
  }
  if (valueQuantity < 0) {
    alert("Số lượng phải >= 0");
    return;
  }
  if (valueDescription === "") {
    alert("Mô tả không được để trống");
    return;
  }

  if (editID === null) {
    let newProduct = {
      id: products.length !== 0 ? products[products.length - 1].id + 1 : 1,
      name: valueName,
      category: valueCategoty,
      price: valuePrice,
      quantity: valueQuantity,
      describe: valueDescription,
    };

    products.push(newProduct);
  } else {
    let fixProduct = products.find((element) => element.id === editID);

    fixProduct.name = valueName;
    fixProduct.category = valueCategoty;
    fixProduct.price = valuePrice;
    fixProduct.quantity = valueQuantity;
    fixProduct.describe = valueDescription;

    if (valueName === "") {
      alert("Tên không được để trống");
      return;
    }
    if (valueCategoty === "") {
      alert("Danh mục không được để trống");
      return;
    }
    if (valuePrice < 0) {
      alert("Giá phải >= 0");
      return;
    }
    if (valueQuantity < 0) {
      alert("Số lượng phải >= 0");
      return;
    }
    if (valueDescription === "") {
      alert("Mô tả không được để trống");
      return;
    }

    editID = null;
    editIdMod = false;

    formTitle.innerText = "Thêm sản phẩm mới";
    submitBtn.innerText = "Thêm sản phẩm";
    cancelBtn.style.display = "none";
  }
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
  console.log(products);
  updateFooter();
  form.reset();
});

// Hiển thị sản phẩm
let productsList = document.getElementById("product-list");

function renderProducts(data = products) {
  productsList.innerHTML = "";

  data.forEach((element, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>${element.category}</td>
      <td>${Number(element.price).toLocaleString("vi-VN")}</td>
      <td>${element.quantity}</td>
      <td>${element.describe.length > 20 ? element.describe.slice(0, 20) + "..." : element.describe}</td>
      <td>
        <button id ="fix" onclick="updateProduct(${element.id})" > ✏️ Sửa</button>
        <button id = "delete" onclick="deleteProduct(${index})"> 🗑️ Xóa</button>
      </td>
      `;
    productsList.appendChild(tr);
  });
  updateFooter();
}
renderProducts();

// // sửa
let editID = null;
let editIdMod = false;
function updateProduct(id) {
  let fixProduct = products.find((element) => element.id === id);

  document.getElementById("productName").value = fixProduct.name;
  document.getElementById("productCategory").value = fixProduct.category;
  document.getElementById("productPrice").value = fixProduct.price;
  document.getElementById("productQuantity").value = fixProduct.quantity;
  document.getElementById("productDescription").value = fixProduct.describe;

  editID = id;
  editIdMod = true;

  formTitle.innerText = "Chỉnh Sửa Sản Phẩm";
  submitBtn.innerText = "Cập Nhật";
  cancelBtn.style.display = "inline-block";

  // Cuộn trang lên trên cùng
  window.scrollTo({ top: 0, behavior: "smooth" });
  let domName = document.getElementById("productName");
  domName.focus();

  updateFooter();
}

// Chức năng 4: Xóa sản phẩm
function deleteProduct(index) {
  if (editIdMod) {
    formTitle.innerText = "Thêm sản phẩm mới";
    submitBtn.innerText = "Thêm sản phẩm";
    cancelBtn.style.display = "none";
    form.reset();
  }
  let xacNhan = confirm("Bạn có chắn chắn muốn xóa không");
  if (xacNhan) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    updateFooter();
  } else {
    alert("Đã hủy thao tác xóa");
  }
}

// Chức năng 5: Xóa tất cả sản phẩm
let clearAllBtn = document.getElementById("clearAllBtn");
clearAllBtn.addEventListener("click", function deleteAll() {
  let xacNhan = confirm("Bạn có muốn xóa tất cả không");
  if (xacNhan) {
    products = [];
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    updateFooter();
  } else {
    alert("Đã hủy thao tác xóa");
  }
});

// Chức năng 6: Tìm kiếm sản phẩm
function search() {
  let key = document.getElementById("searchInput").value.toLowerCase();

  let thongTin = products.filter((element) =>
    element.name.toLowerCase().includes(key),
  );

  renderProducts(thongTin);
}

// Chức năng 7: Lọc theo danh mục
let searchCategory = document.getElementById("filterCategory");
searchCategory.addEventListener("change", searchCategorya);
function searchCategorya() {
  let category = searchCategory.value;

  let thongTin = products.filter((element) => element.category === category);

  renderProducts(thongTin);
}

// Cập nhật footer
function updateFooter() {
  let totalQuantityProduct = products.length;
  
  let a = products.reduce((acc , element) => acc += element.price * element.quantity , 0)
  
  let totalProducts = document.getElementById("totalProducts");
  totalProducts.innerHTML = totalQuantityProduct ;
  let totalValue = document.getElementById("totalValue");
  totalValue.innerHTML = a.toLocaleString("vi-VN") + " đ";

  let b = products.reduce((acc , element) => acc += element.quantity , 0);
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerHTML = b ;
}
