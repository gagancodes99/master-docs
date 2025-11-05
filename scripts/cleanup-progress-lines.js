#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '../docs/projects');
const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(projectsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Remove duplicate "Overall Progress: X%" lines that appear before progress bar
  // Pattern: **Overall Progress**: X% followed by Last Updated, then progress bar
  if (content.includes('progress-bar-container') && content.match(/\*\*Overall Progress\*\*:\s*\d+%/)) {
    // Remove the old text-only Overall Progress line
    content = content.replace(/\*\*Overall Progress\*\*:\s*\d+%\s*\n/g, '');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned up ${file}`);
  }
});

console.log('Cleanup complete!');

