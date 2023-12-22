const log = require('../log');

class VoiceChannel {
	constructor(bot) {
		this.bot = bot;
	}

	// Returns the channel audio context stream ready to use
	join(channelID) {
		return new Promise((resolve, reject) => {
			if(channelID) {
				this.bot.joinVoiceChannel(channelID, (err, events) => {
					if (err) return console.error(err);
					this.bot.getAudioContext({channelID, maxStreamSize: 1 * 1024}, (err, stream) => {
						if (err) return console.error(err);
						resolve({stream, events});
					});
				});
			} else {
				reject("You have to be in a voice channel for me to join.");
			}
		});
	}

	leave(channelID) {
		this.bot.getAudioContext(channelID, (err, stream) => {
			try { stream.stop(); } catch(e) { log.error(e); }
			this.bot.leaveVoiceChannel(channelID);
		});
	}
}

module.exports = VoiceChannel;