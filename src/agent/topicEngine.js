const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MEMORY_PATH = path.join(__dirname, "../../data/topicMemory.json");

async function loadMemory() {
  if (!fs.existsSync(MEMORY_PATH)) return [];
  return JSON.parse(fs.readFileSync(MEMORY_PATH));
}

async function saveMemory(memory) {
  fs.writeFileSync(MEMORY_PATH, JSON.stringify(memory, null, 2));
}

async function generateTopics(niche, count = 1) {
  const memory = await loadMemory();

  const prompt = `
You are a creative writer for Indian comedy reels inspired by TMKOC.

Generate ${count} UNIQUE comedy situations (not generic topics).

Rules:
- Situations must feel like TMKOC society life
- Light-hearted comedy
- Middle-class Indian problems
- Daily life misunderstandings
- Avoid repeating these past ideas:
${memory.length ? memory.join(", ") : "None"}

Output ONLY a JSON array of short situations.
Example:
[
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

]
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }]
  });

  let content = res.choices[0].message.content.trim();

  // Remove markdown code blocks if present
  if (content.startsWith("```json")) {
    content = content.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (content.startsWith("```")) {
    content = content.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  const rawTopics = JSON.parse(content);
  const baseTopics = rawTopics.map(item => item.situation);

  const freshTopics = baseTopics
    .filter(t => !memory.includes(t))
    .slice(0, count);

  saveMemory([...memory, ...freshTopics]);

  return freshTopics.map(t => `${niche} - ${t}`);
}

module.exports = { generateTopics };
