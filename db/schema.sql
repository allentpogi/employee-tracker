DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(50)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50),
  salary VARCHAR(50),
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  manager INT,
  department_id INT,
  role_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL
);



