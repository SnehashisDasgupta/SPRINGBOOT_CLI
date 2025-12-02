const chalk = require('chalk');
const { promptProjectConfig } = require('./projectPrompts');
const { promptTechnicalConfig } = require('./configPrompts');
const { promptDatabase } = require('./databasePrompts');
const { promptDependencies } = require('./dependencyPrompts');

/**
 * Run all prompts and collect project configuration
 */
async function collectProjectConfiguration(projectName) {
  try {
    // Project configuration (pass projectName if provided)
    const projectConfig = await promptProjectConfig(projectName);

    // Technical stack
    const technicalConfig = await promptTechnicalConfig();

    // Database
    const databaseConfig = await promptDatabase();

    // Dependencies (pass database choice for auto-selection)
    const dependencyConfig = await promptDependencies(databaseConfig.database);

    // Combine all configurations
    const fullConfig = {
      ...projectConfig,
      ...technicalConfig,
      ...databaseConfig,
      ...dependencyConfig
    };

    return fullConfig;
  } catch (error) {
    if (error.isTtyError) {
      console.error(chalk.red('\nPrompt couldn\'t be rendered in the current environment'));
    } else {
      console.error(chalk.red('\nAn error occurred:'), error);
    }
    process.exit(1);
  }
}

module.exports = {
  collectProjectConfiguration
};