import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@seacatering.com' },
    update: {},
    create: {
      email: 'admin@seacatering.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      isAdmin: true,
    },
  });

  // Create test user
  const userPassword = await bcrypt.hash('User123!', 12);
  const user = await prisma.user.upsert({
    where: { email: 'brian@example.com' },
    update: {},
    create: {
      email: 'brian@example.com',
      name: 'Brian Manager',
      password: userPassword,
      role: 'USER',
      isAdmin: false,
    },
  });

  console.log({ admin, user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });