import { NextResponse } from "next/server";
import db from "@/libs/db";

async function getDataGuild() {
  try {
    const res = await fetch(
      "https://gameinfo.albiononline.com/api/gameinfo/guilds/" + data.guildId
    );
    return res.json();
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log(data);
   /*  const dataAlbionGuild = await getDataGuild();
    const guildExistingAlbion = dataAlbionGuild.some(
      (member) => member.Id.toLowerCase() === data.idGuild.toLowerCase()
    );

    if (!guildExistingAlbion) {
      return NextResponse.json({
        data: "",
        message: "Tu gremio no existe",
        status: 200,
      });
    }*/
    const newDataGuild = await db.DataGuild.create({
      data: {
        nameGuild: data.nameGuild,
        idGuild: data.idGuild,
      },
    });
    return NextResponse.json(newDataGuild);
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
