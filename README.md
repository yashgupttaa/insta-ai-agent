# Insta-AI-Agent

Insta-AI-Agent is an automated Instagram content creation and publishing system. It leverages AI to generate niche-specific topics, captions, and videos (reels), and schedules them for posting via the Instagram Graph API.

## 🚀 Features

- **Automated Topic Generation**: Generates trending topics based on your niche.
- **AI Captions**: Uses OpenAI to create engaging captions with hashtags.
- **Video Creation**: Automatically generates reels using images and music with FFmpeg.
- **Cloud Storage**: Uploads generated content to Cloudinary.
- **Scheduled Posting**: Uses `node-cron` to publish posts at optimal times.
- **Batch Processing**: Generates multiple days of content in one go to ensure the queue is always full.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [FFmpeg](https://ffmpeg.org/) (Required for video processing)

You will also need:
- **OpenAI API Key**: For caption generation.
- **Cloudinary Account**: For video hosting.
- **Instagram Graph API Access**: (Business or Creator Account, App ID, App Secret, and a Long-lived Access Token).

## 📥 Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd insta-ai-agent
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and add your credentials:
   ```env
   OPENAI_API_KEY=your_openai_key
   CLOUDINARY_CLOUD=your_cloud_name
   CLOUDINARY_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   IG_USER_ID=your_instagram_business_account_id
   IG_ACCESS_TOKEN=your_instagram_access_token
   ```

4. **User Configuration**:
   Adjust the settings in `src/config/userConfig.json` to match your target audience and posting strategy:
   ```json
   {
       "niche": "Motivation",
       "language": "Hinglish",
       "audience": "Indian youth",
       "posting": {
           "postsPerDay": 3,
           "batchDays": 3
       },
       "rules": {
           "avoidRepetition": true,
           "tone": "bold, practical, real-life",
           "emojiUsage": "low"
       }
   }
   ```

## 🏃 Usage

### Start the Agent
To run the agent and check if new content needs to be generated:
```bash
npm start
```
The agent will:
1. Check the local queue (`data/generatedContent.json`).
2. If the queue is low (based on `postsPerDay * batchDays`), it will trigger `generateBatch()`.
3. `generateBatch()` will create new reels, upload them, and update the queue.

### Scheduled Posting
The agent includes a built-in scheduler (`src/scheduler/cron.js`). By default, it is configured to post 4 times daily (9 AM, 1 PM, 5 PM, 9 PM). This runs automatically as long as the process is active.

## 📂 Project Structure

- `src/agent/`: Core logic for topic, prompt, and caption generation.
- `src/video/`: Video processing pipeline using FFmpeg.
- `src/instagram/`: Instagram Graph API client and publishing logic.
- `src/queue/`: Management of the JSON-based content queue.
- `src/scheduler/`: Cron job configurations.
- `src/storage/`: Cloudinary uploader logic.
- `data/`: Local storage for the generated content queue.
- `videos/`: Local storage for generated reels.

## ⚙️ How it Works

1. **Topic Engine**: Picks a topic based on the niche.
2. **Prompt Engine**: Builds a specific prompt for OpenAI.
3. **Caption Generator**: OpenAI returns a caption and hashtags.
4. **Video Pipeline**: 
   - Generates an image.
   - Picks background music.
   - Uses **FFmpeg** to combine image, text overlay, and music into an 8-second reel.
5. **Uploader**: Uploads the video to Cloudinary to get a public URL.
6. **Queue**: Saves the post data (URL, caption, status) to `generatedContent.json`.
7. **Publisher**: At scheduled times, the publisher picks the next `PENDING` post and sends it to Instagram.

## ⚠️ Important Notes

- The current version uses a placeholder image (`assets/placeholder.jpg`) and fixed music (`assets/music/bg1.mp3`) for reel generation. To enable AI image generation, uncomment the logic in `src/video/imageGenerator.js`.
- Ensure FFmpeg is accessible in your system's PATH.
- The Instagram Graph API requires a **Business** or **Creator** account linked to a Facebook Page.
- Make sure Cloudinary upload presets or permissions allow for video uploads.