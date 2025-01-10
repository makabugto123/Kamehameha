const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { josh } = require('../api');

module.exports.config = {
    name: 'voice',
    version: '1.0.0',
    role: 0,
    hasPrefix: true,
    aliases: [],
    description: 'Generate AI voice from text',
    usage: 'voice [text] | [id]',
    credits: 'chilli',
    cooldown: 3,
};

module.exports.run = async function ({ api, event, args }) {
    const input = args.join(' ').split('|');
    if (input.length !== 2) {
        return api.sendMessage('Invalid format. Please use: voice [text] | [id]', event.threadID, event.messageID);
    }

    const text = input[0].trim();
    const id = parseInt(input[1].trim());

    if (isNaN(id) || id < 1 || id > 8) {
        return api.sendMessage('Invalid ID. Please use an ID between 1 and 8.', event.threadID, event.messageID);
    }

    const apiUrl = `${josh}/api/aivoice?q=${encodeURIComponent(text)}&id=${id}`;
    const voicePath = path.join(__dirname, 'pogi_voice.mp3');

    try {
        const response = await axios.get(apiUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream(voicePath);

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        await api.sendMessage(
            {
                body: '',
                attachment: fs.createReadStream(voicePath),
            },
            event.threadID,
            () => fs.unlinkSync(voicePath),
            event.messageID
        );
    } catch (error) {
        await api.sendMessage('Failed to generate voice. Please try again later.', event.threadID, event.messageID);
    }
};
