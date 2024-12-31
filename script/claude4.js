const axios = require('axios');

module.exports.config = {
  name: "claude4",
  version: 1.0,
  credits: "heru",
  description: "AI-powered chatbot using Claude4",
  hasPrefix: false,
  usages: "claude4 [query]",
  aliases: ["claude4.0"],
  cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const query = args.join(" ");
    if (!query) {
      await api.sendMessage("Please provide a query first.", event.threadID);
      return;
    }

    const initialMessage = await new Promise(resolve => {
      api.sendMessage("⏳ Answering....", event.threadID, (err, info) => {
        resolve(info);
      }, event.messageID);
    });

    const response = await axios.get(`https://heru-apiv2.ddnsfree.com/api/claude-3-5-sonnet-20241022?query=${encodeURIComponent(query)}`);
    const answer = response.data.response;

    await api.editMessage("🤖 𝗖𝗟𝗔𝗨𝗗𝗘𝟰\n━━━━━━━━━━━━━━━━━━\n" + answer + "\n━━━━━━━━━━━━━━━━━━", initialMessage.messageID);
  } catch (error) {
    console.error("⚠️", error.message);
    await api.editMessage("An error occurred while processing your request. Please try again later.", initialMessage.messageID);
  }
};
