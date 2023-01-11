"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var a=t(e);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(){return r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},r.apply(this,arguments)}class l{constructor(){s(this,"getData",(async(e,t={})=>{const a=await fetch(`${this._apiUrl}/${e}`,t);if(!a.ok)throw new Error(`Error: ${a.error}`);return await a.json()})),s(this,"postData",(async(e,t,a={})=>{const s={...a,method:"post",body:JSON.stringify(t)},r=`${this._apiUrl}/${e}`;return(await fetch(r,s)).json()})),s(this,"getRequestOptions",(e=>({headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}}))),this._apiUrl="https://sandbox.quicket.io/api/v1"}}class i{getData(e){try{const t=localStorage.getItem(e);if(!t)return null;const{value:a,expiry:s}=JSON.parse(t),r=(new Date).getTime();return!a||s<r?(this.removeData(e),null):a}catch(e){return console.log("Error getting data from local storage. Message:",e),null}}setData(e,t,a){try{const s={value:t};return a&&(s.expiry=(new Date).getTime()+a),localStorage.setItem(e,JSON.stringify(s)),!0}catch(e){return console.log("Error saving data to local storage. Message:",e),!1}}removeData(e){localStorage.removeItem(e)}clearStorage(){localStorage.clear()}}const o={headers:{Authorization:"Bearer d5c55bd9-60f0-4e2f-84e0-seatmaps-com"}};class n{constructor(){s(this,"getToken",(async()=>{const e=this._localStorage.getData("jetsJwtToken");if(e)return e;const{accessToken:t}=await this._api.getData("auth?appId=aff6eb5e-1c83-4e5c-a2a2-seatmaps-com",o);if(!t)throw Error;return this._saveToken(t),t})),s(this,"_saveToken",(e=>{if(!e)return;const{exp:t}=this._parseJwt(e),a=this._getTokenTTL(t);this._localStorage.setData("jetsJwtToken",e,a)})),this._localStorage=new i,this._api=new l}_getTokenTTL(e){return 1e3*e-Date.now()-3e5}_parseJwt(e){var t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),a=decodeURIComponent(atob(t).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""));return JSON.parse(a)}}class d{static generateId(){return"_"+Math.random().toString(36).substring(2,9)}}const c={available:"available",unavailable:"unavailable",selected:"selected",preferred:"preferred",extra:"extra",disabled:"disabled"},h={seat:"seat",aisle:"aisle",empty:"empty",index:"index"},p={seat:"S",empty:"E",aisle:"-"},f={f:"First",b:"Business",p:"Premium economy",e:"Economy"},g={EN:{restrictedLegroom:"Constrained Legroom",extraLegroom:"Extra Legroom",noFloorStorage:"No underseat storage",noOverheadStorage:"Limited storage space",limitedOverheadStorage:"Limited storage space",trayTableInArmrest:"Tray table in the armrest",getColdByExit:"Close to exit, drafts and chilly",misalignedWindow:"Partial or missing window view",noWindow:"Partial or missing window view",doNotRecline:"Restricted recline, backaches possible",limitedRecline:"Restricted recline, backaches possible",storageBoxBetweenWall:"Storage box between wall",nearLavatory:"Close to restrooms",nearGalley:"Close to galleys",nearStairs:"Stairs, heavy traffic area",wingInWindow:"Wing from window view",standardSeat:"Standard seat",reservedCrewSeat:"Reserved",bassinet:"Baby bassinet available",babyBassinet:"Baby bassinet available",audio_video_ondemand:"Audio & Video On Demand",audioVideo:"Audio & Video On Demand",wifi_enabled:"WiFi enabled",wifiEnabled:"WiFi enabled",usbPlug:"USB plug",usbPowerPlug:"USB & power plug",powerPlug:"Power plug",power:"Power plug",pitch:"Pitch",recline:"Recline",width:"Width",cancel:"Cancel",select:"Select",unselect:"Unselect",deck:"Deck"},RU:{restrictedLegroom:"Мало места для ног",extraLegroom:"Много места для ног",noFloorStorage:"Нет места для ручной клади под сиденьем",noOverheadStorage:"Нет полки для ручной клади",limitedOverheadStorage:"Полка ручной клади ограничена в размерах",trayTableInArmrest:"Откидной столик в подлокотнике",getColdByExit:"Возле выхода",misalignedWindow:"Иллюминатор смещён",noWindow:"Иллюминатор отстутсвует",doNotRecline:"Спинка кресла не отклоняется",limitedRecline:"Ограниченное отклонение спинки кресла",storageBoxBetweenWall:"Ящик для хранения в стене",nearLavatory:"Около туалета",nearGalley:"Около буфета-кухни",nearStairs:"Рядом с лестницей, активное движение",wingInWindow:"Место возле крыла самолёта",standardSeat:"Стандартное сиденье",reservedCrewSeat:"Зарезервированное персоналом",bassinet:"Рядом с детской кроваткий",babyBassinet:"Рядом с детской кроваткой",audio_video_ondemand:"Развлекательная аудио- и видеопрограмма",audioVideo:"Развлекательная аудио- и видеопрограмма",wifi_enabled:"Наличие WiFi",wifiEnabled:"Наличие WiFi",usbPlug:"Наличие USB-порта",usbPowerPlug:"Наличие розетки и USB-порта",powerPlug:"Розетка",power:"Розетка",pitch:"Длинна",width:"Ширина",recline:"Наклон",cancel:"Закрыть",select:"Выбрать",unselect:"Убрать",deck:"Этаж"},CN:{restrictedLegroom:"腿部空间较小",extraLegroom:"腿部空间较大",noFloorStorage:"前面无座位",noOverheadStorage:"行李柜较小",limitedOverheadStorage:"行李柜较小",trayTableInArmrest:"托盘桌在扶手里",getColdByExit:"靠近紧急出口，较冷",misalignedWindow:"部分窗户或无窗户",noWindow:"部分窗户或无窗户",doNotRecline:"后仰角度小，可能背疼",limitedRecline:"后仰角度小，可能背疼",storageBoxBetweenWall:"牆間儲物箱",nearLavatory:"靠近洗手间",nearGalley:"靠近厨房",nearStairs:"楼梯，来往人流较多",wingInWindow:"机翼在窗外视线内",standardSeat:"标准座位",reservedCrewSeat:"已预订",bassinet:"有婴儿摇篮",babyBassinet:"有婴儿摇篮",audio_video_ondemand:"自选式机上视听娱乐系统",audioVideo:"自选式机上视听娱乐系统",wifi_enabled:"有WiFi",wifiEnabled:"有WiFi",usbPlug:"USB端口",usbPowerPlug:"USB端口及电源插座",powerPlug:"电源插座",power:"电源插座",pitch:"座位间距",width:"座位宽度",recline:"倾斜度",cancel:"取消",select:"選擇",unselect:"取消選擇",deck:"甲板"}},u=["seatDetails","cabin","seatMapLink"],m={F:{width:124,height:200},B:{width:124,height:200},P:{width:86,height:100},E:{width:86,height:100}},w={width:86,height:100},b="rgb(237, 237, 237)",v=a.default.createContext(),k={getTemplateBySeatType(e,t){if(!e)return;const[a,s]=e.split("-");return"B"===a?y.getTemplate(s,t):"F"===a?x.getTemplate(s,t):"P"===a?$.getTemplate(s,t):"E"===a?C.getTemplate(s,t):this._getFallBackTemplate()},_getFallBackTemplate:()=>C.getTemplate(type,style)},y={getTemplate(e,t){return"1"===e?this._type1(t):"4"===e?this._type4(t):this._default(t)},_type1:e=>`<svg version="1.1" baseProfile="full" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">\n            <g class="seat" transform="scale(1)">\n                <path class="bd" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" fill="${e.fillColor}" d="M127.05,89.33H12.38V13.83A9.67,9.67,0,0,1,22,4.17,455.22,455.22,0,0,1,69.72,1.5a436.21,436.21,0,0,1,47.71,2.67,9.67,9.67,0,0,1,9.63,9.66Z"></path>\n                <path class="bd" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" fill="${e.fillColor}" d="M12.38,89.33H127.05a0,0,0,0,1,0,0v36.26a7.59,7.59,0,0,1-7.59,7.59H20a7.59,7.59,0,0,1-7.59-7.59V89.33A0,0,0,0,1,12.38,89.33Z"></path><path stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" fill="${e.armrestColor}" class="bc" d="M13.84,131.7H3.08A3.09,3.09,0,0,1,0,128.61V33a3.09,3.09,0,0,1,3.08-3.08H13.84A3.09,3.09,0,0,1,16.93,33v95.64A3.09,3.09,0,0,1,13.84,131.7ZM140,128.61V33a3.09,3.09,0,0,0-3.08-3.08H126.57A3.09,3.09,0,0,0,123.49,33v95.64a3.09,3.09,0,0,0,3.08,3.08h10.34A3.09,3.09,0,0,0,140,128.61Z"></path>\n                <path class="bd" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" fill="${e.fillColor}" d="M118.59,146.5H20.86c-3.83,0-7-3.93-7-8.77v-10.2c0-4.84,3.12-8.77,7-8.77l.27,0A272.65,272.65,0,0,0,69.72,123a293.15,293.15,0,0,0,48.61-4.24l.25,0c3.83,0,7,3.93,7,8.77v10.2C125.54,142.57,122.42,146.5,118.59,146.5Z"></path><path stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" fill="${e.fillColor}" class="cf" d="M94.24,140.35H45.19a4.13,4.13,0,0,1-4.13-4.14V122a4.15,4.15,0,0,1,.11-.93l3.65-7a4.13,4.13,0,0,1,4-3.21H90.1a4.13,4.13,0,0,1,4,3.09L98.24,121a4.15,4.15,0,0,1,.13,1v14.2A4.13,4.13,0,0,1,94.24,140.35Z"></path>\n            </g>\n        </svg>`,_type4:e=>`<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">\n        <g class="seat" transform="scale(1.2)">\n            <path class="bd" fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M89.24,20c-.34-7.62-6.46-6.61-9.52-10.33S78.71.5,70.55.5H29.75c-8.16,0-6.12,5.42-9.18,9.15S11.4,12.37,11.06,20s0,13.74,0,13.74H89.24S89.58,27.61,89.24,20Z">\n            </path><path class="bd" fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M85,72.8H16.81a6.89,6.89,0,0,1-6.88-6.86V37.14a6.89,6.89,0,0,1,6.88-6.86,326.72,326.72,0,0,1,34.08-1.9A313.07,313.07,0,0,1,85,30.27a6.89,6.89,0,0,1,6.88,6.86v28.8A6.89,6.89,0,0,1,85,72.8Z"></path>\n            <rect class="bd" fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" x="9.93" y="71.69" width="81.91" height="60.75" rx="7.59" ry="7.59"></rect>\n            <path class="bc" stroke="${e.strokeColor}" fill="${e.armrestColor}" stroke-width="${e.strokeWidth}" d="M9,142.15H3.08A3.09,3.09,0,0,1,0,139.07V84.52a3.09,3.09,0,0,1,3.08-3.08H9a3.09,3.09,0,0,1,3.08,3.08v54.55A3.09,3.09,0,0,1,9,142.15Zm91-3.08V84.52a3.09,3.09,0,0,0-3.08-3.08H91.29a3.09,3.09,0,0,0-3.08,3.08v54.55a3.09,3.09,0,0,0,3.08,3.08h5.63A3.09,3.09,0,0,0,100,139.07Z"></path>\n            <path class="bd" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" \n            fill="${e.fillColor}" d="M84.71,145.5H14.9c-2.74,0-5-2.8-5-6.23V132c0-3.44,2.23-6.23,5-6.23l.19,0a195.67,195.67,0,0,0,34.71,3,210.38,210.38,0,0,0,34.72-3l.18,0c2.74,0,5,2.8,5,6.23v7.25C89.67,142.7,87.44,145.5,84.71,145.5Z"></path>\n            <path class="cf" fill="white" stroke="white" d="M67.32,141.13h-35a2.94,2.94,0,0,1-2.95-2.94V128.06a2.93,2.93,0,0,1,.08-.66L32,116.12a3,3,0,0,1,2.87-2.28H64.35a3,3,0,0,1,2.85,2.2l3,11.31a2.93,2.93,0,0,1,.1.74v10.09A2.94,2.94,0,0,1,67.32,141.13Z"></path>\n        </g>\n    </svg>`,_default:e=>`<svg version="1.1" baseProfile="full" viewBox="0 -3 110 100" xmlns="http://www.w3.org/2000/svg">\n        <g class="seat" transform="scale(2)"><rect fill="${e.armrestColor}" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />\n        <rect fill="${e.armrestColor}" x="49.02" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" /><path fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M44.94,1.07C40.15.71,33.1,0,26.87,0,21.37,0,13.66.47,9.35.93A4.41,4.41,0,0,0,5.41,5.31V33H49V5.47A4.41,4.41,0,0,0,44.94,1.07Z" />\n        <path fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M47.56,37.58h-40a2.85,2.85,0,0,1-2.85-2.85V31.43a2.85,2.85,0,0,1,2.85-2.85h.11A139.86,139.86,0,0,0,27.56,30a150.41,150.41,0,0,0,19.9-1.38h.1a2.85,2.85,0,0,1,2.85,2.85v3.31A2.85,2.85,0,0,1,47.56,37.58Z" />\n        <rect fill="rgb(255, 255, 255)" x="19.25" y="28.88" width="15.92" height="5.47" rx="2.02" ry="2.02" />\n      </g></svg>`},x={getTemplate(e,t){return"1"===e?this._type1(t):"2"===e?this._type2(t):"3"===e?this._type3(t):this._default(t)},_type1:e=>`<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">\n            <g class="seat" transform="scale(1)"><path class="bd" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" fill="${e.fillColor}" d="M127.05,89.33H12.38V13.83A9.67,9.67,0,0,1,22,4.17,455.22,455.22,0,0,1,69.72,1.5a436.21,436.21,0,0,1,47.71,2.67,9.67,9.67,0,0,1,9.63,9.66Z"></path>\n            <path class="bd" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" fill="${e.fillColor}" d="M12.38,89.33H127.05a0,0,0,0,1,0,0v36.26a7.59,7.59,0,0,1-7.59,7.59H20a7.59,7.59,0,0,1-7.59-7.59V89.33A0,0,0,0,1,12.38,89.33Z"></path><path stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" fill="${e.armrestColor}" class="bc" d="M13.84,131.7H3.08A3.09,3.09,0,0,1,0,128.61V33a3.09,3.09,0,0,1,3.08-3.08H13.84A3.09,3.09,0,0,1,16.93,33v95.64A3.09,3.09,0,0,1,13.84,131.7ZM140,128.61V33a3.09,3.09,0,0,0-3.08-3.08H126.57A3.09,3.09,0,0,0,123.49,33v95.64a3.09,3.09,0,0,0,3.08,3.08h10.34A3.09,3.09,0,0,0,140,128.61Z"></path>\n            <path class="bd" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" fill="${e.fillColor}" d="M118.59,146.5H20.86c-3.83,0-7-3.93-7-8.77v-10.2c0-4.84,3.12-8.77,7-8.77l.27,0A272.65,272.65,0,0,0,69.72,123a293.15,293.15,0,0,0,48.61-4.24l.25,0c3.83,0,7,3.93,7,8.77v10.2C125.54,142.57,122.42,146.5,118.59,146.5Z"></path>\n            <path stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" fill="${e.fillColor}" class="cf" d="M94.24,140.35H45.19a4.13,4.13,0,0,1-4.13-4.14V122a4.15,4.15,0,0,1,.11-.93l3.65-7a4.13,4.13,0,0,1,4-3.21H90.1a4.13,4.13,0,0,1,4,3.09L98.24,121a4.15,4.15,0,0,1,.13,1v14.2A4.13,4.13,0,0,1,94.24,140.35Z"></path>\n            </g>\n        </svg>`,_type2:e=>`<svg version="1.1" baseProfile="full" viewBox="0 -3 110 100" xmlns="http://www.w3.org/2000/svg">\n      <g class="seat" transform="scale(2)">\n      <rect fill="${e.armrestColor}" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />\n      <rect fill="${e.armrestColor}" x="49.02" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />\n      <path fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M44.94,1.07C40.15.71,33.1,0,26.87,0,21.37,0,13.66.47,9.35.93A4.41,4.41,0,0,0,5.41,5.31V33H49V5.47A4.41,4.41,0,0,0,44.94,1.07Z" />\n      <path fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M47.56,37.58h-40a2.85,2.85,0,0,1-2.85-2.85V31.43a2.85,2.85,0,0,1,2.85-2.85h.11A139.86,139.86,0,0,0,27.56,30a150.41,150.41,0,0,0,19.9-1.38h.1a2.85,2.85,0,0,1,2.85,2.85v3.31A2.85,2.85,0,0,1,47.56,37.58Z" />\n      <rect fill="rgb(255, 255, 255)" x="19.25" y="28.88" width="15.92" height="5.47" rx="2.02" ry="2.02" /></g></svg>`,_type3:e=>`<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">\n      <g class="seat" transform="scale(2)"><rect fill="{$style.armrestColor}" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />\n      <rect fill="${e.armrestColor}" x="49.02" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />\n      <path fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M44.94,1.07C40.15.71,33.1,0,26.87,0,21.37,0,13.66.47,9.35.93A4.41,4.41,0,0,0,5.41,5.31V33H49V5.47A4.41,4.41,0,0,0,44.94,1.07Z" />\n      <path fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M47.56,37.58h-40a2.85,2.85,0,0,1-2.85-2.85V31.43a2.85,2.85,0,0,1,2.85-2.85h.11A139.86,139.86,0,0,0,27.56,30a150.41,150.41,0,0,0,19.9-1.38h.1a2.85,2.85,0,0,1,2.85,2.85v3.31A2.85,2.85,0,0,1,47.56,37.58Z" />\n      <rect fill="rgb(255, 255, 255)" x="19.25" y="28.88" width="15.92" height="5.47" rx="2.02" ry="2.02" /></g></svg>`,_default:e=>`<svg version="1.1" baseProfile="full" viewBox="0 0 150 220" xmlns="http://www.w3.org/2000/svg">\n      <g class="seat" transform="scale(1.2)">\n      <path class="bd" fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M89.24,20c-.34-7.62-6.46-6.61-9.52-10.33S78.71.5,70.55.5H29.75c-8.16,0-6.12,5.42-9.18,9.15S11.4,12.37,11.06,20s0,13.74,0,13.74H89.24S89.58,27.61,89.24,20Z"></path>\n      <path class="bd" fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M85,72.8H16.81a6.89,6.89,0,0,1-6.88-6.86V37.14a6.89,6.89,0,0,1,6.88-6.86,326.72,326.72,0,0,1,34.08-1.9A313.07,313.07,0,0,1,85,30.27a6.89,6.89,0,0,1,6.88,6.86v28.8A6.89,6.89,0,0,1,85,72.8Z"></path>\n      <rect class="bd" fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" x="9.93" y="71.69" width="81.91" height="60.75" rx="7.59" ry="7.59"></rect>\n      <path class="bc" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" fill="${e.armrestColor}" d="M9,142.15H3.08A3.09,3.09,0,0,1,0,139.07V84.52a3.09,3.09,0,0,1,3.08-3.08H9a3.09,3.09,0,0,1,3.08,3.08v54.55A3.09,3.09,0,0,1,9,142.15Zm91-3.08V84.52a3.09,3.09,0,0,0-3.08-3.08H91.29a3.09,3.09,0,0,0-3.08,3.08v54.55a3.09,3.09,0,0,0,3.08,3.08h5.63A3.09,3.09,0,0,0,100,139.07Z"></path>\n      <path class="bd" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" fill="${e.fillColor}" d="M84.71,145.5H14.9c-2.74,0-5-2.8-5-6.23V132c0-3.44,2.23-6.23,5-6.23l.19,0a195.67,195.67,0,0,0,34.71,3,210.38,210.38,0,0,0,34.72-3l.18,0c2.74,0,5,2.8,5,6.23v7.25C89.67,142.7,87.44,145.5,84.71,145.5Z"></path>\n      <path class="cf" fill="white" stroke="white" d="M67.32,141.13h-35a2.94,2.94,0,0,1-2.95-2.94V128.06a2.93,2.93,0,0,1,.08-.66L32,116.12a3,3,0,0,1,2.87-2.28H64.35a3,3,0,0,1,2.85,2.2l3,11.31a2.93,2.93,0,0,1,.1.74v10.09A2.94,2.94,0,0,1,67.32,141.13Z"></path>\n      </g></svg>`},C={getTemplate(e,t){return this._default(t)},_default:e=>`<svg version="1.1" baseProfile="full" viewBox="0 -3 110 110" width="86" height="110" xmlns="http://www.w3.org/2000/svg">\n        <g class="seat" transform="scale(2)">\n        <rect fill="${e.armrestColor}" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />\n        <rect fill="${e.armrestColor}" x="49.02" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />\n        <path fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M44.94,1.07C40.15.71,33.1,0,26.87,0,21.37,0,13.66.47,9.35.93A4.41,4.41,0,0,0,5.41,5.31V33H49V5.47A4.41,4.41,0,0,0,44.94,1.07Z" />\n        <path fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M47.56,37.58h-40a2.85,2.85,0,0,1-2.85-2.85V31.43a2.85,2.85,0,0,1,2.85-2.85h.11A139.86,139.86,0,0,0,27.56,30a150.41,150.41,0,0,0,19.9-1.38h.1a2.85,2.85,0,0,1,2.85,2.85v3.31A2.85,2.85,0,0,1,47.56,37.58Z" />\n        <rect fill="rgb(255, 255, 255)" x="19.25" y="28.88" width="15.92" height="5.47" rx="2.02" ry="2.02" />\n        </g></svg>`},$={getTemplate(e,t){return this._default(t)},_default:e=>`<svg version="1.1" baseProfile="full" viewBox="0 -3 110 100" width="110" height="100" xmlns="http://www.w3.org/2000/svg">\n        <g class="seat" transform="scale(2)"><rect fill="${e.armrestColor}" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />\n        <rect fill="${e.armrestColor}" x="49.02" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />\n        <path fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M44.94,1.07C40.15.71,33.1,0,26.87,0,21.37,0,13.66.47,9.35.93A4.41,4.41,0,0,0,5.41,5.31V33H49V5.47A4.41,4.41,0,0,0,44.94,1.07Z" />\n        <path fill="${e.fillColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}" d="M47.56,37.58h-40a2.85,2.85,0,0,1-2.85-2.85V31.43a2.85,2.85,0,0,1,2.85-2.85h.11A139.86,139.86,0,0,0,27.56,30a150.41,150.41,0,0,0,19.9-1.38h.1a2.85,2.85,0,0,1,2.85,2.85v3.31A2.85,2.85,0,0,1,47.56,37.58Z" />\n        <rect fill="rgb(255, 255, 255)" x="19.25" y="28.88" width="15.92" height="5.47" rx="2.02" ry="2.02" />\n        </g></svg>`};function S(e,t){void 0===t&&(t={});var a=t.insertAt;if(e&&"undefined"!=typeof document){var s=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===a&&s.firstChild?s.insertBefore(r,s.firstChild):s.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}}S(".jets-seat{align-items:center;box-sizing:border-box;display:flex;float:left;justify-content:center;position:relative}.jets-seat-pillow{background-color:#fff;bottom:0;height:4px;left:calc(50% - 6px);position:absolute;width:12px}.jets-unavailable{cursor:not-allowed;position:relative}.jets-available,.jets-selected{cursor:pointer;position:relative}.jets-selected{color:#fff}.jets-aisle,.jets-empty,.jets-index{pointer-events:none;transform:rotate(0)!important}.jets-seat-r-nw{transform:scale(.8) rotate(-20deg)}.jets-seat-r-ne{transform:scale(.8) rotate(20deg)}.jets-seat-r-s{transform:rotate(180deg)}.jets-seat-r-se{transform:scale(.8) rotate(160deg)}.jets-seat-r-sw{transform:scale(.8) rotate(-160deg)}svg{height:100%;width:100%}.jets-seat-passenger{align-items:center;border-radius:50%;display:flex;font-size:36px;justify-content:center;position:absolute}.jets-seat-svg{height:100%;width:100%}");const _=({data:t})=>{const{onSeatClick:s,params:r}=e.useContext(v),{letter:l,type:i,status:o,size:n,passenger:d,color:c,rotation:p,seatType:f,topOffset:g,leftOffset:u}=t,{index:m,aisle:w}=h,y=["jets-seat",`jets-${i}`,`jets-${o}`,`jets-seat-r-${p} `],x=e.useRef(),C=()=>i===m||i===w?l:d?d.abbr||"P":"",$={width:n.width,height:n.height,top:g,left:u},S={strokeColor:c,armrestColor:"rgb(185,186,186)",fillColor:"available"===o?b:"#ccc",strokeWidth:1},_={width:.8*n.width,height:.8*n.width,left:n.width/2-.4*n.width,top:n.height/2-.4*n.width,backgroundColor:d?.passengerColor||"#1157ce"},j={transform:`rotate(0deg) scale(${r.antiScale})`};return a.default.createElement(a.default.Fragment,null,a.default.createElement("div",{ref:x,onClick:e=>s(t,x,e),style:$,className:y.join(" ")},f&&i!==m?a.default.createElement(a.default.Fragment,null,a.default.createElement("div",{className:"jets-seat-svg",dangerouslySetInnerHTML:{__html:k.getTemplateBySeatType(f,S)}}),d&&a.default.createElement("div",{style:_,className:"jets-seat-passenger"},C())):a.default.createElement("div",{style:j},C())))};S(".jets-btn{-webkit-font-smoothing:antialiased;background-color:#3854f5;border:1px solid #ccc;border-radius:2px;color:#fff;cursor:pointer;display:inline-block;font-family:inherit;font-size:14px;font-weight:600;height:40px;line-height:1.5;padding:9.5px 18px;text-align:center;text-decoration:none;vertical-align:middle}.jets-btn:disabled{background-color:#ccc;color:#000;cursor:not-allowed}");const j=({content:e,onClick:t,className:s,disabled:l,active:i,...o})=>a.default.createElement("button",r({},o,{className:s,onClick:t,disabled:l}),e);j.defaultProps={content:"Btn",className:"jets-btn",disabled:!1,active:!1,onClick:()=>{}};S(".jets-tooltip{background:#fff;border-radius:2px;box-shadow:0 0 0 1px #c0cad5,0 0 4px 0 rgb(0 0 0/8%),0 8px 8px 0 rgb(0 0 0/8%),0 16px 16px 0 rgb(0 0 0/8%);box-sizing:border-box;font-size:12px;max-width:100%;outline:0;position:absolute;z-index:200}.jets-tooltip--content{padding:16px}.jets-tooltip--header{display:flex;font-size:15px;font-weight:700;justify-content:space-between;margin-bottom:8px;width:100%}.jets-tooltip--features>ul{list-style:none;margin:0;padding:0;width:100%}.jets-tooltip--feature img{height:8px;width:8px}.jets-tooltip--feature>span{display:block;margin-right:5px}.jets-tooltip--features>ul>li{align-items:center;color:#4f6f8f;display:flex;font-size:13px;font-weight:500;font-weight:700;line-height:1.4;margin-bottom:.6rem;width:100%}.jets-tooltip--btns-block{display:flex;width:100%}.jets-tooltip--btn{-webkit-font-smoothing:antialiased;border-radius:2px;border-style:solid;border-width:0;cursor:pointer;display:inline-block;font-family:inherit;font-size:14px;font-weight:600;line-height:1.5;padding:9.5px 18px;text-align:center;text-decoration:none;vertical-align:middle;width:50%}.jets-cancel-btn{background-color:#edf0f3;color:#001833}.jets-select-btn{background-color:#007aff;color:#fff}");const E=({data:t})=>{const{onTooltipClose:s,onSeatSelect:r,isSelectAvailable:l,onSeatUnselect:i}=e.useContext(v),{number:o,classType:n,top:d,left:c,features:h,id:p,price:f,passenger:u,nextPassanger:m,passengerTypes:w,lang:b,rowName:k,antiScale:y,transformOrigin:x}=t,C={width:220,transformOrigin:x,transform:`scale(${y})`,top:d,left:c};return a.default.createElement("div",{style:C,className:"jets-tooltip"},a.default.createElement("div",{className:"jets-tooltip--body"},a.default.createElement("div",{className:"jets-tooltip--content"},a.default.createElement("div",{className:"jets-tooltip--header"},a.default.createElement("div",{className:"jets-tooltip--header-title"},k||n," ",o),a.default.createElement("div",{className:"jets-tooltip--header-price"},f)),a.default.createElement("div",{className:"jets-tooltip--features"},a.default.createElement("ul",null,h.map((({title:e,icon:t,value:s})=>a.default.createElement("li",{className:"jets-tooltip--feature",key:e},a.default.createElement("span",null,t?a.default.createElement("img",{src:require(`./assets/img/${t}`)}):s),a.default.createElement("div",null,e))))))),a.default.createElement("div",{className:"jets-tooltip--btns-block"},a.default.createElement(j,{onClick:s,content:g[b].cancel,className:"jets-btn jets-tooltip--btn jets-cancel-btn"}),u?a.default.createElement(j,{onClick:()=>i(t),content:g[b].unselect,className:"jets-btn jets-tooltip--btn jets-select-btn"}):a.default.createElement(j,{disabled:!l||m?.passengerType&&w?.length&&!w?.includes(m?.passengerType),onClick:()=>r(t),content:g[b].select,className:"jets-btn jets-tooltip--btn jets-select-btn"}))))};S(".jets-row{position:absolute}");const A=({seats:t,top:s})=>{const{activeTooltip:r}=e.useContext(v);return a.default.createElement("div",{className:"jets-row",style:{top:s}},!!t.find((e=>e?.id===r?.id))&&a.default.createElement(E,{data:r}),t?.map((e=>a.default.createElement(_,{key:e.id,data:e}))))};S(".jets-deck{align-items:center;display:flex;flex-direction:column;height:100%;margin:40px 0;position:relative;width:100%}.jets-deck--title{font-size:18px;font-weight:700}");const P=({rows:t,number:s,lang:r})=>{const{params:l}=e.useContext(v),i={height:l?.decksHeight?.length?l.decksHeight[s-1]:0},o={transform:`scale(${l.antiScale})`};return a.default.createElement("div",{className:"jets-deck",style:i},s&&a.default.createElement("div",{className:"jets-deck--title",style:o},g[r].deck,": ",s),t.map((e=>a.default.createElement(A,{key:e.id,seats:e.seats,top:e.topOffset}))))};class T extends l{constructor(){super(),s(this,"getPlaneFeatures",(async e=>{const t=await this._auth.getToken(),a=this.getRequestOptions(t);return await this.postData("flight/features/plane",e,a)})),this._auth=new n}}class H{constructor(){s(this,"getSeatMapParams",((e,t,a)=>{const{size:s,classCode:r}=e,l=this._calculateSeatMapInnerWidth(s,r)||a.width;return{...this._calculateSeatMapScale(l,a.width),innerWidth:l,decksHeight:this._calculateDecksHeight(t)}})),s(this,"_calculateSeatMapScale",((e,t)=>({scale:t/e||1,antiScale:e/t||1}))),s(this,"_calculateSeatMapInnerWidth",((e,t)=>e*m[t]?.width)),s(this,"_calculateDecksHeight",(e=>e?.map((({rows:e})=>{if(!e.length)return 0;const t=e.at(-1),{topOffset:a,classCode:s,seats:r}=t,l=this._calculateRowMaxSeatTopOffset(r);return a+m[s].height+100+150+l||0})))),s(this,"_calculateRowMaxSeatTopOffset",(e=>e?.reduce(((e,{topOffset:t})=>(t>e&&(e=t),e)),0)))}}class M{constructor(){s(this,"_calculator",null),s(this,"prepareData",((e,t)=>{if(!e)return[];const{cabin:a,seatDetails:s}=e,r=s?.decks,l=this._getBiggestRowInfo(r),i=this._calculator.getSeatMapParams(l,r,t);return{content:r?.map((({rows:e})=>{const s={config:t,seatsNumber:l.size};return this._getPreparedRows(e,a,s)}))||[],params:i}})),s(this,"_getPreparedRows",((e,t,a)=>{if(!e?.length)return[];const s=this._getBiggestDeckRow(e),r=e.map((e=>this._prepareRow(e,t,a))),l=this._prepareRow(s,t,a);return[this._prepareIndexRow(l),...r]})),s(this,"_prepareRow",((e,t,a)=>{const{number:s,topOffset:r}=e,l=d.generateId();return{seats:this._getPreparedSeats(e,t,a),id:l,number:s,topOffset:r+100+150}})),s(this,"_getPreparedSeats",((e,t,a)=>{const{number:s,seatScheme:r,seats:l,classCode:i}=e;if(!l?.length)return[];let o=0;return r.split("").reduce(((r,n)=>{const{seat:c,aisle:h,empty:f}=p;let g=this._prepareSeat(l[o],e,t,a.config);return n===h&&(g=this._prepareAisle(s)),n===f&&(g=this._prepareEmpty()),n===c&&o++,g.size=this._calculateSeatSize(i),g.id=d.generateId(),r.push(g),r}),[])})),s(this,"_prepareIndexRow",(e=>{const{index:t,aisle:a,empty:s}=h,r=e.seats.map((e=>(e.letter=e.type===a?"":e.letter,e.type=e.type===a?s:t,e.status=c.disabled,e.topOffset=100,e.number="",e)));return{...e,number:"",seats:r,topOffset:0}})),s(this,"_prepareSeat",((e,t,a,s)=>{const{number:r,classCode:l,name:i,seatType:o}=t,n=this._prepareSeatFeatures(e,a,s.lang),d=f[l.toLowerCase()]||"",p=r+e?.letter||"",g=h.seat,u=c.available,m=`${l}-${o}`;return{...e,features:n,status:u,type:g,number:p,classType:d,classCode:l,rowName:i,seatType:m}})),s(this,"_prepareAisle",(e=>({letter:e,type:h.aisle,status:c.disabled}))),s(this,"_prepareEmpty",(()=>({letter:"",status:c.disabled,type:h.empty}))),s(this,"_calculateSeatSize",(e=>e&&m[e]?m[e]:w)),s(this,"_getBiggestDeckRow",(e=>[...e].sort(((e,t)=>t.seats.length-e.seats.length))[0])),s(this,"_getBiggestRowInfo",(e=>{let t,a=0;return e?.forEach((({rows:e})=>{const s=this._getBiggestDeckRow(e),r=s?.seatScheme?.length;r>a&&(a=r,t=s.classCode||"E")})),{size:a,classCode:t}})),s(this,"_prepareSeatFeatures",((e,t,a)=>{const{pitch:s,width:r,recline:l}=t,i={...e?.features,pitch:s,width:r,recline:l};return Object.entries(i).map((([e,t])=>{const s=g[a][e]||e,r="wifi_enabled"===e||"wifiEnabled"===e;let l=this._getFeatureIcon(t);return r&&(l=this._getFeatureIcon("wifi")),{title:s,icon:l,value:t}}))})),s(this,"_getFeatureIcon",(e=>{let t="";return"+"===e&&(t="plus.svg"),"-"===e&&(t="minus.svg"),"wifi"===e&&(t="wifi.svg"),t})),this._calculator=new H}}class W{constructor(){s(this,"getSeatMapData",(async(e,t,a,s)=>{const{width:r,lang:l,units:i}=s,o={flights:[e],featuresList:u,lang:l,units:i},n=await this._api.getPlaneFeatures(o),d=a?.find((e=>e.seat?.seatLabel));let{content:c,params:h}=this._preparer.prepareData(n[0],s);return t&&(c=this.setAvailabilityHandler(c,t)),a&&d&&(c=this.setPassengersHandler(c,a)),{content:c,params:h}})),s(this,"selectSeatHandler",((e,t,a)=>{const s=this.getNextPassenger(a),r=a.map((e=>{if(s.id===e.id){const a={price:t.price,seatLabel:t.number};e.seat=a}return e}));return{data:this.setPassengersHandler(e,r),passengers:r}})),s(this,"unselectSeatHandler",((e,t,a)=>{const s=a.map((e=>(t.passenger?.id===e.id&&(e.seat=null),e)));return{data:this.setPassengersHandler(e,s),passengers:s}})),s(this,"setAvailabilityHandler",((e,t)=>{const{selected:a,available:s,unavailable:r}=c,l=t?.find((e=>"*"===e.label));return e.map((e=>e.map((e=>{const i=e.seats.map((e=>{const i=t.find((t=>t.label===e.number));if(i){const{price:t,currency:r}=i;e.status=e.status===a?a:s,e.price=`${r} ${t||0}`||"",e.passengerTypes=i.onlyForPassengerType||l?.onlyForPassengerType||["ADT","CHD","INF"]}else e.type===h.seat&&(e.status=l?s:r,e.price=`${l?.currency} ${l?.price||0}`||"",e.passenger=null,e.passengerTypes=l?.onlyForPassengerType||["ADT","CHD","INF"]);return e}));return{...e,seats:i}}))))})),s(this,"setPassengersHandler",((e,t)=>{const{selected:a,available:s,unavailable:r}=c;return e.map((e=>e.map((e=>{const l=e.seats.map((e=>{const l=t.find((t=>e.number&&t?.seat?.seatLabel===e.number));return l&&e.status===s&&(e.status=a,e.price=l.seat?.price||e.price,e.passenger=l),l&&e.status===r&&(l.seat=null),l||e.status!==a||(e.status=s,e.passenger=null),e}));return{...e,seats:l}}))))})),s(this,"calculateTooltipData",((e,t,a,s)=>{const{offsetTop:r,offsetLeft:l}=t,{width:i}=a.getBoundingClientRect(),o=i*s,n=220*s,d=l+n>o,c=l-n<0,h=r+e.size.height/2,p=d?c?o-o/2-110:l-220+e.size.width/2:l+e.size.width/2,f=d?c?"center":"top right":"top left";return{...e,top:h,left:p,transformOrigin:f,antiScale:s}})),s(this,"getNextPassenger",(e=>e?.find((e=>!e.seat?.seatLabel)))),s(this,"addAbbrToPassengers",(e=>e?.map(((e,t)=>(e.abbr=this._getPassengerAbbr(e,t+1),e))))),s(this,"_getPassengerAbbr",((e,t)=>{const{passengerLabel:a}=e;if(!a)return`P${t}`;const s=a?.split(" ");return s.length>1?s.slice(0,2).map((e=>e[0])).join(""):a.substring(0,2).toUpperCase()})),s(this,"findPassengerBySeatNumber",((e,t)=>e.find((e=>e.seat?.seatLabel===t)))),this._api=new T,this._preparer=new M}}S(".jets-no-data{align-items:center;display:flex;font-size:18px;font-weight:700;height:100%;height:100vh;justify-content:center;width:100%}");const N=()=>{const{params:t}=e.useContext(v),s={transform:`scale(${t?.antiScale})`};return a.default.createElement("div",{style:s,className:"jets-no-data"},"Seat map is not found for the flight")};S('.jets-not-init{align-items:center;display:flex;font-size:18px;font-weight:700;height:100%;height:100vh;justify-content:center;width:100%}.jets-not-init--spinner{height:50px;width:50px}.lds-roller{display:inline-block;height:80px;position:relative;width:80px}.lds-roller div{animation:lds-roller 1.2s cubic-bezier(.5,0,.5,1) infinite;transform-origin:40px 40px}.lds-roller div:after{background:#000;border-radius:50%;content:" ";display:block;height:7px;margin:-4px 0 0 -4px;position:absolute;width:7px}.lds-roller div:first-child{animation-delay:-36ms}.lds-roller div:first-child:after{left:63px;top:63px}.lds-roller div:nth-child(2){animation-delay:-72ms}.lds-roller div:nth-child(2):after{left:56px;top:68px}.lds-roller div:nth-child(3){animation-delay:-.108s}.lds-roller div:nth-child(3):after{left:48px;top:71px}.lds-roller div:nth-child(4){animation-delay:-.144s}.lds-roller div:nth-child(4):after{left:40px;top:72px}.lds-roller div:nth-child(5){animation-delay:-.18s}.lds-roller div:nth-child(5):after{left:32px;top:71px}.lds-roller div:nth-child(6){animation-delay:-.216s}.lds-roller div:nth-child(6):after{left:24px;top:68px}.lds-roller div:nth-child(7){animation-delay:-.252s}.lds-roller div:nth-child(7):after{left:17px;top:63px}.lds-roller div:nth-child(8){animation-delay:-.288s}.lds-roller div:nth-child(8):after{left:12px;top:56px}@keyframes lds-roller{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}');const B=()=>a.default.createElement("div",{className:"jets-not-init"},a.default.createElement("div",{className:"lds-roller jets-not-init--spinner"},a.default.createElement("div",null),a.default.createElement("div",null),a.default.createElement("div",null),a.default.createElement("div",null),a.default.createElement("div",null),a.default.createElement("div",null),a.default.createElement("div",null),a.default.createElement("div",null)));S('@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400");.jets-seat-map{font-family:Montserrat,sans-serif;position:relative;width:100%}');const V=({flight:t,availability:s,passengers:r,config:l,onSeatMapInited:i,onSeatSelected:o,onSeatUnselected:n})=>{const d={...V.defaultProps.config,...l},[p,f]=e.useState([]),[g,u]=e.useState(!1),[m,w]=e.useState([]),[b,k]=e.useState(null),[y,x]=e.useState(!1),[C,$]=e.useState(null),S=e.useRef(),_=new W;e.useEffect((()=>{let e=!0;return t?.id&&_.getSeatMapData(t,s,r,d).then((t=>{e&&($(t.params),f(t.content),u(!0),i())})),()=>{e=!1}}),[t]),e.useEffect((()=>{const e=_.setAvailabilityHandler(p,s);j(),f(e),k(null)}),[s]),e.useEffect((()=>{j(),k(null)}),[r]);const j=()=>{r=_.addAbbrToPassengers(r);const e=_.setPassengersHandler(p,r||[]);f(e),w(r)},E={zoom:C?.scale,MozTransform:`scale(${C?.scale})`,transformOrigin:"top left",width:C?.innerWidth},A={onSeatClick:(e,t,a)=>{if(e.type!==h.seat||e.status!==c.available&&e.status!==c.selected)return;const s=_.getNextPassenger(m),r=_.calculateTooltipData(e,t.current,S.current,C?.antiScale);x(!!s),k({...r,nextPassanger:s,lang:d.lang})},onTooltipClose:()=>{k(null)},onSeatSelect:e=>{const{data:t,passengers:a}=_.selectSeatHandler(p,e,m);f(t),w(a),k(null),o(a)},onSeatUnselect:e=>{const{data:t,passengers:a}=_.unselectSeatHandler(p,e,m);f(t),w(a),k(null),n(a)},isSelectAvailable:y,params:C,activeTooltip:b};return a.default.createElement(v.Provider,{value:A},a.default.createElement("div",{ref:S,className:"jets-seat-map",style:{width:d.width}},a.default.createElement("div",{style:E},p?.length?p?.map(((e,t)=>a.default.createElement(P,{rows:e,lang:d.lang,number:p.length>1&&e.length?t+1:null,key:t}))):g?a.default.createElement(N,null):a.default.createElement(B,null))))};V.defaultProps={config:{width:350,lang:"EN",units:"metric"},onSeatMapInited:()=>{console.log("JetsSeatMap initialized!")},onSeatSelected:e=>{console.log("Passenger boarded: ",e)},onSeatUnselected:e=>{console.log("Passenger unboarded: ",e)}},exports.JetsSeatMap=V;
