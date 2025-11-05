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

/**
 * Normalize document ID to match Docusaurus's normalization
 * Docusaurus strips leading numbers and special characters from document IDs
 */
function normalizeDocId(filename) {
  // Remove .md extension
  let id = filename.replace(/\.md$/, '');
  
  // Docusaurus normalizes IDs by removing leading numbers and some special chars
  // For example: "1-create-a-project-spec" becomes "create-a-project-spec"
  // Let's strip leading numbers and dashes
  id = id.replace(/^[\d\.\s-]+/, '');
  
  // If the result is empty or just dashes, use the original
  if (!id || id === '-' || id.match(/^-+$/)) {
    id = filename.replace(/\.md$/, '');
  }
  
  return id;
}

/**
 * Get the actual document ID that Docusaurus will use
 */
function getDocusaurusDocId(filePath) {
  const filename = path.basename(filePath);
  return normalizeDocId(filename);
}

// Get all markdown files in projects directory
function getProjectFiles() {
  if (!fs.existsSync(projectsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(projectsDir)
    .filter(file => file.endsWith('.md'))
    .filter(file => file !== 'project-template.md') // Always exclude template
    .map(file => {
      const filePath = path.join(projectsDir, file);
      if (!fs.existsSync(filePath)) {
        return null;
      }
      
      // Get the actual doc ID that Docusaurus will use
      const docId = getDocusaurusDocId(filePath);
      return {
        filename: file.replace('.md', ''),
        docId: docId,
        filePath: filePath
      };
    })
    .filter(item => item !== null); // Remove null entries
  
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
  // Look for "items: [" within the Projects category
  const projectsCategoryStart = sidebarContent.indexOf("label: 'Projects'");
  if (projectsCategoryStart === -1) {
    console.error('Could not find Projects category in sidebars.js');
    return false;
  }
  
  const itemsStart = sidebarContent.indexOf("items: [", projectsCategoryStart);
  const itemsEnd = sidebarContent.indexOf("],", itemsStart);
  
  if (itemsStart === -1 || itemsEnd === -1) {
    console.error('Could not find items array in sidebars.js');
    return false;
  }
  
  // Build new items array with proper indentation
  // Only include files that actually exist and are valid
  // projectFiles is now an array of objects with {filename, docId, filePath}
  const validProjects = projectFiles.filter(project => {
    if (!fs.existsSync(project.filePath)) {
      console.warn(`⚠️  Skipping ${project.filename}: file does not exist`);
      return false;
    }
    // Verify file is readable and has content
    try {
      const stats = fs.statSync(project.filePath);
      if (stats.size === 0) {
        console.warn(`⚠️  Skipping ${project.filename}: file is empty`);
        return false;
      }
    } catch (error) {
      console.warn(`⚠️  Skipping ${project.filename}: ${error.message}`);
      return false;
    }
    return true;
  });
  
  let items = [];
  
  // Always include project-template first if it exists
  const templatePath = path.join(projectsDir, 'project-template.md');
  if (fs.existsSync(templatePath)) {
    items.push("        'projects/project-template',");
  }
  
  // Add all discovered projects (sorted alphabetically by docId)
  const sortedProjects = validProjects.sort((a, b) => a.docId.localeCompare(b.docId));
  sortedProjects.forEach(project => {
    // Skip template and sample-project (handled separately)
    if (project.filename !== 'project-template' && project.filename !== 'sample-project') {
      // Use the normalized docId that Docusaurus will recognize
      items.push(`        'projects/${project.docId}',`);
    }
  });
  
  // Always include sample-project at the end if it exists
  const sampleProjectPath = path.join(projectsDir, 'sample-project.md');
  if (fs.existsSync(sampleProjectPath)) {
    items.push("        'projects/sample-project',");
  }
  
  // If no items, add a comment
  if (items.length === 0) {
    items.push("        // No projects found");
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
  // projectFiles is now an array of objects with {filename, docId, filePath}
  const projects = [];
  for (const project of projectFiles) {
    if (fs.existsSync(project.filePath)) {
      const info = extractProjectInfo(project.filePath);
      if (info && info.name) {
        projects.push({
          file: project.docId, // Use normalized docId for the link
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
  const fileList = projectFiles.map(p => p.filename).join(', ');
  console.log(`📁 Found ${projectFiles.length} project(s):`, fileList);
  
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

