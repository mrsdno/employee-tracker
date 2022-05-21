USE business;

INSERT INTO department (department_name)
VALUES
('Sales'), ('Engineering'), ('Finance'), ('Legal'); 

INSERT INTO role (title, salary, department_id)
VALUES
('Salesperson', '60000', '1'), --1
('Lead Engineer', '130000', '2'), --2
('Software Engineer', '90000', '2'), --3
('Account Manager', '100000', '3'), --4
('Accountant', '95000', '3'), --5
('Legal Team Lead', '180000', '4'), --6
('Lawyer', '130000', '4') --7

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Noemi', 'Faulkner', '4'), -- account manager1
('Marlee', 'Church', '1', '1'), -- sales person2
('Alonso', 'Velez', '1', '1'), -- sales person3
('Cindy', 'Mccann', '2'), -- lead engineer4
('Desiree', 'Lowery', '3', '4'), -- software engineer5
('Madden', 'Boyle', '5', '1'), -- accountant6
('Chelsea', 'Lin', '6'), -- Legal Team Lead7
('Case', 'Buchanan', '7', '7'), -- Lawyer8
('Carlie', 'Molina', '7', '7'), -- Lawyer9