const axios = require('axios');

module.exports.config = {
  name: "gpt4",
  version: 1.0,
  credits: "heru",
  description: "AI-powered chatbot using GPT-4",
  hasPrefix: false,
  usages: "{pn} [prompt]",
  aliases: [],
  cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const prompt = args.join(" ");
    if (!prompt) {
      await api.sendMessage("Please provide a question.", event.threadID);
      return;
    }

    const initialMessage = await new Promise(resolve => {
      api.sendMessage("Thinking, please wait...", event.threadID, (err, info) => {
        resolve(info);
      }, event.messageID);
    });

    const response = await axios.get(`https://nash-api.onrender.com/api/gpt4?query=${encodeURIComponent(prompt)}`);
    const answer = response.data.response;

    await api.editMessage(
      `🤖 𝗚𝗣𝗧-𝟰\n━━━━━━━━━━━━━━━━━━\n${answer}`,
      initialMessage.messageID
    );
  } catch (error) {
    console.error("⚠️", error.message);
    await api.editMessage("An error occurred while processing your request. Please try again later.", initialMessage.messageID);
  }
};