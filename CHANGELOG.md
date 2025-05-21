# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2025-05-05

### Added

- Added "Installation" section at the top of README.md
- Added "Release process" section in README.md

### Changed

- Changed API from POST to GET for actor endpoints
- Updated URL structure to use query parameters for filtering instead of request body
- Modified return value structure (now returning `actors` array instead of `answer` object)
- Added special handling for principal actor in `getPrincipalAddress` method
- Updated tests to match the new API response format
- Improved formatting in the configuration table in README.md
- Reformatted documentation for better readability

## [1.1.2] - 2025-04-27

### Added

- Documentation for AdviceType, AdviceStatus, Question, and Answer enums
- Documentation for Memory Bank system
- Default values to the Configuration table in README

### Changed

- Updated version to 1.1.2
- Improved error handling with null-safe access using optional chaining and nullish coalescing operators
- Changed return values from `null` to `{}` in `getPrincipalAddress` and `getAllAddresses` methods when client is
  disabled
- Added trailing commas to function calls for code consistency
- Updated tests to match the new return value structure

### Removed

- Badges for Node.js, Axios, and Jest from README

## [1.1.1] - 2025-04-22

### Changed

- Updated version to 1.1.1

## [1.0.0] - 2025-04-22

### Added

- Initial implementation of Whozwho client
- Core functionality for advice management
- Principal role verification
- TypeScript support
- Jest testing framework
- ESLint and Prettier configuration
- Basic documentation

### Changed

- Transformed Whozwho from static to instantiable class
- Separated code into modular structure
- Improved type definitions

### Technical

- TypeScript 5.3.3
- Node.js compatibility
- Axios 1.6.7 for HTTP requests
- Jest 29.7.0 for testing
- ESLint 8.57.0 for linting
- Prettier 3.2.5 for code formatting

## [0.2.2] - 2025-03-25

### Fixed

- Fixed package.json version synchronization

## [0.2.1] - 2025-03-25

### Documentation

- Updated README.md to reflect numeric ID requirement
- Fixed incorrect dates in changelog
- Enhanced release process documentation
- Added CI/CD workflow configuration

## [0.2.0] - 2025-03-25

### Breaking Changes

- Changed `id` type in `WhozwhoConfig` from `string` to `number`
- Updated default configuration to use numeric IDs

### Code Quality

- Improved code formatting with consistent trailing commas
- Cleaned up imports ordering
- Removed unnecessary comments

## [0.1.0] - 2025-03-25

Initial release 🎉

[Unreleased]: https://github.com/mlefree/whozwho-client/compare/v1.2.0...HEAD

[1.2.0]: https://github.com/mlefree/whozwho-client/compare/v1.1.2...v1.2.0

[1.1.2]: https://github.com/mlefree/whozwho-client/compare/v1.1.1...v1.1.2

[1.1.1]: https://github.com/mlefree/whozwho-client/compare/v1.0.0...v1.1.1

[1.0.0]: https://github.com/mlefree/whozwho-client/compare/v0.2.2...v1.0.0

[0.2.2]: https://github.com/mlefree/whozwho-client/compare/v0.2.1...v0.2.2

[0.2.1]: https://github.com/mlefree/whozwho-client/compare/v0.2.0...v0.2.1

[0.2.0]: https://github.com/mlefree/whozwho-client/compare/v0.1.0...v0.2.0

[0.1.0]: https://github.com/mlefree/whozwho-client/releases/tag/v0.1.0
