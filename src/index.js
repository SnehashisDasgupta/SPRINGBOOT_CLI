const { program } = require('commander');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const { createCommand } = require('./commands/create');

// Read package.json
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Spring Boot style banner
function showBanner() {
  const banner = `
${chalk.green('  .   ____          _            __ _ _')}
${chalk.green(' /\\\\ / ___\'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\')}
${chalk.green('( ( )\\___ | \'_ | \'_| | \'_ \\/ _` | \\ \\ \\ \\')}
${chalk.green(' \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )')}
${chalk.green('  \'  |____| .__|_| |_|_| |_\\__, | / / / /')}
${chalk.green(' =========|_|==============|___/=/_/_/_/')}

${chalk.bold.cyan(' :: SpringBoot CLI ::')}               ${chalk.dim(`(v${packageJson.version})`)}
  `;
  console.log(banner);
}

program
  .name('springboot-cli')
  .description('SpringBoot CLI - Generate Spring Boot projects interactively')
  .version(packageJson.version);

program
  .command('create [project-name]')
  .description('Create a new Spring Boot project')
  .action(async (projectName) => {
    showBanner();
    await createCommand(projectName);
  });

program.parse(process.argv);

// Show help if no arguments (with banner)
if (!process.argv.slice(2).length) {
  showBanner();
  program.outputHelp();
}