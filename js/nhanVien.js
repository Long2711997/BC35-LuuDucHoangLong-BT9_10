function NhanVien(_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luong, _chucVu, _gioLam){
    this.taiKhoan = _taiKhoan;
    this.tenNV = _tenNV;
    this.email = _email;
    this.matkhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luong = _luong;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";

    this.tinhLuong = function(){
        if ( this.chucVu === "Sếp" ){
            this.tongLuong = this.luong*3
        } else if ( this.chucVu === "Trưởng phòng" ){
            this.tongLuong = this.luong*2
        } else {
            this.tongLuong = this.luong*1
        }
    }

    this.xetXepLoai = function(){
        if ( this.gioLam >= 192 ){
            this.xepLoai = 'Nhân viên xuất sắc'
        } else if ( this.gioLam >= 176 && this.gioLam < 192 ){
            this.xepLoai = 'Nhân viên giỏi'
        } else if ( this.gioLam >= 160 && this.gioLam < 176 ){
            this.xepLoai = 'Nhân viên khá'
        } else {
            this.xepLoai = 'Nhân viên trung bình'
        }
    }
}