const compliments = require('../data/compliments.json');
const insults = require('../data/insults.json');
const config = require("../config");

module.exports = class RandomText {
  constructor(bot) {
    this.bot = bot;
    this.commandMap = {
      insultme: this.insultme.bind(this),
      insult: this.insult.bind(this),
      complimentme: this.complimentme.bind(this),
      compliment: this.compliment.bind(this)
    }

    this.helpText = {
      insultme: `Pretty self-explanatory.`,
      insult: `Insult someone else with ${config.commandPrefix}insult <@user>.`,
      complimentme: `Get a nice compliment.`,
      compliment: `Give a compliment to someone else with ${config.commandPrefix}compliment <@user>.`
    }
  }

  complimentme(command, messageObject, bot) {
    messageObject.channel.send(`<@!${messageObject.author.id}> ${compliments[Math.floor(Math.random() * compliments.length)]}`);
  }

  compliment(command, messageObject, bot) {
    const splitCommand = command.split(" ");

    // If no @mention was provided just compliment the person who sent the message.
    if (splitCommand.length === 1 || (splitCommand[1] && (splitCommand[1].startsWith("<@") === false))) {
      return this.complimentme(command, messageObject, bot);
    }

    messageObject.channel.send(`${splitCommand[1]} ${compliments[Math.floor(Math.random() * compliments.length)]}`);
  }

  insultme(command, messageObject, bot) {
    messageObject.channel.send(`<@!${messageObject.author.id}> ${insults[Math.floor(Math.random() * insults.length)]}`);
  }

  insult(command, messageObject, bot) {
    const splitCommand = command.split(" ");

    // If no @mention was provided just insult the person who sent the message.
    if (splitCommand.length === 1 || (splitCommand[1] && (splitCommand[1].startsWith("<@") === false))) {
      return this.insultme(command, messageObject, bot);
    }

    if (splitCommand[1] === `<@${config.bot_user_id}>` || splitCommand[1] === `<@!${config.bot_user_id}>`) {
      messageObject.channel.send(`:angry:`);

      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          this.insultme(command, messageObject, bot);
        }, 1000 * i)
      }
      return;
    }

    messageObject.channel.send(`${splitCommand[1]} ${insults[Math.floor(Math.random() * insults.length)]}`);
  }
}