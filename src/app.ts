import app from './bolt';
import './Actions';
import './CronJobs';

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
