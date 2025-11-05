# Multi-Folder Discovery Settings

This page explains how to configure and use the multi-folder project discovery feature.

## Overview

The multi-folder discovery system automatically scans configured directories, detects projects, and creates documentation files. This eliminates the need to manually create documentation for each project.

## Configuration File

Edit `project-discovery.config.json` in the root directory:

```json
{
  "sourceFolders": [
    "~/Desktop/Work",
    "~/Desktop/Personal",
    "~/Documents/Projects"
  ],
  "excludePatterns": [
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    ".docusaurus",
    "coverage",
    ".DS_Store",
    "MasterDocs"
  ],
  "projectIndicators": [
    "package.json",
    "requirements.txt",
    "pom.xml",
    "Cargo.toml",
    ".git"
  ],
  "autoCreateDocs": true,
  "defaultStatus": "In Progress",
  "defaultProgress": 0,
  "outputDir": "docs/projects",
  "minDepth": 1,
  "maxDepth": 3
}
```

## Configuration Options

### `sourceFolders` (Array)

List of directories to scan for projects. Supports:
- Absolute paths: `"/Users/username/Desktop/Work"`
- Home directory shortcuts: `"~/Desktop/Work"` (automatically expanded)
- Relative paths: `"../projects"`

**Example:**
```json
"sourceFolders": [
  "~/Desktop/Work",
  "~/Desktop/Personal",
  "~/Documents/Projects",
  "/Users/username/CustomProjects"
]
```

### `excludePatterns` (Array)

Folders and files to skip during scanning. The system checks:
- Folder names (e.g., `node_modules`)
- Path patterns (e.g., `dist/build`)
- Any folder containing these patterns

**Common patterns:**
- `node_modules` - Node.js dependencies
- `.git` - Git repositories (usually scanned, but can exclude sub-folders)
- `dist`, `build` - Build output directories
- `.next`, `.docusaurus` - Framework-specific build directories
- `coverage` - Test coverage reports
- `MasterDocs` - The documentation project itself

### `projectIndicators` (Array)

Files or folders that indicate a project directory:
- `package.json` - Node.js/JavaScript projects
- `requirements.txt` - Python projects
- `pom.xml` - Java Maven projects
- `build.gradle` - Java Gradle projects
- `Cargo.toml` - Rust projects
- `.git` - Git repositories (any project type)

**Note:** If a directory contains any of these indicators, it's considered a project.

### `autoCreateDocs` (Boolean)

- `true`: Automatically create/update documentation files
- `false`: Only discover projects, don't create docs (for testing)

### `defaultStatus` (String)

Default status for newly discovered projects:
- `"Planning"`
- `"In Progress"` (recommended)
- `"On Hold"`
- `"Completed"`

### `defaultProgress` (Number)

Default progress percentage (0-100) for newly discovered projects.

### `outputDir` (String)

Directory where documentation files will be created. Default: `"docs/projects"`

### `minDepth` (Number)

Minimum folder depth to start detecting projects. 
- `1`: Start detecting immediately in source folders
- `2`: Skip direct children, scan grandchildren
- Useful when source folders contain wrapper directories

### `maxDepth` (Number)

Maximum folder depth to scan. Prevents infinite recursion.
- `3`: Recommended for most cases
- `2`: Faster, but might miss deeply nested projects
- `4+`: Slower, but catches all projects

## How Project Detection Works

1. **Scanning**: System recursively scans all configured source folders
2. **Depth Control**: Respects `minDepth` and `maxDepth` settings
3. **Exclusion**: Skips directories matching `excludePatterns`
4. **Detection**: Checks for `projectIndicators` in each directory
5. **Metadata Extraction**: Extracts project information:
   - Name (from package.json, README, or folder name)
   - Description (from package.json or README)
   - Technologies (from package.json dependencies, project type)
   - Repository URL (from git remote)
   - Last modified date (from git or file system)

6. **Documentation**: Creates/updates markdown files in `outputDir`

## Supported Project Types

The system automatically detects:

- **Node.js**: `package.json` present
- **Python**: `requirements.txt`, `setup.py`, or `pyproject.toml`
- **Java Maven**: `pom.xml`
- **Java Gradle**: `build.gradle`
- **Rust**: `Cargo.toml`
- **Git Repositories**: `.git` folder present (any project type)

## Running Discovery

### Command Line

```bash
# Discover projects from configured folders
npm run discover:folders

# Update sidebar/dashboard from existing docs
npm run discover

# Both in sequence
npm run discover:all

# Start dev server (runs discovery automatically)
npm start
```

### Automatic Discovery

Discovery runs automatically:
- Before `npm start` (via prestart hook)
- Before `npm run build` (via prebuild hook)
- Only if `project-discovery.config.json` exists

To disable automatic discovery:
```bash
RUN_FOLDER_DISCOVERY=false npm start
```

## Example Workflow

1. **Configure folders:**
   ```json
   {
     "sourceFolders": ["~/Desktop/Work"]
   }
   ```

2. **Run discovery:**
   ```bash
   npm run discover:folders
   ```

3. **Output:**
   ```
   🔍 Starting multi-folder project discovery...
   📂 Scanning: /Users/username/Desktop/Work
      Found 5 project(s)
   ✨ Created: My Awesome Project (my-awesome-project.md)
   ✨ Created: Another Project (another-project.md)
   ...
   📈 Summary:
      Created: 5
      Updated: 0
   ```

4. **Start dev server:**
   ```bash
   npm start
   ```

5. **View projects:**
   - All discovered projects appear in sidebar
   - All projects listed on dashboard
   - Documentation files created in `docs/projects/`

## Troubleshooting

### No projects found

1. Check `sourceFolders` paths are correct
2. Verify folders exist and are accessible
3. Check `excludePatterns` aren't too broad
4. Verify `minDepth`/`maxDepth` settings
5. Ensure projects have indicators (package.json, etc.)

### Projects detected but docs not created

1. Check `autoCreateDocs` is `true`
2. Verify `outputDir` exists and is writable
3. Check for permission errors in console output

### Wrong project information

1. Check `package.json` or `README.md` for correct metadata
2. Manually edit generated documentation files
3. Re-run discovery to update

### Too many false positives

1. Add more patterns to `excludePatterns`
2. Adjust `minDepth` to skip wrapper directories
3. Reduce `maxDepth` to limit scanning

## Best Practices

1. **Start with one folder**: Test with a single source folder first
2. **Use exclusions**: Add common build/dependency folders to `excludePatterns`
3. **Set appropriate depth**: `minDepth: 1, maxDepth: 3` works for most cases
4. **Review generated docs**: Check generated files and update as needed
5. **Keep config in git**: Commit `project-discovery.config.json` (it's a template)
6. **Don't commit projects**: Projects stay local-only (handled by `.gitignore`)

## Advanced Usage

### Conditional Discovery

You can create different config files for different scenarios:

```bash
# Development config
cp project-discovery.config.json project-discovery.dev.json

# Production config
cp project-discovery.config.json project-discovery.prod.json

# Use specific config
cp project-discovery.dev.json project-discovery.config.json
npm run discover:folders
```

### Custom Project Indicators

Add custom indicators for your project types:

```json
{
  "projectIndicators": [
    "package.json",
    "go.mod",           // Go projects
    "composer.json",    // PHP projects
    "Gemfile",          // Ruby projects
    "project.clj"       // Clojure projects
  ]
}
```

---

**Need help?** Check the main [QUICK_START_WORKFLOW.md](quick-start-workflow) guide or refer to the [README.md](../../README.md).

