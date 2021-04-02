const Twitter = require("twitter");

function createTweet(client, options) {
  return new Promise((resolve, reject) => {
    client.post("statuses/update", options, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve({
        text: options.status,
        url: `https://twitter.com/${result.user.screen_name}/status/${result.id_str}`,
      });
    });
  });
}

async function Tweet(twitterCredentials , tweet){
    const client = new Twitter(twitterCredentials);
    return createTweet(client, { status: tweet });
}

module.exports = { Tweet };