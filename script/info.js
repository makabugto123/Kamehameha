const fs = require('fs');
const axios = require("axios");
const moment = require("moment-timezone");

let owner = {};

owner["config"] = {
    name: "info",
    version: "1.0.1",
    aliases: ["info", "owner", "Owner", "Info", "in", "fo"],
    role: 0,
    credits: "cliff",
    description: "Admin and Bot info.",
    cooldown: 5,
    hasPrefix: false,
};

owner["run"] = async function({ api, event, prefix, admin }) {
/** const database = JSON.parse(fs.readFileSync('./data/database.json', 'utf8'));

let threadCount = 0;
let userCount = new Set();

database.forEach(entry => {
  const threadID = Object.keys(entry)[0];
  const users = entry[threadID];

  if (users.length > 0) {
    threadCount++;
  }

  users.forEach(user => {
    userCount.add(user.id);
  });
});

userCount = userCount.size; **/
    let time = process.uptime();
    let years = Math.floor(time / (60 * 60 * 24 * 365));
    let months = Math.floor((time % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30));
    let days = Math.floor((time % (60 * 60 * 24 * 30)) / (60 * 60 * 24));
    let weeks = Math.floor(days / 7);
    let hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((time % (60 * 60)) / 60);
    let seconds = Math.floor(time % 60);
    const uptimeString = `${years > 0 ? `${years} years ` : ''}${months > 0 ? `${months} months ` : ''}${weeks > 0 ? `${weeks} weeks ` : ''}${days % 7 > 0 ? `${days % 7} days ` : ''}${hours > 0 ? `${hours} hours ` : ''}${minutes > 0 ? `${minutes} minutes ` : ''}${seconds} seconds`;

    const FILESOWNER = "𝗖𝗶𝗱";
    const juswa = moment.tz("Asia/Manila").format("『D/MM/YYYY』【HH:mm:ss】");

    let userid = api.getCurrentUserID();
    let dataa = await api.getUserInfo(userid);
    let namee = dataa[userid].name;

    let data = await api.getUserInfo(admin);
    let name = data[admin].name;

    const im = [
        "https://i.imgur.com/Fs6fZcZ.jpeg",
        "https://i.imgur.com/Mw9SHFX.jpeg"
    ];
    const randomIndex = Math.floor(Math.random() * im.length);
    const imgur = im[randomIndex];

    const response = `https://api.popcat.xyz/welcomecard?background=${imgur}&text1=AUTOBOT+INFORMATION&text2=${namee}&text3=Messenger+Chatbot&avatar=https://api-canvass.vercel.app/profile?uid=${userid}`;

  /** const link = [
                    "https://i.imgur.com/uthREbe.mp4",
                    "https://i.imgur.com/v4mLGte.mp4",
                    "https://i.imgur.com/DJylTiy.mp4",     "https://i.imgur.com/ee8fHna.mp4", "https://i.imgur.com/VffzOwS.mp4", "https://i.imgur.com/ci5nztg.mp4", "https://i.imgur.com/qHPeKDV.mp4", "https://i.imgur.com/Rkl5UmH.mp4",
"https://i.imgur.com/IGXINCB.mp4",
                    "https://i.imgur.com/qxPR4i6.mp4",
                    "https://i.imgur.com/9LDVC57.mp4",                
                    "https://i.imgur.com/r7IxgiR.mp4",          
                    "https://i.imgur.com/J1jWubu.mp4", 
                    "https://i.imgur.com/JnmXyO3.mp4",
                    "https://i.imgur.com/Qudb0Vl.mp4",
                    "https://i.imgur.com/N3wIadu.mp4",
                    "https://i.imgur.com/X7lugs3.mp4",
                    "https://i.imgur.com/6b61HGs.mp4",
                    "https://i.imgur.com/EPzjIbt.mp4",
                    "https://i.imgur.com/WWGiRvB.mp4",
                    "https://i.imgur.com/20QmmsT.mp4",
                    "https://i.imgur.com/nN28Eea.mp4",
                    "https://i.imgur.com/fknQ3Ut.mp4",
                    "https://i.imgur.com/yXZJ4A9.mp4",
                    "https://i.imgur.com/GnF9Fdw.mp4",
                    "https://i.imgur.com/B86BX8T.mp4",
                    "https://i.imgur.com/kZCBjkz.mp4",
                    "https://i.imgur.com/id5Rv7O.mp4",
                    "https://i.imgur.com/aWIyVpN.mp4",
                    "https://i.imgur.com/aFIwl8X.mp4",
                    "https://i.imgur.com/SJ60dUB.mp4",
                    "https://i.imgur.com/ySu69zS.mp4",
                    "https://i.imgur.com/mAmwCe6.mp4",
                    "https://i.imgur.com/Sbztqx2.mp4",
                    "https://i.imgur.com/s2d0BIK.mp4",
                    "https://i.imgur.com/rWRfAAZ.mp4",
                    "https://i.imgur.com/dYLBspd.mp4",
                    "https://i.imgur.com/HCv8Pfs.mp4",
                    "https://i.imgur.com/jdVLoxo.mp4",
                    "https://i.imgur.com/hX3Znez.mp4",
                    "https://i.imgur.com/cispiyh.mp4",
                    "https://i.imgur.com/ApOSepp.mp4",
                    "https://i.imgur.com/lFoNnZZ.mp4",
                    "https://i.imgur.com/qDsEv1Q.mp4",
                    "https://i.imgur.com/NjWUgW8.mp4",
                    "https://i.imgur.com/ViP4uvu.mp4",
                    "https://i.imgur.com/bim2U8C.mp4",
                    "https://i.imgur.com/YzlGSlm.mp4",
                    "https://i.imgur.com/HZpxU7h.mp4",
                    "https://i.imgur.com/exTO3J4.mp4",
                    "https://i.imgur.com/Xf6HVcA.mp4",
                    "https://i.imgur.com/9iOci5S.mp4",
                    "https://i.imgur.com/6w5tnvs.mp4",
                    "https://i.imgur.com/1L0DMtl.mp4",
                    "https://i.imgur.com/7wcQ8eW.mp4",
                    "https://i.imgur.com/3MBTpM8.mp4",
                    "https://i.imgur.com/8h1Vgum.mp4",
                    "https://i.imgur.com/CTcsUZk.mp4",
                    "https://i.imgur.com/e505Ko2.mp4",
                    "https://i.imgur.com/3umJ6NL.mp4"
                 ];
                 𖣯 ALL Threads: ${threadCount}
ᗢ ALL Users: ${userCount} **/

    const responsee = await axios.get(encodeURI(response), { responseType: 'stream' });

    api.sendMessage({
        body: `《《 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 》》

⁂ Bot Name: ${namee}
₪ Bot Admin: ${name}
✧ Main admin: 𝗝𝗮𝘆 𝗠𝗮𝗿
♛ Bot Admin Link: https://www.facebook.com/${admin}
❂ Bot Prefix: ${prefix}
✫ Files Owner: ${FILESOWNER}
➟ UPTIME: ${uptimeString}
✬ Today is: ${juswa} 

➳ Bot is running ${hours}:${minutes}:${seconds}.
✫ Thanks for using my bot`,
        attachment: responsee.data
    }, event.threadID, event.messageID);
};

module.exports = owner;