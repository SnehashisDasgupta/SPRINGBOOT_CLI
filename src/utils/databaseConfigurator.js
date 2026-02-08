/**
 * Get database configuration for application.properties
 */
function getDatabaseConfig(database) {
  const configs = {
    postgresql: {
      url: 'jdbc:postgresql://localhost:5432/YOUR_DATABASE_NAME',
      username: 'YOUR_USERNAME',
      password: 'YOUR_PASSWORD',
      driverClassName: 'org.postgresql.Driver',
      dialect: 'org.hibernate.dialect.PostgreSQLDialect',
      ddlAuto: 'update',
      showSql: true,
      formatSql: true
    },
    
    mysql: {
      url: 'jdbc:mysql://localhost:3306/YOUR_DATABASE_NAME?useSSL=false&serverTimezone=UTC',
      username: 'YOUR_USERNAME',
      password: 'YOUR_PASSWORD',
      driverClassName: 'com.mysql.cj.jdbc.Driver',
      dialect: 'org.hibernate.dialect.MySQLDialect',
      ddlAuto: 'update',
      showSql: true,
      formatSql: true
    },
    
    h2: {
      url: 'jdbc:h2:mem:testdb',
      username: 'sa',
      password: '',
      driverClassName: 'org.h2.Driver',
      dialect: 'org.hibernate.dialect.H2Dialect',
      ddlAuto: 'create-drop',
      showSql: true,
      consoleEnabled: true,
      consolePath: '/h2-console'
    },
    
    mongodb: {
      uri: 'mongodb://localhost:27017/YOUR_DATABASE_NAME',
      database: 'YOUR_DATABASE_NAME'
    },
    
    oracle: {
      url: 'jdbc:oracle:thin:@localhost:1521:YOUR_DATABASE_NAME',
      username: 'YOUR_USERNAME',
      password: 'YOUR_PASSWORD',
      driverClassName: 'oracle.jdbc.OracleDriver',
      dialect: 'org.hibernate.dialect.OracleDialect',
      ddlAuto: 'update',
      showSql: true,
      formatSql: true
    },
    
    sqlserver: {
      url: 'jdbc:sqlserver://localhost:1433;databaseName=YOUR_DATABASE_NAME',
      username: 'YOUR_USERNAME',
      password: 'YOUR_PASSWORD',
      driverClassName: 'com.microsoft.sqlserver.jdbc.SQLServerDriver',
      dialect: 'org.hibernate.dialect.SQLServerDialect',
      ddlAuto: 'update',
      showSql: true,
      formatSql: true
    },
    
    mariadb: {
      url: 'jdbc:mariadb://localhost:3306/YOUR_DATABASE_NAME',
      username: 'YOUR_USERNAME',
      password: 'YOUR_PASSWORD',
      driverClassName: 'org.mariadb.jdbc.Driver',
      dialect: 'org.hibernate.dialect.MariaDBDialect',
      ddlAuto: 'update',
      showSql: true,
      formatSql: true
    },
    
    none: null
  };

  return configs[database] || null;
}

/**
 * Get database setup instructions for README
 */
function getDatabaseSetupInstructions(database) {
  const instructions = {
    postgresql: `
### Database Setup

1. Install PostgreSQL (https://www.postgresql.org/download/)

2. Create a database:
   \`\`\`sql
   CREATE DATABASE your_database_name;
   \`\`\`

3. Update \`src/main/resources/application.properties\`:
   \`\`\`properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   \`\`\`
`,
    
    mysql: `
### Database Setup

1. Install MySQL (https://dev.mysql.com/downloads/)

2. Create a database:
   \`\`\`sql
   CREATE DATABASE your_database_name;
   \`\`\`

3. Update \`src/main/resources/application.properties\`:
   \`\`\`properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   \`\`\`
`,
    
    h2: `
### Database Setup

H2 is configured for in-memory use. No setup required!

**Access H2 Console:**
- URL: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:testdb
- Username: sa
- Password: (leave empty)
`,
    
    mongodb: `
### Database Setup

1. Install MongoDB (https://www.mongodb.com/try/download/community)

2. Start MongoDB:
   \`\`\`bash
   mongod
   \`\`\`

3. Update \`src/main/resources/application.properties\`:
   \`\`\`properties
   spring.data.mongodb.uri=mongodb://localhost:27017/your_database_name
   spring.data.mongodb.database=your_database_name
   \`\`\`
`,
    
    none: ''
  };

  return instructions[database] || '';
}

module.exports = {
  getDatabaseConfig,
  getDatabaseSetupInstructions
};