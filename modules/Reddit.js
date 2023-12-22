const HTTP = require("../core/HTTP");
const config = require("../config");

module.exports = class Reddit {
  constructor() {
    this.commandMap = {
      meme: this.meme.bind(this),
      cat: this.cat.bind(this),
      dog: this.dog.bind(this),
      birb: this.birb.bind(this)
    };

    this.helpText = {
      meme: `Fetches a random meme.\n${config.commandPrefix}meme snacc gets three.\n${config.commandPrefix}meme meal 
      gets five.`,
      cat: `Fetches a random cat.\n${config.commandPrefix}cat snacc gets three.\n${config.commandPrefix}cat meal gets five.`,
      dog: `Fetches a random dog.\n${config.commandPrefix}dog snacc gets three.\n${config.commandPrefix}dog meal gets five.`,
      birb: `Fetches a random birb.\n${config.commandPrefix}birb snacc gets three.\n${config.commandPrefix}birb meal gets five.`
    };
  }

  async meme(command, messageObject, bot) {
    return await this.randomPicture('memes', command, messageObject, bot);
  }

  async cat(command, messageObject, bot) {
    return await this.randomPicture('cats', command, messageObject, bot);
  }

  async dog(command, messageObject, bot) {
    return await this.randomPicture('dogpictures', command, messageObject, bot);
  }

  async birb(command, messageObject, bot) {
    return await this.randomPicture('birbs', command, messageObject, bot);
  }

  async randomPicture(subreddit, command, messageObject, bot) {
    const splitCommand = command.split(" ");

    // Make a request to the subreddit
    const response = await HTTP.get(`https://www.reddit.com/r/${subreddit}.json?limit=50`);

    // Work out how many to return
    let numberToReturn = 1;
    switch (splitCommand[1]) {
      case "meal":
        numberToReturn = 5;
        break;
      case "snacc":
        numberToReturn = 3;
        break;
      default:
        numberToReturn = 1;
        break;
    }

    let randomPostsStr = "";

    if (response.status === 200) {
      const posts = response.data.data.children.filter(post => {
        return /\.(jpg|png|gif)$/.test(post.data.url);
      });

      for (let i = 0; i < numberToReturn; i++) {
        for (let i = 0; i < posts.length; i++) {
          let randomPost = posts[Math.floor(Math.random() * posts.length)];
          if (randomPost.data.url) {
            randomPostsStr += `${randomPost.data.url}\n`;
            break;
          }
        }
      }
    } else {
      throw `[ERR:REDDIT:02] Couldn't find a picture.`;
    }

    // Send it back to the user!
    messageObject.channel.send(randomPostsStr);
  }
};
