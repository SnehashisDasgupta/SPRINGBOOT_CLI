# Spring Boot CLI

A command-line tool to generate Spring Boot projects interactively, similar to create-react-app but for Spring Boot.

![Spring Boot CLI](https://img.shields.io/badge/Spring%20Boot-CLI-green)
![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- 🎯 **Interactive Project Configuration** - Easy-to-use prompts with sensible defaults
- 🚀 **Spring Initializr Integration** - Fetches latest Spring Boot versions and dependencies
- 🗄️ **Multiple Database Support** - PostgreSQL, MySQL, H2, MongoDB, Oracle, SQL Server, MariaDB
- 📦 **Smart Dependency Selection** - Two-stage selection with search capability
- ⚙️ **Flexible Build Tools** - Maven or Gradle support
- 📝 **Configuration Formats** - Choose between Properties or YAML
- 🎨 **Beautiful CLI** - Colored output with Spring Boot-style banner
- 🔍 **Dependency Search** - Type to filter from 150+ dependencies
- 🤖 **Auto-Configuration** - Smart auto-selection based on choices

## 📦 Installation

### Global Installation
```bash
npm install -g springboot-cli
```

### Local Development
```bash
git clone <repository-url>
cd springboot-cli
npm install
npm link
```

## 🚀 Usage

### Create a new project
```bash
springboot-cli create
```

### Create with project name
```bash
springboot-cli create my-awesome-app
```

### View version
```bash
springboot-cli --version
```

### View help
```bash
springboot-cli --help
```

## 🎮 Interactive Configuration

When you run `springboot-cli create`, you'll be guided through an interactive configuration process:

### 1️⃣ Project Configuration

| Field | Description | Default |
|-------|-------------|---------|
| **Project name** | Name of your project | Required (no default) |
| **Group** | Maven/Gradle group ID | `com.example` |
| **Artifact** | Maven/Gradle artifact ID | Auto-generated from project name |
| **Description** | Project description | "Demo project for Spring Boot" |
| **Package name** | Base package | Auto-generated from group + artifact |

### 2️⃣ Technical Stack

| Option | Choices | Default |
|--------|---------|---------|
| **Java version** | 8, 11, 17, 21 | 17 |
| **Spring Boot version** | Fetched from Spring Initializr | Latest stable |
| **Build tool** | Maven, Gradle (Groovy), Gradle (Kotlin) | Maven |
| **Packaging** | JAR, WAR | JAR |
| **Configuration** | Properties, YAML | Properties |

### 3️⃣ Database Selection

Choose from:

- ✅ None (default)
- 🐘 PostgreSQL
- 🐬 MySQL
- 🗄️ H2 (Embedded)
- 🍃 MongoDB
- 🔶 Oracle
- 🔷 SQL Server
- 🦭 MariaDB

> **💡 Auto-configuration:** When you select a database, Spring Data JPA and the database driver are automatically added to dependencies.

### 4️⃣ Dependencies

#### Stage 1: Common Dependencies

Select from popular dependencies:

- ☑️ Spring Web
- ☑️ Spring Data JPA
- ☑️ Spring Security
- ☑️ Lombok
- ☑️ Validation
- ☑️ Spring Boot Actuator
- ☑️ Spring Boot DevTools

#### Stage 2: Additional Dependencies (Optional)

Three ways to find more dependencies:

1. **🔍 Search by name** - Type keywords to filter dependencies
   - Example: Type "cache" → Find Spring Cache, Caffeine, EhCache, etc.
   - Example: Type "redis" → Find Redis-related dependencies
   
2. **📚 Browse by category** - Explore all 150+ dependencies organized by:
   - Web
   - SQL Databases
   - NoSQL Databases
   - Security
   - Developer Tools
   - Cloud
   - Messaging
   - And more...

3. **⏭️ Skip** - Continue without additional dependencies

### 5️⃣ Configuration Summary

Review all your selections before project generation:
```
✨ Configuration Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 Project Information:
   Name: my-app
   Group: com.example
   Artifact: my-app
   Description: My awesome application
   Package: com.example.myapp

⚙️  Technical Stack:
   Java: 17
   Spring Boot: 3.4.1
   Build Tool: maven
   Packaging: jar
   Config: properties

🗄️  Database: postgresql

📚 Dependencies:
   • web
   • data-jpa
   • postgresql
   • lombok
   • devtools
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 📋 Example Session
```bash
$ springboot-cli create my-app

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

 :: SpringBoot CLI ::               (v1.0.0)

Welcome to Spring Boot CLI! 🚀

📝 Project Configuration

Project name: my-app (from argument)

? Group: (com.example) 
? Artifact: (my-app) 
? Description: (Demo project for Spring Boot) My awesome application
? Package name: (com.example.myapp) 

⚙️  Technical Stack

✓ Spring Boot versions loaded
? Java version: 17
? Spring Boot version: 3.4.1
? Build tool: Maven
? Packaging: jar
? Configuration: Properties

🗄️  Database

? Select database: PostgreSQL

✓ Auto-selected based on database: Spring Data JPA, PostgreSQL Driver

📦 Dependencies

? Select common dependencies:
  ◉ Spring Web
  ◉ Spring Data JPA
  ◯ Spring Security
  ◉ Lombok
  ◯ Validation
  ◯ Spring Boot Actuator
  ◉ Spring Boot DevTools

? Need more dependencies? Yes

? How would you like to find dependencies? Search by name

? Type to search dependencies: cache

  Found 4 matching dependencies:

? Select dependencies:
  ◉ Spring Cache Abstraction
  ◯ Caffeine Cache

  ✓ Added 1 dependencies

? Type to search dependencies: [Enter]

✓ Selected 6 total dependencies

✨ Configuration Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 Project Information:
   Name: my-app
   Group: com.example
   Artifact: my-app
   Description: My awesome application
   Package: com.example.myapp

⚙️  Technical Stack:
   Java: 17
   Spring Boot: 3.4.1
   Build Tool: maven
   Packaging: jar
   Config: properties

🗄️  Database: postgresql

📚 Dependencies:
   • web
   • data-jpa
   • postgresql
   • lombok
   • devtools
   • cache

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  Project generation not yet implemented.
This will be added in Step 3.

Configuration collected successfully! ✓
```

## 📁 Project Structure
```
springboot-cli/
├── bin/
│   └── cli.js                      # CLI executable
├── src/
│   ├── index.js                    # Main CLI entry point
│   ├── commands/
│   │   └── create.js               # Create command handler
│   ├── prompts/
│   │   ├── index.js                # Prompt orchestrator
│   │   ├── projectPrompts.js      # Project configuration prompts
│   │   ├── configPrompts.js       # Technical stack prompts
│   │   ├── databasePrompts.js     # Database selection prompt
│   │   └── dependencyPrompts.js   # Dependency selection prompts
│   └── utils/
│       ├── springInitializrApi.js # Spring Initializr API client
│       ├── validator.js           # Input validation
│       └── packageNameGenerator.js # Package name utilities
├── package.json
├── .gitignore
└── README.md
```

## 🏗️ Development Progress

### ✅ Step 1: Project Initialization & CLI Setup

- [x] Basic CLI structure
- [x] Commander.js integration
- [x] Version and help commands
- [x] Spring Boot-style banner
- [x] Global npm package configuration

### ✅ Step 2: Interactive Configuration Collection System

- [x] Project configuration prompts
- [x] Technical stack selection
- [x] Database selection with auto-configuration
- [x] Two-stage dependency selection
- [x] Dependency search functionality
- [x] Spring Initializr API integration
- [x] Input validation
- [x] Configuration summary display
- [x] Smart auto-selection logic

### 🚧 Step 3: Project Generation & File Creation (Coming Soon)

- [ ] Template-based file generation
- [ ] Build file creation (pom.xml/build.gradle)
- [ ] Configuration file generation (application.properties/yml)
- [ ] Java source file generation
- [ ] Complete project structure
- [ ] Maven/Gradle wrapper files
- [ ] .gitignore generation
- [ ] README.md generation
- [ ] Optional AI-enhanced code generation with Ollama

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Commander.js** | CLI framework |
| **Inquirer.js** | Interactive prompts |
| **Chalk** | Terminal styling and colors |
| **Ora** | Elegant loading spinners |
| **Axios** | HTTP client for API calls |
| **fs-extra** | Enhanced file system operations |
| **Handlebars** | Template engine (Step 3) |

## 📋 Requirements

- Node.js >= 14.0.0
- npm >= 6.0.0

## 🔌 API Integration

This CLI integrates with **Spring Initializr API** (https://start.spring.io) to:

- ✅ Fetch available Spring Boot versions
- ✅ Retrieve complete dependency catalog (150+ dependencies)
- ✅ Ensure compatibility with official Spring Boot ecosystem
- ✅ Stay up-to-date with latest Spring releases

**Fallback Strategy:** If the API is unavailable, the CLI uses static fallback data to ensure offline functionality.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Snehashis Dasgupta**

## 🗺️ Roadmap

### Completed ✅

- [x] Basic CLI structure
- [x] Interactive prompts system
- [x] Spring Initializr integration
- [x] Dependency search and selection
- [x] Input validation
- [x] Configuration summary

### In Progress 🚧

- [ ] Project file generation
- [ ] Template system implementation

### Planned 📅

- [ ] Ollama AI integration for sample code generation
- [ ] Git initialization option
- [ ] VS Code integration
- [ ] Project templates/presets
- [ ] Multi-module project support
- [ ] Docker configuration generation
- [ ] Kubernetes deployment files
- [ ] CI/CD pipeline templates
- [ ] Testing framework setup

## 🐛 Known Issues

- Project generation not yet implemented (Step 3 in progress)

## 💬 Support

For issues, questions, or suggestions:

- 📧 Open an issue on GitHub
- 💬 Start a discussion
- 🐛 Report bugs

## 🙏 Acknowledgments

- Inspired by [Spring Initializr](https://start.spring.io)
- Built with ❤️ for the Spring Boot community
- Thanks to all contributors

## 📊 Status

![Development Status](https://img.shields.io/badge/status-in%20development-yellow)
![Step 1](https://img.shields.io/badge/Step%201-completed-green)
![Step 2](https://img.shields.io/badge/Step%202-completed-green)
![Step 3](https://img.shields.io/badge/Step%203-in%20progress-yellow)

---

**Made with ❤️ for developers who love Spring Boot**
