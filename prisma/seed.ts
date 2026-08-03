import { MenuCategory } from '@prisma/client'
import prisma from '../src/lib/prisma'
import * as bcrypt from 'bcrypt'

async function main() {
  // Create admin account
  const passwordHash = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@cafehira.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@cafehira.com',
      passwordHash,
      role: 'ADMIN',
    },
  })
  
  console.log({ admin })

  // Seed Menu Items
  const menuItems = [
    {
      slug: "signature-latte",
      name: "Hira Signature Latte",
      category: "SIGNATURE",
      description: "Silky oat milk, house espresso, and a touch of golden honey.",
      price: 6.50,
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
    },
    {
      slug: "pour-over",
      name: "Single Origin Pour Over",
      category: "COFFEE",
      description: "Ethiopian beans with bright citrus notes and a clean finish.",
      price: 5.75,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    },
    {
      slug: "cold-brew",
      name: "Kyoto Cold Brew",
      category: "COFFEE",
      description: "Slow-steeped for 18 hours. Smooth, bold, and low acidity.",
      price: 5.50,
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80",
    },
    {
      slug: "ceremonial-matcha",
      name: "Ceremonial Matcha",
      category: "MATCHA",
      description: "Premium Uji matcha whisked to perfection. Earthy and sweet.",
      price: 6.00,
      image: "https://images.unsplash.com/photo-1582787030806-96a928ba6c41?w=600&q=80",
    },
    {
      slug: "croissant",
      name: "Butter Croissant",
      category: "PASTRY",
      description: "Flaky, buttery layers baked fresh every morning.",
      price: 4.50,
      image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=600&q=80",
    },
    {
      slug: "tiramisu",
      name: "Classic Tiramisu",
      category: "DESSERT",
      description: "Espresso-soaked ladyfingers with rich mascarpone cream.",
      price: 7.50,
      image: "https://images.unsplash.com/photo-1571115177098-24deabdb96ec?w=600&q=80",
    }
  ]

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        slug: item.slug,
        name: item.name,
        category: item.category as MenuCategory,
        description: item.description,
        price: item.price,
        image: item.image,
      },
    })
  }
  
  console.log('Seeded menu items')
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
