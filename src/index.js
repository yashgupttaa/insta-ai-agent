require("./scheduler/cron");
const { loadQueue } = require("./queue/contentQueue");
const { generateBatch } = require("./agent/batchGenerator");
const userConfig = require("./config/userConfig.json");
const { publishNext } = require("./instagram/publisher");

async function startAgent() {
    const queue = loadQueue();
    const required = userConfig.posting.postsPerDay * userConfig.posting.batchDays;

    const pendingCount = queue.filter(
        post => post.status === "PENDING"
    ).length;

    console.log("📦 Pending posts:", pendingCount);

    if (pendingCount < required) {
        console.log("🧠 Generating new batch...");
        await generateBatch();
    } else {
        console.log("✅ Enough content in queue");
    }
}

// For node cron pls uncomment below lines these for local testing
// publishNext();
// startAgent();

// For local testing pls comment below lines because these for render cron trigger
(async () => {
    console.log("⏰ Render Cron Triggered");
    await startAgent();   // agar queue kam ho
    await publishNext();     // ek post publish
})();
