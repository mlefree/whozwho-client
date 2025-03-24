# WhozWho Client Release Process

⚠️ IMPORTANT: DO NOT PUSH ANY CHANGES OR TAGS UNTIL EXPLICITLY ASKED TO "RELEASE"
This includes:
- No git push
- No git push --tags
- No npm publish
- No manual releases

Wait for the explicit "release" command before pushing anything.

## Prerequisites
- Make sure you have all dependencies installed
  ```bash
  npm install
  ```
- Ensure you're starting from an up-to-date master branch
  ```bash
  git checkout master
  git pull origin master
  ```
- Verify system date is correct:
  ```bash
  date "+%Y-%m-%d"  # Verify this matches expected release date
  ```

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

5. Wait for Release Command
   ⚠️ STOP HERE and wait for explicit "release" command

6. Push to Repository (ONLY after "release" command)
   ```bash
   git push origin main --tags
   ```

Note: Package publishing to npm is handled automatically by CI when a new tag is pushed.

## Post-release
1. Monitor CI/CD Pipeline
   - Check that the release workflow completes successfully
   - Verify npm package is published by CI
   - Monitor for any deployment issues

2. Verify Package (after CI completes)
   - Check npm package page
   - Verify installation in new project
   - Test basic functionality

3. Update Documentation
   - Mark version as released in CHANGELOG.md
   - Update documentation site if applicable
   - Update any version-specific docs

4. Notify
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