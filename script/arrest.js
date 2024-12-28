const axios = require('axios');

module.exports.config = {
  name: "arrest",
  role: 0,
  credits: "Cliff",
  description: "blink",
  hasPrefix: false,
  usages: "{pn} @mention {pn} reply",
  cooldown: 5,
  aliases: [],
};

module.exports.run = async function({ api, event, args }) {
  try {
const mentionID = Object.keys(event.mentions)[0] || (event.messageReply && event.messageReply.senderID);

    if (!mentionID) {
      return api.sendMessage('Please mention or reply a user you want to arrest', event.threadID, event.messageID);
    }

    const userInfo = await api.getUserInfo(mentionID);
    const realName = userInfo[mentionID]?.name;

/**  let userID;

    if (args.length === 0) {
      if (event.messageReply) {
        userID = event.messageReply.senderID;
      } else {
        userID = event.senderID;
      }
    } else if (Object.keys(event.mentions).length === 0) {
      userID = args.join(" ");
    } else {
      for (const mentionID in event.mentions) {
        userID = mentionID;
        break;
      }
    } **/

    const response = `https://api-canvass.vercel.app/arrest?one=${event.senderID}&two=${mentionID}`;

const responsee = await axios.get(response, { responseType: 'stream' });

    return api.sendMessage({
      attachment: responsee.data
    }, event.threadID, event.messageID);

  } catch (err) {
    return api.sendMessage('Error while processing blink request', event.threadID, event.messageID);
  }
};