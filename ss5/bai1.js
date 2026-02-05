
    let book = [];
    let soLuong = 0 ;
    while(true){
      soLuong = +prompt("Bạn muốn trả bao nhiêu cuốn sách ?")

      if (!isNaN(soLuong) && soLuong >= 1){
        break ;
      }
    }

    for (let i = 0 ; i < soLuong ; i++){
      let bookName = prompt(`Nhập tên cuốn sách thứ ${i+1}`)
      book.push(bookName);
    }

    console.log(`Tổng số sách đã được trả : ${soLuong}`);
    console.log("Danh sách đã trả");
    
    for (let i = 0; i < soLuong ;i++){
      console.log(`${i + 1} ${book[i]}`);
    }
    