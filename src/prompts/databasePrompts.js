const inquirer = require('inquirer');
const chalk = require('chalk');

/**
 * Prompt for database selection
 */
async function promptDatabase() {
  console.log(chalk.bold.cyan('\n🗄️  Database\n'));

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'database',
      message: 'Select database:',
      choices: [
        { name: 'None', value: 'none' },
        { name: 'PostgreSQL', value: 'postgresql' },
        { name: 'MySQL', value: 'mysql' },
        { name: 'H2 (Embedded)', value: 'h2' },
        { name: 'MongoDB', value: 'mongodb' },
        { name: 'Oracle', value: 'oracle' },
        { name: 'SQL Server', value: 'sqlserver' },
        { name: 'MariaDB', value: 'mariadb' }
      ],
      default: 'none'
    }
  ]);

  return answer;
}

module.exports = {
  promptDatabase
};