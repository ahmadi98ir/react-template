import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@ahmadi98.ir'
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe!123'
  const adminName = process.env.ADMIN_NAME || 'Owner'

  const passwordHash = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      name: adminName,
      role: Role.ADMIN,
    },
  })

  await prisma.profile.upsert({
    where: { id: 'default-profile' },
    update: {},
    create: {
      id: 'default-profile',
      fullName: 'مهندس مهدی احمدی',
      title: 'Software Technology Engineer',
      bioMarkdown: 'توسعه‌دهنده‌ی علاقه‌مند به DevOps و AI.',
      location: 'IR / US',
      socials: {
        github: 'ahmadi98',
        linkedin: 'mahdi-ahmadi',
        email: 'contact@ahmadi98.ir',
      },
    },
  })

  // skills
  const skills = [
    { name: 'Next.js', level: 5, category: 'Frontend', order: 1 },
    { name: 'Node.js', level: 5, category: 'Backend', order: 2 },
    { name: 'DevOps', level: 4, category: 'Ops', order: 3 },
  ]
  for (const s of skills) {
    await prisma.skill.upsert({
      where: { name: s.name },
      update: {},
      create: s,
    })
  }

  // projects
  await prisma.project.upsert({
    where: { slug: 'portfolio-v2' },
    update: {},
    create: {
      title: 'Portfolio v2',
      slug: 'portfolio-v2',
      summary: 'نسخه جدید پورتفولیو',
      descriptionMarkdown: '...',
      tags: ['nextjs', 'tailwind'],
      featured: true,
      published: true,
      order: 1,
    },
  })

  await prisma.project.upsert({
    where: { slug: 'coolify-cicd' },
    update: {},
    create: {
      title: 'CI/CD Coolify',
      slug: 'coolify-cicd',
      summary: 'دیپلوی خودکار',
      descriptionMarkdown: '...',
      tags: ['docker', 'coolify'],
      featured: false,
      published: true,
      order: 2,
    },
  })

  // blog
  await prisma.blogPost.upsert({
    where: { slug: 'why-nextjs' },
    update: {},
    create: {
      title: 'چرا Next.js؟',
      slug: 'why-nextjs',
      excerpt: 'مزایا و معایب',
      contentMarkdown: '...',
      tags: ['nextjs'],
      published: true,
      publishedAt: new Date(),
    },
  })

  // contacts (sample)
  await prisma.contactMessage.createMany({
    data: [
      { name: 'کاربر الف', email: 'a@example.com', subject: 'سلام', message: 'پیام تست' },
      { name: 'کاربر ب', email: 'b@example.com', subject: 'سوال', message: 'یک سوال' },
      { name: 'کاربر پ', email: 'p@example.com', subject: 'همکاری', message: 'پیشنهاد همکاری' },
    ],
    skipDuplicates: true,
  })

  // settings
  await prisma.siteSetting.upsert({
    where: { id: 'default-settings' },
    update: {},
    create: { id: 'default-settings', theme: 'system', sitemapEnabled: true, robotsPolicy: 'allow' },
  })

  console.log('Seed complete. Admin:', admin.email)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})

