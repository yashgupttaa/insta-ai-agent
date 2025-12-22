const cron = require("node-cron");
const { publishNext } = require("../instagram/publisher");

// 4 times daily
cron.schedule("0 9,13,17,21 * * *", async () => {
    console.log("⏰ Posting time");
    await publishNext();
});
