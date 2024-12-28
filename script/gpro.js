const axios = require('axios');

module.exports.config = {
  name: "gpro",
  version: "1.0",
  credits: "Developer",
  description: "AI-powered assistant using Gemini Pro",
  hasPrefix: false,
  usages: "{pn} [prompt]",
  aliases: ["geminipro"],
  cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const prompt = args.join(" ");
    if (!prompt) {
      await api.sendMessage("Please provide a question or prompt.", event.threadID);
      return;
    }

    const uid = Math.random().toString(36).substring(2, 15);

    const initialMessage = await new Promise(resolve => {
      api.sendMessage("Processing your request, please wait...", event.threadID, (err, info) => {
        resolve(info);
      }, event.messageID);
    });

    const response = await axios.get(`https://kaiz-apis.gleeze.com/api/gemini-pro?q=${encodeURIComponent(prompt)}&uid=${uid}`);
    const answer = response.data.response;

    await api.editMessage(
      `🤖 𝗚𝗘𝗠𝗜𝗡𝗜 𝗣𝗥𝗢\n━━━━━━━━━━━━━━━━━━\n${answer}`,
      initialMessage.messageID
    );
  } catch (error) {
    console.error("⚠️", error.message);
    await api.editMessage("An error occurred while processing your request. Please try again later.", initialMessage.messageID);
  }
};