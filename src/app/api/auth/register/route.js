import { NextResponse } from "next/server"
import db from "@/libs/db"

export async function POST(request){

    const data = await request.json()

   const newUser = await db.user.create({
    data
   });
   const newMoney = await db.money.create({
    data:{
        amount:0,
        userId: newUser.id
    }
   })

   console.log(newUser)
   console.log(newMoney)

    return NextResponse.json("registrando...")
}