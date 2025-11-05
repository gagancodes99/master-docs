#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '../docs/projects');
const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(projectsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Merge duplicate class attributes: class="..." class="progress-X" -> class="... progress-X"
  // Pattern: class="progress-bar-fill" ... class="progress-XX"
  content = content.replace(
    /class="progress-bar-fill([^"]*)"[^>]*data-progress="\d+"[^>]*class="progress-(\d+)"/g,
    (match, existingClasses, progressClass) => {
      changed = true;
      const classes = existingClasses ? `progress-bar-fill ${existingClasses.trim()} progress-${progressClass}` : `progress-bar-fill progress-${progressClass}`;
      return `class="${classes}" data-progress="${progressClass}"`;
    }
  );
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
});

console.log('Done!');

