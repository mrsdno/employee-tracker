const Role = require("./Role");

class Employee extends Role {
    constructor(first_name, last_name, role_id, manager_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    };

    setFirstName(first_name) {
        this.first_name = first_name;
    }

    setLastName(last_name) {
        this.last_name = last_name;
    }
    
    setRoleId(role_id) {
        this.role_id = role_id;
    }

    setManagerId(manager_id) {
        this.manager_id = manager_id;
    }
}

module.exports = Employee;