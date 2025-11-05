#!/usr/bin/env node

/**
 * Project Detector
 * Detects projects from various indicators and extracts metadata
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Check if a directory should be excluded based on patterns
 */
function shouldExclude(dirPath, excludePatterns) {
  const dirName = path.basename(dirPath);
  return excludePatterns.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      return regex.test(dirName);
    }
    return dirName === pattern || dirPath.includes(pattern);
  });
}

/**
 * Check if a directory is a project based on indicators
 */
function isProject(dirPath, projectIndicators) {
  for (const indicator of projectIndicators) {
    const indicatorPath = path.join(dirPath, indicator);
    if (fs.existsSync(indicatorPath)) {
      return true;
    }
  }
  return false;
}

/**
 * Detect project type based on indicators
 */
function detectProjectType(dirPath) {
  if (fs.existsSync(path.join(dirPath, 'package.json'))) return 'nodejs';
  if (fs.existsSync(path.join(dirPath, 'requirements.txt')) || 
      fs.existsSync(path.join(dirPath, 'setup.py')) ||
      fs.existsSync(path.join(dirPath, 'pyproject.toml'))) return 'python';
  if (fs.existsSync(path.join(dirPath, 'pom.xml'))) return 'java';
  if (fs.existsSync(path.join(dirPath, 'build.gradle'))) return 'java-gradle';
  if (fs.existsSync(path.join(dirPath, 'Cargo.toml'))) return 'rust';
  if (fs.existsSync(path.join(dirPath, '.git'))) return 'git';
  return 'unknown';
}

/**
 * Extract project name from various sources
 */
function extractProjectName(dirPath, projectType) {
  // Try package.json first
  if (projectType === 'nodejs') {
    try {
      const packageJsonPath = path.join(dirPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (packageJson.name) {
          return packageJson.name;
        }
      }
    } catch (error) {
      // Fall through to folder name
    }
  }

  // Try README.md title
  try {
    const readmePath = path.join(dirPath, 'README.md');
    if (fs.existsSync(readmePath)) {
      const readmeContent = fs.readFileSync(readmePath, 'utf8');
      const titleMatch = readmeContent.match(/^#\s+(.+)$/m);
      if (titleMatch) {
        return titleMatch[1].trim();
      }
    }
  } catch (error) {
    // Fall through to folder name
  }

  // Use folder name as fallback
  return path.basename(dirPath);
}

/**
 * Extract project description
 */
function extractDescription(dirPath, projectType) {
  // Try package.json
  if (projectType === 'nodejs') {
    try {
      const packageJsonPath = path.join(dirPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (packageJson.description) {
          return packageJson.description;
        }
      }
    } catch (error) {
      // Fall through
    }
  }

  // Try README.md
  try {
    const readmePath = path.join(dirPath, 'README.md');
    if (fs.existsSync(readmePath)) {
      const readmeContent = fs.readFileSync(readmePath, 'utf8');
      // Get first paragraph after title
      const lines = readmeContent.split('\n');
      let foundTitle = false;
      for (const line of lines) {
        if (line.startsWith('#')) {
          foundTitle = true;
          continue;
        }
        if (foundTitle && line.trim() && !line.startsWith('#')) {
          return line.trim().substring(0, 200); // Limit to 200 chars
        }
      }
    }
  } catch (error) {
    // Fall through
  }

  return `A ${projectType} project`;
}

/**
 * Extract repository URL from git
 */
function extractRepositoryUrl(dirPath) {
  try {
    const gitConfigPath = path.join(dirPath, '.git', 'config');
    if (fs.existsSync(gitConfigPath)) {
      const gitConfig = fs.readFileSync(gitConfigPath, 'utf8');
      const urlMatch = gitConfig.match(/url\s*=\s*(.+)/);
      if (urlMatch) {
        return urlMatch[1].trim();
      }
    }

    // Try git remote command
    try {
      const remoteUrl = execSync('git remote get-url origin', {
        cwd: dirPath,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore']
      }).trim();
      if (remoteUrl) {
        return remoteUrl;
      }
    } catch (error) {
      // Not a git repo or no remote
    }
  } catch (error) {
    // Fall through
  }

  return null;
}

/**
 * Extract technologies from package.json
 */
function extractTechnologies(dirPath, projectType) {
  const technologies = [];

  if (projectType === 'nodejs') {
    try {
      const packageJsonPath = path.join(dirPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (packageJson.dependencies) {
          technologies.push('Node.js');
          // Detect frameworks
          if (packageJson.dependencies.react) technologies.push('React');
          if (packageJson.dependencies.vue) technologies.push('Vue');
          if (packageJson.dependencies.express) technologies.push('Express');
          if (packageJson.dependencies.next) technologies.push('Next.js');
          if (packageJson.dependencies['@docusaurus/core']) technologies.push('Docusaurus');
        }
      }
    } catch (error) {
      // Fall through
    }
  } else if (projectType === 'python') {
    technologies.push('Python');
  } else if (projectType === 'java') {
    technologies.push('Java');
  } else if (projectType === 'rust') {
    technologies.push('Rust');
  }

  return technologies.length > 0 ? technologies : [projectType];
}

/**
 * Get last modified date
 */
function getLastModified(dirPath) {
  try {
    // Try git last commit date
    try {
      const lastCommit = execSync('git log -1 --format=%cd --date=short', {
        cwd: dirPath,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore']
      }).trim();
      if (lastCommit) {
        return lastCommit;
      }
    } catch (error) {
      // Fall through to file system date
    }

    // Use folder modification time
    const stats = fs.statSync(dirPath);
    return new Date(stats.mtime).toISOString().split('T')[0];
  } catch (error) {
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Convert project name to kebab-case for file naming
 */
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Detect a project in a directory
 */
function detectProject(dirPath, config) {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return null;
  }

  // Check if should be excluded
  if (shouldExclude(dirPath, config.excludePatterns)) {
    return null;
  }

  // Check if it's a project
  if (!isProject(dirPath, config.projectIndicators)) {
    return null;
  }

  const projectType = detectProjectType(dirPath);
  const name = extractProjectName(dirPath, projectType);
  const description = extractDescription(dirPath, projectType);
  const repositoryUrl = extractRepositoryUrl(dirPath);
  const technologies = extractTechnologies(dirPath, projectType);
  const lastModified = getLastModified(dirPath);

  return {
    name,
    slug: toKebabCase(name),
    description,
    type: projectType,
    path: dirPath,
    repositoryUrl,
    technologies,
    lastModified,
    status: config.defaultStatus || 'In Progress',
    progress: config.defaultProgress || 0
  };
}

/**
 * Recursively scan directory for projects
 */
function scanDirectory(dirPath, config, currentDepth = 0) {
  const projects = [];

  if (currentDepth > config.maxDepth) {
    return projects;
  }

  if (currentDepth < config.minDepth) {
    // Not deep enough yet, continue scanning
    try {
      const entries = fs.readdirSync(dirPath);
      for (const entry of entries) {
        const entryPath = path.join(dirPath, entry);
        try {
          if (fs.statSync(entryPath).isDirectory()) {
            projects.push(...scanDirectory(entryPath, config, currentDepth + 1));
          }
        } catch (error) {
          // Skip entries we can't access
        }
      }
    } catch (error) {
      // Skip directories we can't read
    }
    return projects;
  }

  // Check if current directory is a project
  const project = detectProject(dirPath, config);
  if (project) {
    projects.push(project);
    // Don't scan inside a project directory
    return projects;
  }

  // Continue scanning subdirectories
  try {
    const entries = fs.readdirSync(dirPath);
    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry);
      try {
        if (fs.statSync(entryPath).isDirectory()) {
          projects.push(...scanDirectory(entryPath, config, currentDepth + 1));
        }
      } catch (error) {
        // Skip entries we can't access
      }
    }
  } catch (error) {
    // Skip directories we can't read
  }

  return projects;
}

module.exports = {
  detectProject,
  scanDirectory,
  toKebabCase
};

