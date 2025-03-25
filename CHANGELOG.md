# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
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

## [0.2.0] - 2024-03-19
### Breaking Changes
- Changed `id` type in `WhozwhoConfig` from `string` to `number`
- Updated default configuration to use numeric IDs

### Code Quality
- Improved code formatting with consistent trailing commas
- Cleaned up imports ordering
- Removed unnecessary comments

## [0.1.0] - 2024-03-19
Initial release 🎉

[Unreleased]: https://github.com/mlefree/whozwho-client/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/mlefree/whozwho-client/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/mlefree/whozwho-client/releases/tag/v0.1.0 