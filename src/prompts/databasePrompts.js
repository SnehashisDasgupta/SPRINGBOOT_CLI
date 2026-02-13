const inquirer = require('inquirer');
const chalk = require('chalk');

/**
 * Prompt for database selection
 */
async function promptDatabase() {
  console.log(chalk.bold.cyan('\n🗄️  Database\n'));

  const { database } = await inquirer.prompt([
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

  let dbName = null;

  // Ask DB name only when needed
  if (database !== 'none' && database !== 'h2') {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'dbName',
        message: 'Enter database name:',
        default: 'myapp_db',
        validate: (input) =>
          input && input.trim() !== ''
            ? true
            : 'Database name cannot be empty'
      }
    ]);

    dbName = answer.dbName;
  }

  return { database, dbName };
}

module.exports = {
  promptDatabase
};
