const db = require('../db');

module.exports = async function seed() {
  await db.user.createMany({
    data: [{ githubUsername: 'torvalds' }, { githubUsername: 'unclebob' }],
  });
};

module
  .exports()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
