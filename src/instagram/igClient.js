require("dotenv").config();
const axios = require("axios");

const IG_USER_ID = process.env.IG_USER_ID;
const TOKEN = process.env.PAGE_ACCESS_TOKEN;
const BASE = "https://graph.facebook.com/v24.0";

async function createContainer(videoUrl, caption) {
  console.log("🚀 Creating container:", videoUrl);

  const safeCaption = caption
    .replace(/[^\x00-\x7F]/g, "") // remove emojis
    .slice(0, 2000);  

  const res = await axios.post(
    `${BASE}/${IG_USER_ID}/media`,
    null,
    {
      params: {
        media_type: "REELS",
        video_url: videoUrl,
        caption: safeCaption,
        share_to_feed: true,
        access_token: TOKEN
      }
    }
  );

  return res.data.id; // creation_id
}

async function publishContainer(containerId) {
    await axios.post(`${BASE}/${IG_USER_ID}/media_publish`, null, {
        params: {
            creation_id: containerId,
            access_token: TOKEN
        }
    });
}

async function waitUntilFinished(containerId) {
  while (true) {
    const res = await axios.get(
      `${BASE}/${containerId}`,
      {
        params: {
          fields: "status_code",
          access_token: TOKEN
        }
      }
    );

    console.log("⏳ Status:", res.data.status_code);

    if (res.data.status_code === "FINISHED") return;

    if (res.data.status_code === "ERROR")
      throw new Error("Instagram video processing failed");

    await new Promise(r => setTimeout(r, 5000));
  }
}

async function tokenHealthCheck() {
  try {
    await axios.get(
      `https://graph.facebook.com/v24.0/me`,
      { params: { access_token: TOKEN } }
    );
  } catch (e) {
    console.error("❌ PAGE TOKEN INVALID – regenerate required");
    // send Telegram / email alert here
    process.exit(1);
  }
}


module.exports = { createContainer, publishContainer, waitUntilFinished, tokenHealthCheck };
