function formatFont(text) { 
  const fontMapping = {
    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆",
    n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬",
    N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹"
  };

  return text.split('').map((char) => fontMapping[char] || char).join('');
}

module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['welp'],
  description: "Beginner's guide",
  usage: "Help [page], Help all, or [command]",
  credits: 'heru',
  commandsPerPage: 10
};

module.exports.run = async function ({
  api,
  event,
  enableCommands,
  args,
  prefix
}) {
  const input = args.join(' ').toLowerCase();
  try {
    const commands = enableCommands[0].commands;
    const commandsPerPage = module.exports.config.commandsPerPage;

    let helpMessage = '';
    const totalCommands = commands.length;

    if (!input) {
      let page = 1;
      const totalPages = Math.ceil(totalCommands / commandsPerPage);
      const start = (page - 1) * commandsPerPage;
      const end = Math.min(start + commandsPerPage, totalCommands);

      helpMessage += `━━━━━━━━━━━━━━\n𝙰𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜:\n╭─╼━━━━━━━━╾─╮\n`;

      for (let i = start; i < end; i++) {
        helpMessage += `⊂⊃ ➠ ${formatFont(commands[i])}\n`;
      }

      helpMessage += `╰─━━━━━━━━━╾─╯\nChat -help all to see all commands\nTotal commands: ${totalCommands}\n━━━━━━━━━━━━━━`;
    } else if (input === 'all') {
      helpMessage += `━━━━━━━━━━━━━━\n𝙰𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜:\n╭─╼━━━━━━━━╾─╮\n`;

      for (let i = 0; i < totalCommands; i++) {
        helpMessage += `⊂⊃ ➠ ${formatFont(commands[i])}\n`;
      }

      helpMessage += `╰─━━━━━━━━━╾─╯\nTotal commands: ${totalCommands}\n━━━━━━━━━━━━━━`;
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const totalPages = Math.ceil(totalCommands / commandsPerPage);

      if (page < 1 || page > totalPages) {
        api.sendMessage('Invalid page number.', event.threadID, event.messageID);
        return;
      }

      const start = (page - 1) * commandsPerPage;
      const end = Math.min(start + commandsPerPage, totalCommands);

      helpMessage += `━━━━━━━━━━━━━━\n𝙰𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜:\n╭─╼━━━━━━━━╾─╮\n`;

      for (let i = start; i < end; i++) {
        helpMessage += `⊂⊃ ➠ ${formatFont(commands[i])}\n`;
      }

      helpMessage += `╰─━━━━━━━━━╾─╯\nTotal commands: ${totalCommands}\nPage ${page} of ${totalPages}\n━━━━━━━━━━━━━━`;
    }

    await api.sendMessage(helpMessage, event.threadID, event.messageID);
  } catch (error) {
    console.log(error);
  }
};
