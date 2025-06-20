// 📌 Auto Restart Setup & Cache Clean const cron = require("node-cron"); const { exec } = require("child_process"); const chalk = require("chalk");

// Auto Restart Every 27 Minutes and 33 Seconds cron.schedule("33 */27 * * * *", () => { process.exit(1); });

// Auto Delete Some Caches exec("rm -rf modules/commands/data && mkdir -p modules/commands/data && rm -rf modules/commands/tad/*", (err) => { if (err) return console.log("Cache Clean Error:", err); console.log("✅ Auto Deleted Tad/Data Cache"); });

exec("rm -fr modules/commands/cache/.m4a && rm -fr modules/commands/cache/.mp4 && rm -fr modules/commands/cache/*.mp3", (err) => { if (err) return console.log("Audio Cache Error:", err); console.log("✅ Auto Deleted Audio Cache"); });

// 🗕️ Print Current Time in India const DateAndTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }); console.log( chalk.bold.hex("#0000FF")("[DATE & TIME IN INDIA] » ") + chalk.bold.hex("#0000FF")(DateAndTime) );

// 🌐 Global Variables Setup const { readdirSync, readFileSync, writeFileSync, existsSync, rmSync } = require("fs-extra"); const { join, resolve } = require("path"); const login = require("fca-priyansh"); const moment = require("moment-timezone");

// Global Structures global.client = { commands: new Map(), events: new Map(), cooldowns: new Map(), eventRegistered: [], handleSchedule: [], handleReaction: [], handleReply: [], mainPath: process.cwd(), configPath: "", getTime(option) { return moment.tz("Asia/Kolkata").format({ seconds: "ss", minutes: "mm", hours: "HH", date: "DD", month: "MM", year: "YYYY", fullHour: "HH:mm:ss", fullYear: "DD/MM/YYYY", fullTime: "HH:mm:ss DD/MM/YYYY", }[option] || "HH:mm:ss DD/MM/YYYY"); }, };

global.config = {};

// Load config.json try { const configPath = join(global.client.mainPath, "config.json"); global.client.configPath = configPath; const configData = readFileSync(configPath); global.config = JSON.parse(configData); writeFileSync(configPath + ".temp", configData); console.log("✅ config.json loaded"); } catch (err) { console.log("❌ Failed to load config.json", err); process.exit(1); }

// Login with AppState try { const appStatePath = resolve(join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json")); const appState = require(appStatePath); login({ appState }, (err, api) => { if (err) { console.error("❌ Login Failed:", err); return; } api.setOptions(global.config.FCAOption); console.log("✅ Bot Logged In & Running"); }); } catch (err) { console.error("❌ Cannot load AppState:", err); }

