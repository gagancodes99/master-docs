#!/usr/bin/env node

/**
 * Auto-discover projects script
 * Scans docs/projects/ directory and automatically updates sidebar and dashboard
 * This ensures local projects are visible without manual configuration
 */

const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '../docs/projects');
const sidebarPath = path.join(__dirname, '../sidebars.js');
const dashboardPath = path.join(__dirname, '../docs/index.md');

// Get all markdown files in projects directory
function getProjectFiles() {
  if (!fs.existsSync(projectsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(projectsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''))
    .filter(file => file !== 'project-template'); // Always exclude template
  
  return files;
}

// Extract project info from markdown file
function extractProjectInfo(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    let name = '';
    let status = '';
    let progress = '';
    let lastUpdated = '';
    
    // Extract project name from first line
    const titleMatch = lines[0].match(/^#\s+(.+)$/);
    if (titleMatch) {
      name = titleMatch[1].trim();
    }
    
    // Extract status, progress, last updated
    for (const line of lines) {
      if (line.startsWith('**Status**:')) {
        status = line.replace('**Status**:', '').trim();
      }
      if (line.includes('Overall Progress:')) {
        const progressMatch = line.match(/Overall Progress:\s*(\d+)%/);
        if (progressMatch) {
          progress = progressMatch[1] + '%';
        }
      }
      if (line.startsWith('**Last Updated**:')) {
        lastUpdated = line.replace('**Last Updated**:', '').trim();
      }
    }
    
    return { name, status, progress, lastUpdated };
  } catch (error) {
    return null;
  }
}

// Update sidebar.js
function updateSidebar(projectFiles) {
  const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
  
  // Find the Projects category items array
  const itemsStart = sidebarContent.indexOf("items: [");
  const itemsEnd = sidebarContent.indexOf("],", itemsStart);
  
  if (itemsStart === -1 || itemsEnd === -1) {
    console.error('Could not find items array in sidebars.js');
    return false;
  }
  
  // Build new items array
  let items = ["'projects/project-template',"];
  
  // Add all discovered projects (excluding sample-project if it exists, or include it)
  const sortedProjects = projectFiles.sort();
  sortedProjects.forEach(project => {
    items.push(`        'projects/${project}',`);
  });
  
  // Always include sample-project at the end
  if (!sortedProjects.includes('sample-project')) {
    items.push("        'projects/sample-project',");
  }
  
  const newItems = items.join('\n');
  
  // Replace the items array
  const newContent = 
    sidebarContent.substring(0, itemsStart + 8) + '\n' +
    newItems + '\n' +
    sidebarContent.substring(itemsEnd);
  
  fs.writeFileSync(sidebarPath, newContent, 'utf8');
  return true;
}

// Update dashboard index.md
function updateDashboard(projectFiles) {
  let dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
  
  // Extract project info for each file
  const projects = [];
  for (const file of projectFiles) {
    const filePath = path.join(projectsDir, `${file}.md`);
    if (fs.existsSync(filePath)) {
      const info = extractProjectInfo(filePath);
      if (info && info.name) {
        projects.push({
          file,
          name: info.name,
          status: info.status || 'In Progress',
          progress: info.progress || '0%',
          lastUpdated: info.lastUpdated || new Date().toISOString().split('T')[0]
        });
      }
    }
  }
  
  // Sort projects by name
  projects.sort((a, b) => a.name.localeCompare(b.name));
  
  // Build projects table
  let tableRows = '';
  projects.forEach(project => {
    tableRows += `| ${project.name} | ${project.status} | ${project.progress} | ${project.lastUpdated} | [View Project](projects/${project.file}) |\n`;
  });
  
  // Find and replace the projects table
  const tableStart = dashboardContent.indexOf('| Project Name | Status |');
  const tableEnd = dashboardContent.indexOf('\n## Status Legend', tableStart);
  
  if (tableStart !== -1 && tableEnd !== -1) {
    const tableHeader = '| Project Name | Status | Overall Progress | Last Updated | Link |\n|-------------|--------|------------------|--------------|------|\n';
    const newTable = tableHeader + tableRows;
    
    dashboardContent = 
      dashboardContent.substring(0, tableStart) +
      newTable +
      dashboardContent.substring(tableEnd);
    
    fs.writeFileSync(dashboardPath, dashboardContent, 'utf8');
    return true;
  }
  
  return false;
}

// Main execution
function main() {
  console.log('🔍 Auto-discovering projects...');
  
  const projectFiles = getProjectFiles();
  console.log(`📁 Found ${projectFiles.length} project(s):`, projectFiles.join(', '));
  
  if (projectFiles.length === 0) {
    console.log('ℹ️  No projects found. Use the template to create your first project.');
    return;
  }
  
  // Update sidebar
  if (updateSidebar(projectFiles)) {
    console.log('✅ Sidebar updated');
  } else {
    console.error('❌ Failed to update sidebar');
  }
  
  // Update dashboard
  if (updateDashboard(projectFiles)) {
    console.log('✅ Dashboard updated');
  } else {
    console.error('❌ Failed to update dashboard');
  }
  
  console.log('✨ Auto-discovery complete!');
}

main();

