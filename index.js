const inquirer = require('inquirer');
const cTable = require('console.table');
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
  let departments = [];
    getDepartments().then(rows => {
    rows.forEach(element => {
      departments.push(element.name)
    })
  })
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
            type: 'list',
            name: 'department_id',
            message: 'What department is this role in?',
            choices: departments
          }
        ])
      
}

const updateRolePrompt = (employees, roles) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'What is the employee id of the employee you would like to update',
            choices: employees
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'What is the new role?',
            choices: roles
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
  let employees = ['none'];
    getEmployees().then(rows => {
    rows.forEach(element => {
      employees.push(element.first_name + ' ' + element.last_name)
    })
  })
  let roles = [];
    getRoles().then(rows => {
    rows.forEach(element => {
      roles.push(element.title)
    })
  })
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
            type: 'list',
            name: 'role_id',
            message: "Please choose employee role",
            choices: roles
          },
          {
            type: 'list',
            name: 'manager_id',
            message: "Please choose employee manager",
            choices: employees
          }
        ])
}


const recursiveFunction = () => {
    userPrompt().then(results => {
        switch(results.nextAction) {
            case 'View All Employees':
                getEmployees().then(rows => {
                    console.table(rows);
                    recursiveFunction();
                })
                break;
            case 'View All Roles':
                getRoles().then(rows => {
                  console.table(rows);
                  const roles = [];
                  rows.forEach(element => {
                    roles.push(element.title)
                  });
                    recursiveFunction();
                })
                break;
            case 'View All Departments':
                getDepartments().then(rows => {
                    console.table(rows);
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
                  getDepartments().then(rows => {
                    const newID = rows.find(x => x.name === response.department_id).id;
                    const body = {
                        title: response.title,
                        salary: response.salary,
                        department_id: newID
                    }
                    addRole({body}).then(res => {
                        getRoles().then(res => {
                            recursiveFunction();
                        });
                    })
                  })
                })
                break;
            case 'Add An Employee':
                newEmployeePrompt().then(response => {
                    getRoles().then(rows => {
                    const roleID = rows.find(x => x.title === response.role_id).id;
                    getEmployees().then(employeeRow => {
                    const manager = employeeRow.filter(employee => employee.first_name + ' ' + employee.last_name === response.manager_id);
                    let newID;
                    if(response.manager_id === 'none'){
                      newID = undefined;
                    } else{
                    newID = manager[0].id;
                    }
                    const body = {
                        first_name: response.first_name,
                        last_name: response.last_name,
                        role_id: roleID,
                        manager_id: newID
                    }
                    addEmployee({body}).then(res => {
                        getEmployees().then(res => {
                            recursiveFunction();
                        });
                    })
                  })
                })
                })
                break;
            case 'Update An Employee Role':
              let employees = [];
              getEmployees().then(rows => {
              rows.forEach(element => {
                employees.push({name:element.first_name + ' ' + element.last_name, value: element.id})
              })
            let roles = [];
              getRoles().then(res => {
              res.forEach(element => {
                roles.push({name: element.title, value: element.id})
              })
            
                updateRolePrompt(employees, roles).then(response => {
                  console.log(response);

                  const body = {
                    id: response.id,
                    role_id: response.role_id
                }
                    updateRole({body}).then(res => {
                      recursiveFunction();
                    })
                })
              })
                })
                break;
            default:
                console.log('Thank you for using our database');
        }
    })
}

recursiveFunction();