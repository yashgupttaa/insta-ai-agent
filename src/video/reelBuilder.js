const { exec } = require("child_process");
const path = require("path");

function buildReel({ image, caption, id, music }) {
    return new Promise((resolve, reject) => {
        console.log("🎬 Building reel:", id);

        const output = path.join(__dirname, `../../videos/reels/${id}.mp4`);

        const safeCaption = caption
            .replace(/[\n\r]/g, " ")
            .replace(/['":]/g, "")
            .replace(/#/g, "");


        const textForVideo = safeCaption.slice(0, 80);



        const cmd = `
ffmpeg -y -loop 1 -i "${image}" -i "${music}" \
-vf "scale=1080:1920,drawtext=text='${textForVideo}':
fontcolor=white:fontsize=48:
x=(w-text_w)/2:y=(h-text_h)/2" \
-t 8 -shortest "${output}"
`;


        exec(cmd, (err) => {
            if (err) {
                console.error("❌ FFmpeg error:", err.message);
                reject(err);
            } else {
                console.log("✅ Reel created:", output);
                resolve(output);
            }
        });
    });
}

module.exports = { buildReel };
