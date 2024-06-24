
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function PostDb(){

    const allUsers = await prisma.user.findMany()
    const allMoney = await prisma.money.findMany()

    return(
        <main>
           <div className="bg-white">
            {allUsers.map((usuarios) => {
                 const userMoney = allMoney.find((money) => money.userId === usuarios.id);
                return(
                    <ul key={usuarios.id+"_ul"}>
                        <li key={usuarios.id}>{usuarios.email}</li>
                        <li>{userMoney && userMoney.amount !== 0?"$"+userMoney.amount:"Asiste a la actividades split"}</li>
                    </ul>
                )
            })}
           </div>
        </main>
    )
}