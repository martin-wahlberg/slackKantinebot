import app from './bolt';
import actions from './Actions';
import cronJobs from './CronJobs';

actions();
cronJobs();

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
