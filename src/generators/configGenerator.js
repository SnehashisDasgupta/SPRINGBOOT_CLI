const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const { getDatabaseConfig } = require('../utils/databaseConfigurator');
const { getResourcesPath } = require('../utils/pathHelper');

/**
 * Generate application configuration file
 */
async function generateConfig(config, targetDir) {
  const isYaml = config.configurationType === 'yaml';
  const format = isYaml ? 'yml' : 'properties';
  const database = config.database === 'none' ? 'none' : config.database;

  // Read template
  const templatePath = path.join(
    __dirname,
    '../../templates/config',
    `application.${format}`,
    `${database}.hbs`
  );
  
  const templateContent = await fs.readFile(templatePath, 'utf8');
  
  // Compile template
  const template = Handlebars.compile(templateContent);
  
  // Get database config
  const dbConfig = getDatabaseConfig(database);
  
  // Generate config content
  const configContent = template({
    artifact: config.artifact,
    packageName: config.packageName,
    database: dbConfig,
    port: 8080
  });

  // Write configuration file
  const resourcesPath = getResourcesPath(targetDir);
  const configFileName = isYaml ? 'application.yml' : 'application.properties';
  const configPath = path.join(resourcesPath, configFileName);
  
  await fs.writeFile(configPath, configContent, 'utf8');
}

module.exports = {
  generateConfig
};