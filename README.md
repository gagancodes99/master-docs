# Master Documentation Template

A comprehensive Docusaurus-based documentation template for tracking multiple projects, their progress, and milestones. Perfect for teams, organizations, or individuals managing multiple projects.

## 🚀 Quick Start

1. **Clone this repository:**
   ```bash
   git clone https://github.com/gagancodes99/master-docs.git
   cd master-docs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   **Automatic Fix:** The installation script will automatically detect and fix common issues:
   - Detects your platform (Windows/Mac/Linux)
   - Verifies installation integrity
   - Automatically cleans and reinstalls if needed
   - Handles Windows path issues
   
   If you encounter errors, the script will attempt to fix them automatically. For manual fixes, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md).

3. **Start development server:**
   ```bash
   npm start
   ```

4. **View documentation:**
   - Open `http://localhost:3000` in your browser

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes! ⚡
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Step-by-step setup for new users
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions 🔧
- **[TEMPLATE_README.md](TEMPLATE_README.md)** - Complete feature guide with all details
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Documentation standards and rules
- **[SHARING_GUIDE.md](SHARING_GUIDE.md)** - How to share this template with colleagues
- **[TEMPLATE_INFO.md](TEMPLATE_INFO.md)** - Template customization guide

## ✨ Features

- **Multi-Folder Project Discovery**: Automatically scan multiple source directories (Desktop/Work, Desktop/Personal, etc.) and discover projects
- **Dashboard Overview**: Visual dashboard showing all projects with status and progress
- **Progress Tracking**: Visual progress bars for milestones and overall project completion
- **Project Documentation**: Structured format for documenting each project
- **Auto-Discovery**: Automatically detect projects from package.json, git repos, and other indicators
- **Search Functionality**: Built-in search across all documentation
- **Dark Mode**: Automatic dark mode support
- **Responsive Design**: Works on all devices

## 🎯 For New Users

If you're setting this up for the first time, start with:
1. [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete setup instructions
2. [CONTRIBUTING.md](CONTRIBUTING.md) - Learn the documentation standards
3. [TEMPLATE_README.md](TEMPLATE_README.md) - Understand all features

## 📝 Adding Your Projects

### Using Cursor/Claude Code

1. **Clone this template:**
   ```bash
   git clone https://github.com/gagancodes99/master-docs.git
   cd master-docs
   npm install
   ```

2. **Use AI to document your projects:**
   - Open Cursor or Claude Code
   - Ask: "Explore my Desktop/Work folder and document all projects according to the template"
   - The AI will automatically create project documentation files

3. **Manual method:**
   - Copy the template: `cp docs/projects/project-template.md docs/projects/your-project.md`
   - Fill in project details
   - Update `sidebars.js` and `docs/index.md`

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 🎨 Customization

### Update Site Information

Edit `docusaurus.config.js`:
```javascript
title: 'Your Team Documentation',
tagline: 'Your team tagline',
```

### Update Colors

Edit `src/css/custom.css`:
```css
:root {
  --ifm-color-primary: #YOUR_COLOR;
}
```

## 📖 Full Documentation

For complete information, see:

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes! ⚡
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Step-by-step setup for new users
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions 🔧
- **[TEMPLATE_README.md](TEMPLATE_README.md)** - Complete feature guide with all details
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Documentation standards and rules
- **[SHARING_GUIDE.md](SHARING_GUIDE.md)** - How to share this template with colleagues
- **[TEMPLATE_INFO.md](TEMPLATE_INFO.md)** - Template customization guide

## 🎯 Quick Reference

### Building the Site
```bash
npm run build
```

### Adding a Project
1. Copy template: `cp docs/projects/project-template.md docs/projects/your-project.md`
2. Fill in details
3. Update `sidebars.js`
4. Update `docs/index.md` dashboard

### Deployment
See [TEMPLATE_README.md](TEMPLATE_README.md#deployment) for deployment options.

## 🤖 AI-Assisted Documentation (Auto-Discovery System)

This template features **automatic project discovery** with **multi-folder scanning**! Here's how it works:

### Method 1: Multi-Folder Discovery (Recommended)

1. **Configure source folders**
   - Edit `project-discovery.config.json`
   - Add folders to scan: `["~/Desktop/Work", "~/Desktop/Personal", "~/Documents/Projects"]`
   - The system will automatically detect projects in these folders

2. **Run discovery**
   ```bash
   npm run discover:folders  # Discover projects from configured folders
   npm start                 # Start the dev server
   ```

3. **Projects are automatically:**
   - Discovered from source folders
   - Documentation files created/updated
   - Added to sidebar and dashboard

### Method 2: AI-Assisted Manual Documentation

1. **Clone the template**
   ```bash
   git clone https://github.com/gagancodes99/master-docs.git
   cd master-docs
   npm install
   ```

2. **Ask AI to document your projects**
   - Open Cursor or Claude Code
   - Ask: "Explore my Desktop/Work folder and document all projects according to the template"
   - AI creates documentation files in `docs/projects/`

3. **Auto-discovery runs automatically**
   - When you run `npm start`, the system automatically:
     - Runs multi-folder discovery (if configured)
     - Scans for all project files
     - Updates the sidebar
     - Updates the dashboard
     - Extracts project info (name, status, progress)

4. **No manual configuration needed!**
   - Projects appear automatically
   - Sidebar updates automatically
   - Dashboard updates automatically

**See [QUICK_START_WORKFLOW.md](docs/QUICK_START_WORKFLOW.md) for detailed instructions.**

## 📋 What's Included

- ✅ Project dashboard with overview
- ✅ Visual progress bars
- ✅ Milestone tracking
- ✅ Search functionality
- ✅ Dark mode support
- ✅ Complete documentation
- ✅ Ready-to-use template

## 🔄 Workflow

1. **Clone the template** → `git clone https://github.com/gagancodes99/master-docs.git`
2. **Install dependencies** → `npm install`
3. **Document your projects** → Use AI or manually add projects
4. **Track progress** → Update progress bars regularly
5. **Share with team** → Deploy or share locally

---

**Happy documenting!** 📚

For questions, see the documentation files or refer to [Docusaurus docs](https://docusaurus.io/docs).
