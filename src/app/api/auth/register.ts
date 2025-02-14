import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return res.status(400).json({ message: "Email sudah terdaftar" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

const newUser = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    role: 'user', // or whatever default role you want to assign
  },
});

  return res.status(201).json({ message: "User berhasil dibuat", user: newUser });
}
