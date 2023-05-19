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
    console.log('Welcome to the Employee Database Manager!');

    inquirer
        .prompt(mainQuestions)
        .then((answer) => {
          switch (answer.mainOptions) {
            case 'View All Departments':
              viewDepartments();
            case 'View All Employees':
              viewEmployees();
            case 'View All Roles':
              viewRoles();
            case 'Quit':
              console.log('Exiting the application.');
              process.exit();
          }
        })
};

const viewDepartments = () => {
  console.log('view all departments');
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
  });
  return init();
}

const viewRoles = () => {
  console.log('view all departments');
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
  });
  return init();
}



// Function call to initialize app
init();