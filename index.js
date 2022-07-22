const inquirer = require('inquirer');
const { getDepartments, getEmployees, getRoles } = require('./db/queries')


const userPrompt = () => {

    return inquirer
        .prompt(
              {
                type: 'list',
                name: 'nextAction',
                message: 'Use input to select an option',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
              }
        )
}


const recursiveFunction = () => {
    userPrompt().then(results => {
        if (results.nextAction !== 'Quit') {
            console.log(results.nextAction);
            recursiveFunction()
        } else {
            console.log('Thanks for using our database!');

        }
    })
}

// recursiveFunction();
// getDepartments();
getEmployees();
// getRoles();