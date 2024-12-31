module.exports.config = {
  name: "pinterest2",
  version: "1.0.0",
  role: 0,
  credits: "cliff",
  description: "Image search",
  hasPrefix: false,
  commandCategory: "Search",
  usages: "[Text]",
  aliases: ["pinte"],
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const request = require("request");
  const keySearch = args.join(" ");
  if (!keySearch.includes("-")) return api.sendMessage('𝙿𝙻𝙴𝙰𝚂𝙴 𝙴𝙽𝚃𝙴𝚁 𝙰 𝙿𝚁𝙾𝙼𝙿𝚃\n\n𝙴𝚇𝙰𝙼𝙿𝙻𝙴 : pinterest ivana gon - 5', event.threadID, event.messageID);
  const keySearchs = keySearch.substr(0, keySearch.indexOf('-'));
  const numberSearch = keySearch.split("-").pop() || 6;

  let numImages = parseInt(numberSearch) || 1;
  numImages = Math.abs(numImages);
  if (numImages > 15) {
    return api.sendMessage(
      "The number of images cannot exceed 15. Please provide a number up to 15.",
      event.threadID,
      event.messageID
    );
  }

  const res = await axios.get(`https://betadash-uploader.vercel.app/pinterest?search=${encodeURIComponent(keySearchs)}&count=${numImages}`);
  const data = res.data && res.data.data;

  var num = 0;
  var imgData = [];
  for (var i = 0; i < numImages; i++) {
    let path = __dirname + `/cache/${num+=1}.jpg`;
    let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
    imgData.push(fs.createReadStream(__dirname + `/cache/${num}.jpg`));
  }

  const count = data.length;

  api.sendMessage({
    attachment: imgData,
    body: `${numImages} 𝙾𝚄𝚃 𝙾𝙵 ${count} 𝙿𝙸𝙲𝚂 𝙵𝙸𝙽𝙳𝙴𝙳\n✧━━━━━━━━━━✧\n𝚁𝙴𝚂𝚄𝙻𝚃𝚂 𝙾𝙵: ${keySearchs}`
  }, event.threadID, event.messageID);

  for (let ii = 1; ii < numImages; ii++) {
    fs.unlinkSync(__dirname + `/cache/${ii}.jpg`)
  }
};