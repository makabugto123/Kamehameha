const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { canvas } = require('../api');

module.exports.config = {
    name: 'phub',
    version: '1.0.0',
    role: 0,
    hasPrefix: true,
    aliases: [],
    description: 'Generate a custom PHub image with user input',
    usage: 'phub [@mention] [text], reply to a message with phub [text], or just phub [text]',
    credits: 'chill',
    cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
    let chill, pogi, text;

    if (Object.keys(event.mentions).length > 0) {
        pogi = Object.keys(event.mentions)[0];
        chill = event.mentions[pogi];
        text = args.slice(1).join(' ');
    } else if (event.messageReply) {
        chill = event.messageReply.senderID;
        text = args.join(' ');
    } else {
        chill = event.senderID;
        text = args.join(' ');
    }

    if (!text) {
        return api.sendMessage('Please provide the text after the command.', event.threadID, event.messageID);
    }

    const apiUrl = `${canvas}/phub?text=${encodeURIComponent(text)}&name=${encodeURIComponent(chill)}&id=${encodeURIComponent(chill)}`;

    try {
        const response = await axios.get(apiUrl, { responseType: 'stream' });
        const imagePath = path.join(__dirname, 'phub_image.png');
        const writer = fs.createWriteStream(imagePath);

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        const attachment = fs.createReadStream(imagePath);

        await api.sendMessage({
            body: 'Here’s your PHub image!',
            attachment
        }, event.threadID, () => fs.unlinkSync(imagePath), event.messageID);
    } catch (error) {
        api.sendMessage('Failed to generate the image. Please try again later.', event.threadID, event.messageID);
    }
};
