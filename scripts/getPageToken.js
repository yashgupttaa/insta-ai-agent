require("dotenv").config();
const axios = require("axios");

async function getPageToken() {
  const res = await axios.get(
    "https://graph.facebook.com/v24.0/me/accounts",
    {
      params: {
        access_token: process.env.LONG_LIVED_TOKEN
      }
    }
  );

  const page = res.data.data.find(
    p => p.id === process.env.PAGE_ID
  );

  if (!page) throw new Error("Page not found");

  console.log("✅ PAGE ACCESS TOKEN:", page.access_token);
}

getPageToken();
