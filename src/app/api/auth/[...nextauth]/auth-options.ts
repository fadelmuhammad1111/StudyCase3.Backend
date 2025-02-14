import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🛠️ Mengotorisasi Pengguna:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Error: Email atau password kosong!");
          throw new Error("Email dan password harus diisi!");
        }

        // Cari user di database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log("❌ Error: User tidak ditemukan!");
          throw new Error("Email tidak ditemukan!");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        console.log("🔍 Pengecekan Password:", isValid);

        if (!isValid) {
          console.log("❌ Error: Password salah!");
          throw new Error("Password salah!");
        }

        console.log("✅ Login Berhasil:", user);
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("🔄 Callback Redirect:", { url, baseUrl });
      if (url.startsWith("/api/auth/error")) {
        return `${baseUrl}/auth/login?error=invalid_credentials`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};