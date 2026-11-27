// Shared opt-out notification preferences. OS permission is requested only on a tap.
let chPushRegistration=null,chPushActive=false,chPushOwner=null,chPushPending=null,chPushDismissed=false,chPushEpoch=0;
let chPushPrepared=null,chPushPreparing=null,chPushWorking=false,chPushError='',chPushStage='Not started',chPushWired=false;
const chPushSamsung=()=>/SamsungBrowser\//i.test(navigator.userAgent||'');
const chPushInstalled=()=>!!navigator.standalone||['standalone','minimal-ui','window-controls-overlay','fullscreen'].some(m=>window.matchMedia?.('(display-mode: '+m+')').matches);
function chPushStep(t){chPushStage=t;chPushStatus(t)}
function chPushFailure(e){const name=e?.name||'Error',msg=String(e?.message||e).replace(/https?:\/\/\S+/g,'[URL]').slice(0,220);chPushError=chPushStage+' — '+name+': '+msg;chPushActive=false;chPushStatus(chPushError+(chPushSamsung()?' · If this is the installed app, check Android notification permissions for both The Pack and Samsung Internet.':''));}
function chPushTimeout(p,ms,message){let t;return Promise.race([p,new Promise((_,reject)=>{t=setTimeout(()=>reject(Error(message)),ms)})]).finally(()=>clearTimeout(t))}
function chPushSupported(){return window.isSecureContext!==false&&'serviceWorker'in navigator&&'Notification'in window&&('PushManager'in window||'ServiceWorkerRegistration'in window&&'pushManager'in ServiceWorkerRegistration.prototype)}
function chPushPreview(uid=chPushOwner){if(!uid)return false;try{const v=localStorage.getItem('pack-push-preview:'+uid);if(v!==null)return v==='yes';return JSON.parse(localStorage.getItem('connecthub:v3:'+uid)||'{}').preview===true}catch{return false}}
function chPushPreviewUI(){for(const el of document.querySelectorAll('[data-pack-preview]')){el.checked=chPushPreview();el.disabled=!chPushOwner}}
async function chPushPreviewSet(enabled){const uid=chPushOwner;if(!uid)throw Error('Sign in first');if(chPushSupported()&&chPushActive){const r=await chPushReg(),sub=await r.pushManager.getSubscription();if(!sub)throw Error('Notification subscription unavailable');await chPushAPI('preview',{endpoint:sub.endpoint,enabled:!!enabled})}if(uid!==chPushOwner)return;localStorage.setItem('pack-push-preview:'+uid,enabled?'yes':'no');chPushPreviewUI();chPushStatus(enabled?'Name, message and photo previews enabled on this device.':'Private notification previews enabled: message contents hidden.');}
function chPushOff(uid=chPushOwner){return !!uid&&localStorage.getItem('pack-push-off:'+uid)==='yes'}
async function chPushAPI(action,data={}){const {data:{session},error}=await db.auth.getSession();if(error||!session)throw Error('Sign in first');const r=await fetch(CONNECTHUB.url+'/functions/v1/connecthub-push',{method:'POST',headers:{'Content-Type':'application/json',apikey:CONNECTHUB.key,Authorization:'Bearer '+session.access_token},body:JSON.stringify({action,...data})});const result=await r.json();if(!r.ok)throw Error(result.error||'Notification service unavailable');return result}
function chPushHint(){return /iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)?'On iPhone or iPad: open Safari, Share → Add to Home Screen, then open The Pack from the Home Screen and enable alerts. Requires iOS/iPadOS 16.4 or newer.':'Use a supported browser and allow notifications.'}
function chPushBanner(){const el=document.getElementById('packPushBanner');if(!el)return;el.hidden=!chPushOwner||chPushActive||chPushOff()||chPushDismissed||window.parent!==window;const text=el.querySelector('p');if(!chPushSupported())text.textContent=chPushHint();else if(Notification.permission==='denied')text.textContent='Notifications are blocked. Allow The Pack in your browser or device settings, then tap Enable.';else text.textContent='Get messages and incoming call alerts even when you are away from The Pack.'}
function chPushStatus(t){chPushPreviewUI();const n=document.getElementById('pushStatus');if(n)n.textContent=t;const b=document.getElementById('packPushState');if(b)b.textContent=t;const d=document.getElementById('pushDisable'),test=document.getElementById('pushTest');if(d)d.disabled=!chPushOwner||chPushOff();if(test)test.disabled=!chPushActive||chPushWorking;for(const id of ['hubPermission','enableGroupAlerts','pushRepair','pushLocalTest']){const e=document.getElementById(id);if(e)e.disabled=chPushWorking||!chPushOwner}chPushBanner()}
async function chPushReg(){if(!chPushSupported())throw Error(chPushHint());if(!chPushRegistration?.active){const scope=new URL('./',location.href).href;const r=await chPushTimeout(navigator.serviceWorker.register(new URL('notify-sw.js',scope).href,{scope,updateViaCache:'none'}),15000,'Service worker registration timed out');chPushRegistration=r.active?r:await chPushTimeout(navigator.serviceWorker.ready,15000,'Service worker did not activate');if(chPushRegistration.scope!==scope||!chPushRegistration.active)throw Error('Incorrect or inactive service worker scope')}if(!chPushRegistration.pushManager)throw Error('Browser does not provide a PushManager for this app');return chPushRegistration}
function chPushKey(s){return Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-s.length%4)%4)),c=>c.charCodeAt(0))}
async function chPushPrepare(uid=chPushOwner){
 if(chPushPrepared?.uid===uid&&chPushPrepared.reg.active)return chPushPrepared;
 if(chPushPreparing?.uid===uid)return chPushPreparing.promise;
 const p=(async()=>{chPushStep('Preparing service worker…');const reg=await chPushReg();chPushStep('Checking notification server key…');const k=await chPushTimeout(chPushAPI('key'),15000,'Notification server key request timed out');const key=chPushKey(k.publicKey);if(key.length!==65||key[0]!==4)throw Error('Invalid public notification key');if(uid!==chPushOwner)throw Error('Account changed');return chPushPrepared={uid,reg,key}})();
 chPushPreparing={uid,promise:p};try{return await p}finally{if(chPushPreparing?.promise===p)chPushPreparing=null}
}
function chPushCurrent(uid,epoch){return uid===chPushOwner&&epoch===chPushEpoch&&!chPushOff(uid)}
function chPushSameKey(sub,key){const old=sub?.options?.applicationServerKey;if(!old)return true;const bytes=new Uint8Array(old);return bytes.length===key.length&&bytes.every((v,i)=>v===key[i])}
function chPushSerialize(sub){const j=typeof sub.toJSON==='function'?sub.toJSON():{};const encode=b=>b?btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''):'';const endpoint=j.endpoint||sub.endpoint,p256dh=j.keys?.p256dh||encode(sub.getKey?.('p256dh')),auth=j.keys?.auth||encode(sub.getKey?.('auth'));if(!endpoint||!p256dh||!auth)throw Error('Browser returned an incomplete subscription');return {endpoint,expirationTime:sub.expirationTime??null,keys:{p256dh,auth}}}
async function chPushRegister(sub,uid,epoch){if(!chPushCurrent(uid,epoch))return false;chPushStep('Registering this device with The Pack…');await chPushTimeout(chPushAPI('register',{subscription:chPushSerialize(sub),preview:chPushPreview(uid)}),15000,'Server registration timed out');if(!chPushCurrent(uid,epoch))return false;localStorage.setItem('ch-push-owner',uid);chPushActive=true;chPushError='';chPushStage='Connected';chPushStatus('Background notifications enabled on this device. Send a test notification.');return true}
async function chPushEnable(){
 if(!chPushOwner)throw Error('Sign in first');if(!chPushSupported())throw Error(chPushHint());if(chPushWorking)return false;
 const uid=chPushOwner;chPushWorking=true;chPushError='';
 try{
  chPushStep('Checking notification permission…');
  const permission=Notification.permission==='granted'?'granted':await Notification.requestPermission();
  if(permission!=='granted')throw Error('Allow notifications in your browser and Android app settings.');
  if(uid!==chPushOwner)return false;localStorage.removeItem('pack-push-off:'+uid);chPushDismissed=false;
  const epoch=++chPushEpoch;
  // Prepare key and worker before the explicit subscription tap; don't consume activation on network requests.
  const prepared=chPushPrepared?.uid===uid&&chPushPrepared.reg.active?chPushPrepared:null;
  if(!prepared){await chPushPrepare(uid);chPushStep('Ready. Tap Enable notifications again to connect this device.');return false}
  const {reg,key}=prepared;
  const existing=await reg.pushManager.getSubscription();
  if(!chPushCurrent(uid,epoch))return false;
  if(existing&&(localStorage.getItem('ch-push-owner')!==uid||!chPushSameKey(existing,key))){
   chPushStep('Removing old browser subscription…');
   if(localStorage.getItem('ch-push-owner')===uid)try{await chPushAPI('disable',{endpoint:existing.endpoint})}catch{}
   if(!await existing.unsubscribe())throw Error('Browser could not remove old subscription. Try Repair.');
   localStorage.removeItem('ch-push-owner');chPushStep('Old connection removed. Tap Enable notifications again.');return false
  }
  chPushStep('Creating browser push subscription…');
  const sub=existing||await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:key});
  if(!chPushCurrent(uid,epoch))return false;
  // Keep the browser subscription on a transient server failure so a second tap can register it.
  localStorage.setItem('ch-push-owner',uid);
  return await chPushRegister(sub,uid,epoch)
 }catch(e){chPushFailure(e);return false}finally{chPushWorking=false;chPushStatus(chPushError|| (chPushActive?'Background notifications enabled on this device. Send a test notification.':chPushStage))}
}
async function chPushInit(uid){
 if(chPushOwner===uid&&chPushPending)return chPushPending;if(chPushWorking)return;
 if(chPushOwner!==uid){chPushPrepared=null;chPushError='';chPushOwner=uid;chPushActive=false;chPushDismissed=false;chPushEpoch++}
 if(window.parent!==window)return;
 const epoch=chPushEpoch;
 chPushPending=(async()=>{if(!chPushSupported()){chPushStatus(chPushHint());return}try{
  const {reg,key}=await chPushPrepare(uid);const sub=await reg.pushManager.getSubscription();
  if(uid!==chPushOwner||epoch!==chPushEpoch||chPushWorking)return;
  if(chPushOff(uid)){chPushStatus('Background notifications disabled by you.');return}
  if(Notification.permission==='granted'&&sub&&localStorage.getItem('ch-push-owner')===uid&&chPushSameKey(sub,key)){await chPushRegister(sub,uid,epoch);return}
  chPushActive=false;chPushStep('Ready. Tap Enable notifications to connect this device.');
 }catch(e){if(uid===chPushOwner&&epoch===chPushEpoch&&!chPushWorking)chPushFailure(e)}})();
 try{await chPushPending}finally{chPushPending=null}
}
async function chPushRepair(){
 if(!chPushOwner||chPushWorking)return;const uid=chPushOwner,epoch=++chPushEpoch;chPushWorking=true;chPushActive=false;chPushError='';
 try{
  chPushStep('Refreshing the notification worker…');const r=await chPushReg();try{await chPushTimeout(r.update(),10000,'Worker update timed out')}catch{}
  if(uid!==chPushOwner||epoch!==chPushEpoch)return;
  const sub=await r.pushManager.getSubscription();
  if(sub){chPushStep('Removing stale subscription…');if(localStorage.getItem('ch-push-owner')===uid)try{await chPushAPI('disable',{endpoint:sub.endpoint})}catch{}if(!await sub.unsubscribe())throw Error('Browser could not reset the subscription')}
  localStorage.removeItem('ch-push-owner');localStorage.removeItem('pack-push-off:'+uid);chPushPrepared=null;await chPushPrepare(uid);chPushStep('Repair ready. Tap Enable notifications to create a fresh subscription.')
 }catch(e){chPushFailure(e)}finally{chPushWorking=false;chPushStatus(chPushError||chPushStage)}
}
async function chPushLocalTest(){if(Notification.permission!=='granted')throw Error('Allow notification permission first');const reg=await chPushReg();await reg.showNotification('The Pack · Local test',{body:'This device can display a local notification. The remote push test checks server delivery.',icon:'./pack-192.png',tag:'pack-local-test'});chPushStatus('Local notification displayed by browser. Check Android notification tray; this does not test server delivery.')}
async function chPushDisable(remember=true){if(chPushWorking&&remember)return;const uid=chPushOwner;chPushError='';chPushPrepared=null;if(remember&&uid)localStorage.setItem('pack-push-off:'+uid,'yes');chPushEpoch++;chPushActive=false;chPushStatus('Background notifications disabled on this device.');if(!chPushSupported())return;const r=await chPushReg(),sub=await r.pushManager.getSubscription();if(sub&&localStorage.getItem('ch-push-owner')===uid){try{await chPushAPI('disable',{endpoint:sub.endpoint})}finally{await sub.unsubscribe();localStorage.removeItem('ch-push-owner')}}}
async function chPushLogout(){try{await chPushDisable(false)}catch{}chPushOwner=null;chPushActive=false;chPushEpoch++;chPushBanner()}
async function chPushDiagnose(){if(!chPushSupported())throw Error(chPushHint());const reg=await chPushReg(),sub=await reg.pushManager.getSubscription();const state=sub?await chPushAPI('status',{endpoint:sub.endpoint}):{registered:false};let permission='unknown';try{if(chPushPrepared&&reg.pushManager.permissionState)permission=await reg.pushManager.permissionState({userVisibleOnly:true,applicationServerKey:chPushPrepared.key})}catch{}chPushStatus((chPushSamsung()?'Samsung Internet':'Browser')+' · '+(chPushInstalled()?'Installed app':'Browser tab')+' · Permission: '+Notification.permission+' · Push permission: '+permission+' · Worker: '+(reg.active?'active':'inactive')+' · Subscription: '+(sub?'present':'missing')+' · Server: '+(state.registered?'registered':'not registered')+' · Opt-out: '+(chPushOff()?'on':'off')+(chPushError?' · Last error: '+chPushError:'')+(!sub?' · Use Repair, then Enable.':''));return state}
async function chPushTest(){const r=await chPushReg(),sub=await r.pushManager.getSubscription();if(!sub||!chPushActive)throw Error('Enable notifications first');await chPushAPI('test',{endpoint:sub.endpoint});chPushStatus('Test accepted by push provider. Check your device notification center.')}
function chPushWire(){if(chPushWired)return;chPushWired=true;const wrap=fn=>async()=>{try{await fn()}catch(e){chPushStatus(e.message);if(typeof notice==='function')notice(e.message);else if(typeof status==='function')status(e.message)}};for(const el of document.querySelectorAll('[data-pack-preview]'))el.onchange=async()=>{const wanted=el.checked;try{await chPushPreviewSet(wanted)}catch(e){chPushPreviewUI();chPushStatus(e.message);if(typeof notice==='function')notice(e.message)}};const enable=document.getElementById('hubPermission')||document.getElementById('enableGroupAlerts');if(enable)enable.onclick=wrap(chPushEnable);const d=document.getElementById('pushDisable'),t=document.getElementById('pushTest');if(t&&!document.getElementById('pushDiagnose')){const b=document.createElement('button');b.type='button';b.id='pushDiagnose';b.textContent='Check notification connection';b.onclick=wrap(chPushDiagnose);t.after(b);for(const [id,label,fn] of [['pushRepair','Repair notification connection',chPushRepair],['pushLocalTest','Test phone notification (local)',chPushLocalTest]]){const x=document.createElement('button');x.type='button';x.id=id;x.textContent=label;x.onclick=wrap(fn);b.after(x)}}if(d)d.onclick=wrap(()=>chPushDisable());if(t)t.onclick=wrap(chPushTest);if(!document.getElementById('packPushBanner')){const el=document.createElement('section');el.id='packPushBanner';el.hidden=true;el.setAttribute('aria-label','Notification setup');const title=document.createElement('strong');title.textContent='🔔 Stay connected';const p=document.createElement('p');const row=document.createElement('div');for(const [label,fn] of [['Enable notifications',wrap(chPushEnable)],['Later',()=>{chPushDismissed=true;chPushBanner()}],['Turn off',wrap(()=>chPushDisable())]]){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=fn;row.append(b)}el.append(title,p,row);document.body.append(el)}const manage=document.getElementById('packPushManage');if(manage)manage.onclick=()=>document.getElementById('packPushDialog').showModal();const close=document.getElementById('packPushClose');if(close)close.onclick=()=>document.getElementById('packPushDialog').close();window.addEventListener('storage',e=>{if(chPushOwner&&e.key==='pack-push-preview:'+chPushOwner)chPushPreviewUI();if(chPushOwner&&e.key==='pack-push-off:'+chPushOwner){if(chPushOff()) {chPushActive=false;chPushStatus('Background notifications disabled on this device.')}else chPushInit(chPushOwner)}});document.addEventListener('visibilitychange',()=>{if(!document.hidden&&chPushOwner&&!chPushWorking){if(chPushSupported()&&Notification.permission!=='granted')chPushActive=false;else if(chPushSupported()&&!chPushActive&&!chPushOff()&&Notification.permission==='granted')chPushInit(chPushOwner);chPushBanner()}})}
