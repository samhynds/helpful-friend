const Discord = require("discord.js");

module.exports = class Help {
  constructor() { }

  static sendMessage(command, messageObject, bot, allHelpText) {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Helpful Friend Help & Commands")
      .setDescription("Here's a list of the active commands that Helpful Friend can perform.")
      .setTimestamp();

    for (let helpText in allHelpText) {
      embed.addField(allHelpText[helpText].command, allHelpText[helpText].description, true);
    }

    return embed;
  }
};
