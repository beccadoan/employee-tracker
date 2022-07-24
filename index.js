const inquirer = require('inquirer');
const { getDepartments, getEmployees, getRoles, addDepartment, addRole, addEmployee, updateRole } = require('./db/queries')


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

const updateRolePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the employee id of the employee you would like to update',
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please enter the employee id');
                  return false;
                }
            }
          },
          {
            type: 'input',
            name: 'role_id',
            message: 'What is the new role id of this employee',
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please enter the role id');
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

const newEmployeePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?",
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please enter first name');
                  return false;
                }
            }
          },
          {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?",
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please enter last name');
                  return false;
                }
            }
          },
          {
            type: 'input',
            name: 'role_id',
            message: "Please enter employee's role id",
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please enter role id');
                  return false;
                }
            }
          },
          {
            type: 'input',
            name: 'manager_id',
            message: "Please enter employee's manager id",
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please enter manager id');
                  return false;
                }
            }
          }
        ])
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
                        getDepartments().then(res => {
                            recursiveFunction();
                        });
                    })
                })
                break;
            case 'Add A Role':
                newRolePrompt().then(response => {
                    const body = {
                        title: response.title,
                        salary: response.salary,
                        department_id: response.department_id
                    }
                    addRole({body}).then(res => {
                        getRoles().then(res => {
                            recursiveFunction();
                        });
                    })
                })
                break;
            case 'Add An Employee':
                newEmployeePrompt().then(response => {
                    const body = {
                        first_name: response.first_name,
                        last_name: response.last_name,
                        role_id: response.role_id,
                        manager_id: response.manager_id
                    }
                    addEmployee({body}).then(res => {
                        getEmployees().then(res => {
                            recursiveFunction();
                        });
                    })
                })
                break;
            case 'Update An Employee Role':
                updateRolePrompt().then(response => {
                    const body = {
                        id: response.id,
                        role_id: response.role_id
                    }
                    updateRole({body}).then(res => {
                        getEmployees().then(res => {
                            recursiveFunction();
                        });
                    })
                })
                break;
            default:
                console.log('Thank you for using our database');
        }
    })
}

recursiveFunction();