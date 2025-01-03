const axios = require("axios");

module.exports.config = {
    name: "zombie",
    hasPrefix: false,
    role: 0,
    hasPermission: false,
    commandCategory: "no prefix",
    usePrefix: false,
    cooldown: 5,
    cooldowns: 5,
    aliases: [],
    description: "Generate image",
    usages: "{pn} reply to an image",
    usage: "{pn} reply to an image",
    credits: "Deku"
};

module.exports.run = async function({ api, event, args }) {
    try {
        let url;

        if (event.type === "message_reply") {
            const attachments = event.messageReply.attachments;
            if (attachments.length !== 1) {
                return api.sendMessage("You must reply to exactly one image.", event.threadID);
            }

            if (attachments[0].type !== "photo") {
                return api.sendMessage("Only an image can be used.", event.threadID);
            }

            url = attachments[0].url;

            api.sendMessage("Processing the image. Please wait...", event.threadID, event.messageID);

            const imgurUploadUrl = `https://betadash-uploader.vercel.app/imgur?link=${encodeURIComponent(url)}`;
            const upload = await axios.get(imgurUploadUrl);
            const imgurLink = upload.data.uploaded.image;

            const apiEndpoint = `https://yt-video-production.up.railway.app/zombie?url=${imgurLink}`;
            const apiResponse = await axios.get(apiEndpoint, { responseType: "stream" });

            api.sendMessage(
                { body: "🧟 ROAR!", attachment: apiResponse.data },
                event.threadID,
                event.messageID
            );
        } else {
            return api.sendMessage("Please reply to a message containing exactly one image.", event.threadID);
        }
    } catch (e) {
        return api.sendMessage("An error occurred while processing the image.", event.threadID);
    }
};