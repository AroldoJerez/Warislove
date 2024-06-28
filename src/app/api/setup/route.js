import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request) {
  try {
    const data = await request.json();


    const guildExistingAlbion = dataAlbion.some(
      (member) => member.Name.toLowerCase() === data.username.toLowerCase()
    );

    if (!guildExistingAlbion) {
      return NextResponse.json(
        { error: "Tu gremio no existe" },
        { status: 400 }
      );
    }
    const newUser = await db.user.create({
      data: {
        username: data.username,
        guild: data.guild,
        email: data.email,
        password: hashedPass,
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
