const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { kaizen } = require('../api');

module.exports.config = {
    name: 'bj',
    version: '1.0.0',
    role: 0,
    hasPrefix: true,
    aliases: [],
    description: 'Send a random blowjob GIF',
    usage: 'bj',
    credits: 'churchill',
    cooldown: 3,
};

module.exports.run = async function ({ api, event }) {
    const apiUrl = `${kaizen}/api/blowjob`;
    const gifPath = path.join(__dirname, 'random_bj.gif');

    try {
        const response = await axios.get(apiUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream(gifPath);

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        await api.sendMessage(
            {
                body: '',
                attachment: fs.createReadStream(gifPath),
            },
            event.threadID,
            () => fs.unlinkSync(gifPath),
            event.messageID
        );
    } catch (error) {
        await api.sendMessage('Failed to retrieve GIF. Please try again later.', event.threadID, event.messageID);
    }
};
