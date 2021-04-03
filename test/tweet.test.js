const { expect } = require("chai");
const { Tweet } = require("./../src/tweet");

describe("Testing Tweet Functionality", () => {
    it("Should tweet a message", async() => {
        twitterCredentials =  {
            consumer_key: process.env.TWITTER_API_KEY,
            consumer_secret: process.env.TWITTER_API_SECRET_KEY,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        }
        const tweetContent = "Testing, Testing"
        var result = await Tweet(twitterCredentials, tweetContent); 
        expect(result.text).to.be.equal("Testing, Testing")
    })
})