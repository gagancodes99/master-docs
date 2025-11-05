# Template Information

This is a template repository for creating a master documentation site. Customize it for your team or organization.

## What's Included

### Core Files
- `docusaurus.config.js` - Docusaurus configuration
- `sidebars.js` - Navigation sidebar configuration
- `package.json` - Dependencies and scripts
- `src/css/custom.css` - Custom styling with progress bars

### Documentation
- `docs/index.md` - Main dashboard
- `docs/projects/project-template.md` - Template for new projects
- `docs/rules-and-guidelines.md` - Documentation standards

### Guides
- `TEMPLATE_README.md` - Complete feature guide
- `SETUP_GUIDE.md` - Step-by-step setup instructions
- `CONTRIBUTING.md` - Contributor guidelines
- `README.md` - Quick start guide

## Customization Steps

### 1. Update Site Information

Edit `docusaurus.config.js`:
```javascript
title: 'Your Team Name Documentation',
tagline: 'Your tagline here',
url: 'https://your-site.com',
baseUrl: '/',
```

### 2. Customize Colors

Edit `src/css/custom.css`:
```css
:root {
  --ifm-color-primary: #YOUR_BRAND_COLOR;
}
```

### 3. Update Dashboard

Edit `docs/index.md`:
- Change welcome message
- Update status legend if needed
- Customize quick actions

### 4. Remove Sample Content

- Delete `docs/projects/sample-project.md`
- Remove from `sidebars.js`
- Remove from dashboard table

### 5. Add Your Projects

Follow the setup guide to add your first project.

## Sharing with Colleagues

### Option 1: Git Repository

1. Create a new repository
2. Push this template
3. Share repository URL with team
4. Team members clone and customize

### Option 2: ZIP File

1. Download as ZIP
2. Share ZIP file with team
3. Each member extracts and customizes
4. Can later sync via Git if needed

### Option 3: Team Workspace

1. Set up in shared location
2. Team members add their projects
3. Version control with Git
4. Regular updates and syncs

## Template Customization Checklist

Before sharing:

- [ ] Update site title and tagline
- [ ] Customize colors (if needed)
- [ ] Update dashboard welcome message
- [ ] Remove sample projects
- [ ] Review and customize rules document
- [ ] Update README with team-specific info
- [ ] Test all features work correctly
- [ ] Add your first real project as example

## Version Information

- **Template Version**: 1.0.0
- **Docusaurus Version**: 3.1.0
- **Last Updated**: 2025-01-15

## Support

For questions about:
- **Template Setup**: See [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Documentation Rules**: See [CONTRIBUTING.md](CONTRIBUTING.md)
- **Features & Usage**: See [TEMPLATE_README.md](TEMPLATE_README.md)
- **Docusaurus**: See [Docusaurus Docs](https://docusaurus.io/docs)

---

This template is ready to use. Customize it for your needs and share with your team!

