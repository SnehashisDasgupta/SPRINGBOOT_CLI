const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const { resolveGradleDependencies } = require('../utils/dependencyResolver');

/**
 * Generate build.gradle
 */
async function generateGradleBuild(config, targetDir) {
  // Resolve dependencies
  const dependencies = resolveGradleDependencies(config.dependencies);

  // Determine template based on Gradle type
  const isKotlinDsl = config.buildTool === 'gradle-kotlin';
  const templateFile = isKotlinDsl ? 'build.gradle.kts.hbs' : 'build.gradle.hbs';
  
  // Read template
  const templatePath = path.join(__dirname, '../../templates/gradle', templateFile);
  const templateContent = await fs.readFile(templatePath, 'utf8');
  
  // Compile template
  const template = Handlebars.compile(templateContent);
  
  // Generate build.gradle content
  const buildContent = template({
    group: config.group,
    artifact: config.artifact,
    version: '0.0.1-SNAPSHOT',
    springBootVersion: config.springBootVersion,
    javaVersion: config.javaVersion,
    dependencies: dependencies
  });

  // Write build.gradle
  const buildFileName = isKotlinDsl ? 'build.gradle.kts' : 'build.gradle';
  const buildPath = path.join(targetDir, buildFileName);
  await fs.writeFile(buildPath, buildContent, 'utf8');

  // Generate settings.gradle
  await generateGradleSettings(config, targetDir, isKotlinDsl);
}

/**
 * Generate settings.gradle
 */
async function generateGradleSettings(config, targetDir, isKotlinDsl) {
  const templatePath = path.join(__dirname, '../../templates/gradle/settings.gradle.hbs');
  const templateContent = await fs.readFile(templatePath, 'utf8');
  
  const template = Handlebars.compile(templateContent);
  
  const settingsContent = template({
    artifact: config.artifact
  });

  const settingsFileName = isKotlinDsl ? 'settings.gradle.kts' : 'settings.gradle';
  const settingsPath = path.join(targetDir, settingsFileName);
  await fs.writeFile(settingsPath, settingsContent, 'utf8');
}

module.exports = {
  generateGradleBuild
};