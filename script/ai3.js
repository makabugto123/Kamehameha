const axios = require('axios');

module.exports.config = {
  name: "ai3", // Command name updated to "ai"
  version: 1.0,
  credits: "heru",
  description: "Conversational AI-powered chatbot using GPT-4o",
  hasPrefix: false,
  usages: "{pn} [prompt]",
  aliases: [],
  cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const prompt = args.join(" ");
    if (!prompt) {
      await api.sendMessage("🤖 Hey, I'm your virtual assistant, How can I assist you today?", event.threadID);
      return;
    }

    const initialMessage = await new Promise(resolve => {
      api.sendMessage("Thinking, please wait...", event.threadID, (err, info) => {
        resolve(info);
      }, event.messageID);
    });

    const uid = event.threadID;
    const response = await axios.get(`https://kaiz-apis.gleeze.com/api/gpt-4o?q=${encodeURIComponent(prompt)}&uid=${uid}`);
    const answer = response.data.response;

    await api.editMessage(
      `${answer}`,
      initialMessage.messageID
    );
  } catch (error) {
    console.error("⚠️", error.message);
    await api.editMessage("An error occurred while processing your request. Please try again later.", initialMessage.messageID);
  }
};
