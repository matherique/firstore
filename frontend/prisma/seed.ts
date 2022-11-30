import { PrismaClient, Role } from '@prisma/client'
import { hash } from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  const hashed = await hash("123", 10)

  await prisma.user.upsert({
    where: { email: 'matherique@gmail.com' },
    update: {},
    create: {
      name: 'Matheus Henrique',
      email: 'matherique@gmail.com',
      password: hashed,
      role: Role.MANEGER,
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })