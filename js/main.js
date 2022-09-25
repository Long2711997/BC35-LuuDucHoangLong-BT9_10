var dsnv = new DSNV()
var validation = new Validation();

getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}

function layThongTinNV(isAdd){
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

    if (isAdd){
        isValid &= validation.kiemTraRong(taiKhoan, 'tbTKNV', '*Vui lòng nhập tài khoản') && 
        validation.kiemTraTaiKhoan(taiKhoan, 'tbTKNV', '*Tài khoản phải từ 4 đến 6 ký tự') &&
        validation.kiemTraTaiKhoanTrung(taiKhoan, 'tbTKNV', '*Tài khoản đã tồn tại', dsnv.arr);

        isValid &= validation.kiemTraRong(matKhau, 'tbMatKhau', '*Vui lòng nhập mật khẩu') && validation.kiemtraMatKhau(matKhau, 'tbMatKhau', '*Mật khẩu phải có 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt') 
    }
    //VALIDATE
    

    isValid &= validation.kiemTraRong(tenNV, 'tbTen', '*Vui lòng nhập tên nhân viên') && validation.kiemTraTen(tenNV, 'tbTen', '*Tên nhân viên phải là chữ')

    isValid &= validation.kiemTraRong(email, 'tbEmail', '*Vui lòng nhập Email nhân viên') && validation.kiemTraMail(email, 'tbEmail', '*Vui lòng nhập đúng định dạng Email')     

    isValid &= validation.kiemTraRong(ngayLam, 'tbNgay', '*Vui lòng nhập ngày làm')

    isValid &= validation.kiemTraRong(luong, 'tbLuongCB', '*Vui lòng nhập lương cơ bản') && validation.kiemTraLuong(luong, 'tbLuongCB', '*Vui lòng nhập đúng lương') 

    isValid &= validation.kiemTraChucVu('chucvu', 'tbChucVu', '*Vui lòng chọn chức vụ')

    isValid &= validation.kiemTraRong(gioLam, 'tbGiolam', '*Vui lòng nhập giờ làm') && validation.kiemTraGioLam(gioLam, 'tbGiolam', '*Vui lòng nhập đúng giờ làm')


    if (isValid){
    var nv = new NhanVien(taiKhoan, tenNV, email, matKhau, ngayLam, luong, chucVu, gioLam );

    nv.tinhLuong();
    nv.xetXepLoai();

    return nv;
    }
    return null
}

getEle('btnThemNV').addEventListener('click', function(){
    var nv = layThongTinNV();

    if (nv){
    dsnv.themNV(nv);

    renderTable(dsnv.arr)

    setLocalStorage();
    }   
});

getEle('btnDong').addEventListener('click', function(){
    getEle('tknv').value = '';
    getEle('tknv').disabled = false;
    getEle('name').value = '';
    getEle('email').value = '';
    getEle('password').value = '';
    getEle('password').disabled = false;
    getEle('datepicker').value = '';
    getEle('luongCB').value = '';
    getEle('chucvu').value = '';
    getEle('gioLam').value = '';

    getEle('btnThemNV').style.display = "inline-block";
})


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
    getEle('btnCapNhat').style.display = "inline-block";
    getEle('btnThemNV').style.display = "none";
}

getEle('btnCapNhat').addEventListener("click", function(){
    var nv = layThongTinNV(false);
    dsnv.capNhatNhanVien(nv);
    renderTable(dsnv.arr);
    setLocalStorage()
})

getEle('searchName').addEventListener("keyup", function(){
    var keyword = getEle('searchName').value;
    var mangTimKiem = dsnv.timKiemNhanVien(keyword);
    renderTable(mangTimKiem) 
})

function setLocalStorage(){
    var dataString = JSON.stringify(dsnv.arr)
    localStorage.setItem("DSNV", dataString)
}

function getLocalStorage(){
    var dataString = localStorage.getItem("DSNV")
    dsnv.arr = JSON.parse(dataString)
    renderTable(dsnv.arr)
}