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
-filter_complex "
[0:v]scale=1080:1080:force_original_aspect_ratio=decrease,
pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=black[v]
" \
-map "[v]" -map 1:a \
-c:v libx264 -preset veryfast -crf 28 \
-pix_fmt yuv420p \
-c:a aac -b:a 128k \
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
