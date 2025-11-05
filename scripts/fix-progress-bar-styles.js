#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '../docs/projects');
const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));

function getProgressClass(percentage) {
  const p = parseInt(percentage);
  // Round to nearest 5
  const rounded = Math.round(p / 5) * 5;
  return `progress-${rounded}`;
}

files.forEach(file => {
  const filePath = path.join(projectsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Replace style="width: X%" with className="progress-X"
  // Pattern: style="width: 85%"
  const styleRegex = /style="width:\s*(\d+)%"/g;
  content = content.replace(styleRegex, (match, percentage) => {
    changed = true;
    const progressClass = getProgressClass(percentage);
    return `className="${progressClass}"`;
  });
  
  // Also handle style={{width: 'X%'}} format (if any exist)
  const styleObjRegex = /style=\{\{width:\s*'(\d+)%'\}\}/g;
  content = content.replace(styleObjRegex, (match, percentage) => {
    changed = true;
    const progressClass = getProgressClass(percentage);
    return `className="${progressClass}"`;
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
});

console.log('Done!');

