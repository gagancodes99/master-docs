#!/usr/bin/env node

/**
 * Debug script for auto-discovery
 * Runs with verbose output and error logging
 */

const fs = require('fs');
const path = require('path');

// Setup logging to file
const logFile = path.join(__dirname, '../discovery-debug.log');
const logMessages = [];

const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;

function writeToLog(level, ...args) {
  const message = args.join(' ');
  logMessages.push(`[${level}] ${message}`);
}

console.log = function(...args) {
  originalLog(...args);
  writeToLog('LOG', ...args);
};

console.error = function(...args) {
  originalError(...args);
  writeToLog('ERROR', ...args);
};

console.warn = function(...args) {
  originalWarn(...args);
  writeToLog('WARN', ...args);
};

console.log('='.repeat(60));
console.log('DEBUG MODE: Auto-Discovery Script');
console.log('='.repeat(60));
console.log(`Timestamp: ${new Date().toISOString()}`);
console.log(`Working directory: ${process.cwd()}`);
console.log(`Node version: ${process.version}`);
console.log('='.repeat(60));
console.log('');

// Run the auto-discovery script
try {
  require('./auto-discover-projects.js');
  console.log('');
  console.log('='.repeat(60));
  console.log('✅ Script completed successfully');
  console.log('='.repeat(60));
} catch (error) {
  console.error('');
  console.error('='.repeat(60));
  console.error('❌ SCRIPT FAILED');
  console.error('='.repeat(60));
  console.error('Error Message:', error.message);
  console.error('Error Stack:', error.stack);
  console.error('='.repeat(60));
  writeToLog('FATAL ERROR', 'Message: ' + error.message);
  writeToLog('FATAL ERROR', 'Stack: ' + error.stack);
} finally {
  // Write all log messages to file
  try {
    fs.writeFileSync(logFile, logMessages.join('\n') + '\n');
    console.log('');
    console.log(`📝 Full log saved to: ${logFile}`);
    console.log('');
  } catch (writeError) {
    console.error('Failed to write log file:', writeError.message);
  }
  
  // Keep process alive for a moment to ensure output is visible
  setTimeout(() => {
    process.exit(0);
  }, 1000);
}

