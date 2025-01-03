const axios = require('axios');

module.exports.config = {
  name: "smsbomb",
  version: "1.0",
  credits: "Developer",
  description: "Send multiple SMS to a specific phone number for testing purposes.",
  hasPrefix: false,
  usages: "{pn} [phone] [times]",
  aliases: [],
  cooldown: 10,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const phone = args[0];
    const times = parseInt(args[1], 10);

    if (!phone || isNaN(times) || times <= 0) {
      return api.sendMessage(
        "Invalid usage. Please provide a valid phone number and the number of messages to send.\nExample: smsbomb 1234567890 5",
        event.threadID
      );
    }

    const apiUrl = `https://haji-mix.gleeze.com/smsbomber?phone=${encodeURIComponent(phone)}&times=${times}`;
    const response = await axios.get(apiUrl);

    if (response.data.status) {
      const { success, failed } = response.data.details;

      return api.sendMessage(
        `✅ SMS Bomber Completed!\n📱 Phone Number: ${phone}\n📤 Messages Sent: ${times}\n✔️ Successful: ${success}\n❌ Failed: ${failed}`,
        event.threadID
      );
    } else {
      throw new Error(response.data.message || "Failed to initiate SMS Bomber.");
    }
  } catch (error) {
    return api.sendMessage(
      `❌ An error occurred:\n${error.message}`,
      event.threadID
    );
  }
};
