const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const { getSpringBootVersions } = require('../utils/springInitializrApi');

/**
 * Prompt for technical stack configuration
 */
async function promptTechnicalConfig() {
  console.log(chalk.bold.cyan('\n⚙️  Technical Stack\n'));

  // Fetch Spring Boot versions
  const spinner = ora('Fetching Spring Boot versions...').start();
  const springBootVersions = await getSpringBootVersions();
  spinner.succeed('Spring Boot versions loaded');

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'javaVersion',
      message: 'Java version:',
      choices: ['21', '17', '11', '8'],
      default: '17'
    },
    {
      type: 'list',
      name: 'springBootVersion',
      message: 'Spring Boot version:',
      choices: springBootVersions,
      default: springBootVersions[0]
    },
    {
      type: 'list',
      name: 'buildTool',
      message: 'Build tool:',
      choices: [
        { name: 'Maven', value: 'maven' },
        { name: 'Gradle - Groovy', value: 'gradle' },
        { name: 'Gradle - Kotlin', value: 'gradle-kotlin' }
      ],
      default: 'maven'
    },
    {
      type: 'list',
      name: 'packaging',
      message: 'Packaging:',
      choices: ['jar', 'war'],
      default: 'jar'
    },
    {
      type: 'list',
      name: 'configurationType',
      message: 'Configuration:',
      choices: [
        { name: 'Properties', value: 'properties' },
        { name: 'YAML', value: 'yaml' }
      ],
      default: 'properties'
    }
  ]);

  return answers;
}

module.exports = {
  promptTechnicalConfig
};