const bolt = require('./bolt');

require('./actions');

//Comment to keep prettier from beeing stupid
(async () => {
	// Start your app
	await bolt.app.start(process.env.PORT || 3000);

	console.log('⚡️ Bolt app is running!');
})();
