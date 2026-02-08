const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');

/**
 * Generate .gitignore file
 */
async function generateGitignore(config, targetDir) {
  // Read template
  const templatePath = path.join(__dirname, '../../templates/config/gitignore.hbs');
  const templateContent = await fs.readFile(templatePath, 'utf8');
  
  // Compile template
  const template = Handlebars.compile(templateContent);
  
  // Generate content
  const gitignoreContent = template({
    buildTool: config.buildTool
  });

  // Write .gitignore
  const gitignorePath = path.join(targetDir, '.gitignore');
  await fs.writeFile(gitignorePath, gitignoreContent, 'utf8');
}

module.exports = {
  generateGitignore
};