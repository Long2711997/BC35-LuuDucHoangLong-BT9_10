var dsnv = new DSNV()
var validation = new Validation();

getLocalStorage();


function getEle(id) {
    return document.getElementById(id);
}

function layThongTinNV(){
    var taiKhoan = getEle('tknv').value;
    var tenNV = getEle('name').value;
    var email = getEle('email').value;
    var matKhau = getEle('password').value;
    var ngayLam = getEle('datepicker').value;
    var luong = getEle('luongCB').value;
    var chucVu = getEle('chucvu').value;
    var gioLam = getEle('gioLam').value;

    // //flag
    var isValid = true;

    //VALIDATE
    isValid &= validation.kiemTraRong(taiKhoan, 'tbTKNV', '*Vui lòng nhập tài khoản')
    isValid &= validation.kiemTraTaiKhoan(taiKhoan, 'tbTKNV', '*Tài khoản phải từ 4 đến 6 ký tự')

    isValid &= validation.kiemTraRong(tenNV, 'tbTen', '*Vui lòng nhập tên nhân viên')
    isValid &= validation.kiemTraTen(tenNV, 'tbTen', '*Tên nhân viên phải là chữ')

    isValid &= validation.kiemTraRong(email, 'tbEmail', '*Vui lòng nhập Email nhân viên')
    isValid &= validation.kiemTraMail(email, 'tbEmail', '*Vui lòng nhập đúng định dạng Email')    

    isValid &= validation.kiemTraRong(matKhau, 'tbMatKhau', '*Vui lòng nhập mật khẩu')
    isValid &= validation.kiemtraMatKhau(matKhau, 'tbMatKhau', '*Mật khẩu phải có 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt')  

    isValid &= validation.kiemTraRong(ngayLam, 'tbNgay', '*Vui lòng nhập ngày làm')

    isValid &= validation.kiemTraRong(luong, 'tbLuongCB', '*Vui lòng nhập lương cơ bản')
    isValid &= validation.kiemTraLuong(luong, 'tbLuongCB', '*Vui lòng nhập đúng lương') 

    isValid &= validation.kiemTraChucVu(chucVu, 'tbChucVu', '*Vui lòng chọn chức vụ')

    isValid &= validation.kiemTraRong(gioLam, 'tbGiolam', '*Vui lòng nhập giờ làm')
    isValid &= validation.kiemTraGioLam(gioLam, 'tbGiolam', '*Vui lòng nhập đúng giờ làm')


    if (isValid){
        //tạo đối tượng sinhVien tuừ lớp đối tượng NhanVien
    var nv = new NhanVien(taiKhoan, tenNV, email, matKhau, ngayLam, luong, chucVu, gioLam );

    nv.tinhLuong();
    nv.xetXepLoai();

    return nv;
    }
    return null
}

 //Them nhan vien
getEle('btnThemNV').addEventListener('click', function(){
    var nv = layThongTinNV();

    if (nv){
        //Them nhan vien
    dsnv.themNV(nv);

    //Rednder table
    renderTable(dsnv.arr)

    //Lưu data
    setLocalStorage();
    }   
});


function renderTable(data){
    var content ="";

    data.forEach(function(nv){
        content += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.tenNV}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.xepLoai}</td>
            <td>
                <button id="btnEdit" class="btn btn-info" onclick="editNV('${nv.taiKhoan}')" data-toggle="modal"
									data-target="#myModal">Edit</button>
                <br>
                <button id="btnDelete" class="btn btn-danger" onclick="deleteNV('${nv.taiKhoan}')" >Delete</button>
            </td>
        </tr>
        `;
    });
    getEle('tableDanhSach').innerHTML = content;
}

//Xóa nhân viên
function deleteNV(taiKhoan){
    dsnv.xoaNV(taiKhoan)
    renderTable(dsnv.arr)
    setLocalStorage()
}

function editNV(taiKhoan){
    var nv = dsnv.layThongTinChiTietNV(taiKhoan);

    if(nv){
        getEle('tknv').value = nv.taiKhoan;
        getEle('tknv').disabled = true;
        getEle('name').value = nv.tenNV;
        getEle('email').value = nv.email;
        getEle('password').value = nv.matKhau;
        getEle('password').disabled = true;
        getEle('datepicker').value = nv.ngayLam;
        getEle('luongCB').value = nv.luong;
        getEle('chucvu').value = nv.chucVu;
        getEle('gioLam').value = nv.gioLam;
    }
    //Display btnUpdate
    getEle('btnCapNhat').style.display = "inline-block";
    //Hide btn
    getEle('btnThemNV').style.display = "none";
}

//Cap  nhat NV
getEle('btnCapNhat').addEventListener("click", function(){
    var nv = layThongTinNV();
    dsnv.capNhatNhanVien(nv);
    renderTable(dsnv.arr);
    setLocalStorage()
})

//Tim kiem NV
getEle('searchName').addEventListener("keyup", function(){
    var keyword = getEle('searchName').value;
    var mangTimKiem = dsnv.timKiemNhanVien(keyword);
    renderTable(mangTimKiem) 
})

function setLocalStorage(){
    //Chuyển ar từ JSON sang string
    var dataString = JSON.stringify(dsnv.arr)
    //Lưu data xuống LocalStorage của trình duyệt
    localStorage.setItem("DSNV", dataString)
}

function getLocalStorage(){
    var dataString = localStorage.getItem("DSNV")
    //Convert String -> JSON
    dsnv.arr = JSON.parse(dataString)
    renderTable(dsnv.arr)
}