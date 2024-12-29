let v = {};

v["config"] = {
  name: 'charcode',
  version: '1.0.0',
  role: 0,
  credits: '',
  aliases: [],
  description: 'Converts text to character codes',
  usages: '{p}charcode ',
  cooldown: 0,
  hasPrefix: false,
};

v["run"] = async function({api: yazky, event: e, args: a}) {
  const i = a.join(" ");
  if (!i) {
    return yazky.sendMessage("Please provide text to convert to char codes.", e.threadID, e.messageID);
  }
  const charCodes = i.split('').map(char => char.charCodeAt(0)).join(', '); 
  yazky.sendMessage(`String.fromCharCode('${charCodes}');`, e.threadID, e.messageID);
};
module.exports = v;