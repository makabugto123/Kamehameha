const axios = require('axios');

module.exports.config = {
  name: "qwen",
  version: 1.0,
  credits: "heru",
  description: "Conversational AI powered by Qwen-1.5-14B",
  hasPrefix: false,
  usages: "{pn} [prompt]",
  aliases: [],
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
      api.sendMessage("Thinking, please wait...", event.threadID, (err, info) => {
        resolve(info);
      }, event.messageID);
    });

    const response = await axios.get(`https://api.joshweb.click/ai/qwen1.5-14b?q=${encodeURIComponent(prompt)}&uid=${uid}`);
    const answer = response.data.result;

    await api.editMessage(
      `🤖 𝗤𝗪𝗘𝗡\n━━━━━━━━━━━━━━━━━━\n${answer}`,
      initialMessage.messageID
    );
  } catch (error) {
    console.error("⚠️", error.message);
    await api.editMessage("An error occurred while processing your request. Please try again later.", initialMessage.messageID);
  }
};
