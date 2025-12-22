const fs = require("fs");
const path = require("path");

const QUEUE_PATH = path.join(__dirname, "../../data/generatedContent.json");

function loadQueue() {
    if (!fs.existsSync(QUEUE_PATH)) return [];
    return JSON.parse(fs.readFileSync(QUEUE_PATH));
}

function saveQueue(queue) {
    fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2));
}

function addToQueue(content) {
    const queue = loadQueue();
    queue.push({
        ...content,
        status: "PENDING",
        createdAt: new Date().toISOString()
    });
    saveQueue(queue);
}

module.exports = {
    loadQueue,
    addToQueue
};
