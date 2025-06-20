try {
  const cron = require("node-cron");
  const { exec } = require("child_process");
  const chalk = require("chalk");
  const { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync, rm } = require("fs-extra");
  const { join, resolve } = require("path");
  const login = require("fca-priyansh");
  const axios = require("axios");
  const moment = require("moment-timezone");

  const DateAndTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  console.log(chalk.bold.hex("#0000FF")(`[DATE & TIME IN INDIA] » ${DateAndTime}`));

  cron.schedule('33 */27 * * * *', () => {
    process.exit(1);
  });

  exec("rm -rf modules/commands/data && mkdir -p modules/commands/data && rm -rf modules/commands/tad/*", () => {
    console.log(`✅ Auto delete command data done.`);
  });

  exec("rm -fr modules/commands/cache/*.m4a && rm -fr modules/commands/cache/*.mp4 && rm -fr modules/commands/cache/*.mp3", () => {
    console.log(`✅ Auto delete command cache done.`);
  });

  global.client = {
    commands: new Map(),
    events: new Map(),
    cooldowns: new Map(),
    eventRegistered: [],
    handleSchedule: [],
    handleReaction: [],
    handleReply: [],
    mainPath: process.cwd(),
    configPath: '',
    getTime: (option) => moment.tz("Asia/Kolkata").format(option)
  };

  global.data = {
    threadInfo: new Map(),
    threadData: new Map(),
    userName: new Map(),
    userBanned: new Map(),
    threadBanned: new Map(),
    commandBanned: new Map(),
    threadAllowNSFW: [],
    allUserID: [],
    allCurrenciesID: [],
    allThreadID: []
  };

  global.utils = require("./utils");
  global.nodemodule = {};
  global.config = {};
  global.configModule = {};
  global.moduleData = [];
  global.language = {};

  global.client.configPath = join(global.client.mainPath, "config.json");
  let configValue = require(global.client.configPath);
  Object.assign(global.config, configValue);
  writeFileSync(global.client.configPath + ".temp", JSON.stringify(global.config, null, 4), 'utf8');

  const langFile = readFileSync(`${__dirname}/languages/${global.config.language || "en"}.lang`, 'utf-8').split(/\r?\n|\r/);
  for (const item of langFile.filter(l => l && l[0] !== '#')) {
    const [key, ...rest] = item.split('=');
    const head = key.split('.')[0];
    const subkey = key.slice(head.length + 1);
    if (!global.language[head]) global.language[head] = {};
    global.language[head][subkey] = rest.join('=').replace(/\\n/g, '\n');
  }

  global.getText = function (...args) {
    const [head, key, ...values] = args;
    let text = global.language[head]?.[key] || '';
    values.forEach((val, i) => {
      text = text.replace(new RegExp(`%${i + 1}`, 'g'), val);
    });
    return text;
  };

  let appState;
  try {
    appState = require(resolve(join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json")));
    console.log(global.getText('mirai', 'foundPathAppstate'));
  } catch {
    console.log(global.getText('mirai', 'notFoundPathAppstate'));
    process.exit(1);
  }

  login({ appState }, async (err, api) => {
    if (err) {
      console.error("❌ Login failed:", err);
      return;
    }

    api.setOptions(global.config.FCAOption);
    console.log("✅ Login successful. Bot is now live!");

    // 🔽 Your bot logic can go here
    // api.listenMqtt(...);
  });

} catch (err) {
  console.error("🔥 Bot crashed with error:\n", err);
  process.exit(1);
}
