// TODO: Include packages needed for this application
var fs = require('fs');
var inquirer = require('inquirer');
// TODO: Create an array of questions for user input
const questions = [
//Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
{name:'Title',
    message: 'What is the Title of your Project?',
    default: null },
{name:'Description',
    message: 'Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide: Why did you build this project? (Note: the answer is not "Because it was a homework assignment.") What problem does it solve? What did you learn?',
    default: null },
    
    {name:'TableofContents',
    message: 'Add a link to another section of your READme if your READme is too long.',
    default: null },

    {name:'Installation',
    message: 'What are the steps required to install your project:',
    default: null },

    {name:'Usage',
    message: 'Provide instructions and examples for use:',
    default: null },

    {type: "list",    
    name:'License',
    message: 'If your application uses a license, select which one here:',
    choices: [
        "Apache license 2.0	apache-2.0",
        "Boost Software License 1.0	bsl-1.0",
        "BSD 2-clause 'Simplified' license	bsd-2-clause",
        'BSD 3-clause "New" or "Revised" license	bsd-3-clause',
        "Creative Commons Zero v1.0 Universal	cc0-1.0",
        "Eclipse Public License 2.0	epl-2.0",
        "GNU General Public License v2.0	gpl-2.0",
        "GNU General Public License v3.0	gpl-3.0",
        "MIT	mit",
        "Mozilla Public License 2.0	mpl-2.0",
        "The Unlicense	unlicense",],
    default: null },

    {name:'Contributing',
    message: 'If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so here:',
    default: null },

    {name:'Tests',
    message: 'Go the extra mile and write tests for your application. Then provide examples on how to run them here:',
    default: null },

    {name:'GitHub',
    message: 'Include your Github UserName',
    default: null },

    {name:'email',
    message: "What is your Email",
    default: null
    }

];

function writeToFile() {

inquirer
    .prompt(questions)
    .then((answers) => { 
      var TableofContents = answers.TableofContents.toLowerCase();
      var icon = answers.License;
      switch (icon) {
      
          case 'Apache license 2.0	apache-2.0':
          var icon = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
          break;
      
          case 'Boost Software License 1.0	bsl-1.0':
          var icon = '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)';
          break;
      
            case "BSD 2-clause 'Simplified' license	bsd-2-clause":
          var icon = '[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)';
          break;
      
          case 'BSD 3-clause "New" or "Revised" license	bsd-3-clause':
          var icon = '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
          break;
      
          case "Creative Commons Zero v1.0 Universal	cc0-1.0":
          var icon = '[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)';
          break;
      
          case "Eclipse Public License 2.0	epl-2.0":
          var icon = '[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)';
          break;
      
          case "GNU General Public License v2.0	gpl-2.0":
          var icon = '[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)';
          break;
      
          case "GNU General Public License v3.0	gpl-3.0":
          var icon = '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)';
          break;
      
          case "MIT	mit":
          var icon = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
          break;
      
          case "Mozilla Public License 2.0	mpl-2.0":
          var icon = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
          break;
      
          case "The Unlicense	unlicense":
          var icon = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)';
          break;   
      }
      
    fileName = answers.Title
    fs.writeFile("README.md",`
# ${answers.Title} ${icon}

## Description
  ${answers.Description}

## Table of Contents
  [${answers.TableofContents}](#${TableofContents})

## Installation
  ${answers.Installation}

## Usage
  ${answers.Usage}

## License
  ${answers.License}

## Contributing
  ${answers.Contributing}

## Tests
  ${answers.Tests}

## Questions
  [GitHub](https://www.github.com/${answers.GitHub}) 
  Email: ${answers.email}
  `
    , function (err) {
        if (err) throw err;
        console.log('Saved!');
      }
    )})
    
}

function init() {
  function getAnswers() {
    return inquirer.prompt(TableofContents).then((answers) => {
      if (answers.is_finished) {
        return answers;
      } else {
        return getAnswers();
      }
    });
  }
writeToFile();
}

init();