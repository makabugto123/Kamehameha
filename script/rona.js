const axios = require('axios');

module.exports.config = {
  name: "ronaai",
  version: 1.0,
  credits: "heru",
  description: "AI-powered chatbot using Rona Ai",
  hasPrefix: false,
  usages: "ronaai [prompt]",
  aliases: ["rona"],
  cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const prompt = args.join(" ");
    if (!prompt) {
      await api.sendMessage("Please provide a prompt first.", event.threadID);
      return;
    }

    const initialMessage = await new Promise(resolve => {
      api.sendMessage("🙄 Talking....", event.threadID, (err, info) => {
        resolve(info);
      }, event.messageID);
    });

    const response = await axios.get(`https://heru-apiv2.ddnsfree.com/api/rona?prompt=${encodeURIComponent(prompt)}`);
    const answer = response.data.response;

    await api.editMessage("🙄 𝗥𝗢𝗡𝗔 𝗔𝗜\n━━━━━━━━━━━━━━━━━━\n" + answer + "\n━━━━━━━━━━━━━━━━━━", initialMessage.messageID);
  } catch (error) {
    console.error("⚠️", error.message);
    await api.editMessage("An error occurred while processing your request. Please try again later.", initialMessage.messageID);
  }
};
