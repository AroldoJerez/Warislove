import { NextResponse } from "next/server";
import db from "@/libs/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const data = await request.json();

    const existingUser = await db.user.findUnique({
      where: {
        username: data.username, // Puedes usar `username` o `id` en lugar de `email` según tus necesidades
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Usuario ya existe" }, { status: 400 });
    }
    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "El correo electrónico ya existe" },
        { status: 400 }
      );
    }
    const hashedPass = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        username: data.username,
        guild: data.guild,
        email: data.email,
        password: hashedPass,
      },
    });
    await db.money.create({
      data: {
        amount: 0,
        userId: newUser.id,
      },
    });
    const { password: _, ...user } = newUser;
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
