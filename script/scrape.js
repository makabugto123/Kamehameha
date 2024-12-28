const fs = require('fs');
const path = require('path');
const axios = require('axios');

let source = {};

source["config"] = {
  name: 'scrape',
  version: '1.1.1',
  role: 0,
  hasPermission: 0,
  credits: "cliff",
  description: 'Scraping Web and api/output',
  usePrefix: false,
  hasPrefix: false,
  commandCategory: 'url',
  usage: '{pn} [url]',
  usages: '{pn} [url]',
  cooldown: 0,
  cooldowns: 0,
};

source["run"] = async function({ api, event, args }) {

const uniqueFileName = path.join(__dirname, `/cache/snippet_${Math.floor(Math.random() * 1e6)}.txt`);

  let url = args.join(' ');

  try {
    if (!url) {
      return api.sendMessage('Please provide a URL you want to scrape.', event.threadID, event.messageID);
    }

    const cliff = await new Promise(resolve => {
      api.sendMessage('Scraping....', event.threadID, (err, info1) => {
        resolve(info1);
      }, event.messageID);
    });

    const response = await axios.get(`https://betadash-api-swordslush.vercel.app/scrape?url=${encodeURIComponent(url)}`);
    const responseData = response.data.results;

    let ughContent = responseData.map(item => item.content).join('\n\n');

let contentToSend = ughContent.substring(0, Math.min(10000, ughContent.length));

    let formattedContent = responseData.map(item => ({
      created_at: item.created_at,
      updated_at: item.updated_at,
      page: item.page,
      url: item.url,
      job_id: item.job_id,
      status_code: item.status_code,
      _request: item._request,
      _response: item._response,
      session_info: item.session_info
    }));

    let sheshh = `Here's the scraped data:\n\n${contentToSend}\n\nOpss!! To long!\n\nView the full result, please click or download the attached txt file`;

fs.writeFileSync(uniqueFileName, `${ughContent}\n\n${JSON.stringify(formattedContent, null, 2)}`, 'utf8');

api.unsendMessage(cliff.messageID);
    api.sendMessage({body: sheshh, attachment: fs.createReadStream(uniqueFileName) }, event.threadID, event.messageID);
  } catch (err) {
    return api.sendMessage('Error Skills issue', event.threadID, event.messageID);
  }
};

module.exports = source;