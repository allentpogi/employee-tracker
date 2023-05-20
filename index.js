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
async function init() {
  console.clear()
  await inquirer
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
        case 'Add Department':
          addDepartment();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeerole();
          break;
        case 'Quit':
          console.clear()
          console.log('Exiting the application.');
          process.exit();
          break;
      }
    })
};

//function to get all the departments from database and display as table
const viewDepartments = async () => {
  db.query('SELECT * FROM department', (err, results) => {
    console.clear()
    console.log("")
    console.log("------------------------------------------------------------------------")
    console.table(results)
    console.log("------------------------------------------------------------------------");
  });
  init()
}

//function to get all the employees from database and display as table
const viewEmployees = async () => {
  db.query('SELECT employees.first_name, employees.last_name, department.department_name, roles.title, roles.salary, concat(m.first_name, " ", m.last_name) "manager" FROM employees JOIN department ON employees.department_id = department.id JOIN roles ON employees.role_id = roles.id LEFT OUTER JOIN employees m on employees.manager = m.id;' , function (err, results) {
    console.clear()
    console.log("")
    console.log("--------------------------------------------------------------------------------------------------------------")
    console.table(results);
    console.log("--------------------------------------------------------------------------------------------------------------")
  });
  init()
}

//function to get all the roles from database and display as table
const viewRoles = async () => {
  db.query('SELECT roles.title, roles.salary, department.department_name FROM roles JOIN department ON roles.department_id = department.id;', function (err, results) {
    console.clear()
    console.log("")
    console.log("------------------------------------------------------------------------")
    console.table(results);
    console.log("------------------------------------------------------------------------")
  });
  init()
}

//function to add department
const addDepartment = async () => {
  console.clear()
  await inquirer
    .prompt([
      {
          name: "departmentToadd",
          type: "input",
          message: "What is the name of the new department?"
      }
    ])
    .then(answer => {
      db.query(`INSERT INTO department (department_name) VALUES("` + answer.departmentToadd + '");', (err, result) => {
        if (err) {
          console.log(err);
        }
        console.clear()
        console.log("Department added successfully.");
      });
    })
  init()
}

//function to get the departments from the database
const departmentChoices = async () => { 
  return new Promise((resolve, reject) => {
    db.query('SELECT id AS value, department_name AS name FROM department;', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};


//function to add role
const addRole = async () => {
  console.clear()
  const departments = await departmentChoices()
  await inquirer
    .prompt([
      {
          name: "roleToadd",
          type: "input",
          message: "What is the name of the new role?"
      },
      {
        name: "newRolesalary",
        type: "input",
        message: "How much is the salary of the new role?"
      },
      {
        name: "newRoledepartment",
        type: "list",
        message: "What is the department of the new role?",
        choices: departments,
      },
    ])
      .then(answer => {
      console.log(answer.newRoledepartment)
      db.query(`INSERT INTO roles (title, salary, department_id) VALUES("` + answer.roleToadd + '", "' + answer.newRolesalary + '", "' +  answer.newRoledepartment +'");', (err, result) => {
        if (err) {
          console.log(err);
        }
        console.clear()
        console.log("Role added successfully.");
      });

    })
    init();
}

//function to get the roles from the database
const roleChoices = async () => { 
  return new Promise((resolve, reject) => {
    db.query('SELECT id AS value, title AS name FROM roles;', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

//function to get the employees from the database
const employees = async () => { 
  return new Promise((resolve, reject) => {
    db.query('SELECT id AS value, concat(first_name, " ", last_name) AS name FROM employees;', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};


//function to add employee
const addEmployee = async () => {
  console.clear()
  const departments = await departmentChoices()
  const roles = await roleChoices()
  const manager = await employees()
  await inquirer
    .prompt([
      {
          name: "firstName",
          type: "input",
          message: "What is employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is employee's last name?"
      },
      {
        name: "role",
        type: "list",
        message: "What is the role of the employee?",
        choices: roles,
      },
      {
        name: "department",
        type: "list",
        message: "What is the department of the new role?",
        choices: departments,
      },
      {
        name: "manager",
        type: "list",
        message: "Who is the employee's manager?",
        choices: manager,
      },
    ])
      .then(answer => {
      console.log(answer.newRoledepartment)
      db.query(`INSERT INTO employees (first_name, last_name, manager, department_id, role_id) VALUES("` + answer.firstName + '", "' + answer.lastName + '", "' +  answer.manager + '", "' + answer.department + '", "' + answer.role +'");', (err, result) => {
        if (err) {
          console.log(err);
        }
        console.clear()
        console.log("Employee added successfully.");
      });

    })
    init();
}


//function to update employee role
const updateEmployeerole = async () => {
  console.clear()
  const roles = await roleChoices()
  const employee = await employees()
  await inquirer
    .prompt([
      {
        name: "employee",
        type: "list",
        message: "Select the employee that you want to update.",
        choices: employee,
      },
      {
        name: "role",
        type: "list",
        message: "What is the new role of the employee?",
        choices: roles,
      },
    ])
      .then(answer => {
      console.log(answer.newRoledepartment)
      db.query('update employees SET role_id = "' + answer.role + '" WHERE id = ' + answer.employee + ';', (err, result) => {
        if (err) {
          console.log(err);
        }
        console.clear()
        console.log("Employee role updated successfully.");
      });

    })
    init();
}


// Function call to initialize app
init();