import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";
import { getUserData } from "@/utils/getDataAlbionUser";

export async function POST(request) {
  try {
    const data = await request.json();
    const existingUser = await prisma.user.findUnique({
      where: {
        username: data.username, // Puedes usar `username` o `id` en lugar de `email` según tus necesidades
      },
    });

    if (existingUser) {
      return NextResponse.json({
        data: "",
        message: "Usuario ya existe",
        status: 200,
      });
    }
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUserByEmail) {
      return NextResponse.json({
        data: "",
        message: "El correo ya existe",
        status: 200,
      });
    }
    const userAlbion = await getUserData(data.username);
    if (userAlbion.error) {
      return NextResponse.json({ error: userAlbion.error }, { status: 400 });
    }
    const userExistsInAlbion =
      userAlbion.Name.toLowerCase() === data.username.toLowerCase()
        ? true
        : false;
    if (!userExistsInAlbion) {
      return NextResponse.json({
        data: "",
        message: "No eres parte del gremio",
        status: 200,
      });
    }

    const hashedPass = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        guild: data.guild,
        email: data.email,
        idAlbion: userAlbion.Id,
        password: hashedPass,
      },
    });
    await prisma.money.create({
      data: {
        amount: 0,
        userId: newUser.id,
      },
    });
    const { password: _, ...user } = newUser;
    return NextResponse.json({
      data: user,
      message: "Registro exitoso",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      data: null,
      message: error.message || "Error desconocido",
      status: 500,
    });
  }
}
