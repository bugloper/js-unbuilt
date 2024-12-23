import fs from "node:fs";
import path from "node:path";

/**
 * Generates an HTML link tag for stylesheets with fingerprinted filename
 * @param {string} name - Base name of the stylesheet without extension
 * @param {Object} [attributes={}] - HTML attributes to add to the link tag
 * @returns {string} HTML link tag
 */
export function stylesheetLinkTag(name, attributes = {}) {
  const publicDir = path.resolve(process.cwd(), 'public', 'stylesheets');
  const files = fs.readdirSync(publicDir);
  
  // Find the fingerprinted file that matches the base name
  const baseFileName = `${name}.css`;
  const matchingFile = files.find(file => file.startsWith(name) && file.endsWith('.css'));
  
  if (!matchingFile) {
    console.warn(`Warning: Could not find stylesheet ${baseFileName}`);
    return '';
  }

  // Convert attributes object to string
  const attributesString = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  return `<link rel="stylesheet" href="/stylesheets/${matchingFile}" ${attributesString}>`;
}

/**
 * Generates an HTML script tag for JavaScript files with fingerprinted filename
 * @param {string} name - Base name of the JavaScript file without extension
 * @param {Object} [attributes={}] - HTML attributes to add to the script tag
 * @returns {string} HTML script tag
 */
export function javascriptIncludeTag(name, attributes = {}) {
  const publicDir = path.resolve(process.cwd(), 'public', 'javascripts');
  const files = fs.readdirSync(publicDir);
  
  // Find the fingerprinted file that matches the base name
  const baseFileName = `${name}.js`;
  const matchingFile = files.find(file => file.startsWith(name) && file.endsWith('.js'));
  
  if (!matchingFile) {
    console.warn(`Warning: Could not find JavaScript file ${baseFileName}`);
    return '';
  }

  // Convert attributes object to string
  const attributesString = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  return `<script src="/javascripts/${matchingFile}" ${attributesString}></script>`;
}

/**
 * Generates an image URL with fingerprinted filename
 * @param {string} name - Base name of the image without extension
 * @param {string} extension - File extension (e.g., 'png', 'jpg')
 * @returns {string} Image URL
 */
export function imageUrl(name, extension) {
  const publicDir = path.resolve(process.cwd(), 'public', 'images');
  const files = fs.readdirSync(publicDir);
  
  // Find the fingerprinted file that matches the base name and extension
  const baseFileName = `${name}.${extension}`;
  const matchingFile = files.find(file => file.startsWith(name) && file.endsWith(`.${extension}`));
  
  if (!matchingFile) {
    console.warn(`Warning: Could not find image ${baseFileName}`);
    return '';
  }

  return `/images/${matchingFile}`;
}
