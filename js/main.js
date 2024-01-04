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


// Employee ID list
var employeeList = JSON.parse(localStorage.getItem("employeeList"));
if (employeeList === null) {
    employeeList = [];
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
};

function clearModal() {
    accountSelector.value = "";
    nameSelector.value = "";
    emailSelector.value = "";
    passSelector.value = "";
    startDateSelector.value = getCurrentDate();
    baseSalarySelector.value = "";
    positionSelector.value = "Chọn chức vụ";
    workHourSelector.value = "";
};

function clearAlert() {
    var alertList = document.querySelectorAll(".sp-thongbao");

    for (let i = 0; i < alertList.length; i++) {
        alertList[i].style.display = "none";
    }
};

function clearErrorMsg() {
    document.getElementById("mainAlert").style.display = "none";
    document.getElementById("addSuccess").style.display = "none";
    document.getElementById("editSuccess").style.display = "none";
    document.getElementById("addError").style.display = "none";
    document.getElementById("editError").style.display = "none";
};

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

    if (rating == "xuất sắc") {
        employeeFilter("Xuất sắc");
    }
    else if (rating == "giỏi") {
        employeeFilter("Giỏi");
    }
    else if (rating == "khá") {
        employeeFilter("Khá");
    }
    else if (rating == "trung bình") {
        employeeFilter("Trung bình");
    }
    else if (rating == "") {
        printEmployeeList(employeeList);
    }
});

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

// Print employee list on load and when modal is closed
printEmployeeList();
$('#myModal').on('hidden.bs.modal', printEmployeeList);
$('#myModal').on('hidden.bs.modal', clearModal);
$('#myModal').on('hidden.bs.modal', clearAlert);
$('#myModal').on('hidden.bs.modal', function() {
    currentEmployee = "";
});