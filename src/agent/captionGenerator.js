require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateCaption(prompt) {
    const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8
    });

    let content = res.choices[0].message.content.trim();
    
    // Remove markdown code blocks if present
    if (content.startsWith("```json")) {
        content = content.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (content.startsWith("```")) {
        content = content.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    return content;
}

module.exports = { generateCaption };
