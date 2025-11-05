#!/usr/bin/env node

/**
 * Installation Verification and Auto-Fix Script
 * Detects platform and automatically fixes common installation issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';
const isLinux = process.platform === 'linux';

console.log('🔍 Verifying installation...');
console.log(`   Platform: ${process.platform} (${isWindows ? 'Windows' : isMac ? 'macOS' : 'Linux'})`);
console.log(`   Node.js: ${process.version}`);
console.log(`   Current directory: ${process.cwd()}\n`);

// Check for spaces in path (Windows issue)
function checkPathForSpaces() {
  const currentPath = process.cwd();
  if (isWindows && currentPath.includes(' ')) {
    console.warn('⚠️  WARNING: Path contains spaces which can cause issues on Windows');
    console.warn(`   Current path: ${currentPath}`);
    console.warn('   Consider moving the project to a path without spaces (e.g., C:\\projects\\master-docs)\n');
    return false;
  }
  return true;
}

// Check if node_modules exists and is valid
function checkNodeModules() {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found!');
    console.error('   Make sure you\'re in the project root directory.\n');
    return false;
  }
  
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('📦 node_modules not found - needs installation\n');
    return false;
  }
  
  // Check if critical Docusaurus packages exist
  const criticalPackages = [
    '@docusaurus/core',
    '@docusaurus/preset-classic',
    '@docusaurus/logger'
  ];
  
  let missingPackages = [];
  for (const pkg of criticalPackages) {
    const pkgPath = path.join(nodeModulesPath, pkg);
    if (!fs.existsSync(pkgPath)) {
      missingPackages.push(pkg);
    }
  }
  
  if (missingPackages.length > 0) {
    console.warn(`⚠️  Missing critical packages: ${missingPackages.join(', ')}`);
    console.warn('   node_modules appears to be incomplete or corrupted\n');
    return false;
  }
  
  // Check if @docusaurus/logger has the expected file
  const loggerIndexPath = path.join(nodeModulesPath, '@docusaurus', 'logger', 'lib', 'index.js');
  if (!fs.existsSync(loggerIndexPath)) {
    console.warn('⚠️  @docusaurus/logger appears to be corrupted');
    console.warn('   Missing: node_modules/@docusaurus/logger/lib/index.js\n');
    return false;
  }
  
  console.log('✅ node_modules appears to be valid\n');
  return true;
}

// Clean installation
function cleanInstall() {
  console.log('🧹 Cleaning installation...\n');
  
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  const packageLockPath = path.join(process.cwd(), 'package-lock.json');
  
  try {
    // Remove node_modules
    if (fs.existsSync(nodeModulesPath)) {
      console.log('   Removing node_modules...');
      if (isWindows) {
        // Use rimraf or PowerShell on Windows
        try {
          execSync(`powershell -Command "Remove-Item -Recurse -Force '${nodeModulesPath}'"`, { stdio: 'inherit' });
        } catch (error) {
          // Fallback to rmdir
          execSync(`rmdir /s /q "${nodeModulesPath}"`, { stdio: 'inherit' });
        }
      } else {
        execSync(`rm -rf "${nodeModulesPath}"`, { stdio: 'inherit' });
      }
      console.log('   ✅ node_modules removed\n');
    }
    
    // Remove package-lock.json
    if (fs.existsSync(packageLockPath)) {
      console.log('   Removing package-lock.json...');
      fs.unlinkSync(packageLockPath);
      console.log('   ✅ package-lock.json removed\n');
    }
    
    // Clear npm cache
    console.log('   Clearing npm cache...');
    try {
      execSync('npm cache clean --force', { stdio: 'inherit' });
      console.log('   ✅ npm cache cleared\n');
    } catch (error) {
      console.warn('   ⚠️  Could not clear npm cache (non-critical)\n');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
    return false;
  }
}

// Install dependencies
function installDependencies() {
  console.log('📦 Installing dependencies...\n');
  
  try {
    // Try normal install first
    console.log('   Running npm install...');
    execSync('npm install', { stdio: 'inherit' });
    console.log('\n✅ Dependencies installed successfully!\n');
    return true;
  } catch (error) {
    console.warn('\n⚠️  Standard install failed, trying with --legacy-peer-deps...\n');
    try {
      execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
      console.log('\n✅ Dependencies installed with --legacy-peer-deps!\n');
      return true;
    } catch (error2) {
      console.error('\n❌ Installation failed:', error2.message);
      console.error('\nPlease try manually:');
      console.error('   1. Delete node_modules and package-lock.json');
      console.error('   2. Run: npm cache clean --force');
      console.error('   3. Run: npm install\n');
      return false;
    }
  }
}

// Main verification and fix function
function verifyAndFix() {
  // Check path
  const pathOk = checkPathForSpaces();
  
  // Check node_modules
  const nodeModulesOk = checkNodeModules();
  
  if (nodeModulesOk) {
    console.log('✅ Installation verified successfully!\n');
    return true;
  }
  
  // Auto-fix if needed
  console.log('🔧 Attempting to fix installation automatically...\n');
  
  if (!cleanInstall()) {
    return false;
  }
  
  if (!installDependencies()) {
    return false;
  }
  
  // Verify again
  if (checkNodeModules()) {
    console.log('✅ Installation fixed and verified!\n');
    return true;
  } else {
    console.error('❌ Installation fix failed. Please try manual steps from TROUBLESHOOTING.md\n');
    return false;
  }
}

// Run if called directly
if (require.main === module) {
  const success = verifyAndFix();
  process.exit(success ? 0 : 1);
}

module.exports = { verifyAndFix, checkNodeModules, checkPathForSpaces };

