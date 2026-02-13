/**
 * create.js
 * Main command handler for: spring-cli create <project-name>
 */

const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");
const Handlebars = require("handlebars");

const { collectProjectConfiguration } = require("../prompts");
const { resolveMavenDependencies } = require("../utils/dependencyResolver");
const { generateConfig } = require("../generators/configGenerator");
const { generateReadme } = require("../generators/readmeGenerator");
const { generateGitignore } = require("../generators/gitignoreGenerator");

/**
 * Display selected configuration summary in CLI
 */
function displayConfigSummary(config) {
  console.log(chalk.bold.green("\n✨ Configuration Summary:\n"));
  console.log(chalk.cyan("━".repeat(50)));

  console.log(chalk.bold("\n📦 Project Information:"));
  console.log(`   Name: ${chalk.green(config.projectName)}`);
  console.log(`   Group: ${chalk.green(config.group)}`);
  console.log(`   Artifact: ${chalk.green(config.artifact)}`);
  console.log(`   Description: ${chalk.dim(config.description)}`);
  console.log(`   Package: ${chalk.green(config.packageName)}`);

  console.log(chalk.bold("\n⚙️  Technical Stack:"));
  console.log(`   Java: ${chalk.green(config.javaVersion)}`);
  console.log(`   Spring Boot: ${chalk.green(config.springBootVersion)}`);
  console.log(`   Build Tool: ${chalk.green(config.buildTool)}`);
  console.log(`   Packaging: ${chalk.green(config.packaging)}`);
  console.log(`   Configuration: ${chalk.green(config.configurationType)}`);
  console.log(`   Database: ${chalk.green(config.database || "None")}`);

  if (config.dbName) {
    console.log(`   DB Name: ${chalk.green(config.dbName)}`);
  }

  console.log(chalk.bold("\n📚 Dependencies:"));
  if (config.dependencies?.length) {
    config.dependencies.forEach(dep => {
      console.log(`   ${chalk.green("•")} ${dep}`);
    });
  } else {
    console.log(`   ${chalk.dim("None selected")}`);
  }

  console.log(chalk.cyan("\n" + "━".repeat(50) + "\n"));
}

/**
 * Convert artifact name to proper Spring Boot Application class name
 * Example:
 *   my-app -> MyAppApplication
 */
function generateApplicationClassName(artifact) {
  return (
    artifact
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("") + "Application"
  );
}

/**
 * Generate pom.xml using Handlebars template
 */
function generatePomXml(config, projectDir) {
  // ---------- CHANGE: use __dirname instead of process.cwd() ----------
  const templatePath = path.join(
    __dirname,
    "../../templates/maven/pom.xml.hbs"
  );

  const outputPath = path.join(projectDir, "pom.xml");

  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = Handlebars.compile(templateSource);

  const dependencies = resolveMavenDependencies(config.dependencies);

  const pomContent = template({
    group: config.group,
    artifact: config.artifact,
    version: "0.0.1-SNAPSHOT",
    packaging: config.packaging,
    projectName: config.projectName,
    description: config.description,
    javaVersion: config.javaVersion,
    springBootVersion: config.springBootVersion,
    dependencies
  });

  fs.writeFileSync(outputPath, pomContent);
}

/**
 * Generate Main Application class & Test class
 */
async function generateJavaFiles(config, projectDir) {
  const packagePath = config.packageName.replace(/\./g, "/");

  const mainJavaDir = path.join(projectDir, "src/main/java", packagePath);
  const testJavaDir = path.join(projectDir, "src/test/java", packagePath);

  await fs.ensureDir(mainJavaDir);
  await fs.ensureDir(testJavaDir);

  const appClassName = generateApplicationClassName(config.artifact);

  // ---------- CHANGE: use __dirname ----------
  const appTemplatePath = path.join(
    __dirname,
    "../../templates/java/Application.java.hbs"
  );
  const appTemplate = Handlebars.compile(fs.readFileSync(appTemplatePath, "utf8"));

  fs.writeFileSync(
    path.join(mainJavaDir, `${appClassName}.java`),
    appTemplate({ packageName: config.packageName, className: appClassName })
  );

  // ---------- CHANGE: use __dirname ----------
  const testTemplatePath = path.join(
    __dirname,
    "../../templates/java/ApplicationTests.java.hbs"
  );
  const testTemplate = Handlebars.compile(fs.readFileSync(testTemplatePath, "utf8"));

  fs.writeFileSync(
    path.join(testJavaDir, `${appClassName}Tests.java`),
    testTemplate({ packageName: config.packageName, className: appClassName })
  );
}

/**
 * Copy Maven wrapper files (mvnw, .mvn folder)
 */
async function copyMavenWrapper(targetDir) {
  // ---------- CHANGE: use __dirname ----------
  const source = path.join(__dirname, "../../templates/maven");

  await fs.copy(source, targetDir, {
    filter: src => !src.endsWith("pom.xml.hbs")
  });
}

/**
 * Create base Spring Boot folder structure
 */
async function createBaseStructure(targetDir, packageName) {
  const basePackagePath = packageName.replace(/\./g, "/");

  await fs.ensureDir(path.join(targetDir, "src/main/java", basePackagePath));
  await fs.ensureDir(path.join(targetDir, "src/test/java", basePackagePath));
  await fs.ensureDir(path.join(targetDir, "src/main/resources"));
}

/**
 * Main command handler for `create`
 */
async function createCommand(projectName) {
  try {
    console.log(chalk.bold.green("\n🚀 Welcome to Spring Boot CLI!\n"));

    const config = await collectProjectConfiguration(projectName);

    displayConfigSummary(config);

    const projectDir = path.join(process.cwd(), config.projectName);

    if (await fs.pathExists(projectDir)) {
      console.log(chalk.red(`❌ Folder "${config.projectName}" already exists.`));
      process.exit(1);
    }

    await fs.ensureDir(projectDir);
    await createBaseStructure(projectDir, config.packageName);

    if (config.buildTool === "maven") {
      generatePomXml(config, projectDir);
      await copyMavenWrapper(projectDir);
      await generateJavaFiles(config, projectDir);
      console.log(chalk.green("✔ Maven & Java files generated"));
    }

    await generateConfig(config, projectDir);
    console.log(chalk.green("✔ Application configuration generated"));

    await generateReadme(config, projectDir);
    console.log(chalk.green("✔ README generated"));

    // ---------- CHANGE: added .gitignore ----------
    await generateGitignore(config, projectDir);
    console.log(chalk.green("✔ .gitignore generated"));

    console.log(chalk.green("\n🎉 Project initialized successfully!\n"));
  } catch (error) {
    console.error(chalk.red("\n❌ Error creating project:"), error.message);
    process.exit(1);
  }
}

module.exports = { createCommand };
