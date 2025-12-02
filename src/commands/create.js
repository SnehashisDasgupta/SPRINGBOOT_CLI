const chalk = require('chalk');
const { collectProjectConfiguration } = require('../prompts');

/**
 * Display configuration summary
 */
function displayConfigSummary(config) {
  console.log(chalk.bold.green('\n✨ Configuration Summary:\n'));
  console.log(chalk.cyan('━'.repeat(50)));
  
  console.log(chalk.bold('\n📦 Project Information:'));
  console.log(`   Name: ${chalk.green(config.projectName)}`);
  console.log(`   Group: ${chalk.green(config.group)}`);
  console.log(`   Artifact: ${chalk.green(config.artifact)}`);
  console.log(`   Description: ${chalk.dim(config.description)}`);
  console.log(`   Package: ${chalk.green(config.packageName)}`);

  console.log(chalk.bold('\n⚙️  Technical Stack:'));
  console.log(`   Java: ${chalk.green(config.javaVersion)}`);
  console.log(`   Spring Boot: ${chalk.green(config.springBootVersion)}`);
  console.log(`   Build Tool: ${chalk.green(config.buildTool)}`);
  console.log(`   Packaging: ${chalk.green(config.packaging)}`);
  console.log(`   Configuration: ${chalk.green(config.configurationType)}`);

  console.log(chalk.bold('\n🗄️  Database:'));
  console.log(`   ${chalk.green(config.database === 'none' ? 'None' : config.database)}`);

  console.log(chalk.bold('\n📚 Dependencies:'));
  if (config.dependencies && config.dependencies.length > 0) {
    config.dependencies.forEach(dep => {
      console.log(`   ${chalk.green('•')} ${dep}`);
    });
  } else {
    console.log(`   ${chalk.dim('None selected')}`);
  }

  console.log(chalk.cyan('\n' + '━'.repeat(50) + '\n'));
}

/**
 * Create command handler
 */
async function createCommand(projectName) {
  try {
    console.log(chalk.bold.green('\nWelcome to Spring Boot CLI! 🚀\n'));

    // Collect configuration (pass projectName if provided)
    const config = await collectProjectConfiguration(projectName);

    // Display summary
    displayConfigSummary(config);

    // TODO: In Step 3, we'll generate the actual project here
    console.log(chalk.yellow('⚠️  Project generation not yet implemented.'));
    console.log(chalk.dim('This will be added in Step 3.\n'));

    console.log(chalk.green('Configuration collected successfully! ✓\n'));

  } catch (error) {
    console.error(chalk.red('\n❌ Error creating project:'), error.message);
    process.exit(1);
  }
}

module.exports = {
  createCommand
};