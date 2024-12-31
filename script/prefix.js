const axios = require('axios');
const gif = 'https://i.imgur.com/xnWVcVz.gif';

module.exports.config = {
    name: "prefix",
    version: "1.0.1",
    role: 0,
    credits: "Designed by Heru",
    description: "Display the prefix of your bot",
    hasPrefix: false,
    usages: "prefix",
    cooldown: 5,
    aliases: ["prefix", "Prefix", "PREFIX", "prefi"],
};

module.exports.run = async function ({ api, event, prefix, admin }) {
    const userid = await api.getCurrentUserID();
    const bodyText = `
╭━━━━━[ 𝗕𝗢𝗧 𝗣𝗥𝗘𝗙𝗜𝗫 ]━━━━━╮
┃
┃ Yo! My prefix is: 𓆩 ${prefix || 'no-prefix'} 𓆪
┃
┣━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 𝗨𝗦𝗘𝗙𝗨𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦:
┃ ➥ ${prefix}help [page] → View commands
┃ ➥ ${prefix}sim [message] → Talk to bot
┃ ➥ ${prefix}callad [message] → Report issues
┃ ➥ ${prefix}help [command] → Get usage info
┃
┣━━━━━━━━━━━━━━━━━━━━━━━┫
┃ ❤️ Enjoy using my bot! ❤️
╰━━━━━━━━━━━━━━━━━━━━━━━╯`;

    try {
        const response = await axios.get(gif, { responseType: 'stream' });
        api.sendMessage({
            body: bodyText,
            attachment: response.data
        }, event.threadID);
    } catch (error) {
        api.sendMessage(
            `An error occurred while fetching the gif.\n${error.message}`,
            event.threadID
        );
    }
};
