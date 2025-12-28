const { generateImage } = require("./imageGenerator");
const { buildReel } = require("./reelBuilder");
const { generateTts } = require("./ttsGenerator");

async function createReel({ topic, speech, id }) {
    const image = await generateImage(topic, id);
    const audio = await generateTts(speech, id);

    const videoPath = await buildReel({
        image,
        id,
        audio
    });

    return videoPath;
}

module.exports = { createReel };
