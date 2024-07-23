const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();
async function main() {
  console.log("seeding database.....");
  // Seed Users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const sex = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName(sex);

    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }),
        username: faker.internet.userName({ firstName, lastName }),
        image: faker.image.avatar(),
        discription: faker.person.bio(),
        createdAt: faker.date.past(),
      },
    });
    users.push(user);
  }

  // Seed Tweets, Likes, and Replies
  for (const user of users) {
    const numTweets = Math.floor(Math.random() * 5); // Random number of tweets (0 to 10)
    for (let i = 0; i < numTweets; i++) {
      const includeMedia = Math.random() < 0.5;
      const tweetData = {
        content: faker.lorem.sentences(),
        autherId: user.id,
        createdAt: faker.date.past(),
      };

      if (includeMedia) {
        tweetData.media = faker.image.urlLoremFlickr({ category: "nature" });
      }
      const tweet = await prisma.tweet.create({
        data: tweetData,
      });

      // Simulate likes on tweets
      const numLikes = Math.floor(Math.random() * users.length);
      const usersWithLikes = faker.helpers.shuffle(users).slice(0, numLikes);
      for (const liker of usersWithLikes) {
        await prisma.like.create({
          data: {
            LikedByUserId: liker.id,
            tweetId: tweet.id,
          },
        });
      }

      // Simulate replies to tweets
      const numReplies = Math.floor(Math.random() * 3); // Random number of replies (0 to 5)
      for (let j = 0; j < numReplies; j++) {
        const includeMedia = Math.random() < 0.3;
        const replyData = {
          content: faker.lorem.sentence(),
          autherId: faker.helpers.arrayElement(users).id,
          parentTweetId: tweet.id,
          isReply: true,
          createdAt: faker.date.past(),
        };
        if (includeMedia) {
          replyData.media = faker.image.urlLoremFlickr({ category: "nature" });
        }
        const reply = await prisma.tweet.create({
          data: replyData,
        });
      }
    }

    // Randomly select a subset of users to follow
    const numFollowings = Math.floor(Math.random() * (users.length - 1)); // Random number of followings (0 to users.length - 1)
    const usersToFollow = faker.helpers
      .shuffle(users.filter((u) => u.id !== user.id))
      .slice(0, numFollowings);
    for (const followee of usersToFollow) {
      await prisma.follows.create({
        data: {
          followerId: user.id,
          followingId: followee.id,
        },
      });
    }
  }
}
main()
  .then(async () => {
    console.log("Database seeded successfully!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log("Error in database seeding");

    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
