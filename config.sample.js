module.exports = {
  bot_user_id: "", // Required - the Application ID of your bot, shown in the General Information of the bot (see https://discord.com/developers/applications)
  discord_token: "", // Required - the discord token for the bot, found in the same area as the link above
  commandPrefix: "!", // Required - respond to chat commands that start with this prefix, e.g. !status
  ignoredIDs: [], // User IDs that should be ignored (bots are already ignored)
  onlyRespondTo: [] // Only repsond to user IDs listed here
};
