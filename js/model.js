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