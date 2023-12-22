const log = require("../log");

module.exports = class Vox {
  constructor() {
    this.commandMap = {
      join: this.join,
      leave: this.leave
    };
  }

  leave(command, messageObject, bot) {
    let voiceChannel = messageObject.member.voice.channel;
    return voiceChannel.leave();
  }

  join(command, messageObject, bot) {
    let voiceChannel = messageObject.member.voice.channel;
    log.info(`[VOX] Joining Channel ${voiceChannel.id}`);

    // Returns a promise
    return voiceChannel.join();
  }
};
