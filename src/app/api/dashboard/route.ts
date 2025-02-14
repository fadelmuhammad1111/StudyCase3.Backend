import { NextResponse } from "next/server";
import prisma from "prisma/"; // Sesuaikan dengan setup Prisma

export async function GET() {
  try {
    const courses = await prisma.course.count();
    const instructors = await prisma.instructor.count();
    const students = await prisma.student.count();
    const rooms = await prisma.room.count();

    return NextResponse.json({ courses, instructors, students, rooms });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
