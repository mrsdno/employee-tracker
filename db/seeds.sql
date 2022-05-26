USE business;

INSERT INTO departments (department_name)
VALUES
('Sales'), ('Engineering'), ('Finance'), ('Legal'); 

INSERT INTO roles (title, salary, department_id)
VALUES
('Salesperson', '60000', '1'), 
('Lead Engineer', '130000', '2'), 
('Software Engineer', '90000', '2'), 
('Account Manager', '100000', '3'),
('Accountant', '95000', '3'), 
('Legal Team Lead', '180000', '4'), 
('Lawyer', '130000', '4');

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Noemi', 'Faulkner', '4', null), 
('Marlee', 'Church', '1', '1'), 
('Alonso', 'Velez', '1', '1'),
('Cindy', 'Mccann', '2', null), 
('Desiree', 'Lowery', '3', '4'), 
('Madden', 'Boyle', '5', '1'), 
('Chelsea', 'Lin', '6', null),
('Case', 'Buchanan', '7', '7'), 
('Carlie', 'Molina', '7', '7')