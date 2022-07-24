const db = require('./connection');
const cTable = require('console.table');

const getDepartments = () => {
    const sql = `
        SELECT * FROM department`;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err);
                reject('Rejected');
            } 
            console.table(rows);
            resolve(rows);
        })
    })
}

const getRoles = () => {
    const sql = `
        SELECT role.id, role.title, department.name AS department, role.salary 
        FROM role
        LEFT JOIN department
        ON role.department_id = department.id`;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err);
                reject('Rejected');
            } 
            console.table(rows);
            resolve(rows);
        })
    })
}

const getEmployees = () => {
    const sql = `
        SELECT a.id, a.first_name, a.last_name, role.title, department.name AS department, role.salary, CONCAT(b.first_name, ' ', b.last_name) AS manager FROM employee a
        LEFT JOIN role ON a.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee b
        ON a.manager_id = b.id `
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err);
                reject('Rejected');
            } 
            console.table(rows);
            resolve(rows);
        })
    })
}

const addDepartment = ({ body }) => {
    const sql = `INSERT INTO department (name)
                 VALUES (?)`;
    const params = [body.name];
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if(err) {
                console.log(err);
                reject('Rejected');
            } 
            resolve(result);
        })
    })
}

module.exports = { getDepartments, getEmployees, getRoles, addDepartment };

