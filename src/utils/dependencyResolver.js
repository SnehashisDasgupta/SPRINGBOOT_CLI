/**
 * Resolve dependency ID to Maven coordinates
 */
function resolveMavenDependency(dependencyId) {
  const dependencyMap = {
    // Core Spring Boot (always included)
    core: {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter'
    },

    // Web
    web: {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-web'
    },
    webflux: {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-webflux'
    },
    websocket: {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-websocket'
    },

    // Data - SQL
    'data-jpa': {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-data-jpa'
    },
    'data-jdbc': {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-data-jdbc'
    },
    jdbc: {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-jdbc'
    },

    // Data - NoSQL
    'data-mongodb': {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-data-mongodb'
    },
    'data-redis': {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-data-redis'
    },

    // Database Drivers
    postgresql: {
      groupId: 'org.postgresql',
      artifactId: 'postgresql',
      scope: 'runtime'
    },
    mysql: {
      groupId: 'com.mysql',
      artifactId: 'mysql-connector-j',
      scope: 'runtime'
    },
    h2: {
      groupId: 'com.h2database',
      artifactId: 'h2',
      scope: 'runtime'
    },
    mariadb: {
      groupId: 'org.mariadb.jdbc',
      artifactId: 'mariadb-java-client',
      scope: 'runtime'
    },
    oracle: {
      groupId: 'com.oracle.database.jdbc',
      artifactId: 'ojdbc8',
      scope: 'runtime'
    },
    sqlserver: {
      groupId: 'com.microsoft.sqlserver',
      artifactId: 'mssql-jdbc',
      scope: 'runtime'
    },

    // Security
    security: {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-security'
    },
    'oauth2-client': {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-oauth2-client'
    },
    'oauth2-resource-server': {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-oauth2-resource-server'
    },

    // Developer Tools
    devtools: {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-devtools',
      scope: 'runtime',
      optional: true
    },
    lombok: {
      groupId: 'org.projectlombok',
      artifactId: 'lombok',
      optional: true
    },
    'configuration-processor': {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-configuration-processor',
      optional: true
    },

    // Validation
    validation: {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-validation'
    },

    // Ops
    actuator: {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-actuator'
    },

    // Caching
    cache: {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-cache'
    },

    // Messaging
    amqp: {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-amqp'
    },
    kafka: {
      groupId: 'org.springframework.kafka',
      artifactId: 'spring-kafka'
    },

    // Cloud
    'cloud-config-client': {
      groupId: 'org.springframework.cloud',
      artifactId: 'spring-cloud-starter-config'
    },
    'cloud-eureka': {
      groupId: 'org.springframework.cloud',
      artifactId: 'spring-cloud-starter-netflix-eureka-client'
    },

    // Test (default)
    test: {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-test',
      scope: 'test'
    }
  };

  return dependencyMap[dependencyId] || null;
}

/**
 * Resolve all Maven dependencies (deduplicated)
 */
function resolveMavenDependencies(dependencyIds = []) {
  const resolved = new Map();

  dependencyIds
    .filter(Boolean)
    .forEach(id => {
      const dep = resolveMavenDependency(id);
      if (dep) {
        resolved.set(dep.artifactId, dep);
      } else {
        console.warn(`⚠️  Unknown dependency ID: ${id}`);
      }
    });

  // Always include Spring Boot core starter
  const coreDep = resolveMavenDependency('core');
  resolved.set(coreDep.artifactId, coreDep);

  // Always include test dependency ONCE
  const testDep = resolveMavenDependency('test');
  resolved.set(testDep.artifactId, testDep);

  return Array.from(resolved.values());
}

/**
 * Resolve dependency ID to Gradle format
 */
function resolveGradleDependency(dependencyId) {
  const mavenDep = resolveMavenDependency(dependencyId);
  if (!mavenDep) return null;

  let configuration = 'implementation';

  if (mavenDep.scope === 'runtime') {
    configuration = 'runtimeOnly';
  } else if (mavenDep.scope === 'test') {
    configuration = 'testImplementation';
  } else if (mavenDep.optional) {
    configuration = 'compileOnly';
  }

  return {
    configuration,
    group: mavenDep.groupId,
    name: mavenDep.artifactId,
    notation: `${mavenDep.groupId}:${mavenDep.artifactId}`
  };
}

/**
 * Resolve all Gradle dependencies (deduplicated)
 */
function resolveGradleDependencies(dependencyIds = []) {
  const resolved = new Map();

  dependencyIds
    .filter(Boolean)
    .forEach(id => {
      const dep = resolveGradleDependency(id);
      if (dep) {
        resolved.set(dep.name, dep);
      } else {
        console.warn(`⚠️  Unknown dependency ID: ${id}`);
      }
    });

  // Always include core Spring Boot starter for Gradle
  const coreDep = resolveGradleDependency('core');
  resolved.set(coreDep.name, coreDep);

  // Always include test dependency for Gradle
  const testDep = resolveGradleDependency('test');
  resolved.set(testDep.name, testDep);

  return Array.from(resolved.values());
}

module.exports = {
  resolveMavenDependency,
  resolveMavenDependencies,
  resolveGradleDependency,
  resolveGradleDependencies
};
