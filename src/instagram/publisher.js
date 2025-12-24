const { loadQueue, saveQueue } = require("../queue/contentQueue");
const { createContainer, publishContainer, waitUntilFinished, tokenHealthCheck } = require("./igClient");

async function publishNext() {
    const queue = loadQueue();
    const post = queue.find(p => p.status === "PENDING");

    if (!post) {
        console.log("📭 No pending posts");
        return;
    }

    try {
        await tokenHealthCheck();
        console.log("🚀 Publishing:", post.id);

        const caption =
            post.caption + "\n\n" + post.hashtags.join(" ");

        const containerId = await createContainer(
            post.video,
            caption
        );

        await waitUntilFinished(containerId);

        console.log("containerId", containerId);

        await publishContainer(containerId);

        post.status = "POSTED";
        post.postedAt = new Date().toISOString();
        saveQueue(queue);

        console.log("✅ Posted successfully");
    } catch (err) {
        console.error(
            "❌ Publish failed:",
            err.response?.data || err.message
        );
    }
}

module.exports = { publishNext };
