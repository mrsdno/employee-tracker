const inquirer = require('inquirer');
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const db = require('./db/connection')
const cTable = require('console.table');

// select all deparments from db, log in console, then restart app to ask user what to do next
const viewAllDepartments = function () {
    db.query(`SELECT * from departments`, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table('', rows);
    });

    startApplication();

}

// select all roles from db, log in console, then restart app
const viewAllRoles = function () {
    db.query(`SELECT * FROM roles 
                LEFT JOIN departments ON roles.department_id = departments.id`, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table('', rows);
    });

    startApplication();
}

// select all employees from db, log in console, then restart app
const viewAllEmployees = function () {
    db.query(`SELECT emp.id, 
                emp.first_name, 
                emp.last_name, 
                emp.role_id, 
                roles.title AS job_title, 
                roles.department_id, 
                dpt.department_name, 
                roles.salary, 
                emp.manager_id,
                emp2.first_name AS manager_first_name, 
                emp2.last_name AS manager_last_name 
                FROM business.employees emp 
                LEFT JOIN business.employees emp2 ON emp.manager_id = emp2.id
                LEFT JOIN business.roles roles ON emp.role_id =  roles.id 
                LEFT JOIN business.departments dpt ON roles.department_id = dpt.id`, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table('', rows);
    });

    startApplication();
}

// get info from user, then add to department table, then restart app
const addDepartment = function () {
    inquirer
        .prompt({
            type: 'input',
            message: 'What is the name of the department you want to add?',
            name: 'addedDepartment'
        })
        .then(({ addedDepartment }) => {
            // insert into database
            db.query(`INSERT INTO departments (department_name) VALUES (?)`, addedDepartment, (err, result) => {
                if (err) {
                    console.log(err);
                }
                startApplication();
            });
        });
}

// get info from user and store in 'role', then add to database, then restart app
const addRole = function () {
    inquirer
        .prompt({
            type: 'input',
            message: 'What is the title of the role you want to add?',
            name: 'addedRoleTitle'
        })
        .then(({ addedRoleTitle }) => {

            // set up new role from class and set title
            let role = new Role();
            role.setRoleTitle(addedRoleTitle);

            inquirer
                .prompt({
                    type: 'input',
                    message: 'What is the salary of the role you want to add?',
                    name: 'addedRoleSalary'
                })
                .then(({ addedRoleSalary }) => {
                    // set salary in role
                    role.setRoleSalary(addedRoleSalary);
                    inquirer
                        .prompt({
                            type: 'list',
                            name: 'addedRoleDepartment',
                            message: 'What department is this role in?',
                            choices: []
                        })
                        .then(({ addedRoleDepartment }) => {
                            // set role department by id by getting the first character (id) of the option chosen
                            role.setRoleDepartment(addedRoleDepartment.charAt(0));

                            // insert into database
                            db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [role.title, role.salary, role.department_id], (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                startApplication();
                            });

                        });

                })
        })
}

// get info from user and store in 'employee', then add to database, then restart app
const addEmployee = function () {
    inquirer
        .prompt({
            type: 'input',
            message: "What is the employee's first name?",
            name: 'addedEmployeeFirstName'
        })
        .then(({ addedEmployeeFirstName }) => {

            // set up employee from class and set first name
            let employee = new Employee();
            employee.setFirstName(addedEmployeeFirstName);
            inquirer
                .prompt({
                    type: 'input',
                    message: "What is the employee's last name?",
                    name: 'addedEmployeeLastName'
                })
                .then(({ addedEmployeeLastName }) => {
                    // set employee last name
                    employee.setLastName(addedEmployeeLastName);
                    inquirer
                        .prompt({
                            type: 'list',
                            name: 'addedEmployeeRole',
                            message: "What is this employee's role?",
                            choices: ['1. Salesperson', '2. Lead Engineer', '3. Software Engineer', '4. Account Manager', '5. Accountant', '6. Legal Team Lead', '7. Lawyer']
                        })
                        .then(({ addedEmployeeRole }) => {
                            // set employee role id by getting first character of the role (id)
                            employee.setRoleId(addedEmployeeRole.charAt(0));
                            inquirer
                                .prompt({
                                    type: 'list',
                                    name: 'addedEmployeeManager',
                                    message: "Who is this employee's manager?",
                                    choices: ['1. Account Manager', '2. Lead Engineer', '3. Legal Team Lead']
                                })
                                .then(({ addedEmployeeManager }) => {
                                    // set manager id by getting first character of the role (id)
                                    employee.setManagerId(addedEmployeeManager.charAt(0));
                                    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [employee.first_name, employee.last_name, employee.role_id, employee.manager_id], (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        startApplication();
                                    });
                                })
                        });
                })
        })
}

// get info from user and store in 'employee', then update database, then restart app
const updateEmployee = function () {
    inquirer
        .prompt({
            type: 'list',
            message: "What employee's role do you want to change?",
            name: 'employeeUpdateId',
            choices: ['1. Noemi', '2. Marlee', '3. Alonso', '4. Cindy', '5. Desiree', '6. Madden', '7. Chelsea', '8. Case', '9. Charlie']
        })
        .then(({ employeeUpdateId }) => {
            
            // set up employee from class and set id
            let employee = new Employee();
            employee.setId(employeeUpdateId.charAt(0));

            inquirer
                .prompt({
                    type: 'list',
                    name: 'employeeUpdateRole',
                    message: "What is the new role you'd like to assign?",
                    choices: ['1. Salesperson', '2. Lead Engineer', '3. Software Engineer', '4. Account Manager', '5. Accountant', '6. Legal Team Lead', '7. Lawyer']
                })
                .then(({ employeeUpdateRole }) => {
                    // set role id for employee by getting first character of choice (id)
                    employee.setRoleId(employeeUpdateRole.charAt(0));
                    
                    // update database
                    db.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [employee.role_id, employee.id], (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        
                        startApplication();
                    });
                })
        })
}

const startApplication = () => {
    // start application by asking what the user wants to do
    inquirer
        .prompt({
            type: 'list',
            name: 'primarySelection',
            message: 'What would you like to do?',
            choices: ['View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit']
        })
        .then(({ primarySelection }) => {

            // if user chooses to view all departments, show them all departments by calling function
            if (primarySelection === 'View all departments') {
                viewAllDepartments();
            }

            // if user chooses to view all roles, show them all roles by calling function 
            else if (primarySelection === 'View all roles') {
                viewAllRoles();
            }

            // if user chooses to view all employees, show them all employees by calling function 
            else if (primarySelection === 'View all employees') {
                viewAllEmployees();
            }

            // if user chooses to add a department, add department by calling function 
            else if (primarySelection === 'Add a department') {
                addDepartment();
            }

            // if user chooses to add a role, add role by calling function
            else if (primarySelection === 'Add a role') {
                addRole();
            }

            // if user chooses to add employee, add employee by calling function
            else if (primarySelection === 'Add an employee') {
                addEmployee();
            }

            // if user chooses to update employee, update employee by calling function
            else if (primarySelection === 'Update an employee role') {
                updateEmployee();
            }

            // if user chooses quit, or anything else, quit the app
            else {
                console.log('Thanks for using my app!');
                process.exit()
            }
        })
}

startApplication();