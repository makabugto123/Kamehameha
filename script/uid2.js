const axios = require('axios');

module.exports.config = {
  name: "uid2",
  version: "1.0.0",
  role: 0,
  credits: "Cliff",
  hasPrefix: false,
  description: "get user id.",
  cooldowns: 0
};

module.exports.run = async function ({ event, api, args }) {
  const sendImage = async (url, messageBody) => {
    const response = await axios.get(url, { responseType: 'stream' });
    api.sendMessage({
      body: messageBody,
      attachment: response.data
    }, event.threadID, event.messageID);
  };

  if (event.type == "message_reply") {
    let uid = event.messageReply.senderID;
    let messageBody = `=== [ 𝗨𝗜𝗗 𝗨𝗦𝗘𝗥 ] ====\n━━━━━━━━━━━━━━━━━━\n[ ▶️]➜ 𝗜𝗗: ${uid}\n[ ▶️]➜ 𝗜𝗕: m.me/${uid}\n[ ▶️]➜ 𝗟𝗶𝗻𝗸𝗳𝗯: https://www.facebook.com/profile.php?id=${uid}\n━━━━━━━━━━━━━━━━━━`;
    let url = `https://api-canvass.vercel.app/profile?uid=${uid}`;
    await sendImage(encodeURI(url), messageBody);
  } else if (!args[0]) {
    let uid = event.senderID;
    const res = await axios.get(`https://www.nguyenmanh.name.vn/api/fbInfo?id=${uid}&apikey=LV7LWgAp`);
    let name = res.data.result.name;
    let messageBody = `=== [ 𝗨𝗜𝗗 𝗨𝗦𝗘𝗥 ] ====\n━━━━━━━━━━━━━━━━━━\n[ ▶️]➜ 𝗡𝗮𝗺𝗲: ${name}\n[ ▶️]➜ 𝗜𝗗: ${uid}\n[ ▶️]➜ 𝗜𝗕: m.me/${uid}\n[ ▶️]➜ 𝗟𝗶𝗻𝗸𝗳𝗯: https://www.facebook.com/profile.php?id=${uid}\n━━━━━━━━━━━━━━━━━━`;
    let url = `https://api-canvass.vercel.app/profile?uid=${uid}`;
    await sendImage(encodeURI(url), messageBody);
  } else {
    if (args[0].indexOf(".com/") !== -1) {
      const res_ID = await api.getUID(args[0]);
      const data = await api.getUserInfo(res_ID);
      let username = data.username;
      let link = data.link;
      let messageBody = `=== [ 𝗨𝗜𝗗 𝗨𝗦𝗘𝗥 ] ====\n━━━━━━━━━━━━━━━━━━\n[ ▶️]➜ 𝗡𝗮𝗺𝗲: ${username}\n[ ▶️]➜ 𝗜𝗗: ${res_ID}\n[ ▶️]➜ 𝗜𝗕: m.me/${res_ID}\n[ ▶️]➜ 𝗟𝗶𝗻𝗸𝗳𝗯: ${link}\n━━━━━━━━━━━━━━━━━━`;
      let url = `https://api-canvass.vercel.app/profile?uid=${res_ID}`;
      await sendImage(encodeURI(url), messageBody);
    } else {
      let uid = Object.keys(event.mentions)[0];
      let messageBody = `=== [ 𝗨𝗜𝗗 𝗨𝗦𝗘𝗥 ] ====\n━━━━━━━━━━━━━━━━━━\n[ ▶️]➜ 𝗜𝗗: ${uid}\n[ ▶️]➜ 𝗜𝗕: m.me/${uid}\n[ ▶️]➜ 𝗟𝗶𝗻𝗸𝗳𝗯: https://www.facebook.com/profile.php?id=${uid}\n━━━━━━━━━━━━━━━━━━`;
      let url = `https://api-canvass.vercel.app/profile?uid=${uid}`;
      await sendImage(encodeURI(url), messageBody);
    }
  }
};