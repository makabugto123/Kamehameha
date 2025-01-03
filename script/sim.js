const axios = require('axios');

module.exports.config = {
  name: "sim",
  version: 1.0,
  credits: "Jerome",
  description: "Talk to Sim! Type your message to get a response.",
  hasPrefix: false,
  usages: "{pn} [message]",
  aliases: [],
  cooldown: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const userMessage = args.join(' ');

  if (!userMessage) {
    await api.sendMessage(
      formatResponse("Please type a message to Sim, e.g., `sim hello`."),
      event.threadID
    );
    return;
  }

  const primaryApiUrl = `https://simsimi-api-pro.onrender.com/sim?query=${encodeURIComponent(userMessage)}`;
  const secondaryApiUrl = `https://simsimi.gleeze.com/sim?query=${encodeURIComponent(userMessage)}`;

  try {
    const response = await axios.get(primaryApiUrl);
    const simResponse = response.data.respond;

    const formattedResponse = formatResponse(simResponse);
    await api.sendMessage(formattedResponse, event.threadID);
  } catch (primaryError) {
    try {
      const fallbackResponse = await axios.get(secondaryApiUrl);
      const simResponse = fallbackResponse.data.respond;

      const formattedResponse = formatResponse(simResponse);
      await api.sendMessage(formattedResponse, event.threadID);
    } catch (fallbackError) {
      await api.sendMessage(
        formatResponse("Sorry, there was an error fetching a response from SimSimi. Please try again later."),
        event.threadID
      );
    }
  }
};

function formatResponse(responseText) {
  const fontMap = {
    'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏',
    'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕',
    'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛',
    's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡',
    'y': '𝚢', 'z': '𝚣', 'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳',
    'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹',
    'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿',
    'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅',
    'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉', ' ': ' '
  };

  return responseText.split('').map(char => fontMap[char] || char).join('');
}