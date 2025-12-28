const { exec } = require("child_process");
const path = require("path");

function buildReel({ image, id, audio }) {
    return new Promise((resolve, reject) => {
        console.log("🎬 Building reel:", id);

        const output = path.join(__dirname, `../../videos/reels/${id}.mp4`);

        const cmd = `
ffmpeg -y \
-loop 1 -i "${image}" \
-i "${audio}" \
-vf "scale=1080:1920" \
-c:v libx264 -pix_fmt yuv420p \
-shortest "${output}"
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
