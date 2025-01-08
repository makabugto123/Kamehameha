const axios = require('axios');
const gif = 'https://i.imgur.com/piek9h4.gif';

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
    const bodyText = `My prefix: ${prefix || 'no-prefix'}\n\n- Use ${prefix}help to see the list of commands.- Type ${prefix}callad to report any problem.\n- Contact the admin for any questions.\nThank you for using this autobot 🫶😘.`;

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
