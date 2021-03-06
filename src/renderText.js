const { extractTwitterHandle } = require("../src/fetchData");

const renderString = async(str,obj) => {
    return await asyncStringReplace(str,/\$\{(.+?)\}/g, obj, index);
}

const asyncStringReplace = async (str, regex, obj, aReplacer) => {
    const substrs = [];
    let match;
    let i = 0;
    while ((match = regex.exec(str)) !== null) {
        substrs.push(str.slice(i, match.index));
        substrs.push(await aReplacer(obj, match[1]));
        i = regex.lastIndex;
    }
    substrs.push(str.slice(i));
    return (await Promise.all(substrs)).join('');
};

const index = async(obj,p1) => {
    if(typeof p1 == 'string' && p1 =='twitter_username'){
        return await extractTwitterHandle(obj);
    }
    else{
        if (typeof p1 == 'string')
            p1=p1.split('.');
            
        while(p1 && p1.length>0){
            obj = obj[p1[0]]
            p1 = p1.slice(1);
        }
        return obj;
    } 
}
module.exports = { renderString };