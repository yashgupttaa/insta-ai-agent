const path = require("path");

function pickMusic() {
    return path.join(__dirname, "../../assets/music/bg1.mp3");
}

module.exports = { pickMusic };
