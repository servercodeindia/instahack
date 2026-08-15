module.exports.defaultOptions(){
return{
sensitiveKeywords:["password","api_key"],
replacementChar:"*"
}
};

module.exports.sanitizeData(){

try{

for(const keyword of this.options.sensitiveKeywords){
data.replace(new RegExp(keyword,'gi'),"*".repeat(keyword.length))
}

}catch(error){
console.log(error)
continue;

}

}
