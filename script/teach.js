const axios = require('axios');

module.exports.config = {
  name: "teach",
  version: 1.0,
  credits: "Jerome",
  description: "Teach SimSimi using the format question => answer.",
  hasPrefix: false,
  usages: "{pn} [question => answer]",
  aliases: [],
  cooldown: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const text = args.join(" ");
  const text1 = text.substr(0, text.indexOf(' => ')).trim();
  const text2 = text.split(' => ').pop().trim();

  if (!text1 || !text2) {
    await api.sendMessage(
      formatResponse('Please provide both a question and an answer. Example: teach hi => hello'),
      event.threadID
    );
    return;
  }

  const primaryApiUrl = `https://simsimi-api-pro.onrender.com/teach?ask=${encodeURIComponent(text1)}&ans=${encodeURIComponent(text2)}`;
  const secondaryApiUrl = `https://simsimi.gleeze.com/teach?ask=${encodeURIComponent(text1)}&ans=${encodeURIComponent(text2)}`;

  try {
    const response = await axios.get(primaryApiUrl);

    if (response.data.status === 200) {
      const teachResponse = response.data.teachResponse.respond;
      const successMessage = teachResponse.includes('already exists')
        ? formatResponse(`SimSimi already knows the answer for question "${text1}".`)
        : formatResponse(`SimSimi learned this new answer for question "${text1}": ${teachResponse}`);

      await api.sendMessage(
        formatResponse(`Your question: ${text1}\nSimSimi's response: ${text2}\n${successMessage}`),
        event.threadID
      );
    } else {
      throw new Error('Primary API response error');
    }
  } catch (error) {
    try {
      const fallbackResponse = await axios.get(secondaryApiUrl);

      if (fallbackResponse.data.status === 200) {
        const teachResponse = fallbackResponse.data.teachResponse.respond;
        const successMessage = teachResponse.includes('already exists')
          ? formatResponse(`SimSimi already knows the answer for question "${text1}".`)
          : formatResponse(`SimSimi learned this new answer for question "${text1}": ${teachResponse}`);

        await api.sendMessage(
          formatResponse(`Your question: ${text1}\nSimSimi's response: ${text2}\n${successMessage}`),
          event.threadID
        );
      } else {
        throw new Error('Secondary API response error');
      }
    } catch (fallbackError) {
      await api.sendMessage(
        formatResponse('Both SimSimi APIs are unavailable. Please try again later.'),
        event.threadID
      );
    }
  }
};

function formatResponse(responseText) {
  const fontMap = {
    'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿',
    'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃', 'k': '𝗄', 'l': '𝗅',
    'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋',
    's': '𝗌', 't': '𝗍', 'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑',
    'y': '𝗒', 'z': '𝗓',
    'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥',
    'G': '𝖦', 'H': '𝖧', 'I': '𝖨', 'J': '𝖩', 'K': '𝖪', 'L': '𝖫',
    'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯', 'Q': '𝖰', 'R': '𝖱',
    'S': '𝖲', 'T': '𝖳', 'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷',
    'Y': '𝖸', 'Z': '𝖹', ' ': ' '
  };

  return responseText.split('').map(char => fontMap[char] || char).join('');
}