const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config");
const log = require("./log");

const CommandParser = require("./core/CommandParser");
global.modules = require("./modules")(bot);
global.status = {};

bot.on("ready", () => {
  log.info("[STATUS] Bot online and ready.");
  global.status.startTime = Date.now();
});

new CommandParser(bot, global.modules);

bot.login(config.discord_token);
