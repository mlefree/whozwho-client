# WhozWho Client System Patterns

## Architecture Overview
- TypeScript-based client library
- HTTP communication via axios
- Static class-based API design
- Configuration-driven behavior
- Promise-based async operations

## Design Patterns
- Singleton: Single Whozwho class with static methods
- Factory: Advice object creation
- Strategy: Configurable mock mode
- Observer: Health check reporting
- Command: Advice operations

## Component Relationships
1. Core Components:
   - Whozwho: Main client class
   - Advice: Data model
   - Config: Configuration interface

2. External Dependencies:
   - axios: HTTP client
   - TypeScript: Type system
   - Jest: Testing framework
   - ESLint/Prettier: Code quality

## Release Process
1. Key Rules:
   - No pushes until "release" command
   - CI handles npm publishing
   - No npm lifecycle scripts
   - Version follows SemVer

2. Release Flow:
   - Quality checks
   - Documentation update
   - Git tag creation
   - Wait for release command
   - CI/CD deployment

3. CI/CD Flow:
   - Triggered by tag push
   - Runs quality checks
   - Publishes to npm
   - Creates GitHub release

3. Branch Strategy:
   - Main: Production code
   - Develop: Next release
   - Feature branches
   - Hotfix branches

## Key Technical Decisions
1. Static Class API:
   - Easier to use
   - No instance management
   - Consistent configuration

2. Promise-based API:
   - Modern async patterns
   - Error handling
   - Chainable operations

3. TypeScript:
   - Type safety
   - Better IDE support
   - Self-documenting code

4. Testing:
   - Jest for testing
   - Mocked HTTP calls
   - High coverage goals

## System Constraints
- Node.js environment
- TypeScript support required
- HTTP/HTTPS connectivity
- Memory for logging
- Network latency handling

Note: These patterns reflect the current implementation and should be updated as the system evolves. 