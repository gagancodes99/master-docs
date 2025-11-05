#!/usr/bin/env node

/**
 * Documentation Generator
 * Generates markdown documentation from discovered project data
 */

const fs = require('fs');
const path = require('path');

/**
 * Load project template
 */
function loadTemplate() {
  const templatePath = path.join(__dirname, '../docs/projects/project-template.md');
  return fs.readFileSync(templatePath, 'utf8');
}

/**
 * Generate documentation content from project data
 */
function generateDocumentation(project, template) {
  const today = new Date().toISOString().split('T')[0];
  
  // Replace placeholders
  let doc = template
    .replace(/^# Project Name$/m, `# ${project.name}`)
    .replace(/\*\*Status\*\*: Planning \| In Progress \| On Hold \| Completed/m, `**Status**: ${project.status}`)
    .replace(/\*\*Last Updated\*\*: YYYY-MM-DD/m, `**Last Updated**: ${project.lastModified || today}`)
    .replace(/Overall Progress: 0%/g, `Overall Progress: ${project.progress}%`)
    .replace(/progress-0/g, `progress-${Math.round(project.progress / 5) * 5}`)
    .replace(/data-progress="0"/g, `data-progress="${Math.round(project.progress / 5) * 5}"`);

  // Replace overview section
  const overviewSection = `## Overview

${project.description || 'Brief description of the project, its goals, and purpose.'}

### Project Goals

- ${project.technologies.join(', ')}
${project.repositoryUrl ? `- Repository: [${project.repositoryUrl}](${project.repositoryUrl})` : ''}`;

  // Build the replacement content
  const statusSection = `## Current Status

Summary of where the project currently stands. What's been accomplished? What's next?

### Recent Accomplishments

- Project discovered and documented

### Current Focus

- Initial setup and documentation

## Milestones & Progress

| Milestone | Status | Progress | Target Date | Notes |
|-----------|--------|----------|-------------|-------|
| Initial Setup | Not Started | <div class="progress-bar-container progress-bar-small"><div class="progress-bar-fill progress-0" data-progress="0">0%</div></div> | ${today} | Project discovered automatically |
| Development | Not Started | <div class="progress-bar-container progress-bar-small"><div class="progress-bar-fill progress-0" data-progress="0">0%</div></div> | TBD | To be updated |
| Testing | Not Started | <div class="progress-bar-container progress-bar-small"><div class="progress-bar-fill progress-0" data-progress="0">0%</div></div> | TBD | To be updated |

**Status Options**: Not Started | In Progress | Completed

### Overall Progress Calculation

To calculate overall progress:
1. Add up all milestone progress percentages
2. Divide by the number of milestones
3. Example: (0% + 30% + 0%) / 3 = 10% overall

## Resources & Links

### Documentation
${project.repositoryUrl ? `- [Repository](${project.repositoryUrl})` : '- Documentation link'}

### Tools & Technologies
${project.technologies.map(tech => `- ${tech}`).join('\n')}

### Related Projects
`;

  doc = doc.replace(/## Overview[\s\S]*?### Related Projects/, overviewSection + '\n\n' + statusSection);

  // Replace created/updated dates
  doc = doc.replace(/\*\*Created\*\*: YYYY-MM-DD/m, `**Created**: ${today}`)
           .replace(/\*\*Last Updated\*\*: YYYY-MM-DD/g, `**Last Updated**: ${project.lastModified || today}`);

  return doc;
}

/**
 * Generate and save project documentation
 */
function generateProjectDoc(project, outputDir) {
  const template = loadTemplate();
  const content = generateDocumentation(project, template);
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, `${project.slug}.md`);
  fs.writeFileSync(filePath, content, 'utf8');
  
  return filePath;
}

module.exports = {
  generateProjectDoc,
  generateDocumentation
};

