module.exports.defaultOptions() { 
return { 
minLength : this.minLength,
requireUpperLowerCase : this.requireUpperLowerCase,
requireSpecialChars : this.requireSpecialChars,
blacklistWordsPath : './password_blacklist.txt'
}
};

module.exports.evaluatePassword() { 

try{ 

if(this.options.minLength > targetPassword.length){
throw new Error(`Target ${targetAccount}'s hash is too short!`);
}

for(const line in fs.readFileSync(this.options.blacklistWordsPath,'utf8').split('\n')){

if(line.includes(targetAccount)){
throw new Error(`Target ${targetAccount}'s hash found in blacklist!`);
}

}

} catch(err){ throw new Error(`Password evaluation failed for ${targetAccount}: ${err.message}`); };

};
