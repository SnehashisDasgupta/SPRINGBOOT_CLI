const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");
const Handlebars = require("handlebars");

const { collectProjectConfiguration } = require("../prompts");
const { resolveMavenDependencies } = require("../utils/dependencyResolver");

/**
 * Display configuration summary
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
 * Generate pom.xml (FIXED)
 */
function generatePomXml(config, projectDir) {
  const templatePath = path.join(
    process.cwd(),
    "templates",
    "maven",
    "pom.xml.hbs"
  );

  const outputPath = path.join(projectDir, "pom.xml");
  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = Handlebars.compile(templateSource);

  // ✅ RESOLVE DEPENDENCIES CORRECTLY
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
 * Generate Java files
 */
function generateJavaFiles(config, projectDir) {
  const packagePath = config.packageName.replace(/\./g, "/");
  const mainJavaDir = path.join(projectDir, "src/main/java", packagePath);
  const testJavaDir = path.join(projectDir, "src/test/java", packagePath);

  const appClassName = `${config.artifact
    .replace(/-([a-z])/g, g => g[1].toUpperCase())
    .replace(/^\w/, c => c.toUpperCase())}Application`;

  const appTemplatePath = path.join(
    process.cwd(),
    "templates",
    "java",
    "Application.java.hbs"
  );

  const appTemplate = Handlebars.compile(
    fs.readFileSync(appTemplatePath, "utf8")
  );

  fs.writeFileSync(
    path.join(mainJavaDir, `${appClassName}.java`),
    appTemplate({
      packageName: config.packageName,
      className: appClassName,
    })
  );

  const testTemplatePath = path.join(
    process.cwd(),
    "templates",
    "java",
    "ApplicationTests.java.hbs"
  );

  const testTemplate = Handlebars.compile(
    fs.readFileSync(testTemplatePath, "utf8")
  );

  fs.writeFileSync(
    path.join(testJavaDir, `${appClassName}Tests.java`),
    testTemplate({
      packageName: config.packageName,
      className: appClassName,
    })
  );
}

/**
 * Copy Maven wrapper
 */
async function copyMavenWrapper(targetDir) {
  const source = path.join(__dirname, "../../templates/maven");
  await fs.copy(source, targetDir, {
    filter: src => !src.endsWith("pom.xml.hbs"),
  });
}

/**
 * Create base folder structure
 */
async function createBaseStructure(targetDir, packageName) {
  const basePackagePath = packageName.replace(/\./g, "/");

  await fs.ensureDir(path.join(targetDir, "src/main/java", basePackagePath));
  await fs.ensureDir(path.join(targetDir, "src/test/java", basePackagePath));
  await fs.ensureDir(path.join(targetDir, "src/main/resources"));
}

/**
 * Create command handler
 */
async function createCommand(projectName) {
  try {
    console.log(chalk.bold.green("\nWelcome to Spring Boot CLI! 🚀\n"));

    const config = await collectProjectConfiguration(projectName);
    displayConfigSummary(config);

    const projectDir = path.join(process.cwd(), config.projectName);

    if (fs.existsSync(projectDir)) {
      console.log(chalk.red(`❌ Folder "${config.projectName}" already exists.`));
      process.exit(1);
    }

    await fs.ensureDir(projectDir);
    await createBaseStructure(projectDir, config.packageName);

    if (config.buildTool === "maven") {
      generatePomXml(config, projectDir);
      await copyMavenWrapper(projectDir);
      generateJavaFiles(config, projectDir);
      console.log(chalk.green("✔ Java files generated"));
    }

    console.log(chalk.green("\n🎉 Project structure initialized successfully!\n"));
  } catch (error) {
    console.error(chalk.red("\n❌ Error creating project:"), error.message);
    process.exit(1);
  }
}

module.exports = { createCommand };
