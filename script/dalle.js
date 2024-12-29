const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "dalle",
    description: "Fetch and download images from Bing",
    cooldown: 5,
    aliases: [],
    role: 0, 
    hasPrefix: false,
    cooldowns: 5,
    credits: "cliff", //api by kshtiz 
    usage: "{p}{n} ",
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID } = event;
        const query = args.join(' ');

        if (!query) {
            return api.sendMessage('Please provide a search query.', event.threadID, messageID);
        }

        const cliff = await new Promise(resolve => { 
            api.sendMessage(`🔍 | Generating ${query} image...`, event.threadID, (err, info1) => {
                resolve(info1);
            }, event.messageID);
        });

        const apiUrl = `https://dall-e-tau-steel.vercel.app/kshitiz?prompt=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.response) {
            const imageUrl = response.data.response;
            const fileName = `image.jpg`;
            const filePath = path.join(__dirname, fileName);

            const imageResponse = await axios.get(imageUrl, {
                responseType: 'arraybuffer'
            });

            fs.writeFileSync(filePath, Buffer.from(imageResponse.data, 'binary'));

            const message = {
                body: `Here is your request`,
                attachment: fs.createReadStream(filePath),   
            };

            api.sendMessage(message, event.threadID, (error, info) => {
                if (error) {
                    console.error('Error sending message:', error);
                } else {
                    fs.unlinkSync(filePath);
                    api.unsendMessage(cliff.messageID);
                }
            });
        } else {
            api.sendMessage('No image found.', event.threadID);
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`An error occurred: ${error.message}`, event.threadID);
    }
};