const axios = require('axios');

module.exports.config = {
  name: "humanizer",
  version: 1.0,
  credits: "heru",
  description: "API to humanize given text",
  hasPrefix: false,
  usages: "{pn} [text]",
  aliases: [],
  cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const text = args.join(" ");
    if (!text) {
      await api.sendMessage("Please provide some text to humanize.", event.threadID);
      return;
    }

    const initialMessage = await new Promise(resolve => {
      api.sendMessage("Processing, please wait...", event.threadID, (err, info) => {
        resolve(info);
      }, event.messageID);
    });

    const response = await axios.get(`https://betadash-api-swordslush.vercel.app/humanize?text=${encodeURIComponent(text)}`);
    const humanizedText = response.data.message;

    await api.editMessage(
      `🤖 𝗛𝗨𝗠𝗔𝗡𝗜𝗭𝗘𝗥\n━━━━━━━━━━━━━━━━━━\n${humanizedText}`,
      initialMessage.messageID
    );
  } catch (error) {
    console.error("⚠️", error.message);
    await api.editMessage("An error occurred while processing your request. Please try again later.", initialMessage.messageID);
  }
};
