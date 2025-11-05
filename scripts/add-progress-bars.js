#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '../docs/projects');
const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md') && f !== 'project-template.md' && f !== 'sample-project.md');

function addProgressBar(percentage) {
  const progress = parseInt(percentage);
  return `<div class="progress-bar-container progress-bar-small"><div class="progress-bar-fill" data-progress="${progress}" style="width: ${progress}%">${progress}%</div></div>`;
}

function addOverallProgressBar(percentage) {
  const progress = parseInt(percentage);
  return `\n<div class="overall-progress">\n  <strong>Overall Progress: ${progress}%</strong>\n  <div class="progress-bar-container progress-bar-large">\n    <div class="progress-bar-fill" data-progress="${progress}" style="width: ${progress}%">${progress}%</div>\n  </div>\n</div>`;
}

files.forEach(file => {
  const filePath = path.join(projectsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has progress bars
  if (content.includes('progress-bar-container')) {
    console.log(`Skipping ${file} - already has progress bars`);
    return;
  }
  
  // Replace overall progress
  const overallProgressMatch = content.match(/\*\*Overall Progress\*\*:\s*(\d+)%/);
  if (overallProgressMatch) {
    const percentage = overallProgressMatch[1];
    // Remove the old line and add progress bar after Last Updated
    content = content.replace(
      /\*\*Overall Progress\*\*:\s*\d+%\s*\n/,
      ''
    );
    // Add progress bar after Last Updated line
    content = content.replace(
      /(\*\*Last Updated\*\*:\s*[^\n]+\n)/,
      `$1${addOverallProgressBar(percentage)}\n`
    );
  }
  
  // Replace milestone progress percentages
  content = content.replace(/\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*(\d+)%\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/g, (match, milestone, status, progress, date, notes) => {
    // Skip header row
    if (milestone.trim() === 'Milestone' || milestone.includes('---')) {
      return match;
    }
    return `| ${milestone} | ${status} | ${addProgressBar(progress)} | ${date} | ${notes} |`;
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});

console.log('Done!');

