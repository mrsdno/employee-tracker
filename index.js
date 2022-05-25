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
                        let role = new Role(addedRoleTitle);
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
                    
                }
            })
        }
    
    





startApplication();