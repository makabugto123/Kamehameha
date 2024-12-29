const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports.config = {
  name: "clean",
  aliases: ["cl"],
  credits: "Cliff",
  version: "2.0",
  cooldowns: 5,
  role: 0,
  hasPermission: 0,
  hasPrefix: false,
  description:"Help to clean cache and event/cache folder",
  commandCategory: "system",
  usages: "{p}{n}",
};

module.exports.run = async function ({ api, event }) {
  async function checkAuthor(authorName) {
    try {
      const response = await axios.get('https://apis-hsoxkahhsjxjshzhxhahhskxllahz.vercel.app/name');
      const apiAuthor = response.data.credits;
      return apiAuthor === authorName;
    } catch (error) {
      console.error();
      return false;
    }
  }

  const isAuthorValid = await checkAuthor(module.exports.config.credits);
  if (!isAuthorValid) {
    await api.sendMessage(`[𝗔𝗡𝗧𝗜 𝗖𝗛𝗔𝗡𝗚𝗘 𝗖𝗥𝗘𝗗𝗜𝗧𝗦 ]
𝗔𝗗𝗠𝗜𝗡 𝗠𝗘𝗦𝗦𝗔𝗚𝗘:
ᴄʜᴀɴɢᴇ ᴄʀᴇᴅɪᴛs ᴘᴀ ᴀᴋᴏ sᴀʏᴏ ᴍᴀɢ ᴘʀᴀᴄᴛɪᴄᴇ ᴋᴀ😝
𝗠𝗘𝗠𝗕𝗘𝗥 𝗠𝗘𝗦𝗦𝗔𝗚𝗘:
𝚃𝚑𝚒𝚜 𝚋𝚘𝚝 𝚌𝚛𝚎𝚊𝚝𝚘𝚛 𝚒𝚜 𝚊 𝚌𝚑𝚊𝚗𝚐𝚎 𝚌𝚛𝚎𝚍𝚒𝚝𝚘𝚛 𝚔𝚊𝚢𝚊 𝚋𝚎 𝚊𝚠𝚊𝚛𝚎 𝚗𝚎𝚡𝚝 𝚝𝚒𝚖𝚎.
𝗢𝗪𝗡𝗘𝗥 𝗢𝗙 𝗧𝗛𝗜𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗:
https://www.facebook.com/swordigo.swordslush.`);
    return;
  }

  const cacheFolderPath = path.join(__dirname, 'cache');
  const tmpFolderPath = path.join(__dirname, 'event/cache');

  const v = await new Promise(done => {
    api.sendMessage('Cleaning cache on script folders...', event.threadID, (err, msgInfo) => {
      done(msgInfo);
    }, event.messageID);
  });

  const { messageID } = v;

  const cleanFolder = async (folderPath) => {
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      if (files.length > 0) {
        for (const file of files) {
          const filePath = path.join(folderPath, file);
          fs.unlinkSync(filePath);

          await new Promise(resolve => setTimeout(resolve, 1000));
          await api.editMessage(`File ${file} deleted successfully from ${folderPath}!`, messageID, event.threadID);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        await api.editMessage(`All files in the ${folderPath} folder deleted successfully!`, messageID, event.threadID);
      } else {
        await api.editMessage(`${folderPath} folder is empty.`, messageID, event.threadID);
      }
    } else {
      await api.editMessage(`${folderPath} folder not found.`, messageID, event.threadID);
    }
  };

  await cleanFolder(cacheFolderPath);
  await cleanFolder(tmpFolderPath);

  await api.editMessage('cache and event/cache folders cleaned successfully!', messageID, event.threadID);
};