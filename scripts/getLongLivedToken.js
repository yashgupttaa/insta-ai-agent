require("dotenv").config();
const axios = require("axios");

async function getLongLivedToken() {
  const res = await axios.get(
    "https://graph.facebook.com/v24.0/oauth/access_token",
    {
      params: {
        grant_type: "fb_exchange_token",
        client_id: process.env.APP_ID,
        client_secret: process.env.APP_SECRET,
        fb_exchange_token: process.env.SHORT_LIVED_TOKEN
      }
    }
  );

  console.log("✅ LONG LIVED TOKEN:", res.data.access_token);
  console.log("⏳ Expires in (sec):", res.data.expires_in);
}

getLongLivedToken();
