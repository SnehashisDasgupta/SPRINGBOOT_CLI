const axios = require('axios');
const chalk = require('chalk');

const SPRING_INITIALIZR_API = 'https://start.spring.io';

/**
 * Fetch Spring Boot metadata
 */
async function fetchSpringMetadata() {
  try {
    const response = await axios.get(
      `${SPRING_INITIALIZR_API}/metadata/client`,
      { headers: { Accept: 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.error(chalk.red('Failed to fetch Spring metadata'));
    console.error(chalk.yellow('Using fallback metadata'));
    return getFallbackMetadata();
  }
}

/**
 * Get SAFE Spring Boot versions
 */
async function getSpringBootVersions() {
  const metadata = await fetchSpringMetadata();

  const versions =
    metadata?.bootVersion?.values?.map(v =>
      v.id.replace('.RELEASE', '')
    ) || [];

  return versions.filter(isValidSpringBootVersion);
}

/**
 * Strict version validation
 */
function isValidSpringBootVersion(version) {
  const clean = version.replace('.RELEASE', '');

  return (
    (/^(2\.7\.\d+|3\.\d+\.\d+)$/).test(clean) &&
    !clean.includes('SNAPSHOT') &&
    !clean.includes('M') &&
    !clean.includes('RC')
  );
}

/**
 * Get available dependencies
 */
async function getDependencies() {
  const metadata = await fetchSpringMetadata();

  if (!metadata?.dependencies?.values) {
    return getFallbackDependencies();
  }

  const deps = [];
  metadata.dependencies.values.forEach(group => {
    group.values.forEach(dep => {
      deps.push({
        name: dep.name,
        value: dep.id,
        description: dep.description || '',
        group: group.name
      });
    });
  });

  return deps;
}

/**
 * Fallback versions (KNOWN GOOD)
 */
function getFallbackVersions() {
  return [
    '3.2.11',
    '3.1.18',
    '2.7.18'
  ];
}

/**
 * Fallback metadata
 */
function getFallbackMetadata() {
  return {
    bootVersion: {
      values: getFallbackVersions().map(v => ({ id: v }))
    },
    dependencies: {
      values: []
    }
  };
}

/**
 * Fallback dependencies
 */
function getFallbackDependencies() {
  return [
    { name: 'Spring Web', value: 'web', group: 'Web' },
    { name: 'Spring Data JPA', value: 'data-jpa', group: 'SQL' },
    { name: 'Spring Security', value: 'security', group: 'Security' },
    { name: 'Lombok', value: 'lombok', group: 'Developer Tools' }
  ];
}

module.exports = {
  fetchSpringMetadata,
  getSpringBootVersions,
  getDependencies
};
