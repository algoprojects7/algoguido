const nodeExternals = require('webpack-node-externals');
const fs = require('fs');
const path = require('path');

module.exports = function (options, webpack) {
  try {
    // Copy Prisma query engines to dist folder so they are bundled with the serverless function
    const prismaClientDir = path.join(path.dirname(require.resolve('@prisma/client')), '../../.prisma/client');
    const files = fs.readdirSync(prismaClientDir);
    const engines = files.filter(f => f.endsWith('.node'));
    
    // Ensure dist folder exists
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Ensure api folder exists
    const apiDir = path.join(__dirname, 'api');
    if (!fs.existsSync(apiDir)) {
      fs.mkdirSync(apiDir, { recursive: true });
    }
    
    for (const file of engines) {
      // Copy to dist/
      fs.copyFileSync(path.join(prismaClientDir, file), path.join(distDir, file));

      // Copy to apps/api/ root (matches /var/task/apps/api)
      fs.copyFileSync(path.join(prismaClientDir, file), path.join(__dirname, file));

      // Copy to apps/api/api/ (matches the gateway directory)
      fs.copyFileSync(path.join(prismaClientDir, file), path.join(apiDir, file));

      console.log(`🚀 Copied Prisma engine: ${file} to dist/, root, and api/`);
    }
  } catch (error) {
    console.warn('⚠️ Warning: Failed to copy Prisma engines:', error.message);
  }

  return {
    ...options,
    externals: [
      nodeExternals({
        allowlist: [
          /^@algoguido\//
        ],
      }),
    ],
  };
};
