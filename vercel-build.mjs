#!/usr/bin/env node

// vercel-build.mjs - Custom build script for Vercel deployment
import { execSync } from 'child_process';
import fs from 'fs';

// Check if we're in the correct environment
console.log('Current directory:', process.cwd());
console.log('Directory contents:', fs.readdirSync('.'));

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

if (!fs.existsSync('dist/public')) {
  fs.mkdirSync('dist/public', { recursive: true });
}

console.log('Building client...');
try {
  // Build client side using vite directly with explicit path
  execSync('npx vite build --outDir ../dist/public', { 
    stdio: 'inherit',
    cwd: './client'
  });
  console.log('✅ Client build successful!');
} catch (error) {
  console.error('❌ Client build failed:', error);
  process.exit(1);
}

console.log('Building server...');
try {
  // Build server side using esbuild
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { 
    stdio: 'inherit' 
  });
  console.log('✅ Server build successful!');
} catch (error) {
  console.error('❌ Server build failed:', error);
  process.exit(1);
}

console.log('✅ Build completed successfully!');