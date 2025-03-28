# WhozWho Client Technical Context

## Technologies Used
- TypeScript 5.3.3
- Node.js
- Axios 1.6.7
- Jest 29.7.0
- ESLint 8.57.0
- Prettier 3.2.5

## Development Setup
1. Prerequisites:
   - Node.js
   - npm/yarn
   - Git

2. Installation:
   ```bash
   npm install
   ```

3. Development Commands:
   - `npm run build`: Compile TypeScript
   - `npm test`: Run tests
   - `npm run lint`: Check code style
   - `npm run format`: Format code

## Release Process
1. Quality Commands:
   ```bash
   npm run lint      # Code quality
   npm run format    # Code formatting
   npm run test      # Run tests
   npm run build     # Build package
   ```

2. Git Operations:
   ```bash
   git tag -a v<version> -m "Release v<version>"
   git push origin main --tags  # Only after "release" command
   ```

3. CI/CD Process:
   - Triggered by tag push
   - Handles npm publishing
   - Runs quality checks
   - Creates releases

Note: No npm lifecycle scripts - CI handles the release process

## Technical Dependencies
1. Runtime:
   - axios: HTTP client
   - Node.js environment

2. Development:
   - TypeScript compiler
   - Jest test runner
   - ESLint linter
   - Prettier formatter
   - ts-jest
   - @types packages

## Development Tools
- TypeScript compiler
- Jest testing framework
- ESLint code linter
- Prettier code formatter
- Git version control
- npm package manager

## Technical Constraints
1. Environment:
   - Node.js runtime
   - TypeScript support
   - Network connectivity

2. Dependencies:
   - Compatible axios version
   - Modern Node.js version
   - TypeScript 5.x

3. Build:
   - TypeScript compilation
   - Declaration file generation
   - Source map support

Note: Keep this document updated with any changes to technical requirements or tooling. 