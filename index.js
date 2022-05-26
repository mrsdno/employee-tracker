// YOU LEFT OFF WRITING THE ADD EMPLOYEE FUNCITONALITY. NOW YOU JUST HAVE TO DO THE UPDATE EMPLOYEE AND SOME CLEANUP


const inquirer = require('inquirer');
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const db = require('./db/connection')
const cTable = require('console.table');


const startApplication = () => {
    console.log('Welcome to the employee tracker!');

    console.log("Let's get started!");

    // start application by asking what the user wants to do
    inquirer
        .prompt({
            type: 'list',
            name: 'primarySelection',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        })
        .then(({ primarySelection }) => {
            if (primarySelection === 'View all departments') {
                db.query(`SELECT * from department`, (err, rows) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(rows);
                });
            } else if (primarySelection === 'View all roles') {
                db.query(`SELECT * from role`, (err, rows) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(rows);
                });
            } else if (primarySelection === 'View all employees') {
                db.query(`SELECT * from employee`, (err, rows) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(rows);
                });
            } else if (primarySelection === 'Add a department') {
                inquirer
                    .prompt({
                        type: 'input',
                        message: 'What is the name of the department you want to add?',
                        name: 'addedDepartment'

                    })
                    .then(({ addedDepartment }) => {
                        db.query(`INSERT INTO department (department_name) VALUES (?)`, addedDepartment, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log('Department successfully added!');
                        });
                    });
            } else if (primarySelection === 'Add a role') {
                inquirer
                    .prompt({
                        type: 'input',
                        message: 'What is the title of the role you want to add?',
                        name: 'addedRoleTitle'
                    })
                    .then(({ addedRoleTitle }) => {
                        // set up role object
                        let role = new Role();
                        role.setRoleTitle(addedRoleTitle);
                        inquirer
                            .prompt({
                                type: 'input',
                                message: 'What is the salary of the role you want to add?',
                                name: 'addedRoleSalary'
                            })
                            .then(({ addedRoleSalary }) => {
                                role.setRoleSalary(addedRoleSalary);
                                inquirer
                                    .prompt({
                                        type: 'list',
                                        name: 'addedRoleDepartment',
                                        message: 'What department is this role in?',
                                        choices: ['1. Sales', '2. Engineering', '3. Finance', '4. Legal', '5. Quality Control']
                                    })
                                    .then(({ addedRoleDepartment }) => {
                                        role.setRoleDepartment(addedRoleDepartment.charAt(0));
                                        console.log('this is before your query', role.title, role.salary, role.department_id);
                                        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [role.title, role.salary, role.department_id], (err, result) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                            console.log(role.title, role.salary, role.department_id);
                                        });

                                    });

                            })
                    })

            } else if (primarySelection === 'Add an employee') {
                inquirer
                    .prompt({
                        type: 'input',
                        message: "What is the employee's first name?",
                        name: 'addedEmployeeFirstName'
                    })
                    .then(({ addedEmployeeFirstName }) => {
                        // set up employee object
                        let employee = new Employee();
                        employee.setFirstName(addedEmployeeFirstName);
                        inquirer
                            .prompt({
                                type: 'input',
                                message: "What is the employee's last name?",
                                name: 'addedEmployeeLastName'
                            })
                            .then(({ addedEmployeeLastName }) => {
                                employee.setLastName(addedEmployeeLastName);
                                inquirer
                                    .prompt({
                                        type: 'list',
                                        name: 'addedEmployeeRole',
                                        message: "What is this employee's role?",
                                        choices: ['1. Salesperson', '2. Lead Engineer', '3. Software Engineer', '4. Account Manager', '5. Accountant', '6. Legal Team Lead', '7. Lawyer']
                                    })
                                    .then(({ addedEmployeeRole }) => {
                                        employee.setRoleId(addedEmployeeRole.charAt(0));
                                        inquirer
                                            .prompt({
                                                type: 'list',
                                                name: 'addedEmployeeManager',
                                                message: "Who is this employee's manager?",
                                                choices: ['1. Account Manager', '2. Lead Engineer', '3. Legal Team Lead']
                                            })
                                            .then(({ addedEmployeeManager }) => {
                                                employee.setManagerId(addedEmployeeManager.charAt(0));
                                                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [employee.first_name, employee.last_name, employee.role_id, employee.manager_id], (err, result) => {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                    console.log(employee.first_name, employee.last_name, employee.role_id, employee.manager_id);
                                                });
                                            })
                                    });
                            })
                    })
            } else if (primarySelection === 'Update an employee role') {
                inquirer
                    .prompt({
                        type: 'list',
                        message: "What employee's role do you want to change?",
                        name: 'employeeUpdateId',
                        choices: ['1. Noemi', '2. Marlee', '3. Alonso', '4. Cindy', '5. Desiree', '6. Madden', '7. Chelsea', '8. Case', '9. Charlie']
                    })
                    .then(({ employeeUpdateId }) => {
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
                            employee.setRoleId(employeeUpdateRole.charAt(0));
                        

                        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [employee.role_id, employee.id], (err, result) => { 
                            if (err) {
                                console.log(err);
                            }
                            console.log(`You updated employee id ${employee.id}'s role to ${employee.role_id}`);
                        });
                    })
                })
            }
        })
}







startApplication();