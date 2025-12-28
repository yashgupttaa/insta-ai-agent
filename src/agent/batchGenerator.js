const { generateTopics } = require("./topicEngine");
const { buildPrompt } = require("./promptEngine");
const { generateCaption } = require("./captionGenerator");
const { addToQueue } = require("../queue/contentQueue");
const { createReel } = require("../video/videoPipeline");
const { uploadVideo } = require("../storage/uploader");
const userConfig = require("../config/userConfig.json");

async function generateBatch() {
    const topics = await generateTopics(userConfig.niche, 1);

    for (let topic of topics) {
        const prompt = buildPrompt({
            niche: userConfig.niche,
            language: userConfig.language,
            topic,
            rules: userConfig.rules
        });

        const aiOutput = await generateCaption(prompt);
        let parsedOutput;
        try {
            parsedOutput = JSON.parse(aiOutput);
        } catch (e) {
            console.error("Failed to parse caption JSON", e);
            continue;
        }

        const videoPath = await createReel({
            topic,
            speech: parsedOutput.reelIdea.hindi,
            id: `reel_${Date.now()}`
        });

        const videoUrl = await uploadVideo(videoPath);

        addToQueue({
            id: `reel_${Date.now()}`,
            caption: parsedOutput.caption.english,
            hashtags: parsedOutput.hashtags,
            video: videoUrl,
            reelIdea: parsedOutput.reelIdea
        });
    }
}

function extractHashtags(text) {
    return text.match(/#\w+/g) || [];
}

module.exports = { generateBatch };
