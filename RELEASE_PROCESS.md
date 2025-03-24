# WhozWho Client Release Process

## Version Scheme
- Follow Semantic Versioning (SemVer):
  - MAJOR.MINOR.PATCH
  - MAJOR: Breaking changes
  - MINOR: New features, no breaking changes
  - PATCH: Bug fixes, no breaking changes

## Pre-release Checklist
1. Code Quality
   ```bash
   npm run lint
   npm run format
   ```

2. Tests
   ```bash
   npm run test
   ```

3. Build
   ```bash
   npm run build
   ```

4. Documentation
   - Update CHANGELOG.md
   - Update version numbers
   - Check README.md is current
   - Verify API documentation

## Release Steps
1. Update Version
   ```bash
   npm version <major|minor|patch>
   ```

2. Build Package
   ```bash
   npm run build
   ```

3. Create Release Commit
   ```bash
   git add .
   git commit -m "chore(release): v<version>"
   ```

4. Tag Release
   ```bash
   git tag -a v<version> -m "Release v<version>"
   ```

5. Push to Repository
   ```bash
   git push origin main --tags
   ```

6. Publish to npm
   ```bash
   npm publish
   ```

## Post-release
1. Verify Package
   - Check npm package page
   - Verify installation in new project
   - Test basic functionality

2. Update Documentation
   - Mark version as released in CHANGELOG.md
   - Update documentation site if applicable
   - Update any version-specific docs

3. Notify
   - Create GitHub release notes
   - Update release status in project management tools
   - Notify team/users if needed

## Hotfix Process
1. Create hotfix branch
   ```bash
   git checkout -b hotfix/v<version>.x
   ```

2. Make fixes and test
3. Follow regular release process
4. Merge back to main branch

## Release Artifacts
- Compiled JavaScript files
- TypeScript declaration files
- Source maps
- README.md
- CHANGELOG.md
- package.json
- LICENSE

## Version Control
- Main branch: Production-ready code
- Develop branch: Next release development
- Feature branches: New features
- Hotfix branches: Emergency fixes

## CI/CD Integration
- Automated tests on pull requests
- Build verification
- Code quality checks
- Documentation generation

Note: This process should be reviewed and updated as needed with each major release. 