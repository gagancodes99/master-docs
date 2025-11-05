# Master Documentation Template

A comprehensive Docusaurus-based documentation template for tracking multiple projects, their progress, and milestones. Perfect for teams, organizations, or individuals managing multiple projects.

## Features

- **Dashboard Overview**: Visual dashboard showing all projects with status and progress
- **Progress Tracking**: Visual progress bars for milestones and overall project completion
- **Project Documentation**: Structured format for documenting each project
- **Search Functionality**: Built-in search across all documentation
- **Dark Mode**: Automatic dark mode support
- **Responsive Design**: Works on all devices

## Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone or download this template**
   ```bash
   git clone <repository-url>
   cd MasterDocs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **View your documentation**
   - Open your browser and navigate to `http://localhost:3000`

## Documentation Rules & Guidelines

### Project Documentation Standards

#### 1. Project Status Values

Use one of these status values consistently:
- **Planning**: Project is in the planning/design phase
- **In Progress**: Active development work is ongoing
- **On Hold**: Project is temporarily paused
- **Completed**: Project has been finished

#### 2. Progress Percentage Guidelines

- **0%**: Not started
- **1-25%**: Early stages, planning/setup
- **26-50%**: Core development in progress
- **51-75%**: Advanced features, testing
- **76-99%**: Final polish, bug fixes
- **100%**: Completed and deployed

#### 3. Milestone Naming Convention

Use clear, actionable milestone names:
- ✅ Good: "User Authentication System", "Database Setup", "API Documentation"
- ❌ Bad: "Stuff", "More Work", "Things"

#### 4. Progress Calculation

To calculate overall progress:
1. Sum all milestone progress percentages
2. Divide by the number of milestones
3. Round to the nearest 5% (for cleaner display)

Example: (100% + 60% + 0% + 30% + 0%) / 5 = 38% → 40%

### Required Project Information

Each project page MUST include:

1. **Project Overview**
   - Clear description of what the project is
   - Project goals (3-5 bullet points)

2. **Current Status**
   - Summary of where the project stands
   - Recent accomplishments
   - Current focus areas

3. **Milestones & Progress**
   - At least 3-5 meaningful milestones
   - Each milestone must have:
     - Status (Not Started/In Progress/Completed)
     - Progress percentage (0-100%)
     - Target date
     - Notes/description

4. **Resources & Links**
   - Documentation links
   - Tools & technologies used
   - Related projects (if any)

5. **Notes**
   - Important decisions
   - Challenges & blockers
   - Future considerations

### Adding a New Project

1. **Copy the template**
   ```bash
   cp docs/projects/project-template.md docs/projects/your-project-name.md
   ```

2. **Edit the new file**
   - Fill in all required sections
   - Update progress bars (use the template format)
   - Add milestones with progress tracking

3. **Update the sidebar**
   - Edit `sidebars.js`
   - Add your project to the Projects category:
     ```javascript
     'projects/your-project-name',
     ```

4. **Update the dashboard**
   - Edit `docs/index.md`
   - Add your project to the "Projects Overview" table
   - Use format: `[View Project](projects/your-project-name)`

### Progress Bar Format

Always use this format for progress bars:

**Overall Progress:**
```html
<div class="overall-progress">
  <strong>Overall Progress: 85%</strong>
  <div class="progress-bar-container progress-bar-large">
    <div class="progress-bar-fill progress-85" data-progress="85">85%</div>
  </div>
</div>
```

**Milestone Progress (in table):**
```html
<div class="progress-bar-container progress-bar-small">
  <div class="progress-bar-fill progress-60" data-progress="60">60%</div>
</div>
```

**Available Progress Classes:**
- `progress-0`, `progress-5`, `progress-10`, `progress-15`, ... `progress-100`
- Values are rounded to nearest 5%

### File Naming Conventions

- **Project files**: Use kebab-case (e.g., `my-awesome-project.md`)
- **No spaces**: Replace spaces with hyphens
- **Lowercase**: Keep all filenames lowercase
- **Descriptive**: File name should clearly indicate the project

### Update Frequency

- **Weekly**: Update progress percentages and "Last Updated" date
- **Monthly**: Review and update milestones, add new ones if needed
- **Quarterly**: Review overall project status and priorities

### Best Practices

1. **Be Specific**: Vague descriptions don't help. Be clear about what's done and what's next.

2. **Keep It Updated**: Stale documentation is worse than no documentation. Update regularly.

3. **Use Consistent Language**: Use the same terminology across all projects.

4. **Link Related Projects**: If projects are related, link them in the "Related Projects" section.

5. **Document Decisions**: Important architectural or design decisions should be in the "Notes" section.

6. **Track Blockers**: Always document blockers in the "Challenges & Blockers" section.

7. **Realistic Estimates**: Set realistic target dates and progress percentages.

## Customization

### Changing Colors

Edit `src/css/custom.css` to customize the color scheme:
```css
:root {
  --ifm-color-primary: #2e8555; /* Change this to your brand color */
}
```

### Adding Custom Sections

You can add custom sections to project pages:
- Team Members
- Budget Information
- Risk Assessment
- Timeline View
- etc.

### Modifying the Dashboard

Edit `docs/index.md` to customize:
- Welcome message
- Quick actions
- Status legend
- Getting started instructions

## Deployment

### GitHub Pages

1. Install gh-pages plugin (if needed):
   ```bash
   npm install --save-dev @docusaurus/plugin-pwa
   ```

2. Update `docusaurus.config.js` with your GitHub Pages URL

3. Deploy:
   ```bash
   GIT_USER=yourusername npm run deploy
   ```

### Other Hosting Options

After building (`npm run build`), upload the `build/` directory to:
- Netlify
- Vercel
- AWS S3
- Any static hosting service

## Troubleshooting

### Progress bars not showing
- Check that CSS classes match (e.g., `progress-85` not `progress-80`)
- Verify `src/css/custom.css` is loaded
- Clear browser cache

### Build errors
- Ensure all markdown files are valid
- Check that all linked files exist
- Verify `sidebars.js` references are correct

### Links not working
- Use Docusaurus link format: `projects/project-name` (no `.md`)
- Check file paths match exactly

## Support & Contribution

### Getting Help

1. Check this README first
2. Review the project template: `docs/projects/project-template.md`
3. Look at example projects for reference

### Contributing

When adding projects or improving documentation:
1. Follow the naming conventions
2. Use the project template
3. Update the dashboard
4. Keep progress bars formatted correctly

## License

This template is free to use and modify for your organization.

---

**Happy documenting!** 📚

For questions or issues, refer to the [Docusaurus documentation](https://docusaurus.io/docs) or contact your team lead.

