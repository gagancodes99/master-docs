#!/usr/bin/env node

/**
 * Multi-Folder Project Discovery
 * Scans configured source folders and automatically discovers projects,
 * then generates documentation files
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { scanDirectory } = require('./project-detector');
const { generateProjectDoc } = require('./generate-project-doc');

const configPath = path.join(__dirname, '../project-discovery.config.json');

/**
 * Load configuration
 */
function loadConfig() {
  if (!fs.existsSync(configPath)) {
    console.error('❌ Configuration file not found:', configPath);
    console.log('💡 Creating default configuration...');
    createDefaultConfig();
    return loadConfig();
  }

  try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configContent);
    
    // Expand ~ to home directory
    if (config.sourceFolders) {
      config.sourceFolders = config.sourceFolders.map(folder => {
        if (folder.startsWith('~/')) {
          return folder.replace('~', os.homedir());
        }
        return folder;
      });
    }

    // Set defaults
    config.outputDir = config.outputDir || 'docs/projects';
    config.excludePatterns = config.excludePatterns || [];
    config.projectIndicators = config.projectIndicators || ['package.json', '.git'];
    config.minDepth = config.minDepth !== undefined ? config.minDepth : 1;
    config.maxDepth = config.maxDepth !== undefined ? config.maxDepth : 3;
    config.defaultStatus = config.defaultStatus || 'In Progress';
    config.defaultProgress = config.defaultProgress || 0;

    return config;
  } catch (error) {
    console.error('❌ Error loading configuration:', error.message);
    process.exit(1);
  }
}

/**
 * Create default configuration file
 */
function createDefaultConfig() {
  const defaultConfig = {
    sourceFolders: [
      "~/Desktop/Work"
    ],
    excludePatterns: [
      "node_modules",
      ".git",
      "dist",
      "build",
      ".next",
      ".docusaurus",
      "coverage",
      ".DS_Store",
      "MasterDocs"
    ],
    projectIndicators: [
      "package.json",
      "requirements.txt",
      "pom.xml",
      "Cargo.toml",
      ".git"
    ],
    autoCreateDocs: true,
    defaultStatus: "In Progress",
    defaultProgress: 0,
    outputDir: "docs/projects",
    minDepth: 1,
    maxDepth: 3
  };

  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf8');
  console.log('✅ Created default configuration at:', configPath);
}

/**
 * Check if a project doc already exists
 */
function projectDocExists(slug, outputDir) {
  const docPath = path.join(__dirname, '..', outputDir, `${slug}.md`);
  return fs.existsSync(docPath);
}

/**
 * Main discovery function
 */
function discoverProjects() {
  console.log('🔍 Starting multi-folder project discovery...\n');

  const config = loadConfig();
  
  console.log('📋 Configuration:');
  console.log(`   Source folders: ${config.sourceFolders.length}`);
  config.sourceFolders.forEach(folder => {
    console.log(`   - ${folder}`);
  });
  console.log(`   Output directory: ${config.outputDir}`);
  console.log(`   Min depth: ${config.minDepth}, Max depth: ${config.maxDepth}\n`);

  const allProjects = [];
  const outputDir = path.join(__dirname, '..', config.outputDir);

  // Scan each source folder
  for (const sourceFolder of config.sourceFolders) {
    if (!fs.existsSync(sourceFolder)) {
      console.warn(`⚠️  Source folder not found: ${sourceFolder}`);
      continue;
    }

    console.log(`📂 Scanning: ${sourceFolder}`);
    try {
      const projects = scanDirectory(sourceFolder, config, 0);
      console.log(`   Found ${projects.length} project(s)`);
      allProjects.push(...projects);
    } catch (error) {
      console.error(`   ❌ Error scanning ${sourceFolder}:`, error.message);
    }
  }

  console.log(`\n📊 Total projects discovered: ${allProjects.length}\n`);

  if (allProjects.length === 0) {
    console.log('ℹ️  No projects found. Check your configuration and source folders.');
    return { discovered: 0, created: 0, updated: 0 };
  }

  // Generate documentation for each project
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const project of allProjects) {
    const exists = projectDocExists(project.slug, config.outputDir);
    
    if (config.autoCreateDocs) {
      try {
        const docPath = generateProjectDoc(project, outputDir);
        if (exists) {
          console.log(`   ✏️  Updated: ${project.name} (${project.slug}.md)`);
          updated++;
        } else {
          console.log(`   ✨ Created: ${project.name} (${project.slug}.md)`);
          created++;
        }
      } catch (error) {
        console.error(`   ❌ Error creating doc for ${project.name}:`, error.message);
        skipped++;
      }
    } else {
      console.log(`   ℹ️  Would create: ${project.name} (autoCreateDocs: false)`);
    }
  }

  console.log(`\n📈 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total: ${allProjects.length}`);

  return {
    discovered: allProjects.length,
    created,
    updated,
    skipped
  };
}

// Run if called directly
if (require.main === module) {
  discoverProjects();
}

module.exports = {
  discoverProjects,
  loadConfig
};

