/**
 * Convert project name to artifact format
 * Example: "My Awesome App" -> "my-awesome-app"
 */
function projectNameToArtifact(projectName) {
  return projectName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Generate package name from group and artifact
 * Example: "com.example" + "my-app" -> "com.example.myapp"
 */
function generatePackageName(group, artifact) {
  const cleanArtifact = artifact.replace(/-/g, '');
  return `${group}.${cleanArtifact}`;
}

module.exports = {
  projectNameToArtifact,
  generatePackageName
};12