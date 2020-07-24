import app from './bolt';
import actions from './Actions';
import cronJobs from './CronJobs';

console.log('her');
console.log(process.env.SLACK_BOT_TOKEN);
console.log(process.env.SLACK_SIGNING_SECRET);
console.log('her');
actions();
cronJobs();

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
