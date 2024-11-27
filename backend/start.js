// start.js
const ngrok = require('ngrok');

(async function () {
    const port = 5000; // The same port your Express app runs on
    const url = await ngrok.connect(port);

    console.log(`ngrok public URL: ${url}`);
})();
    