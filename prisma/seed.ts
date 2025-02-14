import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; // Ganti bcrypt dengan bcryptjs

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ Admin user berhasil ditambahkan");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
