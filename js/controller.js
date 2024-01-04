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

function getCurrentDate() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = (('' + month).length < 2 ? '0' : '') + month + '/' +
        (('' + day).length < 2 ? '0' : '') + day + '/' +
        d.getFullYear();

    return output;
};