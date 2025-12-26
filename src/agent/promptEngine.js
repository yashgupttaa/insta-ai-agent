function buildPrompt({ niche, language, topic, rules }) {
    return `
You are an Instagram Reels content creator.

Create a TMKOC-style animated reel.

Context:
- Inspired by Taarak Mehta Ka Ooltah Chashmah
- Light comedy + motivation

Characters:
- Jethalal: Overexcited, nervous, dramatic Gujarati businessman, panics easily, lies badly.
- Babita: Polite, sweet, stylish, slightly confused, reacts with awkward smiles.
- Iyer: Serious, logical, sudden entry creates awkward silence, suspicious by nature.
- Bhide: Strict society secretary, disciplined, overreacts on rules, shouts about maintenance.
- Daya: Innocent, loud, emotional, misunderstands situations in a funny way.
- Champak Chacha: Moral lectures, old-school wisdom, scolds Jethalal lovingly.
- Taarak Mehta: Calm narrator, logical advisor, breaks tension with sensible humor.
- Anjali Bhabhi: Health-conscious, strict diet reminders, sarcastic reactions.
- Sodhi: Loud Punjabi energy, friendly, dramatic encouragement, comic exaggeration.
- Dr. Hathi: Food-loving, innocent, unintentionally funny comments.
- Tapu: Mischievous leader, smart ideas, playful troublemaker.
- Tapu Sena: Group chaos, childish logic, overconfidence, accidental trouble creators.
- Popatlal: Desperate for marriage, misunderstands situations, emotional outbursts.

Topic: ${topic}

Rules:
- Tone: ${rules.tone}
- Emoji usage: ${rules.emojiUsage}
- Hook in first 2 seconds
- Short, bold, scroll-stopping
- Comedy first, motivation hidden inside humor
- Situational, middle-class Indian society vibe
- No repetition from previous reels

Scene rules:
- Location: Apartment society
- Duration: 12-15 seconds
- Clear beginning, middle, punchline ending
- Strong visual comedy and expressions
- Family friendly humor
- No motivation talk, only situational comedy

IMPORTANT:
- Generate content in BOTH English and Hindi
- English will be used for VIDEO generation
- Hindi will be used for VOICEOVER (TTS)
- Meaning must stay SAME in both languages
- Hindi should be natural, spoken Hindi (not pure shuddh Hindi)

Output STRICT JSON only in this format:

{
  "reelIdea": {
    "english": "",
    "hindi": ""
  },
  "caption": {
    "english": "",
    "hindi": ""
  },
  "hashtags": []
}
`;
}

module.exports = { buildPrompt };
