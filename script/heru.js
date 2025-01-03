const axios = require('axios');

module.exports.config = {
  name: "heru",
  version: 1.0,
  credits: "Jay Mar",
  description: "Interact to heru ai",
  hasPrefix: false,
  usages: "{pn} [question]",
  aliases: [],
  cooldown: 5,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const question = args.join(" ");
    if (!question) {
      await api.sendMessage("Please provide a question.", event.threadID);
      return;
    }

    const uid = Math.floor(Math.random() * 1000000);

    const initialMessage = await new Promise(resolve => {
      api.sendMessage("Thinking, please wait...", event.threadID, (err, info) => {
        resolve(info);
      }, event.messageID);
    });

    const apiUrl = `https://heru-apiv2.ddnsfree.com/api/heru?uid=${uid}&question=${encodeURIComponent(question)}`;
    const response = await axios.get(apiUrl);
    const answer = response.data.response;

    await api.editMessage(
      `☀ | 𝗛𝗘𝗥𝗨 𝗔𝗡𝗦𝗪𝗘𝗥\n━━━━━━━━━━━━━━━━━━\nQuestion: ${question}\nAnswer: ${answer}\n━━━━━━━━━━━━━━━━━━`,
      initialMessage.messageID
    );
  } catch (error) {
    console.error("⚠️", error.message);
    await api.editMessage("An error occurred while processing your request. Please try again later.", initialMessage.messageID);
  }
};