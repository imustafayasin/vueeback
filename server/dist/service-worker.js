if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const o=s=>l(s,r),c={module:{uri:r},exports:u,require:o};e[r]=Promise.all(i.map((s=>c[s]||o(s)))).then((s=>(n(...s),u)))}}define(["./workbox-4f586afe"],(function(s){"use strict";s.setCacheNameDetails({prefix:"client"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/18.3de3b1d8.css",revision:null},{url:"/css/355.30d52db8.css",revision:null},{url:"/css/541.23a57b0a.css",revision:null},{url:"/css/864.918bdfdf.css",revision:null},{url:"/css/app.fe9a2bfb.css",revision:null},{url:"/img/bulb.7e41b20c.png",revision:null},{url:"/img/document-editor.8c345568.png",revision:null},{url:"/index.html",revision:"936cba81e96155ee980b5c7a2b4d9ba7"},{url:"/js/18.0f46da1f.js",revision:null},{url:"/js/355.6457992b.js",revision:null},{url:"/js/541.107de1bd.js",revision:null},{url:"/js/587.74bace09.js",revision:null},{url:"/js/864.8ad388fe.js",revision:null},{url:"/js/92.47584d8b.js",revision:null},{url:"/js/app.911db509.js",revision:null},{url:"/js/chunk-vendors.bb2a45ec.js",revision:null},{url:"/manifest.json",revision:"8eff00fb23e5046e8587fb699e79e093"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
