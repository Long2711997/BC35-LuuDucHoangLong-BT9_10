function Validation(){
    this.kiemTraRong = function(value, divError, mess){
        if (value === ""){
        //Thong bao loi
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = "block";
        return false;
    } 
        getEle(divError).innerHTML = '';
        getEle(divError).style.display = "none";
        return true;
    }

    this.kiemTraTaiKhoan = function(value, divError, mess){
        if (value.length < 4 || value.length > 6){
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = "block";
            return false;
        }
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = "none";
            return true;
    }

    this.kiemTraTen = function(value, divError, mess){
        var letter = /^[A-Za-z]+$/
        if (value.match(letter)){
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = "none";
            return true;
        }
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = "block";
            return false;
    }

    this.kiemTraMail = function(value, divError, mess){
        var mailAddress = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (value.match(mailAddress)){
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = "none";
            return true;
        }
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = "block";
            return false;
    }

    this.kiemtraMatKhau = function(value, divError, mess){
        var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/
        if (value.match(pass)){
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = "none";
            return true;
        }
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = "block";
            return false;
    }

    this.kiemTraLuong = function(value, divError, mess){
        var salary = /^[A-Za-z]+$/
        // var num = value;
        if (value.match(salary)){
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = "block";
            return false;
        } else if (value < 1000000 || value > 20000000) {
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = "block";
            return false;
        }
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = "none";
            return true;
    }

    this.kiemTraChucVu = function (idSelect, divError, mess) {
    if (getEle(idSelect).selectedIndex !== 0) {
      getEle(divError).innerHTML = "";
      getEle(divError).style.display = "none";
      return true;
    }

    getEle(divError).innerHTML = mess;
    getEle(divError).style.display = "block";
    return false;
  };

    this.kiemTraGioLam = function(value, divError, mess){
        if (value < 80 || value > 200){
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = "block";
            return false;
        }
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = "none";
            return true;
    }

    this.kiemTraTaiKhoanTrung = function (value, divError, mess, arr) {
    var isExist = false;

    for (var i = 0; i < arr.length; i++) {
      var nv = arr[i];
      if (nv.taiKhoan === value) {
        isExist = true;
        break;
      }
    }

    if (isExist) {
      getEle(divError).innerHTML = mess;
      getEle(divError).style.display = "block";
      return false;
    }

    getEle(divError).innerHTML = "";
    getEle(divError).style.display = "none";
    return true;
  };
}