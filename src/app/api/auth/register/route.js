import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

async function getData() {
  try {
    const res = await fetch(
      "https://gameinfo.albiononline.com/api/gameinfo/guilds/4ZOavdN2RyqcUGw-yG-v8w/members"
    );
    return res.json();
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}

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
    const dataAlbion = await getData();
    console.log(dataAlbion.username.Id);
    if (dataAlbion.error) {
      return NextResponse.json({ error: dataAlbion.error }, { status: 400 });
    }

    const userExistsInAlbion = dataAlbion.some(
      (member) => member.Name.toLowerCase() === data.username.toLowerCase()
    );

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
        idAlbion: dataAlbion.username.Id,
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
