# Template Files Reference

This document explains all the files in the template and their purposes.

## Core Configuration Files

### `docusaurus.config.js`
Main Docusaurus configuration file. Customize:
- Site title and tagline
- URL and base URL
- Theme colors
- Navigation settings

### `sidebars.js`
Sidebar navigation configuration. Add your projects here.

### `package.json`
Node.js dependencies and scripts. Lists all required packages.

### `babel.config.js`
Babel configuration for Docusaurus (usually don't need to modify).

## Documentation Files

### `README.md`
Main README file. Quick start guide and overview.

### `QUICK_START.md`
5-minute quick start guide for new users.

### `SETUP_GUIDE.md`
Detailed step-by-step setup instructions.

### `TEMPLATE_README.md`
Complete feature guide with all details and usage instructions.

### `CONTRIBUTING.md`
Documentation standards, rules, and guidelines for contributors.

### `SHARING_GUIDE.md`
Instructions for preparing and sharing the template with colleagues.

### `TEMPLATE_INFO.md`
Information about template customization and structure.

### `TEMPLATE_FILES.md`
This file - explains all template files.

## Project Documentation

### `docs/index.md`
Main dashboard page showing all projects overview.

### `docs/rules-and-guidelines.md`
Complete rules and guidelines for documenting projects (accessible from sidebar).

### `docs/projects/project-template.md`
Template file for creating new project documentation. Copy this to create new projects.

### `docs/projects/sample-project.md`
Example project showing proper documentation format. Keep as reference.

## Styling

### `src/css/custom.css`
Custom CSS styles including:
- Progress bar styles
- Theme customization
- Color variables
- Dark mode support

## Scripts

### `scripts/add-progress-bars.js`
Helper script to add progress bars to project files (already run).

### `scripts/fix-progress-bar-styles.js`
Helper script to fix progress bar styling issues (already run).

### `scripts/cleanup-progress-lines.js`
Helper script to clean up duplicate progress lines (already run).

### `scripts/merge-class-attributes.js`
Helper script to merge CSS class attributes (already run).

## Utility Files

### `.template-cleanup.sh`
Bash script to clean up template for sharing (removes personal projects).

### `.template-config.json`
Template metadata and configuration information.

### `.gitignore`
Git ignore rules (excludes node_modules, build, etc.).

## Directories

### `docs/`
All documentation markdown files.

### `docs/projects/`
Individual project documentation files.

### `src/css/`
Custom CSS styles.

### `scripts/`
Helper scripts for automation.

### `build/` (generated)
Generated static site (created when running `npm run build`).

### `node_modules/` (generated)
Installed dependencies (created when running `npm install`).

## File Structure

```
MasterDocs/
├── 📄 Configuration Files
│   ├── docusaurus.config.js
│   ├── sidebars.js
│   ├── package.json
│   └── babel.config.js
│
├── 📚 Documentation Files
│   ├── README.md
│   ├── QUICK_START.md
│   ├── SETUP_GUIDE.md
│   ├── TEMPLATE_README.md
│   ├── CONTRIBUTING.md
│   ├── SHARING_GUIDE.md
│   ├── TEMPLATE_INFO.md
│   └── TEMPLATE_FILES.md
│
├── 📁 docs/
│   ├── index.md (Dashboard)
│   ├── rules-and-guidelines.md
│   └── projects/
│       ├── project-template.md
│       └── sample-project.md
│
├── 🎨 src/css/
│   └── custom.css
│
├── 🔧 scripts/
│   └── (helper scripts)
│
└── 🛠️ Utility Files
    ├── .template-cleanup.sh
    ├── .template-config.json
    └── .gitignore
```

## What to Customize

### Before Sharing

1. **docusaurus.config.js** - Site title, tagline, URL
2. **src/css/custom.css** - Brand colors
3. **docs/index.md** - Dashboard welcome message
4. **README.md** - Team-specific information

### After Getting Template

1. **sidebars.js** - Add your projects
2. **docs/index.md** - Add projects to dashboard
3. **docs/projects/** - Create your project files

## Files to Include When Sharing

### Required
- All configuration files (`.js`, `.json`)
- All documentation files (`.md`)
- `src/css/custom.css`
- `.gitignore`

### Optional
- Helper scripts in `scripts/`
- `.template-cleanup.sh`

### Exclude
- `node_modules/` (regenerate with `npm install`)
- `build/` (regenerate with `npm run build`)
- `.docusaurus/` (cache directory)
- Personal project files (unless keeping as examples)

---

This template is ready to share! See [SHARING_GUIDE.md](SHARING_GUIDE.md) for instructions.

