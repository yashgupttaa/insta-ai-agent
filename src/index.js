require("./scheduler/cron");
const { loadQueue } = require("./queue/contentQueue");
const { generateBatch } = require("./agent/batchGenerator");
const userConfig = require("./config/userConfig.json");
const { publishNext } = require("./instagram/publisher");

async function startAgent() {
    const queue = loadQueue();
    const required = userConfig.posting.postsPerDay * userConfig.posting.batchDays;

    if (queue.length < required) {
        console.log("🧠 Generating new batch...");
        await generateBatch();
    } else {
        console.log("✅ Enough content in queue");
    }
}
publishNext();
// startAgent();
