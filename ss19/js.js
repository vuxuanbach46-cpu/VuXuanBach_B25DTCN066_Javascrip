const products = [
  {
    id: 1,
    name: "Tai nghe Bluetooth TWS",
    price: 320000,
    image: "https://picsum.photos/seed/mp19-tws/1200/800",
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
    image: "https://picsum.photos/seed/mp19-usb/1200/800",
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
    image: "https://picsum.photos/seed/mp19-cable/1200/800",
    description: "Bọc dù, hỗ trợ sạc nhanh.",
  },
];

let cart = [];

function formatPrice(value) {
  return value.toLocaleString("vi-VN") + " VNĐ";
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  try {
    const data = JSON.parse(localStorage.getItem("cart"));
    cart = Array.isArray(data) ? data : [];
  } catch {
    cart = [];
  }
}

function renderProducts() {
  const grid = document.getElementById("products-grid");
  const empty = document.getElementById("products-empty");
  const badge = document.getElementById("product-count-badge");

  badge.textContent = products.length + " sản phẩm";

  if (products.length === 0) {
    empty.classList.remove("hidden");
    grid.innerHTML = "";
    return;
  }

  empty.classList.add("hidden");

  grid.innerHTML = products
    .map(
      (p) => `
    <article class="card">
      <div class="card-img">
        <img src="${p.image}" alt="${p.name}" />
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <p class="card-desc">${p.description}</p>
        <div class="card-footer">
          <div class="price">${formatPrice(p.price)}</div>
          <button class="btn btn-primary" onclick="addToCart(${p.id})">Thêm vào giỏ</button>
        </div>
      </div>
    </article>
  `
    )
    .join("");
}

function addToCart(id) {
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }

  saveCart();
  renderCart();
}

function removeItem(id) {
  const product = products.find((p) => p.id === id);
  if (!confirm("Xóa " + product.name + "?")) return;

  cart = cart.filter((i) => i.id !== id);
  saveCart();
  renderCart();
}

function clearCart() {
  if (!confirm("Xóa toàn bộ giỏ hàng?")) return;
  cart = [];
  saveCart();
  renderCart();
}

function renderCart() {
  const tbody = document.getElementById("cart-tbody");
  const empty = document.getElementById("cart-empty");

  if (cart.length === 0) {
    empty.classList.remove("hidden");
    tbody.innerHTML = "";
  } else {
    empty.classList.add("hidden");

    tbody.innerHTML = cart
      .map((item) => {
        const p = products.find((x) => x.id === item.id);
        return `
        <tr>
          <td>${p.name}</td>
          <td class="right">${formatPrice(p.price)}</td>
          <td class="center">
            <div class="qty-controls">
              <button class="btn btn-icon" onclick="changeQty(${p.id}, -1)">-</button>
              <span class="qty">${item.quantity}</span>
              <button class="btn btn-icon" onclick="changeQty(${p.id}, 1)">+</button>
            </div>
          </td>
          <td class="right">${formatPrice(p.price * item.quantity)}</td>
          <td class="center">
            <button class="btn btn-danger" onclick="removeItem(${p.id})">Xóa</button>
          </td>
        </tr>
      `;
      })
      .join("");
  }

  updateStats();
}

function updateStats() {
  const totalLines = cart.length;
  const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => {
    const p = products.find((x) => x.id === i.id);
    return sum + p.price * i.quantity;
  }, 0);

  document.getElementById("cart-lines-badge").textContent =
    totalLines + " dòng";
  document.getElementById("cart-qty-badge").textContent =
    totalQty + " món";

  document.getElementById("stat-lines").textContent = totalLines;
  document.getElementById("stat-qty").textContent = totalQty;
  document.getElementById("stat-total").textContent =
    formatPrice(totalPrice);
}

document
  .getElementById("clear-cart-btn")
  .addEventListener("click", clearCart);

loadCart();
renderProducts();
renderCart();