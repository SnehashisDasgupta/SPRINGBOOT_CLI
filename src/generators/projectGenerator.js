const chalk = require('chalk');
const ora = require('ora');
const { generateStructure } = require('./structureGenerator');
const { generateMavenPom } = require('./mavenGenerator');
const { generateGradleBuild } = require('./gradleGenerator');
const { generateConfig } = require('./configGenerator');
const { generateJavaFiles } = require('./javaGenerator');
const { copyWrapperFiles } = require('./wrapperGenerator');
const { generateGitignore } = require('./gitignoreGenerator');
const { generateReadme } = require('./readmeGenerator');

/**
 * Generate complete Spring Boot project
 */
async function generateProject(config, targetDir) {
  try {
    console.log(chalk.bold.green('\n🚀 Generating project...\n'));

    // Step 1: Create directory structure
    let spinner = ora('Creating project directory').start();
    await generateStructure(config, targetDir);
    spinner.succeed('Created project directory');

    // Step 2: Generate directory structure
    spinner = ora('Generating directory structure').start();
    // Already done in generateStructure
    spinner.succeed('Generated directory structure');

    // Step 3: Generate build file
    if (config.buildTool === 'maven') {
      spinner = ora('Generating pom.xml').start();
      await generateMavenPom(config, targetDir);
      spinner.succeed('Generated pom.xml');
    } else {
      spinner = ora('Generating build.gradle').start();
      await generateGradleBuild(config, targetDir);
      spinner.succeed('Generated build.gradle');
    }

    // Step 4: Generate configuration file
    const configFile = config.configurationType === 'yaml' ? 'application.yml' : 'application.properties';
    spinner = ora(`Generating ${configFile}`).start();
    await generateConfig(config, targetDir);
    spinner.succeed(`Generated ${configFile}`);

    // Step 5: Generate Java files
    spinner = ora('Generating Java source files').start();
    await generateJavaFiles(config, targetDir);
    spinner.succeed('Generated Java source files');

    // Step 6: Copy wrapper files
    const wrapperName = config.buildTool === 'maven' ? 'Maven' : 'Gradle';
    spinner = ora(`Copying ${wrapperName} wrapper files`).start();
    await copyWrapperFiles(config, targetDir);
    spinner.succeed(`Copied ${wrapperName} wrapper files`);

    // Step 7: Generate .gitignore
    spinner = ora('Generating .gitignore').start();
    await generateGitignore(config, targetDir);
    spinner.succeed('Generated .gitignore');

    // Step 8: Generate README.md
    spinner = ora('Generating README.md').start();
    await generateReadme(config, targetDir);
    spinner.succeed('Generated README.md');

    console.log(chalk.bold.green('\n✨ Project created successfully!\n'));

  } catch (error) {
    console.error(chalk.red('\n❌ Error generating project:'), error);
    throw error;
  }
}

module.exports = {
  generateProject
};