const axios = require('axios');

module.exports.config = {
  name: "blackbox",
  version: "9",
  role: 0,
  hasPrefix: false,
  credits: "Cliff", //api by kenlie
  description: "AI powered by blackbox",
  aliases: ["box", "bb"],
  cooldowns: 0,
};

module.exports.run = async function ({api, event, args}) {
  const symbols = ["✧", "✿"];
  const randomIndex = Math.floor(Math.random() * symbols.length);
  const tae = symbols[randomIndex];
  const query = encodeURIComponent(args.join(" "));

if (!query) {
          const messageInfo = await new Promise(resolve => {
            api.sendMessage('Please provide a question first!', event.threadID, (err, info) => {
                resolve(info);
            });
        });

        setTimeout(() => {
            api.unsendMessage(messageInfo.messageID);
        }, 10000);

        return;
}

      const cliff = await new Promise(resolve => { api.sendMessage('⏳ Searching....', event.threadID, (err, info1) => {
      resolve(info1);
     }, event.messageID);
    });

  const apiUrl = `https://yt-video-production.up.railway.app/blackbox?ask=${query}`;

  try {
    const response = await axios.get(apiUrl);
    const ans = response.data.Response;
    const cleanResponseData = ans.replace(/\n\nIs this answer helpful to you\? Kindly click the link below\nhttps:\/\/click2donate.kenliejugarap.com\n\(Clicking the link and clicking any ads or button and wait for 30 seconds \(3 times\) everyday is a big donation and help to us to maintain the servers, last longer, and upgrade servers in the future\)/, '');
    api.editMessage(`${tae} | 𝗕𝗟𝗔𝗖𝗞𝗕𝗢𝗫 𝗔𝗜\n━━━━━━━━━━━━━━━━━━\n${ans}\n━━━━━━━━━━━━━━━━━━`, cliff.messageID);
  } catch (error) {
    console.error();
    api.sendMessage("❎ Error, Please contact Jay Mar.", event.threadID, event.messageID);
  }
};