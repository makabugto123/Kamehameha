const path = require("path");
const axios = require("axios");
const fs = require("fs");
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  'Content-Type': 'application/json',
};

module.exports.config = {
  name: "video",
  version: "9",
  credits: "Cliff",
  description: "Search video from YouTube",
  commandCategory: "media",
  hasPermssion: 0,
  cooldowns: 9,
  usages: "[video [search]",
  role: 0,
  hasPrefix: false,
};

module.exports.run = async function ({ api, args, event }) {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      const messageInfo = await new Promise(resolve => {
        api.sendMessage("Usage: video 
", event.threadID, (err, info) => {
          resolve(info);
        });
      });

      setTimeout(() => {
        api.unsendMessage(messageInfo.messageID);
      }, 10000);

      return;
    }

    const ugh = await new Promise(resolve => {
      api.sendMessage(`Searching for '${searchQuery}', please wait...`, event.threadID, (err, info1) => {
        resolve(info1);
      });
    });

    const videoSearchUrl = `https://betadash-search-download.vercel.app/yt?search=${encodeURIComponent(searchQuery)}`;
    const videoResponse = await axios.get(videoSearchUrl);
    const videoData = videoResponse.data[0];

    const videoUrl = videoData.url;
    const { title, time, views, thumbnail, channelName } = videoData;

    const kupal = `https://yt-video-production.up.railway.app/ytdl?url=${videoUrl}`;
    const vid = await axios.get(kupal, { headers});
    const videos = vid.data.video;

    const videoPath = path.join(__dirname, "cache", "videov2.mp4");

    const videoDownload = await axios.get(videos, { responseType: "arraybuffer" });
    fs.writeFileSync(videoPath, Buffer.from(videoDownload.data));

    api.unsendMessage(ugh.messageID);

    await api.sendMessage(
      {
        body: `𝗧𝗶𝘁𝗹𝗲: ${title}\n𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${time}\n𝗩𝗶𝗲𝘄𝘀: ${views}`,
        attachment: fs.createReadStream(videoPath),
      },
      event.threadID,
      event.messageID
    );

    fs.unlinkSync(videoPath);
  } catch (error) {
    const tf = await new Promise(resolve => {
      api.sendMessage(error.message, event.threadID, (err, info) => {
        resolve(info);
      });
    });

    setTimeout(() => {
      api.unsendMessage(tf.messageID);
    }, 10000);
  }
};