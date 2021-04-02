const { expect } = require("chai");
const { Tweet } = require("./../src/tweet");

describe("Testing Tweet Functionality", () => {
    it("Should tweet a message", async() => {
        twitterCredentials =  {
            consumer_key: api_key,
            consumer_secret: api_secret_key,
            access_token_key: access_token,
            access_token_secret: access_token_secret
        }
        const tweetContent = "Testing, Testing"
        var result = await Tweet(twitterCredentials, tweetContent); 
        expect(result.text).to.be.equal("Testing, Testing")
    })
})