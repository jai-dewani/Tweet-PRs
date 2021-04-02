const { expect } = require("chai");
const { Tweet } = require("./../src/tweet");

describe("Testing Tweet Functionality", () => {
    it("Should tweet a message", async() => {
        var api_key = "yzVP6rfq9evZwZm05E9ddN4f3"
        var api_secret_key = "MBvlA89vH1JBw4wBLgjBoyKOlj0y8tHHM5D81sJn2de590XgQM"
        var access_token = "946733858812084224-2JKhO9mLVkZEliMzkiaY41wdVGca6BQ"
        var access_token_secret = "3sOdlmpZnHwJWWsZauBbgYLuq92sRAlZ6wuDh1YHbLjJd"
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