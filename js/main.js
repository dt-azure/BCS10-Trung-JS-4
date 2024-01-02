const numberFormat = Intl.NumberFormat('en-US');
var currentEmployee = "";

// Query selector for input
const accountSelector = document.getElementById("tknv");
const nameSelector = document.getElementById("name");
const emailSelector = document.getElementById("email");
const passSelector = document.getElementById("password");
const startDateSelector = document.getElementById("datepicker");
const baseSalarySelector = document.getElementById("luongCB");
const positionSelector = document.getElementById("chucvu");
const workHourSelector = document.getElementById("gioLam");

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

// Check input while typing

accountSelector.addEventListener("input", checkAccount);
nameSelector.addEventListener("input", checkName);
emailSelector.addEventListener("input", checkEmail);
passSelector.addEventListener("input", checkPassword);
startDateSelector.addEventListener("input", checkDate);
// startDateSelector.addEventListener("change", checkDate);
baseSalarySelector.addEventListener("input", checkSalary);
workHourSelector.addEventListener("input", checkWorkHour);
positionSelector.addEventListener("input", checkPosition);

// Check input when modal is opened
// $('#myModal').on('shown.bs.modal', checkAccount);
// $('#myModal').on('shown.bs.modal', checkName);
// $('#myModal').on('shown.bs.modal', checkEmail);
// $('#myModal').on('shown.bs.modal', checkPassword);
// $('#myModal').on('shown.bs.modal', checkDate);
// $('#myModal').on('shown.bs.modal', checkSalary);
// $('#myModal').on('shown.bs.modal', checkWorkHour);
// $('#myModal').on('shown.bs.modal', checkPosition);

// Get counter for employee account ID
// var counter = localStorage.getItem("idCounter");
// if (counter === null) {
//     counter = 1;
// }

// Employee ID list
var employeeList = JSON.parse(localStorage.getItem("employeeList"));
if (employeeList === null) {
    employeeList = [];
}

function totalSalaryCalc(position, baseSalary) {
    if (position === "Giám đốc") {
        return baseSalary * 3;
    }
    else if (position === "Trưởng phòng") {
        return baseSalary * 2;
    }
    else {
        return baseSalary;
    }
};



function employeeRating(workHour) {
    if (workHour >= 192) {
        return "Xuất sắc";
    }
    else if (workHour >= 176) {
        return "Giỏi";
    }
    else if (workHour >= 160) {
        return "Khá";
    }
    else {
        return "Trung bình";
    }
};


function Employee(_account, _name, _email, _pass, _startDate, _baseSalary, _position, _workHour) {
    this.account = _account;
    this.name = _name;
    this.email = _email;
    this.pass = _pass;
    this.startDate = _startDate;
    this.baseSalary = _baseSalary;
    this.position = _position;
    this.workHour = _workHour;
    this.totalSalary = totalSalaryCalc(this.position, this.baseSalary);
    this.employeeRating = employeeRating(this.workHour);
};

function inputCheck(query) {
    clearErrorMsg();

    // Iterate through all sp-thongbao elements and find if any has display = block
    var alertList = document.querySelectorAll(".sp-thongbao");

    for (let i = 0; i < alertList.length; i++) {
        if (alertList[i].id === "editError" && alertList[i].style.display === "block") {
            return false;
        }
        else if (alertList[i].style.display === "block") {
            document.getElementById("mainAlert").style.display = "block";
            return false;
        }
    }
    document.getElementById("mainAlert").style.display = "none";
    return (query === "add") ? addEmployee() : updateEmployeeDetails();
};

function addEmployee() {
    

    if (employeeList.indexOf(accountSelector.value) != -1) {
        document.getElementById("addError").style.display = "block";
        return;
    }

    var employee = new Employee(accountSelector.value, nameSelector.value, emailSelector.value, passSelector.value, startDateSelector.value, baseSalarySelector.value * 1, positionSelector.value, workHourSelector.value * 1);
    // var employeeId = "user" + counter;
    // counter++;
    employeeList.push(employee.account);

    localStorage.setItem(employee.account, JSON.stringify(employee));
    // localStorage.setItem("idCounter", counter);
    localStorage.setItem("employeeList", JSON.stringify(employeeList));

    currentEmployee = employee.account;

    document.getElementById("addSuccess").style.display = "block";
};

function printTemplate(employeeDetails, index) {
    return `
    <tr>
    <td>${employeeDetails.account}</td>
    <td>${employeeDetails.name}</td>
    <td>${employeeDetails.email}</td>
    <td>${employeeDetails.startDate}</td>
    <td>${employeeDetails.position}</td>
    <td>${numberFormat.format(employeeDetails.totalSalary)}</td>
    <td>${employeeDetails.employeeRating}</td>
    <td>
    <button class="edit-btn" data-toggle="dropdown"><em class="fa fa-cog"></button></em>
    <div class="edit-menu dropdown-menu">
    <a class="dropdown-item" data-toggle="modal" data-target="#myModal" onclick="autoFillModal('${employeeList[index]}')">Edit</a>
    <a class="dropdown-item" onclick="deleteEmployee('${employeeList[index]}')">Delete</a>
    </div>
    </td>
    </tr>
    `;
};

function printEmployeeList() {
    var row = "";

    for (let i = 0; i < employeeList.length; i++) {
        var employeeDetails = JSON.parse(localStorage.getItem(employeeList[i]));

        // If a user is null for whatever reason, skip it
        if (employeeDetails === null) {
            continue;
        }
        else {
            row += printTemplate(employeeDetails, i);
        }
    };

    document.getElementById("tableDanhSach").innerHTML = row;
}

function getCurrentDate() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = (('' + month).length < 2 ? '0' : '') + month + '/' +
        (('' + day).length < 2 ? '0' : '') + day + '/' +
        d.getFullYear();

    return output;
}

function clearModal() {
    accountSelector.value = "";
    nameSelector.value = "";
    emailSelector.value = "";
    passSelector.value = "";
    startDateSelector.value = getCurrentDate();
    baseSalarySelector.value = "";
    positionSelector.value = "Chọn chức vụ";
    workHourSelector.value = "";
}

function clearAlert() {
    var alertList = document.querySelectorAll(".sp-thongbao");

    for (let i = 0; i < alertList.length; i++) {
        alertList[i].style.display = "none";
    }
}

function clearErrorMsg() {
    document.getElementById("mainAlert").style.display = "none";
    document.getElementById("addSuccess").style.display = "none";
    document.getElementById("editSuccess").style.display = "none";
    document.getElementById("addError").style.display = "none";
    document.getElementById("editError").style.display = "none";
}

// Print employee list on load and when modal is closed
printEmployeeList();
$('#myModal').on('hidden.bs.modal', printEmployeeList);
$('#myModal').on('hidden.bs.modal', clearModal);
$('#myModal').on('hidden.bs.modal', clearAlert);
$('#myModal').on('hidden.bs.modal', function() {
    currentEmployee = "";
});

// Edit menu
function deleteEmployee(currentEmployee) {
    var itemIndex = employeeList.indexOf(currentEmployee);
    employeeList.splice(itemIndex, 1);
    localStorage.removeItem(currentEmployee);

    printEmployeeList();
}

function autoFillModal(employee) {
    var employeeDetails = JSON.parse(localStorage.getItem(employee));
    currentEmployee = employeeDetails.account;
    
    accountSelector.value = employeeDetails.account;
    nameSelector.value = employeeDetails.name
    emailSelector.value = employeeDetails.email;
    passSelector.value = employeeDetails.pass;
    startDateSelector.value = employeeDetails.startDate;
    baseSalarySelector.value = employeeDetails.baseSalary;
    positionSelector.value = employeeDetails.position;
    workHourSelector.value = employeeDetails.workHour;
}

function updateEmployeeDetails() {
    if (currentEmployee === "") {
        document.getElementById("editError").style.display = "block";
        return;
    }

    var employeeDetails = JSON.parse(localStorage.getItem(currentEmployee));

    employeeDetails.account = accountSelector.value;
    employeeDetails.name = nameSelector.value;
    employeeDetails.email = emailSelector.value;
    employeeDetails.pass = passSelector.value;
    employeeDetails.startDate = startDateSelector.value;
    employeeDetails.baseSalary = baseSalarySelector.value;
    employeeDetails.position = positionSelector.value;
    employeeDetails.workHour = workHourSelector.value * 1;
    employeeDetails.totalSalary = totalSalaryCalc(employeeDetails.position, employeeDetails.baseSalary);
    employeeDetails.employeeRating = employeeRating(employeeDetails.workHour);

    localStorage.setItem(currentEmployee, JSON.stringify(employeeDetails));

    document.getElementById("editSuccess").style.display = "block";
}

// Filter

function employeeFilter(rating) {
    var row = "";

    for (let i = 0; i < employeeList.length; i++) {
        var employeeDetails = JSON.parse(localStorage.getItem(employeeList[i]));

        // If a user is null for whatever reason, skip it
        if (employeeDetails === null) {
            continue;
        }
        else if (employeeDetails.employeeRating === rating) {
            row += printTemplate(employeeDetails, i);
        }
    };

    document.getElementById("tableDanhSach").innerHTML = row;  
};

document.getElementById("searchName").addEventListener("input", function() {
    var rating = document.getElementById("searchName").value.toLowerCase();

    if (rating === "xuất sắc") {
        employeeFilter("Xuất sắc");
    }
    else if (rating === "giỏi") {
        employeeFilter("Giỏi");
    }
    else if (rating === "khá") {
        employeeFilter("Khá");
    }
    else if (rating === "trung bình") {
        employeeFilter("Trung bình");
    }
    else if (rating === "") {
        printEmployeeList(employeeList);
    }
});