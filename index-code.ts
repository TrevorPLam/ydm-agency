import fs from 'fs';
import path from 'path';

const REPO_ROOT = path.join(__dirname);
const OUTPUT_FILE = path.join(__dirname, 'code-index.md');

// Directories to exclude
const EXCLUDE_DIRS = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  'out',
  '.turbo',
  'coverage',
  '.vitest',
  'tmp',
  'temp'
];

// Native code file extensions
const CODE_EXTENSIONS = [
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css',
  '.scss',
  '.sass',
  '.json',
  '.md',
  '.mdx',
  '.html',
  '.vue',
  '.svelte'
];

function isCodeFile(filePath: string): boolean {
  return CODE_EXTENSIONS.includes(path.extname(filePath));
}

function shouldExcludeDir(dirName: string): boolean {
  return EXCLUDE_DIRS.includes(dirName) || dirName.startsWith('.');
}

function getAllCodeFiles(dir: string, files: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!shouldExcludeDir(entry.name)) {
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

function getFileStats(filePath: string): { size: number; lines: number } {
  const stats = fs.statSync(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').length;
  return { size: stats.size, lines };
}

function categorizeByExtension(files: string[]): Record<string, string[]> {
  const categories: Record<string, string[]> = {};
  
  for (const file of files) {
    const ext = path.extname(file);
    if (!categories[ext]) {
      categories[ext] = [];
    }
    categories[ext].push(file);
  }
  
  return categories;
}

function generateMarkdown(): string {
  let markdown = '# Repository Code Index\n\n';
  markdown += 'Generated: ' + new Date().toISOString() + '\n';
  markdown += 'Repository Root: ' + REPO_ROOT + '\n\n';
  markdown += '---\n\n';

  const allFiles = getAllCodeFiles(REPO_ROOT);
  const sortedFiles = allFiles.sort();
  const categories = categorizeByExtension(sortedFiles);

  // Summary statistics
  markdown += '## Summary\n\n';
  markdown += '- **Total Files**: ' + allFiles.length + '\n';
  markdown += '- **Extensions**: ' + Object.keys(categories).length + '\n\n';
  
  markdown += '### Files by Extension\n\n';
  for (const [ext, files] of Object.entries(categories).sort()) {
    markdown += '- ' + ext + ': ' + files.length + ' files\n';
  }
  markdown += '\n---\n\n';

  // Detailed index by directory
  markdown += '## Detailed Index\n\n';
  
  const filesByDir: Record<string, string[]> = {};
  
  for (const file of sortedFiles) {
    const relativePath = getRelativePath(file, REPO_ROOT);
    const dirName = path.dirname(relativePath);
    
    if (!filesByDir[dirName]) {
      filesByDir[dirName] = [];
    }
    filesByDir[dirName].push(relativePath);
  }

  // Sort directories
  const sortedDirs = Object.keys(filesByDir).sort();
  
  for (const dir of sortedDirs) {
    const dirDisplay = dir || '(root)';
    markdown += '### ' + dirDisplay + '\n\n';
    markdown += '| File | Extension | Size (bytes) | Lines |\n';
    markdown += '|------|-----------|--------------|-------|\n';
    
    for (const file of filesByDir[dir].sort()) {
      const fullPath = path.join(REPO_ROOT, file);
      const ext = path.extname(file);
      const stats = getFileStats(fullPath);
      
      markdown += '| `' + file + '` | ' + ext + ' | ' + stats.size + ' | ' + stats.lines + ' |\n';
    }
    
    markdown += '\n';
  }

  // Full file list
  markdown += '---\n\n';
  markdown += '## Complete File List\n\n';
  markdown += '```\n';
  for (const file of sortedFiles) {
    markdown += getRelativePath(file, REPO_ROOT) + '\n';
  }
  markdown += '```\n';

  return markdown;
}

function main() {
  console.log('Indexing all native code files in repository...');
  
  try {
    const markdown = generateMarkdown();
    fs.writeFileSync(OUTPUT_FILE, markdown, 'utf-8');
    console.log('Successfully generated code index at ' + OUTPUT_FILE);
  } catch (error) {
    console.error('Error indexing code:', error);
    process.exit(1);
  }
}

main();
