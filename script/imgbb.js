const axios = require("axios");

module.exports.config = {
  name: "imgbb",
  version: "1.0",
  credits: "cliff",
  cooldown: 0,
  role: 0,
  hasPrefix: false,
  usage: "{prefix} ",
  description: "get link gif/image"
};

module.exports.run = async function ({ api, event }) {
  const { messageReply } = event;

  if (event.type !== "message_reply" || !messageReply.attachments || messageReply.attachments.length !== 1) {
    return api.sendMessage("", event.threadID, event.messageID);
  }

  const yawk = messageReply.attachments[0].url;

  try {
    const response = await axios.get(`https://betadash-api-swordslush.vercel.app/imgbb?url=${encodeURIComponent(yawk)}`);
    const { imageUrl } = response.data;
    return api.sendMessage(imageUrl, event.threadID, event.messageID);
  } catch (error) {
    return api.sendMessage("Failed to upload image to ImgBB.", event.threadID, event.messageID);
  }
};