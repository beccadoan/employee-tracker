const inquirer = require('inquirer');
const { getDepartments, getEmployees, getRoles, addDepartment } = require('./db/queries')


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

// const newEmployeePrompt = () => {
//     return inquirer
//         .prompt(
//               {
//                 type: 'list',
//                 name: 'nextAction',
//                 message: 'Use input to select an option',
//                 choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Quit']
//               }
//         )
// }

const newRolePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of this role?',
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please enter the role title');
                  return false;
                }
            }
          },
          {
            type: 'input',
            name: 'salary',
            message: 'Please provide the salary for this role',
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please enter salary');
                  return false;
                }
            }
          },
          {
            type: 'input',
            name: 'department_id',
            message: 'Provide the department id for this role',
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please enter department id');
                  return false;
                }
            }
          }
        ])
}

const newDepartmentPrompt = () => {
    return inquirer.prompt(
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please enter the department name');
                  return false;
                }
            }
          })
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
                getRoles().then(rows => {
                    recursiveFunction();
                })
                break;
            case 'View All Departments':
                getDepartments().then(rows => {
                    recursiveFunction();
                })
                break;
            case 'Add A Department':
                newDepartmentPrompt().then(response => {
                    const body = {
                        name: response.name
                    }
                    addDepartment({body}).then(res => {
                        getDepartments();
                    })
                })
                
                break;
            case 'Add A Role':
            
                break;
            case 'Add An Employee':
            
                break;
            case 'Update An Employee Role':
        
                break;
            default:
                console.log('Thank you for using our database');
        }
    })
}

recursiveFunction();