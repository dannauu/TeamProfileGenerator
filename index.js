const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const Employee = require("./lib/employee");
const chalk = require('chalk');
const log = console.log;
let employees = [];

// Function that uses inquirer package to prompt user for input regarding manager role
function addManager() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Enter your team managers name",
        name: "name",
      },
      {
        type: "input",
        message: "Enter managers id:",
        name: "id",
      },
      {
        type: "input",
        message: "Enter managers email address:",
        name: "email",
      },
      {
        type: "input",
        message: "Enter managers office number:",
        name: "officeNumber",
      },
      {
        type: "list",
        message: "Confirm role:",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role",
      },
    ])
    .then((answers) => {
      const name = answers.name;
      const id = answers.id;
      const email = answers.email;
      const officeNumber = answers.officeNumber;
      const role = answers.role;
      const employee = new Manager(name, id, email, officeNumber, role);
      employee.getRole();
      employees.push(employee);
      addMoreEmployees();
    });
}

// Function that uses inquirer package to prompt user for input regarding intern role
function addIntern() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the interns name:",
        name: "name",
      },
      {
        type: "input",
        message: "Enter interns id:",
        name: "id",
      },
      {
        type: "input",
        message: "Enter interns email address:",
        name: "email",
      },
      {
        type: "input",
        message: "Enter interns school:",
        name: "school",
      },
      {
        type: "list",
        message: "Confirm role:",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role",
      },
    ])
    .then((answers) => {
      const name = answers.name;
      const id = answers.id;
      const email = answers.email;
      const school = answers.school;
      const role = answers.role;
      const employee = new Intern(name, id, email, school, role);
      employees.push(employee);
      addMoreEmployees();
    });
}

// Function that uses inquirer package to prompt user for input regarding engineer role
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the engineers name:",
        name: "name",
      },
      {
        type: "input",
        message: "Enter engineers id:",
        name: "id",
      },
      {
        type: "input",
        message: "Enter engineers email address:",
        name: "email",
      },
      {
        type: "input",
        message: "Enter engineers github username:",
        name: "github",
      },
      {
        type: "list",
        message: "Confirm role:",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role",
      },
    ])
    .then((answers) => {
      const name = answers.name;
      const id = answers.id;
      const email = answers.email;
      const github = answers.github;
      const role = answers.role;
      const employee = new Engineer(name, id, email, github, role);
      employees.push(employee);
      addMoreEmployees();
    });
}

// Function that uses inquirer package to prompt user if they would like to add more employees to their team
function addMoreEmployees() {
    log(chalk.green('\n ------------------------------------------------------------------------------------------------------ \n'))
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to add more employees to your team?",
        choices: ["Add Engineer", "Add Intern", "or finish building my team"],
        name: "addEmployee",
      },
    ])
    .then((answers) => {
      if (answers.addEmployee === "Add Engineer") {
        log(chalk.black(chalk.bgGreen('Engineer chosen please fill out input fields')));
        addEngineer();
      } else if (answers.addEmployee === "Add Intern") {
        log(chalk.black(chalk.bgGreen('Intern chosen please fill out input fields')));
        addIntern();
      } else {
        buildTeam();
        log(chalk.black(chalk.bgGreen('Building HTML for your team...')))
      }
    });
}

// Function that builds the html based off the users input and then pushes it to an empty array to be written to the correct folder uses the fs package
function buildTeam() {
  const data = []
  const startHtml = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Team</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="myTeam">
      <h1 class="myTeamh1">My Team</h1>
    </div>

    <div class="container">
      <div class="row">`;

  data.push(startHtml);

  for (let i = 0; i < employees.length; i++) {
    let obj = `
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h5>${employees[i].name}</h5>
              <h6><i class="fas fa-glasses"></i> ${employees[i].role}</h6>
            </div>
              <ul>
                <li>ID: ${employees[i].id}</li>
                <li>Email: <a href="mailto:${employees[i].email}">${employees[i].email}</a></li>
                `;

    if (employees[i].officeNumber) {
      obj += `
            <li>Office Number: ${employees[i].officeNumber}</li>
            `;
    }
    if (employees[i].github) {
      obj += `
            <li>GitHub: <a href="https://github.com/${employees[i].github}">${employees[i].github}</a></li>
            `;
    }
    if (employees[i].school) {
      obj += `
            <li>School: ${employees[i].school}</li>
            `;
    }

    obj += `
              </ul>
            </div>
          </div>
        </div>`;

    data.push(obj);

  }

  const closeHTML = `
  </div>
</div>
<div class="footer">
<div class="col-md-12">
  <i class="far fa-copyright"> Daniel Nau</i>
  <a
    href="https://github.com/dannauu"
    class="btn btn-social"
    target="_blank"
    ><i class="fab fa-github"></i> Github</a
  >
</div>
</div>
</body>
<script
src="https://kit.fontawesome.com/687a090127.js"
crossorigin="anonymous"
></script>
</html>`;

data.push(closeHTML);

  fs.writeFile("./dist/myteam.html", data.join(""), function (err) {
    console.log(err);
  });
}

// Invokes the function to begin app
addManager();


// TODO: WHEN I click on an email address in the HTML -------> THEN my default email program opens and populates the TO field of the email with the address