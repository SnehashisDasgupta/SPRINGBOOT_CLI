const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const { resolveMavenDependencies } = require('../utils/dependencyResolver');

/**
 * Generate pom.xml
 */
async function generateMavenPom(config, targetDir) {
  // Resolve dependencies selected by user
  const dependencies = resolveMavenDependencies(config.dependencies);

  // ✅ ENSURE at least one Spring Boot starter exists
  const hasSpringStarter = dependencies.some(d =>
    d.groupId === 'org.springframework.boot' &&
    d.artifactId.startsWith('spring-boot-starter') &&
    d.artifactId !== 'spring-boot-starter-test'
  );

  // If user selected NO starter, add base starter
  if (!hasSpringStarter) {
    dependencies.unshift({
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter'
    });
  }

  // Read template
  const templatePath = path.join(
    __dirname,
    '../../templates/maven/pom.xml.hbs'
  );
  const templateContent = await fs.readFile(templatePath, 'utf8');

  // Compile template
  const template = Handlebars.compile(templateContent);

  // Generate pom.xml content
  const pomContent = template({
    group: config.group,
    artifact: config.artifact,
    version: '0.0.1-SNAPSHOT',
    projectName: config.projectName,
    description: config.description,
    springBootVersion: config.springBootVersion,
    javaVersion: config.javaVersion,
    packaging: config.packaging,
    dependencies
  });

  // Write pom.xml
  const pomPath = path.join(targetDir, 'pom.xml');
  await fs.writeFile(pomPath, pomContent, 'utf8');
}

module.exports = {
  generateMavenPom
};
