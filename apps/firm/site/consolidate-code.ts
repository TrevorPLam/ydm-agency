import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(__dirname, 'app');
const COMPONENTS_DIR = path.join(__dirname, 'components');
const OUTPUT_FILE = path.join(__dirname, 'code.md');

const CODE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.css', '.json'];

function isCodeFile(filePath: string): boolean {
  return CODE_EXTENSIONS.includes(path.extname(filePath));
}

function getAllCodeFiles(dir: string, files: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules and .next directories
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        getAllCodeFiles(fullPath, files);
      }
    } else if (entry.isFile() && isCodeFile(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

function getRelativePath(filePath: string, baseDir: string): string {
  return path.relative(baseDir, filePath).replace(/\\/g, '/');
}

function getLanguageFromFile(filePath: string): string {
  const ext = path.extname(filePath);
  const languageMap: Record<string, string> = {
    '.ts': 'typescript',
    '.tsx': 'typescript',
    '.js': 'javascript',
    '.jsx': 'javascript',
    '.css': 'css',
    '.json': 'json'
  };
  return languageMap[ext] || 'text';
}

function generateMarkdown(): string {
  let markdown = '# UI Code Consolidation\n\n';
  markdown += 'This document contains all UI-related code files from the firm site.\n\n';
  markdown += '---\n\n';

  // Process app directory
  if (fs.existsSync(APP_DIR)) {
    markdown += '## App Directory\n\n';
    const appFiles = getAllCodeFiles(APP_DIR);
    const sortedAppFiles = appFiles.sort();

    for (const file of sortedAppFiles) {
      const relativePath = getRelativePath(file, __dirname);
      const language = getLanguageFromFile(file);
      const content = fs.readFileSync(file, 'utf-8');

      markdown += `### ${relativePath}\n\n`;
      markdown += '```' + language + '\n';
      markdown += content;
      markdown += '\n```\n\n';
      markdown += '---\n\n';
    }
  }

  // Process components directory
  if (fs.existsSync(COMPONENTS_DIR)) {
    markdown += '## Components Directory\n\n';
    const componentFiles = getAllCodeFiles(COMPONENTS_DIR);
    const sortedComponentFiles = componentFiles.sort();

    for (const file of sortedComponentFiles) {
      const relativePath = getRelativePath(file, __dirname);
      const language = getLanguageFromFile(file);
      const content = fs.readFileSync(file, 'utf-8');

      markdown += `### ${relativePath}\n\n`;
      markdown += '```' + language + '\n';
      markdown += content;
      markdown += '\n```\n\n';
      markdown += '---\n\n';
    }
  }

  return markdown;
}

function main() {
  console.log('Consolidating UI code files...');
  
  try {
    const markdown = generateMarkdown();
    fs.writeFileSync(OUTPUT_FILE, markdown, 'utf-8');
    console.log(`Successfully consolidated code to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Error consolidating code:', error);
    process.exit(1);
  }
}

main();
