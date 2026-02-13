/**
 * Get database configuration for application.properties
 */
function getDatabaseConfig(database, dbName) {
  const commonJpa = {
    ddlAuto: "update",
    showSql: true,
    formatSql: true,
  };

  const configs = {
    postgresql: {
      type: "sql",
      url: `jdbc:postgresql://localhost:5432/${dbName}`,
      username: "your_username",
      password: "your_password",
      driverClassName: "org.postgresql.Driver",
      dialect: "org.hibernate.dialect.PostgreSQLDialect",
      ...commonJpa,
    },

    mysql: {
      type: "sql",
      url: `jdbc:mysql://localhost:3306/${dbName}?useSSL=false&serverTimezone=UTC`,
      username: "your_username",
      password: "your_password",
      driverClassName: "com.mysql.cj.jdbc.Driver",
      dialect: "org.hibernate.dialect.MySQLDialect",
      ...commonJpa,
    },

    mariadb: {
      type: "sql",
      url: `jdbc:mariadb://localhost:3306/${dbName}`,
      username: "your_username",
      password: "your_password",
      driverClassName: "org.mariadb.jdbc.Driver",
      dialect: "org.hibernate.dialect.MariaDBDialect",
      ...commonJpa,
    },

    oracle: {
      type: "sql",
      url: `jdbc:oracle:thin:@localhost:1521:${dbName}`,
      username: "your_username",
      password: "your_password",
      driverClassName: "oracle.jdbc.OracleDriver",
      dialect: "org.hibernate.dialect.OracleDialect",
      ...commonJpa,
    },

    sqlserver: {
      type: "sql",
      url: `jdbc:sqlserver://localhost:1433;databaseName=${dbName}`,
      username: "your_username",
      password: "your_password",
      driverClassName: "com.microsoft.sqlserver.jdbc.SQLServerDriver",
      dialect: "org.hibernate.dialect.SQLServerDialect",
      ...commonJpa,
    },

    h2: {
      type: "sql",
      url: "jdbc:h2:mem:testdb",
      username: "sa",
      password: "",
      driverClassName: "org.h2.Driver",
      dialect: "org.hibernate.dialect.H2Dialect",
      ddlAuto: "create-drop",
      showSql: true,
      consoleEnabled: true,
      consolePath: "/h2-console",
    },

    mongodb: {
      type: "nosql",
      uri: `mongodb://localhost:27017/${dbName}`,
      database: dbName,
    },

    none: null,
  };

  return configs[database] || null;
}

/**
 * Get database setup instructions for README
 */
function getDatabaseSetupInstructions(database, dbName) {
  const instructions = {
    postgresql: `
### PostgreSQL Setup

1. Install PostgreSQL: https://www.postgresql.org/download/
2. Open pgAdmin or psql.
3. Create database:

\`\`\`sql
CREATE DATABASE ${dbName};
\`\`\`

4. Update application.properties with your credentials.
`,

    mysql: `
### MySQL Setup

1. Install MySQL: https://dev.mysql.com/downloads/
2. Login to MySQL.
3. Create database:

\`\`\`sql
CREATE DATABASE ${dbName};
\`\`\`

4. Update application.properties.
`,

    mariadb: `
### MariaDB Setup

1. Install MariaDB: https://mariadb.org/download/
2. Login to MariaDB.
3. Create database:

\`\`\`sql
CREATE DATABASE ${dbName};
\`\`\`

4. Update application.properties.
`,

    oracle: `
### Oracle Database Setup

1. Install Oracle Database.
2. Connect using SQL*Plus or SQL Developer.
3. Create a user/schema:

\`\`\`sql
CREATE USER ${dbName} IDENTIFIED BY your_password;
GRANT CONNECT, RESOURCE TO ${dbName};
\`\`\`

4. Use that username in application.properties.
`,

    sqlserver: `
### SQL Server Setup

1. Install SQL Server.
2. Open SSMS.
3. Create database:

\`\`\`sql
CREATE DATABASE ${dbName};
\`\`\`

4. Update application.properties.
`,

    mongodb: `
### MongoDB Setup

1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB server:

\`\`\`bash
mongod
\`\`\`

MongoDB automatically creates the database when first used.
No manual CREATE DATABASE needed.
`,

    h2: `
### H2 Setup

H2 is configured as in-memory database.

No installation required.

Access Console:
http://localhost:8080/h2-console
`,

    none: "",
  };

  return instructions[database] || "";
}

module.exports = {
  getDatabaseConfig,
  getDatabaseSetupInstructions,
};
