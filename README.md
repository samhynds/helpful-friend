# Helpful Friend

A Discord chat bot.

## Requirements

- Node.js - tested on v20.10.0
- A Discord app (create one here: https://discord.com/developers/applications)
  - You'll need to allow "Message Content Intent" on the application

## How to use

1. Run `npm install` to install the dependencies.
2. Copy `config.sample.js` to `config.js` and fill out the required options. Keep this file safe as it includes your bots credentials. Don't commit it.
3. Add the bot to your Discord server (see: https://discordjs.guide/preparations/adding-your-bot-to-servers.html#creating-and-using-your-invite-link) When generating the OAuth2 URL, check the "bot" scope and under "Bot Permissions" check "Send Messages", "Embed Links", "Attach Files", "Connect", and "Speak". If you add more features to the bot, remember you may need to update these permissions in the future.
4. Run `npm start` to start the bot. Use `tmux` or `screen` if you want to keep it running.
5. Check it's working by running `<command_prefix>status`, for example `!status`.
6. Run `!help` to see a list of commands you can run.

## How to make changes

You can run `npm run start:dev` if you want to autoreload the app when you make changes.

Functionality for the bot is written in the `modules` directory. [modules/RNG.js](modules/RNG.js) is a good simple example of the structure of a module. You need to export a class and pass the constructor a `bot` reference as an argument.

`this.commandMap` is what links a chat message to a function call. Each key is the string that is looked for in chat messages and the value is what function is called when a message contains that string/command.

`this.helpText` is what's shown when the help command is used.

Methods in the class that are commands (i.e. they're referenced in the `commandMap`) must have the arguments `command, messageObject, bot`. You can have other private methods in the class if you wish.

Finally to enable your new command, you'll need to import it by adding the name of the file to [modules/index.js](modules/index.js)
