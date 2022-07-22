INSERT INTO department(name) 
VALUES
    ('Engineering'),
    ('Quality'),
    ('Human Resources');

INSERT INTO role(title, salary, department_id)
VALUES
    ('Electrical Engineer', 80000, 1),
    ('Mechanical Engineer', 75000, 1),
    ('Software Engineer', 90000, 1),
    ('Engineering Manager', 100000, 1),
    ('Quality Control Manager', 95000, 2),
    ('Quality Oversight', 70000, 2),
    ('Recruiter', 80000, 3),
    ('HR Coordinator', 75000, 3),
    ('HR Manager', 90000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ('Jenna', 'Smith', 4, null),
    ('Rory', 'Gilmore', 5, null),
    ('Jessie', 'Wessie', 9, null),
    ('John', 'Applebottom', 1, 1), 
    ('Spencer', 'Reed', 2, 1),
    ('Kim', 'Kardashian', 3, 1),
    ('Rob', 'Weeblewobble', 6, 2),
    ('Hanna', 'Banana', 7, 3),
    ('Steve', 'Jobs', 8 ,3);

