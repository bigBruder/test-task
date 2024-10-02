import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(_, { params }) {
  const { id } = params;
  return NextResponse.json(
    await prisma.job.findUnique({
      where: { id: parseInt(id) },
    })
  );
}

export async function PUT(req, { params }) {
  const { id } = params;
  console.info("🚀 ~ PUT ~ req:", req);
  const { title, description } = await req.json();
  return NextResponse.json(
    await prisma.job.update({
      where: { id: parseInt(id) },
      data: { title, description },
    })
  );
}
