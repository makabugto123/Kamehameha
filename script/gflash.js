const axios = require('axios');

module.exports.config = {
  name: "gflash",
  version: 1.0,
  credits: "heru",
  description: "AI-powered response using Gemini Flash",
  hasPrefix: false,
  usages: "{pn} [prompt]",
  aliases: [],
  cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const prompt = args.join(" ");
    if (!prompt) {
      await api.sendMessage("Please provide a prompt.", event.threadID);
      return;
    }

    const initialMessage = await new Promise(resolve => {
      api.sendMessage("Processing your request, please wait...", event.threadID, (err, info) => {
        resolve(info);
      }, event.messageID);
    });

    const response = await axios.get(`https://api.joshweb.click/gemini?prompt=${encodeURIComponent(prompt)}`);
    const answer = response.data.gemini;

    await api.editMessage(
      `🤖 𝗚𝗙𝗟𝗔𝗦𝗛\n━━━━━━━━━━━━━━━━━━\n${answer}`,
      initialMessage.messageID
    );
  } catch (error) {
    console.error("⚠️", error.message);
    await api.editMessage("An error occurred while processing your request. Please try again later.", initialMessage.messageID);
  }
};
