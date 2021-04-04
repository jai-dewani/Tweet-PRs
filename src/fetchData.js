const { Octokit } = require("@octokit/core");
const core = require("@action/core");
const octokit = new Octokit({auth: core.getInput('GITHUB_TOKEN') });
var result;

const getTwitterID = async(username) => {
    const result = await octokit.request('GET /users/{username}', {
      username: username
    }).then(data => {
        return data.data.twitter_username? "@"+data.data.twitter_username : data.data.login
    })
    return result;
}

const extractTwitterHandle = async(payload) => {
    const usernames = new Set();
    for(commit in payload['commits']){
        usernames.add(payload['commits'][commit]['author']['username'])
    }
    const ids = [];
    for(let username of usernames){
        ids.push(await getTwitterID(username));
    }
    var result = "";
    if(ids.length==1){
        return ids[0];
    }else{
        for(var i=0; i<ids.length-1; i++){
            result += ids[i] + ", ";
        }
        result += "and " + ids[ids.length-1];
        return result;
    }
}

module.exports = { getTwitterID, extractTwitterHandle };