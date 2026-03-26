const products = [
  {
    id: 1,
    name: "Tai nghe Bluetooth TWS",
    price: 320000,
    image:
      "https://picsum.photos/seed/mp19-tws/1200/800",
    description: "Chống ồn nhẹ, pin 20h, kết nối ổn định.",
  },
  {
    id: 2,
    name: "Bàn phím cơ 87 phím",
    price: 790000,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=60",
    description: "Switch blue, led trắng, gõ sướng tay.",
  },
  {
    id: 3,
    name: "Chuột không dây công thái học",
    price: 450000,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=60",
    description: "Thiết kế ergonomic, sạc USB-C.",
  },
  {
    id: 4,
    name: "USB 64GB",
    price: 120000,
    image:
      "https://picsum.photos/seed/mp19-usb/1200/800",
    description: "Nhỏ gọn, tốc độ đọc/ghi ổn định.",
  },
  {
    id: 5,
    name: "Đế tản nhiệt laptop",
    price: 210000,
    image:
      "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=1200&q=60",
    description: "2 quạt gió, đỡ mỏi cổ tay.",
  },
  {
    id: 6,
    name: "Cáp sạc Type-C 1m",
    price: 80000,
    image:
      "https://picsum.photos/seed/mp19-cable/1200/800",
    description: "Bọc dù, hỗ trợ sạc nhanh.",
  },
];

// Hiển thị sản phẩm 
let render = document.getElementById("products-grid");
function renderProducts() {
  render.innerHTML = "" ;
  products.forEach(element => {
  let article = document.createElement("article");
  article.classList.add("card");
  article.innerHTML = `
    <div class="card-img">
      <img
        src="${element.image}"
        alt="Lỗi ảnh"
        loading="lazy"
      />
    </div>
    <div class="card-body">
      <h3 class="card-title">${element.name}</h3>   
      <p class="card-desc">${element.description}</p>
      <div class="card-footer">
        <div class="price">${element.price.toLocaleString("vi-VN")} VNĐ</div>
        <button class="btn btn-primary">Thêm vào giỏ</button>
      </div>
    </div>`

    render.appendChild(article);
  }) ;
}
renderProducts();

// Thêm vào giỏ hàng
