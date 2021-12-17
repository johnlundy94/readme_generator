const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  console.log("License", license[0]);
  switch (license[0]) {
    case "MIT License":
      return "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)";
    case "GNU General Public License v2.0":
      return "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
    default:
      return "";
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license !== "No license") {
    return "-[License](#license)";
  }
  return "";
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license !== "No license") {
    return `## License
    This project was licensed under the ${license}`;
  }
  return "";
}

const writeFileAsync = util.promisify(fs.writeFile);
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of your project?",
    },
    {
      type: "input",
      name: "motivation",
      message: "What was your motivation?",
    },
    {
      type: "input",
      name: "why",
      message: "Why did you build this project?",
    },
    {
      type: "input",
      name: "whatDoesItSolve",
      message: "What problem does it solve?",
    },
    {
      type: "input",
      name: "whatDidYouLearn",
      message: "What did you learn?",
    },
    {
      type: "input",
      name: "instal",
      message: "What are the steps to install?",
    },
    {
      type: "input",
      name: "usage",
      message: "Provide steps on how to use.",
    },
    {
      type: "input",
      name: "contribute",
      message: "How might someone contribute?",
    },
    {
      type: "input",
      name: "credits",
      message:
        "List any collaborators and their GitHub user names. List any third party assets and tutorials that you may have used.",
    },
    {
      type: "checkbox",
      message: "Select license",
      name: "license",
      choices: [
        new inquirer.Separator(" = Licenses = "),
        {
          name: "GNU General Public License v2.0",
        },
        {
          name: "MIT License",
        },
        {
          name: "No license",
        },
      ],
    },
    {
      type: "input",
      name: "tests",
      message: "Provide examples on how to run the tests of your application.",
    },
    {
      type: "input",
      name: "github",
      message: "What is your GitHub username?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?",
    },
  ]);
};

const generateREADME = (answers) =>
  `# ${answers.name}
  ${renderLicenseBadge(answers.license)}
  ${renderLicenseLink(answers.license)}

  ## Description
  ${answers.motivation}
  ${answers.why}
  ${answers.whatDoesItSolve}
  ${answers.whatDidYouLearn}
  
  ## Table Of Contents
  - [Description](#description)
  - [Install](#install)
  - [Use](#use)
  - [Contribute](#contribute)
  - [Credits](#credits)
  - [License](#license)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Install
  ${answers.install}
  
  ## Use
  ${answers.usage}
  
  ## Contribute
  ${answers.contribute}
  
  ## Credits
  ${answers.credits}
  
  ${renderLicenseSection(answers.license)}
  
  ## Tests
  ${answers.tests}
  
  ## Questions
  If any questions visit our [GitHub](https://github.com/${
    answers.github
  }) or email ${answers.email}`;

// TODO: Create a function to initialize app
const init = () => {
  promptUser()
    .then((answers) => writeFileAsync("README.md", generateREADME(answers)))
    .then(() => console.log("Successfully wrote to README.md"))
    .catch((err) => console.error(err));
};

init();
