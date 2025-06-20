// ✅ SAFE WRAPPER ADDED TO CATCH ERRORS try { const cron = require("node-cron"); const { exec } = require("child_process"); const chalk = require("chalk"); const { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync, rm } = require("fs-extra"); const { join, resolve } = require("path"); const login = require("fca-priyansh"); const axios = require("axios"); const moment = require("moment-timezone");

const DateAndTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }); console.log(chalk.bold.hex("#0000FF")([DATE & TIME IN INDIA] » ) + chalk.bold.hex("#0000FF")(DateAndTime));

// Cron job to auto exit after interval cron.schedule('33 */27 * * * *', () => { process.exit(1); });

// Auto delete cache folders exec("rm -rf modules/commands/data && mkdir -p modules/commands/data && rm -rf modules/commands/tad/* ", () => { console.log(✅ Auto delete command data done.); });

exec("rm -fr modules/commands/cache/.m4a && rm -fr modules/commands/cache/.mp4 && rm -fr modules/commands/cache/*.mp3", () => { console.log(✅ Auto delete command cache done.); });

global.client = { commands: new Map(), events: new Map(), cooldowns: new Map(), eventRegistered: [], handleSchedule: [], handleReaction: [], handleReply: [], mainPath: process.cwd(), configPath: '', getTime: function (option) { return moment.tz("Asia/Kolkata").format(option); } };

global.data = { threadInfo: new Map(), threadData: new Map(), userName: new Map(), userBanned: new Map(), threadBanned: new Map(), commandBanned: new Map(), threadAllowNSFW: [], allUserID: [], allCurrenciesID: [], allThreadID: [] };

global.utils = require("./utils"); global.nodemodule = {}; global.config = {}; global.configModule = {}; global.moduleData = []; global.language = {};

// Load config global.client.configPath = join(global.client.mainPath, "config.json"); let configValue = require(global.client.configPath); Object.assign(global.config, configValue); writeFileSync(global.client.configPath + ".temp", JSON.stringify(global.config, null, 4), 'utf8');

// Load language const langFile = readFileSync(${__dirname}/languages/${global.config.language || "en"}.lang, 'utf-8').split(/\r?\n|\r/); for (const item of langFile.filter(l => l && l[0] !== '#')) { const

