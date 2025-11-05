#!/usr/bin/env node

/**
 * Wrapper script to run commands with error capture
 * Ensures errors are visible and logged
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const scriptName = process.argv[2];
const scriptPath = path.join(__dirname, scriptName);

if (!fs.existsSync(scriptPath)) {
  console.error(`❌ Script not found: ${scriptPath}`);
  process.exit(1);
}

console.log(`\n▶️  Running: ${scriptName}\n`);

const child = spawn('node', [scriptPath], {
  stdio: 'inherit',
  shell: false
});

child.on('error', (error) => {
  console.error('\n');
  console.error('='.repeat(60));
  console.error('❌ SCRIPT EXECUTION ERROR');
  console.error('='.repeat(60));
  console.error('Error:', error.message);
  console.error('='.repeat(60));
  console.error('\n');
  
  // Write to error log
  const errorLogPath = path.join(__dirname, '../prestart-error.log');
  fs.writeFileSync(errorLogPath, 
    `Error at ${new Date().toISOString()}\n` +
    `Script: ${scriptName}\n` +
    `Error: ${error.message}\n` +
    `Stack: ${error.stack || 'N/A'}\n`
  );
  console.error(`📝 Error saved to: ${errorLogPath}\n`);
  
  // Wait before exit to ensure error is visible
  setTimeout(() => {
    process.exit(1);
  }, 3000);
});

child.on('exit', (code) => {
  if (code !== 0) {
    console.error(`\n⚠️  Script exited with code ${code}\n`);
    // Wait before exit
    setTimeout(() => {
      process.exit(code);
    }, 2000);
  } else {
    console.log(`\n✅ Script completed successfully\n`);
  }
});

