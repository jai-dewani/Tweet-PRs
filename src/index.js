const core = require('@actions/core');
const github = require('@actions/github');

try {
    const tweetContent = core.getInput('tweet content');
    console.log(`Tweet: ${tweetContent}`);
    const time = (new Date()).toString();
    core.setOutput("time",time);
    const playload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
}catch(error){
    core.setFailed(error.message);
}