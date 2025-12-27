const fs = require('fs');
const path = require('path');

// Read the file as text first
let content = fs.readFileSync('public/slokas.seed.json', 'utf8');

// Replace newlines within quoted strings with spaces
// This regex looks for content within quotes that contains newlines
content = content.replace(/"sloka":\s*"([^"]*)"/g, (match, sloka) => {
  // Replace any newlines and multiple spaces with a single space
  const cleaned = sloka.replace(/\s+/g, ' ').trim();
  return `"sloka": "${cleaned}"`;
});

// Write back
fs.writeFileSync('public/slokas.seed.json', content, 'utf8');
console.log('Fixed slokas.seed.json');
