function DSNV (){
    this.arr = [];

    this.themNV = function(nv){
        this.arr.push(nv);
    };

    this.timViTriNhanvien = function(taiKhoan){
        var index = - 1;
        this.arr.forEach(function(nv, i){
            if (nv.taiKhoan === taiKhoan ){
                index = i;
            }
        });
        return index;
    }

    this.xoaNV = function(taiKhoan){
        var index = this.timViTriNhanvien(taiKhoan)
       
        if ( index !== -1) {
            this.arr.splice(index, 1)
        }
    }

    this.layThongTinChiTietNV = function(taiKhoan){
        var index = this.timViTriNhanvien(taiKhoan)
        if (index !== -1){
            return this.arr[index]
        }
        return null;
    }

    this.capNhatNhanVien = function(nv){
        var index = this.timViTriNhanvien(nv.taiKhoan);

        if (index !== -1){
            this.arr[index] = nv
        }
    }

    this.timKiemNhanVien = function(keyword){
        var mangTimKiem = [];
        this.arr.forEach(function(nv){
            var xepLoai = nv.xepLoai.toLowerCase();
            var searchName = keyword.toLowerCase();
            if (xepLoai.indexOf(searchName) !== -1){
                mangTimKiem.push(nv);
            }
        });
            return mangTimKiem;
    }
}