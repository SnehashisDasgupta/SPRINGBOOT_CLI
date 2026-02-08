const fs = require('fs-extra');
const path = require('path');
const { getSourcePath, getTestPath, getResourcesPath } = require('../utils/pathHelper');

/**
 * Create project directory structure
 */
async function generateStructure(config, targetDir) {
  // Create main directories
  await fs.ensureDir(targetDir);

  // Source directories
  const sourcePath = getSourcePath(targetDir, config.packageName);
  await fs.ensureDir(sourcePath);
  await fs.ensureDir(path.join(sourcePath, 'controller'));
  await fs.ensureDir(path.join(sourcePath, 'service'));
  await fs.ensureDir(path.join(sourcePath, 'repository'));
  await fs.ensureDir(path.join(sourcePath, 'model'));
  await fs.ensureDir(path.join(sourcePath, 'config'));

  // Test directories
  const testPath = getTestPath(targetDir, config.packageName);
  await fs.ensureDir(testPath);

  // Resources directories
  const resourcesPath = getResourcesPath(targetDir);
  await fs.ensureDir(resourcesPath);
  await fs.ensureDir(path.join(resourcesPath, 'static'));
  await fs.ensureDir(path.join(resourcesPath, 'templates'));

  // Maven/Gradle wrapper directory
  if (config.buildTool === 'maven') {
    await fs.ensureDir(path.join(targetDir, '.mvn', 'wrapper'));
  } else {
    await fs.ensureDir(path.join(targetDir, 'gradle', 'wrapper'));
  }
}

module.exports = {
  generateStructure
};