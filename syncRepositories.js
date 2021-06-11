require('dotenv').config();
const db = require('./db');
const axios = require('axios');
const { repository } = require('./db');

function getUserRepos(username) {
  return axios
    .get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
      },
    })
    .then((res) => res.data);
}

async function run() {
  const users = await db.user.findMany();
  console.log(users);

  const syncUserPromises = users.map(async (user) => {
    console.log(`getting repos for ${user.githubUsername}`);
    const repositories = await getUserRepos(user.githubUsername);
    console.log(`got repos for ${user.githubUsername}`);

    const syncReposPromises = repositories
      .map((repo) => ({
        url: repo.html_url,
        userId: user.id,
      }))
      .map((repo) => {
        return db.repository.upsert({
          create: repo,
          update: repo,
          where: { url: repo.url },
        });
      });

    await Promise.all(syncReposPromises);
    await db.user.update({
      where: { id: user.id },
      data: { reposLastSyncDate: new Date() },
    });
    console.log(`all repos for ${user.githubUsername} synced to db`);
  });
  await Promise.all(syncUserPromises);
  console.log('done');
}

run().then(() => {
  db.$disconnect();
});
