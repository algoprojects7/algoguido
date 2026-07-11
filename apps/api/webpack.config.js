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
    
    for (const file of engines) {
      fs.copyFileSync(path.join(prismaClientDir, file), path.join(distDir, file));
      console.log(`🚀 Copied Prisma engine: ${file} to dist/`);
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
