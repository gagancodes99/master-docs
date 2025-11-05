# Sharing Guide

This guide explains how to prepare and share this template with your colleagues.

## Before Sharing

### Option 1: Clean Template (Recommended)

Create a clean version without your personal projects:

1. **Remove personal projects:**
   ```bash
   # Keep only template and sample
   rm docs/projects/raichu.md
   rm docs/projects/bonderud.md
   # ... remove all your personal projects
   # Keep: project-template.md and sample-project.md
   ```

2. **Update sidebar:**
   - Edit `sidebars.js`
   - Remove all personal projects
   - Keep only: `'projects/project-template'` and `'projects/sample-project'`

3. **Update dashboard:**
   - Edit `docs/index.md`
   - Remove all personal projects from the table
   - Keep only the sample project as an example

4. **Update configuration:**
   - Edit `docusaurus.config.js`
   - Change title, tagline, URL to generic values
   - Update organization/project name

### Option 2: Keep Examples

Keep your projects as examples but make them generic:

1. Rename projects to generic names
2. Remove sensitive information
3. Keep structure as reference

## Sharing Methods

### Method 1: Git Repository (Recommended)

1. **Create a new repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Master Documentation Template"
   ```

2. **Push to GitHub/GitLab:**
   ```bash
   git remote add origin <repository-url>
   git push -u origin main
   ```

3. **Share the repository URL** with your colleagues

**Benefits:**
- Version control
- Easy updates
- Collaboration
- Issue tracking

### Method 2: ZIP File

1. **Create ZIP:**
   ```bash
   # Exclude node_modules and build
   zip -r MasterDocs-Template.zip . -x "node_modules/*" "build/*" ".git/*" ".docusaurus/*"
   ```

2. **Share the ZIP file**

**Benefits:**
- Simple distribution
- No Git required
- Complete package

### Method 3: Template Repository

1. Create a GitHub template repository
2. Mark it as a template
3. Colleagues can use "Use this template" button

## Colleague Setup Instructions

Share these instructions with your colleagues:

### Quick Start

1. **Get the template:**
   ```bash
   # Option A: Clone
   git clone <repository-url>
   cd MasterDocs
   
   # Option B: Download and extract ZIP
   # Then navigate to the folder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:3000`

5. **Read the guides:**
   - Start with [SETUP_GUIDE.md](SETUP_GUIDE.md)
   - Review [CONTRIBUTING.md](CONTRIBUTING.md)
   - Check [TEMPLATE_README.md](TEMPLATE_README.md)

## Customization Checklist

Before sharing, customize:

- [ ] Site title in `docusaurus.config.js`
- [ ] Site tagline in `docusaurus.config.js`
- [ ] Organization/project name
- [ ] Brand colors in `src/css/custom.css`
- [ ] Dashboard welcome message in `docs/index.md`
- [ ] Remove or anonymize personal projects
- [ ] Update README with team-specific info
- [ ] Review all documentation files

## Template Files to Include

Ensure these files are included when sharing:

### Required Files
- `package.json`
- `docusaurus.config.js`
- `sidebars.js`
- `babel.config.js`
- `README.md`
- `CONTRIBUTING.md`
- `SETUP_GUIDE.md`
- `TEMPLATE_README.md`
- `TEMPLATE_INFO.md`
- `docs/index.md`
- `docs/projects/project-template.md`
- `docs/projects/sample-project.md`
- `docs/rules-and-guidelines.md`
- `src/css/custom.css`
- `.gitignore`

### Optional Files
- `SHARING_GUIDE.md` (this file)
- `.template-config.json`

### Files to Exclude
- `node_modules/` (will be regenerated with `npm install`)
- `build/` (will be generated with `npm run build`)
- `.docusaurus/` (cache directory)
- Personal project files (unless keeping as examples)

## Post-Sharing Support

### Create a Support Channel

- Slack/Discord channel
- Email distribution list
- Wiki or documentation site
- Issue tracker on Git repository

### Provide Resources

- Link to Docusaurus documentation
- Internal team documentation
- Examples of well-documented projects
- Regular updates and improvements

## Version Management

### Version Numbering

Update version in:
- `package.json`
- `.template-config.json`
- Documentation files (if needed)

### Changelog

Consider creating a `CHANGELOG.md`:
- Track template updates
- Document new features
- List breaking changes

## Best Practices

1. **Test First**: Always test the template yourself before sharing
2. **Document Changes**: Keep notes on what you customized
3. **Version Control**: Use Git for version tracking
4. **Regular Updates**: Update template based on feedback
5. **Clear Instructions**: Provide clear setup instructions
6. **Support**: Be available to help colleagues get started

## Example Sharing Message

```
Subject: Master Documentation Template - Ready to Use!

Hi Team,

I've prepared a documentation template for tracking our projects. Here's how to get started:

1. Clone/download the template from: [URL]
2. Follow the setup guide: SETUP_GUIDE.md
3. Read the contributing guidelines: CONTRIBUTING.md
4. Start documenting your projects!

The template includes:
- Visual progress bars
- Project dashboard
- Milestone tracking
- Search functionality
- Dark mode support

If you have questions, check the documentation or reach out to me.

Happy documenting!
```

---

**Ready to share!** Make sure to customize it for your team before distributing.

