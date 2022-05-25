const Department = require("./Department");

class Role extends Department {
    constructor(title, salary, department_id) {
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    };

    setRoleTitle(title) {
        this.title = title;
    }

    setRoleSalary(salary) {
        this.salary = salary;
    }
    
    setRoleDepartment(department_id) {
        this.department_id = department_id;
    }
}

module.exports = Role;