const config = require("../config");

module.exports = class RNG {
	constructor(bot) {
		this.bot = bot;
		this.commandMap = {
			rng: this.rng,
			coinflip: this.coinflip
		}

		this.helpText = {
			rng: `Returns a random number between 1 and 6 inclusive. Change the max number by specifying it in the command.`,
			coinflip: `Flip a coin!`
		}
	}

	rng(command, messageObject, bot) {
		const splitMessage = command.split(" ");
		let max = 6;
		if (splitMessage.length > 1) {
			max = Number(splitMessage[1]);
			if (isNaN(max)) {
				messageObject.channel.send(`That's not a number!`);
				return;
			}
		}
		messageObject.channel.send(Math.ceil(Math.random() * max));
	}

	coinflip(command, messageObject, bot) {
		messageObject.channel.send(Math.random() > 0.5 ? 'Heads' : 'Tails');
	}
}