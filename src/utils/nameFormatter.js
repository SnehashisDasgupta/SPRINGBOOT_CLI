/**
 * Convert artifact name to class name
 * Example: 'my-awesome-app' -> 'MyAwesomeApp'
 */
function artifactToClassName(artifact) {
  return artifact
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Convert artifact to package-safe name
 * Example: 'my-app' -> 'myapp'
 */
function artifactToPackageName(artifact) {
  return artifact.replace(/-/g, '').toLowerCase();
}

/**
 * Capitalize first letter
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  artifactToClassName,
  artifactToPackageName,
  capitalize
};