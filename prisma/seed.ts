// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy users
  const usersList = await prisma.user.findMany();
  if (usersList.length === 0) {
    console.log('Seeding users...');
    const users = await prisma.user.createMany({
      data: [
        {
          email: 'user1@email.com',
          name: 'User One',
          password: '123123',
        },
        {
          email: 'user2@email.com',
          name: 'User Two',
          password: '123123',
        },
      ],
    });
    console.log({ users });
  } else {
    console.log('---- users already exists -----');
  }

  const postsList = await prisma.post.findMany();
  if (postsList.length === 0) {
    console.log('Seeding posts...');
    const posts = await prisma.post.createMany({
      data: [
        {
          authorId: 1,
          title: 'Prisma Adds Support for MongoDB',
          content:
            "Support for MongoDB has been one of the most requested features since the initial release of...\nWe are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
          published: false,
        },
        {
          authorId: 1,
          title: "What's new in Prisma? (Q1/22)",
          content:
            'Our engineers have been working hard, issuing new releases with many improvements...\nLearn about everything in the Prisma ecosystem and community from January to March 2022.',
          published: true,
        },
        {
          authorId: 2,
          title: 'Lorem Doloremque commodi repellat maxime ut',
          content:
            'Aut quae quo. Eos veritatis hic aut aut inventore aliquam possimus totam eos. Ipsum ullam minus qui omnis impedit qui a. Molestiae tempora explicabo. Quia earum molestiae itaque nisi quis sed.',
          published: true,
        },
      ],
    });

    console.log({ posts });
  } else {
    console.log('---- users already exists -----');
  }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
