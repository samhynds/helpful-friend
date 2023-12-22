const config = require("../config");
const log = require("../log");
const ytdl = require("ytdl-core-discord");

module.exports = class Music {
  constructor(bot) {
    this.commandMap = {
      play: this.play.bind(this)
    };

    this.helpText = {
      play: `Play something from YouTube like this: ${config.commandPrefix}play <URL>`
    }
  }

  async play(command, messageObject, bot) {
    const splitMessage = command.split(" ");

    const connection = await modules["Vox"].join(command, messageObject, bot);
    try {
      connection.play(await ytdl(splitMessage[1]), { type: 'opus' });
    } catch (e) {
      log.error(e)
    }
  }
};
