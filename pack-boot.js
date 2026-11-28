/* The Pack release information and startup screen. No device telemetry is sent. */
const PACK_RELEASE=Object.freeze({version:'36.0.0',name:'Game Night'});
let bootGeneration=0,bootNamedAt=0,bootTimer=null;
const bootEl=id=>document.getElementById(id);
function packDeviceInfo(){
 const ua=navigator.userAgent||'',platform=navigator.userAgentData?.platform||navigator.platform||'';
 const ios=/iPhone|iPad|iPod/.test(ua)||(/Mac/.test(platform)&&navigator.maxTouchPoints>1);
 let os='Unknown OS',device='Device',browser='Web browser';
 if(ios){os=/iPhone|iPod/.test(ua)?'iOS':'iPadOS';device=os==='iOS'?'iPhone':'iPad'}
 else if(/CrOS/.test(ua)||/Chrome OS/i.test(platform)){os='ChromeOS';device='Chromebook'}
 else if(/Android/.test(ua)){os='Android';device=/Mobile/.test(ua)?'Phone':'Tablet'}
 else if(/Windows/i.test(ua+' '+platform)){os='Windows';device='PC'}
 else if(/Macintosh|MacIntel|macOS/i.test(ua+' '+platform)){os='macOS';device='Mac'}
 else if(/Linux/i.test(ua+' '+platform)){os='Linux';device='Computer'}
 if(/Edg(?:A|iOS)?\//.test(ua))browser='Microsoft Edge';
 else if(/OPR\/|OPiOS\//.test(ua))browser='Opera';
 else if(/SamsungBrowser\//.test(ua))browser='Samsung Internet';
 else if(/Firefox\/|FxiOS\//.test(ua))browser='Firefox';
 else if(/Chrome\/|CriOS\//.test(ua))browser='Chrome';
 else if(/Safari\//.test(ua))browser='Safari';
 else if(ios)browser='WebKit';
 const installed=!!navigator.standalone||['standalone','minimal-ui','window-controls-overlay'].some(mode=>window.matchMedia?.('(display-mode: '+mode+')').matches);
 return {os,device,browser,mode:installed?'Installed web app':'Browser',installed};
}
function packBootStage(text){const e=bootEl('packBootStage');if(e)e.textContent=text}
function packBootName(name){const e=bootEl('packBootGreeting');if(e&&!bootEl('packBoot')?.hidden&&typeof name==='string'&&name.trim()){e.textContent='Welcome, '+name.trim().slice(0,60);bootNamedAt=performance.now()}}
function packBootStart(stage='Checking your session…'){const e=bootEl('packBoot');if(!e)return;bootGeneration++;bootNamedAt=0;clearTimeout(bootTimer);e.hidden=false;e.removeAttribute('aria-hidden');bootEl('packBootGreeting').textContent='Welcome to The Pack';packBootStage(stage);const info=packDeviceInfo();bootEl('packBootDevice').textContent=info.device+' · '+info.os;bootEl('packBootSoftware').textContent=info.browser+' · '+info.mode;bootEl('packBootVersion').textContent='Version '+PACK_RELEASE.version+' · '+PACK_RELEASE.name;bootTimer=setTimeout(()=>packBootHide(),15000)}
function packBootHide(){const e=bootEl('packBoot');if(e){e.hidden=true;e.setAttribute('aria-hidden','true')}clearTimeout(bootTimer)}
async function packBootDone(){const gen=bootGeneration;if(bootEl('packBoot')?.hidden)return;packBootStage('Ready');if(bootNamedAt){const remaining=Math.max(0,350-(performance.now()-bootNamedAt));if(remaining)await new Promise(resolve=>setTimeout(resolve,remaining))}if(gen===bootGeneration)packBootHide()}
function packBootFail(){bootGeneration++;bootNamedAt=0;packBootHide()}
if(document.getElementById('packBoot'))packBootStart();
