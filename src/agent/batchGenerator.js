const { generateTopics } = require("./topicEngine");
const { buildPrompt } = require("./promptEngine");
const { generateCaption } = require("./captionGenerator");
const { addToQueue } = require("../queue/contentQueue");
const { createReel } = require("../video/videoPipeline");
const { uploadVideo } = require("../storage/uploader");
const userConfig = require("../config/userConfig.json");

async function generateBatch() {
    const topics = generateTopics(userConfig.niche, 12);

    console.log("topics", topics.length);

    for (let topic of topics) {
        const prompt = buildPrompt({
            niche: userConfig.niche,
            language: userConfig.language,
            topic,
            rules: userConfig.rules
        });

        const aiOutput = await generateCaption(prompt);
        console.log("here")

        const videoPath = await createReel({
            topic,
            caption: aiOutput.split("\n")[1] || aiOutput,
            id: `reel_${Date.now()}`
        });

        const videoUrl = await uploadVideo(videoPath);

        addToQueue({
            id: `reel_${Date.now()}`,
            caption: aiOutput,
            hashtags: extractHashtags(aiOutput),
            video: videoUrl
        });
    }
}

function extractHashtags(text) {
    return text.match(/#\w+/g) || [];
}

module.exports = { generateBatch };
