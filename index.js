const inquirer = require('inquirer');
const { getDepartments, getEmployees, getRoles } = require('./db/queries')


const userPrompt = () => {

    return inquirer
        .prompt(
              {
                type: 'list',
                name: 'nextAction',
                message: 'Use input to select an option',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Quit']
              }
        )
}


const recursiveFunction = () => {
    userPrompt().then(results => {
        switch(results.nextAction) {
            case 'View All Employees':
                getEmployees().then(rows => {
                    recursiveFunction();
                })
                break;
            case 'View All Roles':
                getRoles();
                break;
            case 'View All Departments':
                getDepartments();
                break;
            default:
                console.log('Thank you for using our database');
        }
    })
}

recursiveFunction();