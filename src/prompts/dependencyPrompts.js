const inquirer = require('inquirer');
const autocomplete = require('inquirer-autocomplete-prompt');
const chalk = require('chalk');
const ora = require('ora');
const { getDependencies } = require('../utils/springInitializrApi');

// Register autocomplete prompt
inquirer.registerPrompt('autocomplete', autocomplete);

/**
 * Popular/Common dependencies
 */
const POPULAR_DEPENDENCIES = [
  'web',
  'data-jpa',
  'security',
  'lombok',
  'validation',
  'actuator',
  'devtools'
];

/**
 * Search dependencies by keyword
 */
function searchDependencies(dependencies, searchTerm) {
  if (!searchTerm || searchTerm.trim() === '') {
    return dependencies;
  }

  const term = searchTerm.toLowerCase();
  return dependencies.filter(dep => 
    dep.name.toLowerCase().includes(term) ||
    dep.value.toLowerCase().includes(term) ||
    dep.description.toLowerCase().includes(term)
  );
}

/**
 * Interactive search for dependencies
 */
async function searchAndSelectDependencies(allDependencies, alreadySelected) {
  const additionalDeps = [];
  let continueSearching = true;

  while (continueSearching) {
    const searchAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'searchTerm',
        message: 'Type to search dependencies (or press Enter to finish):',
      }
    ]);

    if (!searchAnswer.searchTerm || searchAnswer.searchTerm.trim() === '') {
      continueSearching = false;
      break;
    }

    const results = searchDependencies(
      allDependencies.filter(d => 
        !alreadySelected.includes(d.value) && 
        !additionalDeps.includes(d.value)
      ),
      searchAnswer.searchTerm
    );

    if (results.length === 0) {
      console.log(chalk.yellow('  No dependencies found matching your search.\n'));
      continue;
    }

    console.log(chalk.dim(`\n  Found ${results.length} matching dependencies:\n`));

    const selectAnswer = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selected',
        message: 'Select dependencies (Press <space> to select, <enter> to continue):',
        choices: results.map(dep => ({
          name: dep.name,
          value: dep.value
        })),
        pageSize: 10
      }
    ]);

    additionalDeps.push(...selectAnswer.selected);

    if (selectAnswer.selected.length > 0) {
      console.log(chalk.green(`  ✓ Added ${selectAnswer.selected.length} dependencies\n`));
    }
  }

  return additionalDeps;
}

/**
 * Browse all dependencies by category
 */
async function browseByCategory(allDependencies, alreadySelected) {
  const otherDeps = allDependencies.filter(
    dep => !POPULAR_DEPENDENCIES.includes(dep.value) && !alreadySelected.includes(dep.value)
  );

  // Group by category
  const grouped = {};
  otherDeps.forEach(dep => {
    if (!grouped[dep.group]) {
      grouped[dep.group] = [];
    }
    grouped[dep.group].push(dep);
  });

  // Create choices with separators
  const choices = [];
  Object.keys(grouped).sort().forEach(group => {
    choices.push(new inquirer.Separator(chalk.bold(`── ${group} ──`)));
    grouped[group].forEach(dep => {
      choices.push({
        name: dep.name,
        value: dep.value
      });
    });
  });

  const answer = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'additionalDeps',
      message: 'Select additional dependencies (Press <space> to select, <enter> to continue):',
      choices: choices,
      pageSize: 15
    }
  ]);

  return answer.additionalDeps;
}

/**
 * Prompt for dependencies with two-stage selection
 */
async function promptDependencies(database) {
  console.log(chalk.bold.cyan('\n📦 Dependencies\n'));

  // Fetch all dependencies
  const spinner = ora('Fetching available dependencies...').start();
  const allDependencies = await getDependencies();
  spinner.succeed('Dependencies loaded');

  // Auto-select dependencies based on database choice
  const autoSelected = [];
  
  // If database is selected (not 'none'), auto-add data-jpa and database driver
  if (database !== 'none') {
    const jpa = allDependencies.find(d => d.value === 'data-jpa');
    if (jpa) autoSelected.push(jpa.value);

    // Add database driver
    const dbDriverMap = {
      'postgresql': 'postgresql',
      'mysql': 'mysql',
      'h2': 'h2',
      'mongodb': 'data-mongodb',
      'oracle': 'oracle',
      'sqlserver': 'sqlserver',
      'mariadb': 'mariadb'
    };

    const driverValue = dbDriverMap[database];
    if (driverValue) {
      const driver = allDependencies.find(d => d.value === driverValue);
      if (driver) autoSelected.push(driver.value);
    }
  }

  if (autoSelected.length > 0) {
    console.log(chalk.yellow(`✓ Auto-selected based on database: ${autoSelected.map(d => {
      const dep = allDependencies.find(x => x.value === d);
      return dep ? dep.name : d;
    }).join(', ')}\n`));
  }

  // ============================================
  // STAGE 1: Popular/Common Dependencies
  // ============================================
  
  const popularList = allDependencies.filter(dep => POPULAR_DEPENDENCIES.includes(dep.value));

  const stage1Answer = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'popularDeps',
      message: 'Select common dependencies (Press <space> to select, <enter> to continue):',
      choices: popularList.map(dep => ({
        name: dep.name,
        value: dep.value,
        checked: autoSelected.includes(dep.value)
      })),
      pageSize: 10
    }
  ]);

  const selectedDeps = [...new Set([...autoSelected, ...stage1Answer.popularDeps])];

  // ============================================
  // STAGE 2: Need More Dependencies?
  // ============================================

  const needMoreAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'needMore',
      message: 'Need more dependencies?',
      default: false
    }
  ]);

  if (needMoreAnswer.needMore) {
    // Ask how they want to find dependencies
    const methodAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'method',
        message: 'How would you like to find dependencies?',
        choices: [
          { name: 'Search by name (type to filter)', value: 'search' },
          { name: 'Browse all by category', value: 'browse' },
          { name: 'Skip', value: 'skip' }
        ],
        default: 'search'
      }
    ]);

    let additionalDeps = [];

    if (methodAnswer.method === 'search') {
      additionalDeps = await searchAndSelectDependencies(allDependencies, selectedDeps);
    } else if (methodAnswer.method === 'browse') {
      additionalDeps = await browseByCategory(allDependencies, selectedDeps);
    }

    selectedDeps.push(...additionalDeps);
  }

  // Remove duplicates
  const finalDependencies = [...new Set(selectedDeps)];

  // Show summary
  if (finalDependencies.length > 0) {
    console.log(chalk.green(`\n✓ Selected ${finalDependencies.length} total dependencies\n`));
  } else {
    console.log(chalk.dim('\n  No dependencies selected\n'));
  }

  return { dependencies: finalDependencies };
}

module.exports = {
  promptDependencies
};