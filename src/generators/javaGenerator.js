const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const { getSourcePath, getTestPath } = require('../utils/pathHelper');
const { artifactToClassName } = require('../utils/nameFormatter');

/**
 * Generate main Application class
 */
async function generateApplicationClass(config, targetDir) {
  // Read template
  const templatePath = path.join(__dirname, '../../templates/java/Application.java.hbs');
  const templateContent = await fs.readFile(templatePath, 'utf8');
  
  // Compile template
  const template = Handlebars.compile(templateContent);
  
  // Generate class name
  const className = artifactToClassName(config.artifact);
  
  // Generate content
  const javaContent = template({
    packageName: config.packageName,
    className: className
  });

  // Write Application class
  const sourcePath = getSourcePath(targetDir, config.packageName);
  const javaPath = path.join(sourcePath, `${className}Application.java`);
  
  await fs.writeFile(javaPath, javaContent, 'utf8');
}

/**
 * Generate test class
 */
async function generateTestClass(config, targetDir) {
  // Read template
  const templatePath = path.join(__dirname, '../../templates/java/ApplicationTests.java.hbs');
  const templateContent = await fs.readFile(templatePath, 'utf8');
  
  // Compile template
  const template = Handlebars.compile(templateContent);
  
  // Generate class name
  const className = artifactToClassName(config.artifact);
  
  // Generate content
  const javaContent = template({
    packageName: config.packageName,
    className: className
  });

  // Write Test class
  const testPath = getTestPath(targetDir, config.packageName);
  const javaPath = path.join(testPath, `${className}ApplicationTests.java`);
  
  await fs.writeFile(javaPath, javaContent, 'utf8');
}

/**
 * Generate all Java files
 */
async function generateJavaFiles(config, targetDir) {
  await generateApplicationClass(config, targetDir);
  await generateTestClass(config, targetDir);
}

module.exports = {
  generateJavaFiles
};