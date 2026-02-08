const path = require('path');

/**
 * Convert package name to file path
 * Example: 'com.example.myapp' -> 'com/example/myapp'
 */
function packageToPath(packageName) {
  return packageName.replace(/\./g, path.sep);
}

/**
 * Get source directory path
 */
function getSourcePath(baseDir, packageName) {
  return path.join(baseDir, 'src', 'main', 'java', packageToPath(packageName));
}

/**
 * Get test directory path
 */
function getTestPath(baseDir, packageName) {
  return path.join(baseDir, 'src', 'test', 'java', packageToPath(packageName));
}

/**
 * Get resources directory path
 */
function getResourcesPath(baseDir) {
  return path.join(baseDir, 'src', 'main', 'resources');
}

module.exports = {
  packageToPath,
  getSourcePath,
  getTestPath,
  getResourcesPath
};