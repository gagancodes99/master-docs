#!/bin/bash

# Script to clean up the template for sharing
# This removes personal projects and prepares a clean template

echo "🧹 Cleaning up template for sharing..."

# Remove personal projects (keep template and sample)
echo "Removing personal projects..."
find docs/projects -name "*.md" -type f ! -name "project-template.md" ! -name "sample-project.md" -delete

# Remove build artifacts
echo "Cleaning build artifacts..."
rm -rf build/
rm -rf .docusaurus/
rm -rf node_modules/

# Update sidebar to only include template and sample
echo "Updating sidebar..."
cat > sidebars.js << 'EOF'
/**
 * Sidebar configuration for template
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Dashboard',
    },
    {
      type: 'doc',
      id: 'rules-and-guidelines',
      label: 'Rules & Guidelines',
    },
    {
      type: 'category',
      label: 'Projects',
      items: [
        'projects/project-template',
        'projects/sample-project',
      ],
    },
  ],
};

module.exports = sidebars;
EOF

# Update dashboard to only show sample project
echo "Updating dashboard..."
cat > docs/index.md << 'EOF'
# Master Documentation Dashboard

Welcome to your central documentation hub! This dashboard provides an overview of all your projects and their current status.

## Projects Overview

| Project Name | Status | Overall Progress | Last Updated | Link |
|-------------|--------|------------------|--------------|------|
| Sample Project | In Progress | 45% | 2025-01-15 | [View Project](projects/sample-project) |

## Status Legend

- **Planning**: Project is in the planning/design phase
- **In Progress**: Active development work is ongoing
- **On Hold**: Project is temporarily paused
- **Completed**: Project has been finished

## Quick Actions

- [Create New Project](projects/project-template) - Use the template to add a new project
- [Documentation Rules](rules-and-guidelines) - Review standards and guidelines
- [View All Projects](projects/) - Browse all project documentation

---

## Getting Started

1. **Add a New Project**: Copy the [project template](projects/project-template) and create a new file in the `projects/` directory
2. **Update Progress**: Edit the project's progress table to track milestones and completion
3. **Update Dashboard**: Add your new project to the overview table above

## Tips

- Keep the "Last Updated" date current when making changes
- Use meaningful milestone names that clearly describe deliverables
- Update progress percentages regularly to maintain accurate tracking
- Add notes to milestones to capture important context or blockers

---

*Last updated: 2025-01-15*
EOF

echo "✅ Template cleaned up!"
echo ""
echo "Next steps:"
echo "1. Customize docusaurus.config.js with your team info"
echo "2. Update colors in src/css/custom.css if needed"
echo "3. Review and customize documentation files"
echo "4. Run: npm install"
echo "5. Test: npm start"
echo "6. Share with your team!"

