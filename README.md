# Spring Boot CLI

A command-line tool to generate Spring Boot projects interactively, similar to create-react-app but for Spring Boot.

![Spring Boot CLI](https://img.shields.io/badge/Spring%20Boot-CLI-green)
![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)


## ✨ Features

- 🎯 **Fully Interactive CLI Experience**  
  Guided prompts for project name, group, artifact, packaging, Java version, and more.

- 🚀 **Spring Initializr API Integration**  
  Dynamically fetches the latest Spring Boot versions and official dependencies.

- 🗄️ **Multi-Database Support (Auto Configuration Ready)**  
  Supports:
  - PostgreSQL
  - MySQL
  - MariaDB
  - Oracle
  - Microsoft SQL Server
  - H2
  - MongoDB  

  Automatically generates correct driver dependencies and datasource configuration.

- ⚙️ **Automatic Database Configuration Setup**  
  If a database is selected:
  - Driver dependency is auto-added
  - `application.properties` / `application.yml` is pre-configured
  - Correct Hibernate dialect is applied (for JPA-based DBs)
  - User only needs to create the DB and update username/password

- 📦 **Smart Dependency Management**
  - Two-step dependency selection flow
  - Search and filter from 150+ dependencies
  - Prevents duplicate selections
  - Intelligent grouping for better UX

- 🏗️ **Template-Based Project Generation**
  - Custom `pom.xml` templates
  - Auto-generated main application class
  - Auto-generated test class
  - Dynamic package name generation
  - Handlebars-powered template engine

- 🔤 **Dynamic Package Name Generator**
  Automatically constructs valid package names from:
  - Group ID
  - Artifact ID
  - Project Name

- 🧠 Intelligent Defaults**
  - Sensible default values
  - Validated user input
  - Prevents invalid configurations

- 🛠️ Flexible Build Tool Support**
  - Maven
  - (Gradle ready architecture)

- 📝 Configuration Format Options**
  - `application.properties`
  - `application.yml`

- 🎨 Beautiful Developer Experience**
  - Spring-style banner
  - Colored terminal output
  - Structured summary preview before project creation

- 📂 Custom Project Structure Generator**
  - Generates full Spring Boot directory structure
  - Includes Maven wrapper
  - Organized source/test folders
  - Clean resource configuration

- 🔐 Input Validation Layer**
  - Group validation
  - Artifact validation
  - Package format validation
  - Safe project name checks

- 🔍 Searchable Dependency Explorer**
  Type-to-search dependency selector for faster project setup.

- ⚡ Zero Manual Setup Philosophy**
  Reduces boilerplate so developers can focus on writing business logic.

- 🧩 Modular CLI Architecture**
  - Command-based structure
  - Separated prompts
  - Utilities layer
  - Template engine layer
  - Easy to extend and maintain


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
PS C:\Users\SNEHASHISH\Desktop\springboot-cli> springboot-cli create demo

      .   ____          _            __ _ _   
     /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \  
    ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \ 
     \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
      '  |____| .__|_| |_|_| |_\__, | / / / / 
     =========|_|==============|___/=/_/_/_/  

     :: SpringBoot CLI ::                     
    (v1.0.0)
  

🚀 Welcome to Spring Boot CLI!


📝 Project Configuration      

Project name: demo (from argument)

? Group: com.example
? Artifact: demo
? Description: Demo project for Spring Boot
? Package name: com.example.demo

⚙️  Technical Stack

✔ Spring Boot versions loaded   
? Java version: 17
? Spring Boot version: 3.5.10 
? Build tool: Maven
? Packaging: jar
? Configuration: Properties        

🗄️  Database

? Select database: PostgreSQL     
? Enter database name: myapp_db     

📦 Dependencies

✔ Dependencies loaded
✓ Auto-selected based on database: Spring Data JPA, PostgreSQL Driver

? Select common dependencies (Press <space> to select, <enter> to continue): Spring Web, Spring Data JPA
? Need more dependencies? Yes
? How would you like to find dependencies? Browse all by category
? Select additional dependencies (Press <space> to select, <enter> to continue): 

✓ Selected 3 total dependencies


✨ Configuration Summary:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Project Information:
   Name: demo


✨ Configuration Summary:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Project Information:
   Name: demo
✨ Configuration Summary:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Project Information:
   Name: demo

📦 Project Information:
   Name: demo
   Group: com.example
   Artifact: demo
📦 Project Information:
   Name: demo
   Group: com.example
   Artifact: demo
   Description: Demo project for Spring Boot
   Package: com.example.demo
   Group: com.example
   Artifact: demo
   Description: Demo project for Spring Boot
   Package: com.example.demo
   Description: Demo project for Spring Boot
   Package: com.example.demo

   Package: com.example.demo

⚙️  Technical Stack:

⚙️  Technical Stack:
⚙️  Technical Stack:
   Java: 17
   Spring Boot: 3.5.10
   Build Tool: maven
   Packaging: jar
   Configuration: properties
   Database: postgresql
   DB Name: myapp_db

📚 Dependencies:
   • data-jpa
   • postgresql
   • web

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✔ Maven & Java files generated
✔ Application configuration generated
✔ README generated
✔ .gitignore generated

🎉 Project initialized successfully!

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
│       ├── springInitializrApi.js  # Spring Initializr API client
│       ├── validator.js            # Input validation
│       └── packageNameGenerator.js # Package name utilities
├── templates/
│   ├── maven/
│   │   ├── pom.xml.hbs             # pom.xml Handlebars template
│   │   ├── mvnw                     # Maven wrapper script (Linux/Mac)
│   │   ├── mvnw.cmd                 # Maven wrapper script (Windows)
│   │   └── .mvn/                   # Maven wrapper folder
│   │       └── wrapper/
│   │           ├── maven-wrapper.jar
│   │           └── maven-wrapper.properties
│   └── java/
│       ├── Application.java.hbs    # Main Spring Boot application template
│       └── ApplicationTests.java.hbs # Test class template
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
- [x] Modular command architecture

---

### ✅ Step 2: Interactive Configuration Collection System

- [x] Project configuration prompts
- [x] Technical stack selection
- [x] Java version selection
- [x] Packaging selection (JAR/WAR)
- [x] Build tool selection (Maven support)
- [x] Configuration format selection (Properties/YAML)
- [x] Database selection system
- [x] Two-stage dependency selection
- [x] Dependency search functionality (150+ dependencies)
- [x] Spring Initializr API integration
- [x] Intelligent auto-selection logic
- [x] Input validation layer
- [x] Configuration summary preview

---

### ✅ Step 3: Project Generation & File Creation

- [x] Template-based file generation (Handlebars)
- [x] Dynamic `pom.xml` generation
- [x] Automatic dependency injection into build file
- [x] Full Spring Boot project directory structure creation
- [x] `src/main/java` and `src/test/java` structure generation
- [x] Dynamic package folder creation
- [x] Main `Application.java` class generation
- [x] `ApplicationTests.java` generation
- [x] `application.properties` / `application.yml` generation
- [x] Database-specific configuration injection
- [x] Hibernate dialect auto-configuration (for SQL databases)
- [x] Maven wrapper integration (`mvnw`, `.mvn/`)
- [x] `.gitignore` generation
- [x] Auto-generated project README
- [x] Safe directory creation & overwrite handling

---

### ✅ Step 4: Advanced Database Auto-Configuration

- [x] Multi-database support:
  - PostgreSQL
  - MySQL
  - MariaDB
  - Oracle
  - SQL Server
  - H2
  - MongoDB
- [x] Automatic driver dependency addition
- [x] Automatic Spring Data JPA addition (for relational DBs)
- [x] MongoDB-specific dependency handling
- [x] Auto datasource URL generation
- [x] Auto dialect selection
- [x] Zero-manual dependency setup philosophy
- [x] Reduced boilerplate setup time by 80%+

---

### 🚀 Architecture Highlights

- [x] Command-based CLI architecture
- [x] Separated prompts layer
- [x] Utility abstraction layer
- [x] Template engine abstraction
- [x] Clean and extendable folder structure


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

# 🗺️ Roadmap & Vision

---

## 🚀 Version Milestones

### 🟢 v1.0.0 — Core CLI (Completed)

> Production-ready Spring Boot project generator

- [x] Full CLI architecture
- [x] Interactive configuration system
- [x] Spring Initializr API integration
- [x] Smart dependency selection (150+ dependencies)
- [x] Multi-database support
- [x] Automatic DB driver & JPA configuration
- [x] Dynamic `pom.xml` generation
- [x] Spring Boot project structure creation
- [x] Application & Test class generation
- [x] Configuration file generation (properties/yaml)
- [x] Maven wrapper integration
- [x] .gitignore & README generation
- [x] Clean modular architecture

---

### 🟡 v1.1.0 — Developer Productivity Upgrade (In Progress)

> Making the CLI smarter and more powerful

- [ ] Gradle build file generation
- [ ] Git auto-initialization (`git init`)
- [ ] VS Code workspace configuration
- [ ] Enhanced project presets (REST API, CRUD starter, Microservice)
- [ ] Improved configuration customization options
- [ ] Smarter dependency conflict detection

---

### 🔵 v2.0.0 — Intelligent Project Generator (Planned)

> Beyond Spring Initializr — AI-powered scaffolding

- [ ] Ollama AI integration for sample code generation
- [ ] Controller/Service/Repository auto-generation
- [ ] Entity generation from prompts
- [ ] DTO & Mapper generation
- [ ] Pre-configured layered architecture templates
- [ ] Clean Architecture preset
- [ ] Domain-driven design preset

---

### 🟣 v2.5.0 — DevOps Ready Projects (Planned)

> From local development to deployment-ready

- [ ] Dockerfile auto-generation
- [ ] docker-compose support
- [ ] Kubernetes deployment manifests
- [ ] Helm chart template
- [ ] CI/CD pipeline templates (GitHub Actions)
- [ ] Production profile configuration
- [ ] Monitoring starter (Actuator + Prometheus config)

---

### 🔴 v3.0.0 — Enterprise Mode (Vision)

> Transforming into a full Spring ecosystem scaffolding tool

- [ ] Multi-module project support
- [ ] Microservices template pack
- [ ] API Gateway preset
- [ ] Event-driven architecture template
- [ ] Plugin system for extensions
- [ ] Custom organization presets
- [ ] CLI marketplace for templates

---

# 🎯 Long-Term Vision

Spring Boot CLI aims to become:

- ⚡ Faster than manual Spring Initializr setup
- 🧠 Smarter than basic scaffolding tools
- 🏗️ Capable of generating production-ready architectures
- 🤖 AI-assisted for boilerplate elimination
- 🚀 DevOps-ready out of the box

The goal is simple:

> **Reduce setup time to near zero so developers can focus purely on business logic.**

---

# 📊 Project Status

| Area | Status |
|------|--------|
| Core CLI | ✅ Stable |
| Project Generation | ✅ Implemented |
| Database Auto Config | ✅ Stable |
| Gradle Support | 🚧 In Progress |
| AI Integration | 📅 Planned |
| DevOps Templates | 📅 Planned |
| Enterprise Features | 🔮 Vision |

---

# 🐛 Known Limitations

- Gradle build generation is under development
- Advanced architecture presets coming in v2.x
- AI-assisted scaffolding not yet integrated


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
