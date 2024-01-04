// REGEX
const accountRegex = new RegExp('^[\\w]{4,6}$');
const nameRegex = new RegExp('^[A-Za-z ]+$');
const emailRegex = new RegExp('^[\\S]+@[\\w]+\\.[a-z]+$', 'i');
const passRegex = new RegExp('^(?=.*[A-Z])(?=.*[\\d])(?=.*[\\W])[\\S]{6,10}$');
const dateRegex = new RegExp('^[\\d]{1,2}/[\\d]{1,2}/[\\d]{4}$');
const salaryRegex = new RegExp('^[\\d]{7,8}$')
const workHourRegex = new RegExp('^[\\d]{2,3}$')

// Input check
function checkAccount() {
    if (!accountRegex.test(accountSelector.value)) {
        document.getElementById("tbTKNV").style.display = "block";
        return false;
    }
    else {
        document.getElementById("tbTKNV").style.display = "none";
        return true;
    }
}

function checkName() {
    if (!nameRegex.test(nameSelector.value)) {
        document.getElementById("tbTen").style.display = "block";
        return false;
    }
    else {
        document.getElementById("tbTen").style.display = "none";
        return true;
    }
}

function checkEmail() {
    if (!emailRegex.test(emailSelector.value)) {
        document.getElementById("tbEmail").style.display = "block";
        return false;
    }
    else {
        document.getElementById("tbEmail").style.display = "none";
        return true;
    }
}

function checkPassword() {
    if (!passRegex.test(passSelector.value)) {
        document.getElementById("tbMatKhau").style.display = "block";
        return false;
    }
    else {
        document.getElementById("tbMatKhau").style.display = "none";
        return true;
    }
}

function checkDate() {
    var startDate = startDateSelector.value;
    var dateList = startDate.split("/");
    var month = dateList[0] * 1;
    var day = dateList[1] * 1;
    var year = dateList[2] * 1;

    if (!dateRegex.test(startDate)) {
        document.getElementById("tbNgay").style.display = "block";
        return false;
    }
    else {
        if ((month >= 1 && month <= 12) && (day >= 1 && day <= 31) && (year > 0)) {
            document.getElementById("tbNgay").style.display = "none";
            return true;
        }
        else {
            document.getElementById("tbNgay").style.display = "block";
            return false;
        }
    }
}

function checkSalary() {
    var salary = baseSalarySelector.value * 1;

    if (!salaryRegex.test(salary)) {
        document.getElementById("tbLuongCB").style.display = "block";
        return false;
    }
    else {
        if (salary >= 1000000 && salary <= 20000000) {
            document.getElementById("tbLuongCB").style.display = "none";
            return true;
        }
        else {
            document.getElementById("tbLuongCB").style.display = "block";
            return false;
        }
    }
}

function checkWorkHour() {
    var workHour = workHourSelector.value * 1;

    if (!workHourRegex.test(workHour)) {
        document.getElementById("tbGiolam").style.display = "block";
        return false;
    }
    else {
        if (workHour >= 80 && workHour <= 200) {
            document.getElementById("tbGiolam").style.display = "none";
            return true;
        }
        else {
            document.getElementById("tbGiolam").style.display = "block";
            return false;
        }
    }
}

function checkPosition() {
    var position = positionSelector.value;

    if (position != "Nhân viên" && position != "Trưởng phòng" && position != "Giám đốc") {
        document.getElementById("tbChucVu").style.display = "block";
        return false;
    }
    else {
        document.getElementById("tbChucVu").style.display = "none";
        return true;
    }
}