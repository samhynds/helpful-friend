const config = require("../config");
const log = require("../log");
const Help = require("../core/Help");

module.exports = class CommandParser {
  constructor(bot, modules) {
    this.bot = bot;
    this.modules = modules;
    this.initialise();
  }

  /**
   * Initialises the Command Parser so that it starts listening for messages.
   */
  initialise() {
    log.info("[CMDP] Initialising ");
    this.bot.on("message", this.handleMessage.bind(this));
  }

  /**
   * Handle Message is run on every message. It decides if a message contains a command, and if it does then it runs
   * the correct command.
   */
  handleMessage(messageObject) {
    log.info(`[MSG] ${messageObject.author.username}: ${messageObject.content}`);

    try {
      // Ignore any messages sent from a bot
      if (messageObject.author.bot) return;

      // Ignore anything that doesn't start with the prefix
      if (!messageObject.content.startsWith(config.commandPrefix)) return;

      // Only respond to IDs listed, if enabled
      if (config.onlyRespondTo.length && config.onlyRespondTo.indexOf(messageObject.author.id) === -1) return;
    } catch (e) {
      log.error(e);
    }

    // We can treat anything from this point as a legit command.
    // The command should be routed to the appropriate module.

    // Extract the command from the message (i.e. remove the prefix)
    let commandStr = messageObject.content.substr(
      config.commandPrefix.length,
      messageObject.content.length
    );

    // Special logic for the help command
    if (commandStr === "help") {
      messageObject.channel.send(
        Help.sendMessage(commandStr, messageObject, this.bot, this.constructHelpText())
      );
      return;
    }

    // Will contain the method which corresponds to the command
    let commandHandler;

    for (let module in this.modules) {
      commandHandler = this.isCommandInModule(commandStr, this.modules[module]);
      if (commandHandler) break;
    }

    if (commandHandler) {
      try {
        commandHandler(commandStr, messageObject, this.bot);
      } catch (e) {
        log.error("Error!", e);
        this.sendErrorToUser(`Error, check the logs.\n \`\`\`${e}\`\`\``, messageObject);
      }
    } else {
      this.sendErrorToUser(
        `Sorry, but that command doesn't exist. Type ${config.commandPrefix}help to see what commands you can use.`,
        messageObject
      );
    }
  }

  // Checks a modules "this.commandMap" to see if command is present
  // If it is, it returns the corresponding method
  isCommandInModule(commandStr, module) {
    for (let command in module.commandMap) {
      // We're splitting to remove any arguments from the check
      if (commandStr.split(" ")[0] == command) return module.commandMap[command];
    }
    return false;
  }

  /**
   * Constructs the help text which is returned whenever a user types commandPrefix + 'help'
   *
   * @returns {Array} An array of objects describing each command and what it does.
   */
  constructHelpText() {
    let helpItems = [];

    for (let module in this.modules) {
      let moduleReference = this.modules[module];

      for (let command in moduleReference.commandMap) {
        if (moduleReference.helpText && moduleReference.helpText[command]) {
          helpItems.push({
            command: config.commandPrefix + command,
            description: moduleReference.helpText[command]
          });
        }
      }
    }

    return helpItems;
  }

  sendErrorToUser(errorString, messageObject) {
    messageObject.channel.send(`<@!${messageObject.author.id}> ${errorString}`);
  }
};
