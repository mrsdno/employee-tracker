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
    .then(({primarySelection}) => {
        if (primarySelection === 'View all departments') {
            const sql = `SELECT * from department`;
            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err);
                }
                console.table(rows);
                });
            };
        });
};


startApplication();