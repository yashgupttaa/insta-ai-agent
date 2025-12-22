require("dotenv").config();
const axios = require("axios");

const IG_USER_ID = process.env.IG_USER_ID;
const TOKEN = process.env.IG_ACCESS_TOKEN;
const BASE = "https://graph.facebook.com/v19.0";

async function createContainer(videoUrl, caption) {
    const res = await axios.post(`${BASE}/${IG_USER_ID}/media`, null, {
        params: {
            media_type: "REELS",
            video_url: videoUrl,
            caption,
            access_token: TOKEN
        }
    });
    return res.data.id;
}

async function publishContainer(containerId) {
    await axios.post(`${BASE}/${IG_USER_ID}/media_publish`, null, {
        params: {
            creation_id: containerId,
            access_token: TOKEN
        }
    });
}

module.exports = { createContainer, publishContainer };
