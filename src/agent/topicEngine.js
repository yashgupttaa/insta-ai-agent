const fs = require("fs");
const path = require("path");

const MEMORY_PATH = path.join(__dirname, "../../data/topicMemory.json");

function loadMemory() {
    if (!fs.existsSync(MEMORY_PATH)) return [];
    return JSON.parse(fs.readFileSync(MEMORY_PATH));
}

function saveMemory(memory) {
    fs.writeFileSync(MEMORY_PATH, JSON.stringify(memory, null, 2));
}

function generateTopics(niche, count = 10) {
    const baseTopics = [
        "discipline",
        "consistency",
        "late night grind",
        "self doubt",
        "middle class pressure",
        "silent hard work",
        "success mindset",
        "failure lessons"
    ];

    const memory = loadMemory();

    const freshTopics = baseTopics
        .filter(t => !memory.includes(t))
        .slice(0, count);

    saveMemory([...memory, ...freshTopics]);

    return freshTopics.map(t => `${niche} - ${t}`);
}

module.exports = { generateTopics };
