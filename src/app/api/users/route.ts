import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      include: { money: true },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, amount } = body;

    if (typeof userId !== "number" || typeof amount !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const updatedMoney = await prisma.money.updateMany({
      where: { userId },
      data: { amount },
    });

    if (updatedMoney.count === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedMoney, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating amount" },
      { status: 500 }
    );
  }
}
