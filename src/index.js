const core = require('@actions/core');
const github = require('@actions/github');

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
        console.log(github.context);
        const payload_out = JSON.stringify(github.context.payload, undefined, 2);
        const payload = github.context.payload;
        var tweetContent = core.getInput('TWEET');
        var tweet;
        
        var owner = payload.repository.owner.name;
        var skipOwner = core.getInput('skip-owner');
        if(skipOwner && payload.commits.length==1 && owner==payload.commits[0].author.name){
            core.setOutput("Action skiped as the event was make by the owner");
        }else{
            try{
                tweet = await renderString(tweetContent,payload);
            }catch(error){
                tweet = tweetContent;
                console.log(error);
            }
            twitterCredentials =  {
                consumer_key: core.getInput('TWITTER_API_KEY'),
                consumer_secret: core.getInput('TWITTER_API_SECRET_KEY'),
                access_token_key: core.getInput('TWITTER_ACCESS_TOKEN'),
                access_token_secret: core.getInput('TWITTER_ACCESS_TOKEN_SECRET')
            }
            if(runAction(payload)){
                console.log(`Tweet: ${tweet}`);
                var result = await Tweet(twitterCredentials, tweet);
                console.log(result);
                core.setOutput(`Action completed ${result}`);
            }
            else
                core.setOutput("Action skiped due to commit message");
        }
    }catch(error){
        core.setFailed(error.message);
    }
}


run();