const axios = require('axios');

async function getUserName(api, senderID) {
  try {
    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID]?.name || "User";
  } catch (error) {
    console.log(error);
    return "User";
  }
}

module.exports.config = {
  name: "delete",
  version: "1.0.0",
  role: 0,
  hasPrefix: false,
  credits: "Cliff",
  description: "",
  usages: "{p}{n} mention",
  cooldown: 5,
  aliases: []
};

module.exports.run = async function ({ api, event, args }) {
  const mentionID = Object.keys(event.mentions)[0] || event.messageReply?.senderID;
  if (!mentionID) {
    return api.sendMessage('Please mention a user', event.threadID, event.messageID);
  }

  try {
    const userInfo = await api.getUserInfo(mentionID);
    const realName = userInfo[mentionID]?.name || "Unknown";

    const url = `https://api-canvass.vercel.app/delete?userid=${mentionID}`;
    const response = await axios.get(url, { responseType: 'stream' });

    let name = await getUserName(api, event.senderID);
    let mentions = [{
      tag: name,
      id: event.senderID
    }];

    api.sendMessage({
      body: `🗑 𝖠𝗋𝖾 𝗒𝗈𝗎 𝗌𝗎𝗋𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾 𝗍𝗁𝗂𝗌 𝗍𝗋𝖺𝗌𝗁 𝖿𝗂𝗅𝖾 ${realName}`,
      attachment: response.data,
      mentions
    }, event.threadID);

  } catch (error) {
    api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
  }
};