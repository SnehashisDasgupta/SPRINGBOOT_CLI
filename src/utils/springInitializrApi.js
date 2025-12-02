const axios = require('axios');
const chalk = require('chalk');

const SPRING_INITIALIZR_API = 'https://start.spring.io';

/**
 * Fetch Spring Boot metadata from start.spring.io
 */
async function fetchSpringMetadata() {
  try {
    const response = await axios.get(`${SPRING_INITIALIZR_API}/metadata/client`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(chalk.red('Failed to fetch Spring metadata from start.spring.io'));
    console.error(chalk.yellow('Using fallback static data...'));
    return getFallbackMetadata();
  }
}

/**
 * Get Spring Boot versions from metadata
 */
async function getSpringBootVersions() {
  const metadata = await fetchSpringMetadata();
  
  if (metadata && metadata.bootVersion && metadata.bootVersion.values) {
    return metadata.bootVersion.values
      .map(v => v.id)
      .filter(v => !v.includes('SNAPSHOT') && !v.includes('M')); // Filter out snapshots and milestones
  }
  
  return getFallbackVersions();
}

/**
 * Get available dependencies from metadata
 */
async function getDependencies() {
  const metadata = await fetchSpringMetadata();
  
  if (metadata && metadata.dependencies && metadata.dependencies.values) {
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
  
  return getFallbackDependencies();
}

/**
 * Fallback Spring Boot versions if API fails
 */
function getFallbackVersions() {
  return [
    '3.4.1',
    '3.3.6',
    '3.2.11',
    '3.1.18',
    '2.7.18'
  ];
}

/**
 * Fallback metadata if API fails
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
 * Fallback dependencies if API fails
 */
function getFallbackDependencies() {
  return [
    { name: 'Spring Web', value: 'web', description: 'Build web applications with Spring MVC', group: 'Web' },
    { name: 'Spring Data JPA', value: 'data-jpa', description: 'Persist data in SQL stores with Java Persistence API', group: 'SQL' },
    { name: 'Spring Security', value: 'security', description: 'Secure your application', group: 'Security' },
    { name: 'Lombok', value: 'lombok', description: 'Java annotation library', group: 'Developer Tools' },
    { name: 'Validation', value: 'validation', description: 'Bean Validation with Hibernate validator', group: 'I/O' },
    { name: 'Spring Boot Actuator', value: 'actuator', description: 'Production ready features', group: 'Ops' },
    { name: 'Spring Boot DevTools', value: 'devtools', description: 'Fast application restarts', group: 'Developer Tools' },
    { name: 'PostgreSQL Driver', value: 'postgresql', description: 'PostgreSQL JDBC driver', group: 'SQL' },
    { name: 'MySQL Driver', value: 'mysql', description: 'MySQL JDBC driver', group: 'SQL' },
    { name: 'H2 Database', value: 'h2', description: 'In-memory database', group: 'SQL' },
    { name: 'MongoDB', value: 'data-mongodb', description: 'MongoDB NoSQL database', group: 'NoSQL' }
  ];
}

module.exports = {
  fetchSpringMetadata,
  getSpringBootVersions,
  getDependencies
};