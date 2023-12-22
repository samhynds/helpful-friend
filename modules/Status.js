const os = require("os");
const Discord = require("discord.js");

module.exports = class Status {
  constructor() {
    this.commandMap = {
      status: this.status,
      ping: this.ping
    };

    this.helpText = {
      // Hidden commands, no need to show them in the help text.
      // status: "Get the status of the bot.",
      // ping: "Sends a simple response from the bot to check it's online and functioning correctly."
    };
  }

  ping(command, messageObject, bot) {
    messageObject.channel.send(
      `:regional_indicator_p::regional_indicator_o::regional_indicator_n::regional_indicator_g:`
    );
  }

  status(command, messageObject, bot) {
    let messageSentTime = new Date(messageObject.createdTimestamp).getTime();
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Helpful Friend Status: Online")
      .addField("Online Since", `${new Date(global.status.startTime)}`)
      .addField(
        "Uptime",
        `${((Date.now() - global.status.startTime) / 1000 / 60).toFixed(2)} minutes`
      )
      .addField("Modules Loaded", `${Object.keys(global.modules).length} modules loaded.`)
      .addField("Latency", `${Date.now() - messageSentTime}ms`)
      .addField("Server Hostname", `${os.hostname()}`)
      .setTimestamp();

    messageObject.channel.send(embed);
  }
};
