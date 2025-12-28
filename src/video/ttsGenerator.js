require("dotenv").config();
const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateTts(speech, id) {
    try {
        console.log("🔊 Generating Audio for:", id);

        const audioPath = path.join(__dirname, `../../assets/music/${id}.mp3`);

        const response = await openai.audio.speech.create({
            model: "gpt-4o-mini-tts",
            voice: "alloy",
            input: speech,
            format: "mp3"
        });

        const buffer = Buffer.from(await response.arrayBuffer());
        fs.writeFileSync(audioPath, buffer);

        console.log("✅ Audio generated:", audioPath);
        return audioPath;

    } catch (err) {
        console.error("❌ Audio generation failed:", err);
        throw err;
    }
}

module.exports = { generateTts };
