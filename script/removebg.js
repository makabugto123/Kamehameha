const axios = require('axios');

module.exports.config = {
  name: "removebg",
  version: "1.0",
  role: 0,
  hasPermision: 0,
  commandCategory: "Utility",
  credits: "cliff",
  description: "Enhance your photo by removing the background.",
  hasPrefix: false,
  cooldowns: 2,
  usePrefix: false,
  cooldown: 2,
  usage: "replying photo",
  usages: "replying photo"
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;

  let photoUrl = event.messageReply ? event.messageReply.attachments[0].url : args.join(" ");

  if (!photoUrl) {
    api.sendMessage("📸 Please reply to a photo or provide a photo URL to process and remove the background.", threadID, messageID);
    return;
  }

  try {
    api.sendMessage("🕟 | 𝚁𝚎𝚖𝚘𝚟𝚒𝚗𝚐 𝚋𝚊𝚌𝚔𝚐𝚛𝚘𝚞𝚗𝚍, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", threadID, messageID);
      const imgurUploadUrl = `https://betadash-uploader.vercel.app/imgur?link=${encodeURIComponent(url)}`;
            const upload = await axios.get(imgurUploadUrl);
            const imgurLink = upload.data.uploaded.image;
    const response = await axios.get(`https://kaiz-apis.gleeze.com/api/removebg-v2?url=${imgurLink}`);

    const img = (await axios.get(response.data.imageUrl, { responseType: "arraybuffer" })).data;

    api.sendMessage({
      body: "🔮 𝙱𝚊𝚌𝚔𝚐𝚛𝚘𝚞𝚗𝚍 𝚛𝚎𝚖𝚘𝚟𝚎 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢",
      attachment: img
    }, threadID, messageID);
  } catch (error) {
    api.sendMessage(`Error processing image: ${error}`, threadID, messageID);
  };
};