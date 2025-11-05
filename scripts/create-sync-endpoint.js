#!/usr/bin/env node

/**
 * Simple HTTP server endpoint for syncing projects
 * This can be integrated with Docusaurus dev server
 */

const http = require('http');
const { exec } = require('child_process');
const path = require('path');

const PORT = 3069;

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/api/sync-projects' && req.method === 'POST') {
    console.log('Syncing projects...');
    
    const scriptPath = path.join(__dirname, 'auto-discover-projects.js');
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
        return;
      }

      console.log(stdout);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        success: true, 
        message: 'Projects synced successfully',
        output: stdout 
      }));
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Sync API server running on http://localhost:${PORT}`);
  console.log(`POST to http://localhost:${PORT}/api/sync-projects to sync projects`);
});

