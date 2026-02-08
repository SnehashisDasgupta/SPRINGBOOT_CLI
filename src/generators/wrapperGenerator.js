const fs = require('fs-extra');
const path = require('path');

/**
 * Copy Maven wrapper files
 */
async function copyMavenWrapper(targetDir) {
  const wrapperSourceDir = path.join(__dirname, '../../templates/maven');
  
  // Copy mvnw
  const mvnwSource = path.join(wrapperSourceDir, 'mvnw');
  const mvnwTarget = path.join(targetDir, 'mvnw');
  await fs.copy(mvnwSource, mvnwTarget);
  
  // Make mvnw executable on Unix
  if (process.platform !== 'win32') {
    await fs.chmod(mvnwTarget, 0o755);
  }
  
  // Copy mvnw.cmd
  const mvnwCmdSource = path.join(wrapperSourceDir, 'mvnw.cmd');
  const mvnwCmdTarget = path.join(targetDir, 'mvnw.cmd');
  await fs.copy(mvnwCmdSource, mvnwCmdTarget);
  
  // Copy .mvn directory
  const mvnDirSource = path.join(wrapperSourceDir, '.mvn');
  const mvnDirTarget = path.join(targetDir, '.mvn');
  await fs.copy(mvnDirSource, mvnDirTarget);
}

/**
 * Copy Gradle wrapper files
 */
async function copyGradleWrapper(targetDir) {
  const wrapperSourceDir = path.join(__dirname, '../../templates/gradle');
  
  // Copy gradlew
  const gradlewSource = path.join(wrapperSourceDir, 'gradlew');
  const gradlewTarget = path.join(targetDir, 'gradlew');
  await fs.copy(gradlewSource, gradlewTarget);
  
  // Make gradlew executable on Unix
  if (process.platform !== 'win32') {
    await fs.chmod(gradlewTarget, 0o755);
  }
  
  // Copy gradlew.bat
  const gradlewBatSource = path.join(wrapperSourceDir, 'gradlew.bat');
  const gradlewBatTarget = path.join(targetDir, 'gradlew.bat');
  await fs.copy(gradlewBatSource, gradlewBatTarget);
  
  // Copy gradle directory
  const gradleDirSource = path.join(wrapperSourceDir, 'gradle');
  const gradleDirTarget = path.join(targetDir, 'gradle');
  await fs.copy(gradleDirSource, gradleDirTarget);
}

/**
 * Copy wrapper files based on build tool
 */
async function copyWrapperFiles(config, targetDir) {
  if (config.buildTool === 'maven') {
    await copyMavenWrapper(targetDir);
  } else {
    await copyGradleWrapper(targetDir);
  }
}

module.exports = {
  copyWrapperFiles
};