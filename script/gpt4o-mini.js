const axios = require('axios');

module.exports.config = {
    name: 'gpt4o-mini',
    version: '1.0.0',
    role: 0,
    hasPrefix: false,
    description: "An AI command powered by OpenAI",
    usages: "",
    credits: 'Developer',
    cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
    if (!args[0]) {
        api.sendMessage("Please provide a question", event.threadID);
        return;
    }

    const question = args.join(" ");
    const apiUrl = `https://betadash-api-swordslush.vercel.app/gpt-4o-mini?ask=${encodeURIComponent(question)}`;

    try {
        const response = await axios.get(apiUrl);
        api.sendMessage(response.data.message, event.threadID, event.messageID);
    } catch (error) {
        api.sendMessage("An error occurred while processing your request. Please try again later.", event.threadID);
    }
};