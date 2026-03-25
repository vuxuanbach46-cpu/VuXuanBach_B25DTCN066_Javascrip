// let listSong = [
//   {id : 1 , name : "Hoa cỏ lau" , singer : "Vũ Xuân Bách"},
// ]

// localStorage.setItem("list" , JSON.stringify(listSong));

let listSong = JSON.parse(localStorage.getItem("list")) || [];

// Thêm bài háts

function handleSubmit(event) {
  event.preventDefault();
  let domName = document.getElementById("title");
  let domSinger = document.getElementById("artist");

  let valueName = domName.value;
  let valueSinger = domSinger.value;

  if (valueName === "") {
    alert("Tên không được để trống");
    return;
  }
  if (valueSinger === "") {
    alert("Tên ca sĩ không được để trống");
  }

  if (editID === null) {
    let newSong = {
      id: listSong.length === 0 ? 1 : listSong[listSong.length - 1].id + 1,
      name: valueName,
      singer: valueSinger,
    };

    listSong.push(newSong);
    console.log(listSong);
  } else {
    let thongTinBai = listSong.find((element) => element.id === editID);
    thongTinBai.name = valueName ;
    thongTinBai.singer = valueSinger ;

    editID = null ;

    
  document.getElementById("submitBtn").textContent = "Thên";
  document.getElementById("formTitle").textContent = "🎵 Thêm bài hát";
  }
  localStorage.setItem("list", JSON.stringify(listSong));
  domName.value = "";
  renderList();
  domSinger.value = "";
}

// Hiển thị
function renderList(data = listSong) {
  let domRender = document.getElementById("songTable");
  domRender.innerHTML = "";
  data.forEach((element, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>${element.singer}</td>
      <td>
        <button id="update" onclick = "updateSong(${element.id})">Sửa</button>
        <button id="delete" onclick = "deleteSong(${index})" >Xóa</button>
      </td>`;
      
    domRender.appendChild(tr);
  });
}

renderList();

// Sửa
let editID = null;
function updateSong(id) {
  let thongTinSong = listSong.find((element) => element.id === id);
  editID = id;

  document.getElementById("title").value = thongTinSong.name;
  document.getElementById("artist").value = thongTinSong.singer;

  document.getElementById("submitBtn").textContent = "Cập nhật";
  document.getElementById("formTitle").textContent = "Sửa bài hát";
}

// Xóa 
function deleteSong(index) {
  let xacNhan = confirm("Bạn có chắn chắn muốn xóa không");
  if (xacNhan){
    listSong.splice(index , 1);
    renderList();
    localStorage.setItem("list" , JSON.stringify(listSong));
  }else{
    alert("Đã hủy thao tác xóa");
  }
}

// Tìm kiếm
function searchSong() {
  let key = document.getElementById("search").value.toLowerCase();

  let search = listSong.filter(element => element.name.toLowerCase().includes(key));

  renderList(search);
}
