// Packages needed for this application
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const app = express();
const consoleTable = require('console.table');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '12345',
    database: 'employee_db'
  },
  console.log(`Connected to the courses_db database.`)
);


// Array of questions for user input
const mainQuestions = [
    {
      type: 'list',
      name: 'mainOptions',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Quit',
      ],
    },
];



// Function to initialize app
function init() {
    // console.log('Welcome to the Employee Database Manager!');

    inquirer
      .prompt(mainQuestions)
      .then(answer => {
        switch (answer.mainOptions) {
          case 'View All Departments':
            viewDepartments();
            return answer.mainOptions
            break;
          case 'View All Employees':
            viewEmployees();
            break;
          case 'View All Roles':
            viewRoles();
            break;
          case 'Quit':
            console.log('Exiting the application.');
            process.exit();
            break;
        }
      })
};




const viewDepartments = () => {
  db.query('SELECT * FROM department', function (err, results) {
    console.log("")
    console.log("------------------------------------------------------------------------")
    console.table(results);
    console.log("------------------------------------------------------------------------")
  });
  init()
}

const viewEmployees = () => {
  db.query('SELECT employees.first_name, employees.last_name, department.department_name, roles.title, roles.salary, concat(m.first_name, " ", m.last_name) "manager" FROM employees JOIN department ON employees.department_id = department.id JOIN roles ON employees.role_id = roles.id JOIN employees m on employees.manager = m.id;' , function (err, results) {
    console.log("")
    console.log("--------------------------------------------------------------------------------------------------------------")
    console.table(results);
    console.log("--------------------------------------------------------------------------------------------------------------")
  });
  init()
}

const viewRoles = () => {
  db.query('SELECT roles.title, roles.salary, department.department_name FROM roles JOIN department ON roles.department_id = department.id;', function (err, results) {
    console.log("")
    console.log("------------------------------------------------------------------------")
    console.table(results);
    console.log("------------------------------------------------------------------------")
  });
  init()
}

  

// Function call to initialize app
init();