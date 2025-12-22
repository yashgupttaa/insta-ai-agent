const { generateImage } = require("./imageGenerator");
const { buildReel } = require("./reelBuilder");
const { pickMusic } = require("./musicPicker");

async function createReel({ topic, caption, id }) {
    const image = await generateImage(topic, id);
    const music = pickMusic();

    const videoPath = await buildReel({
        image,
        caption,
        id,
        music
    });

    return videoPath;
}

module.exports = { createReel };
