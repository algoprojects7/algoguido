import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * All production data has been migrated to the database and is managed
 * via the Admin Panel and the POST /api/seed/run endpoint.
 *
 * This file is intentionally left empty of static seed data.
 * Do NOT re-add hardcoded records here.
 */
async function main() {
  console.log('ℹ️  No static seed data — all records are managed via the database.');
  console.log('   To seed production data, call: POST /api/seed/run');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
