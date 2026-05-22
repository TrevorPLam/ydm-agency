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
      getAllCodeFiles(fullPath, files);
    } else if (entry.isFile() && isCodeFile(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

function getRelativePath(filePath: string, baseDir: string): string {
  return path.relative(baseDir, filePath).replace(/\\/g, '/');
}

function consolidateCodeFiles(): void {
  const appFiles = getAllCodeFiles(APP_DIR);
  const componentFiles = getAllCodeFiles(COMPONENTS_DIR);
  const codeFiles = [...appFiles, ...componentFiles];
  const relativeDir = getRelativePath(APP_DIR, path.join(__dirname));

  let markdown = '# Code Consolidation\n\n';
  markdown += `Generated from: app and components directories\n\n`;
  markdown += `Total files: ${codeFiles.length}\n\n`;
  markdown += '---\n\n';

  for (const file of codeFiles) {
    const relativePath = getRelativePath(file, path.join(__dirname));
    const content = fs.readFileSync(file, 'utf-8');
    const ext = path.extname(file).replace('.', '');

    markdown += `## ${relativePath}\n\n`;
    markdown += '```' + ext + '\n';
    markdown += content;
    markdown += '\n```\n\n';
    markdown += '---\n\n';
  }

  fs.writeFileSync(OUTPUT_FILE, markdown, 'utf-8');
  console.log(`✅ Consolidated ${codeFiles.length} files into ${OUTPUT_FILE}`);
}

consolidateCodeFiles();
