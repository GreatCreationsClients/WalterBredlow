const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Define the port for the web server
const PORT = 8000;

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL and get the pathname
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  
  // Handle the save-config endpoint
  if (pathname === '/save-config' && req.method === 'POST') {
    handleSaveConfig(req, res);
    return;
  }
  
  // If the path ends with '/', serve index.html
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Handle editor page
  if (pathname === '/editor') {
    pathname = '/indexedit.html';
  }
  
  // Get the file path
  const filePath = path.join(__dirname, pathname);
  
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // If the file doesn't exist, return 404
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    
    // Get the file extension
    const ext = path.extname(filePath);
    
    // Set the content type based on the file extension
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

// Handle saving config.js
function handleSaveConfig(req, res) {
  let body = '';
  
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      const configPath = path.join(__dirname, 'config.js');
      
      // Write the updated config file
      fs.writeFile(configPath, data.content, (err) => {
        if (err) {
          console.error('Error writing config file:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Error writing file' }));
          return;
        }
        
        console.log('Config file updated successfully');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Invalid JSON' }));
    }
  });
}

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Editor available at http://localhost:${PORT}/editor`);
});
