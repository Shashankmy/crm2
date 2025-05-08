#!/bin/bash

# Create the output directories
mkdir -p dist/public

# Build the client (frontend)
cd client
npm install --no-save
npx vite build --outDir ../dist/public
cd ..

# Build the server (backend)
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist