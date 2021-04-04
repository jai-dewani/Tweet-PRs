const core = require('@actions/core');
const github = require('@actions/github');
require('dotenv').config()

const { renderString } = require("./renderText");
const { Tweet } = require("./tweet");

const runAction = (payload) => {
    for(var i=0; i<payload['commits'].length; i++){
        var message = payload['commits'][i]['message'];
        if(message.includes("/[Skip tweet]/i"))
            return false;
        return true;
    }
}

async function run() {
    try {
        const payload_out = JSON.stringify(github.context.payload, undefined, 2);
        const payload = github.context.payload;
        var tweetContent = core.getInput('tweet');
        var tweet;
        try{
            tweet = await renderString(tweetContent,payload);
        }catch(error){
            tweet = tweetContent;
            console.log(error);
        }
        // console.log(`Tweet: ${tweet}`);

        twitterCredentials =  {
            consumer_key: process.env.TWITTER_API_KEY,
            consumer_secret: process.env.TWITTER_API_SECRET_KEY,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        }
        console.log(twitterCredentials);
        
        if(runAction(payload)){
            console.log(`Tweet: ${tweet}`);
            var result = await Tweet(twitterCredentials, tweet);
            console.log(result);
            core.setOutput("Action completed");
        }
        else
            core.setOutput("Action skiped due to commit message");

    }catch(error){
        core.setFailed(error.message);
    }
}


run();