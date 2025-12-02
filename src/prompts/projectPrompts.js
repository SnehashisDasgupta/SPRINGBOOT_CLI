const inquirer = require('inquirer');
const chalk = require('chalk');
const { 
  validateProjectName, 
  validateGroup, 
  validateArtifact, 
  validatePackageName 
} = require('../utils/validator');
const { 
  projectNameToArtifact, 
  generatePackageName 
} = require('../utils/packageNameGenerator');

/**
 * Prompt for project configuration
 */
async function promptProjectConfig(providedProjectName) {
  console.log(chalk.bold.cyan('\n📝 Project Configuration\n'));

  const answers = {};

  // If project name was provided as argument, use it and skip prompt
  if (providedProjectName) {
    const validation = validateProjectName(providedProjectName);
    if (validation === true) {
      answers.projectName = providedProjectName;
      console.log(chalk.dim(`Project name: ${chalk.green(providedProjectName)} (from argument)\n`));
    } else {
      console.log(chalk.yellow(`⚠️  Invalid project name provided: ${validation}`));
      console.log(chalk.dim('Please provide a valid project name:\n'));
      const nameAnswer = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          validate: validateProjectName
        }
      ]);
      answers.projectName = nameAnswer.projectName;
    }
  } else {
    // No project name provided, ask for it
    const nameAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        validate: validateProjectName
      }
    ]);
    answers.projectName = nameAnswer.projectName;
  }

  // Group
  const groupAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'group',
      message: 'Group:',
      default: 'com.example',
      validate: validateGroup
    }
  ]);
  answers.group = groupAnswer.group;

  // Auto-generate artifact from project name
  const defaultArtifact = projectNameToArtifact(answers.projectName);

  const artifactAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'artifact',
      message: 'Artifact:',
      default: defaultArtifact,
      validate: validateArtifact
    }
  ]);

  answers.artifact = artifactAnswer.artifact;

  // Description
  const descriptionAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: 'Description:',
      default: 'Demo project for Spring Boot'
    }
  ]);

  answers.description = descriptionAnswer.description;

  // Auto-generate package name
  const defaultPackageName = generatePackageName(answers.group, answers.artifact);

  const packageAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'packageName',
      message: 'Package name:',
      default: defaultPackageName,
      validate: validatePackageName
    }
  ]);

  answers.packageName = packageAnswer.packageName;

  return answers;
}

module.exports = {
  promptProjectConfig
};