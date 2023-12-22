class Users {
	constructor(bot, channelID) {
		this.bot = bot;
		this.channelID = channelID;
		this.serverID = this.bot.channels[this.channelID].guild_id;
		this.serverMembers = this.bot.servers[this.serverID].members;
	}

	getAll() {
		let allUsers = [];

		for (var i = 0; i < Object.keys(this.serverMembers).length; i++) {
			let user = this.serverMembers[Object.keys(this.serverMembers)[i]];
			allUsers.push({
				id: user.id,
				username: user.username,
				status: user.status
			});
		}

		return allUsers;
	}

	getOnline() {
		let allUsers = this.getAll();
		return allUsers.filter((user) => {
			return user.status === 'online';
		});
	}

	getVoiceChannel(userID){
		let user = this.serverMembers[userID];
		return user.voice_channel_id ? user.voice_channel_id : null;
	}
}

module.exports = Users;