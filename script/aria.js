const axios = require('axios');

module.exports.config = {
  name: "aria",
  version: 1.0,
  credits: "Jay Mar",
  description: "Ask a aria ai",
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

    const userid = Math.floor(Math.random() * 1000000); // Random UserID between 0 and 999999

    const initialMessage = await new Promise(resolve => {
      api.sendMessage("Thinking, please wait...", event.threadID, (err, info) => {
        resolve(info);
      }, event.messageID);
    });

    const apiUrl = `https://yt-video-production.up.railway.app/Aria?q=${encodeURIComponent(question)}&userid=${userid}`;
    const response = await axios.get(apiUrl);
    const answer = response.data.response;

    await api.editMessage(
      `☀ | 𝗔𝗥𝗜𝗔 𝗔𝗡𝗦𝗪𝗘𝗥\n━━━━━━━━━━━━━━━━━━\nQuestion: ${question}\nAnswer: ${answer}\n━━━━━━━━━━━━━━━━━━`,
      initialMessage.messageID
    );
  } catch (error) {
    console.error("⚠️", error.message);
    await api.editMessage("An error occurred while processing your request. Please try again later.", initialMessage.messageID);
  }
};