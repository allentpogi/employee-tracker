INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", "120000", 1),
       ("Sales Support", "100000", 1),
       ("Engineering Lead", "130000", 2),
       ("Engineer", "110000", 2),
       ("Finance Lead", "140000", 3),
       ("Finance Analyst", "120000", 3),
       ("Legal Lead", "150000", 4),
       ("Legal Resource", "125000", 4);

INSERT INTO employees (first_name, last_name, manager, department_id, role_id)
VALUES ("John", "Salesleed", NULL, 1, 1),
       ("Alex", "Salessupport", 1, 1, 2),
       ("Michael", "Engineeringlead", NULL, 2, 3),
       ("Chris", "Engineer", 3, 2, 4),
       ("Allison", "Financelead", NULL, 3, 5),
       ("Drew", "Financeanalyst", 5, 3, 6),
       ("Milan", "Legallead", NULL, 4, 7),
       ("Carlos", "Financeresource", 7, 4, 8);