import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const { action, userId, oldValue, newValue } = await req.json();

    if (!action || !userId || oldValue === undefined || newValue === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const log = await prisma.log.create({
      data: {
        action,
        userId,
        oldValue,
        newValue,
      },
    });

    return res.status(201).json(log);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
