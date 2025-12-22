function buildPrompt({ niche, language, topic, rules }) {
    return `
You are an Instagram Reels content creator.

Create content on:
Topic: ${topic}

Rules:
- Language: ${language}
- Tone: ${rules.tone}
- Emoji usage: ${rules.emojiUsage}
- Hook in first 2 seconds
- Short, bold, scroll-stopping
- No repetition from previous reels

Output format:
1. Reel idea (1 line)
2. Caption (max 2 lines)
3. 12 hashtags
`;
}

module.exports = { buildPrompt };
