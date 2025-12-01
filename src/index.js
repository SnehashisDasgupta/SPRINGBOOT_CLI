const { program } = require('commander');
const path = require('path');
const fs = require('fs');

const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

program
  .name('springboot-cli')
  .description('Spring Boot CLI - Generate Spring Boot projects interactively')
  .version(packageJson.version);

program
  .command('create [project-name]')
  .description('Create a new Spring Boot project')
  .action((projectName) => {
    console.log('🚀 Creating Spring Boot project...');
    if (projectName) {
      console.log(`Project name: ${projectName}`);
    }
  });

program.parse(process.argv);

// Show help if no arguments
if (!process.argv.slice(2).length) {
  program.outputHelp();
}