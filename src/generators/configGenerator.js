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

  const database = config.database || 'none';
  const dbName = config.dbName || null;

  // Template path
  const templatePath = path.join(
    __dirname,
    '../../templates/config',
    `application.${format}`,
    `${database}.hbs`
  );

  const templateContent = await fs.readFile(templatePath, 'utf8');

  // Compile template
  const template = Handlebars.compile(templateContent);

  // Get database config (may return null for "none")
  const dbConfig = getDatabaseConfig(database, dbName);

  // Generate config content
  const configContent = template({
    artifact: config.artifact,
    packageName: config.packageName,
    port: 8080,
    database: dbConfig
  });

  // Write configuration file
  const resourcesPath = getResourcesPath(targetDir);
  const configFileName = isYaml
    ? 'application.yml'
    : 'application.properties';

  const configPath = path.join(resourcesPath, configFileName);

  await fs.writeFile(configPath, configContent, 'utf8');
}

module.exports = {
  generateConfig
};
