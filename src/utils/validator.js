/**
 * Validate project name
 */
function validateProjectName(input) {
  if (!input || input.trim().length === 0) {
    return 'Project name is required';
  }
  
  if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
    return 'Project name can only contain letters, numbers, hyphens, and underscores';
  }
  
  return true;
}

/**
 * Validate group (package name format)
 */
function validateGroup(input) {
  if (!input || input.trim().length === 0) {
    return 'Group is required';
  }
  
  if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/.test(input)) {
    return 'Group must be a valid package name (e.g., com.example)';
  }
  
  return true;
}

/**
 * Validate artifact
 */
function validateArtifact(input) {
  if (!input || input.trim().length === 0) {
    return 'Artifact is required';
  }
  
  if (!/^[a-z][a-z0-9-]*$/.test(input)) {
    return 'Artifact must start with a letter and contain only lowercase letters, numbers, and hyphens';
  }
  
  return true;
}

/**
 * Validate package name
 */
function validatePackageName(input) {
  if (!input || input.trim().length === 0) {
    return 'Package name is required';
  }
  
  if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/.test(input)) {
    return 'Package name must be a valid Java package name';
  }
  
  return true;
}

module.exports = {
  validateProjectName,
  validateGroup,
  validateArtifact,
  validatePackageName
};