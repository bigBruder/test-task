import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const jobs = await prisma.job.findMany();
  return NextResponse.json(jobs);
}
