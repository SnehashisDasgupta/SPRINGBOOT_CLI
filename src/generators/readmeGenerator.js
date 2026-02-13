const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const { getDatabaseSetupInstructions } = require('../utils/databaseConfigurator');

/**
 * Register Handlebars helpers
 */
Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});
Handlebars.registerHelper('ne', function (a, b) {
  return a !== b;
});

/**
 * Generate README.md
 */
async function generateReadme(config, targetDir) {
  // Read template
  const templatePath = path.join(
    __dirname,
    '../../templates/config/README.md.hbs'
  );
  const templateContent = await fs.readFile(templatePath, 'utf8');

  // Compile template
  const template = Handlebars.compile(templateContent);

  // Get database setup instructions (now includes dbName)
  const dbInstructions =
    config.database && config.database !== 'none'
      ? getDatabaseSetupInstructions(config.database, config.dbName)
      : '';

  // Generate content
  const readmeContent = template({
    projectName: config.projectName,
    description: config.description,
    javaVersion: config.javaVersion,
    springBootVersion: config.springBootVersion,
    buildTool: config.buildTool,
    database: config.database,
    databaseInstructions: dbInstructions,
    dependencies: config.dependencies,
    configurationType: config.configurationType,
    packageName: config.packageName,
    artifact: config.artifact
  });

  // Write README.md
  const readmePath = path.join(targetDir, 'README.md');
  await fs.writeFile(readmePath, readmeContent, 'utf8');
}

module.exports = {
  generateReadme
};
