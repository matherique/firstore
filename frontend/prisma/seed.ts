import { PrismaClient, Profile, User } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

const users = [
  { name: "Matheus Henrique", email: "matherique@gmail.com", profile: Profile.ADMINISTRATOR },
  { name: "Tainara Santos", email: "tss.cjo@gmail.com", profile: Profile.ADMINISTRATOR },
  { name: "Nollie", email: "nearengey0@blog.com", profile: Profile.ENPLOYEE },
  { name: "Rici", email: "rjamson1@imgur.com", profile: Profile.ENPLOYEE },
  { name: "Arther", email: "avaney2@hibu.com", profile: Profile.ENPLOYEE },
  { name: "Belva", email: "bprattin3@ebay.co.uk", profile: Profile.ENPLOYEE },
  { name: "Kyle", email: "khearns4@i2i.jp", profile: Profile.ENPLOYEE },
  { name: "Greer", email: "ggenders5@woothemes.com", profile: Profile.ENPLOYEE },
  { name: "Greer", email: "ggenders5@woothemes.com", profile: Profile.ENPLOYEE },
  { name: "Ramsay", email: "rshearstone6@newyorker.com", profile: Profile.ENPLOYEE },
  { name: "Carlyle", email: "cbernardoni8@utexas.edu", profile: Profile.ENPLOYEE },
  { name: "Vonni", email: "vebbens7@yellowbook.com", profile: Profile.ENPLOYEE },
  { name: "Travers", email: "tdobneyb@pagesperso-orange.fr", profile: Profile.ENPLOYEE },
  { name: "Mary", email: "mcauldfielda@hubpages.com", profile: Profile.ENPLOYEE },
]

const products = [
  { name: "Bacardi Limon", price: 18 },
  { name: "Pastry - Chocolate Chip Muffin", price: 13 },
  { name: "Banana", price: 10 },
  { name: "Onions - Vidalia", price: 20 },
  { name: "Gatorade - Fruit Punch", price: 13 },
  { name: "Wine - Bouchard La Vignee Pinot", price: 11 },
  { name: "Lettuce - Escarole", price: 13 },
  { name: "Salmon - Atlantic, Skin On", price: 12 },
  { name: "Bread - Rosemary Focaccia", price: 14 },
  { name: "Cookie Dough - Double", price: 19 },
  { name: "Cornflakes", price: 17 },
  { name: "Macaroons - Homestyle Two Bit", price: 16 },
  { name: "Trout - Smoked", price: 11 },
  { name: "Cilantro / Coriander - Fresh", price: 18 },
  { name: "Melon - Honey Dew", price: 14 },
  { name: "Broom And Broom Rack White", price: 18 },
  { name: "Celery Root", price: 17 },
  { name: "Shrimp, Dried, Small / Lb", price: 13 },
  { name: "Kolrabi", price: 19 },
  { name: "Salmon - Atlantic, No Skin", price: 19 },
  { name: "Dikon", price: 16 },
  { name: "Bandage - Finger Cots", price: 18 },
  { name: "Samosa - Veg", price: 12 },
  { name: "Beef - Chuck, Boneless", price: 17 },
  { name: "Sole - Fillet", price: 10 },
  { name: "Kellogs Raisan Bran Bars", price: 17 },
  { name: "Juice - Lemon", price: 17 },
  { name: "Beans - Navy, Dry", price: 13 },
  { name: "Basil - Fresh", price: 17 },
  { name: "Beer - Mill St Organic", price: 14 }
]

async function main() {
  const hashed = await hash("123", 10)

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, password: hashed },
    })
  }

  for (const product of products) {
    await prisma.product.create({
      data: { ...product }
    })
  }
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