require("dotenv").config();
const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateImage(prompt, id) {
    try {
        console.log("🖼️ Generating image for:", id);

        const imgPath = path.join(__dirname, `../../videos/images/${id}.png`);

        const animationPrompt = `
3D cartoon animation style, Indian sitcom comedy,
bright colors, exaggerated expressions,
TMKOC-inspired characters (not real actors),
clean Pixar-style lighting,
smooth textures, animated TV show frame,

Scene:
${prompt}

No realism, no real humans, no photography
`;

        // const imgPath = path.join(__dirname, `../../assets/placeholder.jpg`);

        const res = await openai.images.generate({
            model: "gpt-image-1",
            prompt: animationPrompt,
            size: "1024x1024"
        });

        const imageBase64 = res.data[0].b64_json;
        fs.writeFileSync(imgPath, Buffer.from(imageBase64, "base64"));

        console.log("✅ Image generated:", imgPath);

        return imgPath;
    } catch (err) {
        console.error("❌ Image generation failed:", err.message);
        throw err;
    }
}

module.exports = { generateImage };
