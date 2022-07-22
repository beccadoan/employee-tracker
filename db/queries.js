const db = require('./connection');
const cTable = require('console.table');

const getDepartments = () => {
    const sql = `
        SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
            return;
        } 
        console.table(rows);
    })
}

const getRoles = () => {
    const sql = `
        SELECT role.id, role.title, department.name AS department, role.salary 
        FROM role
        LEFT JOIN department
        ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
            return;
        } 
        console.table(rows);
    })
}

const getEmployees = () => {
    const sql = `
        SELECT a.id, a.first_name, a.last_name, role.title, department.name AS department, role.salary, CONCAT(b.first_name, ' ', b.last_name) AS manager FROM employee a
        LEFT JOIN role ON a.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee b
        ON a.manager_id = b.id `
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
            return;
        } 
        console.table(rows);
    })
}

module.exports = { getDepartments, getEmployees, getRoles };

