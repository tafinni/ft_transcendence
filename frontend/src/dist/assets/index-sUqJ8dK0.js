function Gm(s,t){for(var n=0;n<t.length;n++){const i=t[n];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in s)){const a=Object.getOwnPropertyDescriptor(i,r);a&&Object.defineProperty(s,r,a.get?a:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const Wm={type:"logger",log(s){this.output("log",s)},warn(s){this.output("warn",s)},error(s){this.output("error",s)},output(s,t){console&&console[s]&&console[s].apply(console,t)}};class Bo{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.init(t,n)}init(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.prefix=n.prefix||"i18next:",this.logger=t||Wm,this.options=n,this.debug=n.debug}log(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return this.forward(n,"log","",!0)}warn(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return this.forward(n,"warn","",!0)}error(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return this.forward(n,"error","")}deprecate(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return this.forward(n,"warn","WARNING DEPRECATED: ",!0)}forward(t,n,i,r){return r&&!this.debug?null:(typeof t[0]=="string"&&(t[0]=`${i}${this.prefix} ${t[0]}`),this.logger[n](t))}create(t){return new Bo(this.logger,{prefix:`${this.prefix}:${t}:`,...this.options})}clone(t){return t=t||this.options,t.prefix=t.prefix||this.prefix,new Bo(this.logger,t)}}var Gn=new Bo;class al{constructor(){this.observers={}}on(t,n){return t.split(" ").forEach(i=>{this.observers[i]||(this.observers[i]=new Map);const r=this.observers[i].get(n)||0;this.observers[i].set(n,r+1)}),this}off(t,n){if(this.observers[t]){if(!n){delete this.observers[t];return}this.observers[t].delete(n)}}emit(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),r=1;r<n;r++)i[r-1]=arguments[r];this.observers[t]&&Array.from(this.observers[t].entries()).forEach(o=>{let[l,c]=o;for(let u=0;u<c;u++)l(...i)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(o=>{let[l,c]=o;for(let u=0;u<c;u++)l.apply(l,[t,...i])})}}const Bs=()=>{let s,t;const n=new Promise((i,r)=>{s=i,t=r});return n.resolve=s,n.reject=t,n},dd=s=>s==null?"":""+s,Xm=(s,t,n)=>{s.forEach(i=>{t[i]&&(n[i]=t[i])})},$m=/###/g,fd=s=>s&&s.indexOf("###")>-1?s.replace($m,"."):s,hd=s=>!s||typeof s=="string",Ys=(s,t,n)=>{const i=typeof t!="string"?t:t.split(".");let r=0;for(;r<i.length-1;){if(hd(s))return{};const a=fd(i[r]);!s[a]&&n&&(s[a]=new n),Object.prototype.hasOwnProperty.call(s,a)?s=s[a]:s={},++r}return hd(s)?{}:{obj:s,k:fd(i[r])}},pd=(s,t,n)=>{const{obj:i,k:r}=Ys(s,t,Object);if(i!==void 0||t.length===1){i[r]=n;return}let a=t[t.length-1],o=t.slice(0,t.length-1),l=Ys(s,o,Object);for(;l.obj===void 0&&o.length;)a=`${o[o.length-1]}.${a}`,o=o.slice(0,o.length-1),l=Ys(s,o,Object),l&&l.obj&&typeof l.obj[`${l.k}.${a}`]<"u"&&(l.obj=void 0);l.obj[`${l.k}.${a}`]=n},qm=(s,t,n,i)=>{const{obj:r,k:a}=Ys(s,t,Object);r[a]=r[a]||[],r[a].push(n)},ko=(s,t)=>{const{obj:n,k:i}=Ys(s,t);if(n)return n[i]},jm=(s,t,n)=>{const i=ko(s,n);return i!==void 0?i:ko(t,n)},ch=(s,t,n)=>{for(const i in t)i!=="__proto__"&&i!=="constructor"&&(i in s?typeof s[i]=="string"||s[i]instanceof String||typeof t[i]=="string"||t[i]instanceof String?n&&(s[i]=t[i]):ch(s[i],t[i],n):s[i]=t[i]);return s},Br=s=>s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");var Ym={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};const Km=s=>typeof s=="string"?s.replace(/[&<>"'\/]/g,t=>Ym[t]):s;class Zm{constructor(t){this.capacity=t,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(t){const n=this.regExpMap.get(t);if(n!==void 0)return n;const i=new RegExp(t);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(t,i),this.regExpQueue.push(t),i}}const Jm=[" ",",","?","!",";"],Qm=new Zm(20),eg=(s,t,n)=>{t=t||"",n=n||"";const i=Jm.filter(o=>t.indexOf(o)<0&&n.indexOf(o)<0);if(i.length===0)return!0;const r=Qm.getRegExp(`(${i.map(o=>o==="?"?"\\?":o).join("|")})`);let a=!r.test(s);if(!a){const o=s.indexOf(n);o>0&&!r.test(s.substring(0,o))&&(a=!0)}return a},pc=function(s,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:".";if(!s)return;if(s[t])return s[t];const i=t.split(n);let r=s;for(let a=0;a<i.length;){if(!r||typeof r!="object")return;let o,l="";for(let c=a;c<i.length;++c)if(c!==a&&(l+=n),l+=i[c],o=r[l],o!==void 0){if(["string","number","boolean"].indexOf(typeof o)>-1&&c<i.length-1)continue;a+=c-a+1;break}r=o}return r},zo=s=>s&&s.indexOf("_")>0?s.replace("_","-"):s;class md extends al{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{ns:["translation"],defaultNS:"translation"};super(),this.data=t||{},this.options=n,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(t){this.options.ns.indexOf(t)<0&&this.options.ns.push(t)}removeNamespaces(t){const n=this.options.ns.indexOf(t);n>-1&&this.options.ns.splice(n,1)}getResource(t,n,i){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const a=r.keySeparator!==void 0?r.keySeparator:this.options.keySeparator,o=r.ignoreJSONStructure!==void 0?r.ignoreJSONStructure:this.options.ignoreJSONStructure;let l;t.indexOf(".")>-1?l=t.split("."):(l=[t,n],i&&(Array.isArray(i)?l.push(...i):typeof i=="string"&&a?l.push(...i.split(a)):l.push(i)));const c=ko(this.data,l);return!c&&!n&&!i&&t.indexOf(".")>-1&&(t=l[0],n=l[1],i=l.slice(2).join(".")),c||!o||typeof i!="string"?c:pc(this.data&&this.data[t]&&this.data[t][n],i,a)}addResource(t,n,i,r){let a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:{silent:!1};const o=a.keySeparator!==void 0?a.keySeparator:this.options.keySeparator;let l=[t,n];i&&(l=l.concat(o?i.split(o):i)),t.indexOf(".")>-1&&(l=t.split("."),r=n,n=l[1]),this.addNamespaces(n),pd(this.data,l,r),a.silent||this.emit("added",t,n,i,r)}addResources(t,n,i){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{silent:!1};for(const a in i)(typeof i[a]=="string"||Array.isArray(i[a]))&&this.addResource(t,n,a,i[a],{silent:!0});r.silent||this.emit("added",t,n,i)}addResourceBundle(t,n,i,r,a){let o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{silent:!1,skipCopy:!1},l=[t,n];t.indexOf(".")>-1&&(l=t.split("."),r=i,i=n,n=l[1]),this.addNamespaces(n);let c=ko(this.data,l)||{};o.skipCopy||(i=JSON.parse(JSON.stringify(i))),r?ch(c,i,a):c={...c,...i},pd(this.data,l,c),o.silent||this.emit("added",t,n,i)}removeResourceBundle(t,n){this.hasResourceBundle(t,n)&&delete this.data[t][n],this.removeNamespaces(n),this.emit("removed",t,n)}hasResourceBundle(t,n){return this.getResource(t,n)!==void 0}getResourceBundle(t,n){return n||(n=this.options.defaultNS),this.options.compatibilityAPI==="v1"?{...this.getResource(t,n)}:this.getResource(t,n)}getDataByLanguage(t){return this.data[t]}hasLanguageSomeTranslations(t){const n=this.getDataByLanguage(t);return!!(n&&Object.keys(n)||[]).find(r=>n[r]&&Object.keys(n[r]).length>0)}toJSON(){return this.data}}var uh={processors:{},addPostProcessor(s){this.processors[s.name]=s},handle(s,t,n,i,r){return s.forEach(a=>{this.processors[a]&&(t=this.processors[a].process(t,n,i,r))}),t}};const gd={};class Ho extends al{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};super(),Xm(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],t,this),this.options=n,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=Gn.create("translator")}changeLanguage(t){t&&(this.language=t)}exists(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}};if(t==null)return!1;const i=this.resolve(t,n);return i&&i.res!==void 0}extractFromKey(t,n){let i=n.nsSeparator!==void 0?n.nsSeparator:this.options.nsSeparator;i===void 0&&(i=":");const r=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator;let a=n.ns||this.options.defaultNS||[];const o=i&&t.indexOf(i)>-1,l=!this.options.userDefinedKeySeparator&&!n.keySeparator&&!this.options.userDefinedNsSeparator&&!n.nsSeparator&&!eg(t,i,r);if(o&&!l){const c=t.match(this.interpolator.nestingRegexp);if(c&&c.length>0)return{key:t,namespaces:a};const u=t.split(i);(i!==r||i===r&&this.options.ns.indexOf(u[0])>-1)&&(a=u.shift()),t=u.join(r)}return typeof a=="string"&&(a=[a]),{key:t,namespaces:a}}translate(t,n,i){if(typeof n!="object"&&this.options.overloadTranslationOptionHandler&&(n=this.options.overloadTranslationOptionHandler(arguments)),typeof n=="object"&&(n={...n}),n||(n={}),t==null)return"";Array.isArray(t)||(t=[String(t)]);const r=n.returnDetails!==void 0?n.returnDetails:this.options.returnDetails,a=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator,{key:o,namespaces:l}=this.extractFromKey(t[t.length-1],n),c=l[l.length-1],u=n.lng||this.language,d=n.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if(u&&u.toLowerCase()==="cimode"){if(d){const x=n.nsSeparator||this.options.nsSeparator;return r?{res:`${c}${x}${o}`,usedKey:o,exactUsedKey:o,usedLng:u,usedNS:c,usedParams:this.getUsedParamsDetails(n)}:`${c}${x}${o}`}return r?{res:o,usedKey:o,exactUsedKey:o,usedLng:u,usedNS:c,usedParams:this.getUsedParamsDetails(n)}:o}const h=this.resolve(t,n);let f=h&&h.res;const p=h&&h.usedKey||o,v=h&&h.exactUsedKey||o,_=Object.prototype.toString.apply(f),m=["[object Number]","[object Function]","[object RegExp]"],g=n.joinArrays!==void 0?n.joinArrays:this.options.joinArrays,S=!this.i18nFormat||this.i18nFormat.handleAsObject;if(S&&f&&(typeof f!="string"&&typeof f!="boolean"&&typeof f!="number")&&m.indexOf(_)<0&&!(typeof g=="string"&&Array.isArray(f))){if(!n.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const x=this.options.returnedObjectHandler?this.options.returnedObjectHandler(p,f,{...n,ns:l}):`key '${o} (${this.language})' returned an object instead of string.`;return r?(h.res=x,h.usedParams=this.getUsedParamsDetails(n),h):x}if(a){const x=Array.isArray(f),R=x?[]:{},A=x?v:p;for(const w in f)if(Object.prototype.hasOwnProperty.call(f,w)){const I=`${A}${a}${w}`;R[w]=this.translate(I,{...n,joinArrays:!1,ns:l}),R[w]===I&&(R[w]=f[w])}f=R}}else if(S&&typeof g=="string"&&Array.isArray(f))f=f.join(g),f&&(f=this.extendTranslation(f,t,n,i));else{let x=!1,R=!1;const A=n.count!==void 0&&typeof n.count!="string",w=Ho.hasDefaultValue(n),I=A?this.pluralResolver.getSuffix(u,n.count,n):"",M=n.ordinal&&A?this.pluralResolver.getSuffix(u,n.count,{ordinal:!1}):"",E=A&&!n.ordinal&&n.count===0&&this.pluralResolver.shouldUseIntlApi(),O=E&&n[`defaultValue${this.options.pluralSeparator}zero`]||n[`defaultValue${I}`]||n[`defaultValue${M}`]||n.defaultValue;!this.isValidLookup(f)&&w&&(x=!0,f=O),this.isValidLookup(f)||(R=!0,f=o);const z=(n.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&R?void 0:f,Y=w&&O!==f&&this.options.updateMissing;if(R||x||Y){if(this.logger.log(Y?"updateKey":"missingKey",u,c,o,Y?O:f),a){const F=this.resolve(o,{...n,keySeparator:!1});F&&F.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let L=[];const N=this.languageUtils.getFallbackCodes(this.options.fallbackLng,n.lng||this.language);if(this.options.saveMissingTo==="fallback"&&N&&N[0])for(let F=0;F<N.length;F++)L.push(N[F]);else this.options.saveMissingTo==="all"?L=this.languageUtils.toResolveHierarchy(n.lng||this.language):L.push(n.lng||this.language);const k=(F,ne,te)=>{const de=w&&te!==f?te:z;this.options.missingKeyHandler?this.options.missingKeyHandler(F,c,ne,de,Y,n):this.backendConnector&&this.backendConnector.saveMissing&&this.backendConnector.saveMissing(F,c,ne,de,Y,n),this.emit("missingKey",F,c,ne,f)};this.options.saveMissing&&(this.options.saveMissingPlurals&&A?L.forEach(F=>{const ne=this.pluralResolver.getSuffixes(F,n);E&&n[`defaultValue${this.options.pluralSeparator}zero`]&&ne.indexOf(`${this.options.pluralSeparator}zero`)<0&&ne.push(`${this.options.pluralSeparator}zero`),ne.forEach(te=>{k([F],o+te,n[`defaultValue${te}`]||O)})}):k(L,o,O))}f=this.extendTranslation(f,t,n,h,i),R&&f===o&&this.options.appendNamespaceToMissingKey&&(f=`${c}:${o}`),(R||x)&&this.options.parseMissingKeyHandler&&(this.options.compatibilityAPI!=="v1"?f=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${c}:${o}`:o,x?f:void 0):f=this.options.parseMissingKeyHandler(f))}return r?(h.res=f,h.usedParams=this.getUsedParamsDetails(n),h):f}extendTranslation(t,n,i,r,a){var o=this;if(this.i18nFormat&&this.i18nFormat.parse)t=this.i18nFormat.parse(t,{...this.options.interpolation.defaultVariables,...i},i.lng||this.language||r.usedLng,r.usedNS,r.usedKey,{resolved:r});else if(!i.skipInterpolation){i.interpolation&&this.interpolator.init({...i,interpolation:{...this.options.interpolation,...i.interpolation}});const u=typeof t=="string"&&(i&&i.interpolation&&i.interpolation.skipOnVariables!==void 0?i.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let d;if(u){const f=t.match(this.interpolator.nestingRegexp);d=f&&f.length}let h=i.replace&&typeof i.replace!="string"?i.replace:i;if(this.options.interpolation.defaultVariables&&(h={...this.options.interpolation.defaultVariables,...h}),t=this.interpolator.interpolate(t,h,i.lng||this.language||r.usedLng,i),u){const f=t.match(this.interpolator.nestingRegexp),p=f&&f.length;d<p&&(i.nest=!1)}!i.lng&&this.options.compatibilityAPI!=="v1"&&r&&r.res&&(i.lng=this.language||r.usedLng),i.nest!==!1&&(t=this.interpolator.nest(t,function(){for(var f=arguments.length,p=new Array(f),v=0;v<f;v++)p[v]=arguments[v];return a&&a[0]===p[0]&&!i.context?(o.logger.warn(`It seems you are nesting recursively key: ${p[0]} in key: ${n[0]}`),null):o.translate(...p,n)},i)),i.interpolation&&this.interpolator.reset()}const l=i.postProcess||this.options.postProcess,c=typeof l=="string"?[l]:l;return t!=null&&c&&c.length&&i.applyPostProcessor!==!1&&(t=uh.handle(c,t,n,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...r,usedParams:this.getUsedParamsDetails(i)},...i}:i,this)),t}resolve(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i,r,a,o,l;return typeof t=="string"&&(t=[t]),t.forEach(c=>{if(this.isValidLookup(i))return;const u=this.extractFromKey(c,n),d=u.key;r=d;let h=u.namespaces;this.options.fallbackNS&&(h=h.concat(this.options.fallbackNS));const f=n.count!==void 0&&typeof n.count!="string",p=f&&!n.ordinal&&n.count===0&&this.pluralResolver.shouldUseIntlApi(),v=n.context!==void 0&&(typeof n.context=="string"||typeof n.context=="number")&&n.context!=="",_=n.lngs?n.lngs:this.languageUtils.toResolveHierarchy(n.lng||this.language,n.fallbackLng);h.forEach(m=>{this.isValidLookup(i)||(l=m,!gd[`${_[0]}-${m}`]&&this.utils&&this.utils.hasLoadedNamespace&&!this.utils.hasLoadedNamespace(l)&&(gd[`${_[0]}-${m}`]=!0,this.logger.warn(`key "${r}" for languages "${_.join(", ")}" won't get resolved as namespace "${l}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),_.forEach(g=>{if(this.isValidLookup(i))return;o=g;const S=[d];if(this.i18nFormat&&this.i18nFormat.addLookupKeys)this.i18nFormat.addLookupKeys(S,d,g,m,n);else{let x;f&&(x=this.pluralResolver.getSuffix(g,n.count,n));const R=`${this.options.pluralSeparator}zero`,A=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(f&&(S.push(d+x),n.ordinal&&x.indexOf(A)===0&&S.push(d+x.replace(A,this.options.pluralSeparator)),p&&S.push(d+R)),v){const w=`${d}${this.options.contextSeparator}${n.context}`;S.push(w),f&&(S.push(w+x),n.ordinal&&x.indexOf(A)===0&&S.push(w+x.replace(A,this.options.pluralSeparator)),p&&S.push(w+R))}}let y;for(;y=S.pop();)this.isValidLookup(i)||(a=y,i=this.getResource(g,m,y,n))}))})}),{res:i,usedKey:r,exactUsedKey:a,usedLng:o,usedNS:l}}isValidLookup(t){return t!==void 0&&!(!this.options.returnNull&&t===null)&&!(!this.options.returnEmptyString&&t==="")}getResource(t,n,i){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};return this.i18nFormat&&this.i18nFormat.getResource?this.i18nFormat.getResource(t,n,i,r):this.resourceStore.getResource(t,n,i,r)}getUsedParamsDetails(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const n=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],i=t.replace&&typeof t.replace!="string";let r=i?t.replace:t;if(i&&typeof t.count<"u"&&(r.count=t.count),this.options.interpolation.defaultVariables&&(r={...this.options.interpolation.defaultVariables,...r}),!i){r={...r};for(const a of n)delete r[a]}return r}static hasDefaultValue(t){const n="defaultValue";for(const i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&n===i.substring(0,n.length)&&t[i]!==void 0)return!0;return!1}}const El=s=>s.charAt(0).toUpperCase()+s.slice(1);class _d{constructor(t){this.options=t,this.supportedLngs=this.options.supportedLngs||!1,this.logger=Gn.create("languageUtils")}getScriptPartFromCode(t){if(t=zo(t),!t||t.indexOf("-")<0)return null;const n=t.split("-");return n.length===2||(n.pop(),n[n.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(n.join("-"))}getLanguagePartFromCode(t){if(t=zo(t),!t||t.indexOf("-")<0)return t;const n=t.split("-");return this.formatLanguageCode(n[0])}formatLanguageCode(t){if(typeof t=="string"&&t.indexOf("-")>-1){const n=["hans","hant","latn","cyrl","cans","mong","arab"];let i=t.split("-");return this.options.lowerCaseLng?i=i.map(r=>r.toLowerCase()):i.length===2?(i[0]=i[0].toLowerCase(),i[1]=i[1].toUpperCase(),n.indexOf(i[1].toLowerCase())>-1&&(i[1]=El(i[1].toLowerCase()))):i.length===3&&(i[0]=i[0].toLowerCase(),i[1].length===2&&(i[1]=i[1].toUpperCase()),i[0]!=="sgn"&&i[2].length===2&&(i[2]=i[2].toUpperCase()),n.indexOf(i[1].toLowerCase())>-1&&(i[1]=El(i[1].toLowerCase())),n.indexOf(i[2].toLowerCase())>-1&&(i[2]=El(i[2].toLowerCase()))),i.join("-")}return this.options.cleanCode||this.options.lowerCaseLng?t.toLowerCase():t}isSupportedCode(t){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(t=this.getLanguagePartFromCode(t)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.indexOf(t)>-1}getBestMatchFromCodes(t){if(!t)return null;let n;return t.forEach(i=>{if(n)return;const r=this.formatLanguageCode(i);(!this.options.supportedLngs||this.isSupportedCode(r))&&(n=r)}),!n&&this.options.supportedLngs&&t.forEach(i=>{if(n)return;const r=this.getLanguagePartFromCode(i);if(this.isSupportedCode(r))return n=r;n=this.options.supportedLngs.find(a=>{if(a===r)return a;if(!(a.indexOf("-")<0&&r.indexOf("-")<0)&&(a.indexOf("-")>0&&r.indexOf("-")<0&&a.substring(0,a.indexOf("-"))===r||a.indexOf(r)===0&&r.length>1))return a})}),n||(n=this.getFallbackCodes(this.options.fallbackLng)[0]),n}getFallbackCodes(t,n){if(!t)return[];if(typeof t=="function"&&(t=t(n)),typeof t=="string"&&(t=[t]),Array.isArray(t))return t;if(!n)return t.default||[];let i=t[n];return i||(i=t[this.getScriptPartFromCode(n)]),i||(i=t[this.formatLanguageCode(n)]),i||(i=t[this.getLanguagePartFromCode(n)]),i||(i=t.default),i||[]}toResolveHierarchy(t,n){const i=this.getFallbackCodes(n||this.options.fallbackLng||[],t),r=[],a=o=>{o&&(this.isSupportedCode(o)?r.push(o):this.logger.warn(`rejecting language code not found in supportedLngs: ${o}`))};return typeof t=="string"&&(t.indexOf("-")>-1||t.indexOf("_")>-1)?(this.options.load!=="languageOnly"&&a(this.formatLanguageCode(t)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&a(this.getScriptPartFromCode(t)),this.options.load!=="currentOnly"&&a(this.getLanguagePartFromCode(t))):typeof t=="string"&&a(this.formatLanguageCode(t)),i.forEach(o=>{r.indexOf(o)<0&&a(this.formatLanguageCode(o))}),r}}let tg=[{lngs:["ach","ak","am","arn","br","fil","gun","ln","mfe","mg","mi","oc","pt","pt-BR","tg","tl","ti","tr","uz","wa"],nr:[1,2],fc:1},{lngs:["af","an","ast","az","bg","bn","ca","da","de","dev","el","en","eo","es","et","eu","fi","fo","fur","fy","gl","gu","ha","hi","hu","hy","ia","it","kk","kn","ku","lb","mai","ml","mn","mr","nah","nap","nb","ne","nl","nn","no","nso","pa","pap","pms","ps","pt-PT","rm","sco","se","si","so","son","sq","sv","sw","ta","te","tk","ur","yo"],nr:[1,2],fc:2},{lngs:["ay","bo","cgg","fa","ht","id","ja","jbo","ka","km","ko","ky","lo","ms","sah","su","th","tt","ug","vi","wo","zh"],nr:[1],fc:3},{lngs:["be","bs","cnr","dz","hr","ru","sr","uk"],nr:[1,2,5],fc:4},{lngs:["ar"],nr:[0,1,2,3,11,100],fc:5},{lngs:["cs","sk"],nr:[1,2,5],fc:6},{lngs:["csb","pl"],nr:[1,2,5],fc:7},{lngs:["cy"],nr:[1,2,3,8],fc:8},{lngs:["fr"],nr:[1,2],fc:9},{lngs:["ga"],nr:[1,2,3,7,11],fc:10},{lngs:["gd"],nr:[1,2,3,20],fc:11},{lngs:["is"],nr:[1,2],fc:12},{lngs:["jv"],nr:[0,1],fc:13},{lngs:["kw"],nr:[1,2,3,4],fc:14},{lngs:["lt"],nr:[1,2,10],fc:15},{lngs:["lv"],nr:[1,2,0],fc:16},{lngs:["mk"],nr:[1,2],fc:17},{lngs:["mnk"],nr:[0,1,2],fc:18},{lngs:["mt"],nr:[1,2,11,20],fc:19},{lngs:["or"],nr:[2,1],fc:2},{lngs:["ro"],nr:[1,2,20],fc:20},{lngs:["sl"],nr:[5,1,2,3],fc:21},{lngs:["he","iw"],nr:[1,2,20,21],fc:22}],ng={1:s=>+(s>1),2:s=>+(s!=1),3:s=>0,4:s=>s%10==1&&s%100!=11?0:s%10>=2&&s%10<=4&&(s%100<10||s%100>=20)?1:2,5:s=>s==0?0:s==1?1:s==2?2:s%100>=3&&s%100<=10?3:s%100>=11?4:5,6:s=>s==1?0:s>=2&&s<=4?1:2,7:s=>s==1?0:s%10>=2&&s%10<=4&&(s%100<10||s%100>=20)?1:2,8:s=>s==1?0:s==2?1:s!=8&&s!=11?2:3,9:s=>+(s>=2),10:s=>s==1?0:s==2?1:s<7?2:s<11?3:4,11:s=>s==1||s==11?0:s==2||s==12?1:s>2&&s<20?2:3,12:s=>+(s%10!=1||s%100==11),13:s=>+(s!==0),14:s=>s==1?0:s==2?1:s==3?2:3,15:s=>s%10==1&&s%100!=11?0:s%10>=2&&(s%100<10||s%100>=20)?1:2,16:s=>s%10==1&&s%100!=11?0:s!==0?1:2,17:s=>s==1||s%10==1&&s%100!=11?0:1,18:s=>s==0?0:s==1?1:2,19:s=>s==1?0:s==0||s%100>1&&s%100<11?1:s%100>10&&s%100<20?2:3,20:s=>s==1?0:s==0||s%100>0&&s%100<20?1:2,21:s=>s%100==1?1:s%100==2?2:s%100==3||s%100==4?3:0,22:s=>s==1?0:s==2?1:(s<0||s>10)&&s%10==0?2:3};const ig=["v1","v2","v3"],rg=["v4"],vd={zero:0,one:1,two:2,few:3,many:4,other:5},sg=()=>{const s={};return tg.forEach(t=>{t.lngs.forEach(n=>{s[n]={numbers:t.nr,plurals:ng[t.fc]}})}),s};class ag{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.languageUtils=t,this.options=n,this.logger=Gn.create("pluralResolver"),(!this.options.compatibilityJSON||rg.includes(this.options.compatibilityJSON))&&(typeof Intl>"u"||!Intl.PluralRules)&&(this.options.compatibilityJSON="v3",this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")),this.rules=sg(),this.pluralRulesCache={}}addRule(t,n){this.rules[t]=n}clearCache(){this.pluralRulesCache={}}getRule(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(this.shouldUseIntlApi())try{const i=zo(t==="dev"?"en":t),r=n.ordinal?"ordinal":"cardinal",a=JSON.stringify({cleanedCode:i,type:r});if(a in this.pluralRulesCache)return this.pluralRulesCache[a];const o=new Intl.PluralRules(i,{type:r});return this.pluralRulesCache[a]=o,o}catch{return}return this.rules[t]||this.rules[this.languageUtils.getLanguagePartFromCode(t)]}needsPlural(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const i=this.getRule(t,n);return this.shouldUseIntlApi()?i&&i.resolvedOptions().pluralCategories.length>1:i&&i.numbers.length>1}getPluralFormsOfKey(t,n){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this.getSuffixes(t,i).map(r=>`${n}${r}`)}getSuffixes(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const i=this.getRule(t,n);return i?this.shouldUseIntlApi()?i.resolvedOptions().pluralCategories.sort((r,a)=>vd[r]-vd[a]).map(r=>`${this.options.prepend}${n.ordinal?`ordinal${this.options.prepend}`:""}${r}`):i.numbers.map(r=>this.getSuffix(t,r,n)):[]}getSuffix(t,n){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const r=this.getRule(t,i);return r?this.shouldUseIntlApi()?`${this.options.prepend}${i.ordinal?`ordinal${this.options.prepend}`:""}${r.select(n)}`:this.getSuffixRetroCompatible(r,n):(this.logger.warn(`no plural rule found for: ${t}`),"")}getSuffixRetroCompatible(t,n){const i=t.noAbs?t.plurals(n):t.plurals(Math.abs(n));let r=t.numbers[i];this.options.simplifyPluralSuffix&&t.numbers.length===2&&t.numbers[0]===1&&(r===2?r="plural":r===1&&(r=""));const a=()=>this.options.prepend&&r.toString()?this.options.prepend+r.toString():r.toString();return this.options.compatibilityJSON==="v1"?r===1?"":typeof r=="number"?`_plural_${r.toString()}`:a():this.options.compatibilityJSON==="v2"||this.options.simplifyPluralSuffix&&t.numbers.length===2&&t.numbers[0]===1?a():this.options.prepend&&i.toString()?this.options.prepend+i.toString():i.toString()}shouldUseIntlApi(){return!ig.includes(this.options.compatibilityJSON)}}const yd=function(s,t,n){let i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:".",r=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,a=jm(s,t,n);return!a&&r&&typeof n=="string"&&(a=pc(s,n,i),a===void 0&&(a=pc(t,n,i))),a},Tl=s=>s.replace(/\$/g,"$$$$");class og{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.logger=Gn.create("interpolator"),this.options=t,this.format=t.interpolation&&t.interpolation.format||(n=>n),this.init(t)}init(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};t.interpolation||(t.interpolation={escapeValue:!0});const{escape:n,escapeValue:i,useRawValueToEscape:r,prefix:a,prefixEscaped:o,suffix:l,suffixEscaped:c,formatSeparator:u,unescapeSuffix:d,unescapePrefix:h,nestingPrefix:f,nestingPrefixEscaped:p,nestingSuffix:v,nestingSuffixEscaped:_,nestingOptionsSeparator:m,maxReplaces:g,alwaysFormat:S}=t.interpolation;this.escape=n!==void 0?n:Km,this.escapeValue=i!==void 0?i:!0,this.useRawValueToEscape=r!==void 0?r:!1,this.prefix=a?Br(a):o||"{{",this.suffix=l?Br(l):c||"}}",this.formatSeparator=u||",",this.unescapePrefix=d?"":h||"-",this.unescapeSuffix=this.unescapePrefix?"":d||"",this.nestingPrefix=f?Br(f):p||Br("$t("),this.nestingSuffix=v?Br(v):_||Br(")"),this.nestingOptionsSeparator=m||",",this.maxReplaces=g||1e3,this.alwaysFormat=S!==void 0?S:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const t=(n,i)=>n&&n.source===i?(n.lastIndex=0,n):new RegExp(i,"g");this.regexp=t(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=t(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=t(this.nestingRegexp,`${this.nestingPrefix}(.+?)${this.nestingSuffix}`)}interpolate(t,n,i,r){let a,o,l;const c=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},u=p=>{if(p.indexOf(this.formatSeparator)<0){const g=yd(n,c,p,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(g,void 0,i,{...r,...n,interpolationkey:p}):g}const v=p.split(this.formatSeparator),_=v.shift().trim(),m=v.join(this.formatSeparator).trim();return this.format(yd(n,c,_,this.options.keySeparator,this.options.ignoreJSONStructure),m,i,{...r,...n,interpolationkey:_})};this.resetRegExp();const d=r&&r.missingInterpolationHandler||this.options.missingInterpolationHandler,h=r&&r.interpolation&&r.interpolation.skipOnVariables!==void 0?r.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:p=>Tl(p)},{regex:this.regexp,safeValue:p=>this.escapeValue?Tl(this.escape(p)):Tl(p)}].forEach(p=>{for(l=0;a=p.regex.exec(t);){const v=a[1].trim();if(o=u(v),o===void 0)if(typeof d=="function"){const m=d(t,a,r);o=typeof m=="string"?m:""}else if(r&&Object.prototype.hasOwnProperty.call(r,v))o="";else if(h){o=a[0];continue}else this.logger.warn(`missed to pass in variable ${v} for interpolating ${t}`),o="";else typeof o!="string"&&!this.useRawValueToEscape&&(o=dd(o));const _=p.safeValue(o);if(t=t.replace(a[0],_),h?(p.regex.lastIndex+=o.length,p.regex.lastIndex-=a[0].length):p.regex.lastIndex=0,l++,l>=this.maxReplaces)break}}),t}nest(t,n){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r,a,o;const l=(c,u)=>{const d=this.nestingOptionsSeparator;if(c.indexOf(d)<0)return c;const h=c.split(new RegExp(`${d}[ ]*{`));let f=`{${h[1]}`;c=h[0],f=this.interpolate(f,o);const p=f.match(/'/g),v=f.match(/"/g);(p&&p.length%2===0&&!v||v.length%2!==0)&&(f=f.replace(/'/g,'"'));try{o=JSON.parse(f),u&&(o={...u,...o})}catch(_){return this.logger.warn(`failed parsing options string in nesting for key ${c}`,_),`${c}${d}${f}`}return o.defaultValue&&o.defaultValue.indexOf(this.prefix)>-1&&delete o.defaultValue,c};for(;r=this.nestingRegexp.exec(t);){let c=[];o={...i},o=o.replace&&typeof o.replace!="string"?o.replace:o,o.applyPostProcessor=!1,delete o.defaultValue;let u=!1;if(r[0].indexOf(this.formatSeparator)!==-1&&!/{.*}/.test(r[1])){const d=r[1].split(this.formatSeparator).map(h=>h.trim());r[1]=d.shift(),c=d,u=!0}if(a=n(l.call(this,r[1].trim(),o),o),a&&r[0]===t&&typeof a!="string")return a;typeof a!="string"&&(a=dd(a)),a||(this.logger.warn(`missed to resolve ${r[1]} for nesting ${t}`),a=""),u&&(a=c.reduce((d,h)=>this.format(d,h,i.lng,{...i,interpolationkey:r[1].trim()}),a.trim())),t=t.replace(r[0],a),this.regexp.lastIndex=0}return t}}const lg=s=>{let t=s.toLowerCase().trim();const n={};if(s.indexOf("(")>-1){const i=s.split("(");t=i[0].toLowerCase().trim();const r=i[1].substring(0,i[1].length-1);t==="currency"&&r.indexOf(":")<0?n.currency||(n.currency=r.trim()):t==="relativetime"&&r.indexOf(":")<0?n.range||(n.range=r.trim()):r.split(";").forEach(o=>{if(o){const[l,...c]=o.split(":"),u=c.join(":").trim().replace(/^'+|'+$/g,""),d=l.trim();n[d]||(n[d]=u),u==="false"&&(n[d]=!1),u==="true"&&(n[d]=!0),isNaN(u)||(n[d]=parseInt(u,10))}})}return{formatName:t,formatOptions:n}},kr=s=>{const t={};return(n,i,r)=>{let a=r;r&&r.interpolationkey&&r.formatParams&&r.formatParams[r.interpolationkey]&&r[r.interpolationkey]&&(a={...a,[r.interpolationkey]:void 0});const o=i+JSON.stringify(a);let l=t[o];return l||(l=s(zo(i),r),t[o]=l),l(n)}};class cg{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.logger=Gn.create("formatter"),this.options=t,this.formats={number:kr((n,i)=>{const r=new Intl.NumberFormat(n,{...i});return a=>r.format(a)}),currency:kr((n,i)=>{const r=new Intl.NumberFormat(n,{...i,style:"currency"});return a=>r.format(a)}),datetime:kr((n,i)=>{const r=new Intl.DateTimeFormat(n,{...i});return a=>r.format(a)}),relativetime:kr((n,i)=>{const r=new Intl.RelativeTimeFormat(n,{...i});return a=>r.format(a,i.range||"day")}),list:kr((n,i)=>{const r=new Intl.ListFormat(n,{...i});return a=>r.format(a)})},this.init(t)}init(t){const i=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}}).interpolation;this.formatSeparator=i.formatSeparator?i.formatSeparator:i.formatSeparator||","}add(t,n){this.formats[t.toLowerCase().trim()]=n}addCached(t,n){this.formats[t.toLowerCase().trim()]=kr(n)}format(t,n,i){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const a=n.split(this.formatSeparator);if(a.length>1&&a[0].indexOf("(")>1&&a[0].indexOf(")")<0&&a.find(l=>l.indexOf(")")>-1)){const l=a.findIndex(c=>c.indexOf(")")>-1);a[0]=[a[0],...a.splice(1,l)].join(this.formatSeparator)}return a.reduce((l,c)=>{const{formatName:u,formatOptions:d}=lg(c);if(this.formats[u]){let h=l;try{const f=r&&r.formatParams&&r.formatParams[r.interpolationkey]||{},p=f.locale||f.lng||r.locale||r.lng||i;h=this.formats[u](l,p,{...d,...r,...f})}catch(f){this.logger.warn(f)}return h}else this.logger.warn(`there was no format function for ${u}`);return l},t)}}const ug=(s,t)=>{s.pending[t]!==void 0&&(delete s.pending[t],s.pendingCount--)};class dg extends al{constructor(t,n,i){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};super(),this.backend=t,this.store=n,this.services=i,this.languageUtils=i.languageUtils,this.options=r,this.logger=Gn.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=r.maxParallelReads||10,this.readingCalls=0,this.maxRetries=r.maxRetries>=0?r.maxRetries:5,this.retryTimeout=r.retryTimeout>=1?r.retryTimeout:350,this.state={},this.queue=[],this.backend&&this.backend.init&&this.backend.init(i,r.backend,r)}queueLoad(t,n,i,r){const a={},o={},l={},c={};return t.forEach(u=>{let d=!0;n.forEach(h=>{const f=`${u}|${h}`;!i.reload&&this.store.hasResourceBundle(u,h)?this.state[f]=2:this.state[f]<0||(this.state[f]===1?o[f]===void 0&&(o[f]=!0):(this.state[f]=1,d=!1,o[f]===void 0&&(o[f]=!0),a[f]===void 0&&(a[f]=!0),c[h]===void 0&&(c[h]=!0)))}),d||(l[u]=!0)}),(Object.keys(a).length||Object.keys(o).length)&&this.queue.push({pending:o,pendingCount:Object.keys(o).length,loaded:{},errors:[],callback:r}),{toLoad:Object.keys(a),pending:Object.keys(o),toLoadLanguages:Object.keys(l),toLoadNamespaces:Object.keys(c)}}loaded(t,n,i){const r=t.split("|"),a=r[0],o=r[1];n&&this.emit("failedLoading",a,o,n),!n&&i&&this.store.addResourceBundle(a,o,i,void 0,void 0,{skipCopy:!0}),this.state[t]=n?-1:2,n&&i&&(this.state[t]=0);const l={};this.queue.forEach(c=>{qm(c.loaded,[a],o),ug(c,t),n&&c.errors.push(n),c.pendingCount===0&&!c.done&&(Object.keys(c.loaded).forEach(u=>{l[u]||(l[u]={});const d=c.loaded[u];d.length&&d.forEach(h=>{l[u][h]===void 0&&(l[u][h]=!0)})}),c.done=!0,c.errors.length?c.callback(c.errors):c.callback())}),this.emit("loaded",l),this.queue=this.queue.filter(c=>!c.done)}read(t,n,i){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0,a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:this.retryTimeout,o=arguments.length>5?arguments[5]:void 0;if(!t.length)return o(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:t,ns:n,fcName:i,tried:r,wait:a,callback:o});return}this.readingCalls++;const l=(u,d)=>{if(this.readingCalls--,this.waitingReads.length>0){const h=this.waitingReads.shift();this.read(h.lng,h.ns,h.fcName,h.tried,h.wait,h.callback)}if(u&&d&&r<this.maxRetries){setTimeout(()=>{this.read.call(this,t,n,i,r+1,a*2,o)},a);return}o(u,d)},c=this.backend[i].bind(this.backend);if(c.length===2){try{const u=c(t,n);u&&typeof u.then=="function"?u.then(d=>l(null,d)).catch(l):l(null,u)}catch(u){l(u)}return}return c(t,n,l)}prepareLoading(t,n){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=arguments.length>3?arguments[3]:void 0;if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),r&&r();typeof t=="string"&&(t=this.languageUtils.toResolveHierarchy(t)),typeof n=="string"&&(n=[n]);const a=this.queueLoad(t,n,i,r);if(!a.toLoad.length)return a.pending.length||r(),null;a.toLoad.forEach(o=>{this.loadOne(o)})}load(t,n,i){this.prepareLoading(t,n,{},i)}reload(t,n,i){this.prepareLoading(t,n,{reload:!0},i)}loadOne(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";const i=t.split("|"),r=i[0],a=i[1];this.read(r,a,"read",void 0,void 0,(o,l)=>{o&&this.logger.warn(`${n}loading namespace ${a} for language ${r} failed`,o),!o&&l&&this.logger.log(`${n}loaded namespace ${a} for language ${r}`,l),this.loaded(t,o,l)})}saveMissing(t,n,i,r,a){let o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{},l=arguments.length>6&&arguments[6]!==void 0?arguments[6]:()=>{};if(this.services.utils&&this.services.utils.hasLoadedNamespace&&!this.services.utils.hasLoadedNamespace(n)){this.logger.warn(`did not save key "${i}" as the namespace "${n}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(i==null||i==="")){if(this.backend&&this.backend.create){const c={...o,isUpdate:a},u=this.backend.create.bind(this.backend);if(u.length<6)try{let d;u.length===5?d=u(t,n,i,r,c):d=u(t,n,i,r),d&&typeof d.then=="function"?d.then(h=>l(null,h)).catch(l):l(null,d)}catch(d){l(d)}else u(t,n,i,r,l,c)}!t||!t[0]||this.store.addResource(t[0],n,i,r)}}}const xd=()=>({debug:!1,initImmediate:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,simplifyPluralSuffix:!0,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:s=>{let t={};if(typeof s[1]=="object"&&(t=s[1]),typeof s[1]=="string"&&(t.defaultValue=s[1]),typeof s[2]=="string"&&(t.tDescription=s[2]),typeof s[2]=="object"||typeof s[3]=="object"){const n=s[3]||s[2];Object.keys(n).forEach(i=>{t[i]=n[i]})}return t},interpolation:{escapeValue:!0,format:s=>s,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0}}),bd=s=>(typeof s.ns=="string"&&(s.ns=[s.ns]),typeof s.fallbackLng=="string"&&(s.fallbackLng=[s.fallbackLng]),typeof s.fallbackNS=="string"&&(s.fallbackNS=[s.fallbackNS]),s.supportedLngs&&s.supportedLngs.indexOf("cimode")<0&&(s.supportedLngs=s.supportedLngs.concat(["cimode"])),s),za=()=>{},fg=s=>{Object.getOwnPropertyNames(Object.getPrototypeOf(s)).forEach(n=>{typeof s[n]=="function"&&(s[n]=s[n].bind(s))})};class sa extends al{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;if(super(),this.options=bd(t),this.services={},this.logger=Gn,this.modules={external:[]},fg(this),n&&!this.isInitialized&&!t.isClone){if(!this.options.initImmediate)return this.init(t,n),this;setTimeout(()=>{this.init(t,n)},0)}}init(){var t=this;let n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},i=arguments.length>1?arguments[1]:void 0;this.isInitializing=!0,typeof n=="function"&&(i=n,n={}),!n.defaultNS&&n.defaultNS!==!1&&n.ns&&(typeof n.ns=="string"?n.defaultNS=n.ns:n.ns.indexOf("translation")<0&&(n.defaultNS=n.ns[0]));const r=xd();this.options={...r,...this.options,...bd(n)},this.options.compatibilityAPI!=="v1"&&(this.options.interpolation={...r.interpolation,...this.options.interpolation}),n.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=n.keySeparator),n.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=n.nsSeparator);const a=d=>d?typeof d=="function"?new d:d:null;if(!this.options.isClone){this.modules.logger?Gn.init(a(this.modules.logger),this.options):Gn.init(null,this.options);let d;this.modules.formatter?d=this.modules.formatter:typeof Intl<"u"&&(d=cg);const h=new _d(this.options);this.store=new md(this.options.resources,this.options);const f=this.services;f.logger=Gn,f.resourceStore=this.store,f.languageUtils=h,f.pluralResolver=new ag(h,{prepend:this.options.pluralSeparator,compatibilityJSON:this.options.compatibilityJSON,simplifyPluralSuffix:this.options.simplifyPluralSuffix}),d&&(!this.options.interpolation.format||this.options.interpolation.format===r.interpolation.format)&&(f.formatter=a(d),f.formatter.init(f,this.options),this.options.interpolation.format=f.formatter.format.bind(f.formatter)),f.interpolator=new og(this.options),f.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},f.backendConnector=new dg(a(this.modules.backend),f.resourceStore,f,this.options),f.backendConnector.on("*",function(p){for(var v=arguments.length,_=new Array(v>1?v-1:0),m=1;m<v;m++)_[m-1]=arguments[m];t.emit(p,..._)}),this.modules.languageDetector&&(f.languageDetector=a(this.modules.languageDetector),f.languageDetector.init&&f.languageDetector.init(f,this.options.detection,this.options)),this.modules.i18nFormat&&(f.i18nFormat=a(this.modules.i18nFormat),f.i18nFormat.init&&f.i18nFormat.init(this)),this.translator=new Ho(this.services,this.options),this.translator.on("*",function(p){for(var v=arguments.length,_=new Array(v>1?v-1:0),m=1;m<v;m++)_[m-1]=arguments[m];t.emit(p,..._)}),this.modules.external.forEach(p=>{p.init&&p.init(this)})}if(this.format=this.options.interpolation.format,i||(i=za),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const d=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);d.length>0&&d[0]!=="dev"&&(this.options.lng=d[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(d=>{this[d]=function(){return t.store[d](...arguments)}}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(d=>{this[d]=function(){return t.store[d](...arguments),t}});const c=Bs(),u=()=>{const d=(h,f)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),c.resolve(f),i(h,f)};if(this.languages&&this.options.compatibilityAPI!=="v1"&&!this.isInitialized)return d(null,this.t.bind(this));this.changeLanguage(this.options.lng,d)};return this.options.resources||!this.options.initImmediate?u():setTimeout(u,0),c}loadResources(t){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:za;const r=typeof t=="string"?t:this.language;if(typeof t=="function"&&(i=t),!this.options.resources||this.options.partialBundledLanguages){if(r&&r.toLowerCase()==="cimode"&&(!this.options.preload||this.options.preload.length===0))return i();const a=[],o=l=>{if(!l||l==="cimode")return;this.services.languageUtils.toResolveHierarchy(l).forEach(u=>{u!=="cimode"&&a.indexOf(u)<0&&a.push(u)})};r?o(r):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(c=>o(c)),this.options.preload&&this.options.preload.forEach(l=>o(l)),this.services.backendConnector.load(a,this.options.ns,l=>{!l&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),i(l)})}else i(null)}reloadResources(t,n,i){const r=Bs();return typeof t=="function"&&(i=t,t=void 0),typeof n=="function"&&(i=n,n=void 0),t||(t=this.languages),n||(n=this.options.ns),i||(i=za),this.services.backendConnector.reload(t,n,a=>{r.resolve(),i(a)}),r}use(t){if(!t)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!t.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return t.type==="backend"&&(this.modules.backend=t),(t.type==="logger"||t.log&&t.warn&&t.error)&&(this.modules.logger=t),t.type==="languageDetector"&&(this.modules.languageDetector=t),t.type==="i18nFormat"&&(this.modules.i18nFormat=t),t.type==="postProcessor"&&uh.addPostProcessor(t),t.type==="formatter"&&(this.modules.formatter=t),t.type==="3rdParty"&&this.modules.external.push(t),this}setResolvedLanguage(t){if(!(!t||!this.languages)&&!(["cimode","dev"].indexOf(t)>-1))for(let n=0;n<this.languages.length;n++){const i=this.languages[n];if(!(["cimode","dev"].indexOf(i)>-1)&&this.store.hasLanguageSomeTranslations(i)){this.resolvedLanguage=i;break}}}changeLanguage(t,n){var i=this;this.isLanguageChangingTo=t;const r=Bs();this.emit("languageChanging",t);const a=c=>{this.language=c,this.languages=this.services.languageUtils.toResolveHierarchy(c),this.resolvedLanguage=void 0,this.setResolvedLanguage(c)},o=(c,u)=>{u?(a(u),this.translator.changeLanguage(u),this.isLanguageChangingTo=void 0,this.emit("languageChanged",u),this.logger.log("languageChanged",u)):this.isLanguageChangingTo=void 0,r.resolve(function(){return i.t(...arguments)}),n&&n(c,function(){return i.t(...arguments)})},l=c=>{!t&&!c&&this.services.languageDetector&&(c=[]);const u=typeof c=="string"?c:this.services.languageUtils.getBestMatchFromCodes(c);u&&(this.language||a(u),this.translator.language||this.translator.changeLanguage(u),this.services.languageDetector&&this.services.languageDetector.cacheUserLanguage&&this.services.languageDetector.cacheUserLanguage(u)),this.loadResources(u,d=>{o(d,u)})};return!t&&this.services.languageDetector&&!this.services.languageDetector.async?l(this.services.languageDetector.detect()):!t&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(l):this.services.languageDetector.detect(l):l(t),r}getFixedT(t,n,i){var r=this;const a=function(o,l){let c;if(typeof l!="object"){for(var u=arguments.length,d=new Array(u>2?u-2:0),h=2;h<u;h++)d[h-2]=arguments[h];c=r.options.overloadTranslationOptionHandler([o,l].concat(d))}else c={...l};c.lng=c.lng||a.lng,c.lngs=c.lngs||a.lngs,c.ns=c.ns||a.ns,c.keyPrefix!==""&&(c.keyPrefix=c.keyPrefix||i||a.keyPrefix);const f=r.options.keySeparator||".";let p;return c.keyPrefix&&Array.isArray(o)?p=o.map(v=>`${c.keyPrefix}${f}${v}`):p=c.keyPrefix?`${c.keyPrefix}${f}${o}`:o,r.t(p,c)};return typeof t=="string"?a.lng=t:a.lngs=t,a.ns=n,a.keyPrefix=i,a}t(){return this.translator&&this.translator.translate(...arguments)}exists(){return this.translator&&this.translator.exists(...arguments)}setDefaultNamespace(t){this.options.defaultNS=t}hasLoadedNamespace(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const i=n.lng||this.resolvedLanguage||this.languages[0],r=this.options?this.options.fallbackLng:!1,a=this.languages[this.languages.length-1];if(i.toLowerCase()==="cimode")return!0;const o=(l,c)=>{const u=this.services.backendConnector.state[`${l}|${c}`];return u===-1||u===0||u===2};if(n.precheck){const l=n.precheck(this,o);if(l!==void 0)return l}return!!(this.hasResourceBundle(i,t)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||o(i,t)&&(!r||o(a,t)))}loadNamespaces(t,n){const i=Bs();return this.options.ns?(typeof t=="string"&&(t=[t]),t.forEach(r=>{this.options.ns.indexOf(r)<0&&this.options.ns.push(r)}),this.loadResources(r=>{i.resolve(),n&&n(r)}),i):(n&&n(),Promise.resolve())}loadLanguages(t,n){const i=Bs();typeof t=="string"&&(t=[t]);const r=this.options.preload||[],a=t.filter(o=>r.indexOf(o)<0&&this.services.languageUtils.isSupportedCode(o));return a.length?(this.options.preload=r.concat(a),this.loadResources(o=>{i.resolve(),n&&n(o)}),i):(n&&n(),Promise.resolve())}dir(t){if(t||(t=this.resolvedLanguage||(this.languages&&this.languages.length>0?this.languages[0]:this.language)),!t)return"rtl";const n=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],i=this.services&&this.services.languageUtils||new _d(xd());return n.indexOf(i.getLanguagePartFromCode(t))>-1||t.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;return new sa(t,n)}cloneInstance(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:za;const i=t.forkResourceStore;i&&delete t.forkResourceStore;const r={...this.options,...t,isClone:!0},a=new sa(r);return(t.debug!==void 0||t.prefix!==void 0)&&(a.logger=a.logger.clone(t)),["store","services","language"].forEach(l=>{a[l]=this[l]}),a.services={...this.services},a.services.utils={hasLoadedNamespace:a.hasLoadedNamespace.bind(a)},i&&(a.store=new md(this.store.data,r),a.services.resourceStore=a.store),a.translator=new Ho(a.services,r),a.translator.on("*",function(l){for(var c=arguments.length,u=new Array(c>1?c-1:0),d=1;d<c;d++)u[d-1]=arguments[d];a.emit(l,...u)}),a.init(r,n),a.translator.options=r,a.translator.backendConnector.services.utils={hasLoadedNamespace:a.hasLoadedNamespace.bind(a)},a}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const pt=sa.createInstance();pt.createInstance=sa.createInstance;pt.createInstance;pt.dir;pt.init;pt.loadResources;pt.reloadResources;pt.use;pt.changeLanguage;pt.getFixedT;pt.t;pt.exists;pt.setDefaultNamespace;pt.hasLoadedNamespace;pt.loadNamespaces;pt.loadLanguages;function mc(s){"@babel/helpers - typeof";return mc=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},mc(s)}function dh(){return typeof XMLHttpRequest=="function"||(typeof XMLHttpRequest>"u"?"undefined":mc(XMLHttpRequest))==="object"}function hg(s){return!!s&&typeof s.then=="function"}function pg(s){return hg(s)?s:Promise.resolve(s)}var Ks=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function mg(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}function gg(s){throw new Error('Could not dynamically require "'+s+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var gc={exports:{}},Ha={exports:{}},Sd;function _g(){return Sd||(Sd=1,function(s,t){var n=typeof globalThis<"u"&&globalThis||typeof self<"u"&&self||typeof Ks<"u"&&Ks,i=function(){function a(){this.fetch=!1,this.DOMException=n.DOMException}return a.prototype=n,new a}();(function(a){(function(o){var l=typeof a<"u"&&a||typeof self<"u"&&self||typeof l<"u"&&l,c={searchParams:"URLSearchParams"in l,iterable:"Symbol"in l&&"iterator"in Symbol,blob:"FileReader"in l&&"Blob"in l&&function(){try{return new Blob,!0}catch{return!1}}(),formData:"FormData"in l,arrayBuffer:"ArrayBuffer"in l};function u(L){return L&&DataView.prototype.isPrototypeOf(L)}if(c.arrayBuffer)var d=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],h=ArrayBuffer.isView||function(L){return L&&d.indexOf(Object.prototype.toString.call(L))>-1};function f(L){if(typeof L!="string"&&(L=String(L)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(L)||L==="")throw new TypeError('Invalid character in header field name: "'+L+'"');return L.toLowerCase()}function p(L){return typeof L!="string"&&(L=String(L)),L}function v(L){var N={next:function(){var k=L.shift();return{done:k===void 0,value:k}}};return c.iterable&&(N[Symbol.iterator]=function(){return N}),N}function _(L){this.map={},L instanceof _?L.forEach(function(N,k){this.append(k,N)},this):Array.isArray(L)?L.forEach(function(N){this.append(N[0],N[1])},this):L&&Object.getOwnPropertyNames(L).forEach(function(N){this.append(N,L[N])},this)}_.prototype.append=function(L,N){L=f(L),N=p(N);var k=this.map[L];this.map[L]=k?k+", "+N:N},_.prototype.delete=function(L){delete this.map[f(L)]},_.prototype.get=function(L){return L=f(L),this.has(L)?this.map[L]:null},_.prototype.has=function(L){return this.map.hasOwnProperty(f(L))},_.prototype.set=function(L,N){this.map[f(L)]=p(N)},_.prototype.forEach=function(L,N){for(var k in this.map)this.map.hasOwnProperty(k)&&L.call(N,this.map[k],k,this)},_.prototype.keys=function(){var L=[];return this.forEach(function(N,k){L.push(k)}),v(L)},_.prototype.values=function(){var L=[];return this.forEach(function(N){L.push(N)}),v(L)},_.prototype.entries=function(){var L=[];return this.forEach(function(N,k){L.push([k,N])}),v(L)},c.iterable&&(_.prototype[Symbol.iterator]=_.prototype.entries);function m(L){if(L.bodyUsed)return Promise.reject(new TypeError("Already read"));L.bodyUsed=!0}function g(L){return new Promise(function(N,k){L.onload=function(){N(L.result)},L.onerror=function(){k(L.error)}})}function S(L){var N=new FileReader,k=g(N);return N.readAsArrayBuffer(L),k}function y(L){var N=new FileReader,k=g(N);return N.readAsText(L),k}function x(L){for(var N=new Uint8Array(L),k=new Array(N.length),F=0;F<N.length;F++)k[F]=String.fromCharCode(N[F]);return k.join("")}function R(L){if(L.slice)return L.slice(0);var N=new Uint8Array(L.byteLength);return N.set(new Uint8Array(L)),N.buffer}function A(){return this.bodyUsed=!1,this._initBody=function(L){this.bodyUsed=this.bodyUsed,this._bodyInit=L,L?typeof L=="string"?this._bodyText=L:c.blob&&Blob.prototype.isPrototypeOf(L)?this._bodyBlob=L:c.formData&&FormData.prototype.isPrototypeOf(L)?this._bodyFormData=L:c.searchParams&&URLSearchParams.prototype.isPrototypeOf(L)?this._bodyText=L.toString():c.arrayBuffer&&c.blob&&u(L)?(this._bodyArrayBuffer=R(L.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):c.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(L)||h(L))?this._bodyArrayBuffer=R(L):this._bodyText=L=Object.prototype.toString.call(L):this._bodyText="",this.headers.get("content-type")||(typeof L=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):c.searchParams&&URLSearchParams.prototype.isPrototypeOf(L)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},c.blob&&(this.blob=function(){var L=m(this);if(L)return L;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){if(this._bodyArrayBuffer){var L=m(this);return L||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}else return this.blob().then(S)}),this.text=function(){var L=m(this);if(L)return L;if(this._bodyBlob)return y(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(x(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},c.formData&&(this.formData=function(){return this.text().then(E)}),this.json=function(){return this.text().then(JSON.parse)},this}var w=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function I(L){var N=L.toUpperCase();return w.indexOf(N)>-1?N:L}function M(L,N){if(!(this instanceof M))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');N=N||{};var k=N.body;if(L instanceof M){if(L.bodyUsed)throw new TypeError("Already read");this.url=L.url,this.credentials=L.credentials,N.headers||(this.headers=new _(L.headers)),this.method=L.method,this.mode=L.mode,this.signal=L.signal,!k&&L._bodyInit!=null&&(k=L._bodyInit,L.bodyUsed=!0)}else this.url=String(L);if(this.credentials=N.credentials||this.credentials||"same-origin",(N.headers||!this.headers)&&(this.headers=new _(N.headers)),this.method=I(N.method||this.method||"GET"),this.mode=N.mode||this.mode||null,this.signal=N.signal||this.signal,this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&k)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(k),(this.method==="GET"||this.method==="HEAD")&&(N.cache==="no-store"||N.cache==="no-cache")){var F=/([?&])_=[^&]*/;if(F.test(this.url))this.url=this.url.replace(F,"$1_="+new Date().getTime());else{var ne=/\?/;this.url+=(ne.test(this.url)?"&":"?")+"_="+new Date().getTime()}}}M.prototype.clone=function(){return new M(this,{body:this._bodyInit})};function E(L){var N=new FormData;return L.trim().split("&").forEach(function(k){if(k){var F=k.split("="),ne=F.shift().replace(/\+/g," "),te=F.join("=").replace(/\+/g," ");N.append(decodeURIComponent(ne),decodeURIComponent(te))}}),N}function O(L){var N=new _,k=L.replace(/\r?\n[\t ]+/g," ");return k.split("\r").map(function(F){return F.indexOf(`
`)===0?F.substr(1,F.length):F}).forEach(function(F){var ne=F.split(":"),te=ne.shift().trim();if(te){var de=ne.join(":").trim();N.append(te,de)}}),N}A.call(M.prototype);function G(L,N){if(!(this instanceof G))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');N||(N={}),this.type="default",this.status=N.status===void 0?200:N.status,this.ok=this.status>=200&&this.status<300,this.statusText=N.statusText===void 0?"":""+N.statusText,this.headers=new _(N.headers),this.url=N.url||"",this._initBody(L)}A.call(G.prototype),G.prototype.clone=function(){return new G(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new _(this.headers),url:this.url})},G.error=function(){var L=new G(null,{status:0,statusText:""});return L.type="error",L};var z=[301,302,303,307,308];G.redirect=function(L,N){if(z.indexOf(N)===-1)throw new RangeError("Invalid status code");return new G(null,{status:N,headers:{location:L}})},o.DOMException=l.DOMException;try{new o.DOMException}catch{o.DOMException=function(N,k){this.message=N,this.name=k;var F=Error(N);this.stack=F.stack},o.DOMException.prototype=Object.create(Error.prototype),o.DOMException.prototype.constructor=o.DOMException}function Y(L,N){return new Promise(function(k,F){var ne=new M(L,N);if(ne.signal&&ne.signal.aborted)return F(new o.DOMException("Aborted","AbortError"));var te=new XMLHttpRequest;function de(){te.abort()}te.onload=function(){var Ne={status:te.status,statusText:te.statusText,headers:O(te.getAllResponseHeaders()||"")};Ne.url="responseURL"in te?te.responseURL:Ne.headers.get("X-Request-URL");var J="response"in te?te.response:te.responseText;setTimeout(function(){k(new G(J,Ne))},0)},te.onerror=function(){setTimeout(function(){F(new TypeError("Network request failed"))},0)},te.ontimeout=function(){setTimeout(function(){F(new TypeError("Network request failed"))},0)},te.onabort=function(){setTimeout(function(){F(new o.DOMException("Aborted","AbortError"))},0)};function Oe(Ne){try{return Ne===""&&l.location.href?l.location.href:Ne}catch{return Ne}}te.open(ne.method,Oe(ne.url),!0),ne.credentials==="include"?te.withCredentials=!0:ne.credentials==="omit"&&(te.withCredentials=!1),"responseType"in te&&(c.blob?te.responseType="blob":c.arrayBuffer&&ne.headers.get("Content-Type")&&ne.headers.get("Content-Type").indexOf("application/octet-stream")!==-1&&(te.responseType="arraybuffer")),N&&typeof N.headers=="object"&&!(N.headers instanceof _)?Object.getOwnPropertyNames(N.headers).forEach(function(Ne){te.setRequestHeader(Ne,p(N.headers[Ne]))}):ne.headers.forEach(function(Ne,J){te.setRequestHeader(J,Ne)}),ne.signal&&(ne.signal.addEventListener("abort",de),te.onreadystatechange=function(){te.readyState===4&&ne.signal.removeEventListener("abort",de)}),te.send(typeof ne._bodyInit>"u"?null:ne._bodyInit)})}return Y.polyfill=!0,l.fetch||(l.fetch=Y,l.Headers=_,l.Request=M,l.Response=G),o.Headers=_,o.Request=M,o.Response=G,o.fetch=Y,o})({})})(i),i.fetch.ponyfill=!0,delete i.fetch.polyfill;var r=n.fetch?n:i;t=r.fetch,t.default=r.fetch,t.fetch=r.fetch,t.Headers=r.Headers,t.Request=r.Request,t.Response=r.Response,s.exports=t}(Ha,Ha.exports)),Ha.exports}(function(s,t){var n;if(typeof fetch=="function"&&(typeof Ks<"u"&&Ks.fetch?n=Ks.fetch:typeof window<"u"&&window.fetch?n=window.fetch:n=fetch),typeof gg<"u"&&typeof window>"u"){var i=n||_g();i.default&&(i=i.default),t.default=i,s.exports=t.default}})(gc,gc.exports);var fh=gc.exports;const hh=mg(fh),Md=Gm({__proto__:null,default:hh},[fh]);function Ed(s,t){var n=Object.keys(s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(s);t&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(s,r).enumerable})),n.push.apply(n,i)}return n}function Td(s){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Ed(Object(n),!0).forEach(function(i){vg(s,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(n)):Ed(Object(n)).forEach(function(i){Object.defineProperty(s,i,Object.getOwnPropertyDescriptor(n,i))})}return s}function vg(s,t,n){return(t=yg(t))in s?Object.defineProperty(s,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):s[t]=n,s}function yg(s){var t=xg(s,"string");return Tr(t)=="symbol"?t:t+""}function xg(s,t){if(Tr(s)!="object"||!s)return s;var n=s[Symbol.toPrimitive];if(n!==void 0){var i=n.call(s,t||"default");if(Tr(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(s)}function Tr(s){"@babel/helpers - typeof";return Tr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Tr(s)}var hi;typeof fetch=="function"&&(typeof global<"u"&&global.fetch?hi=global.fetch:typeof window<"u"&&window.fetch?hi=window.fetch:hi=fetch);var aa;dh()&&(typeof global<"u"&&global.XMLHttpRequest?aa=global.XMLHttpRequest:typeof window<"u"&&window.XMLHttpRequest&&(aa=window.XMLHttpRequest));var Vo;typeof ActiveXObject=="function"&&(typeof global<"u"&&global.ActiveXObject?Vo=global.ActiveXObject:typeof window<"u"&&window.ActiveXObject&&(Vo=window.ActiveXObject));!hi&&Md&&!aa&&!Vo&&(hi=hh||Md);typeof hi!="function"&&(hi=void 0);var _c=function(t,n){if(n&&Tr(n)==="object"){var i="";for(var r in n)i+="&"+encodeURIComponent(r)+"="+encodeURIComponent(n[r]);if(!i)return t;t=t+(t.indexOf("?")!==-1?"&":"?")+i.slice(1)}return t},wd=function(t,n,i,r){var a=function(c){if(!c.ok)return i(c.statusText||"Error",{status:c.status});c.text().then(function(u){i(null,{status:c.status,data:u})}).catch(i)};if(r){var o=r(t,n);if(o instanceof Promise){o.then(a).catch(i);return}}typeof fetch=="function"?fetch(t,n).then(a).catch(i):hi(t,n).then(a).catch(i)},Ad=!1,bg=function(t,n,i,r){t.queryStringParams&&(n=_c(n,t.queryStringParams));var a=Td({},typeof t.customHeaders=="function"?t.customHeaders():t.customHeaders);typeof window>"u"&&typeof global<"u"&&typeof global.process<"u"&&global.process.versions&&global.process.versions.node&&(a["User-Agent"]="i18next-http-backend (node/".concat(global.process.version,"; ").concat(global.process.platform," ").concat(global.process.arch,")")),i&&(a["Content-Type"]="application/json");var o=typeof t.requestOptions=="function"?t.requestOptions(i):t.requestOptions,l=Td({method:i?"POST":"GET",body:i?t.stringify(i):void 0,headers:a},Ad?{}:o),c=typeof t.alternateFetch=="function"&&t.alternateFetch.length>=1?t.alternateFetch:void 0;try{wd(n,l,r,c)}catch(u){if(!o||Object.keys(o).length===0||!u.message||u.message.indexOf("not implemented")<0)return r(u);try{Object.keys(o).forEach(function(d){delete l[d]}),wd(n,l,r,c),Ad=!0}catch(d){r(d)}}},Sg=function(t,n,i,r){i&&Tr(i)==="object"&&(i=_c("",i).slice(1)),t.queryStringParams&&(n=_c(n,t.queryStringParams));try{var a;aa?a=new aa:a=new Vo("MSXML2.XMLHTTP.3.0"),a.open(i?"POST":"GET",n,1),t.crossDomain||a.setRequestHeader("X-Requested-With","XMLHttpRequest"),a.withCredentials=!!t.withCredentials,i&&a.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),a.overrideMimeType&&a.overrideMimeType("application/json");var o=t.customHeaders;if(o=typeof o=="function"?o():o,o)for(var l in o)a.setRequestHeader(l,o[l]);a.onreadystatechange=function(){a.readyState>3&&r(a.status>=400?a.statusText:null,{status:a.status,data:a.responseText})},a.send(i)}catch(c){console&&console.log(c)}},Mg=function(t,n,i,r){if(typeof i=="function"&&(r=i,i=void 0),r=r||function(){},hi&&n.indexOf("file:")!==0)return bg(t,n,i,r);if(dh()||typeof ActiveXObject=="function")return Sg(t,n,i,r);r(new Error("No fetch and no xhr implementation found!"))};function Ms(s){"@babel/helpers - typeof";return Ms=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ms(s)}function Cd(s,t){var n=Object.keys(s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(s);t&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(s,r).enumerable})),n.push.apply(n,i)}return n}function wl(s){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Cd(Object(n),!0).forEach(function(i){ph(s,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(n)):Cd(Object(n)).forEach(function(i){Object.defineProperty(s,i,Object.getOwnPropertyDescriptor(n,i))})}return s}function Eg(s,t){if(!(s instanceof t))throw new TypeError("Cannot call a class as a function")}function Tg(s,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(s,mh(i.key),i)}}function wg(s,t,n){return t&&Tg(s.prototype,t),Object.defineProperty(s,"prototype",{writable:!1}),s}function ph(s,t,n){return(t=mh(t))in s?Object.defineProperty(s,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):s[t]=n,s}function mh(s){var t=Ag(s,"string");return Ms(t)=="symbol"?t:t+""}function Ag(s,t){if(Ms(s)!="object"||!s)return s;var n=s[Symbol.toPrimitive];if(n!==void 0){var i=n.call(s,t||"default");if(Ms(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(s)}var Cg=function(){return{loadPath:"/locales/{{lng}}/{{ns}}.json",addPath:"/locales/add/{{lng}}/{{ns}}",parse:function(n){return JSON.parse(n)},stringify:JSON.stringify,parsePayload:function(n,i,r){return ph({},i,r||"")},parseLoadPayload:function(n,i){},request:Mg,reloadInterval:typeof window<"u"?!1:60*60*1e3,customHeaders:{},queryStringParams:{},crossDomain:!1,withCredentials:!1,overrideMimeType:!1,requestOptions:{mode:"cors",credentials:"same-origin",cache:"default"}}},gh=function(){function s(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};Eg(this,s),this.services=t,this.options=n,this.allOptions=i,this.type="backend",this.init(t,n,i)}return wg(s,[{key:"init",value:function(n){var i=this,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(this.services=n,this.options=wl(wl(wl({},Cg()),this.options||{}),r),this.allOptions=a,this.services&&this.options.reloadInterval){var o=setInterval(function(){return i.reload()},this.options.reloadInterval);Ms(o)==="object"&&typeof o.unref=="function"&&o.unref()}}},{key:"readMulti",value:function(n,i,r){this._readAny(n,n,i,i,r)}},{key:"read",value:function(n,i,r){this._readAny([n],n,[i],i,r)}},{key:"_readAny",value:function(n,i,r,a,o){var l=this,c=this.options.loadPath;typeof this.options.loadPath=="function"&&(c=this.options.loadPath(n,r)),c=pg(c),c.then(function(u){if(!u)return o(null,{});var d=l.services.interpolator.interpolate(u,{lng:n.join("+"),ns:r.join("+")});l.loadUrl(d,o,i,a)})}},{key:"loadUrl",value:function(n,i,r,a){var o=this,l=typeof r=="string"?[r]:r,c=typeof a=="string"?[a]:a,u=this.options.parseLoadPayload(l,c);this.options.request(this.options,n,u,function(d,h){if(h&&(h.status>=500&&h.status<600||!h.status))return i("failed loading "+n+"; status code: "+h.status,!0);if(h&&h.status>=400&&h.status<500)return i("failed loading "+n+"; status code: "+h.status,!1);if(!h&&d&&d.message&&d.message.toLowerCase().indexOf("failed")>-1&&(d.message.indexOf("fetch")>-1||d.message.toLowerCase().indexOf("network")>-1))return i("failed loading "+n+": "+d.message,!0);if(d)return i(d,!1);var f,p;try{typeof h.data=="string"?f=o.options.parse(h.data,r,a):f=h.data}catch{p="failed parsing "+n+" to json"}if(p)return i(p,!1);i(null,f)})}},{key:"create",value:function(n,i,r,a,o){var l=this;if(this.options.addPath){typeof n=="string"&&(n=[n]);var c=this.options.parsePayload(i,r,a),u=0,d=[],h=[];n.forEach(function(f){var p=l.options.addPath;typeof l.options.addPath=="function"&&(p=l.options.addPath(f,i));var v=l.services.interpolator.interpolate(p,{lng:f,ns:i});l.options.request(l.options,v,c,function(_,m){u+=1,d.push(_),h.push(m),u===n.length&&typeof o=="function"&&o(d,h)})})}}},{key:"reload",value:function(){var n=this,i=this.services,r=i.backendConnector,a=i.languageUtils,o=i.logger,l=r.language;if(!(l&&l.toLowerCase()==="cimode")){var c=[],u=function(h){var f=a.toResolveHierarchy(h);f.forEach(function(p){c.indexOf(p)<0&&c.push(p)})};u(l),this.allOptions.preload&&this.allOptions.preload.forEach(function(d){return u(d)}),c.forEach(function(d){n.allOptions.ns.forEach(function(h){r.read(d,h,"read",null,null,function(f,p){f&&o.warn("loading namespace ".concat(h," for language ").concat(d," failed"),f),!f&&p&&o.log("loaded namespace ".concat(h," for language ").concat(d),p),r.loaded("".concat(d,"|").concat(h),f,p)})})})}}}])}();gh.type="backend";const _h=pt.use(gh).init({lng:localStorage.getItem("language")||"en",backend:{loadPath:"/languages/{{lng}}.json"},fallbackLng:"en",debug:!0});function Jt(){pt.isInitialized?(document.getElementById("home-link").innerText=pt.t("home"),document.getElementById("profile-link").innerText=pt.t("profile"),document.getElementById("login-link").innerText=pt.t("login"),document.getElementById("languageDropdown").innerText=pt.t("languageDropdown"),document.querySelectorAll("[translate]").forEach(s=>{const t=s.getAttribute("translate");s.textContent=pt.t(t)})):console.warn("i18next is not initialized yet.")}async function wo(s){try{await pt.changeLanguage(s),localStorage.setItem("language",s),Jt()}catch(t){console.error("Error changing language:",t)}}async function vh(){try{const s=await fetch("http://localhost:8000/profile/",{method:"GET",credentials:"include"});if(!s.ok){console.error("Failed checking language:",s.statusText),pe("Error checking language. Try again.","danger");return}switch((await s.json()).preferred_language){case"FI":wo("fi");break;case"RU":wo("ru");break;default:wo("en")}}catch(s){console.log(s)}}window.setLanguage=wo;function St(s){let t=null;if(document.cookie&&document.cookie!==""){const n=document.cookie.split(";");for(let i=0;i<n.length;i++){const r=n[i].trim();if(r.substring(0,s.length+1)===s+"="){t=decodeURIComponent(r.substring(s.length+1));break}}}return t}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const bu="167",zr={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Hr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Rg=0,Rd=1,Pg=2,yh=1,Lg=2,ai=3,$i=0,en=1,ci=2,ki=0,ps=1,Pd=2,Ld=3,Dd=4,Dg=5,mr=100,Ig=101,Og=102,Ng=103,Ug=104,Fg=200,Bg=201,kg=202,zg=203,vc=204,yc=205,Hg=206,Vg=207,Gg=208,Wg=209,Xg=210,$g=211,qg=212,jg=213,Yg=214,Kg=0,Zg=1,Jg=2,Go=3,Qg=4,e_=5,t_=6,n_=7,xh=0,i_=1,r_=2,zi=0,s_=1,a_=2,o_=3,l_=4,c_=5,u_=6,d_=7,bh=300,Es=301,Ts=302,xc=303,bc=304,ol=306,Sc=1e3,_r=1001,Mc=1002,En=1003,f_=1004,Va=1005,In=1006,Al=1007,vr=1008,mi=1009,Sh=1010,Mh=1011,oa=1012,Su=1013,wr=1014,ui=1015,Sa=1016,Mu=1017,Eu=1018,ws=1020,Eh=35902,Th=1021,wh=1022,On=1023,Ah=1024,Ch=1025,ms=1026,As=1027,Rh=1028,Tu=1029,Ph=1030,wu=1031,Au=1033,Ao=33776,Co=33777,Ro=33778,Po=33779,Ec=35840,Tc=35841,wc=35842,Ac=35843,Cc=36196,Rc=37492,Pc=37496,Lc=37808,Dc=37809,Ic=37810,Oc=37811,Nc=37812,Uc=37813,Fc=37814,Bc=37815,kc=37816,zc=37817,Hc=37818,Vc=37819,Gc=37820,Wc=37821,Lo=36492,Xc=36494,$c=36495,Lh=36283,qc=36284,jc=36285,Yc=36286,h_=3200,p_=3201,Dh=0,m_=1,Di="",Un="srgb",Zi="srgb-linear",Cu="display-p3",ll="display-p3-linear",Wo="linear",ct="srgb",Xo="rec709",$o="p3",Vr=7680,Id=519,g_=512,__=513,v_=514,Ih=515,y_=516,x_=517,b_=518,S_=519,Od=35044,Nd="300 es",di=2e3,qo=2001;class Dr{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const a=r.indexOf(n);a!==-1&&r.splice(a,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let a=0,o=r.length;a<o;a++)r[a].call(this,t);t.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ud=1234567;const Zs=Math.PI/180,la=180/Math.PI;function Ir(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ht[s&255]+Ht[s>>8&255]+Ht[s>>16&255]+Ht[s>>24&255]+"-"+Ht[t&255]+Ht[t>>8&255]+"-"+Ht[t>>16&15|64]+Ht[t>>24&255]+"-"+Ht[n&63|128]+Ht[n>>8&255]+"-"+Ht[n>>16&255]+Ht[n>>24&255]+Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]).toLowerCase()}function It(s,t,n){return Math.max(t,Math.min(n,s))}function Ru(s,t){return(s%t+t)%t}function M_(s,t,n,i,r){return i+(s-t)*(r-i)/(n-t)}function E_(s,t,n){return s!==t?(n-s)/(t-s):0}function Js(s,t,n){return(1-n)*s+n*t}function T_(s,t,n,i){return Js(s,t,1-Math.exp(-n*i))}function w_(s,t=1){return t-Math.abs(Ru(s,t*2)-t)}function A_(s,t,n){return s<=t?0:s>=n?1:(s=(s-t)/(n-t),s*s*(3-2*s))}function C_(s,t,n){return s<=t?0:s>=n?1:(s=(s-t)/(n-t),s*s*s*(s*(s*6-15)+10))}function R_(s,t){return s+Math.floor(Math.random()*(t-s+1))}function P_(s,t){return s+Math.random()*(t-s)}function L_(s){return s*(.5-Math.random())}function D_(s){s!==void 0&&(Ud=s);let t=Ud+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function I_(s){return s*Zs}function O_(s){return s*la}function N_(s){return(s&s-1)===0&&s!==0}function U_(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function F_(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function B_(s,t,n,i,r){const a=Math.cos,o=Math.sin,l=a(n/2),c=o(n/2),u=a((t+i)/2),d=o((t+i)/2),h=a((t-i)/2),f=o((t-i)/2),p=a((i-t)/2),v=o((i-t)/2);switch(r){case"XYX":s.set(l*d,c*h,c*f,l*u);break;case"YZY":s.set(c*f,l*d,c*h,l*u);break;case"ZXZ":s.set(c*h,c*f,l*d,l*u);break;case"XZX":s.set(l*d,c*v,c*p,l*u);break;case"YXY":s.set(c*p,l*d,c*v,l*u);break;case"ZYZ":s.set(c*v,c*p,l*d,l*u);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function as(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function qt(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const k_={DEG2RAD:Zs,RAD2DEG:la,generateUUID:Ir,clamp:It,euclideanModulo:Ru,mapLinear:M_,inverseLerp:E_,lerp:Js,damp:T_,pingpong:w_,smoothstep:A_,smootherstep:C_,randInt:R_,randFloat:P_,randFloatSpread:L_,seededRandom:D_,degToRad:I_,radToDeg:O_,isPowerOfTwo:N_,ceilPowerOfTwo:U_,floorPowerOfTwo:F_,setQuaternionFromProperEuler:B_,normalize:qt,denormalize:as};class he{constructor(t=0,n=0){he.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(It(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),r=Math.sin(n),a=this.x-t.x,o=this.y-t.y;return this.x=a*i-o*r+t.x,this.y=a*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(t,n,i,r,a,o,l,c,u){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,r,a,o,l,c,u)}set(t,n,i,r,a,o,l,c,u){const d=this.elements;return d[0]=t,d[1]=r,d[2]=l,d[3]=n,d[4]=a,d[5]=c,d[6]=i,d[7]=o,d[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,a=this.elements,o=i[0],l=i[3],c=i[6],u=i[1],d=i[4],h=i[7],f=i[2],p=i[5],v=i[8],_=r[0],m=r[3],g=r[6],S=r[1],y=r[4],x=r[7],R=r[2],A=r[5],w=r[8];return a[0]=o*_+l*S+c*R,a[3]=o*m+l*y+c*A,a[6]=o*g+l*x+c*w,a[1]=u*_+d*S+h*R,a[4]=u*m+d*y+h*A,a[7]=u*g+d*x+h*w,a[2]=f*_+p*S+v*R,a[5]=f*m+p*y+v*A,a[8]=f*g+p*x+v*w,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],r=t[2],a=t[3],o=t[4],l=t[5],c=t[6],u=t[7],d=t[8];return n*o*d-n*l*u-i*a*d+i*l*c+r*a*u-r*o*c}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],a=t[3],o=t[4],l=t[5],c=t[6],u=t[7],d=t[8],h=d*o-l*u,f=l*c-d*a,p=u*a-o*c,v=n*h+i*f+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/v;return t[0]=h*_,t[1]=(r*u-d*i)*_,t[2]=(l*i-r*o)*_,t[3]=f*_,t[4]=(d*n-r*c)*_,t[5]=(r*a-l*n)*_,t[6]=p*_,t[7]=(i*c-u*n)*_,t[8]=(o*n-i*a)*_,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,r,a,o,l){const c=Math.cos(a),u=Math.sin(a);return this.set(i*c,i*u,-i*(c*o+u*l)+o+t,-r*u,r*c,-r*(-u*o+c*l)+l+n,0,0,1),this}scale(t,n){return this.premultiply(Cl.makeScale(t,n)),this}rotate(t){return this.premultiply(Cl.makeRotation(-t)),this}translate(t,n){return this.premultiply(Cl.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Cl=new Ke;function Oh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ca(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function z_(){const s=ca("canvas");return s.style.display="block",s}const Fd={};function Qs(s){s in Fd||(Fd[s]=!0,console.warn(s))}function H_(s,t,n){return new Promise(function(i,r){function a(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:r();break;case s.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}const Bd=new Ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),kd=new Ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ks={[Zi]:{transfer:Wo,primaries:Xo,luminanceCoefficients:[.2126,.7152,.0722],toReference:s=>s,fromReference:s=>s},[Un]:{transfer:ct,primaries:Xo,luminanceCoefficients:[.2126,.7152,.0722],toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[ll]:{transfer:Wo,primaries:$o,luminanceCoefficients:[.2289,.6917,.0793],toReference:s=>s.applyMatrix3(kd),fromReference:s=>s.applyMatrix3(Bd)},[Cu]:{transfer:ct,primaries:$o,luminanceCoefficients:[.2289,.6917,.0793],toReference:s=>s.convertSRGBToLinear().applyMatrix3(kd),fromReference:s=>s.applyMatrix3(Bd).convertLinearToSRGB()}},V_=new Set([Zi,ll]),st={enabled:!0,_workingColorSpace:Zi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!V_.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,n){if(this.enabled===!1||t===n||!t||!n)return s;const i=ks[t].toReference,r=ks[n].fromReference;return r(i(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return ks[s].primaries},getTransfer:function(s){return s===Di?Wo:ks[s].transfer},getLuminanceCoefficients:function(s,t=this._workingColorSpace){return s.fromArray(ks[t].luminanceCoefficients)}};function gs(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Rl(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Gr;class G_{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Gr===void 0&&(Gr=ca("canvas")),Gr.width=t.width,Gr.height=t.height;const i=Gr.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Gr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=ca("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=gs(a[o]/255)*255;return i.putImageData(r,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(gs(n[i]/255)*255):n[i]=gs(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let W_=0;class Nh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:W_++}),this.uuid=Ir(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,l=r.length;o<l;o++)r[o].isDataTexture?a.push(Pl(r[o].image)):a.push(Pl(r[o]))}else a=Pl(r);i.url=a}return n||(t.images[this.uuid]=i),i}}function Pl(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?G_.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let X_=0;class Zt extends Dr{constructor(t=Zt.DEFAULT_IMAGE,n=Zt.DEFAULT_MAPPING,i=_r,r=_r,a=In,o=vr,l=On,c=mi,u=Zt.DEFAULT_ANISOTROPY,d=Di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:X_++}),this.uuid=Ir(),this.name="",this.source=new Nh(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=u,this.format=l,this.internalFormat=null,this.type=c,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Sc:t.x=t.x-Math.floor(t.x);break;case _r:t.x=t.x<0?0:1;break;case Mc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Sc:t.y=t.y-Math.floor(t.y);break;case _r:t.y=t.y<0?0:1;break;case Mc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=bh;Zt.DEFAULT_ANISOTROPY=1;class Nt{constructor(t=0,n=0,i=0,r=1){Nt.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,r){return this.x=t,this.y=n,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,a=this.w,o=t.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*a,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*a,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*a,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*a,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,r,a;const c=t.elements,u=c[0],d=c[4],h=c[8],f=c[1],p=c[5],v=c[9],_=c[2],m=c[6],g=c[10];if(Math.abs(d-f)<.01&&Math.abs(h-_)<.01&&Math.abs(v-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+_)<.1&&Math.abs(v+m)<.1&&Math.abs(u+p+g-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const y=(u+1)/2,x=(p+1)/2,R=(g+1)/2,A=(d+f)/4,w=(h+_)/4,I=(v+m)/4;return y>x&&y>R?y<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(y),r=A/i,a=w/i):x>R?x<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(x),i=A/r,a=I/r):R<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(R),i=w/a,r=I/a),this.set(i,r,a,n),this}let S=Math.sqrt((m-v)*(m-v)+(h-_)*(h-_)+(f-d)*(f-d));return Math.abs(S)<.001&&(S=1),this.x=(m-v)/S,this.y=(h-_)/S,this.z=(f-d)/S,this.w=Math.acos((u+p+g-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $_ extends Dr{constructor(t=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new Nt(0,0,t,n),this.scissorTest=!1,this.viewport=new Nt(0,0,t,n);const r={width:t,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:In,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const a=new Zt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);a.flipY=!1,a.generateMipmaps=i.generateMipmaps,a.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let l=0;l<o;l++)this.textures[l]=a.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=t,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new Nh(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ar extends $_{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class Uh extends Zt{constructor(t=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=En,this.minFilter=En,this.wrapR=_r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class q_ extends Zt{constructor(t=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=En,this.minFilter=En,this.wrapR=_r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cr{constructor(t=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=r}static slerpFlat(t,n,i,r,a,o,l){let c=i[r+0],u=i[r+1],d=i[r+2],h=i[r+3];const f=a[o+0],p=a[o+1],v=a[o+2],_=a[o+3];if(l===0){t[n+0]=c,t[n+1]=u,t[n+2]=d,t[n+3]=h;return}if(l===1){t[n+0]=f,t[n+1]=p,t[n+2]=v,t[n+3]=_;return}if(h!==_||c!==f||u!==p||d!==v){let m=1-l;const g=c*f+u*p+d*v+h*_,S=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON){const R=Math.sqrt(y),A=Math.atan2(R,g*S);m=Math.sin(m*A)/R,l=Math.sin(l*A)/R}const x=l*S;if(c=c*m+f*x,u=u*m+p*x,d=d*m+v*x,h=h*m+_*x,m===1-l){const R=1/Math.sqrt(c*c+u*u+d*d+h*h);c*=R,u*=R,d*=R,h*=R}}t[n]=c,t[n+1]=u,t[n+2]=d,t[n+3]=h}static multiplyQuaternionsFlat(t,n,i,r,a,o){const l=i[r],c=i[r+1],u=i[r+2],d=i[r+3],h=a[o],f=a[o+1],p=a[o+2],v=a[o+3];return t[n]=l*v+d*h+c*p-u*f,t[n+1]=c*v+d*f+u*h-l*p,t[n+2]=u*v+d*p+l*f-c*h,t[n+3]=d*v-l*h-c*f-u*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,r){return this._x=t,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,r=t._y,a=t._z,o=t._order,l=Math.cos,c=Math.sin,u=l(i/2),d=l(r/2),h=l(a/2),f=c(i/2),p=c(r/2),v=c(a/2);switch(o){case"XYZ":this._x=f*d*h+u*p*v,this._y=u*p*h-f*d*v,this._z=u*d*v+f*p*h,this._w=u*d*h-f*p*v;break;case"YXZ":this._x=f*d*h+u*p*v,this._y=u*p*h-f*d*v,this._z=u*d*v-f*p*h,this._w=u*d*h+f*p*v;break;case"ZXY":this._x=f*d*h-u*p*v,this._y=u*p*h+f*d*v,this._z=u*d*v+f*p*h,this._w=u*d*h-f*p*v;break;case"ZYX":this._x=f*d*h-u*p*v,this._y=u*p*h+f*d*v,this._z=u*d*v-f*p*h,this._w=u*d*h+f*p*v;break;case"YZX":this._x=f*d*h+u*p*v,this._y=u*p*h+f*d*v,this._z=u*d*v-f*p*h,this._w=u*d*h-f*p*v;break;case"XZY":this._x=f*d*h-u*p*v,this._y=u*p*h-f*d*v,this._z=u*d*v+f*p*h,this._w=u*d*h+f*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],r=n[4],a=n[8],o=n[1],l=n[5],c=n[9],u=n[2],d=n[6],h=n[10],f=i+l+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(d-c)*p,this._y=(a-u)*p,this._z=(o-r)*p}else if(i>l&&i>h){const p=2*Math.sqrt(1+i-l-h);this._w=(d-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(a+u)/p}else if(l>h){const p=2*Math.sqrt(1+l-i-h);this._w=(a-u)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+d)/p}else{const p=2*Math.sqrt(1+h-i-l);this._w=(o-r)/p,this._x=(a+u)/p,this._y=(c+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(It(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,r=t._y,a=t._z,o=t._w,l=n._x,c=n._y,u=n._z,d=n._w;return this._x=i*d+o*l+r*u-a*c,this._y=r*d+o*c+a*l-i*u,this._z=a*d+o*u+i*c-r*l,this._w=o*d-i*l-r*c-a*u,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const i=this._x,r=this._y,a=this._z,o=this._w;let l=o*t._w+i*t._x+r*t._y+a*t._z;if(l<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,l=-l):this.copy(t),l>=1)return this._w=o,this._x=i,this._y=r,this._z=a,this;const c=1-l*l;if(c<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*a+n*this._z,this.normalize(),this}const u=Math.sqrt(c),d=Math.atan2(u,l),h=Math.sin((1-n)*d)/u,f=Math.sin(n*d)/u;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=a*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),a*Math.sin(n),a*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,n=0,i=0){U.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(zd.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(zd.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,r=this.z,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6]*r,this.y=a[1]*n+a[4]*i+a[7]*r,this.z=a[2]*n+a[5]*i+a[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,a=t.elements,o=1/(a[3]*n+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*r+a[12])*o,this.y=(a[1]*n+a[5]*i+a[9]*r+a[13])*o,this.z=(a[2]*n+a[6]*i+a[10]*r+a[14])*o,this}applyQuaternion(t){const n=this.x,i=this.y,r=this.z,a=t.x,o=t.y,l=t.z,c=t.w,u=2*(o*r-l*i),d=2*(l*n-a*r),h=2*(a*i-o*n);return this.x=n+c*u+o*h-l*d,this.y=i+c*d+l*u-a*h,this.z=r+c*h+a*d-o*u,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,r=this.z,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*r,this.y=a[1]*n+a[5]*i+a[9]*r,this.z=a[2]*n+a[6]*i+a[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,r=t.y,a=t.z,o=n.x,l=n.y,c=n.z;return this.x=r*c-a*l,this.y=a*o-i*c,this.z=i*l-r*o,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ll.copy(this).projectOnVector(t),this.sub(Ll)}reflect(t){return this.sub(Ll.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(It(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return n*n+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const r=Math.sin(n)*t;return this.x=r*Math.sin(i),this.y=Math.cos(n)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ll=new U,zd=new Cr;class Ma{constructor(t=new U(1/0,1/0,1/0),n=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(Pn.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(Pn.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=Pn.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const a=i.getAttribute("position");if(n===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let o=0,l=a.count;o<l;o++)t.isMesh===!0?t.getVertexPosition(o,Pn):Pn.fromBufferAttribute(a,o),Pn.applyMatrix4(t.matrixWorld),this.expandByPoint(Pn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ga.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ga.copy(i.boundingBox)),Ga.applyMatrix4(t.matrixWorld),this.union(Ga)}const r=t.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Pn),Pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zs),Wa.subVectors(this.max,zs),Wr.subVectors(t.a,zs),Xr.subVectors(t.b,zs),$r.subVectors(t.c,zs),Ei.subVectors(Xr,Wr),Ti.subVectors($r,Xr),sr.subVectors(Wr,$r);let n=[0,-Ei.z,Ei.y,0,-Ti.z,Ti.y,0,-sr.z,sr.y,Ei.z,0,-Ei.x,Ti.z,0,-Ti.x,sr.z,0,-sr.x,-Ei.y,Ei.x,0,-Ti.y,Ti.x,0,-sr.y,sr.x,0];return!Dl(n,Wr,Xr,$r,Wa)||(n=[1,0,0,0,1,0,0,0,1],!Dl(n,Wr,Xr,$r,Wa))?!1:(Xa.crossVectors(Ei,Ti),n=[Xa.x,Xa.y,Xa.z],Dl(n,Wr,Xr,$r,Wa))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Pn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Pn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ei),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ei=[new U,new U,new U,new U,new U,new U,new U,new U],Pn=new U,Ga=new Ma,Wr=new U,Xr=new U,$r=new U,Ei=new U,Ti=new U,sr=new U,zs=new U,Wa=new U,Xa=new U,ar=new U;function Dl(s,t,n,i,r){for(let a=0,o=s.length-3;a<=o;a+=3){ar.fromArray(s,a);const l=r.x*Math.abs(ar.x)+r.y*Math.abs(ar.y)+r.z*Math.abs(ar.z),c=t.dot(ar),u=n.dot(ar),d=i.dot(ar);if(Math.max(-Math.max(c,u,d),Math.min(c,u,d))>l)return!1}return!0}const j_=new Ma,Hs=new U,Il=new U;class Pu{constructor(t=new U,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):j_.setFromPoints(t).getCenter(i);let r=0;for(let a=0,o=t.length;a<o;a++)r=Math.max(r,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Hs.subVectors(t,this.center);const n=Hs.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Hs,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Il.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Hs.copy(t.center).add(Il)),this.expandByPoint(Hs.copy(t.center).sub(Il))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ti=new U,Ol=new U,$a=new U,wi=new U,Nl=new U,qa=new U,Ul=new U;class Fh{constructor(t=new U,n=new U(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ti)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=ti.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(ti.copy(this.origin).addScaledVector(this.direction,n),ti.distanceToSquared(t))}distanceSqToSegment(t,n,i,r){Ol.copy(t).add(n).multiplyScalar(.5),$a.copy(n).sub(t).normalize(),wi.copy(this.origin).sub(Ol);const a=t.distanceTo(n)*.5,o=-this.direction.dot($a),l=wi.dot(this.direction),c=-wi.dot($a),u=wi.lengthSq(),d=Math.abs(1-o*o);let h,f,p,v;if(d>0)if(h=o*c-l,f=o*l-c,v=a*d,h>=0)if(f>=-v)if(f<=v){const _=1/d;h*=_,f*=_,p=h*(h+o*f+2*l)+f*(o*h+f+2*c)+u}else f=a,h=Math.max(0,-(o*f+l)),p=-h*h+f*(f+2*c)+u;else f=-a,h=Math.max(0,-(o*f+l)),p=-h*h+f*(f+2*c)+u;else f<=-v?(h=Math.max(0,-(-o*a+l)),f=h>0?-a:Math.min(Math.max(-a,-c),a),p=-h*h+f*(f+2*c)+u):f<=v?(h=0,f=Math.min(Math.max(-a,-c),a),p=f*(f+2*c)+u):(h=Math.max(0,-(o*a+l)),f=h>0?a:Math.min(Math.max(-a,-c),a),p=-h*h+f*(f+2*c)+u);else f=o>0?-a:a,h=Math.max(0,-(o*f+l)),p=-h*h+f*(f+2*c)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ol).addScaledVector($a,f),p}intersectSphere(t,n){ti.subVectors(t.center,this.origin);const i=ti.dot(this.direction),r=ti.dot(ti)-i*i,a=t.radius*t.radius;if(r>a)return null;const o=Math.sqrt(a-r),l=i-o,c=i+o;return c<0?null:l<0?this.at(c,n):this.at(l,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,r,a,o,l,c;const u=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return u>=0?(i=(t.min.x-f.x)*u,r=(t.max.x-f.x)*u):(i=(t.max.x-f.x)*u,r=(t.min.x-f.x)*u),d>=0?(a=(t.min.y-f.y)*d,o=(t.max.y-f.y)*d):(a=(t.max.y-f.y)*d,o=(t.min.y-f.y)*d),i>o||a>r||((a>i||isNaN(i))&&(i=a),(o<r||isNaN(r))&&(r=o),h>=0?(l=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(l=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),i>c||l>r)||((l>i||i!==i)&&(i=l),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(t){return this.intersectBox(t,ti)!==null}intersectTriangle(t,n,i,r,a){Nl.subVectors(n,t),qa.subVectors(i,t),Ul.crossVectors(Nl,qa);let o=this.direction.dot(Ul),l;if(o>0){if(r)return null;l=1}else if(o<0)l=-1,o=-o;else return null;wi.subVectors(this.origin,t);const c=l*this.direction.dot(qa.crossVectors(wi,qa));if(c<0)return null;const u=l*this.direction.dot(Nl.cross(wi));if(u<0||c+u>o)return null;const d=-l*wi.dot(Ul);return d<0?null:this.at(d/o,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class At{constructor(t,n,i,r,a,o,l,c,u,d,h,f,p,v,_,m){At.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,r,a,o,l,c,u,d,h,f,p,v,_,m)}set(t,n,i,r,a,o,l,c,u,d,h,f,p,v,_,m){const g=this.elements;return g[0]=t,g[4]=n,g[8]=i,g[12]=r,g[1]=a,g[5]=o,g[9]=l,g[13]=c,g[2]=u,g[6]=d,g[10]=h,g[14]=f,g[3]=p,g[7]=v,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new At().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,i=t.elements,r=1/qr.setFromMatrixColumn(t,0).length(),a=1/qr.setFromMatrixColumn(t,1).length(),o=1/qr.setFromMatrixColumn(t,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,r=t.y,a=t.z,o=Math.cos(i),l=Math.sin(i),c=Math.cos(r),u=Math.sin(r),d=Math.cos(a),h=Math.sin(a);if(t.order==="XYZ"){const f=o*d,p=o*h,v=l*d,_=l*h;n[0]=c*d,n[4]=-c*h,n[8]=u,n[1]=p+v*u,n[5]=f-_*u,n[9]=-l*c,n[2]=_-f*u,n[6]=v+p*u,n[10]=o*c}else if(t.order==="YXZ"){const f=c*d,p=c*h,v=u*d,_=u*h;n[0]=f+_*l,n[4]=v*l-p,n[8]=o*u,n[1]=o*h,n[5]=o*d,n[9]=-l,n[2]=p*l-v,n[6]=_+f*l,n[10]=o*c}else if(t.order==="ZXY"){const f=c*d,p=c*h,v=u*d,_=u*h;n[0]=f-_*l,n[4]=-o*h,n[8]=v+p*l,n[1]=p+v*l,n[5]=o*d,n[9]=_-f*l,n[2]=-o*u,n[6]=l,n[10]=o*c}else if(t.order==="ZYX"){const f=o*d,p=o*h,v=l*d,_=l*h;n[0]=c*d,n[4]=v*u-p,n[8]=f*u+_,n[1]=c*h,n[5]=_*u+f,n[9]=p*u-v,n[2]=-u,n[6]=l*c,n[10]=o*c}else if(t.order==="YZX"){const f=o*c,p=o*u,v=l*c,_=l*u;n[0]=c*d,n[4]=_-f*h,n[8]=v*h+p,n[1]=h,n[5]=o*d,n[9]=-l*d,n[2]=-u*d,n[6]=p*h+v,n[10]=f-_*h}else if(t.order==="XZY"){const f=o*c,p=o*u,v=l*c,_=l*u;n[0]=c*d,n[4]=-h,n[8]=u*d,n[1]=f*h+_,n[5]=o*d,n[9]=p*h-v,n[2]=v*h-p,n[6]=l*d,n[10]=_*h+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Y_,t,K_)}lookAt(t,n,i){const r=this.elements;return un.subVectors(t,n),un.lengthSq()===0&&(un.z=1),un.normalize(),Ai.crossVectors(i,un),Ai.lengthSq()===0&&(Math.abs(i.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),Ai.crossVectors(i,un)),Ai.normalize(),ja.crossVectors(un,Ai),r[0]=Ai.x,r[4]=ja.x,r[8]=un.x,r[1]=Ai.y,r[5]=ja.y,r[9]=un.y,r[2]=Ai.z,r[6]=ja.z,r[10]=un.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,a=this.elements,o=i[0],l=i[4],c=i[8],u=i[12],d=i[1],h=i[5],f=i[9],p=i[13],v=i[2],_=i[6],m=i[10],g=i[14],S=i[3],y=i[7],x=i[11],R=i[15],A=r[0],w=r[4],I=r[8],M=r[12],E=r[1],O=r[5],G=r[9],z=r[13],Y=r[2],L=r[6],N=r[10],k=r[14],F=r[3],ne=r[7],te=r[11],de=r[15];return a[0]=o*A+l*E+c*Y+u*F,a[4]=o*w+l*O+c*L+u*ne,a[8]=o*I+l*G+c*N+u*te,a[12]=o*M+l*z+c*k+u*de,a[1]=d*A+h*E+f*Y+p*F,a[5]=d*w+h*O+f*L+p*ne,a[9]=d*I+h*G+f*N+p*te,a[13]=d*M+h*z+f*k+p*de,a[2]=v*A+_*E+m*Y+g*F,a[6]=v*w+_*O+m*L+g*ne,a[10]=v*I+_*G+m*N+g*te,a[14]=v*M+_*z+m*k+g*de,a[3]=S*A+y*E+x*Y+R*F,a[7]=S*w+y*O+x*L+R*ne,a[11]=S*I+y*G+x*N+R*te,a[15]=S*M+y*z+x*k+R*de,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],r=t[8],a=t[12],o=t[1],l=t[5],c=t[9],u=t[13],d=t[2],h=t[6],f=t[10],p=t[14],v=t[3],_=t[7],m=t[11],g=t[15];return v*(+a*c*h-r*u*h-a*l*f+i*u*f+r*l*p-i*c*p)+_*(+n*c*p-n*u*f+a*o*f-r*o*p+r*u*d-a*c*d)+m*(+n*u*h-n*l*p-a*o*h+i*o*p+a*l*d-i*u*d)+g*(-r*l*d-n*c*h+n*l*f+r*o*h-i*o*f+i*c*d)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=n,r[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],a=t[3],o=t[4],l=t[5],c=t[6],u=t[7],d=t[8],h=t[9],f=t[10],p=t[11],v=t[12],_=t[13],m=t[14],g=t[15],S=h*m*u-_*f*u+_*c*p-l*m*p-h*c*g+l*f*g,y=v*f*u-d*m*u-v*c*p+o*m*p+d*c*g-o*f*g,x=d*_*u-v*h*u+v*l*p-o*_*p-d*l*g+o*h*g,R=v*h*c-d*_*c-v*l*f+o*_*f+d*l*m-o*h*m,A=n*S+i*y+r*x+a*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return t[0]=S*w,t[1]=(_*f*a-h*m*a-_*r*p+i*m*p+h*r*g-i*f*g)*w,t[2]=(l*m*a-_*c*a+_*r*u-i*m*u-l*r*g+i*c*g)*w,t[3]=(h*c*a-l*f*a-h*r*u+i*f*u+l*r*p-i*c*p)*w,t[4]=y*w,t[5]=(d*m*a-v*f*a+v*r*p-n*m*p-d*r*g+n*f*g)*w,t[6]=(v*c*a-o*m*a-v*r*u+n*m*u+o*r*g-n*c*g)*w,t[7]=(o*f*a-d*c*a+d*r*u-n*f*u-o*r*p+n*c*p)*w,t[8]=x*w,t[9]=(v*h*a-d*_*a-v*i*p+n*_*p+d*i*g-n*h*g)*w,t[10]=(o*_*a-v*l*a+v*i*u-n*_*u-o*i*g+n*l*g)*w,t[11]=(d*l*a-o*h*a-d*i*u+n*h*u+o*i*p-n*l*p)*w,t[12]=R*w,t[13]=(d*_*r-v*h*r+v*i*f-n*_*f-d*i*m+n*h*m)*w,t[14]=(v*l*r-o*_*r-v*i*c+n*_*c+o*i*m-n*l*m)*w,t[15]=(o*h*r-d*l*r+d*i*c-n*h*c-o*i*f+n*l*f)*w,this}scale(t){const n=this.elements,i=t.x,r=t.y,a=t.z;return n[0]*=i,n[4]*=r,n[8]*=a,n[1]*=i,n[5]*=r,n[9]*=a,n[2]*=i,n[6]*=r,n[10]*=a,n[3]*=i,n[7]*=r,n[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),r=Math.sin(n),a=1-i,o=t.x,l=t.y,c=t.z,u=a*o,d=a*l;return this.set(u*o+i,u*l-r*c,u*c+r*l,0,u*l+r*c,d*l+i,d*c-r*o,0,u*c-r*l,d*c+r*o,a*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,r,a,o){return this.set(1,i,a,0,t,1,o,0,n,r,1,0,0,0,0,1),this}compose(t,n,i){const r=this.elements,a=n._x,o=n._y,l=n._z,c=n._w,u=a+a,d=o+o,h=l+l,f=a*u,p=a*d,v=a*h,_=o*d,m=o*h,g=l*h,S=c*u,y=c*d,x=c*h,R=i.x,A=i.y,w=i.z;return r[0]=(1-(_+g))*R,r[1]=(p+x)*R,r[2]=(v-y)*R,r[3]=0,r[4]=(p-x)*A,r[5]=(1-(f+g))*A,r[6]=(m+S)*A,r[7]=0,r[8]=(v+y)*w,r[9]=(m-S)*w,r[10]=(1-(f+_))*w,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,n,i){const r=this.elements;let a=qr.set(r[0],r[1],r[2]).length();const o=qr.set(r[4],r[5],r[6]).length(),l=qr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),t.x=r[12],t.y=r[13],t.z=r[14],Ln.copy(this);const u=1/a,d=1/o,h=1/l;return Ln.elements[0]*=u,Ln.elements[1]*=u,Ln.elements[2]*=u,Ln.elements[4]*=d,Ln.elements[5]*=d,Ln.elements[6]*=d,Ln.elements[8]*=h,Ln.elements[9]*=h,Ln.elements[10]*=h,n.setFromRotationMatrix(Ln),i.x=a,i.y=o,i.z=l,this}makePerspective(t,n,i,r,a,o,l=di){const c=this.elements,u=2*a/(n-t),d=2*a/(i-r),h=(n+t)/(n-t),f=(i+r)/(i-r);let p,v;if(l===di)p=-(o+a)/(o-a),v=-2*o*a/(o-a);else if(l===qo)p=-o/(o-a),v=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,r,a,o,l=di){const c=this.elements,u=1/(n-t),d=1/(i-r),h=1/(o-a),f=(n+t)*u,p=(i+r)*d;let v,_;if(l===di)v=(o+a)*h,_=-2*h;else if(l===qo)v=a*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=2*u,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const qr=new U,Ln=new At,Y_=new U(0,0,0),K_=new U(1,1,1),Ai=new U,ja=new U,un=new U,Hd=new At,Vd=new Cr;class gi{constructor(t=0,n=0,i=0,r=gi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,r=this._order){return this._x=t,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const r=t.elements,a=r[0],o=r[4],l=r[8],c=r[1],u=r[5],d=r[9],h=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(It(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(f,u),this._z=0);break;case"YXZ":this._x=Math.asin(-It(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(l,p),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(It(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-It(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(It(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(l,p));break;case"XZY":this._z=Math.asin(-It(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,u),this._y=Math.atan2(l,a)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return Hd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Hd,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Vd.setFromEuler(this),this.setFromQuaternion(Vd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gi.DEFAULT_ORDER="XYZ";class Bh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Z_=0;const Gd=new U,jr=new Cr,ni=new At,Ya=new U,Vs=new U,J_=new U,Q_=new Cr,Wd=new U(1,0,0),Xd=new U(0,1,0),$d=new U(0,0,1),qd={type:"added"},e0={type:"removed"},Yr={type:"childadded",child:null},Fl={type:"childremoved",child:null};class mn extends Dr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Z_++}),this.uuid=Ir(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mn.DEFAULT_UP.clone();const t=new U,n=new gi,i=new Cr,r=new U(1,1,1);function a(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new At},normalMatrix:{value:new Ke}}),this.matrix=new At,this.matrixWorld=new At,this.matrixAutoUpdate=mn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return jr.setFromAxisAngle(t,n),this.quaternion.multiply(jr),this}rotateOnWorldAxis(t,n){return jr.setFromAxisAngle(t,n),this.quaternion.premultiply(jr),this}rotateX(t){return this.rotateOnAxis(Wd,t)}rotateY(t){return this.rotateOnAxis(Xd,t)}rotateZ(t){return this.rotateOnAxis($d,t)}translateOnAxis(t,n){return Gd.copy(t).applyQuaternion(this.quaternion),this.position.add(Gd.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Wd,t)}translateY(t){return this.translateOnAxis(Xd,t)}translateZ(t){return this.translateOnAxis($d,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?Ya.copy(t):Ya.set(t,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt(Vs,Ya,this.up):ni.lookAt(Ya,Vs,this.up),this.quaternion.setFromRotationMatrix(ni),r&&(ni.extractRotation(r.matrixWorld),jr.setFromRotationMatrix(ni),this.quaternion.premultiply(jr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(qd),Yr.child=t,this.dispatchEvent(Yr),Yr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(e0),Fl.child=t,this.dispatchEvent(Fl),Fl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ni.multiply(t.parent.matrixWorld)),t.applyMatrix4(ni),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(qd),Yr.child=t,this.dispatchEvent(Yr),Yr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,n);if(o!==void 0)return o}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,t,J_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,Q_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function a(l,c){return l[c.uuid]===void 0&&(l[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(t.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const c=l.shapes;if(Array.isArray(c))for(let u=0,d=c.length;u<d;u++){const h=c[u];a(t.shapes,h)}else a(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let c=0,u=this.material.length;c<u;c++)l.push(a(t.materials,this.material[c]));r.material=l}else r.material=a(t.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const c=this.animations[l];r.animations.push(a(t.animations,c))}}if(n){const l=o(t.geometries),c=o(t.materials),u=o(t.textures),d=o(t.images),h=o(t.shapes),f=o(t.skeletons),p=o(t.animations),v=o(t.nodes);l.length>0&&(i.geometries=l),c.length>0&&(i.materials=c),u.length>0&&(i.textures=u),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(l){const c=[];for(const u in l){const d=l[u];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}mn.DEFAULT_UP=new U(0,1,0);mn.DEFAULT_MATRIX_AUTO_UPDATE=!0;mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Dn=new U,ii=new U,Bl=new U,ri=new U,Kr=new U,Zr=new U,jd=new U,kl=new U,zl=new U,Hl=new U;class zn{constructor(t=new U,n=new U,i=new U){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,r){r.subVectors(i,n),Dn.subVectors(t,n),r.cross(Dn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(t,n,i,r,a){Dn.subVectors(r,n),ii.subVectors(i,n),Bl.subVectors(t,n);const o=Dn.dot(Dn),l=Dn.dot(ii),c=Dn.dot(Bl),u=ii.dot(ii),d=ii.dot(Bl),h=o*u-l*l;if(h===0)return a.set(0,0,0),null;const f=1/h,p=(u*c-l*d)*f,v=(o*d-l*c)*f;return a.set(1-p-v,v,p)}static containsPoint(t,n,i,r){return this.getBarycoord(t,n,i,r,ri)===null?!1:ri.x>=0&&ri.y>=0&&ri.x+ri.y<=1}static getInterpolation(t,n,i,r,a,o,l,c){return this.getBarycoord(t,n,i,r,ri)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,ri.x),c.addScaledVector(o,ri.y),c.addScaledVector(l,ri.z),c)}static isFrontFacing(t,n,i,r){return Dn.subVectors(i,n),ii.subVectors(t,n),Dn.cross(ii).dot(r)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,r){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,n,i,r){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Dn.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),Dn.cross(ii).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return zn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return zn.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,r,a){return zn.getInterpolation(t,this.a,this.b,this.c,n,i,r,a)}containsPoint(t){return zn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return zn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,r=this.b,a=this.c;let o,l;Kr.subVectors(r,i),Zr.subVectors(a,i),kl.subVectors(t,i);const c=Kr.dot(kl),u=Zr.dot(kl);if(c<=0&&u<=0)return n.copy(i);zl.subVectors(t,r);const d=Kr.dot(zl),h=Zr.dot(zl);if(d>=0&&h<=d)return n.copy(r);const f=c*h-d*u;if(f<=0&&c>=0&&d<=0)return o=c/(c-d),n.copy(i).addScaledVector(Kr,o);Hl.subVectors(t,a);const p=Kr.dot(Hl),v=Zr.dot(Hl);if(v>=0&&p<=v)return n.copy(a);const _=p*u-c*v;if(_<=0&&u>=0&&v<=0)return l=u/(u-v),n.copy(i).addScaledVector(Zr,l);const m=d*v-p*h;if(m<=0&&h-d>=0&&p-v>=0)return jd.subVectors(a,r),l=(h-d)/(h-d+(p-v)),n.copy(r).addScaledVector(jd,l);const g=1/(m+_+f);return o=_*g,l=f*g,n.copy(i).addScaledVector(Kr,o).addScaledVector(Zr,l)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const kh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},Ka={h:0,s:0,l:0};function Vl(s,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?s+(t-s)*6*n:n<1/2?t:n<2/3?s+(t-s)*6*(2/3-n):s}class Be{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Un){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,st.toWorkingColorSpace(this,n),this}setRGB(t,n,i,r=st.workingColorSpace){return this.r=t,this.g=n,this.b=i,st.toWorkingColorSpace(this,r),this}setHSL(t,n,i,r=st.workingColorSpace){if(t=Ru(t,1),n=It(n,0,1),i=It(i,0,1),n===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+n):i+n-i*n,o=2*i-a;this.r=Vl(o,a,t+1/3),this.g=Vl(o,a,t),this.b=Vl(o,a,t-1/3)}return st.toWorkingColorSpace(this,r),this}setStyle(t,n=Un){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const o=r[1],l=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(a,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Un){const i=kh[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}copyLinearToSRGB(t){return this.r=Rl(t.r),this.g=Rl(t.g),this.b=Rl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Un){return st.fromWorkingColorSpace(Vt.copy(this),t),Math.round(It(Vt.r*255,0,255))*65536+Math.round(It(Vt.g*255,0,255))*256+Math.round(It(Vt.b*255,0,255))}getHexString(t=Un){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=st.workingColorSpace){st.fromWorkingColorSpace(Vt.copy(this),n);const i=Vt.r,r=Vt.g,a=Vt.b,o=Math.max(i,r,a),l=Math.min(i,r,a);let c,u;const d=(l+o)/2;if(l===o)c=0,u=0;else{const h=o-l;switch(u=d<=.5?h/(o+l):h/(2-o-l),o){case i:c=(r-a)/h+(r<a?6:0);break;case r:c=(a-i)/h+2;break;case a:c=(i-r)/h+4;break}c/=6}return t.h=c,t.s=u,t.l=d,t}getRGB(t,n=st.workingColorSpace){return st.fromWorkingColorSpace(Vt.copy(this),n),t.r=Vt.r,t.g=Vt.g,t.b=Vt.b,t}getStyle(t=Un){st.fromWorkingColorSpace(Vt.copy(this),t);const n=Vt.r,i=Vt.g,r=Vt.b;return t!==Un?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,n,i){return this.getHSL(Ci),this.setHSL(Ci.h+t,Ci.s+n,Ci.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Ci),t.getHSL(Ka);const i=Js(Ci.h,Ka.h,n),r=Js(Ci.s,Ka.s,n),a=Js(Ci.l,Ka.l,n);return this.setHSL(i,r,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,r=this.b,a=t.elements;return this.r=a[0]*n+a[3]*i+a[6]*r,this.g=a[1]*n+a[4]*i+a[7]*r,this.b=a[2]*n+a[5]*i+a[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vt=new Be;Be.NAMES=kh;let t0=0;class Ea extends Dr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:t0++}),this.uuid=Ir(),this.name="",this.type="Material",this.blending=ps,this.side=$i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vc,this.blendDst=yc,this.blendEquation=mr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=Go,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Id,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vr,this.stencilZFail=Vr,this.stencilZPass=Vr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ps&&(i.blending=this.blending),this.side!==$i&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==vc&&(i.blendSrc=this.blendSrc),this.blendDst!==yc&&(i.blendDst=this.blendDst),this.blendEquation!==mr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Go&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Id&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Vr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Vr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const o=[];for(const l in a){const c=a[l];delete c.metadata,o.push(c)}return o}if(n){const a=r(t.textures),o=r(t.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}onBeforeRender(){console.warn("Material: onBeforeRender() has been removed.")}}class ot extends Ea{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gi,this.combine=xh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Tt=new U,Za=new he;class $n{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=Od,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ui,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Qs("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[t+r]=n.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Za.fromBufferAttribute(this,n),Za.applyMatrix3(t),this.setXY(n,Za.x,Za.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Tt.fromBufferAttribute(this,n),Tt.applyMatrix3(t),this.setXYZ(n,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Tt.fromBufferAttribute(this,n),Tt.applyMatrix4(t),this.setXYZ(n,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Tt.fromBufferAttribute(this,n),Tt.applyNormalMatrix(t),this.setXYZ(n,Tt.x,Tt.y,Tt.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Tt.fromBufferAttribute(this,n),Tt.transformDirection(t),this.setXYZ(n,Tt.x,Tt.y,Tt.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=as(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=qt(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=as(n,this.array)),n}setX(t,n){return this.normalized&&(n=qt(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=as(n,this.array)),n}setY(t,n){return this.normalized&&(n=qt(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=as(n,this.array)),n}setZ(t,n){return this.normalized&&(n=qt(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=as(n,this.array)),n}setW(t,n){return this.normalized&&(n=qt(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=qt(n,this.array),i=qt(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,r){return t*=this.itemSize,this.normalized&&(n=qt(n,this.array),i=qt(i,this.array),r=qt(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,n,i,r,a){return t*=this.itemSize,this.normalized&&(n=qt(n,this.array),i=qt(i,this.array),r=qt(r,this.array),a=qt(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Od&&(t.usage=this.usage),t}}class zh extends $n{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class Hh extends $n{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class An extends $n{constructor(t,n,i){super(new Float32Array(t),n,i)}}let n0=0;const xn=new At,Gl=new mn,Jr=new U,dn=new Ma,Gs=new Ma,Dt=new U;class xi extends Dr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:n0++}),this.uuid=Ir(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Oh(t)?Hh:zh)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Ke().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return xn.makeRotationFromQuaternion(t),this.applyMatrix4(xn),this}rotateX(t){return xn.makeRotationX(t),this.applyMatrix4(xn),this}rotateY(t){return xn.makeRotationY(t),this.applyMatrix4(xn),this}rotateZ(t){return xn.makeRotationZ(t),this.applyMatrix4(xn),this}translate(t,n,i){return xn.makeTranslation(t,n,i),this.applyMatrix4(xn),this}scale(t,n,i){return xn.makeScale(t,n,i),this.applyMatrix4(xn),this}lookAt(t){return Gl.lookAt(t),Gl.updateMatrix(),this.applyMatrix4(Gl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Jr).negate(),this.translate(Jr.x,Jr.y,Jr.z),this}setFromPoints(t){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new An(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ma);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,r=n.length;i<r;i++){const a=n[i];dn.setFromBufferAttribute(a),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pu);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const i=this.boundingSphere.center;if(dn.setFromBufferAttribute(t),n)for(let a=0,o=n.length;a<o;a++){const l=n[a];Gs.setFromBufferAttribute(l),this.morphTargetsRelative?(Dt.addVectors(dn.min,Gs.min),dn.expandByPoint(Dt),Dt.addVectors(dn.max,Gs.max),dn.expandByPoint(Dt)):(dn.expandByPoint(Gs.min),dn.expandByPoint(Gs.max))}dn.getCenter(i);let r=0;for(let a=0,o=t.count;a<o;a++)Dt.fromBufferAttribute(t,a),r=Math.max(r,i.distanceToSquared(Dt));if(n)for(let a=0,o=n.length;a<o;a++){const l=n[a],c=this.morphTargetsRelative;for(let u=0,d=l.count;u<d;u++)Dt.fromBufferAttribute(l,u),c&&(Jr.fromBufferAttribute(t,u),Dt.add(Jr)),r=Math.max(r,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,a=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $n(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),l=[],c=[];for(let I=0;I<i.count;I++)l[I]=new U,c[I]=new U;const u=new U,d=new U,h=new U,f=new he,p=new he,v=new he,_=new U,m=new U;function g(I,M,E){u.fromBufferAttribute(i,I),d.fromBufferAttribute(i,M),h.fromBufferAttribute(i,E),f.fromBufferAttribute(a,I),p.fromBufferAttribute(a,M),v.fromBufferAttribute(a,E),d.sub(u),h.sub(u),p.sub(f),v.sub(f);const O=1/(p.x*v.y-v.x*p.y);isFinite(O)&&(_.copy(d).multiplyScalar(v.y).addScaledVector(h,-p.y).multiplyScalar(O),m.copy(h).multiplyScalar(p.x).addScaledVector(d,-v.x).multiplyScalar(O),l[I].add(_),l[M].add(_),l[E].add(_),c[I].add(m),c[M].add(m),c[E].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let I=0,M=S.length;I<M;++I){const E=S[I],O=E.start,G=E.count;for(let z=O,Y=O+G;z<Y;z+=3)g(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const y=new U,x=new U,R=new U,A=new U;function w(I){R.fromBufferAttribute(r,I),A.copy(R);const M=l[I];y.copy(M),y.sub(R.multiplyScalar(R.dot(M))).normalize(),x.crossVectors(A,M);const O=x.dot(c[I])<0?-1:1;o.setXYZW(I,y.x,y.y,y.z,O)}for(let I=0,M=S.length;I<M;++I){const E=S[I],O=E.start,G=E.count;for(let z=O,Y=O+G;z<Y;z+=3)w(t.getX(z+0)),w(t.getX(z+1)),w(t.getX(z+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new $n(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new U,a=new U,o=new U,l=new U,c=new U,u=new U,d=new U,h=new U;if(t)for(let f=0,p=t.count;f<p;f+=3){const v=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(n,v),a.fromBufferAttribute(n,_),o.fromBufferAttribute(n,m),d.subVectors(o,a),h.subVectors(r,a),d.cross(h),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,_),u.fromBufferAttribute(i,m),l.add(d),c.add(d),u.add(d),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,u.x,u.y,u.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),a.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),d.subVectors(o,a),h.subVectors(r,a),d.cross(h),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)Dt.fromBufferAttribute(t,n),Dt.normalize(),t.setXYZ(n,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function t(l,c){const u=l.array,d=l.itemSize,h=l.normalized,f=new u.constructor(c.length*d);let p=0,v=0;for(let _=0,m=c.length;_<m;_++){l.isInterleavedBufferAttribute?p=c[_]*l.data.stride+l.offset:p=c[_]*d;for(let g=0;g<d;g++)f[v++]=u[p++]}return new $n(f,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new xi,i=this.index.array,r=this.attributes;for(const l in r){const c=r[l],u=t(c,i);n.setAttribute(l,u)}const a=this.morphAttributes;for(const l in a){const c=[],u=a[l];for(let d=0,h=u.length;d<h;d++){const f=u[d],p=t(f,i);c.push(p)}n.morphAttributes[l]=c}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let l=0,c=o.length;l<c;l++){const u=o[l];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const u in c)c[u]!==void 0&&(t[u]=c[u]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const u=i[c];t.data.attributes[c]=u.toJSON(t.data)}const r={};let a=!1;for(const c in this.morphAttributes){const u=this.morphAttributes[c],d=[];for(let h=0,f=u.length;h<f;h++){const p=u[h];d.push(p.toJSON(t.data))}d.length>0&&(r[c]=d,a=!0)}a&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const l=this.boundingSphere;return l!==null&&(t.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(n));const r=t.attributes;for(const u in r){const d=r[u];this.setAttribute(u,d.clone(n))}const a=t.morphAttributes;for(const u in a){const d=[],h=a[u];for(let f=0,p=h.length;f<p;f++)d.push(h[f].clone(n));this.morphAttributes[u]=d}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let u=0,d=o.length;u<d;u++){const h=o[u];this.addGroup(h.start,h.count,h.materialIndex)}const l=t.boundingBox;l!==null&&(this.boundingBox=l.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Yd=new At,or=new Fh,Ja=new Pu,Kd=new U,Qr=new U,es=new U,ts=new U,Wl=new U,Qa=new U,eo=new he,to=new he,no=new he,Zd=new U,Jd=new U,Qd=new U,io=new U,ro=new U;class Ze extends mn{constructor(t=new xi,n=new ot){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){const l=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=a}}}}getVertexPosition(t,n){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,t);const l=this.morphTargetInfluences;if(a&&l){Qa.set(0,0,0);for(let c=0,u=a.length;c<u;c++){const d=l[c],h=a[c];d!==0&&(Wl.fromBufferAttribute(h,t),o?Qa.addScaledVector(Wl,d):Qa.addScaledVector(Wl.sub(n),d))}n.add(Qa)}return n}raycast(t,n){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ja.copy(i.boundingSphere),Ja.applyMatrix4(a),or.copy(t.ray).recast(t.near),!(Ja.containsPoint(or.origin)===!1&&(or.intersectSphere(Ja,Kd)===null||or.origin.distanceToSquared(Kd)>(t.far-t.near)**2))&&(Yd.copy(a).invert(),or.copy(t.ray).applyMatrix4(Yd),!(i.boundingBox!==null&&or.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,or)))}_computeIntersections(t,n,i){let r;const a=this.geometry,o=this.material,l=a.index,c=a.attributes.position,u=a.attributes.uv,d=a.attributes.uv1,h=a.attributes.normal,f=a.groups,p=a.drawRange;if(l!==null)if(Array.isArray(o))for(let v=0,_=f.length;v<_;v++){const m=f[v],g=o[m.materialIndex],S=Math.max(m.start,p.start),y=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=S,R=y;x<R;x+=3){const A=l.getX(x),w=l.getX(x+1),I=l.getX(x+2);r=so(this,g,t,i,u,d,h,A,w,I),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=v,g=_;m<g;m+=3){const S=l.getX(m),y=l.getX(m+1),x=l.getX(m+2);r=so(this,o,t,i,u,d,h,S,y,x),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let v=0,_=f.length;v<_;v++){const m=f[v],g=o[m.materialIndex],S=Math.max(m.start,p.start),y=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=S,R=y;x<R;x+=3){const A=x,w=x+1,I=x+2;r=so(this,g,t,i,u,d,h,A,w,I),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=v,g=_;m<g;m+=3){const S=m,y=m+1,x=m+2;r=so(this,o,t,i,u,d,h,S,y,x),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function i0(s,t,n,i,r,a,o,l){let c;if(t.side===en?c=i.intersectTriangle(o,a,r,!0,l):c=i.intersectTriangle(r,a,o,t.side===$i,l),c===null)return null;ro.copy(l),ro.applyMatrix4(s.matrixWorld);const u=n.ray.origin.distanceTo(ro);return u<n.near||u>n.far?null:{distance:u,point:ro.clone(),object:s}}function so(s,t,n,i,r,a,o,l,c,u){s.getVertexPosition(l,Qr),s.getVertexPosition(c,es),s.getVertexPosition(u,ts);const d=i0(s,t,n,i,Qr,es,ts,io);if(d){r&&(eo.fromBufferAttribute(r,l),to.fromBufferAttribute(r,c),no.fromBufferAttribute(r,u),d.uv=zn.getInterpolation(io,Qr,es,ts,eo,to,no,new he)),a&&(eo.fromBufferAttribute(a,l),to.fromBufferAttribute(a,c),no.fromBufferAttribute(a,u),d.uv1=zn.getInterpolation(io,Qr,es,ts,eo,to,no,new he)),o&&(Zd.fromBufferAttribute(o,l),Jd.fromBufferAttribute(o,c),Qd.fromBufferAttribute(o,u),d.normal=zn.getInterpolation(io,Qr,es,ts,Zd,Jd,Qd,new U),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const h={a:l,b:c,c:u,normal:new U,materialIndex:0};zn.getNormal(Qr,es,ts,h.normal),d.face=h}return d}class ut extends xi{constructor(t=1,n=1,i=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:r,heightSegments:a,depthSegments:o};const l=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const c=[],u=[],d=[],h=[];let f=0,p=0;v("z","y","x",-1,-1,i,n,t,o,a,0),v("z","y","x",1,-1,i,n,-t,o,a,1),v("x","z","y",1,1,t,i,n,r,o,2),v("x","z","y",1,-1,t,i,-n,r,o,3),v("x","y","z",1,-1,t,n,i,r,a,4),v("x","y","z",-1,-1,t,n,-i,r,a,5),this.setIndex(c),this.setAttribute("position",new An(u,3)),this.setAttribute("normal",new An(d,3)),this.setAttribute("uv",new An(h,2));function v(_,m,g,S,y,x,R,A,w,I,M){const E=x/w,O=R/I,G=x/2,z=R/2,Y=A/2,L=w+1,N=I+1;let k=0,F=0;const ne=new U;for(let te=0;te<N;te++){const de=te*O-z;for(let Oe=0;Oe<L;Oe++){const Ne=Oe*E-G;ne[_]=Ne*S,ne[m]=de*y,ne[g]=Y,u.push(ne.x,ne.y,ne.z),ne[_]=0,ne[m]=0,ne[g]=A>0?1:-1,d.push(ne.x,ne.y,ne.z),h.push(Oe/w),h.push(1-te/I),k+=1}}for(let te=0;te<I;te++)for(let de=0;de<w;de++){const Oe=f+de+L*te,Ne=f+de+L*(te+1),J=f+(de+1)+L*(te+1),ae=f+(de+1)+L*te;c.push(Oe,Ne,ae),c.push(Ne,J,ae),F+=6}l.addGroup(p,F,M),p+=F,f+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ut(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Cs(s){const t={};for(const n in s){t[n]={};for(const i in s[n]){const r=s[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=r.clone():Array.isArray(r)?t[n][i]=r.slice():t[n][i]=r}}return t}function jt(s){const t={};for(let n=0;n<s.length;n++){const i=Cs(s[n]);for(const r in i)t[r]=i[r]}return t}function r0(s){const t=[];for(let n=0;n<s.length;n++)t.push(s[n].clone());return t}function Vh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:st.workingColorSpace}const s0={clone:Cs,merge:jt};var a0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,o0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qi extends Ea{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=a0,this.fragmentShader=o0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Cs(t.uniforms),this.uniformsGroups=r0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Gh extends mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new At,this.projectionMatrix=new At,this.projectionMatrixInverse=new At,this.coordinateSystem=di}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ri=new U,ef=new he,tf=new he;class Mn extends Gh{constructor(t=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=la*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Zs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return la*2*Math.atan(Math.tan(Zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){Ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ri.x,Ri.y).multiplyScalar(-t/Ri.z),Ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ri.x,Ri.y).multiplyScalar(-t/Ri.z)}getViewSize(t,n){return this.getViewBounds(t,ef,tf),n.subVectors(tf,ef)}setViewOffset(t,n,i,r,a,o){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(Zs*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,u=o.fullHeight;a+=o.offsetX*r/c,n-=o.offsetY*i/u,r*=o.width/c,i*=o.height/u}const l=this.filmOffset;l!==0&&(a+=t*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,n,n-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const ns=-90,is=1;class l0 extends mn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Mn(ns,is,t,n);r.layers=this.layers,this.add(r);const a=new Mn(ns,is,t,n);a.layers=this.layers,this.add(a);const o=new Mn(ns,is,t,n);o.layers=this.layers,this.add(o);const l=new Mn(ns,is,t,n);l.layers=this.layers,this.add(l);const c=new Mn(ns,is,t,n);c.layers=this.layers,this.add(c);const u=new Mn(ns,is,t,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,r,a,o,l,c]=n;for(const u of n)this.remove(u);if(t===di)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===qo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const u of n)this.add(u),u.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,o,l,c,u,d]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(n,a),t.setRenderTarget(i,1,r),t.render(n,o),t.setRenderTarget(i,2,r),t.render(n,l),t.setRenderTarget(i,3,r),t.render(n,c),t.setRenderTarget(i,4,r),t.render(n,u),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(n,d),t.setRenderTarget(h,f,p),t.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Wh extends Zt{constructor(t,n,i,r,a,o,l,c,u,d){t=t!==void 0?t:[],n=n!==void 0?n:Es,super(t,n,i,r,a,o,l,c,u,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class c0 extends Ar{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Wh(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:In}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ut(5,5,5),a=new qi({name:"CubemapFromEquirect",uniforms:Cs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:en,blending:ki});a.uniforms.tEquirect.value=n;const o=new Ze(r,a),l=n.minFilter;return n.minFilter===vr&&(n.minFilter=In),new l0(1,10,this).update(t,o),n.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(t,n,i,r){const a=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(n,i,r);t.setRenderTarget(a)}}const Xl=new U,u0=new U,d0=new Ke;class Li{constructor(t=new U(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,r){return this.normal.set(t,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const r=Xl.subVectors(i,n).cross(u0.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(Xl),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:n.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||d0.getNormalMatrix(t),r=this.coplanarPoint(Xl).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const lr=new Pu,ao=new U;class Xh{constructor(t=new Li,n=new Li,i=new Li,r=new Li,a=new Li,o=new Li){this.planes=[t,n,i,r,a,o]}set(t,n,i,r,a,o){const l=this.planes;return l[0].copy(t),l[1].copy(n),l[2].copy(i),l[3].copy(r),l[4].copy(a),l[5].copy(o),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=di){const i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],p=r[8],v=r[9],_=r[10],m=r[11],g=r[12],S=r[13],y=r[14],x=r[15];if(i[0].setComponents(c-a,f-u,m-p,x-g).normalize(),i[1].setComponents(c+a,f+u,m+p,x+g).normalize(),i[2].setComponents(c+o,f+d,m+v,x+S).normalize(),i[3].setComponents(c-o,f-d,m-v,x-S).normalize(),i[4].setComponents(c-l,f-h,m-_,x-y).normalize(),n===di)i[5].setComponents(c+l,f+h,m+_,x+y).normalize();else if(n===qo)i[5].setComponents(l,h,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),lr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(lr)}intersectsSprite(t){return lr.center.set(0,0,0),lr.radius=.7071067811865476,lr.applyMatrix4(t.matrixWorld),this.intersectsSphere(lr)}intersectsSphere(t){const n=this.planes,i=t.center,r=-t.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(ao.x=r.normal.x>0?t.max.x:t.min.x,ao.y=r.normal.y>0?t.max.y:t.min.y,ao.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(ao)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function $h(){let s=null,t=!1,n=null,i=null;function r(a,o){n(a,o),i=s.requestAnimationFrame(r)}return{start:function(){t!==!0&&n!==null&&(i=s.requestAnimationFrame(r),t=!0)},stop:function(){s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){s=a}}}function f0(s){const t=new WeakMap;function n(l,c){const u=l.array,d=l.usage,h=u.byteLength,f=s.createBuffer();s.bindBuffer(c,f),s.bufferData(c,u,d),l.onUploadCallback();let p;if(u instanceof Float32Array)p=s.FLOAT;else if(u instanceof Uint16Array)l.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)p=s.SHORT;else if(u instanceof Uint32Array)p=s.UNSIGNED_INT;else if(u instanceof Int32Array)p=s.INT;else if(u instanceof Int8Array)p=s.BYTE;else if(u instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:f,type:p,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:h}}function i(l,c,u){const d=c.array,h=c._updateRange,f=c.updateRanges;if(s.bindBuffer(u,l),h.count===-1&&f.length===0&&s.bufferSubData(u,0,d),f.length!==0){for(let p=0,v=f.length;p<v;p++){const _=f[p];s.bufferSubData(u,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}c.clearUpdateRanges()}h.count!==-1&&(s.bufferSubData(u,h.offset*d.BYTES_PER_ELEMENT,d,h.offset,h.count),h.count=-1),c.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),t.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const c=t.get(l);c&&(s.deleteBuffer(c.buffer),t.delete(l))}function o(l,c){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const d=t.get(l);(!d||d.version<l.version)&&t.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const u=t.get(l);if(u===void 0)t.set(l,n(l,c));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,l,c),u.version=l.version}}return{get:r,remove:a,update:o}}class cl extends xi{constructor(t=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:r};const a=t/2,o=n/2,l=Math.floor(i),c=Math.floor(r),u=l+1,d=c+1,h=t/l,f=n/c,p=[],v=[],_=[],m=[];for(let g=0;g<d;g++){const S=g*f-o;for(let y=0;y<u;y++){const x=y*h-a;v.push(x,-S,0),_.push(0,0,1),m.push(y/l),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let S=0;S<l;S++){const y=S+u*g,x=S+u*(g+1),R=S+1+u*(g+1),A=S+1+u*g;p.push(y,x,A),p.push(x,R,A)}this.setIndex(p),this.setAttribute("position",new An(v,3)),this.setAttribute("normal",new An(_,3)),this.setAttribute("uv",new An(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cl(t.width,t.height,t.widthSegments,t.heightSegments)}}var h0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,p0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,m0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,g0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,v0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,y0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,x0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,b0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,S0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,M0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,E0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,T0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,w0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,A0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,C0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,R0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,P0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,L0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,D0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,I0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,O0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,N0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,U0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,F0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,B0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,k0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,z0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,H0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,V0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,G0="gl_FragColor = linearToOutputTexel( gl_FragColor );",W0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,X0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,q0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,j0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Y0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,K0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Z0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,J0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Q0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ev=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,tv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,iv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,sv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,av=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ov=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,uv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,dv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,fv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,hv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,pv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_v=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Sv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ev=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Av=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Rv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Lv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Dv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Iv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ov=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Uv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Vv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$v=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Yv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Kv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Zv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Jv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ey=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ty=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ny=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,iy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ry=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ay=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,oy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ly=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,dy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const fy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hy=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,py=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,my=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_y=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,yy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,xy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,by=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,My=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ey=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ty=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ay=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ry=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Py=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ly=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Iy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Oy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ny=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Fy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,By=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ky=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ye={alphahash_fragment:h0,alphahash_pars_fragment:p0,alphamap_fragment:m0,alphamap_pars_fragment:g0,alphatest_fragment:_0,alphatest_pars_fragment:v0,aomap_fragment:y0,aomap_pars_fragment:x0,batching_pars_vertex:b0,batching_vertex:S0,begin_vertex:M0,beginnormal_vertex:E0,bsdfs:T0,iridescence_fragment:w0,bumpmap_pars_fragment:A0,clipping_planes_fragment:C0,clipping_planes_pars_fragment:R0,clipping_planes_pars_vertex:P0,clipping_planes_vertex:L0,color_fragment:D0,color_pars_fragment:I0,color_pars_vertex:O0,color_vertex:N0,common:U0,cube_uv_reflection_fragment:F0,defaultnormal_vertex:B0,displacementmap_pars_vertex:k0,displacementmap_vertex:z0,emissivemap_fragment:H0,emissivemap_pars_fragment:V0,colorspace_fragment:G0,colorspace_pars_fragment:W0,envmap_fragment:X0,envmap_common_pars_fragment:$0,envmap_pars_fragment:q0,envmap_pars_vertex:j0,envmap_physical_pars_fragment:sv,envmap_vertex:Y0,fog_vertex:K0,fog_pars_vertex:Z0,fog_fragment:J0,fog_pars_fragment:Q0,gradientmap_pars_fragment:ev,lightmap_pars_fragment:tv,lights_lambert_fragment:nv,lights_lambert_pars_fragment:iv,lights_pars_begin:rv,lights_toon_fragment:av,lights_toon_pars_fragment:ov,lights_phong_fragment:lv,lights_phong_pars_fragment:cv,lights_physical_fragment:uv,lights_physical_pars_fragment:dv,lights_fragment_begin:fv,lights_fragment_maps:hv,lights_fragment_end:pv,logdepthbuf_fragment:mv,logdepthbuf_pars_fragment:gv,logdepthbuf_pars_vertex:_v,logdepthbuf_vertex:vv,map_fragment:yv,map_pars_fragment:xv,map_particle_fragment:bv,map_particle_pars_fragment:Sv,metalnessmap_fragment:Mv,metalnessmap_pars_fragment:Ev,morphinstance_vertex:Tv,morphcolor_vertex:wv,morphnormal_vertex:Av,morphtarget_pars_vertex:Cv,morphtarget_vertex:Rv,normal_fragment_begin:Pv,normal_fragment_maps:Lv,normal_pars_fragment:Dv,normal_pars_vertex:Iv,normal_vertex:Ov,normalmap_pars_fragment:Nv,clearcoat_normal_fragment_begin:Uv,clearcoat_normal_fragment_maps:Fv,clearcoat_pars_fragment:Bv,iridescence_pars_fragment:kv,opaque_fragment:zv,packing:Hv,premultiplied_alpha_fragment:Vv,project_vertex:Gv,dithering_fragment:Wv,dithering_pars_fragment:Xv,roughnessmap_fragment:$v,roughnessmap_pars_fragment:qv,shadowmap_pars_fragment:jv,shadowmap_pars_vertex:Yv,shadowmap_vertex:Kv,shadowmask_pars_fragment:Zv,skinbase_vertex:Jv,skinning_pars_vertex:Qv,skinning_vertex:ey,skinnormal_vertex:ty,specularmap_fragment:ny,specularmap_pars_fragment:iy,tonemapping_fragment:ry,tonemapping_pars_fragment:sy,transmission_fragment:ay,transmission_pars_fragment:oy,uv_pars_fragment:ly,uv_pars_vertex:cy,uv_vertex:uy,worldpos_vertex:dy,background_vert:fy,background_frag:hy,backgroundCube_vert:py,backgroundCube_frag:my,cube_vert:gy,cube_frag:_y,depth_vert:vy,depth_frag:yy,distanceRGBA_vert:xy,distanceRGBA_frag:by,equirect_vert:Sy,equirect_frag:My,linedashed_vert:Ey,linedashed_frag:Ty,meshbasic_vert:wy,meshbasic_frag:Ay,meshlambert_vert:Cy,meshlambert_frag:Ry,meshmatcap_vert:Py,meshmatcap_frag:Ly,meshnormal_vert:Dy,meshnormal_frag:Iy,meshphong_vert:Oy,meshphong_frag:Ny,meshphysical_vert:Uy,meshphysical_frag:Fy,meshtoon_vert:By,meshtoon_frag:ky,points_vert:zy,points_frag:Hy,shadow_vert:Vy,shadow_frag:Gy,sprite_vert:Wy,sprite_frag:Xy},ye={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},kn={basic:{uniforms:jt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:jt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Be(0)}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:jt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:jt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:jt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Be(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:jt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:jt([ye.points,ye.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:jt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:jt([ye.common,ye.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:jt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:jt([ye.sprite,ye.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distanceRGBA:{uniforms:jt([ye.common,ye.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distanceRGBA_vert,fragmentShader:Ye.distanceRGBA_frag},shadow:{uniforms:jt([ye.lights,ye.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};kn.physical={uniforms:jt([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};const oo={r:0,b:0,g:0},cr=new gi,$y=new At;function qy(s,t,n,i,r,a,o){const l=new Be(0);let c=a===!0?0:1,u,d,h=null,f=0,p=null;function v(S){let y=S.isScene===!0?S.background:null;return y&&y.isTexture&&(y=(S.backgroundBlurriness>0?n:t).get(y)),y}function _(S){let y=!1;const x=v(S);x===null?g(l,c):x&&x.isColor&&(g(x,1),y=!0);const R=s.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(s.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(S,y){const x=v(y);x&&(x.isCubeTexture||x.mapping===ol)?(d===void 0&&(d=new Ze(new ut(1,1,1),new qi({name:"BackgroundCubeMaterial",uniforms:Cs(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(R,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),cr.copy(y.backgroundRotation),cr.x*=-1,cr.y*=-1,cr.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(cr.y*=-1,cr.z*=-1),d.material.uniforms.envMap.value=x,d.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4($y.makeRotationFromEuler(cr)),d.material.toneMapped=st.getTransfer(x.colorSpace)!==ct,(h!==x||f!==x.version||p!==s.toneMapping)&&(d.material.needsUpdate=!0,h=x,f=x.version,p=s.toneMapping),d.layers.enableAll(),S.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(u===void 0&&(u=new Ze(new cl(2,2),new qi({name:"BackgroundMaterial",uniforms:Cs(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:$i,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=x,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.toneMapped=st.getTransfer(x.colorSpace)!==ct,x.matrixAutoUpdate===!0&&x.updateMatrix(),u.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||p!==s.toneMapping)&&(u.material.needsUpdate=!0,h=x,f=x.version,p=s.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null))}function g(S,y){S.getRGB(oo,Vh(s)),i.buffers.color.setClear(oo.r,oo.g,oo.b,y,o)}return{getClearColor:function(){return l},setClearColor:function(S,y=1){l.set(S),c=y,g(l,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,g(l,c)},render:_,addToRenderList:m}}function jy(s,t){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},r=f(null);let a=r,o=!1;function l(E,O,G,z,Y){let L=!1;const N=h(z,G,O);a!==N&&(a=N,u(a.object)),L=p(E,z,G,Y),L&&v(E,z,G,Y),Y!==null&&t.update(Y,s.ELEMENT_ARRAY_BUFFER),(L||o)&&(o=!1,x(E,O,G,z),Y!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function c(){return s.createVertexArray()}function u(E){return s.bindVertexArray(E)}function d(E){return s.deleteVertexArray(E)}function h(E,O,G){const z=G.wireframe===!0;let Y=i[E.id];Y===void 0&&(Y={},i[E.id]=Y);let L=Y[O.id];L===void 0&&(L={},Y[O.id]=L);let N=L[z];return N===void 0&&(N=f(c()),L[z]=N),N}function f(E){const O=[],G=[],z=[];for(let Y=0;Y<n;Y++)O[Y]=0,G[Y]=0,z[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:G,attributeDivisors:z,object:E,attributes:{},index:null}}function p(E,O,G,z){const Y=a.attributes,L=O.attributes;let N=0;const k=G.getAttributes();for(const F in k)if(k[F].location>=0){const te=Y[F];let de=L[F];if(de===void 0&&(F==="instanceMatrix"&&E.instanceMatrix&&(de=E.instanceMatrix),F==="instanceColor"&&E.instanceColor&&(de=E.instanceColor)),te===void 0||te.attribute!==de||de&&te.data!==de.data)return!0;N++}return a.attributesNum!==N||a.index!==z}function v(E,O,G,z){const Y={},L=O.attributes;let N=0;const k=G.getAttributes();for(const F in k)if(k[F].location>=0){let te=L[F];te===void 0&&(F==="instanceMatrix"&&E.instanceMatrix&&(te=E.instanceMatrix),F==="instanceColor"&&E.instanceColor&&(te=E.instanceColor));const de={};de.attribute=te,te&&te.data&&(de.data=te.data),Y[F]=de,N++}a.attributes=Y,a.attributesNum=N,a.index=z}function _(){const E=a.newAttributes;for(let O=0,G=E.length;O<G;O++)E[O]=0}function m(E){g(E,0)}function g(E,O){const G=a.newAttributes,z=a.enabledAttributes,Y=a.attributeDivisors;G[E]=1,z[E]===0&&(s.enableVertexAttribArray(E),z[E]=1),Y[E]!==O&&(s.vertexAttribDivisor(E,O),Y[E]=O)}function S(){const E=a.newAttributes,O=a.enabledAttributes;for(let G=0,z=O.length;G<z;G++)O[G]!==E[G]&&(s.disableVertexAttribArray(G),O[G]=0)}function y(E,O,G,z,Y,L,N){N===!0?s.vertexAttribIPointer(E,O,G,Y,L):s.vertexAttribPointer(E,O,G,z,Y,L)}function x(E,O,G,z){_();const Y=z.attributes,L=G.getAttributes(),N=O.defaultAttributeValues;for(const k in L){const F=L[k];if(F.location>=0){let ne=Y[k];if(ne===void 0&&(k==="instanceMatrix"&&E.instanceMatrix&&(ne=E.instanceMatrix),k==="instanceColor"&&E.instanceColor&&(ne=E.instanceColor)),ne!==void 0){const te=ne.normalized,de=ne.itemSize,Oe=t.get(ne);if(Oe===void 0)continue;const Ne=Oe.buffer,J=Oe.type,ae=Oe.bytesPerElement,Te=J===s.INT||J===s.UNSIGNED_INT||ne.gpuType===Su;if(ne.isInterleavedBufferAttribute){const ge=ne.data,ke=ge.stride,je=ne.offset;if(ge.isInstancedInterleavedBuffer){for(let Fe=0;Fe<F.locationSize;Fe++)g(F.location+Fe,ge.meshPerAttribute);E.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let Fe=0;Fe<F.locationSize;Fe++)m(F.location+Fe);s.bindBuffer(s.ARRAY_BUFFER,Ne);for(let Fe=0;Fe<F.locationSize;Fe++)y(F.location+Fe,de/F.locationSize,J,te,ke*ae,(je+de/F.locationSize*Fe)*ae,Te)}else{if(ne.isInstancedBufferAttribute){for(let ge=0;ge<F.locationSize;ge++)g(F.location+ge,ne.meshPerAttribute);E.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ge=0;ge<F.locationSize;ge++)m(F.location+ge);s.bindBuffer(s.ARRAY_BUFFER,Ne);for(let ge=0;ge<F.locationSize;ge++)y(F.location+ge,de/F.locationSize,J,te,de*ae,de/F.locationSize*ge*ae,Te)}}else if(N!==void 0){const te=N[k];if(te!==void 0)switch(te.length){case 2:s.vertexAttrib2fv(F.location,te);break;case 3:s.vertexAttrib3fv(F.location,te);break;case 4:s.vertexAttrib4fv(F.location,te);break;default:s.vertexAttrib1fv(F.location,te)}}}}S()}function R(){I();for(const E in i){const O=i[E];for(const G in O){const z=O[G];for(const Y in z)d(z[Y].object),delete z[Y];delete O[G]}delete i[E]}}function A(E){if(i[E.id]===void 0)return;const O=i[E.id];for(const G in O){const z=O[G];for(const Y in z)d(z[Y].object),delete z[Y];delete O[G]}delete i[E.id]}function w(E){for(const O in i){const G=i[O];if(G[E.id]===void 0)continue;const z=G[E.id];for(const Y in z)d(z[Y].object),delete z[Y];delete G[E.id]}}function I(){M(),o=!0,a!==r&&(a=r,u(a.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:l,reset:I,resetDefaultState:M,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Yy(s,t,n){let i;function r(u){i=u}function a(u,d){s.drawArrays(i,u,d),n.update(d,i,1)}function o(u,d,h){h!==0&&(s.drawArraysInstanced(i,u,d,h),n.update(d,i,h))}function l(u,d,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,d,0,h);let p=0;for(let v=0;v<h;v++)p+=d[v];n.update(p,i,1)}function c(u,d,h,f){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<u.length;v++)o(u[v],d[v],f[v]);else{p.multiDrawArraysInstancedWEBGL(i,u,0,d,0,f,0,h);let v=0;for(let _=0;_<h;_++)v+=d[_];for(let _=0;_<f.length;_++)n.update(v,i,f[_])}}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=l,this.renderMultiDrawInstances=c}function Ky(s,t,n,i){let r;function a(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");r=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==On&&i.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(A){const w=A===Sa&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==mi&&i.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==ui&&!w)}function c(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=n.precision!==void 0?n.precision:"highp";const d=c(u);d!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",d,"instead."),u=d);const h=n.logarithmicDepthBuffer===!0,f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),g=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),S=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),x=p>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:l,precision:u,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:g,maxVaryings:S,maxFragmentUniforms:y,vertexTextures:x,maxSamples:R}}function Zy(s){const t=this;let n=null,i=0,r=!1,a=!1;const o=new Li,l=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||r;return r=f,i=h.length,p},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,f){n=d(h,f,0)},this.setState=function(h,f,p){const v=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,g=s.get(h);if(!r||v===null||v.length===0||a&&!m)a?d(null):u();else{const S=a?0:i,y=S*4;let x=g.clippingState||null;c.value=x,x=d(v,f,y,p);for(let R=0;R!==y;++R)x[R]=n[R];g.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function u(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(h,f,p,v){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,v!==!0||m===null){const g=p+_*4,S=f.matrixWorldInverse;l.getNormalMatrix(S),(m===null||m.length<g)&&(m=new Float32Array(g));for(let y=0,x=p;y!==_;++y,x+=4)o.copy(h[y]).applyMatrix4(S,l),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Jy(s){let t=new WeakMap;function n(o,l){return l===xc?o.mapping=Es:l===bc&&(o.mapping=Ts),o}function i(o){if(o&&o.isTexture){const l=o.mapping;if(l===xc||l===bc)if(t.has(o)){const c=t.get(o).texture;return n(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const u=new c0(c.height);return u.fromEquirectangularTexture(s,o),t.set(o,u),o.addEventListener("dispose",r),n(u.texture,o.mapping)}else return null}}return o}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap}return{get:i,dispose:a}}class qh extends Gh{constructor(t=-1,n=1,i=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-t,o=i+t,l=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=u*this.view.offsetX,o=a+u*this.view.width,l-=d*this.view.offsetY,c=l-d*this.view.height}this.projectionMatrix.makeOrthographic(a,o,l,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const os=4,nf=[.125,.215,.35,.446,.526,.582],gr=20,$l=new qh,rf=new Be;let ql=null,jl=0,Yl=0,Kl=!1;const hr=(1+Math.sqrt(5))/2,rs=1/hr,sf=[new U(-hr,rs,0),new U(hr,rs,0),new U(-rs,0,hr),new U(rs,0,hr),new U(0,hr,-rs),new U(0,hr,rs),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class af{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,r=100){ql=this._renderer.getRenderTarget(),jl=this._renderer.getActiveCubeFace(),Yl=this._renderer.getActiveMipmapLevel(),Kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,i,r,a),n>0&&this._blur(a,0,0,n),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ql,jl,Yl),this._renderer.xr.enabled=Kl,t.scissorTest=!1,lo(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Es||t.mapping===Ts?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ql=this._renderer.getRenderTarget(),jl=this._renderer.getActiveCubeFace(),Yl=this._renderer.getActiveMipmapLevel(),Kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:In,minFilter:In,generateMipmaps:!1,type:Sa,format:On,colorSpace:Zi,depthBuffer:!1},r=of(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=of(t,n,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Qy(a)),this._blurMaterial=ex(a,t,n)}return r}_compileMaterial(t){const n=new Ze(this._lodPlanes[0],t);this._renderer.compile(n,$l)}_sceneToCubeUV(t,n,i,r){const l=new Mn(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(rf),d.toneMapping=zi,d.autoClear=!1;const p=new ot({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),v=new Ze(new ut,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(rf),_=!0);for(let g=0;g<6;g++){const S=g%3;S===0?(l.up.set(0,c[g],0),l.lookAt(u[g],0,0)):S===1?(l.up.set(0,0,c[g]),l.lookAt(0,u[g],0)):(l.up.set(0,c[g],0),l.lookAt(0,0,u[g]));const y=this._cubeSize;lo(r,S*y,g>2?y:0,y,y),d.setRenderTarget(r),_&&d.render(v,l),d.render(t,l)}v.geometry.dispose(),v.material.dispose(),d.toneMapping=f,d.autoClear=h,t.background=m}_textureToCubeUV(t,n){const i=this._renderer,r=t.mapping===Es||t.mapping===Ts;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=cf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lf());const a=r?this._cubemapMaterial:this._equirectMaterial,o=new Ze(this._lodPlanes[0],a),l=a.uniforms;l.envMap.value=t;const c=this._cubeSize;lo(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(o,$l)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let a=1;a<r;a++){const o=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),l=sf[(r-a-1)%sf.length];this._blur(t,a-1,a,o,l)}n.autoClear=i}_blur(t,n,i,r,a){const o=this._pingPongRenderTarget;this._halfBlur(t,o,n,i,r,"latitudinal",a),this._halfBlur(o,t,i,i,r,"longitudinal",a)}_halfBlur(t,n,i,r,a,o,l){const c=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new Ze(this._lodPlanes[r],u),f=u.uniforms,p=this._sizeLods[i]-1,v=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*gr-1),_=a/v,m=isFinite(a)?1+Math.floor(d*_):gr;m>gr&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gr}`);const g=[];let S=0;for(let w=0;w<gr;++w){const I=w/_,M=Math.exp(-I*I/2);g.push(M),w===0?S+=M:w<m&&(S+=2*M)}for(let w=0;w<g.length;w++)g[w]=g[w]/S;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=g,f.latitudinal.value=o==="latitudinal",l&&(f.poleAxis.value=l);const{_lodMax:y}=this;f.dTheta.value=v,f.mipInt.value=y-i;const x=this._sizeLods[r],R=3*x*(r>y-os?r-y+os:0),A=4*(this._cubeSize-x);lo(n,R,A,3*x,2*x),c.setRenderTarget(n),c.render(h,$l)}}function Qy(s){const t=[],n=[],i=[];let r=s;const a=s-os+1+nf.length;for(let o=0;o<a;o++){const l=Math.pow(2,r);n.push(l);let c=1/l;o>s-os?c=nf[o-s+os-1]:o===0&&(c=0),i.push(c);const u=1/(l-2),d=-u,h=1+u,f=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,v=6,_=3,m=2,g=1,S=new Float32Array(_*v*p),y=new Float32Array(m*v*p),x=new Float32Array(g*v*p);for(let A=0;A<p;A++){const w=A%3*2/3-1,I=A>2?0:-1,M=[w,I,0,w+2/3,I,0,w+2/3,I+1,0,w,I,0,w+2/3,I+1,0,w,I+1,0];S.set(M,_*v*A),y.set(f,m*v*A);const E=[A,A,A,A,A,A];x.set(E,g*v*A)}const R=new xi;R.setAttribute("position",new $n(S,_)),R.setAttribute("uv",new $n(y,m)),R.setAttribute("faceIndex",new $n(x,g)),t.push(R),r>os&&r--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function of(s,t,n){const i=new Ar(s,t,n);return i.texture.mapping=ol,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function lo(s,t,n,i,r){s.viewport.set(t,n,i,r),s.scissor.set(t,n,i,r)}function ex(s,t,n){const i=new Float32Array(gr),r=new U(0,1,0);return new qi({name:"SphericalGaussianBlur",defines:{n:gr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function lf(){return new qi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function cf(){return new qi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function Lu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function tx(s){let t=new WeakMap,n=null;function i(l){if(l&&l.isTexture){const c=l.mapping,u=c===xc||c===bc,d=c===Es||c===Ts;if(u||d){let h=t.get(l);const f=h!==void 0?h.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==f)return n===null&&(n=new af(s)),h=u?n.fromEquirectangular(l,h):n.fromCubemap(l,h),h.texture.pmremVersion=l.pmremVersion,t.set(l,h),h.texture;if(h!==void 0)return h.texture;{const p=l.image;return u&&p&&p.height>0||d&&p&&r(p)?(n===null&&(n=new af(s)),h=u?n.fromEquirectangular(l):n.fromCubemap(l),h.texture.pmremVersion=l.pmremVersion,t.set(l,h),l.addEventListener("dispose",a),h.texture):null}}}return l}function r(l){let c=0;const u=6;for(let d=0;d<u;d++)l[d]!==void 0&&c++;return c===u}function a(l){const c=l.target;c.removeEventListener("dispose",a);const u=t.get(c);u!==void 0&&(t.delete(c),u.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function nx(s){const t={};function n(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=s.getExtension(i)}return t[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Qs("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function ix(s,t,n,i){const r={},a=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const v in f.attributes)t.remove(f.attributes[v]);for(const v in f.morphAttributes){const _=f.morphAttributes[v];for(let m=0,g=_.length;m<g;m++)t.remove(_[m])}f.removeEventListener("dispose",o),delete r[f.id];const p=a.get(f);p&&(t.remove(p),a.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function l(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function c(h){const f=h.attributes;for(const v in f)t.update(f[v],s.ARRAY_BUFFER);const p=h.morphAttributes;for(const v in p){const _=p[v];for(let m=0,g=_.length;m<g;m++)t.update(_[m],s.ARRAY_BUFFER)}}function u(h){const f=[],p=h.index,v=h.attributes.position;let _=0;if(p!==null){const S=p.array;_=p.version;for(let y=0,x=S.length;y<x;y+=3){const R=S[y+0],A=S[y+1],w=S[y+2];f.push(R,A,A,w,w,R)}}else if(v!==void 0){const S=v.array;_=v.version;for(let y=0,x=S.length/3-1;y<x;y+=3){const R=y+0,A=y+1,w=y+2;f.push(R,A,A,w,w,R)}}else return;const m=new(Oh(f)?Hh:zh)(f,1);m.version=_;const g=a.get(h);g&&t.remove(g),a.set(h,m)}function d(h){const f=a.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&u(h)}else u(h);return a.get(h)}return{get:l,update:c,getWireframeAttribute:d}}function rx(s,t,n){let i;function r(f){i=f}let a,o;function l(f){a=f.type,o=f.bytesPerElement}function c(f,p){s.drawElements(i,p,a,f*o),n.update(p,i,1)}function u(f,p,v){v!==0&&(s.drawElementsInstanced(i,p,a,f*o,v),n.update(p,i,v))}function d(f,p,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,a,f,0,v);let m=0;for(let g=0;g<v;g++)m+=p[g];n.update(m,i,1)}function h(f,p,v,_){if(v===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f.length;g++)u(f[g]/o,p[g],_[g]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,a,f,0,_,0,v);let g=0;for(let S=0;S<v;S++)g+=p[S];for(let S=0;S<_.length;S++)n.update(g,i,_[S])}}this.setMode=r,this.setIndex=l,this.render=c,this.renderInstances=u,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function sx(s){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,l){switch(n.calls++,o){case s.TRIANGLES:n.triangles+=l*(a/3);break;case s.LINES:n.lines+=l*(a/2);break;case s.LINE_STRIP:n.lines+=l*(a-1);break;case s.LINE_LOOP:n.lines+=l*a;break;case s.POINTS:n.points+=l*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function ax(s,t,n){const i=new WeakMap,r=new Nt;function a(o,l,c){const u=o.morphTargetInfluences,d=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,h=d!==void 0?d.length:0;let f=i.get(l);if(f===void 0||f.count!==h){let E=function(){I.dispose(),i.delete(l),l.removeEventListener("dispose",E)};var p=E;f!==void 0&&f.texture.dispose();const v=l.morphAttributes.position!==void 0,_=l.morphAttributes.normal!==void 0,m=l.morphAttributes.color!==void 0,g=l.morphAttributes.position||[],S=l.morphAttributes.normal||[],y=l.morphAttributes.color||[];let x=0;v===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let R=l.attributes.position.count*x,A=1;R>t.maxTextureSize&&(A=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const w=new Float32Array(R*A*4*h),I=new Uh(w,R,A,h);I.type=ui,I.needsUpdate=!0;const M=x*4;for(let O=0;O<h;O++){const G=g[O],z=S[O],Y=y[O],L=R*A*4*O;for(let N=0;N<G.count;N++){const k=N*M;v===!0&&(r.fromBufferAttribute(G,N),w[L+k+0]=r.x,w[L+k+1]=r.y,w[L+k+2]=r.z,w[L+k+3]=0),_===!0&&(r.fromBufferAttribute(z,N),w[L+k+4]=r.x,w[L+k+5]=r.y,w[L+k+6]=r.z,w[L+k+7]=0),m===!0&&(r.fromBufferAttribute(Y,N),w[L+k+8]=r.x,w[L+k+9]=r.y,w[L+k+10]=r.z,w[L+k+11]=Y.itemSize===4?r.w:1)}}f={count:h,texture:I,size:new he(R,A)},i.set(l,f),l.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,n);else{let v=0;for(let m=0;m<u.length;m++)v+=u[m];const _=l.morphTargetsRelative?1:1-v;c.getUniforms().setValue(s,"morphTargetBaseInfluence",_),c.getUniforms().setValue(s,"morphTargetInfluences",u)}c.getUniforms().setValue(s,"morphTargetsTexture",f.texture,n),c.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:a}}function ox(s,t,n,i){let r=new WeakMap;function a(c){const u=i.render.frame,d=c.geometry,h=t.get(c,d);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(n.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:a,dispose:o}}class jh extends Zt{constructor(t,n,i,r,a,o,l,c,u,d=ms){if(d!==ms&&d!==As)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===ms&&(i=wr),i===void 0&&d===As&&(i=ws),super(null,r,a,o,l,c,d,i,u),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=l!==void 0?l:En,this.minFilter=c!==void 0?c:En,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const Yh=new Zt,uf=new jh(1,1),Kh=new Uh,Zh=new q_,Jh=new Wh,df=[],ff=[],hf=new Float32Array(16),pf=new Float32Array(9),mf=new Float32Array(4);function Ns(s,t,n){const i=s[0];if(i<=0||i>0)return s;const r=t*n;let a=df[r];if(a===void 0&&(a=new Float32Array(r),df[r]=a),t!==0){i.toArray(a,0);for(let o=1,l=0;o!==t;++o)l+=n,s[o].toArray(a,l)}return a}function Pt(s,t){if(s.length!==t.length)return!1;for(let n=0,i=s.length;n<i;n++)if(s[n]!==t[n])return!1;return!0}function Lt(s,t){for(let n=0,i=t.length;n<i;n++)s[n]=t[n]}function ul(s,t){let n=ff[t];n===void 0&&(n=new Int32Array(t),ff[t]=n);for(let i=0;i!==t;++i)n[i]=s.allocateTextureUnit();return n}function lx(s,t){const n=this.cache;n[0]!==t&&(s.uniform1f(this.addr,t),n[0]=t)}function cx(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Pt(n,t))return;s.uniform2fv(this.addr,t),Lt(n,t)}}function ux(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Pt(n,t))return;s.uniform3fv(this.addr,t),Lt(n,t)}}function dx(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Pt(n,t))return;s.uniform4fv(this.addr,t),Lt(n,t)}}function fx(s,t){const n=this.cache,i=t.elements;if(i===void 0){if(Pt(n,t))return;s.uniformMatrix2fv(this.addr,!1,t),Lt(n,t)}else{if(Pt(n,i))return;mf.set(i),s.uniformMatrix2fv(this.addr,!1,mf),Lt(n,i)}}function hx(s,t){const n=this.cache,i=t.elements;if(i===void 0){if(Pt(n,t))return;s.uniformMatrix3fv(this.addr,!1,t),Lt(n,t)}else{if(Pt(n,i))return;pf.set(i),s.uniformMatrix3fv(this.addr,!1,pf),Lt(n,i)}}function px(s,t){const n=this.cache,i=t.elements;if(i===void 0){if(Pt(n,t))return;s.uniformMatrix4fv(this.addr,!1,t),Lt(n,t)}else{if(Pt(n,i))return;hf.set(i),s.uniformMatrix4fv(this.addr,!1,hf),Lt(n,i)}}function mx(s,t){const n=this.cache;n[0]!==t&&(s.uniform1i(this.addr,t),n[0]=t)}function gx(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Pt(n,t))return;s.uniform2iv(this.addr,t),Lt(n,t)}}function _x(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Pt(n,t))return;s.uniform3iv(this.addr,t),Lt(n,t)}}function vx(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Pt(n,t))return;s.uniform4iv(this.addr,t),Lt(n,t)}}function yx(s,t){const n=this.cache;n[0]!==t&&(s.uniform1ui(this.addr,t),n[0]=t)}function xx(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Pt(n,t))return;s.uniform2uiv(this.addr,t),Lt(n,t)}}function bx(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Pt(n,t))return;s.uniform3uiv(this.addr,t),Lt(n,t)}}function Sx(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Pt(n,t))return;s.uniform4uiv(this.addr,t),Lt(n,t)}}function Mx(s,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(s.uniform1i(this.addr,r),i[0]=r);let a;this.type===s.SAMPLER_2D_SHADOW?(uf.compareFunction=Ih,a=uf):a=Yh,n.setTexture2D(t||a,r)}function Ex(s,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(s.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||Zh,r)}function Tx(s,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(s.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(t||Jh,r)}function wx(s,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(s.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||Kh,r)}function Ax(s){switch(s){case 5126:return lx;case 35664:return cx;case 35665:return ux;case 35666:return dx;case 35674:return fx;case 35675:return hx;case 35676:return px;case 5124:case 35670:return mx;case 35667:case 35671:return gx;case 35668:case 35672:return _x;case 35669:case 35673:return vx;case 5125:return yx;case 36294:return xx;case 36295:return bx;case 36296:return Sx;case 35678:case 36198:case 36298:case 36306:case 35682:return Mx;case 35679:case 36299:case 36307:return Ex;case 35680:case 36300:case 36308:case 36293:return Tx;case 36289:case 36303:case 36311:case 36292:return wx}}function Cx(s,t){s.uniform1fv(this.addr,t)}function Rx(s,t){const n=Ns(t,this.size,2);s.uniform2fv(this.addr,n)}function Px(s,t){const n=Ns(t,this.size,3);s.uniform3fv(this.addr,n)}function Lx(s,t){const n=Ns(t,this.size,4);s.uniform4fv(this.addr,n)}function Dx(s,t){const n=Ns(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,n)}function Ix(s,t){const n=Ns(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,n)}function Ox(s,t){const n=Ns(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,n)}function Nx(s,t){s.uniform1iv(this.addr,t)}function Ux(s,t){s.uniform2iv(this.addr,t)}function Fx(s,t){s.uniform3iv(this.addr,t)}function Bx(s,t){s.uniform4iv(this.addr,t)}function kx(s,t){s.uniform1uiv(this.addr,t)}function zx(s,t){s.uniform2uiv(this.addr,t)}function Hx(s,t){s.uniform3uiv(this.addr,t)}function Vx(s,t){s.uniform4uiv(this.addr,t)}function Gx(s,t,n){const i=this.cache,r=t.length,a=ul(n,r);Pt(i,a)||(s.uniform1iv(this.addr,a),Lt(i,a));for(let o=0;o!==r;++o)n.setTexture2D(t[o]||Yh,a[o])}function Wx(s,t,n){const i=this.cache,r=t.length,a=ul(n,r);Pt(i,a)||(s.uniform1iv(this.addr,a),Lt(i,a));for(let o=0;o!==r;++o)n.setTexture3D(t[o]||Zh,a[o])}function Xx(s,t,n){const i=this.cache,r=t.length,a=ul(n,r);Pt(i,a)||(s.uniform1iv(this.addr,a),Lt(i,a));for(let o=0;o!==r;++o)n.setTextureCube(t[o]||Jh,a[o])}function $x(s,t,n){const i=this.cache,r=t.length,a=ul(n,r);Pt(i,a)||(s.uniform1iv(this.addr,a),Lt(i,a));for(let o=0;o!==r;++o)n.setTexture2DArray(t[o]||Kh,a[o])}function qx(s){switch(s){case 5126:return Cx;case 35664:return Rx;case 35665:return Px;case 35666:return Lx;case 35674:return Dx;case 35675:return Ix;case 35676:return Ox;case 5124:case 35670:return Nx;case 35667:case 35671:return Ux;case 35668:case 35672:return Fx;case 35669:case 35673:return Bx;case 5125:return kx;case 36294:return zx;case 36295:return Hx;case 36296:return Vx;case 35678:case 36198:case 36298:case 36306:case 35682:return Gx;case 35679:case 36299:case 36307:return Wx;case 35680:case 36300:case 36308:case 36293:return Xx;case 36289:case 36303:case 36311:case 36292:return $x}}class jx{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=Ax(n.type)}}class Yx{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=qx(n.type)}}class Kx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const l=r[a];l.setValue(t,n[l.id],i)}}}const Zl=/(\w+)(\])?(\[|\.)?/g;function gf(s,t){s.seq.push(t),s.map[t.id]=t}function Zx(s,t,n){const i=s.name,r=i.length;for(Zl.lastIndex=0;;){const a=Zl.exec(i),o=Zl.lastIndex;let l=a[1];const c=a[2]==="]",u=a[3];if(c&&(l=l|0),u===void 0||u==="["&&o+2===r){gf(n,u===void 0?new jx(l,s,t):new Yx(l,s,t));break}else{let h=n.map[l];h===void 0&&(h=new Kx(l),gf(n,h)),n=h}}}class Do{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const a=t.getActiveUniform(n,r),o=t.getUniformLocation(n,a.name);Zx(a,o,this)}}setValue(t,n,i,r){const a=this.map[n];a!==void 0&&a.setValue(t,i,r)}setOptional(t,n,i){const r=n[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,n,i,r){for(let a=0,o=n.length;a!==o;++a){const l=n[a],c=i[l.id];c.needsUpdate!==!1&&l.setValue(t,c.value,r)}}static seqWithValue(t,n){const i=[];for(let r=0,a=t.length;r!==a;++r){const o=t[r];o.id in n&&i.push(o)}return i}}function _f(s,t,n){const i=s.createShader(t);return s.shaderSource(i,n),s.compileShader(i),i}const Jx=37297;let Qx=0;function eb(s,t){const n=s.split(`
`),i=[],r=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let o=r;o<a;o++){const l=o+1;i.push(`${l===t?">":" "} ${l}: ${n[o]}`)}return i.join(`
`)}function tb(s){const t=st.getPrimaries(st.workingColorSpace),n=st.getPrimaries(s);let i;switch(t===n?i="":t===$o&&n===Xo?i="LinearDisplayP3ToLinearSRGB":t===Xo&&n===$o&&(i="LinearSRGBToLinearDisplayP3"),s){case Zi:case ll:return[i,"LinearTransferOETF"];case Un:case Cu:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[i,"LinearTransferOETF"]}}function vf(s,t,n){const i=s.getShaderParameter(t,s.COMPILE_STATUS),r=s.getShaderInfoLog(t).trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+r+`

`+eb(s.getShaderSource(t),o)}else return r}function nb(s,t){const n=tb(t);return`vec4 ${s}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function ib(s,t){let n;switch(t){case s_:n="Linear";break;case a_:n="Reinhard";break;case o_:n="OptimizedCineon";break;case l_:n="ACESFilmic";break;case u_:n="AgX";break;case d_:n="Neutral";break;case c_:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+s+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const co=new U;function rb(){st.getLuminanceCoefficients(co);const s=co.x.toFixed(4),t=co.y.toFixed(4),n=co.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sb(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xs).join(`
`)}function ab(s){const t=[];for(const n in s){const i=s[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function ob(s,t){const n={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=s.getActiveAttrib(t,r),o=a.name;let l=1;a.type===s.FLOAT_MAT2&&(l=2),a.type===s.FLOAT_MAT3&&(l=3),a.type===s.FLOAT_MAT4&&(l=4),n[o]={type:a.type,location:s.getAttribLocation(t,o),locationSize:l}}return n}function Xs(s){return s!==""}function yf(s,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function xf(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const lb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kc(s){return s.replace(lb,ub)}const cb=new Map;function ub(s,t){let n=Ye[t];if(n===void 0){const i=cb.get(t);if(i!==void 0)n=Ye[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Kc(n)}const db=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bf(s){return s.replace(db,fb)}function fb(s,t,n,i){let r="";for(let a=parseInt(t);a<parseInt(n);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Sf(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function hb(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===yh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Lg?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ai&&(t="SHADOWMAP_TYPE_VSM"),t}function pb(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Es:case Ts:t="ENVMAP_TYPE_CUBE";break;case ol:t="ENVMAP_TYPE_CUBE_UV";break}return t}function mb(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ts:t="ENVMAP_MODE_REFRACTION";break}return t}function gb(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case xh:t="ENVMAP_BLENDING_MULTIPLY";break;case i_:t="ENVMAP_BLENDING_MIX";break;case r_:t="ENVMAP_BLENDING_ADD";break}return t}function _b(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function vb(s,t,n,i){const r=s.getContext(),a=n.defines;let o=n.vertexShader,l=n.fragmentShader;const c=hb(n),u=pb(n),d=mb(n),h=gb(n),f=_b(n),p=sb(n),v=ab(a),_=r.createProgram();let m,g,S=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(Xs).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(Xs).join(`
`),g.length>0&&(g+=`
`)):(m=[Sf(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xs).join(`
`),g=[Sf(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+d:"",n.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==zi?"#define TONE_MAPPING":"",n.toneMapping!==zi?Ye.tonemapping_pars_fragment:"",n.toneMapping!==zi?ib("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,nb("linearToOutputTexel",n.outputColorSpace),rb(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Xs).join(`
`)),o=Kc(o),o=yf(o,n),o=xf(o,n),l=Kc(l),l=yf(l,n),l=xf(l,n),o=bf(o),l=bf(l),n.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",n.glslVersion===Nd?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Nd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const y=S+m+o,x=S+g+l,R=_f(r,r.VERTEX_SHADER,y),A=_f(r,r.FRAGMENT_SHADER,x);r.attachShader(_,R),r.attachShader(_,A),n.index0AttributeName!==void 0?r.bindAttribLocation(_,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function w(O){if(s.debug.checkShaderErrors){const G=r.getProgramInfoLog(_).trim(),z=r.getShaderInfoLog(R).trim(),Y=r.getShaderInfoLog(A).trim();let L=!0,N=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(L=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(r,_,R,A);else{const k=vf(r,R,"vertex"),F=vf(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+G+`
`+k+`
`+F)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(z===""||Y==="")&&(N=!1);N&&(O.diagnostics={runnable:L,programLog:G,vertexShader:{log:z,prefix:m},fragmentShader:{log:Y,prefix:g}})}r.deleteShader(R),r.deleteShader(A),I=new Do(r,_),M=ob(r,_)}let I;this.getUniforms=function(){return I===void 0&&w(this),I};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(_,Jx)),E},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Qx++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=A,this}let yb=0;class xb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(n),a=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new bb(t),n.set(t,i)),i}}class bb{constructor(t){this.id=yb++,this.code=t,this.usedTimes=0}}function Sb(s,t,n,i,r,a,o){const l=new Bh,c=new xb,u=new Set,d=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return u.add(M),M===0?"uv":`uv${M}`}function m(M,E,O,G,z){const Y=G.fog,L=z.geometry,N=M.isMeshStandardMaterial?G.environment:null,k=(M.isMeshStandardMaterial?n:t).get(M.envMap||N),F=k&&k.mapping===ol?k.image.height:null,ne=v[M.type];M.precision!==null&&(p=r.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const te=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,de=te!==void 0?te.length:0;let Oe=0;L.morphAttributes.position!==void 0&&(Oe=1),L.morphAttributes.normal!==void 0&&(Oe=2),L.morphAttributes.color!==void 0&&(Oe=3);let Ne,J,ae,Te;if(ne){const tt=kn[ne];Ne=tt.vertexShader,J=tt.fragmentShader}else Ne=M.vertexShader,J=M.fragmentShader,c.update(M),ae=c.getVertexShaderID(M),Te=c.getFragmentShaderID(M);const ge=s.getRenderTarget(),ke=z.isInstancedMesh===!0,je=z.isBatchedMesh===!0,Fe=!!M.map,Qe=!!M.matcap,P=!!k,ue=!!M.aoMap,oe=!!M.lightMap,_e=!!M.bumpMap,ee=!!M.normalMap,Ie=!!M.displacementMap,ve=!!M.emissiveMap,Ee=!!M.metalnessMap,D=!!M.roughnessMap,T=M.anisotropy>0,q=M.clearcoat>0,se=M.dispersion>0,re=M.iridescence>0,ie=M.sheen>0,Pe=M.transmission>0,me=T&&!!M.anisotropyMap,Se=q&&!!M.clearcoatMap,$e=q&&!!M.clearcoatNormalMap,ce=q&&!!M.clearcoatRoughnessMap,be=re&&!!M.iridescenceMap,Je=re&&!!M.iridescenceThicknessMap,ze=ie&&!!M.sheenColorMap,we=ie&&!!M.sheenRoughnessMap,Ve=!!M.specularMap,qe=!!M.specularColorMap,dt=!!M.specularIntensityMap,b=Pe&&!!M.transmissionMap,W=Pe&&!!M.thicknessMap,X=!!M.gradientMap,Z=!!M.alphaMap,le=M.alphaTest>0,Le=!!M.alphaHash,Ge=!!M.extensions;let xt=zi;M.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(xt=s.toneMapping);const Ct={shaderID:ne,shaderType:M.type,shaderName:M.name,vertexShader:Ne,fragmentShader:J,defines:M.defines,customVertexShaderID:ae,customFragmentShaderID:Te,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:je,batchingColor:je&&z._colorsTexture!==null,instancing:ke,instancingColor:ke&&z.instanceColor!==null,instancingMorph:ke&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ge===null?s.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Zi,alphaToCoverage:!!M.alphaToCoverage,map:Fe,matcap:Qe,envMap:P,envMapMode:P&&k.mapping,envMapCubeUVHeight:F,aoMap:ue,lightMap:oe,bumpMap:_e,normalMap:ee,displacementMap:f&&Ie,emissiveMap:ve,normalMapObjectSpace:ee&&M.normalMapType===m_,normalMapTangentSpace:ee&&M.normalMapType===Dh,metalnessMap:Ee,roughnessMap:D,anisotropy:T,anisotropyMap:me,clearcoat:q,clearcoatMap:Se,clearcoatNormalMap:$e,clearcoatRoughnessMap:ce,dispersion:se,iridescence:re,iridescenceMap:be,iridescenceThicknessMap:Je,sheen:ie,sheenColorMap:ze,sheenRoughnessMap:we,specularMap:Ve,specularColorMap:qe,specularIntensityMap:dt,transmission:Pe,transmissionMap:b,thicknessMap:W,gradientMap:X,opaque:M.transparent===!1&&M.blending===ps&&M.alphaToCoverage===!1,alphaMap:Z,alphaTest:le,alphaHash:Le,combine:M.combine,mapUv:Fe&&_(M.map.channel),aoMapUv:ue&&_(M.aoMap.channel),lightMapUv:oe&&_(M.lightMap.channel),bumpMapUv:_e&&_(M.bumpMap.channel),normalMapUv:ee&&_(M.normalMap.channel),displacementMapUv:Ie&&_(M.displacementMap.channel),emissiveMapUv:ve&&_(M.emissiveMap.channel),metalnessMapUv:Ee&&_(M.metalnessMap.channel),roughnessMapUv:D&&_(M.roughnessMap.channel),anisotropyMapUv:me&&_(M.anisotropyMap.channel),clearcoatMapUv:Se&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:$e&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:we&&_(M.sheenRoughnessMap.channel),specularMapUv:Ve&&_(M.specularMap.channel),specularColorMapUv:qe&&_(M.specularColorMap.channel),specularIntensityMapUv:dt&&_(M.specularIntensityMap.channel),transmissionMapUv:b&&_(M.transmissionMap.channel),thicknessMapUv:W&&_(M.thicknessMap.channel),alphaMapUv:Z&&_(M.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(ee||T),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!L.attributes.uv&&(Fe||Z),fog:!!Y,useFog:M.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:z.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Oe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&O.length>0,shadowMapType:s.shadowMap.type,toneMapping:xt,decodeVideoTexture:Fe&&M.map.isVideoTexture===!0&&st.getTransfer(M.map.colorSpace)===ct,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===ci,flipSided:M.side===en,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ge&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&M.extensions.multiDraw===!0||je)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Ct.vertexUv1s=u.has(1),Ct.vertexUv2s=u.has(2),Ct.vertexUv3s=u.has(3),u.clear(),Ct}function g(M){const E=[];if(M.shaderID?E.push(M.shaderID):(E.push(M.customVertexShaderID),E.push(M.customFragmentShaderID)),M.defines!==void 0)for(const O in M.defines)E.push(O),E.push(M.defines[O]);return M.isRawShaderMaterial===!1&&(S(E,M),y(E,M),E.push(s.outputColorSpace)),E.push(M.customProgramCacheKey),E.join()}function S(M,E){M.push(E.precision),M.push(E.outputColorSpace),M.push(E.envMapMode),M.push(E.envMapCubeUVHeight),M.push(E.mapUv),M.push(E.alphaMapUv),M.push(E.lightMapUv),M.push(E.aoMapUv),M.push(E.bumpMapUv),M.push(E.normalMapUv),M.push(E.displacementMapUv),M.push(E.emissiveMapUv),M.push(E.metalnessMapUv),M.push(E.roughnessMapUv),M.push(E.anisotropyMapUv),M.push(E.clearcoatMapUv),M.push(E.clearcoatNormalMapUv),M.push(E.clearcoatRoughnessMapUv),M.push(E.iridescenceMapUv),M.push(E.iridescenceThicknessMapUv),M.push(E.sheenColorMapUv),M.push(E.sheenRoughnessMapUv),M.push(E.specularMapUv),M.push(E.specularColorMapUv),M.push(E.specularIntensityMapUv),M.push(E.transmissionMapUv),M.push(E.thicknessMapUv),M.push(E.combine),M.push(E.fogExp2),M.push(E.sizeAttenuation),M.push(E.morphTargetsCount),M.push(E.morphAttributeCount),M.push(E.numDirLights),M.push(E.numPointLights),M.push(E.numSpotLights),M.push(E.numSpotLightMaps),M.push(E.numHemiLights),M.push(E.numRectAreaLights),M.push(E.numDirLightShadows),M.push(E.numPointLightShadows),M.push(E.numSpotLightShadows),M.push(E.numSpotLightShadowsWithMaps),M.push(E.numLightProbes),M.push(E.shadowMapType),M.push(E.toneMapping),M.push(E.numClippingPlanes),M.push(E.numClipIntersection),M.push(E.depthPacking)}function y(M,E){l.disableAll(),E.supportsVertexTextures&&l.enable(0),E.instancing&&l.enable(1),E.instancingColor&&l.enable(2),E.instancingMorph&&l.enable(3),E.matcap&&l.enable(4),E.envMap&&l.enable(5),E.normalMapObjectSpace&&l.enable(6),E.normalMapTangentSpace&&l.enable(7),E.clearcoat&&l.enable(8),E.iridescence&&l.enable(9),E.alphaTest&&l.enable(10),E.vertexColors&&l.enable(11),E.vertexAlphas&&l.enable(12),E.vertexUv1s&&l.enable(13),E.vertexUv2s&&l.enable(14),E.vertexUv3s&&l.enable(15),E.vertexTangents&&l.enable(16),E.anisotropy&&l.enable(17),E.alphaHash&&l.enable(18),E.batching&&l.enable(19),E.dispersion&&l.enable(20),E.batchingColor&&l.enable(21),M.push(l.mask),l.disableAll(),E.fog&&l.enable(0),E.useFog&&l.enable(1),E.flatShading&&l.enable(2),E.logarithmicDepthBuffer&&l.enable(3),E.skinning&&l.enable(4),E.morphTargets&&l.enable(5),E.morphNormals&&l.enable(6),E.morphColors&&l.enable(7),E.premultipliedAlpha&&l.enable(8),E.shadowMapEnabled&&l.enable(9),E.doubleSided&&l.enable(10),E.flipSided&&l.enable(11),E.useDepthPacking&&l.enable(12),E.dithering&&l.enable(13),E.transmission&&l.enable(14),E.sheen&&l.enable(15),E.opaque&&l.enable(16),E.pointsUvs&&l.enable(17),E.decodeVideoTexture&&l.enable(18),E.alphaToCoverage&&l.enable(19),M.push(l.mask)}function x(M){const E=v[M.type];let O;if(E){const G=kn[E];O=s0.clone(G.uniforms)}else O=M.uniforms;return O}function R(M,E){let O;for(let G=0,z=d.length;G<z;G++){const Y=d[G];if(Y.cacheKey===E){O=Y,++O.usedTimes;break}}return O===void 0&&(O=new vb(s,E,M,a),d.push(O)),O}function A(M){if(--M.usedTimes===0){const E=d.indexOf(M);d[E]=d[d.length-1],d.pop(),M.destroy()}}function w(M){c.remove(M)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:x,acquireProgram:R,releaseProgram:A,releaseShaderCache:w,programs:d,dispose:I}}function Mb(){let s=new WeakMap;function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{get:t,remove:n,update:i,dispose:r}}function Eb(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Mf(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Ef(){const s=[];let t=0;const n=[],i=[],r=[];function a(){t=0,n.length=0,i.length=0,r.length=0}function o(h,f,p,v,_,m){let g=s[t];return g===void 0?(g={id:h.id,object:h,geometry:f,material:p,groupOrder:v,renderOrder:h.renderOrder,z:_,group:m},s[t]=g):(g.id=h.id,g.object=h,g.geometry=f,g.material=p,g.groupOrder=v,g.renderOrder=h.renderOrder,g.z=_,g.group=m),t++,g}function l(h,f,p,v,_,m){const g=o(h,f,p,v,_,m);p.transmission>0?i.push(g):p.transparent===!0?r.push(g):n.push(g)}function c(h,f,p,v,_,m){const g=o(h,f,p,v,_,m);p.transmission>0?i.unshift(g):p.transparent===!0?r.unshift(g):n.unshift(g)}function u(h,f){n.length>1&&n.sort(h||Eb),i.length>1&&i.sort(f||Mf),r.length>1&&r.sort(f||Mf)}function d(){for(let h=t,f=s.length;h<f;h++){const p=s[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:a,push:l,unshift:c,finish:d,sort:u}}function Tb(){let s=new WeakMap;function t(i,r){const a=s.get(i);let o;return a===void 0?(o=new Ef,s.set(i,[o])):r>=a.length?(o=new Ef,a.push(o)):o=a[r],o}function n(){s=new WeakMap}return{get:t,dispose:n}}function wb(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new U,color:new Be};break;case"SpotLight":n={position:new U,direction:new U,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new U,color:new Be,distance:0,decay:0};break;case"HemisphereLight":n={direction:new U,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":n={color:new Be,position:new U,halfWidth:new U,halfHeight:new U};break}return s[t.id]=n,n}}}function Ab(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=n,n}}}let Cb=0;function Rb(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Pb(s){const t=new wb,n=Ab(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new U);const r=new U,a=new At,o=new At;function l(u){let d=0,h=0,f=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let p=0,v=0,_=0,m=0,g=0,S=0,y=0,x=0,R=0,A=0,w=0;u.sort(Rb);for(let M=0,E=u.length;M<E;M++){const O=u[M],G=O.color,z=O.intensity,Y=O.distance,L=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)d+=G.r*z,h+=G.g*z,f+=G.b*z;else if(O.isLightProbe){for(let N=0;N<9;N++)i.probe[N].addScaledVector(O.sh.coefficients[N],z);w++}else if(O.isDirectionalLight){const N=t.get(O);if(N.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const k=O.shadow,F=n.get(O);F.shadowIntensity=k.intensity,F.shadowBias=k.bias,F.shadowNormalBias=k.normalBias,F.shadowRadius=k.radius,F.shadowMapSize=k.mapSize,i.directionalShadow[p]=F,i.directionalShadowMap[p]=L,i.directionalShadowMatrix[p]=O.shadow.matrix,S++}i.directional[p]=N,p++}else if(O.isSpotLight){const N=t.get(O);N.position.setFromMatrixPosition(O.matrixWorld),N.color.copy(G).multiplyScalar(z),N.distance=Y,N.coneCos=Math.cos(O.angle),N.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),N.decay=O.decay,i.spot[_]=N;const k=O.shadow;if(O.map&&(i.spotLightMap[R]=O.map,R++,k.updateMatrices(O),O.castShadow&&A++),i.spotLightMatrix[_]=k.matrix,O.castShadow){const F=n.get(O);F.shadowIntensity=k.intensity,F.shadowBias=k.bias,F.shadowNormalBias=k.normalBias,F.shadowRadius=k.radius,F.shadowMapSize=k.mapSize,i.spotShadow[_]=F,i.spotShadowMap[_]=L,x++}_++}else if(O.isRectAreaLight){const N=t.get(O);N.color.copy(G).multiplyScalar(z),N.halfWidth.set(O.width*.5,0,0),N.halfHeight.set(0,O.height*.5,0),i.rectArea[m]=N,m++}else if(O.isPointLight){const N=t.get(O);if(N.color.copy(O.color).multiplyScalar(O.intensity),N.distance=O.distance,N.decay=O.decay,O.castShadow){const k=O.shadow,F=n.get(O);F.shadowIntensity=k.intensity,F.shadowBias=k.bias,F.shadowNormalBias=k.normalBias,F.shadowRadius=k.radius,F.shadowMapSize=k.mapSize,F.shadowCameraNear=k.camera.near,F.shadowCameraFar=k.camera.far,i.pointShadow[v]=F,i.pointShadowMap[v]=L,i.pointShadowMatrix[v]=O.shadow.matrix,y++}i.point[v]=N,v++}else if(O.isHemisphereLight){const N=t.get(O);N.skyColor.copy(O.color).multiplyScalar(z),N.groundColor.copy(O.groundColor).multiplyScalar(z),i.hemi[g]=N,g++}}m>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_FLOAT_1,i.rectAreaLTC2=ye.LTC_FLOAT_2):(i.rectAreaLTC1=ye.LTC_HALF_1,i.rectAreaLTC2=ye.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=f;const I=i.hash;(I.directionalLength!==p||I.pointLength!==v||I.spotLength!==_||I.rectAreaLength!==m||I.hemiLength!==g||I.numDirectionalShadows!==S||I.numPointShadows!==y||I.numSpotShadows!==x||I.numSpotMaps!==R||I.numLightProbes!==w)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=v,i.hemi.length=g,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=x+R-A,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=w,I.directionalLength=p,I.pointLength=v,I.spotLength=_,I.rectAreaLength=m,I.hemiLength=g,I.numDirectionalShadows=S,I.numPointShadows=y,I.numSpotShadows=x,I.numSpotMaps=R,I.numLightProbes=w,i.version=Cb++)}function c(u,d){let h=0,f=0,p=0,v=0,_=0;const m=d.matrixWorldInverse;for(let g=0,S=u.length;g<S;g++){const y=u[g];if(y.isDirectionalLight){const x=i.directional[h];x.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),h++}else if(y.isSpotLight){const x=i.spot[p];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),p++}else if(y.isRectAreaLight){const x=i.rectArea[v];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),o.identity(),a.copy(y.matrixWorld),a.premultiply(m),o.extractRotation(a),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),v++}else if(y.isPointLight){const x=i.point[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const x=i.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:l,setupView:c,state:i}}function Tf(s){const t=new Pb(s),n=[],i=[];function r(d){u.camera=d,n.length=0,i.length=0}function a(d){n.push(d)}function o(d){i.push(d)}function l(){t.setup(n)}function c(d){t.setupView(n,d)}const u={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Lb(s){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new Tf(s),t.set(r,[l])):a>=o.length?(l=new Tf(s),o.push(l)):l=o[a],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class Db extends Ea{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=h_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ib extends Ea{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Ob=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Nb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ub(s,t,n){let i=new Xh;const r=new he,a=new he,o=new Nt,l=new Db({depthPacking:p_}),c=new Ib,u={},d=n.maxTextureSize,h={[$i]:en,[en]:$i,[ci]:ci},f=new qi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:Ob,fragmentShader:Nb}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const v=new xi;v.setAttribute("position",new $n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ze(v,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=yh;let g=this.type;this.render=function(A,w,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const M=s.getRenderTarget(),E=s.getActiveCubeFace(),O=s.getActiveMipmapLevel(),G=s.state;G.setBlending(ki),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const z=g!==ai&&this.type===ai,Y=g===ai&&this.type!==ai;for(let L=0,N=A.length;L<N;L++){const k=A[L],F=k.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",k,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;r.copy(F.mapSize);const ne=F.getFrameExtents();if(r.multiply(ne),a.copy(F.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(a.x=Math.floor(d/ne.x),r.x=a.x*ne.x,F.mapSize.x=a.x),r.y>d&&(a.y=Math.floor(d/ne.y),r.y=a.y*ne.y,F.mapSize.y=a.y)),F.map===null||z===!0||Y===!0){const de=this.type!==ai?{minFilter:En,magFilter:En}:{};F.map!==null&&F.map.dispose(),F.map=new Ar(r.x,r.y,de),F.map.texture.name=k.name+".shadowMap",F.camera.updateProjectionMatrix()}s.setRenderTarget(F.map),s.clear();const te=F.getViewportCount();for(let de=0;de<te;de++){const Oe=F.getViewport(de);o.set(a.x*Oe.x,a.y*Oe.y,a.x*Oe.z,a.y*Oe.w),G.viewport(o),F.updateMatrices(k,de),i=F.getFrustum(),x(w,I,F.camera,k,this.type)}F.isPointLightShadow!==!0&&this.type===ai&&S(F,I),F.needsUpdate=!1}g=this.type,m.needsUpdate=!1,s.setRenderTarget(M,E,O)};function S(A,w){const I=t.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ar(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(w,null,I,f,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(w,null,I,p,_,null)}function y(A,w,I,M){let E=null;const O=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(O!==void 0)E=O;else if(E=I.isPointLight===!0?c:l,s.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const G=E.uuid,z=w.uuid;let Y=u[G];Y===void 0&&(Y={},u[G]=Y);let L=Y[z];L===void 0&&(L=E.clone(),Y[z]=L,w.addEventListener("dispose",R)),E=L}if(E.visible=w.visible,E.wireframe=w.wireframe,M===ai?E.side=w.shadowSide!==null?w.shadowSide:w.side:E.side=w.shadowSide!==null?w.shadowSide:h[w.side],E.alphaMap=w.alphaMap,E.alphaTest=w.alphaTest,E.map=w.map,E.clipShadows=w.clipShadows,E.clippingPlanes=w.clippingPlanes,E.clipIntersection=w.clipIntersection,E.displacementMap=w.displacementMap,E.displacementScale=w.displacementScale,E.displacementBias=w.displacementBias,E.wireframeLinewidth=w.wireframeLinewidth,E.linewidth=w.linewidth,I.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const G=s.properties.get(E);G.light=I}return E}function x(A,w,I,M,E){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&E===ai)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const z=t.update(A),Y=A.material;if(Array.isArray(Y)){const L=z.groups;for(let N=0,k=L.length;N<k;N++){const F=L[N],ne=Y[F.materialIndex];if(ne&&ne.visible){const te=y(A,ne,M,E);A.onBeforeShadow(s,A,w,I,z,te,F),s.renderBufferDirect(I,null,z,te,A,F),A.onAfterShadow(s,A,w,I,z,te,F)}}}else if(Y.visible){const L=y(A,Y,M,E);A.onBeforeShadow(s,A,w,I,z,L,null),s.renderBufferDirect(I,null,z,L,A,null),A.onAfterShadow(s,A,w,I,z,L,null)}}const G=A.children;for(let z=0,Y=G.length;z<Y;z++)x(G[z],w,I,M,E)}function R(A){A.target.removeEventListener("dispose",R);for(const I in u){const M=u[I],E=A.target.uuid;E in M&&(M[E].dispose(),delete M[E])}}}function Fb(s){function t(){let b=!1;const W=new Nt;let X=null;const Z=new Nt(0,0,0,0);return{setMask:function(le){X!==le&&!b&&(s.colorMask(le,le,le,le),X=le)},setLocked:function(le){b=le},setClear:function(le,Le,Ge,xt,Ct){Ct===!0&&(le*=xt,Le*=xt,Ge*=xt),W.set(le,Le,Ge,xt),Z.equals(W)===!1&&(s.clearColor(le,Le,Ge,xt),Z.copy(W))},reset:function(){b=!1,X=null,Z.set(-1,0,0,0)}}}function n(){let b=!1,W=null,X=null,Z=null;return{setTest:function(le){le?Te(s.DEPTH_TEST):ge(s.DEPTH_TEST)},setMask:function(le){W!==le&&!b&&(s.depthMask(le),W=le)},setFunc:function(le){if(X!==le){switch(le){case Kg:s.depthFunc(s.NEVER);break;case Zg:s.depthFunc(s.ALWAYS);break;case Jg:s.depthFunc(s.LESS);break;case Go:s.depthFunc(s.LEQUAL);break;case Qg:s.depthFunc(s.EQUAL);break;case e_:s.depthFunc(s.GEQUAL);break;case t_:s.depthFunc(s.GREATER);break;case n_:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}X=le}},setLocked:function(le){b=le},setClear:function(le){Z!==le&&(s.clearDepth(le),Z=le)},reset:function(){b=!1,W=null,X=null,Z=null}}}function i(){let b=!1,W=null,X=null,Z=null,le=null,Le=null,Ge=null,xt=null,Ct=null;return{setTest:function(tt){b||(tt?Te(s.STENCIL_TEST):ge(s.STENCIL_TEST))},setMask:function(tt){W!==tt&&!b&&(s.stencilMask(tt),W=tt)},setFunc:function(tt,Rt,Mt){(X!==tt||Z!==Rt||le!==Mt)&&(s.stencilFunc(tt,Rt,Mt),X=tt,Z=Rt,le=Mt)},setOp:function(tt,Rt,Mt){(Le!==tt||Ge!==Rt||xt!==Mt)&&(s.stencilOp(tt,Rt,Mt),Le=tt,Ge=Rt,xt=Mt)},setLocked:function(tt){b=tt},setClear:function(tt){Ct!==tt&&(s.clearStencil(tt),Ct=tt)},reset:function(){b=!1,W=null,X=null,Z=null,le=null,Le=null,Ge=null,xt=null,Ct=null}}}const r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,f=[],p=null,v=!1,_=null,m=null,g=null,S=null,y=null,x=null,R=null,A=new Be(0,0,0),w=0,I=!1,M=null,E=null,O=null,G=null,z=null;const Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let L=!1,N=0;const k=s.getParameter(s.VERSION);k.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(k)[1]),L=N>=1):k.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),L=N>=2);let F=null,ne={};const te=s.getParameter(s.SCISSOR_BOX),de=s.getParameter(s.VIEWPORT),Oe=new Nt().fromArray(te),Ne=new Nt().fromArray(de);function J(b,W,X,Z){const le=new Uint8Array(4),Le=s.createTexture();s.bindTexture(b,Le),s.texParameteri(b,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(b,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ge=0;Ge<X;Ge++)b===s.TEXTURE_3D||b===s.TEXTURE_2D_ARRAY?s.texImage3D(W,0,s.RGBA,1,1,Z,0,s.RGBA,s.UNSIGNED_BYTE,le):s.texImage2D(W+Ge,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,le);return Le}const ae={};ae[s.TEXTURE_2D]=J(s.TEXTURE_2D,s.TEXTURE_2D,1),ae[s.TEXTURE_CUBE_MAP]=J(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[s.TEXTURE_2D_ARRAY]=J(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ae[s.TEXTURE_3D]=J(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Te(s.DEPTH_TEST),a.setFunc(Go),_e(!1),ee(Rd),Te(s.CULL_FACE),ue(ki);function Te(b){u[b]!==!0&&(s.enable(b),u[b]=!0)}function ge(b){u[b]!==!1&&(s.disable(b),u[b]=!1)}function ke(b,W){return d[b]!==W?(s.bindFramebuffer(b,W),d[b]=W,b===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=W),b===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=W),!0):!1}function je(b,W){let X=f,Z=!1;if(b){X=h.get(W),X===void 0&&(X=[],h.set(W,X));const le=b.textures;if(X.length!==le.length||X[0]!==s.COLOR_ATTACHMENT0){for(let Le=0,Ge=le.length;Le<Ge;Le++)X[Le]=s.COLOR_ATTACHMENT0+Le;X.length=le.length,Z=!0}}else X[0]!==s.BACK&&(X[0]=s.BACK,Z=!0);Z&&s.drawBuffers(X)}function Fe(b){return p!==b?(s.useProgram(b),p=b,!0):!1}const Qe={[mr]:s.FUNC_ADD,[Ig]:s.FUNC_SUBTRACT,[Og]:s.FUNC_REVERSE_SUBTRACT};Qe[Ng]=s.MIN,Qe[Ug]=s.MAX;const P={[Fg]:s.ZERO,[Bg]:s.ONE,[kg]:s.SRC_COLOR,[vc]:s.SRC_ALPHA,[Xg]:s.SRC_ALPHA_SATURATE,[Gg]:s.DST_COLOR,[Hg]:s.DST_ALPHA,[zg]:s.ONE_MINUS_SRC_COLOR,[yc]:s.ONE_MINUS_SRC_ALPHA,[Wg]:s.ONE_MINUS_DST_COLOR,[Vg]:s.ONE_MINUS_DST_ALPHA,[$g]:s.CONSTANT_COLOR,[qg]:s.ONE_MINUS_CONSTANT_COLOR,[jg]:s.CONSTANT_ALPHA,[Yg]:s.ONE_MINUS_CONSTANT_ALPHA};function ue(b,W,X,Z,le,Le,Ge,xt,Ct,tt){if(b===ki){v===!0&&(ge(s.BLEND),v=!1);return}if(v===!1&&(Te(s.BLEND),v=!0),b!==Dg){if(b!==_||tt!==I){if((m!==mr||y!==mr)&&(s.blendEquation(s.FUNC_ADD),m=mr,y=mr),tt)switch(b){case ps:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Pd:s.blendFunc(s.ONE,s.ONE);break;case Ld:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Dd:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",b);break}else switch(b){case ps:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Pd:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Ld:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Dd:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",b);break}g=null,S=null,x=null,R=null,A.set(0,0,0),w=0,_=b,I=tt}return}le=le||W,Le=Le||X,Ge=Ge||Z,(W!==m||le!==y)&&(s.blendEquationSeparate(Qe[W],Qe[le]),m=W,y=le),(X!==g||Z!==S||Le!==x||Ge!==R)&&(s.blendFuncSeparate(P[X],P[Z],P[Le],P[Ge]),g=X,S=Z,x=Le,R=Ge),(xt.equals(A)===!1||Ct!==w)&&(s.blendColor(xt.r,xt.g,xt.b,Ct),A.copy(xt),w=Ct),_=b,I=!1}function oe(b,W){b.side===ci?ge(s.CULL_FACE):Te(s.CULL_FACE);let X=b.side===en;W&&(X=!X),_e(X),b.blending===ps&&b.transparent===!1?ue(ki):ue(b.blending,b.blendEquation,b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.blendColor,b.blendAlpha,b.premultipliedAlpha),a.setFunc(b.depthFunc),a.setTest(b.depthTest),a.setMask(b.depthWrite),r.setMask(b.colorWrite);const Z=b.stencilWrite;o.setTest(Z),Z&&(o.setMask(b.stencilWriteMask),o.setFunc(b.stencilFunc,b.stencilRef,b.stencilFuncMask),o.setOp(b.stencilFail,b.stencilZFail,b.stencilZPass)),ve(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits),b.alphaToCoverage===!0?Te(s.SAMPLE_ALPHA_TO_COVERAGE):ge(s.SAMPLE_ALPHA_TO_COVERAGE)}function _e(b){M!==b&&(b?s.frontFace(s.CW):s.frontFace(s.CCW),M=b)}function ee(b){b!==Rg?(Te(s.CULL_FACE),b!==E&&(b===Rd?s.cullFace(s.BACK):b===Pg?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ge(s.CULL_FACE),E=b}function Ie(b){b!==O&&(L&&s.lineWidth(b),O=b)}function ve(b,W,X){b?(Te(s.POLYGON_OFFSET_FILL),(G!==W||z!==X)&&(s.polygonOffset(W,X),G=W,z=X)):ge(s.POLYGON_OFFSET_FILL)}function Ee(b){b?Te(s.SCISSOR_TEST):ge(s.SCISSOR_TEST)}function D(b){b===void 0&&(b=s.TEXTURE0+Y-1),F!==b&&(s.activeTexture(b),F=b)}function T(b,W,X){X===void 0&&(F===null?X=s.TEXTURE0+Y-1:X=F);let Z=ne[X];Z===void 0&&(Z={type:void 0,texture:void 0},ne[X]=Z),(Z.type!==b||Z.texture!==W)&&(F!==X&&(s.activeTexture(X),F=X),s.bindTexture(b,W||ae[b]),Z.type=b,Z.texture=W)}function q(){const b=ne[F];b!==void 0&&b.type!==void 0&&(s.bindTexture(b.type,null),b.type=void 0,b.texture=void 0)}function se(){try{s.compressedTexImage2D.apply(s,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function re(){try{s.compressedTexImage3D.apply(s,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function ie(){try{s.texSubImage2D.apply(s,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function Pe(){try{s.texSubImage3D.apply(s,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function me(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function Se(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function $e(){try{s.texStorage2D.apply(s,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function ce(){try{s.texStorage3D.apply(s,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function be(){try{s.texImage2D.apply(s,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function Je(){try{s.texImage3D.apply(s,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function ze(b){Oe.equals(b)===!1&&(s.scissor(b.x,b.y,b.z,b.w),Oe.copy(b))}function we(b){Ne.equals(b)===!1&&(s.viewport(b.x,b.y,b.z,b.w),Ne.copy(b))}function Ve(b,W){let X=c.get(W);X===void 0&&(X=new WeakMap,c.set(W,X));let Z=X.get(b);Z===void 0&&(Z=s.getUniformBlockIndex(W,b.name),X.set(b,Z))}function qe(b,W){const Z=c.get(W).get(b);l.get(W)!==Z&&(s.uniformBlockBinding(W,Z,b.__bindingPointIndex),l.set(W,Z))}function dt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},F=null,ne={},d={},h=new WeakMap,f=[],p=null,v=!1,_=null,m=null,g=null,S=null,y=null,x=null,R=null,A=new Be(0,0,0),w=0,I=!1,M=null,E=null,O=null,G=null,z=null,Oe.set(0,0,s.canvas.width,s.canvas.height),Ne.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Te,disable:ge,bindFramebuffer:ke,drawBuffers:je,useProgram:Fe,setBlending:ue,setMaterial:oe,setFlipSided:_e,setCullFace:ee,setLineWidth:Ie,setPolygonOffset:ve,setScissorTest:Ee,activeTexture:D,bindTexture:T,unbindTexture:q,compressedTexImage2D:se,compressedTexImage3D:re,texImage2D:be,texImage3D:Je,updateUBOMapping:Ve,uniformBlockBinding:qe,texStorage2D:$e,texStorage3D:ce,texSubImage2D:ie,texSubImage3D:Pe,compressedTexSubImage2D:me,compressedTexSubImage3D:Se,scissor:ze,viewport:we,reset:dt}}function wf(s,t,n,i){const r=Bb(i);switch(n){case Th:return s*t;case Ah:return s*t;case Ch:return s*t*2;case Rh:return s*t/r.components*r.byteLength;case Tu:return s*t/r.components*r.byteLength;case Ph:return s*t*2/r.components*r.byteLength;case wu:return s*t*2/r.components*r.byteLength;case wh:return s*t*3/r.components*r.byteLength;case On:return s*t*4/r.components*r.byteLength;case Au:return s*t*4/r.components*r.byteLength;case Ao:case Co:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ro:case Po:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Tc:case Ac:return Math.max(s,16)*Math.max(t,8)/4;case Ec:case wc:return Math.max(s,8)*Math.max(t,8)/2;case Cc:case Rc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Pc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Lc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Dc:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Ic:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Oc:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Nc:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Uc:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Fc:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Bc:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case kc:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case zc:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Hc:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Vc:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Gc:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Wc:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Lo:case Xc:case $c:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Lh:case qc:return Math.ceil(s/4)*Math.ceil(t/4)*8;case jc:case Yc:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Bb(s){switch(s){case mi:case Sh:return{byteLength:1,components:1};case oa:case Mh:case Sa:return{byteLength:2,components:1};case Mu:case Eu:return{byteLength:2,components:4};case wr:case Su:case ui:return{byteLength:4,components:1};case Eh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function kb(s,t,n,i,r,a,o){const l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new he,d=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(D,T){return p?new OffscreenCanvas(D,T):ca("canvas")}function _(D,T,q){let se=1;const re=Ee(D);if((re.width>q||re.height>q)&&(se=q/Math.max(re.width,re.height)),se<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ie=Math.floor(se*re.width),Pe=Math.floor(se*re.height);h===void 0&&(h=v(ie,Pe));const me=T?v(ie,Pe):h;return me.width=ie,me.height=Pe,me.getContext("2d").drawImage(D,0,0,ie,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+ie+"x"+Pe+")."),me}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),D;return D}function m(D){return D.generateMipmaps&&D.minFilter!==En&&D.minFilter!==In}function g(D){s.generateMipmap(D)}function S(D,T,q,se,re=!1){if(D!==null){if(s[D]!==void 0)return s[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ie=T;if(T===s.RED&&(q===s.FLOAT&&(ie=s.R32F),q===s.HALF_FLOAT&&(ie=s.R16F),q===s.UNSIGNED_BYTE&&(ie=s.R8)),T===s.RED_INTEGER&&(q===s.UNSIGNED_BYTE&&(ie=s.R8UI),q===s.UNSIGNED_SHORT&&(ie=s.R16UI),q===s.UNSIGNED_INT&&(ie=s.R32UI),q===s.BYTE&&(ie=s.R8I),q===s.SHORT&&(ie=s.R16I),q===s.INT&&(ie=s.R32I)),T===s.RG&&(q===s.FLOAT&&(ie=s.RG32F),q===s.HALF_FLOAT&&(ie=s.RG16F),q===s.UNSIGNED_BYTE&&(ie=s.RG8)),T===s.RG_INTEGER&&(q===s.UNSIGNED_BYTE&&(ie=s.RG8UI),q===s.UNSIGNED_SHORT&&(ie=s.RG16UI),q===s.UNSIGNED_INT&&(ie=s.RG32UI),q===s.BYTE&&(ie=s.RG8I),q===s.SHORT&&(ie=s.RG16I),q===s.INT&&(ie=s.RG32I)),T===s.RGB&&q===s.UNSIGNED_INT_5_9_9_9_REV&&(ie=s.RGB9_E5),T===s.RGBA){const Pe=re?Wo:st.getTransfer(se);q===s.FLOAT&&(ie=s.RGBA32F),q===s.HALF_FLOAT&&(ie=s.RGBA16F),q===s.UNSIGNED_BYTE&&(ie=Pe===ct?s.SRGB8_ALPHA8:s.RGBA8),q===s.UNSIGNED_SHORT_4_4_4_4&&(ie=s.RGBA4),q===s.UNSIGNED_SHORT_5_5_5_1&&(ie=s.RGB5_A1)}return(ie===s.R16F||ie===s.R32F||ie===s.RG16F||ie===s.RG32F||ie===s.RGBA16F||ie===s.RGBA32F)&&t.get("EXT_color_buffer_float"),ie}function y(D,T){let q;return D?T===null||T===wr||T===ws?q=s.DEPTH24_STENCIL8:T===ui?q=s.DEPTH32F_STENCIL8:T===oa&&(q=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===wr||T===ws?q=s.DEPTH_COMPONENT24:T===ui?q=s.DEPTH_COMPONENT32F:T===oa&&(q=s.DEPTH_COMPONENT16),q}function x(D,T){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==En&&D.minFilter!==In?Math.log2(Math.max(T.width,T.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?T.mipmaps.length:1}function R(D){const T=D.target;T.removeEventListener("dispose",R),w(T),T.isVideoTexture&&d.delete(T)}function A(D){const T=D.target;T.removeEventListener("dispose",A),M(T)}function w(D){const T=i.get(D);if(T.__webglInit===void 0)return;const q=D.source,se=f.get(q);if(se){const re=se[T.__cacheKey];re.usedTimes--,re.usedTimes===0&&I(D),Object.keys(se).length===0&&f.delete(q)}i.remove(D)}function I(D){const T=i.get(D);s.deleteTexture(T.__webglTexture);const q=D.source,se=f.get(q);delete se[T.__cacheKey],o.memory.textures--}function M(D){const T=i.get(D);if(D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(T.__webglFramebuffer[se]))for(let re=0;re<T.__webglFramebuffer[se].length;re++)s.deleteFramebuffer(T.__webglFramebuffer[se][re]);else s.deleteFramebuffer(T.__webglFramebuffer[se]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[se])}else{if(Array.isArray(T.__webglFramebuffer))for(let se=0;se<T.__webglFramebuffer.length;se++)s.deleteFramebuffer(T.__webglFramebuffer[se]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let se=0;se<T.__webglColorRenderbuffer.length;se++)T.__webglColorRenderbuffer[se]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[se]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const q=D.textures;for(let se=0,re=q.length;se<re;se++){const ie=i.get(q[se]);ie.__webglTexture&&(s.deleteTexture(ie.__webglTexture),o.memory.textures--),i.remove(q[se])}i.remove(D)}let E=0;function O(){E=0}function G(){const D=E;return D>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+r.maxTextures),E+=1,D}function z(D){const T=[];return T.push(D.wrapS),T.push(D.wrapT),T.push(D.wrapR||0),T.push(D.magFilter),T.push(D.minFilter),T.push(D.anisotropy),T.push(D.internalFormat),T.push(D.format),T.push(D.type),T.push(D.generateMipmaps),T.push(D.premultiplyAlpha),T.push(D.flipY),T.push(D.unpackAlignment),T.push(D.colorSpace),T.join()}function Y(D,T){const q=i.get(D);if(D.isVideoTexture&&Ie(D),D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){const se=D.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(q,D,T);return}}n.bindTexture(s.TEXTURE_2D,q.__webglTexture,s.TEXTURE0+T)}function L(D,T){const q=i.get(D);if(D.version>0&&q.__version!==D.version){Ne(q,D,T);return}n.bindTexture(s.TEXTURE_2D_ARRAY,q.__webglTexture,s.TEXTURE0+T)}function N(D,T){const q=i.get(D);if(D.version>0&&q.__version!==D.version){Ne(q,D,T);return}n.bindTexture(s.TEXTURE_3D,q.__webglTexture,s.TEXTURE0+T)}function k(D,T){const q=i.get(D);if(D.version>0&&q.__version!==D.version){J(q,D,T);return}n.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture,s.TEXTURE0+T)}const F={[Sc]:s.REPEAT,[_r]:s.CLAMP_TO_EDGE,[Mc]:s.MIRRORED_REPEAT},ne={[En]:s.NEAREST,[f_]:s.NEAREST_MIPMAP_NEAREST,[Va]:s.NEAREST_MIPMAP_LINEAR,[In]:s.LINEAR,[Al]:s.LINEAR_MIPMAP_NEAREST,[vr]:s.LINEAR_MIPMAP_LINEAR},te={[g_]:s.NEVER,[S_]:s.ALWAYS,[__]:s.LESS,[Ih]:s.LEQUAL,[v_]:s.EQUAL,[b_]:s.GEQUAL,[y_]:s.GREATER,[x_]:s.NOTEQUAL};function de(D,T){if(T.type===ui&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===In||T.magFilter===Al||T.magFilter===Va||T.magFilter===vr||T.minFilter===In||T.minFilter===Al||T.minFilter===Va||T.minFilter===vr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(D,s.TEXTURE_WRAP_S,F[T.wrapS]),s.texParameteri(D,s.TEXTURE_WRAP_T,F[T.wrapT]),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,F[T.wrapR]),s.texParameteri(D,s.TEXTURE_MAG_FILTER,ne[T.magFilter]),s.texParameteri(D,s.TEXTURE_MIN_FILTER,ne[T.minFilter]),T.compareFunction&&(s.texParameteri(D,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(D,s.TEXTURE_COMPARE_FUNC,te[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===En||T.minFilter!==Va&&T.minFilter!==vr||T.type===ui&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");s.texParameterf(D,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function Oe(D,T){let q=!1;D.__webglInit===void 0&&(D.__webglInit=!0,T.addEventListener("dispose",R));const se=T.source;let re=f.get(se);re===void 0&&(re={},f.set(se,re));const ie=z(T);if(ie!==D.__cacheKey){re[ie]===void 0&&(re[ie]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,q=!0),re[ie].usedTimes++;const Pe=re[D.__cacheKey];Pe!==void 0&&(re[D.__cacheKey].usedTimes--,Pe.usedTimes===0&&I(T)),D.__cacheKey=ie,D.__webglTexture=re[ie].texture}return q}function Ne(D,T,q){let se=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(se=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(se=s.TEXTURE_3D);const re=Oe(D,T),ie=T.source;n.bindTexture(se,D.__webglTexture,s.TEXTURE0+q);const Pe=i.get(ie);if(ie.version!==Pe.__version||re===!0){n.activeTexture(s.TEXTURE0+q);const me=st.getPrimaries(st.workingColorSpace),Se=T.colorSpace===Di?null:st.getPrimaries(T.colorSpace),$e=T.colorSpace===Di||me===Se?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let ce=_(T.image,!1,r.maxTextureSize);ce=ve(T,ce);const be=a.convert(T.format,T.colorSpace),Je=a.convert(T.type);let ze=S(T.internalFormat,be,Je,T.colorSpace,T.isVideoTexture);de(se,T);let we;const Ve=T.mipmaps,qe=T.isVideoTexture!==!0,dt=Pe.__version===void 0||re===!0,b=ie.dataReady,W=x(T,ce);if(T.isDepthTexture)ze=y(T.format===As,T.type),dt&&(qe?n.texStorage2D(s.TEXTURE_2D,1,ze,ce.width,ce.height):n.texImage2D(s.TEXTURE_2D,0,ze,ce.width,ce.height,0,be,Je,null));else if(T.isDataTexture)if(Ve.length>0){qe&&dt&&n.texStorage2D(s.TEXTURE_2D,W,ze,Ve[0].width,Ve[0].height);for(let X=0,Z=Ve.length;X<Z;X++)we=Ve[X],qe?b&&n.texSubImage2D(s.TEXTURE_2D,X,0,0,we.width,we.height,be,Je,we.data):n.texImage2D(s.TEXTURE_2D,X,ze,we.width,we.height,0,be,Je,we.data);T.generateMipmaps=!1}else qe?(dt&&n.texStorage2D(s.TEXTURE_2D,W,ze,ce.width,ce.height),b&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,ce.width,ce.height,be,Je,ce.data)):n.texImage2D(s.TEXTURE_2D,0,ze,ce.width,ce.height,0,be,Je,ce.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){qe&&dt&&n.texStorage3D(s.TEXTURE_2D_ARRAY,W,ze,Ve[0].width,Ve[0].height,ce.depth);for(let X=0,Z=Ve.length;X<Z;X++)if(we=Ve[X],T.format!==On)if(be!==null)if(qe){if(b)if(T.layerUpdates.size>0){const le=wf(we.width,we.height,T.format,T.type);for(const Le of T.layerUpdates){const Ge=we.data.subarray(Le*le/we.data.BYTES_PER_ELEMENT,(Le+1)*le/we.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,Le,we.width,we.height,1,be,Ge,0,0)}T.clearLayerUpdates()}else n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,we.width,we.height,ce.depth,be,we.data,0,0)}else n.compressedTexImage3D(s.TEXTURE_2D_ARRAY,X,ze,we.width,we.height,ce.depth,0,we.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qe?b&&n.texSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,we.width,we.height,ce.depth,be,Je,we.data):n.texImage3D(s.TEXTURE_2D_ARRAY,X,ze,we.width,we.height,ce.depth,0,be,Je,we.data)}else{qe&&dt&&n.texStorage2D(s.TEXTURE_2D,W,ze,Ve[0].width,Ve[0].height);for(let X=0,Z=Ve.length;X<Z;X++)we=Ve[X],T.format!==On?be!==null?qe?b&&n.compressedTexSubImage2D(s.TEXTURE_2D,X,0,0,we.width,we.height,be,we.data):n.compressedTexImage2D(s.TEXTURE_2D,X,ze,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?b&&n.texSubImage2D(s.TEXTURE_2D,X,0,0,we.width,we.height,be,Je,we.data):n.texImage2D(s.TEXTURE_2D,X,ze,we.width,we.height,0,be,Je,we.data)}else if(T.isDataArrayTexture)if(qe){if(dt&&n.texStorage3D(s.TEXTURE_2D_ARRAY,W,ze,ce.width,ce.height,ce.depth),b)if(T.layerUpdates.size>0){const X=wf(ce.width,ce.height,T.format,T.type);for(const Z of T.layerUpdates){const le=ce.data.subarray(Z*X/ce.data.BYTES_PER_ELEMENT,(Z+1)*X/ce.data.BYTES_PER_ELEMENT);n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Z,ce.width,ce.height,1,be,Je,le)}T.clearLayerUpdates()}else n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,be,Je,ce.data)}else n.texImage3D(s.TEXTURE_2D_ARRAY,0,ze,ce.width,ce.height,ce.depth,0,be,Je,ce.data);else if(T.isData3DTexture)qe?(dt&&n.texStorage3D(s.TEXTURE_3D,W,ze,ce.width,ce.height,ce.depth),b&&n.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,be,Je,ce.data)):n.texImage3D(s.TEXTURE_3D,0,ze,ce.width,ce.height,ce.depth,0,be,Je,ce.data);else if(T.isFramebufferTexture){if(dt)if(qe)n.texStorage2D(s.TEXTURE_2D,W,ze,ce.width,ce.height);else{let X=ce.width,Z=ce.height;for(let le=0;le<W;le++)n.texImage2D(s.TEXTURE_2D,le,ze,X,Z,0,be,Je,null),X>>=1,Z>>=1}}else if(Ve.length>0){if(qe&&dt){const X=Ee(Ve[0]);n.texStorage2D(s.TEXTURE_2D,W,ze,X.width,X.height)}for(let X=0,Z=Ve.length;X<Z;X++)we=Ve[X],qe?b&&n.texSubImage2D(s.TEXTURE_2D,X,0,0,be,Je,we):n.texImage2D(s.TEXTURE_2D,X,ze,be,Je,we);T.generateMipmaps=!1}else if(qe){if(dt){const X=Ee(ce);n.texStorage2D(s.TEXTURE_2D,W,ze,X.width,X.height)}b&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,be,Je,ce)}else n.texImage2D(s.TEXTURE_2D,0,ze,be,Je,ce);m(T)&&g(se),Pe.__version=ie.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function J(D,T,q){if(T.image.length!==6)return;const se=Oe(D,T),re=T.source;n.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+q);const ie=i.get(re);if(re.version!==ie.__version||se===!0){n.activeTexture(s.TEXTURE0+q);const Pe=st.getPrimaries(st.workingColorSpace),me=T.colorSpace===Di?null:st.getPrimaries(T.colorSpace),Se=T.colorSpace===Di||Pe===me?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const $e=T.isCompressedTexture||T.image[0].isCompressedTexture,ce=T.image[0]&&T.image[0].isDataTexture,be=[];for(let Z=0;Z<6;Z++)!$e&&!ce?be[Z]=_(T.image[Z],!0,r.maxCubemapSize):be[Z]=ce?T.image[Z].image:T.image[Z],be[Z]=ve(T,be[Z]);const Je=be[0],ze=a.convert(T.format,T.colorSpace),we=a.convert(T.type),Ve=S(T.internalFormat,ze,we,T.colorSpace),qe=T.isVideoTexture!==!0,dt=ie.__version===void 0||se===!0,b=re.dataReady;let W=x(T,Je);de(s.TEXTURE_CUBE_MAP,T);let X;if($e){qe&&dt&&n.texStorage2D(s.TEXTURE_CUBE_MAP,W,Ve,Je.width,Je.height);for(let Z=0;Z<6;Z++){X=be[Z].mipmaps;for(let le=0;le<X.length;le++){const Le=X[le];T.format!==On?ze!==null?qe?b&&n.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le,0,0,Le.width,Le.height,ze,Le.data):n.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le,Ve,Le.width,Le.height,0,Le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qe?b&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le,0,0,Le.width,Le.height,ze,we,Le.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le,Ve,Le.width,Le.height,0,ze,we,Le.data)}}}else{if(X=T.mipmaps,qe&&dt){X.length>0&&W++;const Z=Ee(be[0]);n.texStorage2D(s.TEXTURE_CUBE_MAP,W,Ve,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(ce){qe?b&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,be[Z].width,be[Z].height,ze,we,be[Z].data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ve,be[Z].width,be[Z].height,0,ze,we,be[Z].data);for(let le=0;le<X.length;le++){const Ge=X[le].image[Z].image;qe?b&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le+1,0,0,Ge.width,Ge.height,ze,we,Ge.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le+1,Ve,Ge.width,Ge.height,0,ze,we,Ge.data)}}else{qe?b&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ze,we,be[Z]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ve,ze,we,be[Z]);for(let le=0;le<X.length;le++){const Le=X[le];qe?b&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le+1,0,0,ze,we,Le.image[Z]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le+1,Ve,ze,we,Le.image[Z])}}}m(T)&&g(s.TEXTURE_CUBE_MAP),ie.__version=re.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function ae(D,T,q,se,re,ie){const Pe=a.convert(q.format,q.colorSpace),me=a.convert(q.type),Se=S(q.internalFormat,Pe,me,q.colorSpace);if(!i.get(T).__hasExternalTextures){const ce=Math.max(1,T.width>>ie),be=Math.max(1,T.height>>ie);re===s.TEXTURE_3D||re===s.TEXTURE_2D_ARRAY?n.texImage3D(re,ie,Se,ce,be,T.depth,0,Pe,me,null):n.texImage2D(re,ie,Se,ce,be,0,Pe,me,null)}n.bindFramebuffer(s.FRAMEBUFFER,D),ee(T)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,se,re,i.get(q).__webglTexture,0,_e(T)):(re===s.TEXTURE_2D||re>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,se,re,i.get(q).__webglTexture,ie),n.bindFramebuffer(s.FRAMEBUFFER,null)}function Te(D,T,q){if(s.bindRenderbuffer(s.RENDERBUFFER,D),T.depthBuffer){const se=T.depthTexture,re=se&&se.isDepthTexture?se.type:null,ie=y(T.stencilBuffer,re),Pe=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,me=_e(T);ee(T)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,me,ie,T.width,T.height):q?s.renderbufferStorageMultisample(s.RENDERBUFFER,me,ie,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,ie,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Pe,s.RENDERBUFFER,D)}else{const se=T.textures;for(let re=0;re<se.length;re++){const ie=se[re],Pe=a.convert(ie.format,ie.colorSpace),me=a.convert(ie.type),Se=S(ie.internalFormat,Pe,me,ie.colorSpace),$e=_e(T);q&&ee(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,$e,Se,T.width,T.height):ee(T)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,$e,Se,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,Se,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ge(D,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(s.FRAMEBUFFER,D),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),Y(T.depthTexture,0);const se=i.get(T.depthTexture).__webglTexture,re=_e(T);if(T.depthTexture.format===ms)ee(T)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0,re):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0);else if(T.depthTexture.format===As)ee(T)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0,re):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function ke(D){const T=i.get(D),q=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!T.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");ge(T.__webglFramebuffer,D)}else if(q){T.__webglDepthbuffer=[];for(let se=0;se<6;se++)n.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[se]),T.__webglDepthbuffer[se]=s.createRenderbuffer(),Te(T.__webglDepthbuffer[se],D,!1)}else n.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=s.createRenderbuffer(),Te(T.__webglDepthbuffer,D,!1);n.bindFramebuffer(s.FRAMEBUFFER,null)}function je(D,T,q){const se=i.get(D);T!==void 0&&ae(se.__webglFramebuffer,D,D.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),q!==void 0&&ke(D)}function Fe(D){const T=D.texture,q=i.get(D),se=i.get(T);D.addEventListener("dispose",A);const re=D.textures,ie=D.isWebGLCubeRenderTarget===!0,Pe=re.length>1;if(Pe||(se.__webglTexture===void 0&&(se.__webglTexture=s.createTexture()),se.__version=T.version,o.memory.textures++),ie){q.__webglFramebuffer=[];for(let me=0;me<6;me++)if(T.mipmaps&&T.mipmaps.length>0){q.__webglFramebuffer[me]=[];for(let Se=0;Se<T.mipmaps.length;Se++)q.__webglFramebuffer[me][Se]=s.createFramebuffer()}else q.__webglFramebuffer[me]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){q.__webglFramebuffer=[];for(let me=0;me<T.mipmaps.length;me++)q.__webglFramebuffer[me]=s.createFramebuffer()}else q.__webglFramebuffer=s.createFramebuffer();if(Pe)for(let me=0,Se=re.length;me<Se;me++){const $e=i.get(re[me]);$e.__webglTexture===void 0&&($e.__webglTexture=s.createTexture(),o.memory.textures++)}if(D.samples>0&&ee(D)===!1){q.__webglMultisampledFramebuffer=s.createFramebuffer(),q.__webglColorRenderbuffer=[],n.bindFramebuffer(s.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let me=0;me<re.length;me++){const Se=re[me];q.__webglColorRenderbuffer[me]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,q.__webglColorRenderbuffer[me]);const $e=a.convert(Se.format,Se.colorSpace),ce=a.convert(Se.type),be=S(Se.internalFormat,$e,ce,Se.colorSpace,D.isXRRenderTarget===!0),Je=_e(D);s.renderbufferStorageMultisample(s.RENDERBUFFER,Je,be,D.width,D.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,q.__webglColorRenderbuffer[me])}s.bindRenderbuffer(s.RENDERBUFFER,null),D.depthBuffer&&(q.__webglDepthRenderbuffer=s.createRenderbuffer(),Te(q.__webglDepthRenderbuffer,D,!0)),n.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ie){n.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture),de(s.TEXTURE_CUBE_MAP,T);for(let me=0;me<6;me++)if(T.mipmaps&&T.mipmaps.length>0)for(let Se=0;Se<T.mipmaps.length;Se++)ae(q.__webglFramebuffer[me][Se],D,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+me,Se);else ae(q.__webglFramebuffer[me],D,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);m(T)&&g(s.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Pe){for(let me=0,Se=re.length;me<Se;me++){const $e=re[me],ce=i.get($e);n.bindTexture(s.TEXTURE_2D,ce.__webglTexture),de(s.TEXTURE_2D,$e),ae(q.__webglFramebuffer,D,$e,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,0),m($e)&&g(s.TEXTURE_2D)}n.unbindTexture()}else{let me=s.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(me=D.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),n.bindTexture(me,se.__webglTexture),de(me,T),T.mipmaps&&T.mipmaps.length>0)for(let Se=0;Se<T.mipmaps.length;Se++)ae(q.__webglFramebuffer[Se],D,T,s.COLOR_ATTACHMENT0,me,Se);else ae(q.__webglFramebuffer,D,T,s.COLOR_ATTACHMENT0,me,0);m(T)&&g(me),n.unbindTexture()}D.depthBuffer&&ke(D)}function Qe(D){const T=D.textures;for(let q=0,se=T.length;q<se;q++){const re=T[q];if(m(re)){const ie=D.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Pe=i.get(re).__webglTexture;n.bindTexture(ie,Pe),g(ie),n.unbindTexture()}}}const P=[],ue=[];function oe(D){if(D.samples>0){if(ee(D)===!1){const T=D.textures,q=D.width,se=D.height;let re=s.COLOR_BUFFER_BIT;const ie=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Pe=i.get(D),me=T.length>1;if(me)for(let Se=0;Se<T.length;Se++)n.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.RENDERBUFFER,null),n.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.TEXTURE_2D,null,0);n.bindFramebuffer(s.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let Se=0;Se<T.length;Se++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(re|=s.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(re|=s.STENCIL_BUFFER_BIT)),me){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Pe.__webglColorRenderbuffer[Se]);const $e=i.get(T[Se]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,$e,0)}s.blitFramebuffer(0,0,q,se,0,0,q,se,re,s.NEAREST),c===!0&&(P.length=0,ue.length=0,P.push(s.COLOR_ATTACHMENT0+Se),D.depthBuffer&&D.resolveDepthBuffer===!1&&(P.push(ie),ue.push(ie),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ue)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,P))}if(n.bindFramebuffer(s.READ_FRAMEBUFFER,null),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),me)for(let Se=0;Se<T.length;Se++){n.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.RENDERBUFFER,Pe.__webglColorRenderbuffer[Se]);const $e=i.get(T[Se]).__webglTexture;n.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.TEXTURE_2D,$e,0)}n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const T=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[T])}}}function _e(D){return Math.min(r.maxSamples,D.samples)}function ee(D){const T=i.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Ie(D){const T=o.render.frame;d.get(D)!==T&&(d.set(D,T),D.update())}function ve(D,T){const q=D.colorSpace,se=D.format,re=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||q!==Zi&&q!==Di&&(st.getTransfer(q)===ct?(se!==On||re!==mi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),T}function Ee(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(u.width=D.naturalWidth||D.width,u.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(u.width=D.displayWidth,u.height=D.displayHeight):(u.width=D.width,u.height=D.height),u}this.allocateTextureUnit=G,this.resetTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=L,this.setTexture3D=N,this.setTextureCube=k,this.rebindTextures=je,this.setupRenderTarget=Fe,this.updateRenderTargetMipmap=Qe,this.updateMultisampleRenderTarget=oe,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=ee}function zb(s,t){function n(i,r=Di){let a;const o=st.getTransfer(r);if(i===mi)return s.UNSIGNED_BYTE;if(i===Mu)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Eu)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Eh)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===Sh)return s.BYTE;if(i===Mh)return s.SHORT;if(i===oa)return s.UNSIGNED_SHORT;if(i===Su)return s.INT;if(i===wr)return s.UNSIGNED_INT;if(i===ui)return s.FLOAT;if(i===Sa)return s.HALF_FLOAT;if(i===Th)return s.ALPHA;if(i===wh)return s.RGB;if(i===On)return s.RGBA;if(i===Ah)return s.LUMINANCE;if(i===Ch)return s.LUMINANCE_ALPHA;if(i===ms)return s.DEPTH_COMPONENT;if(i===As)return s.DEPTH_STENCIL;if(i===Rh)return s.RED;if(i===Tu)return s.RED_INTEGER;if(i===Ph)return s.RG;if(i===wu)return s.RG_INTEGER;if(i===Au)return s.RGBA_INTEGER;if(i===Ao||i===Co||i===Ro||i===Po)if(o===ct)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Ao)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Co)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ro)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Po)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Ao)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Co)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ro)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Po)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ec||i===Tc||i===wc||i===Ac)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Ec)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Tc)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===wc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ac)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Cc||i===Rc||i===Pc)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Cc||i===Rc)return o===ct?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Pc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Lc||i===Dc||i===Ic||i===Oc||i===Nc||i===Uc||i===Fc||i===Bc||i===kc||i===zc||i===Hc||i===Vc||i===Gc||i===Wc)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Lc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Dc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ic)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Oc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Nc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Uc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Fc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Bc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===kc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===zc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Hc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Vc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Gc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Wc)return o===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Lo||i===Xc||i===$c)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===Lo)return o===ct?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Xc)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===$c)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Lh||i===qc||i===jc||i===Yc)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Lo)return a.COMPRESSED_RED_RGTC1_EXT;if(i===qc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===jc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Yc)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ws?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:n}}class Hb extends Mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class uo extends mn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vb={type:"move"};class Jl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new uo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new uo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new uo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let r=null,a=null,o=null;const l=this._targetRay,c=this._grip,u=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(u&&t.hand){o=!0;for(const _ of t.hand.values()){const m=n.getJointPose(_,i),g=this._getHandJoint(u,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const d=u.joints["index-finger-tip"],h=u.joints["thumb-tip"],f=d.position.distanceTo(h.position),p=.02,v=.005;u.inputState.pinching&&f>p+v?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!u.inputState.pinching&&f<=p-v&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(a=n.getPose(t.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));l!==null&&(r=n.getPose(t.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(Vb)))}return l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new uo;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const Gb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Wb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Xb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,i){if(this.texture===null){const r=new Zt,a=t.properties.get(r);a.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new qi({vertexShader:Gb,fragmentShader:Wb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ze(new cl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $b extends Dr{constructor(t,n){super();const i=this;let r=null,a=1,o=null,l="local-floor",c=1,u=null,d=null,h=null,f=null,p=null,v=null;const _=new Xb,m=n.getContextAttributes();let g=null,S=null;const y=[],x=[],R=new he;let A=null;const w=new Mn;w.layers.enable(1),w.viewport=new Nt;const I=new Mn;I.layers.enable(2),I.viewport=new Nt;const M=[w,I],E=new Hb;E.layers.enable(1),E.layers.enable(2);let O=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ae=y[J];return ae===void 0&&(ae=new Jl,y[J]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(J){let ae=y[J];return ae===void 0&&(ae=new Jl,y[J]=ae),ae.getGripSpace()},this.getHand=function(J){let ae=y[J];return ae===void 0&&(ae=new Jl,y[J]=ae),ae.getHandSpace()};function z(J){const ae=x.indexOf(J.inputSource);if(ae===-1)return;const Te=y[ae];Te!==void 0&&(Te.update(J.inputSource,J.frame,u||o),Te.dispatchEvent({type:J.type,data:J.inputSource}))}function Y(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",L);for(let J=0;J<y.length;J++){const ae=x[J];ae!==null&&(x[J]=null,y[J].disconnect(ae))}O=null,G=null,_.reset(),t.setRenderTarget(g),p=null,f=null,h=null,r=null,S=null,Ne.stop(),i.isPresenting=!1,t.setPixelRatio(A),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){a=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){l=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(J){u=J},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(g=t.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",L),m.xrCompatible!==!0&&await n.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(R),r.renderState.layers===void 0){const ae={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,n,ae),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Ar(p.framebufferWidth,p.framebufferHeight,{format:On,type:mi,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let ae=null,Te=null,ge=null;m.depth&&(ge=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ae=m.stencil?As:ms,Te=m.stencil?ws:wr);const ke={colorFormat:n.RGBA8,depthFormat:ge,scaleFactor:a};h=new XRWebGLBinding(r,n),f=h.createProjectionLayer(ke),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),S=new Ar(f.textureWidth,f.textureHeight,{format:On,type:mi,depthTexture:new jh(f.textureWidth,f.textureHeight,Te,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),u=null,o=await r.requestReferenceSpace(l),Ne.setContext(r),Ne.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function L(J){for(let ae=0;ae<J.removed.length;ae++){const Te=J.removed[ae],ge=x.indexOf(Te);ge>=0&&(x[ge]=null,y[ge].disconnect(Te))}for(let ae=0;ae<J.added.length;ae++){const Te=J.added[ae];let ge=x.indexOf(Te);if(ge===-1){for(let je=0;je<y.length;je++)if(je>=x.length){x.push(Te),ge=je;break}else if(x[je]===null){x[je]=Te,ge=je;break}if(ge===-1)break}const ke=y[ge];ke&&ke.connect(Te)}}const N=new U,k=new U;function F(J,ae,Te){N.setFromMatrixPosition(ae.matrixWorld),k.setFromMatrixPosition(Te.matrixWorld);const ge=N.distanceTo(k),ke=ae.projectionMatrix.elements,je=Te.projectionMatrix.elements,Fe=ke[14]/(ke[10]-1),Qe=ke[14]/(ke[10]+1),P=(ke[9]+1)/ke[5],ue=(ke[9]-1)/ke[5],oe=(ke[8]-1)/ke[0],_e=(je[8]+1)/je[0],ee=Fe*oe,Ie=Fe*_e,ve=ge/(-oe+_e),Ee=ve*-oe;ae.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Ee),J.translateZ(ve),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert();const D=Fe+ve,T=Qe+ve,q=ee-Ee,se=Ie+(ge-Ee),re=P*Qe/T*D,ie=ue*Qe/T*D;J.projectionMatrix.makePerspective(q,se,re,ie,D,T),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}function ne(J,ae){ae===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ae.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;_.texture!==null&&(J.near=_.depthNear,J.far=_.depthFar),E.near=I.near=w.near=J.near,E.far=I.far=w.far=J.far,(O!==E.near||G!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),O=E.near,G=E.far,w.near=O,w.far=G,I.near=O,I.far=G,w.updateProjectionMatrix(),I.updateProjectionMatrix(),J.updateProjectionMatrix());const ae=J.parent,Te=E.cameras;ne(E,ae);for(let ge=0;ge<Te.length;ge++)ne(Te[ge],ae);Te.length===2?F(E,w,I):E.projectionMatrix.copy(w.projectionMatrix),te(J,E,ae)};function te(J,ae,Te){Te===null?J.matrix.copy(ae.matrixWorld):(J.matrix.copy(Te.matrixWorld),J.matrix.invert(),J.matrix.multiply(ae.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ae.projectionMatrix),J.projectionMatrixInverse.copy(ae.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=la*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(J){c=J,f!==null&&(f.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(E)};let de=null;function Oe(J,ae){if(d=ae.getViewerPose(u||o),v=ae,d!==null){const Te=d.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let ge=!1;Te.length!==E.cameras.length&&(E.cameras.length=0,ge=!0);for(let je=0;je<Te.length;je++){const Fe=Te[je];let Qe=null;if(p!==null)Qe=p.getViewport(Fe);else{const ue=h.getViewSubImage(f,Fe);Qe=ue.viewport,je===0&&(t.setRenderTargetTextures(S,ue.colorTexture,f.ignoreDepthValues?void 0:ue.depthStencilTexture),t.setRenderTarget(S))}let P=M[je];P===void 0&&(P=new Mn,P.layers.enable(je),P.viewport=new Nt,M[je]=P),P.matrix.fromArray(Fe.transform.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale),P.projectionMatrix.fromArray(Fe.projectionMatrix),P.projectionMatrixInverse.copy(P.projectionMatrix).invert(),P.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),je===0&&(E.matrix.copy(P.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),ge===!0&&E.cameras.push(P)}const ke=r.enabledFeatures;if(ke&&ke.includes("depth-sensing")){const je=h.getDepthInformation(Te[0]);je&&je.isValid&&je.texture&&_.init(t,je,r.renderState)}}for(let Te=0;Te<y.length;Te++){const ge=x[Te],ke=y[Te];ge!==null&&ke!==void 0&&ke.update(ge,ae,u||o)}de&&de(J,ae),ae.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ae}),v=null}const Ne=new $h;Ne.setAnimationLoop(Oe),this.setAnimationLoop=function(J){de=J},this.dispose=function(){}}}const ur=new gi,qb=new At;function jb(s,t){function n(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,Vh(s)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function r(m,g,S,y,x){g.isMeshBasicMaterial||g.isMeshLambertMaterial?a(m,g):g.isMeshToonMaterial?(a(m,g),h(m,g)):g.isMeshPhongMaterial?(a(m,g),d(m,g)):g.isMeshStandardMaterial?(a(m,g),f(m,g),g.isMeshPhysicalMaterial&&p(m,g,x)):g.isMeshMatcapMaterial?(a(m,g),v(m,g)):g.isMeshDepthMaterial?a(m,g):g.isMeshDistanceMaterial?(a(m,g),_(m,g)):g.isMeshNormalMaterial?a(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&l(m,g)):g.isPointsMaterial?c(m,g,S,y):g.isSpriteMaterial?u(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function a(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,n(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,n(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,n(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===en&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,n(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===en&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,n(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,n(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,n(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const S=t.get(g),y=S.envMap,x=S.envMapRotation;y&&(m.envMap.value=y,ur.copy(x),ur.x*=-1,ur.y*=-1,ur.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ur.y*=-1,ur.z*=-1),m.envMapRotation.value.setFromMatrix4(qb.makeRotationFromEuler(ur)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,n(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,n(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,n(g.map,m.mapTransform))}function l(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,S,y){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*S,m.scale.value=y*.5,g.map&&(m.map.value=g.map,n(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,n(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,n(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,n(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function d(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function h(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,n(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,n(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function p(m,g,S){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,n(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,n(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,n(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,n(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,n(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===en&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,n(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,n(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,n(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,n(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,n(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,n(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,n(g.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){const S=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Yb(s,t,n,i){let r={},a={},o=[];const l=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,y){const x=y.program;i.uniformBlockBinding(S,x)}function u(S,y){let x=r[S.id];x===void 0&&(v(S),x=d(S),r[S.id]=x,S.addEventListener("dispose",m));const R=y.program;i.updateUBOMapping(S,R);const A=t.render.frame;a[S.id]!==A&&(f(S),a[S.id]=A)}function d(S){const y=h();S.__bindingPointIndex=y;const x=s.createBuffer(),R=S.__size,A=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,R,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,x),x}function h(){for(let S=0;S<l;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const y=r[S.id],x=S.uniforms,R=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let A=0,w=x.length;A<w;A++){const I=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,E=I.length;M<E;M++){const O=I[M];if(p(O,A,M,R)===!0){const G=O.__offset,z=Array.isArray(O.value)?O.value:[O.value];let Y=0;for(let L=0;L<z.length;L++){const N=z[L],k=_(N);typeof N=="number"||typeof N=="boolean"?(O.__data[0]=N,s.bufferSubData(s.UNIFORM_BUFFER,G+Y,O.__data)):N.isMatrix3?(O.__data[0]=N.elements[0],O.__data[1]=N.elements[1],O.__data[2]=N.elements[2],O.__data[3]=0,O.__data[4]=N.elements[3],O.__data[5]=N.elements[4],O.__data[6]=N.elements[5],O.__data[7]=0,O.__data[8]=N.elements[6],O.__data[9]=N.elements[7],O.__data[10]=N.elements[8],O.__data[11]=0):(N.toArray(O.__data,Y),Y+=k.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,G,O.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(S,y,x,R){const A=S.value,w=y+"_"+x;if(R[w]===void 0)return typeof A=="number"||typeof A=="boolean"?R[w]=A:R[w]=A.clone(),!0;{const I=R[w];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return R[w]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function v(S){const y=S.uniforms;let x=0;const R=16;for(let w=0,I=y.length;w<I;w++){const M=Array.isArray(y[w])?y[w]:[y[w]];for(let E=0,O=M.length;E<O;E++){const G=M[E],z=Array.isArray(G.value)?G.value:[G.value];for(let Y=0,L=z.length;Y<L;Y++){const N=z[Y],k=_(N),F=x%R,ne=F%k.boundary,te=F+ne;x+=ne,te!==0&&R-te<k.storage&&(x+=R-te),G.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=x,x+=k.storage}}}const A=x%R;return A>0&&(x+=R-A),S.__size=x,S.__cache={},this}function _(S){const y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function m(S){const y=S.target;y.removeEventListener("dispose",m);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(r[y.id]),delete r[y.id],delete a[y.id]}function g(){for(const S in r)s.deleteBuffer(r[S]);o=[],r={},a={}}return{bind:c,update:u,dispose:g}}class Kb{constructor(t={}){const{canvas:n=z_(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),v=new Int32Array(4);let _=null,m=null;const g=[],S=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Un,this.toneMapping=zi,this.toneMappingExposure=1;const y=this;let x=!1,R=0,A=0,w=null,I=-1,M=null;const E=new Nt,O=new Nt;let G=null;const z=new Be(0);let Y=0,L=n.width,N=n.height,k=1,F=null,ne=null;const te=new Nt(0,0,L,N),de=new Nt(0,0,L,N);let Oe=!1;const Ne=new Xh;let J=!1,ae=!1;const Te=new At,ge=new U,ke=new Nt,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function Qe(){return w===null?k:1}let P=i;function ue(C,B){return n.getContext(C,B)}try{const C={alpha:!0,depth:r,stencil:a,antialias:l,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${bu}`),n.addEventListener("webglcontextlost",X,!1),n.addEventListener("webglcontextrestored",Z,!1),n.addEventListener("webglcontextcreationerror",le,!1),P===null){const B="webgl2";if(P=ue(B,C),P===null)throw ue(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let oe,_e,ee,Ie,ve,Ee,D,T,q,se,re,ie,Pe,me,Se,$e,ce,be,Je,ze,we,Ve,qe,dt;function b(){oe=new nx(P),oe.init(),Ve=new zb(P,oe),_e=new Ky(P,oe,t,Ve),ee=new Fb(P),Ie=new sx(P),ve=new Mb,Ee=new kb(P,oe,ee,ve,_e,Ve,Ie),D=new Jy(y),T=new tx(y),q=new f0(P),qe=new jy(P,q),se=new ix(P,q,Ie,qe),re=new ox(P,se,q,Ie),Je=new ax(P,_e,Ee),$e=new Zy(ve),ie=new Sb(y,D,T,oe,_e,qe,$e),Pe=new jb(y,ve),me=new Tb,Se=new Lb(oe),be=new qy(y,D,T,ee,re,f,c),ce=new Ub(y,re,_e),dt=new Yb(P,Ie,_e,ee),ze=new Yy(P,oe,Ie),we=new rx(P,oe,Ie),Ie.programs=ie.programs,y.capabilities=_e,y.extensions=oe,y.properties=ve,y.renderLists=me,y.shadowMap=ce,y.state=ee,y.info=Ie}b();const W=new $b(y,P);this.xr=W,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const C=oe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=oe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(C){C!==void 0&&(k=C,this.setSize(L,N,!1))},this.getSize=function(C){return C.set(L,N)},this.setSize=function(C,B,j=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}L=C,N=B,n.width=Math.floor(C*k),n.height=Math.floor(B*k),j===!0&&(n.style.width=C+"px",n.style.height=B+"px"),this.setViewport(0,0,C,B)},this.getDrawingBufferSize=function(C){return C.set(L*k,N*k).floor()},this.setDrawingBufferSize=function(C,B,j){L=C,N=B,k=j,n.width=Math.floor(C*j),n.height=Math.floor(B*j),this.setViewport(0,0,C,B)},this.getCurrentViewport=function(C){return C.copy(E)},this.getViewport=function(C){return C.copy(te)},this.setViewport=function(C,B,j,K){C.isVector4?te.set(C.x,C.y,C.z,C.w):te.set(C,B,j,K),ee.viewport(E.copy(te).multiplyScalar(k).round())},this.getScissor=function(C){return C.copy(de)},this.setScissor=function(C,B,j,K){C.isVector4?de.set(C.x,C.y,C.z,C.w):de.set(C,B,j,K),ee.scissor(O.copy(de).multiplyScalar(k).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(C){ee.setScissorTest(Oe=C)},this.setOpaqueSort=function(C){F=C},this.setTransparentSort=function(C){ne=C},this.getClearColor=function(C){return C.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor.apply(be,arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha.apply(be,arguments)},this.clear=function(C=!0,B=!0,j=!0){let K=0;if(C){let H=!1;if(w!==null){const fe=w.texture.format;H=fe===Au||fe===wu||fe===Tu}if(H){const fe=w.texture.type,Me=fe===mi||fe===wr||fe===oa||fe===ws||fe===Mu||fe===Eu,Ae=be.getClearColor(),Ce=be.getClearAlpha(),He=Ae.r,We=Ae.g,Ue=Ae.b;Me?(p[0]=He,p[1]=We,p[2]=Ue,p[3]=Ce,P.clearBufferuiv(P.COLOR,0,p)):(v[0]=He,v[1]=We,v[2]=Ue,v[3]=Ce,P.clearBufferiv(P.COLOR,0,v))}else K|=P.COLOR_BUFFER_BIT}B&&(K|=P.DEPTH_BUFFER_BIT),j&&(K|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",X,!1),n.removeEventListener("webglcontextrestored",Z,!1),n.removeEventListener("webglcontextcreationerror",le,!1),me.dispose(),Se.dispose(),ve.dispose(),D.dispose(),T.dispose(),re.dispose(),qe.dispose(),dt.dispose(),ie.dispose(),W.dispose(),W.removeEventListener("sessionstart",Mt),W.removeEventListener("sessionend",Si),Bt.stop()};function X(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function Z(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const C=Ie.autoReset,B=ce.enabled,j=ce.autoUpdate,K=ce.needsUpdate,H=ce.type;b(),Ie.autoReset=C,ce.enabled=B,ce.autoUpdate=j,ce.needsUpdate=K,ce.type=H}function le(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Le(C){const B=C.target;B.removeEventListener("dispose",Le),Ge(B)}function Ge(C){xt(C),ve.remove(C)}function xt(C){const B=ve.get(C).programs;B!==void 0&&(B.forEach(function(j){ie.releaseProgram(j)}),C.isShaderMaterial&&ie.releaseShaderCache(C))}this.renderBufferDirect=function(C,B,j,K,H,fe){B===null&&(B=je);const Me=H.isMesh&&H.matrixWorld.determinant()<0,Ae=km(C,B,j,K,H);ee.setMaterial(K,Me);let Ce=j.index,He=1;if(K.wireframe===!0){if(Ce=se.getWireframeAttribute(j),Ce===void 0)return;He=2}const We=j.drawRange,Ue=j.attributes.position;let nt=We.start*He,_t=(We.start+We.count)*He;fe!==null&&(nt=Math.max(nt,fe.start*He),_t=Math.min(_t,(fe.start+fe.count)*He)),Ce!==null?(nt=Math.max(nt,0),_t=Math.min(_t,Ce.count)):Ue!=null&&(nt=Math.max(nt,0),_t=Math.min(_t,Ue.count));const vt=_t-nt;if(vt<0||vt===1/0)return;qe.setup(H,K,Ae,j,Ce);let ln,it=ze;if(Ce!==null&&(ln=q.get(Ce),it=we,it.setIndex(ln)),H.isMesh)K.wireframe===!0?(ee.setLineWidth(K.wireframeLinewidth*Qe()),it.setMode(P.LINES)):it.setMode(P.TRIANGLES);else if(H.isLine){let De=K.linewidth;De===void 0&&(De=1),ee.setLineWidth(De*Qe()),H.isLineSegments?it.setMode(P.LINES):H.isLineLoop?it.setMode(P.LINE_LOOP):it.setMode(P.LINE_STRIP)}else H.isPoints?it.setMode(P.POINTS):H.isSprite&&it.setMode(P.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)it.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(oe.get("WEBGL_multi_draw"))it.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const De=H._multiDrawStarts,kt=H._multiDrawCounts,rt=H._multiDrawCount,Rn=Ce?q.get(Ce).bytesPerElement:1,Fr=ve.get(K).currentProgram.getUniforms();for(let cn=0;cn<rt;cn++)Fr.setValue(P,"_gl_DrawID",cn),it.render(De[cn]/Rn,kt[cn])}else if(H.isInstancedMesh)it.renderInstances(nt,vt,H.count);else if(j.isInstancedBufferGeometry){const De=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,kt=Math.min(j.instanceCount,De);it.renderInstances(nt,vt,kt)}else it.render(nt,vt)};function Ct(C,B,j){C.transparent===!0&&C.side===ci&&C.forceSinglePass===!1?(C.side=en,C.needsUpdate=!0,ka(C,B,j),C.side=$i,C.needsUpdate=!0,ka(C,B,j),C.side=ci):ka(C,B,j)}this.compile=function(C,B,j=null){j===null&&(j=C),m=Se.get(j),m.init(B),S.push(m),j.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),C!==j&&C.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),m.setupLights();const K=new Set;return C.traverse(function(H){const fe=H.material;if(fe)if(Array.isArray(fe))for(let Me=0;Me<fe.length;Me++){const Ae=fe[Me];Ct(Ae,j,H),K.add(Ae)}else Ct(fe,j,H),K.add(fe)}),S.pop(),m=null,K},this.compileAsync=function(C,B,j=null){const K=this.compile(C,B,j);return new Promise(H=>{function fe(){if(K.forEach(function(Me){ve.get(Me).currentProgram.isReady()&&K.delete(Me)}),K.size===0){H(C);return}setTimeout(fe,10)}oe.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let tt=null;function Rt(C){tt&&tt(C)}function Mt(){Bt.stop()}function Si(){Bt.start()}const Bt=new $h;Bt.setAnimationLoop(Rt),typeof self<"u"&&Bt.setContext(self),this.setAnimationLoop=function(C){tt=C,W.setAnimationLoop(C),C===null?Bt.stop():Bt.start()},W.addEventListener("sessionstart",Mt),W.addEventListener("sessionend",Si),this.render=function(C,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(B),B=W.getCamera()),C.isScene===!0&&C.onBeforeRender(y,C,B,w),m=Se.get(C,S.length),m.init(B),S.push(m),Te.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ne.setFromProjectionMatrix(Te),ae=this.localClippingEnabled,J=$e.init(this.clippingPlanes,ae),_=me.get(C,g.length),_.init(),g.push(_),W.enabled===!0&&W.isPresenting===!0){const fe=y.xr.getDepthSensingMesh();fe!==null&&Qn(fe,B,-1/0,y.sortObjects)}Qn(C,B,0,y.sortObjects),_.finish(),y.sortObjects===!0&&_.sort(F,ne),Fe=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Fe&&be.addToRenderList(_,C),this.info.render.frame++,J===!0&&$e.beginShadows();const j=m.state.shadowsArray;ce.render(j,C,B),J===!0&&$e.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=_.opaque,H=_.transmissive;if(m.setupLights(),B.isArrayCamera){const fe=B.cameras;if(H.length>0)for(let Me=0,Ae=fe.length;Me<Ae;Me++){const Ce=fe[Me];Fs(K,H,C,Ce)}Fe&&be.render(C);for(let Me=0,Ae=fe.length;Me<Ae;Me++){const Ce=fe[Me];rr(_,C,Ce,Ce.viewport)}}else H.length>0&&Fs(K,H,C,B),Fe&&be.render(C),rr(_,C,B);w!==null&&(Ee.updateMultisampleRenderTarget(w),Ee.updateRenderTargetMipmap(w)),C.isScene===!0&&C.onAfterRender(y,C,B),qe.resetDefaultState(),I=-1,M=null,S.pop(),S.length>0?(m=S[S.length-1],J===!0&&$e.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,g.pop(),g.length>0?_=g[g.length-1]:_=null};function Qn(C,B,j,K){if(C.visible===!1)return;if(C.layers.test(B.layers)){if(C.isGroup)j=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(B);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Ne.intersectsSprite(C)){K&&ke.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Te);const Me=re.update(C),Ae=C.material;Ae.visible&&_.push(C,Me,Ae,j,ke.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Ne.intersectsObject(C))){const Me=re.update(C),Ae=C.material;if(K&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ke.copy(C.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),ke.copy(Me.boundingSphere.center)),ke.applyMatrix4(C.matrixWorld).applyMatrix4(Te)),Array.isArray(Ae)){const Ce=Me.groups;for(let He=0,We=Ce.length;He<We;He++){const Ue=Ce[He],nt=Ae[Ue.materialIndex];nt&&nt.visible&&_.push(C,Me,nt,j,ke.z,Ue)}}else Ae.visible&&_.push(C,Me,Ae,j,ke.z,null)}}const fe=C.children;for(let Me=0,Ae=fe.length;Me<Ae;Me++)Qn(fe[Me],B,j,K)}function rr(C,B,j,K){const H=C.opaque,fe=C.transmissive,Me=C.transparent;m.setupLightsView(j),J===!0&&$e.setGlobalState(y.clippingPlanes,j),K&&ee.viewport(E.copy(K)),H.length>0&&Ba(H,B,j),fe.length>0&&Ba(fe,B,j),Me.length>0&&Ba(Me,B,j),ee.buffers.depth.setTest(!0),ee.buffers.depth.setMask(!0),ee.buffers.color.setMask(!0),ee.setPolygonOffset(!1)}function Fs(C,B,j,K){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[K.id]===void 0&&(m.state.transmissionRenderTarget[K.id]=new Ar(1,1,{generateMipmaps:!0,type:oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float")?Sa:mi,minFilter:vr,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));const fe=m.state.transmissionRenderTarget[K.id],Me=K.viewport||E;fe.setSize(Me.z,Me.w);const Ae=y.getRenderTarget();y.setRenderTarget(fe),y.getClearColor(z),Y=y.getClearAlpha(),Y<1&&y.setClearColor(16777215,.5),y.clear(),Fe&&be.render(j);const Ce=y.toneMapping;y.toneMapping=zi;const He=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),m.setupLightsView(K),J===!0&&$e.setGlobalState(y.clippingPlanes,K),Ba(C,j,K),Ee.updateMultisampleRenderTarget(fe),Ee.updateRenderTargetMipmap(fe),oe.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Ue=0,nt=B.length;Ue<nt;Ue++){const _t=B[Ue],vt=_t.object,ln=_t.geometry,it=_t.material,De=_t.group;if(it.side===ci&&vt.layers.test(K.layers)){const kt=it.side;it.side=en,it.needsUpdate=!0,od(vt,j,K,ln,it,De),it.side=kt,it.needsUpdate=!0,We=!0}}We===!0&&(Ee.updateMultisampleRenderTarget(fe),Ee.updateRenderTargetMipmap(fe))}y.setRenderTarget(Ae),y.setClearColor(z,Y),He!==void 0&&(K.viewport=He),y.toneMapping=Ce}function Ba(C,B,j){const K=B.isScene===!0?B.overrideMaterial:null;for(let H=0,fe=C.length;H<fe;H++){const Me=C[H],Ae=Me.object,Ce=Me.geometry,He=K===null?Me.material:K,We=Me.group;Ae.layers.test(j.layers)&&od(Ae,B,j,Ce,He,We)}}function od(C,B,j,K,H,fe){C.onBeforeRender(y,B,j,K,H,fe),C.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),H.transparent===!0&&H.side===ci&&H.forceSinglePass===!1?(H.side=en,H.needsUpdate=!0,y.renderBufferDirect(j,B,K,H,C,fe),H.side=$i,H.needsUpdate=!0,y.renderBufferDirect(j,B,K,H,C,fe),H.side=ci):y.renderBufferDirect(j,B,K,H,C,fe),C.onAfterRender(y,B,j,K,H,fe)}function ka(C,B,j){B.isScene!==!0&&(B=je);const K=ve.get(C),H=m.state.lights,fe=m.state.shadowsArray,Me=H.state.version,Ae=ie.getParameters(C,H.state,fe,B,j),Ce=ie.getProgramCacheKey(Ae);let He=K.programs;K.environment=C.isMeshStandardMaterial?B.environment:null,K.fog=B.fog,K.envMap=(C.isMeshStandardMaterial?T:D).get(C.envMap||K.environment),K.envMapRotation=K.environment!==null&&C.envMap===null?B.environmentRotation:C.envMapRotation,He===void 0&&(C.addEventListener("dispose",Le),He=new Map,K.programs=He);let We=He.get(Ce);if(We!==void 0){if(K.currentProgram===We&&K.lightsStateVersion===Me)return cd(C,Ae),We}else Ae.uniforms=ie.getUniforms(C),C.onBeforeCompile(Ae,y),We=ie.acquireProgram(Ae,Ce),He.set(Ce,We),K.uniforms=Ae.uniforms;const Ue=K.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ue.clippingPlanes=$e.uniform),cd(C,Ae),K.needsLights=Hm(C),K.lightsStateVersion=Me,K.needsLights&&(Ue.ambientLightColor.value=H.state.ambient,Ue.lightProbe.value=H.state.probe,Ue.directionalLights.value=H.state.directional,Ue.directionalLightShadows.value=H.state.directionalShadow,Ue.spotLights.value=H.state.spot,Ue.spotLightShadows.value=H.state.spotShadow,Ue.rectAreaLights.value=H.state.rectArea,Ue.ltc_1.value=H.state.rectAreaLTC1,Ue.ltc_2.value=H.state.rectAreaLTC2,Ue.pointLights.value=H.state.point,Ue.pointLightShadows.value=H.state.pointShadow,Ue.hemisphereLights.value=H.state.hemi,Ue.directionalShadowMap.value=H.state.directionalShadowMap,Ue.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ue.spotShadowMap.value=H.state.spotShadowMap,Ue.spotLightMatrix.value=H.state.spotLightMatrix,Ue.spotLightMap.value=H.state.spotLightMap,Ue.pointShadowMap.value=H.state.pointShadowMap,Ue.pointShadowMatrix.value=H.state.pointShadowMatrix),K.currentProgram=We,K.uniformsList=null,We}function ld(C){if(C.uniformsList===null){const B=C.currentProgram.getUniforms();C.uniformsList=Do.seqWithValue(B.seq,C.uniforms)}return C.uniformsList}function cd(C,B){const j=ve.get(C);j.outputColorSpace=B.outputColorSpace,j.batching=B.batching,j.batchingColor=B.batchingColor,j.instancing=B.instancing,j.instancingColor=B.instancingColor,j.instancingMorph=B.instancingMorph,j.skinning=B.skinning,j.morphTargets=B.morphTargets,j.morphNormals=B.morphNormals,j.morphColors=B.morphColors,j.morphTargetsCount=B.morphTargetsCount,j.numClippingPlanes=B.numClippingPlanes,j.numIntersection=B.numClipIntersection,j.vertexAlphas=B.vertexAlphas,j.vertexTangents=B.vertexTangents,j.toneMapping=B.toneMapping}function km(C,B,j,K,H){B.isScene!==!0&&(B=je),Ee.resetTextureUnits();const fe=B.fog,Me=K.isMeshStandardMaterial?B.environment:null,Ae=w===null?y.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Zi,Ce=(K.isMeshStandardMaterial?T:D).get(K.envMap||Me),He=K.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,We=!!j.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ue=!!j.morphAttributes.position,nt=!!j.morphAttributes.normal,_t=!!j.morphAttributes.color;let vt=zi;K.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(vt=y.toneMapping);const ln=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,it=ln!==void 0?ln.length:0,De=ve.get(K),kt=m.state.lights;if(J===!0&&(ae===!0||C!==M)){const yn=C===M&&K.id===I;$e.setState(K,C,yn)}let rt=!1;K.version===De.__version?(De.needsLights&&De.lightsStateVersion!==kt.state.version||De.outputColorSpace!==Ae||H.isBatchedMesh&&De.batching===!1||!H.isBatchedMesh&&De.batching===!0||H.isBatchedMesh&&De.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&De.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&De.instancing===!1||!H.isInstancedMesh&&De.instancing===!0||H.isSkinnedMesh&&De.skinning===!1||!H.isSkinnedMesh&&De.skinning===!0||H.isInstancedMesh&&De.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&De.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&De.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&De.instancingMorph===!1&&H.morphTexture!==null||De.envMap!==Ce||K.fog===!0&&De.fog!==fe||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==$e.numPlanes||De.numIntersection!==$e.numIntersection)||De.vertexAlphas!==He||De.vertexTangents!==We||De.morphTargets!==Ue||De.morphNormals!==nt||De.morphColors!==_t||De.toneMapping!==vt||De.morphTargetsCount!==it)&&(rt=!0):(rt=!0,De.__version=K.version);let Rn=De.currentProgram;rt===!0&&(Rn=ka(K,B,H));let Fr=!1,cn=!1,bl=!1;const Et=Rn.getUniforms(),Mi=De.uniforms;if(ee.useProgram(Rn.program)&&(Fr=!0,cn=!0,bl=!0),K.id!==I&&(I=K.id,cn=!0),Fr||M!==C){Et.setValue(P,"projectionMatrix",C.projectionMatrix),Et.setValue(P,"viewMatrix",C.matrixWorldInverse);const yn=Et.map.cameraPosition;yn!==void 0&&yn.setValue(P,ge.setFromMatrixPosition(C.matrixWorld)),_e.logarithmicDepthBuffer&&Et.setValue(P,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Et.setValue(P,"isOrthographic",C.isOrthographicCamera===!0),M!==C&&(M=C,cn=!0,bl=!0)}if(H.isSkinnedMesh){Et.setOptional(P,H,"bindMatrix"),Et.setOptional(P,H,"bindMatrixInverse");const yn=H.skeleton;yn&&(yn.boneTexture===null&&yn.computeBoneTexture(),Et.setValue(P,"boneTexture",yn.boneTexture,Ee))}H.isBatchedMesh&&(Et.setOptional(P,H,"batchingTexture"),Et.setValue(P,"batchingTexture",H._matricesTexture,Ee),Et.setOptional(P,H,"batchingIdTexture"),Et.setValue(P,"batchingIdTexture",H._indirectTexture,Ee),Et.setOptional(P,H,"batchingColorTexture"),H._colorsTexture!==null&&Et.setValue(P,"batchingColorTexture",H._colorsTexture,Ee));const Sl=j.morphAttributes;if((Sl.position!==void 0||Sl.normal!==void 0||Sl.color!==void 0)&&Je.update(H,j,Rn),(cn||De.receiveShadow!==H.receiveShadow)&&(De.receiveShadow=H.receiveShadow,Et.setValue(P,"receiveShadow",H.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(Mi.envMap.value=Ce,Mi.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&B.environment!==null&&(Mi.envMapIntensity.value=B.environmentIntensity),cn&&(Et.setValue(P,"toneMappingExposure",y.toneMappingExposure),De.needsLights&&zm(Mi,bl),fe&&K.fog===!0&&Pe.refreshFogUniforms(Mi,fe),Pe.refreshMaterialUniforms(Mi,K,k,N,m.state.transmissionRenderTarget[C.id]),Do.upload(P,ld(De),Mi,Ee)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Do.upload(P,ld(De),Mi,Ee),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Et.setValue(P,"center",H.center),Et.setValue(P,"modelViewMatrix",H.modelViewMatrix),Et.setValue(P,"normalMatrix",H.normalMatrix),Et.setValue(P,"modelMatrix",H.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const yn=K.uniformsGroups;for(let Ml=0,Vm=yn.length;Ml<Vm;Ml++){const ud=yn[Ml];dt.update(ud,Rn),dt.bind(ud,Rn)}}return Rn}function zm(C,B){C.ambientLightColor.needsUpdate=B,C.lightProbe.needsUpdate=B,C.directionalLights.needsUpdate=B,C.directionalLightShadows.needsUpdate=B,C.pointLights.needsUpdate=B,C.pointLightShadows.needsUpdate=B,C.spotLights.needsUpdate=B,C.spotLightShadows.needsUpdate=B,C.rectAreaLights.needsUpdate=B,C.hemisphereLights.needsUpdate=B}function Hm(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(C,B,j){ve.get(C.texture).__webglTexture=B,ve.get(C.depthTexture).__webglTexture=j;const K=ve.get(C);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=j===void 0,K.__autoAllocateDepthBuffer||oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,B){const j=ve.get(C);j.__webglFramebuffer=B,j.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(C,B=0,j=0){w=C,R=B,A=j;let K=!0,H=null,fe=!1,Me=!1;if(C){const Ce=ve.get(C);Ce.__useDefaultFramebuffer!==void 0?(ee.bindFramebuffer(P.FRAMEBUFFER,null),K=!1):Ce.__webglFramebuffer===void 0?Ee.setupRenderTarget(C):Ce.__hasExternalTextures&&Ee.rebindTextures(C,ve.get(C.texture).__webglTexture,ve.get(C.depthTexture).__webglTexture);const He=C.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Me=!0);const We=ve.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(We[B])?H=We[B][j]:H=We[B],fe=!0):C.samples>0&&Ee.useMultisampledRTT(C)===!1?H=ve.get(C).__webglMultisampledFramebuffer:Array.isArray(We)?H=We[j]:H=We,E.copy(C.viewport),O.copy(C.scissor),G=C.scissorTest}else E.copy(te).multiplyScalar(k).floor(),O.copy(de).multiplyScalar(k).floor(),G=Oe;if(ee.bindFramebuffer(P.FRAMEBUFFER,H)&&K&&ee.drawBuffers(C,H),ee.viewport(E),ee.scissor(O),ee.setScissorTest(G),fe){const Ce=ve.get(C.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ce.__webglTexture,j)}else if(Me){const Ce=ve.get(C.texture),He=B||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ce.__webglTexture,j||0,He)}I=-1},this.readRenderTargetPixels=function(C,B,j,K,H,fe,Me){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=ve.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Me!==void 0&&(Ae=Ae[Me]),Ae){ee.bindFramebuffer(P.FRAMEBUFFER,Ae);try{const Ce=C.texture,He=Ce.format,We=Ce.type;if(!_e.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=C.width-K&&j>=0&&j<=C.height-H&&P.readPixels(B,j,K,H,Ve.convert(He),Ve.convert(We),fe)}finally{const Ce=w!==null?ve.get(w).__webglFramebuffer:null;ee.bindFramebuffer(P.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(C,B,j,K,H,fe,Me){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=ve.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Me!==void 0&&(Ae=Ae[Me]),Ae){ee.bindFramebuffer(P.FRAMEBUFFER,Ae);try{const Ce=C.texture,He=Ce.format,We=Ce.type;if(!_e.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=C.width-K&&j>=0&&j<=C.height-H){const Ue=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Ue),P.bufferData(P.PIXEL_PACK_BUFFER,fe.byteLength,P.STREAM_READ),P.readPixels(B,j,K,H,Ve.convert(He),Ve.convert(We),0),P.flush();const nt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);await H_(P,nt,4);try{P.bindBuffer(P.PIXEL_PACK_BUFFER,Ue),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,fe)}finally{P.deleteBuffer(Ue),P.deleteSync(nt)}return fe}}finally{const Ce=w!==null?ve.get(w).__webglFramebuffer:null;ee.bindFramebuffer(P.FRAMEBUFFER,Ce)}}},this.copyFramebufferToTexture=function(C,B=null,j=0){C.isTexture!==!0&&(Qs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,C=arguments[1]);const K=Math.pow(2,-j),H=Math.floor(C.image.width*K),fe=Math.floor(C.image.height*K),Me=B!==null?B.x:0,Ae=B!==null?B.y:0;Ee.setTexture2D(C,0),P.copyTexSubImage2D(P.TEXTURE_2D,j,0,0,Me,Ae,H,fe),ee.unbindTexture()},this.copyTextureToTexture=function(C,B,j=null,K=null,H=0){C.isTexture!==!0&&(Qs("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,C=arguments[1],B=arguments[2],H=arguments[3]||0,j=null);let fe,Me,Ae,Ce,He,We;j!==null?(fe=j.max.x-j.min.x,Me=j.max.y-j.min.y,Ae=j.min.x,Ce=j.min.y):(fe=C.image.width,Me=C.image.height,Ae=0,Ce=0),K!==null?(He=K.x,We=K.y):(He=0,We=0);const Ue=Ve.convert(B.format),nt=Ve.convert(B.type);Ee.setTexture2D(B,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,B.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,B.unpackAlignment);const _t=P.getParameter(P.UNPACK_ROW_LENGTH),vt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ln=P.getParameter(P.UNPACK_SKIP_PIXELS),it=P.getParameter(P.UNPACK_SKIP_ROWS),De=P.getParameter(P.UNPACK_SKIP_IMAGES),kt=C.isCompressedTexture?C.mipmaps[H]:C.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,kt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,kt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ae),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ce),C.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,H,He,We,fe,Me,Ue,nt,kt.data):C.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,H,He,We,kt.width,kt.height,Ue,kt.data):P.texSubImage2D(P.TEXTURE_2D,H,He,We,fe,Me,Ue,nt,kt),P.pixelStorei(P.UNPACK_ROW_LENGTH,_t),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,vt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ln),P.pixelStorei(P.UNPACK_SKIP_ROWS,it),P.pixelStorei(P.UNPACK_SKIP_IMAGES,De),H===0&&B.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),ee.unbindTexture()},this.copyTextureToTexture3D=function(C,B,j=null,K=null,H=0){C.isTexture!==!0&&(Qs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,K=arguments[1]||null,C=arguments[2],B=arguments[3],H=arguments[4]||0);let fe,Me,Ae,Ce,He,We,Ue,nt,_t;const vt=C.isCompressedTexture?C.mipmaps[H]:C.image;j!==null?(fe=j.max.x-j.min.x,Me=j.max.y-j.min.y,Ae=j.max.z-j.min.z,Ce=j.min.x,He=j.min.y,We=j.min.z):(fe=vt.width,Me=vt.height,Ae=vt.depth,Ce=0,He=0,We=0),K!==null?(Ue=K.x,nt=K.y,_t=K.z):(Ue=0,nt=0,_t=0);const ln=Ve.convert(B.format),it=Ve.convert(B.type);let De;if(B.isData3DTexture)Ee.setTexture3D(B,0),De=P.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)Ee.setTexture2DArray(B,0),De=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,B.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,B.unpackAlignment);const kt=P.getParameter(P.UNPACK_ROW_LENGTH),rt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Rn=P.getParameter(P.UNPACK_SKIP_PIXELS),Fr=P.getParameter(P.UNPACK_SKIP_ROWS),cn=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,vt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,vt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ce),P.pixelStorei(P.UNPACK_SKIP_ROWS,He),P.pixelStorei(P.UNPACK_SKIP_IMAGES,We),C.isDataTexture||C.isData3DTexture?P.texSubImage3D(De,H,Ue,nt,_t,fe,Me,Ae,ln,it,vt.data):B.isCompressedArrayTexture?P.compressedTexSubImage3D(De,H,Ue,nt,_t,fe,Me,Ae,ln,vt.data):P.texSubImage3D(De,H,Ue,nt,_t,fe,Me,Ae,ln,it,vt),P.pixelStorei(P.UNPACK_ROW_LENGTH,kt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,rt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Rn),P.pixelStorei(P.UNPACK_SKIP_ROWS,Fr),P.pixelStorei(P.UNPACK_SKIP_IMAGES,cn),H===0&&B.generateMipmaps&&P.generateMipmap(De),ee.unbindTexture()},this.initRenderTarget=function(C){ve.get(C).__webglFramebuffer===void 0&&Ee.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?Ee.setTextureCube(C,0):C.isData3DTexture?Ee.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Ee.setTexture2DArray(C,0):Ee.setTexture2D(C,0),ee.unbindTexture()},this.resetState=function(){R=0,A=0,w=null,ee.reset(),qe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=t===Cu?"display-p3":"srgb",n.unpackColorSpace=st.workingColorSpace===ll?"display-p3":"srgb"}}class Zb extends mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gi,this.environmentIntensity=1,this.environmentRotation=new gi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Jn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,n){const i=this.getUtoTmapping(t);return this.getPoint(i,n)}getPoints(t=5){const n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return n}getSpacedPoints(t=5){const n=[];for(let i=0;i<=t;i++)n.push(this.getPointAt(i/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),a=0;n.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),a+=i.distanceTo(r),n.push(a),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n){const i=this.getLengths();let r=0;const a=i.length;let o;n?o=n:o=t*i[a-1];let l=0,c=a-1,u;for(;l<=c;)if(r=Math.floor(l+(c-l)/2),u=i[r]-o,u<0)l=r+1;else if(u>0)c=r-1;else{c=r;break}if(r=c,i[r]===o)return r/(a-1);const d=i[r],f=i[r+1]-d,p=(o-d)/f;return(r+p)/(a-1)}getTangent(t,n){let r=t-1e-4,a=t+1e-4;r<0&&(r=0),a>1&&(a=1);const o=this.getPoint(r),l=this.getPoint(a),c=n||(o.isVector2?new he:new U);return c.copy(l).sub(o).normalize(),c}getTangentAt(t,n){const i=this.getUtoTmapping(t);return this.getTangent(i,n)}computeFrenetFrames(t,n){const i=new U,r=[],a=[],o=[],l=new U,c=new At;for(let p=0;p<=t;p++){const v=p/t;r[p]=this.getTangentAt(v,new U)}a[0]=new U,o[0]=new U;let u=Number.MAX_VALUE;const d=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);d<=u&&(u=d,i.set(1,0,0)),h<=u&&(u=h,i.set(0,1,0)),f<=u&&i.set(0,0,1),l.crossVectors(r[0],i).normalize(),a[0].crossVectors(r[0],l),o[0].crossVectors(r[0],a[0]);for(let p=1;p<=t;p++){if(a[p]=a[p-1].clone(),o[p]=o[p-1].clone(),l.crossVectors(r[p-1],r[p]),l.length()>Number.EPSILON){l.normalize();const v=Math.acos(It(r[p-1].dot(r[p]),-1,1));a[p].applyMatrix4(c.makeRotationAxis(l,v))}o[p].crossVectors(r[p],a[p])}if(n===!0){let p=Math.acos(It(a[0].dot(a[t]),-1,1));p/=t,r[0].dot(l.crossVectors(a[0],a[t]))>0&&(p=-p);for(let v=1;v<=t;v++)a[v].applyMatrix4(c.makeRotationAxis(r[v],p*v)),o[v].crossVectors(r[v],a[v])}return{tangents:r,normals:a,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Du extends Jn{constructor(t=0,n=0,i=1,r=1,a=0,o=Math.PI*2,l=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=o,this.aClockwise=l,this.aRotation=c}getPoint(t,n=new he){const i=n,r=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const o=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(o?a=0:a=r),this.aClockwise===!0&&!o&&(a===r?a=-r:a=a-r);const l=this.aStartAngle+t*a;let c=this.aX+this.xRadius*Math.cos(l),u=this.aY+this.yRadius*Math.sin(l);if(this.aRotation!==0){const d=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,p=u-this.aY;c=f*d-p*h+this.aX,u=f*h+p*d+this.aY}return i.set(c,u)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Jb extends Du{constructor(t,n,i,r,a,o){super(t,n,i,i,r,a,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Iu(){let s=0,t=0,n=0,i=0;function r(a,o,l,c){s=a,t=l,n=-3*a+3*o-2*l-c,i=2*a-2*o+l+c}return{initCatmullRom:function(a,o,l,c,u){r(o,l,u*(l-a),u*(c-o))},initNonuniformCatmullRom:function(a,o,l,c,u,d,h){let f=(o-a)/u-(l-a)/(u+d)+(l-o)/d,p=(l-o)/d-(c-o)/(d+h)+(c-l)/h;f*=d,p*=d,r(o,l,f,p)},calc:function(a){const o=a*a,l=o*a;return s+t*a+n*o+i*l}}}const fo=new U,Ql=new Iu,ec=new Iu,tc=new Iu;class Qb extends Jn{constructor(t=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=i,this.tension=r}getPoint(t,n=new U){const i=n,r=this.points,a=r.length,o=(a-(this.closed?0:1))*t;let l=Math.floor(o),c=o-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/a)+1)*a:c===0&&l===a-1&&(l=a-2,c=1);let u,d;this.closed||l>0?u=r[(l-1)%a]:(fo.subVectors(r[0],r[1]).add(r[0]),u=fo);const h=r[l%a],f=r[(l+1)%a];if(this.closed||l+2<a?d=r[(l+2)%a]:(fo.subVectors(r[a-1],r[a-2]).add(r[a-1]),d=fo),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let v=Math.pow(u.distanceToSquared(h),p),_=Math.pow(h.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(d),p);_<1e-4&&(_=1),v<1e-4&&(v=_),m<1e-4&&(m=_),Ql.initNonuniformCatmullRom(u.x,h.x,f.x,d.x,v,_,m),ec.initNonuniformCatmullRom(u.y,h.y,f.y,d.y,v,_,m),tc.initNonuniformCatmullRom(u.z,h.z,f.z,d.z,v,_,m)}else this.curveType==="catmullrom"&&(Ql.initCatmullRom(u.x,h.x,f.x,d.x,this.tension),ec.initCatmullRom(u.y,h.y,f.y,d.y,this.tension),tc.initCatmullRom(u.z,h.z,f.z,d.z,this.tension));return i.set(Ql.calc(c),ec.calc(c),tc.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){const r=t.points[n];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){const r=t.points[n];this.points.push(new U().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Af(s,t,n,i,r){const a=(i-t)*.5,o=(r-n)*.5,l=s*s,c=s*l;return(2*n-2*i+a+o)*c+(-3*n+3*i-2*a-o)*l+a*s+n}function eS(s,t){const n=1-s;return n*n*t}function tS(s,t){return 2*(1-s)*s*t}function nS(s,t){return s*s*t}function ea(s,t,n,i){return eS(s,t)+tS(s,n)+nS(s,i)}function iS(s,t){const n=1-s;return n*n*n*t}function rS(s,t){const n=1-s;return 3*n*n*s*t}function sS(s,t){return 3*(1-s)*s*s*t}function aS(s,t){return s*s*s*t}function ta(s,t,n,i,r){return iS(s,t)+rS(s,n)+sS(s,i)+aS(s,r)}class Qh extends Jn{constructor(t=new he,n=new he,i=new he,r=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=i,this.v3=r}getPoint(t,n=new he){const i=n,r=this.v0,a=this.v1,o=this.v2,l=this.v3;return i.set(ta(t,r.x,a.x,o.x,l.x),ta(t,r.y,a.y,o.y,l.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class oS extends Jn{constructor(t=new U,n=new U,i=new U,r=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=i,this.v3=r}getPoint(t,n=new U){const i=n,r=this.v0,a=this.v1,o=this.v2,l=this.v3;return i.set(ta(t,r.x,a.x,o.x,l.x),ta(t,r.y,a.y,o.y,l.y),ta(t,r.z,a.z,o.z,l.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ep extends Jn{constructor(t=new he,n=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new he){const i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new he){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class lS extends Jn{constructor(t=new U,n=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new U){const i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new U){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class tp extends Jn{constructor(t=new he,n=new he,i=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new he){const i=n,r=this.v0,a=this.v1,o=this.v2;return i.set(ea(t,r.x,a.x,o.x),ea(t,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class cS extends Jn{constructor(t=new U,n=new U,i=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new U){const i=n,r=this.v0,a=this.v1,o=this.v2;return i.set(ea(t,r.x,a.x,o.x),ea(t,r.y,a.y,o.y),ea(t,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class np extends Jn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new he){const i=n,r=this.points,a=(r.length-1)*t,o=Math.floor(a),l=a-o,c=r[o===0?o:o-1],u=r[o],d=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return i.set(Af(l,c.x,u.x,d.x,h.x),Af(l,c.y,u.y,d.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){const r=t.points[n];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){const r=t.points[n];this.points.push(new he().fromArray(r))}return this}}var Zc=Object.freeze({__proto__:null,ArcCurve:Jb,CatmullRomCurve3:Qb,CubicBezierCurve:Qh,CubicBezierCurve3:oS,EllipseCurve:Du,LineCurve:ep,LineCurve3:lS,QuadraticBezierCurve:tp,QuadraticBezierCurve3:cS,SplineCurve:np});class uS extends Jn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Zc[i](n,t))}return this}getPoint(t,n){const i=t*this.getLength(),r=this.getCurveLengths();let a=0;for(;a<r.length;){if(r[a]>=i){const o=r[a]-i,l=this.curves[a],c=l.getLength(),u=c===0?0:1-o/c;return l.getPointAt(u,n)}a++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){const n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){const n=[];let i;for(let r=0,a=this.curves;r<a.length;r++){const o=a[r],l=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(l);for(let u=0;u<c.length;u++){const d=c[u];i&&i.equals(d)||(n.push(d),i=d)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){const r=t.curves[n];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){const r=t.curves[n];this.curves.push(new Zc[r.type]().fromJSON(r))}return this}}class Jc extends uS{constructor(t){super(),this.type="Path",this.currentPoint=new he,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,i=t.length;n<i;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){const i=new ep(this.currentPoint.clone(),new he(t,n));return this.curves.push(i),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,i,r){const a=new tp(this.currentPoint.clone(),new he(t,n),new he(i,r));return this.curves.push(a),this.currentPoint.set(i,r),this}bezierCurveTo(t,n,i,r,a,o){const l=new Qh(this.currentPoint.clone(),new he(t,n),new he(i,r),new he(a,o));return this.curves.push(l),this.currentPoint.set(a,o),this}splineThru(t){const n=[this.currentPoint.clone()].concat(t),i=new np(n);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,i,r,a,o){const l=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+l,n+c,i,r,a,o),this}absarc(t,n,i,r,a,o){return this.absellipse(t,n,i,i,r,a,o),this}ellipse(t,n,i,r,a,o,l,c){const u=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(t+u,n+d,i,r,a,o,l,c),this}absellipse(t,n,i,r,a,o,l,c){const u=new Du(t,n,i,r,a,o,l,c);if(this.curves.length>0){const h=u.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(u);const d=u.getPoint(1);return this.currentPoint.copy(d),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Io extends Jc{constructor(t){super(t),this.uuid=Ir(),this.type="Shape",this.holes=[]}getPointsHoles(t){const n=[];for(let i=0,r=this.holes.length;i<r;i++)n[i]=this.holes[i].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){const r=t.holes[n];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const r=this.holes[n];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){const r=t.holes[n];this.holes.push(new Jc().fromJSON(r))}return this}}const dS={triangulate:function(s,t,n=2){const i=t&&t.length,r=i?t[0]*n:s.length;let a=ip(s,0,r,n,!0);const o=[];if(!a||a.next===a.prev)return o;let l,c,u,d,h,f,p;if(i&&(a=gS(s,t,a,n)),s.length>80*n){l=u=s[0],c=d=s[1];for(let v=n;v<r;v+=n)h=s[v],f=s[v+1],h<l&&(l=h),f<c&&(c=f),h>u&&(u=h),f>d&&(d=f);p=Math.max(u-l,d-c),p=p!==0?32767/p:0}return ua(a,o,n,l,c,p,0),o}};function ip(s,t,n,i,r){let a,o;if(r===AS(s,t,n,i)>0)for(a=t;a<n;a+=i)o=Cf(a,s[a],s[a+1],o);else for(a=n-i;a>=t;a-=i)o=Cf(a,s[a],s[a+1],o);return o&&dl(o,o.next)&&(fa(o),o=o.next),o}function Rr(s,t){if(!s)return s;t||(t=s);let n=s,i;do if(i=!1,!n.steiner&&(dl(n,n.next)||mt(n.prev,n,n.next)===0)){if(fa(n),n=t=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==t);return t}function ua(s,t,n,i,r,a,o){if(!s)return;!o&&a&&bS(s,i,r,a);let l=s,c,u;for(;s.prev!==s.next;){if(c=s.prev,u=s.next,a?hS(s,i,r,a):fS(s)){t.push(c.i/n|0),t.push(s.i/n|0),t.push(u.i/n|0),fa(s),s=u.next,l=u.next;continue}if(s=u,s===l){o?o===1?(s=pS(Rr(s),t,n),ua(s,t,n,i,r,a,2)):o===2&&mS(s,t,n,i,r,a):ua(Rr(s),t,n,i,r,a,1);break}}}function fS(s){const t=s.prev,n=s,i=s.next;if(mt(t,n,i)>=0)return!1;const r=t.x,a=n.x,o=i.x,l=t.y,c=n.y,u=i.y,d=r<a?r<o?r:o:a<o?a:o,h=l<c?l<u?l:u:c<u?c:u,f=r>a?r>o?r:o:a>o?a:o,p=l>c?l>u?l:u:c>u?c:u;let v=i.next;for(;v!==t;){if(v.x>=d&&v.x<=f&&v.y>=h&&v.y<=p&&ls(r,l,a,c,o,u,v.x,v.y)&&mt(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function hS(s,t,n,i){const r=s.prev,a=s,o=s.next;if(mt(r,a,o)>=0)return!1;const l=r.x,c=a.x,u=o.x,d=r.y,h=a.y,f=o.y,p=l<c?l<u?l:u:c<u?c:u,v=d<h?d<f?d:f:h<f?h:f,_=l>c?l>u?l:u:c>u?c:u,m=d>h?d>f?d:f:h>f?h:f,g=Qc(p,v,t,n,i),S=Qc(_,m,t,n,i);let y=s.prevZ,x=s.nextZ;for(;y&&y.z>=g&&x&&x.z<=S;){if(y.x>=p&&y.x<=_&&y.y>=v&&y.y<=m&&y!==r&&y!==o&&ls(l,d,c,h,u,f,y.x,y.y)&&mt(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=p&&x.x<=_&&x.y>=v&&x.y<=m&&x!==r&&x!==o&&ls(l,d,c,h,u,f,x.x,x.y)&&mt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=g;){if(y.x>=p&&y.x<=_&&y.y>=v&&y.y<=m&&y!==r&&y!==o&&ls(l,d,c,h,u,f,y.x,y.y)&&mt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=S;){if(x.x>=p&&x.x<=_&&x.y>=v&&x.y<=m&&x!==r&&x!==o&&ls(l,d,c,h,u,f,x.x,x.y)&&mt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function pS(s,t,n){let i=s;do{const r=i.prev,a=i.next.next;!dl(r,a)&&rp(r,i,i.next,a)&&da(r,a)&&da(a,r)&&(t.push(r.i/n|0),t.push(i.i/n|0),t.push(a.i/n|0),fa(i),fa(i.next),i=s=a),i=i.next}while(i!==s);return Rr(i)}function mS(s,t,n,i,r,a){let o=s;do{let l=o.next.next;for(;l!==o.prev;){if(o.i!==l.i&&ES(o,l)){let c=sp(o,l);o=Rr(o,o.next),c=Rr(c,c.next),ua(o,t,n,i,r,a,0),ua(c,t,n,i,r,a,0);return}l=l.next}o=o.next}while(o!==s)}function gS(s,t,n,i){const r=[];let a,o,l,c,u;for(a=0,o=t.length;a<o;a++)l=t[a]*i,c=a<o-1?t[a+1]*i:s.length,u=ip(s,l,c,i,!1),u===u.next&&(u.steiner=!0),r.push(MS(u));for(r.sort(_S),a=0;a<r.length;a++)n=vS(r[a],n);return n}function _S(s,t){return s.x-t.x}function vS(s,t){const n=yS(s,t);if(!n)return t;const i=sp(n,s);return Rr(i,i.next),Rr(n,n.next)}function yS(s,t){let n=t,i=-1/0,r;const a=s.x,o=s.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const f=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(f<=a&&f>i&&(i=f,r=n.x<n.next.x?n:n.next,f===a))return r}n=n.next}while(n!==t);if(!r)return null;const l=r,c=r.x,u=r.y;let d=1/0,h;n=r;do a>=n.x&&n.x>=c&&a!==n.x&&ls(o<u?a:i,o,c,u,o<u?i:a,o,n.x,n.y)&&(h=Math.abs(o-n.y)/(a-n.x),da(n,s)&&(h<d||h===d&&(n.x>r.x||n.x===r.x&&xS(r,n)))&&(r=n,d=h)),n=n.next;while(n!==l);return r}function xS(s,t){return mt(s.prev,s,t.prev)<0&&mt(t.next,s,s.next)<0}function bS(s,t,n,i){let r=s;do r.z===0&&(r.z=Qc(r.x,r.y,t,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==s);r.prevZ.nextZ=null,r.prevZ=null,SS(r)}function SS(s){let t,n,i,r,a,o,l,c,u=1;do{for(n=s,s=null,a=null,o=0;n;){for(o++,i=n,l=0,t=0;t<u&&(l++,i=i.nextZ,!!i);t++);for(c=u;l>0||c>0&&i;)l!==0&&(c===0||!i||n.z<=i.z)?(r=n,n=n.nextZ,l--):(r=i,i=i.nextZ,c--),a?a.nextZ=r:s=r,r.prevZ=a,a=r;n=i}a.nextZ=null,u*=2}while(o>1);return s}function Qc(s,t,n,i,r){return s=(s-n)*r|0,t=(t-i)*r|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function MS(s){let t=s,n=s;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==s);return n}function ls(s,t,n,i,r,a,o,l){return(r-o)*(t-l)>=(s-o)*(a-l)&&(s-o)*(i-l)>=(n-o)*(t-l)&&(n-o)*(a-l)>=(r-o)*(i-l)}function ES(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!TS(s,t)&&(da(s,t)&&da(t,s)&&wS(s,t)&&(mt(s.prev,s,t.prev)||mt(s,t.prev,t))||dl(s,t)&&mt(s.prev,s,s.next)>0&&mt(t.prev,t,t.next)>0)}function mt(s,t,n){return(t.y-s.y)*(n.x-t.x)-(t.x-s.x)*(n.y-t.y)}function dl(s,t){return s.x===t.x&&s.y===t.y}function rp(s,t,n,i){const r=po(mt(s,t,n)),a=po(mt(s,t,i)),o=po(mt(n,i,s)),l=po(mt(n,i,t));return!!(r!==a&&o!==l||r===0&&ho(s,n,t)||a===0&&ho(s,i,t)||o===0&&ho(n,s,i)||l===0&&ho(n,t,i))}function ho(s,t,n){return t.x<=Math.max(s.x,n.x)&&t.x>=Math.min(s.x,n.x)&&t.y<=Math.max(s.y,n.y)&&t.y>=Math.min(s.y,n.y)}function po(s){return s>0?1:s<0?-1:0}function TS(s,t){let n=s;do{if(n.i!==s.i&&n.next.i!==s.i&&n.i!==t.i&&n.next.i!==t.i&&rp(n,n.next,s,t))return!0;n=n.next}while(n!==s);return!1}function da(s,t){return mt(s.prev,s,s.next)<0?mt(s,t,s.next)>=0&&mt(s,s.prev,t)>=0:mt(s,t,s.prev)<0||mt(s,s.next,t)<0}function wS(s,t){let n=s,i=!1;const r=(s.x+t.x)/2,a=(s.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&r<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==s);return i}function sp(s,t){const n=new eu(s.i,s.x,s.y),i=new eu(t.i,t.x,t.y),r=s.next,a=t.prev;return s.next=t,t.prev=s,n.next=r,r.prev=n,i.next=n,n.prev=i,a.next=i,i.prev=a,i}function Cf(s,t,n,i){const r=new eu(s,t,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function fa(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function eu(s,t,n){this.i=s,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function AS(s,t,n,i){let r=0;for(let a=t,o=n-i;a<n;a+=i)r+=(s[o]-s[a])*(s[a+1]+s[o+1]),o=a;return r}class _s{static area(t){const n=t.length;let i=0;for(let r=n-1,a=0;a<n;r=a++)i+=t[r].x*t[a].y-t[a].x*t[r].y;return i*.5}static isClockWise(t){return _s.area(t)<0}static triangulateShape(t,n){const i=[],r=[],a=[];Rf(t),Pf(i,t);let o=t.length;n.forEach(Rf);for(let c=0;c<n.length;c++)r.push(o),o+=n[c].length,Pf(i,n[c]);const l=dS.triangulate(i,r);for(let c=0;c<l.length;c+=3)a.push(l.slice(c,c+3));return a}}function Rf(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Pf(s,t){for(let n=0;n<t.length;n++)s.push(t[n].x),s.push(t[n].y)}class Ou extends xi{constructor(t=new Io([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:n},t=Array.isArray(t)?t:[t];const i=this,r=[],a=[];for(let l=0,c=t.length;l<c;l++){const u=t[l];o(u)}this.setAttribute("position",new An(r,3)),this.setAttribute("uv",new An(a,2)),this.computeVertexNormals();function o(l){const c=[],u=n.curveSegments!==void 0?n.curveSegments:12,d=n.steps!==void 0?n.steps:1,h=n.depth!==void 0?n.depth:1;let f=n.bevelEnabled!==void 0?n.bevelEnabled:!0,p=n.bevelThickness!==void 0?n.bevelThickness:.2,v=n.bevelSize!==void 0?n.bevelSize:p-.1,_=n.bevelOffset!==void 0?n.bevelOffset:0,m=n.bevelSegments!==void 0?n.bevelSegments:3;const g=n.extrudePath,S=n.UVGenerator!==void 0?n.UVGenerator:CS;let y,x=!1,R,A,w,I;g&&(y=g.getSpacedPoints(d),x=!0,f=!1,R=g.computeFrenetFrames(d,!1),A=new U,w=new U,I=new U),f||(m=0,p=0,v=0,_=0);const M=l.extractPoints(u);let E=M.shape;const O=M.holes;if(!_s.isClockWise(E)){E=E.reverse();for(let P=0,ue=O.length;P<ue;P++){const oe=O[P];_s.isClockWise(oe)&&(O[P]=oe.reverse())}}const z=_s.triangulateShape(E,O),Y=E;for(let P=0,ue=O.length;P<ue;P++){const oe=O[P];E=E.concat(oe)}function L(P,ue,oe){return ue||console.error("THREE.ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(ue,oe)}const N=E.length,k=z.length;function F(P,ue,oe){let _e,ee,Ie;const ve=P.x-ue.x,Ee=P.y-ue.y,D=oe.x-P.x,T=oe.y-P.y,q=ve*ve+Ee*Ee,se=ve*T-Ee*D;if(Math.abs(se)>Number.EPSILON){const re=Math.sqrt(q),ie=Math.sqrt(D*D+T*T),Pe=ue.x-Ee/re,me=ue.y+ve/re,Se=oe.x-T/ie,$e=oe.y+D/ie,ce=((Se-Pe)*T-($e-me)*D)/(ve*T-Ee*D);_e=Pe+ve*ce-P.x,ee=me+Ee*ce-P.y;const be=_e*_e+ee*ee;if(be<=2)return new he(_e,ee);Ie=Math.sqrt(be/2)}else{let re=!1;ve>Number.EPSILON?D>Number.EPSILON&&(re=!0):ve<-Number.EPSILON?D<-Number.EPSILON&&(re=!0):Math.sign(Ee)===Math.sign(T)&&(re=!0),re?(_e=-Ee,ee=ve,Ie=Math.sqrt(q)):(_e=ve,ee=Ee,Ie=Math.sqrt(q/2))}return new he(_e/Ie,ee/Ie)}const ne=[];for(let P=0,ue=Y.length,oe=ue-1,_e=P+1;P<ue;P++,oe++,_e++)oe===ue&&(oe=0),_e===ue&&(_e=0),ne[P]=F(Y[P],Y[oe],Y[_e]);const te=[];let de,Oe=ne.concat();for(let P=0,ue=O.length;P<ue;P++){const oe=O[P];de=[];for(let _e=0,ee=oe.length,Ie=ee-1,ve=_e+1;_e<ee;_e++,Ie++,ve++)Ie===ee&&(Ie=0),ve===ee&&(ve=0),de[_e]=F(oe[_e],oe[Ie],oe[ve]);te.push(de),Oe=Oe.concat(de)}for(let P=0;P<m;P++){const ue=P/m,oe=p*Math.cos(ue*Math.PI/2),_e=v*Math.sin(ue*Math.PI/2)+_;for(let ee=0,Ie=Y.length;ee<Ie;ee++){const ve=L(Y[ee],ne[ee],_e);ge(ve.x,ve.y,-oe)}for(let ee=0,Ie=O.length;ee<Ie;ee++){const ve=O[ee];de=te[ee];for(let Ee=0,D=ve.length;Ee<D;Ee++){const T=L(ve[Ee],de[Ee],_e);ge(T.x,T.y,-oe)}}}const Ne=v+_;for(let P=0;P<N;P++){const ue=f?L(E[P],Oe[P],Ne):E[P];x?(w.copy(R.normals[0]).multiplyScalar(ue.x),A.copy(R.binormals[0]).multiplyScalar(ue.y),I.copy(y[0]).add(w).add(A),ge(I.x,I.y,I.z)):ge(ue.x,ue.y,0)}for(let P=1;P<=d;P++)for(let ue=0;ue<N;ue++){const oe=f?L(E[ue],Oe[ue],Ne):E[ue];x?(w.copy(R.normals[P]).multiplyScalar(oe.x),A.copy(R.binormals[P]).multiplyScalar(oe.y),I.copy(y[P]).add(w).add(A),ge(I.x,I.y,I.z)):ge(oe.x,oe.y,h/d*P)}for(let P=m-1;P>=0;P--){const ue=P/m,oe=p*Math.cos(ue*Math.PI/2),_e=v*Math.sin(ue*Math.PI/2)+_;for(let ee=0,Ie=Y.length;ee<Ie;ee++){const ve=L(Y[ee],ne[ee],_e);ge(ve.x,ve.y,h+oe)}for(let ee=0,Ie=O.length;ee<Ie;ee++){const ve=O[ee];de=te[ee];for(let Ee=0,D=ve.length;Ee<D;Ee++){const T=L(ve[Ee],de[Ee],_e);x?ge(T.x,T.y+y[d-1].y,y[d-1].x+oe):ge(T.x,T.y,h+oe)}}}J(),ae();function J(){const P=r.length/3;if(f){let ue=0,oe=N*ue;for(let _e=0;_e<k;_e++){const ee=z[_e];ke(ee[2]+oe,ee[1]+oe,ee[0]+oe)}ue=d+m*2,oe=N*ue;for(let _e=0;_e<k;_e++){const ee=z[_e];ke(ee[0]+oe,ee[1]+oe,ee[2]+oe)}}else{for(let ue=0;ue<k;ue++){const oe=z[ue];ke(oe[2],oe[1],oe[0])}for(let ue=0;ue<k;ue++){const oe=z[ue];ke(oe[0]+N*d,oe[1]+N*d,oe[2]+N*d)}}i.addGroup(P,r.length/3-P,0)}function ae(){const P=r.length/3;let ue=0;Te(Y,ue),ue+=Y.length;for(let oe=0,_e=O.length;oe<_e;oe++){const ee=O[oe];Te(ee,ue),ue+=ee.length}i.addGroup(P,r.length/3-P,1)}function Te(P,ue){let oe=P.length;for(;--oe>=0;){const _e=oe;let ee=oe-1;ee<0&&(ee=P.length-1);for(let Ie=0,ve=d+m*2;Ie<ve;Ie++){const Ee=N*Ie,D=N*(Ie+1),T=ue+_e+Ee,q=ue+ee+Ee,se=ue+ee+D,re=ue+_e+D;je(T,q,se,re)}}}function ge(P,ue,oe){c.push(P),c.push(ue),c.push(oe)}function ke(P,ue,oe){Fe(P),Fe(ue),Fe(oe);const _e=r.length/3,ee=S.generateTopUV(i,r,_e-3,_e-2,_e-1);Qe(ee[0]),Qe(ee[1]),Qe(ee[2])}function je(P,ue,oe,_e){Fe(P),Fe(ue),Fe(_e),Fe(ue),Fe(oe),Fe(_e);const ee=r.length/3,Ie=S.generateSideWallUV(i,r,ee-6,ee-3,ee-2,ee-1);Qe(Ie[0]),Qe(Ie[1]),Qe(Ie[3]),Qe(Ie[1]),Qe(Ie[2]),Qe(Ie[3])}function Fe(P){r.push(c[P*3+0]),r.push(c[P*3+1]),r.push(c[P*3+2])}function Qe(P){a.push(P.x),a.push(P.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return RS(n,i,t)}static fromJSON(t,n){const i=[];for(let a=0,o=t.shapes.length;a<o;a++){const l=n[t.shapes[a]];i.push(l)}const r=t.options.extrudePath;return r!==void 0&&(t.options.extrudePath=new Zc[r.type]().fromJSON(r)),new Ou(i,t.options)}}const CS={generateTopUV:function(s,t,n,i,r){const a=t[n*3],o=t[n*3+1],l=t[i*3],c=t[i*3+1],u=t[r*3],d=t[r*3+1];return[new he(a,o),new he(l,c),new he(u,d)]},generateSideWallUV:function(s,t,n,i,r,a){const o=t[n*3],l=t[n*3+1],c=t[n*3+2],u=t[i*3],d=t[i*3+1],h=t[i*3+2],f=t[r*3],p=t[r*3+1],v=t[r*3+2],_=t[a*3],m=t[a*3+1],g=t[a*3+2];return Math.abs(l-d)<Math.abs(o-u)?[new he(o,1-c),new he(u,1-h),new he(f,1-v),new he(_,1-g)]:[new he(l,1-c),new he(d,1-h),new he(p,1-v),new he(m,1-g)]}};function RS(s,t,n){if(n.shapes=[],Array.isArray(s))for(let i=0,r=s.length;i<r;i++){const a=s[i];n.shapes.push(a.uuid)}else n.shapes.push(s.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}class bi extends xi{constructor(t=1,n=32,i=16,r=0,a=Math.PI*2,o=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:r,phiLength:a,thetaStart:o,thetaLength:l},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(o+l,Math.PI);let u=0;const d=[],h=new U,f=new U,p=[],v=[],_=[],m=[];for(let g=0;g<=i;g++){const S=[],y=g/i;let x=0;g===0&&o===0?x=.5/n:g===i&&c===Math.PI&&(x=-.5/n);for(let R=0;R<=n;R++){const A=R/n;h.x=-t*Math.cos(r+A*a)*Math.sin(o+y*l),h.y=t*Math.cos(o+y*l),h.z=t*Math.sin(r+A*a)*Math.sin(o+y*l),v.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(A+x,1-y),S.push(u++)}d.push(S)}for(let g=0;g<i;g++)for(let S=0;S<n;S++){const y=d[g][S+1],x=d[g][S],R=d[g+1][S],A=d[g+1][S+1];(g!==0||o>0)&&p.push(y,x,A),(g!==i-1||c<Math.PI)&&p.push(x,R,A)}this.setIndex(p),this.setAttribute("position",new An(v,3)),this.setAttribute("normal",new An(_,3)),this.setAttribute("uv",new An(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class fl extends Ea{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Dh,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}const jo={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class PS{constructor(t,n,i){const r=this;let a=!1,o=0,l=0,c;const u=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this.itemStart=function(d){l++,a===!1&&r.onStart!==void 0&&r.onStart(d,o,l),a=!0},this.itemEnd=function(d){o++,r.onProgress!==void 0&&r.onProgress(d,o,l),o===l&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,h){return u.push(d,h),this},this.removeHandler=function(d){const h=u.indexOf(d);return h!==-1&&u.splice(h,2),this},this.getHandler=function(d){for(let h=0,f=u.length;h<f;h+=2){const p=u[h],v=u[h+1];if(p.global&&(p.lastIndex=0),p.test(d))return v}return null}}}const LS=new PS;class Ta{constructor(t){this.manager=t!==void 0?t:LS,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,n){const i=this;return new Promise(function(r,a){i.load(t,r,n,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Ta.DEFAULT_MATERIAL_NAME="__DEFAULT";const si={};class DS extends Error{constructor(t,n){super(t),this.response=n}}class IS extends Ta{constructor(t){super(t)}load(t,n,i,r){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const a=jo.get(t);if(a!==void 0)return this.manager.itemStart(t),setTimeout(()=>{n&&n(a),this.manager.itemEnd(t)},0),a;if(si[t]!==void 0){si[t].push({onLoad:n,onProgress:i,onError:r});return}si[t]=[],si[t].push({onLoad:n,onProgress:i,onError:r});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),l=this.mimeType,c=this.responseType;fetch(o).then(u=>{if(u.status===200||u.status===0){if(u.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||u.body===void 0||u.body.getReader===void 0)return u;const d=si[t],h=u.body.getReader(),f=u.headers.get("X-File-Size")||u.headers.get("Content-Length"),p=f?parseInt(f):0,v=p!==0;let _=0;const m=new ReadableStream({start(g){S();function S(){h.read().then(({done:y,value:x})=>{if(y)g.close();else{_+=x.byteLength;const R=new ProgressEvent("progress",{lengthComputable:v,loaded:_,total:p});for(let A=0,w=d.length;A<w;A++){const I=d[A];I.onProgress&&I.onProgress(R)}g.enqueue(x),S()}},y=>{g.error(y)})}}});return new Response(m)}else throw new DS(`fetch for "${u.url}" responded with ${u.status}: ${u.statusText}`,u)}).then(u=>{switch(c){case"arraybuffer":return u.arrayBuffer();case"blob":return u.blob();case"document":return u.text().then(d=>new DOMParser().parseFromString(d,l));case"json":return u.json();default:if(l===void 0)return u.text();{const h=/charset="?([^;"\s]*)"?/i.exec(l),f=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(f);return u.arrayBuffer().then(v=>p.decode(v))}}}).then(u=>{jo.add(t,u);const d=si[t];delete si[t];for(let h=0,f=d.length;h<f;h++){const p=d[h];p.onLoad&&p.onLoad(u)}}).catch(u=>{const d=si[t];if(d===void 0)throw this.manager.itemError(t),u;delete si[t];for(let h=0,f=d.length;h<f;h++){const p=d[h];p.onError&&p.onError(u)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class OS extends Ta{constructor(t){super(t)}load(t,n,i,r){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const a=this,o=jo.get(t);if(o!==void 0)return a.manager.itemStart(t),setTimeout(function(){n&&n(o),a.manager.itemEnd(t)},0),o;const l=ca("img");function c(){d(),jo.add(t,this),n&&n(this),a.manager.itemEnd(t)}function u(h){d(),r&&r(h),a.manager.itemError(t),a.manager.itemEnd(t)}function d(){l.removeEventListener("load",c,!1),l.removeEventListener("error",u,!1)}return l.addEventListener("load",c,!1),l.addEventListener("error",u,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(l.crossOrigin=this.crossOrigin),a.manager.itemStart(t),l.src=t,l}}class NS extends Ta{constructor(t){super(t)}load(t,n,i,r){const a=new Zt,o=new OS(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(l){a.image=l,a.needsUpdate=!0,n!==void 0&&n(a)},i,r),a}}class US{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Lf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=Lf();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}}function Lf(){return(typeof performance>"u"?Date:performance).now()}class Df{constructor(t=1,n=0,i=0){return this.radius=t,this.phi=n,this.theta=i,this}set(t,n,i){return this.radius=t,this.phi=n,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,n,i){return this.radius=Math.sqrt(t*t+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(It(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class FS{constructor(){this.type="ShapePath",this.color=new Be,this.subPaths=[],this.currentPath=null}moveTo(t,n){return this.currentPath=new Jc,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,n),this}lineTo(t,n){return this.currentPath.lineTo(t,n),this}quadraticCurveTo(t,n,i,r){return this.currentPath.quadraticCurveTo(t,n,i,r),this}bezierCurveTo(t,n,i,r,a,o){return this.currentPath.bezierCurveTo(t,n,i,r,a,o),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(t){function n(g){const S=[];for(let y=0,x=g.length;y<x;y++){const R=g[y],A=new Io;A.curves=R.curves,S.push(A)}return S}function i(g,S){const y=S.length;let x=!1;for(let R=y-1,A=0;A<y;R=A++){let w=S[R],I=S[A],M=I.x-w.x,E=I.y-w.y;if(Math.abs(E)>Number.EPSILON){if(E<0&&(w=S[A],M=-M,I=S[R],E=-E),g.y<w.y||g.y>I.y)continue;if(g.y===w.y){if(g.x===w.x)return!0}else{const O=E*(g.x-w.x)-M*(g.y-w.y);if(O===0)return!0;if(O<0)continue;x=!x}}else{if(g.y!==w.y)continue;if(I.x<=g.x&&g.x<=w.x||w.x<=g.x&&g.x<=I.x)return!0}}return x}const r=_s.isClockWise,a=this.subPaths;if(a.length===0)return[];let o,l,c;const u=[];if(a.length===1)return l=a[0],c=new Io,c.curves=l.curves,u.push(c),u;let d=!r(a[0].getPoints());d=t?!d:d;const h=[],f=[];let p=[],v=0,_;f[v]=void 0,p[v]=[];for(let g=0,S=a.length;g<S;g++)l=a[g],_=l.getPoints(),o=r(_),o=t?!o:o,o?(!d&&f[v]&&v++,f[v]={s:new Io,p:_},f[v].s.curves=l.curves,d&&v++,p[v]=[]):p[v].push({h:l,p:_[0]});if(!f[0])return n(a);if(f.length>1){let g=!1,S=0;for(let y=0,x=f.length;y<x;y++)h[y]=[];for(let y=0,x=f.length;y<x;y++){const R=p[y];for(let A=0;A<R.length;A++){const w=R[A];let I=!0;for(let M=0;M<f.length;M++)i(w.p,f[M].p)&&(y!==M&&S++,I?(I=!1,h[M].push(w)):g=!0);I&&h[y].push(w)}}S>0&&g===!1&&(p=h)}let m;for(let g=0,S=f.length;g<S;g++){c=f[g].s,u.push(c),m=p[g];for(let y=0,x=m.length;y<x;y++)c.holes.push(m[y].h)}return u}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bu);function oi(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function ap(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t}/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var gn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Rs={duration:.5,overwrite:!1,delay:0},Nu,Xt,ft,Tn=1e8,lt=1/Tn,tu=Math.PI*2,BS=tu/4,kS=0,op=Math.sqrt,zS=Math.cos,HS=Math.sin,Ft=function(t){return typeof t=="string"},yt=function(t){return typeof t=="function"},_i=function(t){return typeof t=="number"},Uu=function(t){return typeof t>"u"},Kn=function(t){return typeof t=="object"},tn=function(t){return t!==!1},Fu=function(){return typeof window<"u"},mo=function(t){return yt(t)||Ft(t)},lp=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},$t=Array.isArray,nu=/(?:-?\.?\d|\.)+/gi,cp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,cs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,nc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,up=/[+-]=-?[.\d]+/,dp=/[^,'"\[\]\s]+/gi,VS=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ht,Fn,iu,Bu,vn={},Yo={},fp,hp=function(t){return(Yo=Pr(t,vn))&&an},ku=function(t,n){return console.warn("Invalid property",t,"set to",n,"Missing plugin? gsap.registerPlugin()")},ha=function(t,n){return!n&&console.warn(t)},pp=function(t,n){return t&&(vn[t]=n)&&Yo&&(Yo[t]=n)||vn},pa=function(){return 0},GS={suppressEvents:!0,isStart:!0,kill:!1},Oo={suppressEvents:!0,kill:!1},WS={suppressEvents:!0},zu={},Hi=[],ru={},mp,fn={},ic={},If=30,No=[],Hu="",Vu=function(t){var n=t[0],i,r;if(Kn(n)||yt(n)||(t=[t]),!(i=(n._gsap||{}).harness)){for(r=No.length;r--&&!No[r].targetTest(n););i=No[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new kp(t[r],i)))||t.splice(r,1);return t},br=function(t){return t._gsap||Vu(wn(t))[0]._gsap},gp=function(t,n,i){return(i=t[n])&&yt(i)?t[n]():Uu(i)&&t.getAttribute&&t.getAttribute(n)||i},nn=function(t,n){return(t=t.split(",")).forEach(n)||t},bt=function(t){return Math.round(t*1e5)/1e5||0},Ot=function(t){return Math.round(t*1e7)/1e7||0},vs=function(t,n){var i=n.charAt(0),r=parseFloat(n.substr(2));return t=parseFloat(t),i==="+"?t+r:i==="-"?t-r:i==="*"?t*r:t/r},XS=function(t,n){for(var i=n.length,r=0;t.indexOf(n[r])<0&&++r<i;);return r<i},Ko=function(){var t=Hi.length,n=Hi.slice(0),i,r;for(ru={},Hi.length=0,i=0;i<t;i++)r=n[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},_p=function(t,n,i,r){Hi.length&&!Xt&&Ko(),t.render(n,i,Xt&&n<0&&(t._initted||t._startAt)),Hi.length&&!Xt&&Ko()},vp=function(t){var n=parseFloat(t);return(n||n===0)&&(t+"").match(dp).length<2?n:Ft(t)?t.trim():t},yp=function(t){return t},Cn=function(t,n){for(var i in n)i in t||(t[i]=n[i]);return t},$S=function(t){return function(n,i){for(var r in i)r in n||r==="duration"&&t||r==="ease"||(n[r]=i[r])}},Pr=function(t,n){for(var i in n)t[i]=n[i];return t},Of=function s(t,n){for(var i in n)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(t[i]=Kn(n[i])?s(t[i]||(t[i]={}),n[i]):n[i]);return t},Zo=function(t,n){var i={},r;for(r in t)r in n||(i[r]=t[r]);return i},na=function(t){var n=t.parent||ht,i=t.keyframes?$S($t(t.keyframes)):Cn;if(tn(t.inherit))for(;n;)i(t,n.vars.defaults),n=n.parent||n._dp;return t},qS=function(t,n){for(var i=t.length,r=i===n.length;r&&i--&&t[i]===n[i];);return i<0},xp=function(t,n,i,r,a){var o=t[r],l;if(a)for(l=n[a];o&&o[a]>l;)o=o._prev;return o?(n._next=o._next,o._next=n):(n._next=t[i],t[i]=n),n._next?n._next._prev=n:t[r]=n,n._prev=o,n.parent=n._dp=t,n},hl=function(t,n,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var a=n._prev,o=n._next;a?a._next=o:t[i]===n&&(t[i]=o),o?o._prev=a:t[r]===n&&(t[r]=a),n._next=n._prev=n.parent=null},ji=function(t,n){t.parent&&(!n||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Sr=function(t,n){if(t&&(!n||n._end>t._dur||n._start<0))for(var i=t;i;)i._dirty=1,i=i.parent;return t},jS=function(t){for(var n=t.parent;n&&n.parent;)n._dirty=1,n.totalDuration(),n=n.parent;return t},su=function(t,n,i,r){return t._startAt&&(Xt?t._startAt.revert(Oo):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(n,!0,r))},YS=function s(t){return!t||t._ts&&s(t.parent)},Nf=function(t){return t._repeat?Ps(t._tTime,t=t.duration()+t._rDelay)*t:0},Ps=function(t,n){var i=Math.floor(t/=n);return t&&i===t?i-1:i},Jo=function(t,n){return(t-n._start)*n._ts+(n._ts>=0?0:n._dirty?n.totalDuration():n._tDur)},pl=function(t){return t._end=Ot(t._start+(t._tDur/Math.abs(t._ts||t._rts||lt)||0))},ml=function(t,n){var i=t._dp;return i&&i.smoothChildTiming&&t._ts&&(t._start=Ot(i._time-(t._ts>0?n/t._ts:((t._dirty?t.totalDuration():t._tDur)-n)/-t._ts)),pl(t),i._dirty||Sr(i,t)),t},bp=function(t,n){var i;if((n._time||!n._dur&&n._initted||n._start<t._time&&(n._dur||!n.add))&&(i=Jo(t.rawTime(),n),(!n._dur||wa(0,n.totalDuration(),i)-n._tTime>lt)&&n.render(i,!0)),Sr(t,n)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(i=t;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;t._zTime=-lt}},Hn=function(t,n,i,r){return n.parent&&ji(n),n._start=Ot((_i(i)?i:i||t!==ht?Sn(t,i,n):t._time)+n._delay),n._end=Ot(n._start+(n.totalDuration()/Math.abs(n.timeScale())||0)),xp(t,n,"_first","_last",t._sort?"_start":0),au(n)||(t._recent=n),r||bp(t,n),t._ts<0&&ml(t,t._tTime),t},Sp=function(t,n){return(vn.ScrollTrigger||ku("scrollTrigger",n))&&vn.ScrollTrigger.create(n,t)},Mp=function(t,n,i,r,a){if(Wu(t,n,a),!t._initted)return 1;if(!i&&t._pt&&!Xt&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&mp!==hn.frame)return Hi.push(t),t._lazy=[a,r],1},KS=function s(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||s(n))},au=function(t){var n=t.data;return n==="isFromStart"||n==="isStart"},ZS=function(t,n,i,r){var a=t.ratio,o=n<0||!n&&(!t._start&&KS(t)&&!(!t._initted&&au(t))||(t._ts<0||t._dp._ts<0)&&!au(t))?0:1,l=t._rDelay,c=0,u,d,h;if(l&&t._repeat&&(c=wa(0,t._tDur,n),d=Ps(c,l),t._yoyo&&d&1&&(o=1-o),d!==Ps(t._tTime,l)&&(a=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==a||Xt||r||t._zTime===lt||!n&&t._zTime){if(!t._initted&&Mp(t,n,r,i,c))return;for(h=t._zTime,t._zTime=n||(i?lt:0),i||(i=n&&!h),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=c,u=t._pt;u;)u.r(o,u.d),u=u._next;n<0&&su(t,n,i,!0),t._onUpdate&&!i&&pn(t,"onUpdate"),c&&t._repeat&&!i&&t.parent&&pn(t,"onRepeat"),(n>=t._tDur||n<0)&&t.ratio===o&&(o&&ji(t,1),!i&&!Xt&&(pn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=n)},JS=function(t,n,i){var r;if(i>n)for(r=t._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>n)return r;r=r._next}else for(r=t._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<n)return r;r=r._prev}},Ls=function(t,n,i,r){var a=t._repeat,o=Ot(n)||0,l=t._tTime/t._tDur;return l&&!r&&(t._time*=o/t._dur),t._dur=o,t._tDur=a?a<0?1e10:Ot(o*(a+1)+t._rDelay*a):o,l>0&&!r&&ml(t,t._tTime=t._tDur*l),t.parent&&pl(t),i||Sr(t.parent,t),t},Uf=function(t){return t instanceof Kt?Sr(t):Ls(t,t._dur)},QS={_start:0,endTime:pa,totalDuration:pa},Sn=function s(t,n,i){var r=t.labels,a=t._recent||QS,o=t.duration()>=Tn?a.endTime(!1):t._dur,l,c,u;return Ft(n)&&(isNaN(n)||n in r)?(c=n.charAt(0),u=n.substr(-1)==="%",l=n.indexOf("="),c==="<"||c===">"?(l>=0&&(n=n.replace(/=/,"")),(c==="<"?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(u?(l<0?a:i).totalDuration()/100:1)):l<0?(n in r||(r[n]=o),r[n]):(c=parseFloat(n.charAt(l-1)+n.substr(l+1)),u&&i&&(c=c/100*($t(i)?i[0]:i).totalDuration()),l>1?s(t,n.substr(0,l-1),i)+c:o+c)):n==null?o:+n},ia=function(t,n,i){var r=_i(n[1]),a=(r?2:1)+(t<2?0:1),o=n[a],l,c;if(r&&(o.duration=n[1]),o.parent=i,t){for(l=o,c=i;c&&!("immediateRender"in l);)l=c.vars.defaults||{},c=tn(c.vars.inherit)&&c.parent;o.immediateRender=tn(l.immediateRender),t<2?o.runBackwards=1:o.startAt=n[a-1]}return new wt(n[0],o,n[a+1])},Ji=function(t,n){return t||t===0?n(t):n},wa=function(t,n,i){return i<t?t:i>n?n:i},Wt=function(t,n){return!Ft(t)||!(n=VS.exec(t))?"":n[1]},eM=function(t,n,i){return Ji(i,function(r){return wa(t,n,r)})},ou=[].slice,Ep=function(t,n){return t&&Kn(t)&&"length"in t&&(!n&&!t.length||t.length-1 in t&&Kn(t[0]))&&!t.nodeType&&t!==Fn},tM=function(t,n,i){return i===void 0&&(i=[]),t.forEach(function(r){var a;return Ft(r)&&!n||Ep(r,1)?(a=i).push.apply(a,wn(r)):i.push(r)})||i},wn=function(t,n,i){return ft&&!n&&ft.selector?ft.selector(t):Ft(t)&&!i&&(iu||!Ds())?ou.call((n||Bu).querySelectorAll(t),0):$t(t)?tM(t,i):Ep(t)?ou.call(t,0):t?[t]:[]},lu=function(t){return t=wn(t)[0]||ha("Invalid scope")||{},function(n){var i=t.current||t.nativeElement||t;return wn(n,i.querySelectorAll?i:i===t?ha("Invalid scope")||Bu.createElement("div"):t)}},Tp=function(t){return t.sort(function(){return .5-Math.random()})},wp=function(t){if(yt(t))return t;var n=Kn(t)?t:{each:t},i=Mr(n.ease),r=n.from||0,a=parseFloat(n.base)||0,o={},l=r>0&&r<1,c=isNaN(r)||l,u=n.axis,d=r,h=r;return Ft(r)?d=h={center:.5,edges:.5,end:1}[r]||0:!l&&c&&(d=r[0],h=r[1]),function(f,p,v){var _=(v||n).length,m=o[_],g,S,y,x,R,A,w,I,M;if(!m){if(M=n.grid==="auto"?0:(n.grid||[1,Tn])[1],!M){for(w=-Tn;w<(w=v[M++].getBoundingClientRect().left)&&M<_;);M<_&&M--}for(m=o[_]=[],g=c?Math.min(M,_)*d-.5:r%M,S=M===Tn?0:c?_*h/M-.5:r/M|0,w=0,I=Tn,A=0;A<_;A++)y=A%M-g,x=S-(A/M|0),m[A]=R=u?Math.abs(u==="y"?x:y):op(y*y+x*x),R>w&&(w=R),R<I&&(I=R);r==="random"&&Tp(m),m.max=w-I,m.min=I,m.v=_=(parseFloat(n.amount)||parseFloat(n.each)*(M>_?_-1:u?u==="y"?_/M:M:Math.max(M,_/M))||0)*(r==="edges"?-1:1),m.b=_<0?a-_:a,m.u=Wt(n.amount||n.each)||0,i=i&&_<0?Up(i):i}return _=(m[f]-m.min)/m.max||0,Ot(m.b+(i?i(_):_)*m.v)+m.u}},cu=function(t){var n=Math.pow(10,((t+"").split(".")[1]||"").length);return function(i){var r=Ot(Math.round(parseFloat(i)/t)*t*n);return(r-r%1)/n+(_i(i)?0:Wt(i))}},Ap=function(t,n){var i=$t(t),r,a;return!i&&Kn(t)&&(r=i=t.radius||Tn,t.values?(t=wn(t.values),(a=!_i(t[0]))&&(r*=r)):t=cu(t.increment)),Ji(n,i?yt(t)?function(o){return a=t(o),Math.abs(a-o)<=r?a:o}:function(o){for(var l=parseFloat(a?o.x:o),c=parseFloat(a?o.y:0),u=Tn,d=0,h=t.length,f,p;h--;)a?(f=t[h].x-l,p=t[h].y-c,f=f*f+p*p):f=Math.abs(t[h]-l),f<u&&(u=f,d=h);return d=!r||u<=r?t[d]:o,a||d===o||_i(o)?d:d+Wt(o)}:cu(t))},Cp=function(t,n,i,r){return Ji($t(t)?!n:i===!0?!!(i=0):!r,function(){return $t(t)?t[~~(Math.random()*t.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((t-i/2+Math.random()*(n-t+i*.99))/i)*i*r)/r})},nM=function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return function(r){return n.reduce(function(a,o){return o(a)},r)}},iM=function(t,n){return function(i){return t(parseFloat(i))+(n||Wt(i))}},rM=function(t,n,i){return Pp(t,n,0,1,i)},Rp=function(t,n,i){return Ji(i,function(r){return t[~~n(r)]})},sM=function s(t,n,i){var r=n-t;return $t(t)?Rp(t,s(0,t.length),n):Ji(i,function(a){return(r+(a-t)%r)%r+t})},aM=function s(t,n,i){var r=n-t,a=r*2;return $t(t)?Rp(t,s(0,t.length-1),n):Ji(i,function(o){return o=(a+(o-t)%a)%a||0,t+(o>r?a-o:o)})},ma=function(t){for(var n=0,i="",r,a,o,l;~(r=t.indexOf("random(",n));)o=t.indexOf(")",r),l=t.charAt(r+7)==="[",a=t.substr(r+7,o-r-7).match(l?dp:nu),i+=t.substr(n,r-n)+Cp(l?a:+a[0],l?0:+a[1],+a[2]||1e-5),n=o+1;return i+t.substr(n,t.length-n)},Pp=function(t,n,i,r,a){var o=n-t,l=r-i;return Ji(a,function(c){return i+((c-t)/o*l||0)})},oM=function s(t,n,i,r){var a=isNaN(t+n)?0:function(p){return(1-p)*t+p*n};if(!a){var o=Ft(t),l={},c,u,d,h,f;if(i===!0&&(r=1)&&(i=null),o)t={p:t},n={p:n};else if($t(t)&&!$t(n)){for(d=[],h=t.length,f=h-2,u=1;u<h;u++)d.push(s(t[u-1],t[u]));h--,a=function(v){v*=h;var _=Math.min(f,~~v);return d[_](v-_)},i=n}else r||(t=Pr($t(t)?[]:{},t));if(!d){for(c in n)Gu.call(l,t,c,"get",n[c]);a=function(v){return qu(v,l)||(o?t.p:t)}}}return Ji(i,a)},Ff=function(t,n,i){var r=t.labels,a=Tn,o,l,c;for(o in r)l=r[o]-n,l<0==!!i&&l&&a>(l=Math.abs(l))&&(c=o,a=l);return c},pn=function(t,n,i){var r=t.vars,a=r[n],o=ft,l=t._ctx,c,u,d;if(a)return c=r[n+"Params"],u=r.callbackScope||t,i&&Hi.length&&Ko(),l&&(ft=l),d=c?a.apply(u,c):a.call(u),ft=o,d},$s=function(t){return ji(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Xt),t.progress()<1&&pn(t,"onInterrupt"),t},us,Lp=[],Dp=function(t){if(t)if(t=!t.name&&t.default||t,Fu()||t.headless){var n=t.name,i=yt(t),r=n&&!i&&t.init?function(){this._props=[]}:t,a={init:pa,render:qu,add:Gu,kill:MM,modifier:SM,rawVars:0},o={targetTest:0,get:0,getSetter:$u,aliases:{},register:0};if(Ds(),t!==r){if(fn[n])return;Cn(r,Cn(Zo(t,a),o)),Pr(r.prototype,Pr(a,Zo(t,o))),fn[r.prop=n]=r,t.targetTest&&(No.push(r),zu[n]=1),n=(n==="css"?"CSS":n.charAt(0).toUpperCase()+n.substr(1))+"Plugin"}pp(n,r),t.register&&t.register(an,r,rn)}else Lp.push(t)},at=255,qs={aqua:[0,at,at],lime:[0,at,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,at],navy:[0,0,128],white:[at,at,at],olive:[128,128,0],yellow:[at,at,0],orange:[at,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[at,0,0],pink:[at,192,203],cyan:[0,at,at],transparent:[at,at,at,0]},rc=function(t,n,i){return t+=t<0?1:t>1?-1:0,(t*6<1?n+(i-n)*t*6:t<.5?i:t*3<2?n+(i-n)*(2/3-t)*6:n)*at+.5|0},Ip=function(t,n,i){var r=t?_i(t)?[t>>16,t>>8&at,t&at]:0:qs.black,a,o,l,c,u,d,h,f,p,v;if(!r){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),qs[t])r=qs[t];else if(t.charAt(0)==="#"){if(t.length<6&&(a=t.charAt(1),o=t.charAt(2),l=t.charAt(3),t="#"+a+a+o+o+l+l+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return r=parseInt(t.substr(1,6),16),[r>>16,r>>8&at,r&at,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),r=[t>>16,t>>8&at,t&at]}else if(t.substr(0,3)==="hsl"){if(r=v=t.match(nu),!n)c=+r[0]%360/360,u=+r[1]/100,d=+r[2]/100,o=d<=.5?d*(u+1):d+u-d*u,a=d*2-o,r.length>3&&(r[3]*=1),r[0]=rc(c+1/3,a,o),r[1]=rc(c,a,o),r[2]=rc(c-1/3,a,o);else if(~t.indexOf("="))return r=t.match(cp),i&&r.length<4&&(r[3]=1),r}else r=t.match(nu)||qs.transparent;r=r.map(Number)}return n&&!v&&(a=r[0]/at,o=r[1]/at,l=r[2]/at,h=Math.max(a,o,l),f=Math.min(a,o,l),d=(h+f)/2,h===f?c=u=0:(p=h-f,u=d>.5?p/(2-h-f):p/(h+f),c=h===a?(o-l)/p+(o<l?6:0):h===o?(l-a)/p+2:(a-o)/p+4,c*=60),r[0]=~~(c+.5),r[1]=~~(u*100+.5),r[2]=~~(d*100+.5)),i&&r.length<4&&(r[3]=1),r},Op=function(t){var n=[],i=[],r=-1;return t.split(Vi).forEach(function(a){var o=a.match(cs)||[];n.push.apply(n,o),i.push(r+=o.length+1)}),n.c=i,n},Bf=function(t,n,i){var r="",a=(t+r).match(Vi),o=n?"hsla(":"rgba(",l=0,c,u,d,h;if(!a)return t;if(a=a.map(function(f){return(f=Ip(f,n,1))&&o+(n?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),i&&(d=Op(t),c=i.c,c.join(r)!==d.c.join(r)))for(u=t.replace(Vi,"1").split(cs),h=u.length-1;l<h;l++)r+=u[l]+(~c.indexOf(l)?a.shift()||o+"0,0,0,0)":(d.length?d:a.length?a:i).shift());if(!u)for(u=t.split(Vi),h=u.length-1;l<h;l++)r+=u[l]+a[l];return r+u[h]},Vi=function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in qs)s+="|"+t+"\\b";return new RegExp(s+")","gi")}(),lM=/hsl[a]?\(/,Np=function(t){var n=t.join(" "),i;if(Vi.lastIndex=0,Vi.test(n))return i=lM.test(n),t[1]=Bf(t[1],i),t[0]=Bf(t[0],i,Op(t[1])),!0},ga,hn=function(){var s=Date.now,t=500,n=33,i=s(),r=i,a=1e3/240,o=a,l=[],c,u,d,h,f,p,v=function _(m){var g=s()-r,S=m===!0,y,x,R,A;if((g>t||g<0)&&(i+=g-n),r+=g,R=r-i,y=R-o,(y>0||S)&&(A=++h.frame,f=R-h.time*1e3,h.time=R=R/1e3,o+=y+(y>=a?4:a-y),x=1),S||(c=u(_)),x)for(p=0;p<l.length;p++)l[p](R,f,A,m)};return h={time:0,frame:0,tick:function(){v(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){fp&&(!iu&&Fu()&&(Fn=iu=window,Bu=Fn.document||{},vn.gsap=an,(Fn.gsapVersions||(Fn.gsapVersions=[])).push(an.version),hp(Yo||Fn.GreenSockGlobals||!Fn.gsap&&Fn||{}),Lp.forEach(Dp)),d=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&h.sleep(),u=d||function(m){return setTimeout(m,o-h.time*1e3+1|0)},ga=1,v(2))},sleep:function(){(d?cancelAnimationFrame:clearTimeout)(c),ga=0,u=pa},lagSmoothing:function(m,g){t=m||1/0,n=Math.min(g||33,t)},fps:function(m){a=1e3/(m||240),o=h.time*1e3+a},add:function(m,g,S){var y=g?function(x,R,A,w){m(x,R,A,w),h.remove(y)}:m;return h.remove(m),l[S?"unshift":"push"](y),Ds(),y},remove:function(m,g){~(g=l.indexOf(m))&&l.splice(g,1)&&p>=g&&p--},_listeners:l},h}(),Ds=function(){return!ga&&hn.wake()},et={},cM=/^[\d.\-M][\d.\-,\s]/,uM=/["']/g,dM=function(t){for(var n={},i=t.substr(1,t.length-3).split(":"),r=i[0],a=1,o=i.length,l,c,u;a<o;a++)c=i[a],l=a!==o-1?c.lastIndexOf(","):c.length,u=c.substr(0,l),n[r]=isNaN(u)?u.replace(uM,"").trim():+u,r=c.substr(l+1).trim();return n},fM=function(t){var n=t.indexOf("(")+1,i=t.indexOf(")"),r=t.indexOf("(",n);return t.substring(n,~r&&r<i?t.indexOf(")",i+1):i)},hM=function(t){var n=(t+"").split("("),i=et[n[0]];return i&&n.length>1&&i.config?i.config.apply(null,~t.indexOf("{")?[dM(n[1])]:fM(t).split(",").map(vp)):et._CE&&cM.test(t)?et._CE("",t):i},Up=function(t){return function(n){return 1-t(1-n)}},Fp=function s(t,n){for(var i=t._first,r;i;)i instanceof Kt?s(i,n):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==n&&(i.timeline?s(i.timeline,n):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=n)),i=i._next},Mr=function(t,n){return t&&(yt(t)?t:et[t]||hM(t))||n},Or=function(t,n,i,r){i===void 0&&(i=function(c){return 1-n(1-c)}),r===void 0&&(r=function(c){return c<.5?n(c*2)/2:1-n((1-c)*2)/2});var a={easeIn:n,easeOut:i,easeInOut:r},o;return nn(t,function(l){et[l]=vn[l]=a,et[o=l.toLowerCase()]=i;for(var c in a)et[o+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=et[l+"."+c]=a[c]}),a},Bp=function(t){return function(n){return n<.5?(1-t(1-n*2))/2:.5+t((n-.5)*2)/2}},sc=function s(t,n,i){var r=n>=1?n:1,a=(i||(t?.3:.45))/(n<1?n:1),o=a/tu*(Math.asin(1/r)||0),l=function(d){return d===1?1:r*Math.pow(2,-10*d)*HS((d-o)*a)+1},c=t==="out"?l:t==="in"?function(u){return 1-l(1-u)}:Bp(l);return a=tu/a,c.config=function(u,d){return s(t,u,d)},c},ac=function s(t,n){n===void 0&&(n=1.70158);var i=function(o){return o?--o*o*((n+1)*o+n)+1:0},r=t==="out"?i:t==="in"?function(a){return 1-i(1-a)}:Bp(i);return r.config=function(a){return s(t,a)},r};nn("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,t){var n=t<5?t+1:t;Or(s+",Power"+(n-1),t?function(i){return Math.pow(i,n)}:function(i){return i},function(i){return 1-Math.pow(1-i,n)},function(i){return i<.5?Math.pow(i*2,n)/2:1-Math.pow((1-i)*2,n)/2})});et.Linear.easeNone=et.none=et.Linear.easeIn;Or("Elastic",sc("in"),sc("out"),sc());(function(s,t){var n=1/t,i=2*n,r=2.5*n,a=function(l){return l<n?s*l*l:l<i?s*Math.pow(l-1.5/t,2)+.75:l<r?s*(l-=2.25/t)*l+.9375:s*Math.pow(l-2.625/t,2)+.984375};Or("Bounce",function(o){return 1-a(1-o)},a)})(7.5625,2.75);Or("Expo",function(s){return s?Math.pow(2,10*(s-1)):0});Or("Circ",function(s){return-(op(1-s*s)-1)});Or("Sine",function(s){return s===1?1:-zS(s*BS)+1});Or("Back",ac("in"),ac("out"),ac());et.SteppedEase=et.steps=vn.SteppedEase={config:function(t,n){t===void 0&&(t=1);var i=1/t,r=t+(n?0:1),a=n?1:0,o=1-lt;return function(l){return((r*wa(0,o,l)|0)+a)*i}}};Rs.ease=et["quad.out"];nn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Hu+=s+","+s+"Params,"});var kp=function(t,n){this.id=kS++,t._gsap=this,this.target=t,this.harness=n,this.get=n?n.get:gp,this.set=n?n.getSetter:$u},_a=function(){function s(n){this.vars=n,this._delay=+n.delay||0,(this._repeat=n.repeat===1/0?-2:n.repeat||0)&&(this._rDelay=n.repeatDelay||0,this._yoyo=!!n.yoyo||!!n.yoyoEase),this._ts=1,Ls(this,+n.duration,1,1),this.data=n.data,ft&&(this._ctx=ft,ft.data.push(this)),ga||hn.wake()}var t=s.prototype;return t.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},t.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},t.totalDuration=function(i){return arguments.length?(this._dirty=0,Ls(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(i,r){if(Ds(),!arguments.length)return this._tTime;var a=this._dp;if(a&&a.smoothChildTiming&&this._ts){for(ml(this,i),!a._dp||a.parent||bp(a,this);a&&a.parent;)a.parent._time!==a._start+(a._ts>=0?a._tTime/a._ts:(a.totalDuration()-a._tTime)/-a._ts)&&a.totalTime(a._tTime,!0),a=a.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&Hn(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===lt||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),_p(this,i,r)),this},t.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+Nf(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},t.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},t.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+Nf(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(i,r){var a=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*a,r):this._repeat?Ps(this._tTime,a)+1:1},t.timeScale=function(i,r){if(!arguments.length)return this._rts===-lt?0:this._rts;if(this._rts===i)return this;var a=this.parent&&this._ts?Jo(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-lt?0:this._rts,this.totalTime(wa(-Math.abs(this._delay),this._tDur,a),r!==!1),pl(this),jS(this)},t.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ds(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==lt&&(this._tTime-=lt)))),this):this._ps},t.startTime=function(i){if(arguments.length){this._start=i;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&Hn(r,this,i-this._delay),this}return this._start},t.endTime=function(i){return this._start+(tn(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Jo(r.rawTime(i),this):this._tTime:this._tTime},t.revert=function(i){i===void 0&&(i=WS);var r=Xt;return Xt=i,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),Xt=r,this},t.globalTime=function(i){for(var r=this,a=arguments.length?i:r.rawTime();r;)a=r._start+a/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):a},t.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,Uf(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,Uf(this),r?this.time(r):this}return this._rDelay},t.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},t.seek=function(i,r){return this.totalTime(Sn(this,i),tn(r))},t.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,tn(r))},t.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},t.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},t.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-lt:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-lt,this},t.isActive=function(){var i=this.parent||this._dp,r=this._start,a;return!!(!i||this._ts&&this._initted&&i.isActive()&&(a=i.rawTime(!0))>=r&&a<this.endTime(!0)-lt)},t.eventCallback=function(i,r,a){var o=this.vars;return arguments.length>1?(r?(o[i]=r,a&&(o[i+"Params"]=a),i==="onUpdate"&&(this._onUpdate=r)):delete o[i],this):o[i]},t.then=function(i){var r=this;return new Promise(function(a){var o=yt(i)?i:yp,l=function(){var u=r.then;r.then=null,yt(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=u),a(o),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},t.kill=function(){$s(this)},s}();Cn(_a.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-lt,_prom:0,_ps:!1,_rts:1});var Kt=function(s){ap(t,s);function t(i,r){var a;return i===void 0&&(i={}),a=s.call(this,i)||this,a.labels={},a.smoothChildTiming=!!i.smoothChildTiming,a.autoRemoveChildren=!!i.autoRemoveChildren,a._sort=tn(i.sortChildren),ht&&Hn(i.parent||ht,oi(a),r),i.reversed&&a.reverse(),i.paused&&a.paused(!0),i.scrollTrigger&&Sp(oi(a),i.scrollTrigger),a}var n=t.prototype;return n.to=function(r,a,o){return ia(0,arguments,this),this},n.from=function(r,a,o){return ia(1,arguments,this),this},n.fromTo=function(r,a,o,l){return ia(2,arguments,this),this},n.set=function(r,a,o){return a.duration=0,a.parent=this,na(a).repeatDelay||(a.repeat=0),a.immediateRender=!!a.immediateRender,new wt(r,a,Sn(this,o),1),this},n.call=function(r,a,o){return Hn(this,wt.delayedCall(0,r,a),o)},n.staggerTo=function(r,a,o,l,c,u,d){return o.duration=a,o.stagger=o.stagger||l,o.onComplete=u,o.onCompleteParams=d,o.parent=this,new wt(r,o,Sn(this,c)),this},n.staggerFrom=function(r,a,o,l,c,u,d){return o.runBackwards=1,na(o).immediateRender=tn(o.immediateRender),this.staggerTo(r,a,o,l,c,u,d)},n.staggerFromTo=function(r,a,o,l,c,u,d,h){return l.startAt=o,na(l).immediateRender=tn(l.immediateRender),this.staggerTo(r,a,l,c,u,d,h)},n.render=function(r,a,o){var l=this._time,c=this._dirty?this.totalDuration():this._tDur,u=this._dur,d=r<=0?0:Ot(r),h=this._zTime<0!=r<0&&(this._initted||!u),f,p,v,_,m,g,S,y,x,R,A,w;if(this!==ht&&d>c&&r>=0&&(d=c),d!==this._tTime||o||h){if(l!==this._time&&u&&(d+=this._time-l,r+=this._time-l),f=d,x=this._start,y=this._ts,g=!y,h&&(u||(l=this._zTime),(r||!a)&&(this._zTime=r)),this._repeat){if(A=this._yoyo,m=u+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,a,o);if(f=Ot(d%m),d===c?(_=this._repeat,f=u):(_=~~(d/m),_&&_===d/m&&(f=u,_--),f>u&&(f=u)),R=Ps(this._tTime,m),!l&&this._tTime&&R!==_&&this._tTime-R*m-this._dur<=0&&(R=_),A&&_&1&&(f=u-f,w=1),_!==R&&!this._lock){var I=A&&R&1,M=I===(A&&_&1);if(_<R&&(I=!I),l=I?0:d%u?u:d,this._lock=1,this.render(l||(w?0:Ot(_*m)),a,!u)._lock=0,this._tTime=d,!a&&this.parent&&pn(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1),l&&l!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(u=this._dur,c=this._tDur,M&&(this._lock=2,l=I?u:-1e-4,this.render(l,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!g)return this;Fp(this,w)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(S=JS(this,Ot(l),Ot(f)),S&&(d-=f-(f=S._start))),this._tTime=d,this._time=f,this._act=!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,l=0),!l&&f&&!a&&!_&&(pn(this,"onStart"),this._tTime!==d))return this;if(f>=l&&r>=0)for(p=this._first;p;){if(v=p._next,(p._act||f>=p._start)&&p._ts&&S!==p){if(p.parent!==this)return this.render(r,a,o);if(p.render(p._ts>0?(f-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(f-p._start)*p._ts,a,o),f!==this._time||!this._ts&&!g){S=0,v&&(d+=this._zTime=-lt);break}}p=v}else{p=this._last;for(var E=r<0?r:f;p;){if(v=p._prev,(p._act||E<=p._end)&&p._ts&&S!==p){if(p.parent!==this)return this.render(r,a,o);if(p.render(p._ts>0?(E-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(E-p._start)*p._ts,a,o||Xt&&(p._initted||p._startAt)),f!==this._time||!this._ts&&!g){S=0,v&&(d+=this._zTime=E?-lt:lt);break}}p=v}}if(S&&!a&&(this.pause(),S.render(f>=l?0:-lt)._zTime=f>=l?1:-1,this._ts))return this._start=x,pl(this),this.render(r,a,o);this._onUpdate&&!a&&pn(this,"onUpdate",!0),(d===c&&this._tTime>=this.totalDuration()||!d&&l)&&(x===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((r||!u)&&(d===c&&this._ts>0||!d&&this._ts<0)&&ji(this,1),!a&&!(r<0&&!l)&&(d||l||!c)&&(pn(this,d===c&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(d<c&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(r,a){var o=this;if(_i(a)||(a=Sn(this,a,r)),!(r instanceof _a)){if($t(r))return r.forEach(function(l){return o.add(l,a)}),this;if(Ft(r))return this.addLabel(r,a);if(yt(r))r=wt.delayedCall(0,r);else return this}return this!==r?Hn(this,r,a):this},n.getChildren=function(r,a,o,l){r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=!0),l===void 0&&(l=-Tn);for(var c=[],u=this._first;u;)u._start>=l&&(u instanceof wt?a&&c.push(u):(o&&c.push(u),r&&c.push.apply(c,u.getChildren(!0,a,o)))),u=u._next;return c},n.getById=function(r){for(var a=this.getChildren(1,1,1),o=a.length;o--;)if(a[o].vars.id===r)return a[o]},n.remove=function(r){return Ft(r)?this.removeLabel(r):yt(r)?this.killTweensOf(r):(hl(this,r),r===this._recent&&(this._recent=this._last),Sr(this))},n.totalTime=function(r,a){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ot(hn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),s.prototype.totalTime.call(this,r,a),this._forcing=0,this):this._tTime},n.addLabel=function(r,a){return this.labels[r]=Sn(this,a),this},n.removeLabel=function(r){return delete this.labels[r],this},n.addPause=function(r,a,o){var l=wt.delayedCall(0,a||pa,o);return l.data="isPause",this._hasPause=1,Hn(this,l,Sn(this,r))},n.removePause=function(r){var a=this._first;for(r=Sn(this,r);a;)a._start===r&&a.data==="isPause"&&ji(a),a=a._next},n.killTweensOf=function(r,a,o){for(var l=this.getTweensOf(r,o),c=l.length;c--;)Ui!==l[c]&&l[c].kill(r,a);return this},n.getTweensOf=function(r,a){for(var o=[],l=wn(r),c=this._first,u=_i(a),d;c;)c instanceof wt?XS(c._targets,l)&&(u?(!Ui||c._initted&&c._ts)&&c.globalTime(0)<=a&&c.globalTime(c.totalDuration())>a:!a||c.isActive())&&o.push(c):(d=c.getTweensOf(l,a)).length&&o.push.apply(o,d),c=c._next;return o},n.tweenTo=function(r,a){a=a||{};var o=this,l=Sn(o,r),c=a,u=c.startAt,d=c.onStart,h=c.onStartParams,f=c.immediateRender,p,v=wt.to(o,Cn({ease:a.ease||"none",lazy:!1,immediateRender:!1,time:l,overwrite:"auto",duration:a.duration||Math.abs((l-(u&&"time"in u?u.time:o._time))/o.timeScale())||lt,onStart:function(){if(o.pause(),!p){var m=a.duration||Math.abs((l-(u&&"time"in u?u.time:o._time))/o.timeScale());v._dur!==m&&Ls(v,m,0,1).render(v._time,!0,!0),p=1}d&&d.apply(v,h||[])}},a));return f?v.render(0):v},n.tweenFromTo=function(r,a,o){return this.tweenTo(a,Cn({startAt:{time:Sn(this,r)}},o))},n.recent=function(){return this._recent},n.nextLabel=function(r){return r===void 0&&(r=this._time),Ff(this,Sn(this,r))},n.previousLabel=function(r){return r===void 0&&(r=this._time),Ff(this,Sn(this,r),1)},n.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+lt)},n.shiftChildren=function(r,a,o){o===void 0&&(o=0);for(var l=this._first,c=this.labels,u;l;)l._start>=o&&(l._start+=r,l._end+=r),l=l._next;if(a)for(u in c)c[u]>=o&&(c[u]+=r);return Sr(this)},n.invalidate=function(r){var a=this._first;for(this._lock=0;a;)a.invalidate(r),a=a._next;return s.prototype.invalidate.call(this,r)},n.clear=function(r){r===void 0&&(r=!0);for(var a=this._first,o;a;)o=a._next,this.remove(a),a=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Sr(this)},n.totalDuration=function(r){var a=0,o=this,l=o._last,c=Tn,u,d,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(h=o.parent;l;)u=l._prev,l._dirty&&l.totalDuration(),d=l._start,d>c&&o._sort&&l._ts&&!o._lock?(o._lock=1,Hn(o,l,d-l._delay,1)._lock=0):c=d,d<0&&l._ts&&(a-=d,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=d/o._ts,o._time-=d,o._tTime-=d),o.shiftChildren(-d,!1,-1/0),c=0),l._end>a&&l._ts&&(a=l._end),l=u;Ls(o,o===ht&&o._time>a?o._time:a,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(r){if(ht._ts&&(_p(ht,Jo(r,ht)),mp=hn.frame),hn.frame>=If){If+=gn.autoSleep||120;var a=ht._first;if((!a||!a._ts)&&gn.autoSleep&&hn._listeners.length<2){for(;a&&!a._ts;)a=a._next;a||hn.sleep()}}},t}(_a);Cn(Kt.prototype,{_lock:0,_hasPause:0,_forcing:0});var pM=function(t,n,i,r,a,o,l){var c=new rn(this._pt,t,n,0,1,Xp,null,a),u=0,d=0,h,f,p,v,_,m,g,S;for(c.b=i,c.e=r,i+="",r+="",(g=~r.indexOf("random("))&&(r=ma(r)),o&&(S=[i,r],o(S,t,n),i=S[0],r=S[1]),f=i.match(nc)||[];h=nc.exec(r);)v=h[0],_=r.substring(u,h.index),p?p=(p+1)%5:_.substr(-5)==="rgba("&&(p=1),v!==f[d++]&&(m=parseFloat(f[d-1])||0,c._pt={_next:c._pt,p:_||d===1?_:",",s:m,c:v.charAt(1)==="="?vs(m,v)-m:parseFloat(v)-m,m:p&&p<4?Math.round:0},u=nc.lastIndex);return c.c=u<r.length?r.substring(u,r.length):"",c.fp=l,(up.test(r)||g)&&(c.e=0),this._pt=c,c},Gu=function(t,n,i,r,a,o,l,c,u,d){yt(r)&&(r=r(a||0,t,o));var h=t[n],f=i!=="get"?i:yt(h)?u?t[n.indexOf("set")||!yt(t["get"+n.substr(3)])?n:"get"+n.substr(3)](u):t[n]():h,p=yt(h)?u?yM:Gp:Xu,v;if(Ft(r)&&(~r.indexOf("random(")&&(r=ma(r)),r.charAt(1)==="="&&(v=vs(f,r)+(Wt(f)||0),(v||v===0)&&(r=v))),!d||f!==r||uu)return!isNaN(f*r)&&r!==""?(v=new rn(this._pt,t,n,+f||0,r-(f||0),typeof h=="boolean"?bM:Wp,0,p),u&&(v.fp=u),l&&v.modifier(l,this,t),this._pt=v):(!h&&!(n in t)&&ku(n,r),pM.call(this,t,n,f,r,p,c||gn.stringFilter,u))},mM=function(t,n,i,r,a){if(yt(t)&&(t=ra(t,a,n,i,r)),!Kn(t)||t.style&&t.nodeType||$t(t)||lp(t))return Ft(t)?ra(t,a,n,i,r):t;var o={},l;for(l in t)o[l]=ra(t[l],a,n,i,r);return o},zp=function(t,n,i,r,a,o){var l,c,u,d;if(fn[t]&&(l=new fn[t]).init(a,l.rawVars?n[t]:mM(n[t],r,a,o,i),i,r,o)!==!1&&(i._pt=c=new rn(i._pt,a,t,0,1,l.render,l,0,l.priority),i!==us))for(u=i._ptLookup[i._targets.indexOf(a)],d=l._props.length;d--;)u[l._props[d]]=c;return l},Ui,uu,Wu=function s(t,n,i){var r=t.vars,a=r.ease,o=r.startAt,l=r.immediateRender,c=r.lazy,u=r.onUpdate,d=r.runBackwards,h=r.yoyoEase,f=r.keyframes,p=r.autoRevert,v=t._dur,_=t._startAt,m=t._targets,g=t.parent,S=g&&g.data==="nested"?g.vars.targets:m,y=t._overwrite==="auto"&&!Nu,x=t.timeline,R,A,w,I,M,E,O,G,z,Y,L,N,k;if(x&&(!f||!a)&&(a="none"),t._ease=Mr(a,Rs.ease),t._yEase=h?Up(Mr(h===!0?a:h,Rs.ease)):0,h&&t._yoyo&&!t._repeat&&(h=t._yEase,t._yEase=t._ease,t._ease=h),t._from=!x&&!!r.runBackwards,!x||f&&!r.stagger){if(G=m[0]?br(m[0]).harness:0,N=G&&r[G.prop],R=Zo(r,zu),_&&(_._zTime<0&&_.progress(1),n<0&&d&&l&&!p?_.render(-1,!0):_.revert(d&&v?Oo:GS),_._lazy=0),o){if(ji(t._startAt=wt.set(m,Cn({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!_&&tn(c),startAt:null,delay:0,onUpdate:u&&function(){return pn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(Xt||!l&&!p)&&t._startAt.revert(Oo),l&&v&&n<=0&&i<=0){n&&(t._zTime=n);return}}else if(d&&v&&!_){if(n&&(l=!1),w=Cn({overwrite:!1,data:"isFromStart",lazy:l&&!_&&tn(c),immediateRender:l,stagger:0,parent:g},R),N&&(w[G.prop]=N),ji(t._startAt=wt.set(m,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(Xt?t._startAt.revert(Oo):t._startAt.render(-1,!0)),t._zTime=n,!l)s(t._startAt,lt,lt);else if(!n)return}for(t._pt=t._ptCache=0,c=v&&tn(c)||c&&!v,A=0;A<m.length;A++){if(M=m[A],O=M._gsap||Vu(m)[A]._gsap,t._ptLookup[A]=Y={},ru[O.id]&&Hi.length&&Ko(),L=S===m?A:S.indexOf(M),G&&(z=new G).init(M,N||R,t,L,S)!==!1&&(t._pt=I=new rn(t._pt,M,z.name,0,1,z.render,z,0,z.priority),z._props.forEach(function(F){Y[F]=I}),z.priority&&(E=1)),!G||N)for(w in R)fn[w]&&(z=zp(w,R,t,L,M,S))?z.priority&&(E=1):Y[w]=I=Gu.call(t,M,w,"get",R[w],L,S,0,r.stringFilter);t._op&&t._op[A]&&t.kill(M,t._op[A]),y&&t._pt&&(Ui=t,ht.killTweensOf(M,Y,t.globalTime(n)),k=!t.parent,Ui=0),t._pt&&c&&(ru[O.id]=1)}E&&$p(t),t._onInit&&t._onInit(t)}t._onUpdate=u,t._initted=(!t._op||t._pt)&&!k,f&&n<=0&&x.render(Tn,!0,!0)},gM=function(t,n,i,r,a,o,l,c){var u=(t._pt&&t._ptCache||(t._ptCache={}))[n],d,h,f,p;if(!u)for(u=t._ptCache[n]=[],f=t._ptLookup,p=t._targets.length;p--;){if(d=f[p][n],d&&d.d&&d.d._pt)for(d=d.d._pt;d&&d.p!==n&&d.fp!==n;)d=d._next;if(!d)return uu=1,t.vars[n]="+=0",Wu(t,l),uu=0,c?ha(n+" not eligible for reset"):1;u.push(d)}for(p=u.length;p--;)h=u[p],d=h._pt||h,d.s=(r||r===0)&&!a?r:d.s+(r||0)+o*d.c,d.c=i-d.s,h.e&&(h.e=bt(i)+Wt(h.e)),h.b&&(h.b=d.s+Wt(h.b))},_M=function(t,n){var i=t[0]?br(t[0]).harness:0,r=i&&i.aliases,a,o,l,c;if(!r)return n;a=Pr({},n);for(o in r)if(o in a)for(c=r[o].split(","),l=c.length;l--;)a[c[l]]=a[o];return a},vM=function(t,n,i,r){var a=n.ease||r||"power1.inOut",o,l;if($t(n))l=i[t]||(i[t]=[]),n.forEach(function(c,u){return l.push({t:u/(n.length-1)*100,v:c,e:a})});else for(o in n)l=i[o]||(i[o]=[]),o==="ease"||l.push({t:parseFloat(t),v:n[o],e:a})},ra=function(t,n,i,r,a){return yt(t)?t.call(n,i,r,a):Ft(t)&&~t.indexOf("random(")?ma(t):t},Hp=Hu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Vp={};nn(Hp+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return Vp[s]=1});var wt=function(s){ap(t,s);function t(i,r,a,o){var l;typeof r=="number"&&(a.duration=r,r=a,a=null),l=s.call(this,o?r:na(r))||this;var c=l.vars,u=c.duration,d=c.delay,h=c.immediateRender,f=c.stagger,p=c.overwrite,v=c.keyframes,_=c.defaults,m=c.scrollTrigger,g=c.yoyoEase,S=r.parent||ht,y=($t(i)||lp(i)?_i(i[0]):"length"in r)?[i]:wn(i),x,R,A,w,I,M,E,O;if(l._targets=y.length?Vu(y):ha("GSAP target "+i+" not found. https://gsap.com",!gn.nullTargetWarn)||[],l._ptLookup=[],l._overwrite=p,v||f||mo(u)||mo(d)){if(r=l.vars,x=l.timeline=new Kt({data:"nested",defaults:_||{},targets:S&&S.data==="nested"?S.vars.targets:y}),x.kill(),x.parent=x._dp=oi(l),x._start=0,f||mo(u)||mo(d)){if(w=y.length,E=f&&wp(f),Kn(f))for(I in f)~Hp.indexOf(I)&&(O||(O={}),O[I]=f[I]);for(R=0;R<w;R++)A=Zo(r,Vp),A.stagger=0,g&&(A.yoyoEase=g),O&&Pr(A,O),M=y[R],A.duration=+ra(u,oi(l),R,M,y),A.delay=(+ra(d,oi(l),R,M,y)||0)-l._delay,!f&&w===1&&A.delay&&(l._delay=d=A.delay,l._start+=d,A.delay=0),x.to(M,A,E?E(R,M,y):0),x._ease=et.none;x.duration()?u=d=0:l.timeline=0}else if(v){na(Cn(x.vars.defaults,{ease:"none"})),x._ease=Mr(v.ease||r.ease||"none");var G=0,z,Y,L;if($t(v))v.forEach(function(N){return x.to(y,N,">")}),x.duration();else{A={};for(I in v)I==="ease"||I==="easeEach"||vM(I,v[I],A,v.easeEach);for(I in A)for(z=A[I].sort(function(N,k){return N.t-k.t}),G=0,R=0;R<z.length;R++)Y=z[R],L={ease:Y.e,duration:(Y.t-(R?z[R-1].t:0))/100*u},L[I]=Y.v,x.to(y,L,G),G+=L.duration;x.duration()<u&&x.to({},{duration:u-x.duration()})}}u||l.duration(u=x.duration())}else l.timeline=0;return p===!0&&!Nu&&(Ui=oi(l),ht.killTweensOf(y),Ui=0),Hn(S,oi(l),a),r.reversed&&l.reverse(),r.paused&&l.paused(!0),(h||!u&&!v&&l._start===Ot(S._time)&&tn(h)&&YS(oi(l))&&S.data!=="nested")&&(l._tTime=-lt,l.render(Math.max(0,-d)||0)),m&&Sp(oi(l),m),l}var n=t.prototype;return n.render=function(r,a,o){var l=this._time,c=this._tDur,u=this._dur,d=r<0,h=r>c-lt&&!d?c:r<lt?0:r,f,p,v,_,m,g,S,y,x;if(!u)ZS(this,r,a,o);else if(h!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==d){if(f=h,y=this.timeline,this._repeat){if(_=u+this._rDelay,this._repeat<-1&&d)return this.totalTime(_*100+r,a,o);if(f=Ot(h%_),h===c?(v=this._repeat,f=u):(v=~~(h/_),v&&v===Ot(h/_)&&(f=u,v--),f>u&&(f=u)),g=this._yoyo&&v&1,g&&(x=this._yEase,f=u-f),m=Ps(this._tTime,_),f===l&&!o&&this._initted&&v===m)return this._tTime=h,this;v!==m&&(y&&this._yEase&&Fp(y,g),this.vars.repeatRefresh&&!g&&!this._lock&&this._time!==_&&this._initted&&(this._lock=o=1,this.render(Ot(_*v),!0).invalidate()._lock=0))}if(!this._initted){if(Mp(this,d?r:f,o,a,h))return this._tTime=0,this;if(l!==this._time&&!(o&&this.vars.repeatRefresh&&v!==m))return this;if(u!==this._dur)return this.render(r,a,o)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=S=(x||this._ease)(f/u),this._from&&(this.ratio=S=1-S),f&&!l&&!a&&!v&&(pn(this,"onStart"),this._tTime!==h))return this;for(p=this._pt;p;)p.r(S,p.d),p=p._next;y&&y.render(r<0?r:y._dur*y._ease(f/this._dur),a,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!a&&(d&&su(this,r,a,o),pn(this,"onUpdate")),this._repeat&&v!==m&&this.vars.onRepeat&&!a&&this.parent&&pn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(d&&!this._onUpdate&&su(this,r,!0,!0),(r||!u)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&ji(this,1),!a&&!(d&&!l)&&(h||l||g)&&(pn(this,h===c?"onComplete":"onReverseComplete",!0),this._prom&&!(h<c&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),s.prototype.invalidate.call(this,r)},n.resetTo=function(r,a,o,l,c){ga||hn.wake(),this._ts||this.play();var u=Math.min(this._dur,(this._dp._time-this._start)*this._ts),d;return this._initted||Wu(this,u),d=this._ease(u/this._dur),gM(this,r,a,o,l,d,u,c)?this.resetTo(r,a,o,l,1):(ml(this,0),this.parent||xp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},n.kill=function(r,a){if(a===void 0&&(a="all"),!r&&(!a||a==="all"))return this._lazy=this._pt=0,this.parent?$s(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,a,Ui&&Ui.vars.overwrite!==!0)._first||$s(this),this.parent&&o!==this.timeline.totalDuration()&&Ls(this,this._dur*this.timeline._tDur/o,0,1),this}var l=this._targets,c=r?wn(r):l,u=this._ptLookup,d=this._pt,h,f,p,v,_,m,g;if((!a||a==="all")&&qS(l,c))return a==="all"&&(this._pt=0),$s(this);for(h=this._op=this._op||[],a!=="all"&&(Ft(a)&&(_={},nn(a,function(S){return _[S]=1}),a=_),a=_M(l,a)),g=l.length;g--;)if(~c.indexOf(l[g])){f=u[g],a==="all"?(h[g]=a,v=f,p={}):(p=h[g]=h[g]||{},v=a);for(_ in v)m=f&&f[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&hl(this,m,"_pt"),delete f[_]),p!=="all"&&(p[_]=1)}return this._initted&&!this._pt&&d&&$s(this),this},t.to=function(r,a){return new t(r,a,arguments[2])},t.from=function(r,a){return ia(1,arguments)},t.delayedCall=function(r,a,o,l){return new t(a,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:a,onReverseComplete:a,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:l})},t.fromTo=function(r,a,o){return ia(2,arguments)},t.set=function(r,a){return a.duration=0,a.repeatDelay||(a.repeat=0),new t(r,a)},t.killTweensOf=function(r,a,o){return ht.killTweensOf(r,a,o)},t}(_a);Cn(wt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});nn("staggerTo,staggerFrom,staggerFromTo",function(s){wt[s]=function(){var t=new Kt,n=ou.call(arguments,0);return n.splice(s==="staggerFromTo"?5:4,0,0),t[s].apply(t,n)}});var Xu=function(t,n,i){return t[n]=i},Gp=function(t,n,i){return t[n](i)},yM=function(t,n,i,r){return t[n](r.fp,i)},xM=function(t,n,i){return t.setAttribute(n,i)},$u=function(t,n){return yt(t[n])?Gp:Uu(t[n])&&t.setAttribute?xM:Xu},Wp=function(t,n){return n.set(n.t,n.p,Math.round((n.s+n.c*t)*1e6)/1e6,n)},bM=function(t,n){return n.set(n.t,n.p,!!(n.s+n.c*t),n)},Xp=function(t,n){var i=n._pt,r="";if(!t&&n.b)r=n.b;else if(t===1&&n.e)r=n.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*t):Math.round((i.s+i.c*t)*1e4)/1e4)+r,i=i._next;r+=n.c}n.set(n.t,n.p,r,n)},qu=function(t,n){for(var i=n._pt;i;)i.r(t,i.d),i=i._next},SM=function(t,n,i,r){for(var a=this._pt,o;a;)o=a._next,a.p===r&&a.modifier(t,n,i),a=o},MM=function(t){for(var n=this._pt,i,r;n;)r=n._next,n.p===t&&!n.op||n.op===t?hl(this,n,"_pt"):n.dep||(i=1),n=r;return!i},EM=function(t,n,i,r){r.mSet(t,n,r.m.call(r.tween,i,r.mt),r)},$p=function(t){for(var n=t._pt,i,r,a,o;n;){for(i=n._next,r=a;r&&r.pr>n.pr;)r=r._next;(n._prev=r?r._prev:o)?n._prev._next=n:a=n,(n._next=r)?r._prev=n:o=n,n=i}t._pt=a},rn=function(){function s(n,i,r,a,o,l,c,u,d){this.t=i,this.s=a,this.c=o,this.p=r,this.r=l||Wp,this.d=c||this,this.set=u||Xu,this.pr=d||0,this._next=n,n&&(n._prev=this)}var t=s.prototype;return t.modifier=function(i,r,a){this.mSet=this.mSet||this.set,this.set=EM,this.m=i,this.mt=a,this.tween=r},s}();nn(Hu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(s){return zu[s]=1});vn.TweenMax=vn.TweenLite=wt;vn.TimelineLite=vn.TimelineMax=Kt;ht=new Kt({sortChildren:!1,defaults:Rs,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});gn.stringFilter=Np;var Er=[],Uo={},TM=[],kf=0,wM=0,oc=function(t){return(Uo[t]||TM).map(function(n){return n()})},du=function(){var t=Date.now(),n=[];t-kf>2&&(oc("matchMediaInit"),Er.forEach(function(i){var r=i.queries,a=i.conditions,o,l,c,u;for(l in r)o=Fn.matchMedia(r[l]).matches,o&&(c=1),o!==a[l]&&(a[l]=o,u=1);u&&(i.revert(),c&&n.push(i))}),oc("matchMediaRevert"),n.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),kf=t,oc("matchMedia"))},qp=function(){function s(n,i){this.selector=i&&lu(i),this.data=[],this._r=[],this.isReverted=!1,this.id=wM++,n&&this.add(n)}var t=s.prototype;return t.add=function(i,r,a){yt(i)&&(a=r,r=i,i=yt);var o=this,l=function(){var u=ft,d=o.selector,h;return u&&u!==o&&u.data.push(o),a&&(o.selector=lu(a)),ft=o,h=r.apply(o,arguments),yt(h)&&o._r.push(h),ft=u,o.selector=d,o.isReverted=!1,h};return o.last=l,i===yt?l(o,function(c){return o.add(null,c)}):i?o[i]=l:l},t.ignore=function(i){var r=ft;ft=null,i(this),ft=r},t.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof s?i.push.apply(i,r.getTweens()):r instanceof wt&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(i,r){var a=this;if(i?function(){for(var l=a.getTweens(),c=a.data.length,u;c--;)u=a.data[c],u.data==="isFlip"&&(u.revert(),u.getChildren(!0,!0,!1).forEach(function(d){return l.splice(l.indexOf(d),1)}));for(l.map(function(d){return{g:d._dur||d._delay||d._sat&&!d._sat.vars.immediateRender?d.globalTime(0):-1/0,t:d}}).sort(function(d,h){return h.g-d.g||-1/0}).forEach(function(d){return d.t.revert(i)}),c=a.data.length;c--;)u=a.data[c],u instanceof Kt?u.data!=="nested"&&(u.scrollTrigger&&u.scrollTrigger.revert(),u.kill()):!(u instanceof wt)&&u.revert&&u.revert(i);a._r.forEach(function(d){return d(i,a)}),a.isReverted=!0}():this.data.forEach(function(l){return l.kill&&l.kill()}),this.clear(),r)for(var o=Er.length;o--;)Er[o].id===this.id&&Er.splice(o,1)},t.revert=function(i){this.kill(i||{})},s}(),AM=function(){function s(n){this.contexts=[],this.scope=n,ft&&ft.data.push(this)}var t=s.prototype;return t.add=function(i,r,a){Kn(i)||(i={matches:i});var o=new qp(0,a||this.scope),l=o.conditions={},c,u,d;ft&&!o.selector&&(o.selector=ft.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=i;for(u in i)u==="all"?d=1:(c=Fn.matchMedia(i[u]),c&&(Er.indexOf(o)<0&&Er.push(o),(l[u]=c.matches)&&(d=1),c.addListener?c.addListener(du):c.addEventListener("change",du)));return d&&r(o,function(h){return o.add(null,h)}),this},t.revert=function(i){this.kill(i||{})},t.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},s}(),Qo={registerPlugin:function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];n.forEach(function(r){return Dp(r)})},timeline:function(t){return new Kt(t)},getTweensOf:function(t,n){return ht.getTweensOf(t,n)},getProperty:function(t,n,i,r){Ft(t)&&(t=wn(t)[0]);var a=br(t||{}).get,o=i?yp:vp;return i==="native"&&(i=""),t&&(n?o((fn[n]&&fn[n].get||a)(t,n,i,r)):function(l,c,u){return o((fn[l]&&fn[l].get||a)(t,l,c,u))})},quickSetter:function(t,n,i){if(t=wn(t),t.length>1){var r=t.map(function(d){return an.quickSetter(d,n,i)}),a=r.length;return function(d){for(var h=a;h--;)r[h](d)}}t=t[0]||{};var o=fn[n],l=br(t),c=l.harness&&(l.harness.aliases||{})[n]||n,u=o?function(d){var h=new o;us._pt=0,h.init(t,i?d+i:d,us,0,[t]),h.render(1,h),us._pt&&qu(1,us)}:l.set(t,c);return o?u:function(d){return u(t,c,i?d+i:d,l,1)}},quickTo:function(t,n,i){var r,a=an.to(t,Pr((r={},r[n]="+=0.1",r.paused=!0,r),i||{})),o=function(c,u,d){return a.resetTo(n,c,u,d)};return o.tween=a,o},isTweening:function(t){return ht.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Mr(t.ease,Rs.ease)),Of(Rs,t||{})},config:function(t){return Of(gn,t||{})},registerEffect:function(t){var n=t.name,i=t.effect,r=t.plugins,a=t.defaults,o=t.extendTimeline;(r||"").split(",").forEach(function(l){return l&&!fn[l]&&!vn[l]&&ha(n+" effect requires "+l+" plugin.")}),ic[n]=function(l,c,u){return i(wn(l),Cn(c||{},a),u)},o&&(Kt.prototype[n]=function(l,c,u){return this.add(ic[n](l,Kn(c)?c:(u=c)&&{},this),u)})},registerEase:function(t,n){et[t]=Mr(n)},parseEase:function(t,n){return arguments.length?Mr(t,n):et},getById:function(t){return ht.getById(t)},exportRoot:function(t,n){t===void 0&&(t={});var i=new Kt(t),r,a;for(i.smoothChildTiming=tn(t.smoothChildTiming),ht.remove(i),i._dp=0,i._time=i._tTime=ht._time,r=ht._first;r;)a=r._next,(n||!(!r._dur&&r instanceof wt&&r.vars.onComplete===r._targets[0]))&&Hn(i,r,r._start-r._delay),r=a;return Hn(ht,i,0),i},context:function(t,n){return t?new qp(t,n):ft},matchMedia:function(t){return new AM(t)},matchMediaRefresh:function(){return Er.forEach(function(t){var n=t.conditions,i,r;for(r in n)n[r]&&(n[r]=!1,i=1);i&&t.revert()})||du()},addEventListener:function(t,n){var i=Uo[t]||(Uo[t]=[]);~i.indexOf(n)||i.push(n)},removeEventListener:function(t,n){var i=Uo[t],r=i&&i.indexOf(n);r>=0&&i.splice(r,1)},utils:{wrap:sM,wrapYoyo:aM,distribute:wp,random:Cp,snap:Ap,normalize:rM,getUnit:Wt,clamp:eM,splitColor:Ip,toArray:wn,selector:lu,mapRange:Pp,pipe:nM,unitize:iM,interpolate:oM,shuffle:Tp},install:hp,effects:ic,ticker:hn,updateRoot:Kt.updateRoot,plugins:fn,globalTimeline:ht,core:{PropTween:rn,globals:pp,Tween:wt,Timeline:Kt,Animation:_a,getCache:br,_removeLinkedListItem:hl,reverting:function(){return Xt},context:function(t){return t&&ft&&(ft.data.push(t),t._ctx=ft),ft},suppressOverwrites:function(t){return Nu=t}}};nn("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Qo[s]=wt[s]});hn.add(Kt.updateRoot);us=Qo.to({},{duration:0});var CM=function(t,n){for(var i=t._pt;i&&i.p!==n&&i.op!==n&&i.fp!==n;)i=i._next;return i},RM=function(t,n){var i=t._targets,r,a,o;for(r in n)for(a=i.length;a--;)o=t._ptLookup[a][r],o&&(o=o.d)&&(o._pt&&(o=CM(o,r)),o&&o.modifier&&o.modifier(n[r],t,i[a],r))},lc=function(t,n){return{name:t,rawVars:1,init:function(r,a,o){o._onInit=function(l){var c,u;if(Ft(a)&&(c={},nn(a,function(d){return c[d]=1}),a=c),n){c={};for(u in a)c[u]=n(a[u]);a=c}RM(l,a)}}}},an=Qo.registerPlugin({name:"attr",init:function(t,n,i,r,a){var o,l,c;this.tween=i;for(o in n)c=t.getAttribute(o)||"",l=this.add(t,"setAttribute",(c||0)+"",n[o],r,a,0,0,o),l.op=o,l.b=c,this._props.push(o)},render:function(t,n){for(var i=n._pt;i;)Xt?i.set(i.t,i.p,i.b,i):i.r(t,i.d),i=i._next}},{name:"endArray",init:function(t,n){for(var i=n.length;i--;)this.add(t,i,t[i]||0,n[i],0,0,0,0,0,1)}},lc("roundProps",cu),lc("modifiers"),lc("snap",Ap))||Qo;wt.version=Kt.version=an.version="3.12.5";fp=1;Fu()&&Ds();et.Power0;et.Power1;et.Power2;et.Power3;et.Power4;et.Linear;et.Quad;et.Cubic;et.Quart;et.Quint;et.Strong;et.Elastic;et.Back;et.SteppedEase;et.Bounce;et.Sine;et.Expo;et.Circ;/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var zf,Fi,ys,ju,yr,Hf,Yu,PM=function(){return typeof window<"u"},vi={},pr=180/Math.PI,xs=Math.PI/180,ss=Math.atan2,Vf=1e8,Ku=/([A-Z])/g,LM=/(left|right|width|margin|padding|x)/i,DM=/[\s,\(]\S/,Wn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},fu=function(t,n){return n.set(n.t,n.p,Math.round((n.s+n.c*t)*1e4)/1e4+n.u,n)},IM=function(t,n){return n.set(n.t,n.p,t===1?n.e:Math.round((n.s+n.c*t)*1e4)/1e4+n.u,n)},OM=function(t,n){return n.set(n.t,n.p,t?Math.round((n.s+n.c*t)*1e4)/1e4+n.u:n.b,n)},NM=function(t,n){var i=n.s+n.c*t;n.set(n.t,n.p,~~(i+(i<0?-.5:.5))+n.u,n)},jp=function(t,n){return n.set(n.t,n.p,t?n.e:n.b,n)},Yp=function(t,n){return n.set(n.t,n.p,t!==1?n.b:n.e,n)},UM=function(t,n,i){return t.style[n]=i},FM=function(t,n,i){return t.style.setProperty(n,i)},BM=function(t,n,i){return t._gsap[n]=i},kM=function(t,n,i){return t._gsap.scaleX=t._gsap.scaleY=i},zM=function(t,n,i,r,a){var o=t._gsap;o.scaleX=o.scaleY=i,o.renderTransform(a,o)},HM=function(t,n,i,r,a){var o=t._gsap;o[n]=i,o.renderTransform(a,o)},gt="transform",sn=gt+"Origin",VM=function s(t,n){var i=this,r=this.target,a=r.style,o=r._gsap;if(t in vi&&a){if(this.tfm=this.tfm||{},t!=="transform")t=Wn[t]||t,~t.indexOf(",")?t.split(",").forEach(function(l){return i.tfm[l]=li(r,l)}):this.tfm[t]=o.x?o[t]:li(r,t),t===sn&&(this.tfm.zOrigin=o.zOrigin);else return Wn.transform.split(",").forEach(function(l){return s.call(i,l,n)});if(this.props.indexOf(gt)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(sn,n,"")),t=gt}(a||n)&&this.props.push(t,n,a[t])},Kp=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},GM=function(){var t=this.props,n=this.target,i=n.style,r=n._gsap,a,o;for(a=0;a<t.length;a+=3)t[a+1]?n[t[a]]=t[a+2]:t[a+2]?i[t[a]]=t[a+2]:i.removeProperty(t[a].substr(0,2)==="--"?t[a]:t[a].replace(Ku,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),n.setAttribute("data-svg-origin",this.svgo||"")),a=Yu(),(!a||!a.isStart)&&!i[gt]&&(Kp(i),r.zOrigin&&i[sn]&&(i[sn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Zp=function(t,n){var i={target:t,props:[],revert:GM,save:VM};return t._gsap||an.core.getCache(t),n&&n.split(",").forEach(function(r){return i.save(r)}),i},Jp,hu=function(t,n){var i=Fi.createElementNS?Fi.createElementNS((n||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Fi.createElement(t);return i&&i.style?i:Fi.createElement(t)},qn=function s(t,n,i){var r=getComputedStyle(t);return r[n]||r.getPropertyValue(n.replace(Ku,"-$1").toLowerCase())||r.getPropertyValue(n)||!i&&s(t,Is(n)||n,1)||""},Gf="O,Moz,ms,Ms,Webkit".split(","),Is=function(t,n,i){var r=n||yr,a=r.style,o=5;if(t in a&&!i)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(Gf[o]+t in a););return o<0?null:(o===3?"ms":o>=0?Gf[o]:"")+t},pu=function(){PM()&&window.document&&(zf=window,Fi=zf.document,ys=Fi.documentElement,yr=hu("div")||{style:{}},hu("div"),gt=Is(gt),sn=gt+"Origin",yr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Jp=!!Is("perspective"),Yu=an.core.reverting,ju=1)},cc=function s(t){var n=hu("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=this.parentNode,r=this.nextSibling,a=this.style.cssText,o;if(ys.appendChild(n),n.appendChild(this),this.style.display="block",t)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=s}catch{}else this._gsapBBox&&(o=this._gsapBBox());return i&&(r?i.insertBefore(this,r):i.appendChild(this)),ys.removeChild(n),this.style.cssText=a,o},Wf=function(t,n){for(var i=n.length;i--;)if(t.hasAttribute(n[i]))return t.getAttribute(n[i])},Qp=function(t){var n;try{n=t.getBBox()}catch{n=cc.call(t,!0)}return n&&(n.width||n.height)||t.getBBox===cc||(n=cc.call(t,!0)),n&&!n.width&&!n.x&&!n.y?{x:+Wf(t,["x","cx","x1"])||0,y:+Wf(t,["y","cy","y1"])||0,width:0,height:0}:n},em=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Qp(t))},Lr=function(t,n){if(n){var i=t.style,r;n in vi&&n!==sn&&(n=gt),i.removeProperty?(r=n.substr(0,2),(r==="ms"||n.substr(0,6)==="webkit")&&(n="-"+n),i.removeProperty(r==="--"?n:n.replace(Ku,"-$1").toLowerCase())):i.removeAttribute(n)}},Bi=function(t,n,i,r,a,o){var l=new rn(t._pt,n,i,0,1,o?Yp:jp);return t._pt=l,l.b=r,l.e=a,t._props.push(i),l},Xf={deg:1,rad:1,turn:1},WM={grid:1,flex:1},Yi=function s(t,n,i,r){var a=parseFloat(i)||0,o=(i+"").trim().substr((a+"").length)||"px",l=yr.style,c=LM.test(n),u=t.tagName.toLowerCase()==="svg",d=(u?"client":"offset")+(c?"Width":"Height"),h=100,f=r==="px",p=r==="%",v,_,m,g;if(r===o||!a||Xf[r]||Xf[o])return a;if(o!=="px"&&!f&&(a=s(t,n,i,"px")),g=t.getCTM&&em(t),(p||o==="%")&&(vi[n]||~n.indexOf("adius")))return v=g?t.getBBox()[c?"width":"height"]:t[d],bt(p?a/v*h:a/100*v);if(l[c?"width":"height"]=h+(f?o:r),_=~n.indexOf("adius")||r==="em"&&t.appendChild&&!u?t:t.parentNode,g&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Fi||!_.appendChild)&&(_=Fi.body),m=_._gsap,m&&p&&m.width&&c&&m.time===hn.time&&!m.uncache)return bt(a/m.width*h);if(p&&(n==="height"||n==="width")){var S=t.style[n];t.style[n]=h+r,v=t[d],S?t.style[n]=S:Lr(t,n)}else(p||o==="%")&&!WM[qn(_,"display")]&&(l.position=qn(t,"position")),_===t&&(l.position="static"),_.appendChild(yr),v=yr[d],_.removeChild(yr),l.position="absolute";return c&&p&&(m=br(_),m.time=hn.time,m.width=_[d]),bt(f?v*a/h:v&&a?h/v*a:0)},li=function(t,n,i,r){var a;return ju||pu(),n in Wn&&n!=="transform"&&(n=Wn[n],~n.indexOf(",")&&(n=n.split(",")[0])),vi[n]&&n!=="transform"?(a=ya(t,r),a=n!=="transformOrigin"?a[n]:a.svg?a.origin:tl(qn(t,sn))+" "+a.zOrigin+"px"):(a=t.style[n],(!a||a==="auto"||r||~(a+"").indexOf("calc("))&&(a=el[n]&&el[n](t,n,i)||qn(t,n)||gp(t,n)||(n==="opacity"?1:0))),i&&!~(a+"").trim().indexOf(" ")?Yi(t,n,a,i)+i:a},XM=function(t,n,i,r){if(!i||i==="none"){var a=Is(n,t,1),o=a&&qn(t,a,1);o&&o!==i?(n=a,i=o):n==="borderColor"&&(i=qn(t,"borderTopColor"))}var l=new rn(this._pt,t.style,n,0,1,Xp),c=0,u=0,d,h,f,p,v,_,m,g,S,y,x,R;if(l.b=i,l.e=r,i+="",r+="",r==="auto"&&(_=t.style[n],t.style[n]=r,r=qn(t,n)||r,_?t.style[n]=_:Lr(t,n)),d=[i,r],Np(d),i=d[0],r=d[1],f=i.match(cs)||[],R=r.match(cs)||[],R.length){for(;h=cs.exec(r);)m=h[0],S=r.substring(c,h.index),v?v=(v+1)%5:(S.substr(-5)==="rgba("||S.substr(-5)==="hsla(")&&(v=1),m!==(_=f[u++]||"")&&(p=parseFloat(_)||0,x=_.substr((p+"").length),m.charAt(1)==="="&&(m=vs(p,m)+x),g=parseFloat(m),y=m.substr((g+"").length),c=cs.lastIndex-y.length,y||(y=y||gn.units[n]||x,c===r.length&&(r+=y,l.e+=y)),x!==y&&(p=Yi(t,n,_,y)||0),l._pt={_next:l._pt,p:S||u===1?S:",",s:p,c:g-p,m:v&&v<4||n==="zIndex"?Math.round:0});l.c=c<r.length?r.substring(c,r.length):""}else l.r=n==="display"&&r==="none"?Yp:jp;return up.test(r)&&(l.e=0),this._pt=l,l},$f={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},$M=function(t){var n=t.split(" "),i=n[0],r=n[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(t=i,i=r,r=t),n[0]=$f[i]||i,n[1]=$f[r]||r,n.join(" ")},qM=function(t,n){if(n.tween&&n.tween._time===n.tween._dur){var i=n.t,r=i.style,a=n.u,o=i._gsap,l,c,u;if(a==="all"||a===!0)r.cssText="",c=1;else for(a=a.split(","),u=a.length;--u>-1;)l=a[u],vi[l]&&(c=1,l=l==="transformOrigin"?sn:gt),Lr(i,l);c&&(Lr(i,gt),o&&(o.svg&&i.removeAttribute("transform"),ya(i,1),o.uncache=1,Kp(r)))}},el={clearProps:function(t,n,i,r,a){if(a.data!=="isFromStart"){var o=t._pt=new rn(t._pt,n,i,0,0,qM);return o.u=r,o.pr=-10,o.tween=a,t._props.push(i),1}}},va=[1,0,0,1,0,0],tm={},nm=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},qf=function(t){var n=qn(t,gt);return nm(n)?va:n.substr(7).match(cp).map(bt)},Zu=function(t,n){var i=t._gsap||br(t),r=t.style,a=qf(t),o,l,c,u;return i.svg&&t.getAttribute("transform")?(c=t.transform.baseVal.consolidate().matrix,a=[c.a,c.b,c.c,c.d,c.e,c.f],a.join(",")==="1,0,0,1,0,0"?va:a):(a===va&&!t.offsetParent&&t!==ys&&!i.svg&&(c=r.display,r.display="block",o=t.parentNode,(!o||!t.offsetParent)&&(u=1,l=t.nextElementSibling,ys.appendChild(t)),a=qf(t),c?r.display=c:Lr(t,"display"),u&&(l?o.insertBefore(t,l):o?o.appendChild(t):ys.removeChild(t))),n&&a.length>6?[a[0],a[1],a[4],a[5],a[12],a[13]]:a)},mu=function(t,n,i,r,a,o){var l=t._gsap,c=a||Zu(t,!0),u=l.xOrigin||0,d=l.yOrigin||0,h=l.xOffset||0,f=l.yOffset||0,p=c[0],v=c[1],_=c[2],m=c[3],g=c[4],S=c[5],y=n.split(" "),x=parseFloat(y[0])||0,R=parseFloat(y[1])||0,A,w,I,M;i?c!==va&&(w=p*m-v*_)&&(I=x*(m/w)+R*(-_/w)+(_*S-m*g)/w,M=x*(-v/w)+R*(p/w)-(p*S-v*g)/w,x=I,R=M):(A=Qp(t),x=A.x+(~y[0].indexOf("%")?x/100*A.width:x),R=A.y+(~(y[1]||y[0]).indexOf("%")?R/100*A.height:R)),r||r!==!1&&l.smooth?(g=x-u,S=R-d,l.xOffset=h+(g*p+S*_)-g,l.yOffset=f+(g*v+S*m)-S):l.xOffset=l.yOffset=0,l.xOrigin=x,l.yOrigin=R,l.smooth=!!r,l.origin=n,l.originIsAbsolute=!!i,t.style[sn]="0px 0px",o&&(Bi(o,l,"xOrigin",u,x),Bi(o,l,"yOrigin",d,R),Bi(o,l,"xOffset",h,l.xOffset),Bi(o,l,"yOffset",f,l.yOffset)),t.setAttribute("data-svg-origin",x+" "+R)},ya=function(t,n){var i=t._gsap||new kp(t);if("x"in i&&!n&&!i.uncache)return i;var r=t.style,a=i.scaleX<0,o="px",l="deg",c=getComputedStyle(t),u=qn(t,sn)||"0",d,h,f,p,v,_,m,g,S,y,x,R,A,w,I,M,E,O,G,z,Y,L,N,k,F,ne,te,de,Oe,Ne,J,ae;return d=h=f=_=m=g=S=y=x=0,p=v=1,i.svg=!!(t.getCTM&&em(t)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(r[gt]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[gt]!=="none"?c[gt]:"")),r.scale=r.rotate=r.translate="none"),w=Zu(t,i.svg),i.svg&&(i.uncache?(F=t.getBBox(),u=i.xOrigin-F.x+"px "+(i.yOrigin-F.y)+"px",k=""):k=!n&&t.getAttribute("data-svg-origin"),mu(t,k||u,!!k||i.originIsAbsolute,i.smooth!==!1,w)),R=i.xOrigin||0,A=i.yOrigin||0,w!==va&&(O=w[0],G=w[1],z=w[2],Y=w[3],d=L=w[4],h=N=w[5],w.length===6?(p=Math.sqrt(O*O+G*G),v=Math.sqrt(Y*Y+z*z),_=O||G?ss(G,O)*pr:0,S=z||Y?ss(z,Y)*pr+_:0,S&&(v*=Math.abs(Math.cos(S*xs))),i.svg&&(d-=R-(R*O+A*z),h-=A-(R*G+A*Y))):(ae=w[6],Ne=w[7],te=w[8],de=w[9],Oe=w[10],J=w[11],d=w[12],h=w[13],f=w[14],I=ss(ae,Oe),m=I*pr,I&&(M=Math.cos(-I),E=Math.sin(-I),k=L*M+te*E,F=N*M+de*E,ne=ae*M+Oe*E,te=L*-E+te*M,de=N*-E+de*M,Oe=ae*-E+Oe*M,J=Ne*-E+J*M,L=k,N=F,ae=ne),I=ss(-z,Oe),g=I*pr,I&&(M=Math.cos(-I),E=Math.sin(-I),k=O*M-te*E,F=G*M-de*E,ne=z*M-Oe*E,J=Y*E+J*M,O=k,G=F,z=ne),I=ss(G,O),_=I*pr,I&&(M=Math.cos(I),E=Math.sin(I),k=O*M+G*E,F=L*M+N*E,G=G*M-O*E,N=N*M-L*E,O=k,L=F),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,g=180-g),p=bt(Math.sqrt(O*O+G*G+z*z)),v=bt(Math.sqrt(N*N+ae*ae)),I=ss(L,N),S=Math.abs(I)>2e-4?I*pr:0,x=J?1/(J<0?-J:J):0),i.svg&&(k=t.getAttribute("transform"),i.forceCSS=t.setAttribute("transform","")||!nm(qn(t,gt)),k&&t.setAttribute("transform",k))),Math.abs(S)>90&&Math.abs(S)<270&&(a?(p*=-1,S+=_<=0?180:-180,_+=_<=0?180:-180):(v*=-1,S+=S<=0?180:-180)),n=n||i.uncache,i.x=d-((i.xPercent=d&&(!n&&i.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-d)?-50:0)))?t.offsetWidth*i.xPercent/100:0)+o,i.y=h-((i.yPercent=h&&(!n&&i.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*i.yPercent/100:0)+o,i.z=f+o,i.scaleX=bt(p),i.scaleY=bt(v),i.rotation=bt(_)+l,i.rotationX=bt(m)+l,i.rotationY=bt(g)+l,i.skewX=S+l,i.skewY=y+l,i.transformPerspective=x+o,(i.zOrigin=parseFloat(u.split(" ")[2])||!n&&i.zOrigin||0)&&(r[sn]=tl(u)),i.xOffset=i.yOffset=0,i.force3D=gn.force3D,i.renderTransform=i.svg?YM:Jp?im:jM,i.uncache=0,i},tl=function(t){return(t=t.split(" "))[0]+" "+t[1]},uc=function(t,n,i){var r=Wt(n);return bt(parseFloat(n)+parseFloat(Yi(t,"x",i+"px",r)))+r},jM=function(t,n){n.z="0px",n.rotationY=n.rotationX="0deg",n.force3D=0,im(t,n)},dr="0deg",Ws="0px",fr=") ",im=function(t,n){var i=n||this,r=i.xPercent,a=i.yPercent,o=i.x,l=i.y,c=i.z,u=i.rotation,d=i.rotationY,h=i.rotationX,f=i.skewX,p=i.skewY,v=i.scaleX,_=i.scaleY,m=i.transformPerspective,g=i.force3D,S=i.target,y=i.zOrigin,x="",R=g==="auto"&&t&&t!==1||g===!0;if(y&&(h!==dr||d!==dr)){var A=parseFloat(d)*xs,w=Math.sin(A),I=Math.cos(A),M;A=parseFloat(h)*xs,M=Math.cos(A),o=uc(S,o,w*M*-y),l=uc(S,l,-Math.sin(A)*-y),c=uc(S,c,I*M*-y+y)}m!==Ws&&(x+="perspective("+m+fr),(r||a)&&(x+="translate("+r+"%, "+a+"%) "),(R||o!==Ws||l!==Ws||c!==Ws)&&(x+=c!==Ws||R?"translate3d("+o+", "+l+", "+c+") ":"translate("+o+", "+l+fr),u!==dr&&(x+="rotate("+u+fr),d!==dr&&(x+="rotateY("+d+fr),h!==dr&&(x+="rotateX("+h+fr),(f!==dr||p!==dr)&&(x+="skew("+f+", "+p+fr),(v!==1||_!==1)&&(x+="scale("+v+", "+_+fr),S.style[gt]=x||"translate(0, 0)"},YM=function(t,n){var i=n||this,r=i.xPercent,a=i.yPercent,o=i.x,l=i.y,c=i.rotation,u=i.skewX,d=i.skewY,h=i.scaleX,f=i.scaleY,p=i.target,v=i.xOrigin,_=i.yOrigin,m=i.xOffset,g=i.yOffset,S=i.forceCSS,y=parseFloat(o),x=parseFloat(l),R,A,w,I,M;c=parseFloat(c),u=parseFloat(u),d=parseFloat(d),d&&(d=parseFloat(d),u+=d,c+=d),c||u?(c*=xs,u*=xs,R=Math.cos(c)*h,A=Math.sin(c)*h,w=Math.sin(c-u)*-f,I=Math.cos(c-u)*f,u&&(d*=xs,M=Math.tan(u-d),M=Math.sqrt(1+M*M),w*=M,I*=M,d&&(M=Math.tan(d),M=Math.sqrt(1+M*M),R*=M,A*=M)),R=bt(R),A=bt(A),w=bt(w),I=bt(I)):(R=h,I=f,A=w=0),(y&&!~(o+"").indexOf("px")||x&&!~(l+"").indexOf("px"))&&(y=Yi(p,"x",o,"px"),x=Yi(p,"y",l,"px")),(v||_||m||g)&&(y=bt(y+v-(v*R+_*w)+m),x=bt(x+_-(v*A+_*I)+g)),(r||a)&&(M=p.getBBox(),y=bt(y+r/100*M.width),x=bt(x+a/100*M.height)),M="matrix("+R+","+A+","+w+","+I+","+y+","+x+")",p.setAttribute("transform",M),S&&(p.style[gt]=M)},KM=function(t,n,i,r,a){var o=360,l=Ft(a),c=parseFloat(a)*(l&&~a.indexOf("rad")?pr:1),u=c-r,d=r+u+"deg",h,f;return l&&(h=a.split("_")[1],h==="short"&&(u%=o,u!==u%(o/2)&&(u+=u<0?o:-o)),h==="cw"&&u<0?u=(u+o*Vf)%o-~~(u/o)*o:h==="ccw"&&u>0&&(u=(u-o*Vf)%o-~~(u/o)*o)),t._pt=f=new rn(t._pt,n,i,r,u,IM),f.e=d,f.u="deg",t._props.push(i),f},jf=function(t,n){for(var i in n)t[i]=n[i];return t},ZM=function(t,n,i){var r=jf({},i._gsap),a="perspective,force3D,transformOrigin,svgOrigin",o=i.style,l,c,u,d,h,f,p,v;r.svg?(u=i.getAttribute("transform"),i.setAttribute("transform",""),o[gt]=n,l=ya(i,1),Lr(i,gt),i.setAttribute("transform",u)):(u=getComputedStyle(i)[gt],o[gt]=n,l=ya(i,1),o[gt]=u);for(c in vi)u=r[c],d=l[c],u!==d&&a.indexOf(c)<0&&(p=Wt(u),v=Wt(d),h=p!==v?Yi(i,c,u,v):parseFloat(u),f=parseFloat(d),t._pt=new rn(t._pt,l,c,h,f-h,fu),t._pt.u=v||0,t._props.push(c));jf(l,r)};nn("padding,margin,Width,Radius",function(s,t){var n="Top",i="Right",r="Bottom",a="Left",o=(t<3?[n,i,r,a]:[n+a,n+i,r+i,r+a]).map(function(l){return t<2?s+l:"border"+l+s});el[t>1?"border"+s:s]=function(l,c,u,d,h){var f,p;if(arguments.length<4)return f=o.map(function(v){return li(l,v,u)}),p=f.join(" "),p.split(f[0]).length===5?f[0]:p;f=(d+"").split(" "),p={},o.forEach(function(v,_){return p[v]=f[_]=f[_]||f[(_-1)/2|0]}),l.init(c,p,h)}});var rm={name:"css",register:pu,targetTest:function(t){return t.style&&t.nodeType},init:function(t,n,i,r,a){var o=this._props,l=t.style,c=i.vars.startAt,u,d,h,f,p,v,_,m,g,S,y,x,R,A,w,I;ju||pu(),this.styles=this.styles||Zp(t),I=this.styles.props,this.tween=i;for(_ in n)if(_!=="autoRound"&&(d=n[_],!(fn[_]&&zp(_,n,i,r,t,a)))){if(p=typeof d,v=el[_],p==="function"&&(d=d.call(i,r,t,a),p=typeof d),p==="string"&&~d.indexOf("random(")&&(d=ma(d)),v)v(this,t,_,d,i)&&(w=1);else if(_.substr(0,2)==="--")u=(getComputedStyle(t).getPropertyValue(_)+"").trim(),d+="",Vi.lastIndex=0,Vi.test(u)||(m=Wt(u),g=Wt(d)),g?m!==g&&(u=Yi(t,_,u,g)+g):m&&(d+=m),this.add(l,"setProperty",u,d,r,a,0,0,_),o.push(_),I.push(_,0,l[_]);else if(p!=="undefined"){if(c&&_ in c?(u=typeof c[_]=="function"?c[_].call(i,r,t,a):c[_],Ft(u)&&~u.indexOf("random(")&&(u=ma(u)),Wt(u+"")||u==="auto"||(u+=gn.units[_]||Wt(li(t,_))||""),(u+"").charAt(1)==="="&&(u=li(t,_))):u=li(t,_),f=parseFloat(u),S=p==="string"&&d.charAt(1)==="="&&d.substr(0,2),S&&(d=d.substr(2)),h=parseFloat(d),_ in Wn&&(_==="autoAlpha"&&(f===1&&li(t,"visibility")==="hidden"&&h&&(f=0),I.push("visibility",0,l.visibility),Bi(this,l,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),_!=="scale"&&_!=="transform"&&(_=Wn[_],~_.indexOf(",")&&(_=_.split(",")[0]))),y=_ in vi,y){if(this.styles.save(_),x||(R=t._gsap,R.renderTransform&&!n.parseTransform||ya(t,n.parseTransform),A=n.smoothOrigin!==!1&&R.smooth,x=this._pt=new rn(this._pt,l,gt,0,1,R.renderTransform,R,0,-1),x.dep=1),_==="scale")this._pt=new rn(this._pt,R,"scaleY",R.scaleY,(S?vs(R.scaleY,S+h):h)-R.scaleY||0,fu),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){I.push(sn,0,l[sn]),d=$M(d),R.svg?mu(t,d,0,A,0,this):(g=parseFloat(d.split(" ")[2])||0,g!==R.zOrigin&&Bi(this,R,"zOrigin",R.zOrigin,g),Bi(this,l,_,tl(u),tl(d)));continue}else if(_==="svgOrigin"){mu(t,d,1,A,0,this);continue}else if(_ in tm){KM(this,R,_,f,S?vs(f,S+d):d);continue}else if(_==="smoothOrigin"){Bi(this,R,"smooth",R.smooth,d);continue}else if(_==="force3D"){R[_]=d;continue}else if(_==="transform"){ZM(this,d,t);continue}}else _ in l||(_=Is(_)||_);if(y||(h||h===0)&&(f||f===0)&&!DM.test(d)&&_ in l)m=(u+"").substr((f+"").length),h||(h=0),g=Wt(d)||(_ in gn.units?gn.units[_]:m),m!==g&&(f=Yi(t,_,u,g)),this._pt=new rn(this._pt,y?R:l,_,f,(S?vs(f,S+h):h)-f,!y&&(g==="px"||_==="zIndex")&&n.autoRound!==!1?NM:fu),this._pt.u=g||0,m!==g&&g!=="%"&&(this._pt.b=u,this._pt.r=OM);else if(_ in l)XM.call(this,t,_,u,S?S+d:d);else if(_ in t)this.add(t,_,u||t[_],S?S+d:d,r,a);else if(_!=="parseTransform"){ku(_,d);continue}y||(_ in l?I.push(_,0,l[_]):I.push(_,1,u||t[_])),o.push(_)}}w&&$p(this)},render:function(t,n){if(n.tween._time||!Yu())for(var i=n._pt;i;)i.r(t,i.d),i=i._next;else n.styles.revert()},get:li,aliases:Wn,getSetter:function(t,n,i){var r=Wn[n];return r&&r.indexOf(",")<0&&(n=r),n in vi&&n!==sn&&(t._gsap.x||li(t,"x"))?i&&Hf===i?n==="scale"?kM:BM:(Hf=i||{})&&(n==="scale"?zM:HM):t.style&&!Uu(t.style[n])?UM:~n.indexOf("-")?FM:$u(t,n)},core:{_removeProperty:Lr,_getMatrix:Zu}};an.utils.checkPrefix=Is;an.core.getStyleSaver=Zp;(function(s,t,n,i){var r=nn(s+","+t+","+n,function(a){vi[a]=1});nn(t,function(a){gn.units[a]="deg",tm[a]=1}),Wn[r[13]]=s+","+t,nn(i,function(a){var o=a.split(":");Wn[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");nn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){gn.units[s]="px"});an.registerPlugin(rm);var Vn=an.registerPlugin(rm)||an;Vn.core.Tween;class JM extends Ta{constructor(t){super(t)}load(t,n,i,r){const a=this,o=new IS(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(l){const c=a.parse(JSON.parse(l));n&&n(c)},i,r)}parse(t){return new QM(t)}}class QM{constructor(t){this.isFont=!0,this.type="Font",this.data=t}generateShapes(t,n=100){const i=[],r=eE(t,n,this.data);for(let a=0,o=r.length;a<o;a++)i.push(...r[a].toShapes());return i}}function eE(s,t,n){const i=Array.from(s),r=t/n.resolution,a=(n.boundingBox.yMax-n.boundingBox.yMin+n.underlineThickness)*r,o=[];let l=0,c=0;for(let u=0;u<i.length;u++){const d=i[u];if(d===`
`)l=0,c-=a;else{const h=tE(d,r,l,c,n);l+=h.offsetX,o.push(h.path)}}return o}function tE(s,t,n,i,r){const a=r.glyphs[s]||r.glyphs["?"];if(!a){console.error('THREE.Font: character "'+s+'" does not exists in font family '+r.familyName+".");return}const o=new FS;let l,c,u,d,h,f,p,v;if(a.o){const _=a._cachedOutline||(a._cachedOutline=a.o.split(" "));for(let m=0,g=_.length;m<g;)switch(_[m++]){case"m":l=_[m++]*t+n,c=_[m++]*t+i,o.moveTo(l,c);break;case"l":l=_[m++]*t+n,c=_[m++]*t+i,o.lineTo(l,c);break;case"q":u=_[m++]*t+n,d=_[m++]*t+i,h=_[m++]*t+n,f=_[m++]*t+i,o.quadraticCurveTo(h,f,u,d);break;case"b":u=_[m++]*t+n,d=_[m++]*t+i,h=_[m++]*t+n,f=_[m++]*t+i,p=_[m++]*t+n,v=_[m++]*t+i,o.bezierCurveTo(h,f,p,v,u,d);break}}return{offsetX:a.ha*t,path:o}}class Yf extends Ou{constructor(t,n={}){const i=n.font;if(i===void 0)super();else{const r=i.generateShapes(t,n.size);n.depth===void 0&&n.height!==void 0&&console.warn("THREE.TextGeometry: .height is now depreciated. Please use .depth instead"),n.depth=n.depth!==void 0?n.depth:n.height!==void 0?n.height:50,n.bevelThickness===void 0&&(n.bevelThickness=10),n.bevelSize===void 0&&(n.bevelSize=8),n.bevelEnabled===void 0&&(n.bevelEnabled=!1),super(r,n)}this.type="TextGeometry"}}const Kf={type:"change"},dc={type:"start"},Zf={type:"end"},go=new Fh,Jf=new Li,nE=Math.cos(70*k_.DEG2RAD);class sm extends Dr{constructor(t,n){super(),this.object=t,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:zr.ROTATE,MIDDLE:zr.DOLLY,RIGHT:zr.PAN},this.touches={ONE:Hr.ROTATE,TWO:Hr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return l.phi},this.getAzimuthalAngle=function(){return l.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(b){b.addEventListener("keydown",Se),this._domElementKeyEvents=b},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Se),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Kf),i.update(),a=r.NONE},this.update=function(){const b=new U,W=new Cr().setFromUnitVectors(t.up,new U(0,1,0)),X=W.clone().invert(),Z=new U,le=new Cr,Le=new U,Ge=2*Math.PI;return function(Ct=null){const tt=i.object.position;b.copy(tt).sub(i.target),b.applyQuaternion(W),l.setFromVector3(b),i.autoRotate&&a===r.NONE&&G(E(Ct)),i.enableDamping?(l.theta+=c.theta*i.dampingFactor,l.phi+=c.phi*i.dampingFactor):(l.theta+=c.theta,l.phi+=c.phi);let Rt=i.minAzimuthAngle,Mt=i.maxAzimuthAngle;isFinite(Rt)&&isFinite(Mt)&&(Rt<-Math.PI?Rt+=Ge:Rt>Math.PI&&(Rt-=Ge),Mt<-Math.PI?Mt+=Ge:Mt>Math.PI&&(Mt-=Ge),Rt<=Mt?l.theta=Math.max(Rt,Math.min(Mt,l.theta)):l.theta=l.theta>(Rt+Mt)/2?Math.max(Rt,l.theta):Math.min(Mt,l.theta)),l.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,l.phi)),l.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(d,i.dampingFactor):i.target.add(d),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor);let Si=!1;if(i.zoomToCursor&&A||i.object.isOrthographicCamera)l.radius=te(l.radius);else{const Bt=l.radius;l.radius=te(l.radius*u),Si=Bt!=l.radius}if(b.setFromSpherical(l),b.applyQuaternion(X),tt.copy(i.target).add(b),i.object.lookAt(i.target),i.enableDamping===!0?(c.theta*=1-i.dampingFactor,c.phi*=1-i.dampingFactor,d.multiplyScalar(1-i.dampingFactor)):(c.set(0,0,0),d.set(0,0,0)),i.zoomToCursor&&A){let Bt=null;if(i.object.isPerspectiveCamera){const Qn=b.length();Bt=te(Qn*u);const rr=Qn-Bt;i.object.position.addScaledVector(x,rr),i.object.updateMatrixWorld(),Si=!!rr}else if(i.object.isOrthographicCamera){const Qn=new U(R.x,R.y,0);Qn.unproject(i.object);const rr=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/u)),i.object.updateProjectionMatrix(),Si=rr!==i.object.zoom;const Fs=new U(R.x,R.y,0);Fs.unproject(i.object),i.object.position.sub(Fs).add(Qn),i.object.updateMatrixWorld(),Bt=b.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;Bt!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(Bt).add(i.object.position):(go.origin.copy(i.object.position),go.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(go.direction))<nE?t.lookAt(i.target):(Jf.setFromNormalAndCoplanarPoint(i.object.up,i.target),go.intersectPlane(Jf,i.target))))}else if(i.object.isOrthographicCamera){const Bt=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/u)),Bt!==i.object.zoom&&(i.object.updateProjectionMatrix(),Si=!0)}return u=1,A=!1,Si||Z.distanceToSquared(i.object.position)>o||8*(1-le.dot(i.object.quaternion))>o||Le.distanceToSquared(i.target)>o?(i.dispatchEvent(Kf),Z.copy(i.object.position),le.copy(i.object.quaternion),Le.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",be),i.domElement.removeEventListener("pointerdown",Ee),i.domElement.removeEventListener("pointercancel",T),i.domElement.removeEventListener("wheel",re),i.domElement.removeEventListener("pointermove",D),i.domElement.removeEventListener("pointerup",T),i.domElement.getRootNode().removeEventListener("keydown",Pe,{capture:!0}),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",Se),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=r.NONE;const o=1e-6,l=new Df,c=new Df;let u=1;const d=new U,h=new he,f=new he,p=new he,v=new he,_=new he,m=new he,g=new he,S=new he,y=new he,x=new U,R=new he;let A=!1;const w=[],I={};let M=!1;function E(b){return b!==null?2*Math.PI/60*i.autoRotateSpeed*b:2*Math.PI/60/60*i.autoRotateSpeed}function O(b){const W=Math.abs(b*.01);return Math.pow(.95,i.zoomSpeed*W)}function G(b){c.theta-=b}function z(b){c.phi-=b}const Y=function(){const b=new U;return function(X,Z){b.setFromMatrixColumn(Z,0),b.multiplyScalar(-X),d.add(b)}}(),L=function(){const b=new U;return function(X,Z){i.screenSpacePanning===!0?b.setFromMatrixColumn(Z,1):(b.setFromMatrixColumn(Z,0),b.crossVectors(i.object.up,b)),b.multiplyScalar(X),d.add(b)}}(),N=function(){const b=new U;return function(X,Z){const le=i.domElement;if(i.object.isPerspectiveCamera){const Le=i.object.position;b.copy(Le).sub(i.target);let Ge=b.length();Ge*=Math.tan(i.object.fov/2*Math.PI/180),Y(2*X*Ge/le.clientHeight,i.object.matrix),L(2*Z*Ge/le.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(Y(X*(i.object.right-i.object.left)/i.object.zoom/le.clientWidth,i.object.matrix),L(Z*(i.object.top-i.object.bottom)/i.object.zoom/le.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function k(b){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?u/=b:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function F(b){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?u*=b:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ne(b,W){if(!i.zoomToCursor)return;A=!0;const X=i.domElement.getBoundingClientRect(),Z=b-X.left,le=W-X.top,Le=X.width,Ge=X.height;R.x=Z/Le*2-1,R.y=-(le/Ge)*2+1,x.set(R.x,R.y,1).unproject(i.object).sub(i.object.position).normalize()}function te(b){return Math.max(i.minDistance,Math.min(i.maxDistance,b))}function de(b){h.set(b.clientX,b.clientY)}function Oe(b){ne(b.clientX,b.clientX),g.set(b.clientX,b.clientY)}function Ne(b){v.set(b.clientX,b.clientY)}function J(b){f.set(b.clientX,b.clientY),p.subVectors(f,h).multiplyScalar(i.rotateSpeed);const W=i.domElement;G(2*Math.PI*p.x/W.clientHeight),z(2*Math.PI*p.y/W.clientHeight),h.copy(f),i.update()}function ae(b){S.set(b.clientX,b.clientY),y.subVectors(S,g),y.y>0?k(O(y.y)):y.y<0&&F(O(y.y)),g.copy(S),i.update()}function Te(b){_.set(b.clientX,b.clientY),m.subVectors(_,v).multiplyScalar(i.panSpeed),N(m.x,m.y),v.copy(_),i.update()}function ge(b){ne(b.clientX,b.clientY),b.deltaY<0?F(O(b.deltaY)):b.deltaY>0&&k(O(b.deltaY)),i.update()}function ke(b){let W=!1;switch(b.code){case i.keys.UP:b.ctrlKey||b.metaKey||b.shiftKey?z(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(0,i.keyPanSpeed),W=!0;break;case i.keys.BOTTOM:b.ctrlKey||b.metaKey||b.shiftKey?z(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(0,-i.keyPanSpeed),W=!0;break;case i.keys.LEFT:b.ctrlKey||b.metaKey||b.shiftKey?G(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(i.keyPanSpeed,0),W=!0;break;case i.keys.RIGHT:b.ctrlKey||b.metaKey||b.shiftKey?G(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(-i.keyPanSpeed,0),W=!0;break}W&&(b.preventDefault(),i.update())}function je(b){if(w.length===1)h.set(b.pageX,b.pageY);else{const W=qe(b),X=.5*(b.pageX+W.x),Z=.5*(b.pageY+W.y);h.set(X,Z)}}function Fe(b){if(w.length===1)v.set(b.pageX,b.pageY);else{const W=qe(b),X=.5*(b.pageX+W.x),Z=.5*(b.pageY+W.y);v.set(X,Z)}}function Qe(b){const W=qe(b),X=b.pageX-W.x,Z=b.pageY-W.y,le=Math.sqrt(X*X+Z*Z);g.set(0,le)}function P(b){i.enableZoom&&Qe(b),i.enablePan&&Fe(b)}function ue(b){i.enableZoom&&Qe(b),i.enableRotate&&je(b)}function oe(b){if(w.length==1)f.set(b.pageX,b.pageY);else{const X=qe(b),Z=.5*(b.pageX+X.x),le=.5*(b.pageY+X.y);f.set(Z,le)}p.subVectors(f,h).multiplyScalar(i.rotateSpeed);const W=i.domElement;G(2*Math.PI*p.x/W.clientHeight),z(2*Math.PI*p.y/W.clientHeight),h.copy(f)}function _e(b){if(w.length===1)_.set(b.pageX,b.pageY);else{const W=qe(b),X=.5*(b.pageX+W.x),Z=.5*(b.pageY+W.y);_.set(X,Z)}m.subVectors(_,v).multiplyScalar(i.panSpeed),N(m.x,m.y),v.copy(_)}function ee(b){const W=qe(b),X=b.pageX-W.x,Z=b.pageY-W.y,le=Math.sqrt(X*X+Z*Z);S.set(0,le),y.set(0,Math.pow(S.y/g.y,i.zoomSpeed)),k(y.y),g.copy(S);const Le=(b.pageX+W.x)*.5,Ge=(b.pageY+W.y)*.5;ne(Le,Ge)}function Ie(b){i.enableZoom&&ee(b),i.enablePan&&_e(b)}function ve(b){i.enableZoom&&ee(b),i.enableRotate&&oe(b)}function Ee(b){i.enabled!==!1&&(w.length===0&&(i.domElement.setPointerCapture(b.pointerId),i.domElement.addEventListener("pointermove",D),i.domElement.addEventListener("pointerup",T)),!we(b)&&(Je(b),b.pointerType==="touch"?$e(b):q(b)))}function D(b){i.enabled!==!1&&(b.pointerType==="touch"?ce(b):se(b))}function T(b){switch(ze(b),w.length){case 0:i.domElement.releasePointerCapture(b.pointerId),i.domElement.removeEventListener("pointermove",D),i.domElement.removeEventListener("pointerup",T),i.dispatchEvent(Zf),a=r.NONE;break;case 1:const W=w[0],X=I[W];$e({pointerId:W,pageX:X.x,pageY:X.y});break}}function q(b){let W;switch(b.button){case 0:W=i.mouseButtons.LEFT;break;case 1:W=i.mouseButtons.MIDDLE;break;case 2:W=i.mouseButtons.RIGHT;break;default:W=-1}switch(W){case zr.DOLLY:if(i.enableZoom===!1)return;Oe(b),a=r.DOLLY;break;case zr.ROTATE:if(b.ctrlKey||b.metaKey||b.shiftKey){if(i.enablePan===!1)return;Ne(b),a=r.PAN}else{if(i.enableRotate===!1)return;de(b),a=r.ROTATE}break;case zr.PAN:if(b.ctrlKey||b.metaKey||b.shiftKey){if(i.enableRotate===!1)return;de(b),a=r.ROTATE}else{if(i.enablePan===!1)return;Ne(b),a=r.PAN}break;default:a=r.NONE}a!==r.NONE&&i.dispatchEvent(dc)}function se(b){switch(a){case r.ROTATE:if(i.enableRotate===!1)return;J(b);break;case r.DOLLY:if(i.enableZoom===!1)return;ae(b);break;case r.PAN:if(i.enablePan===!1)return;Te(b);break}}function re(b){i.enabled===!1||i.enableZoom===!1||a!==r.NONE||(b.preventDefault(),i.dispatchEvent(dc),ge(ie(b)),i.dispatchEvent(Zf))}function ie(b){const W=b.deltaMode,X={clientX:b.clientX,clientY:b.clientY,deltaY:b.deltaY};switch(W){case 1:X.deltaY*=16;break;case 2:X.deltaY*=100;break}return b.ctrlKey&&!M&&(X.deltaY*=10),X}function Pe(b){b.key==="Control"&&(M=!0,i.domElement.getRootNode().addEventListener("keyup",me,{passive:!0,capture:!0}))}function me(b){b.key==="Control"&&(M=!1,i.domElement.getRootNode().removeEventListener("keyup",me,{passive:!0,capture:!0}))}function Se(b){i.enabled===!1||i.enablePan===!1||ke(b)}function $e(b){switch(Ve(b),w.length){case 1:switch(i.touches.ONE){case Hr.ROTATE:if(i.enableRotate===!1)return;je(b),a=r.TOUCH_ROTATE;break;case Hr.PAN:if(i.enablePan===!1)return;Fe(b),a=r.TOUCH_PAN;break;default:a=r.NONE}break;case 2:switch(i.touches.TWO){case Hr.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;P(b),a=r.TOUCH_DOLLY_PAN;break;case Hr.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;ue(b),a=r.TOUCH_DOLLY_ROTATE;break;default:a=r.NONE}break;default:a=r.NONE}a!==r.NONE&&i.dispatchEvent(dc)}function ce(b){switch(Ve(b),a){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;oe(b),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;_e(b),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Ie(b),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;ve(b),i.update();break;default:a=r.NONE}}function be(b){i.enabled!==!1&&b.preventDefault()}function Je(b){w.push(b.pointerId)}function ze(b){delete I[b.pointerId];for(let W=0;W<w.length;W++)if(w[W]==b.pointerId){w.splice(W,1);return}}function we(b){for(let W=0;W<w.length;W++)if(w[W]==b.pointerId)return!0;return!1}function Ve(b){let W=I[b.pointerId];W===void 0&&(W=new he,I[b.pointerId]=W),W.set(b.pageX,b.pageY)}function qe(b){const W=b.pointerId===w[0]?w[1]:w[0];return I[W]}i.domElement.addEventListener("contextmenu",be),i.domElement.addEventListener("pointerdown",Ee),i.domElement.addEventListener("pointercancel",T),i.domElement.addEventListener("wheel",re,{passive:!1}),i.domElement.getRootNode().addEventListener("keydown",Pe,{passive:!0,capture:!0}),this.update()}}const Ju=document.querySelector("canvas.webgl"),Re=new Zb;new NS;var _n={},jn={};const iE=new JM;iE.load("/fonts/SuperCornRegular.json",s=>{const t=new Yf("Victory!",{font:s,size:.5,depth:.2,curveSegments:12,bevelEnabled:!0,bevelThickness:.03,bevelSize:.02,bevelOffset:0,bevelSegments:5});t.center();const n=new ot,i=new Ze(t,n);i.position.set(1,1,1),i.material.transparent=!0,i.material.opacity=.7,_n=i;const r=new Yf("Game Over",{font:s,size:.5,depth:.2,curveSegments:12,bevelEnabled:!0,bevelThickness:.03,bevelSize:.02,bevelOffset:0,bevelSegments:5});r.center();const a=new ot,o=new Ze(r,a);o.position.set(1,1,1),o.material.transparent=!0,o.material.opacity=.7,jn=o});const Zn={width:0,height:0};function am(){Zn.width=window.innerWidth*.95,Zn.height=window.innerHeight*.9}am();function Qf(){return Zn.width/Zn.height}const bs=new Mn(75,Zn.width/Zn.height,.1,100),rE=new sm(bs,Ju);rE.enableDamping=!0;const _o=3,on=new qh(-_o*Qf(),_o*Qf(),_o,-_o,1,1e3),Aa=new sm(on,Ju);Aa.enableDamping=!0;const xa=new Kb({canvas:Ju});xa.setSize(Zn.width,Zn.height);xa.setPixelRatio(Math.min(window.devicePixelRatio,2));const sE=new US,Ca=new Ze(new ut(.25,1,.25),new ot);Ca.name="idle1";Ca.position.x=-2;const Ra=new Ze(new ut(.25,1,.25),new ot);Ra.name="idle2";Ra.position.x=2;const Qu=new Ze(new bi(.2,16,16),new fl);Qu.name="idle3";Ca.material.color=new Be("red");Ra.material.color=new Be("blue");function om(){Re.add(Ca,Ra,Qu)}om();function lm(){Re.remove(Ca,Ra,Qu)}function aE(){lm()}const eh=5,oE=on,lE=Aa,cE=()=>{const s=sE.getElapsedTime();bs.position.x=eh*Math.cos(s),bs.position.z=eh*Math.sin(s),bs.lookAt(Re.position)};function uE(){}const cm=Object.freeze(Object.defineProperty({__proto__:null,addIdleObjs:om,camera:oE,cleanUp:aE,controls:lE,rmvIdleObjs:lm,startIdle:uE,tick:cE},Symbol.toStringTag,{value:"Module"})),Nr=new Ze(new ut(4,.01,4),new ot);Nr.name="plate";Nr.material.color=new Be("grey");Nr.material.transparent=!0;Nr.material.opacity=.25;Nr.position.set(0,.005,0);const Qi=new Ze(new ut(.7,.2,.2),new ot);Qi.name="left";Qi.material.color=new Be("yellow");Qi.position.set(0,.1,2.1);const er=new Ze(new ut(.7,.2,.2),new ot);er.name="right";er.material.color=new Be("purple");er.position.set(0,.1,-2.1);const Pa=new Ze(new ut(.2,.125,4),new ot);Pa.name="top";Pa.material.color=new Be("darkblue");Pa.position.set(-2.1,.0625,0);const La=new Ze(new ut(.2,.125,4),new ot);La.name="bot";La.material.color=new Be("darkblue");La.position.set(2.1,.0625,0);const yi=new Ze(new bi(.1,16,16),new fl);yi.name="ball";yi.position.set(0,5,0);const ds=new Ze(new bi(.1,16,16),new ot);ds.name="score_original";ds.position.set(20,0,0);const dE=on,fE=Aa,hE=()=>{Qi.position.x=Ii*gu/Xn,er.position.x=Bn*gu/Xn,yi.position.z=Yt*nl/Qt,yi.position.x=pi*nl/Qt};let th=0;const nl=2,gu=1.65,Qt=1e6,um=12500,il=(nl-gu)*Qt/nl+um,Pi=Qt-um,Xn=Qt-il,dm=12e3;let Ii=0,Bn=0,gl=!1,_l=!1,Yn=!1;const rl=2;let Oi=0,Ni=0,Yt=0,pi=0,zt=0,ba=!1;function fm(){zt=Math.random()<.5?Math.random()*90+225:Math.random()*90+45,zt=Math.random()*90+225,zt*=Math.PI/180}function pE(s,t){let n=0;s?n=-1:t?n=1:n=0,Ii+=n*dm,Ii>Xn?Ii=Xn:Ii<-Xn&&(Ii=-Xn)}fm();const hm=8e3;let Ss=hm,_u=0,xr=!1,pm=0,mE=0;function gE(){if(!Yn){ba==!0&&mE++>360&&(vm(),ad(),ba=!1);return}pE(gl,_l),wE(),Yt-=Ss*Math.sin(zt),pi-=Ss*Math.cos(zt),!xr&&(Yt>Pi||Yt<-Pi)&&_E()&&(Yt>0?(zt=Math.PI-zt-Math.PI,Yt=Pi-(Yt-Pi)):(zt=2*Math.PI-zt,Yt=-Pi-(Yt+Pi)),zt-=_u/il*Math.PI/4,Ss+=1e3),(!xr&&pi>Pi||!xr&&pi<-Pi)&&(zt=Math.PI-zt),xr&&pm++>180&&mm()}function _E(){return Yt>0&&Math.abs(_u=Ii-pi)<il||Yt<0&&Math.abs(_u=Bn-pi)<il?!0:(Yt>0?nh("right"):nh("left"),xr=!0,!1)}setInterval(gE,1e3/120);function mm(){Yn=!1,!(Ni>rl||Oi>rl)&&(fm(),Yt=0,pi=0,Yn=!1,xr=!1,pm=0,Ss=hm,yi.position.y=5,Vn.to(yi.position,{y:.1,duration:1,onComplete:()=>{Yn=!0}}))}function nh(s){if(s==="left"){if(Oi===rl){console.log("victory"),ba=!0,vE(Oi,Ni);return}const t=ds.clone();t.name="score",t.material=ds.material.clone(),t.material.color=Qi.material.color.clone(),t.position.set(-1.8+.25*Oi,0,2.25),Re.add(t),Oi++}else if(s==="right"){if(Ni===rl){console.log("loss"),ba=!0,yE(Oi,Ni);return}const t=ds.clone();t.name="score",t.material=ds.material.clone(),t.material.color=er.material.color.clone(),t.position.set(1.8-.25*Ni,0,-2.25),Re.add(t),Ni++}}function vE(s,t){_n.material.color=Qi.material.color.clone(),_n.lookAt(on.position),Re.add(_n),s++,Yn=!1,yl(s,t,!1)}function yE(s,t){jn.material.color=er.material.color.clone(),jn.lookAt(on.position),Re.add(jn),t++,Yn=!1,yl(s,t,!1)}function xE(){for(Oi=Ni=0,Re.remove(_n),Re.remove(jn);Re.getObjectByName("score");)Re.remove(Re.getObjectByName("score"))}function gm(s){var t=s.which;t===65?gl=!0:t===68?_l=!0:t===80&&(Yn=!Yn)}function _m(s){var t=s.which;t===65?gl=!1:t===68&&(_l=!1)}function bE(){ba=!1,xr=0,Ii=0,Bn=0,gl=0,_l=0,Oi=0,Ni=0,Yt=0,pi=0}function SE(){bE();const s=document.getElementById("begin-solo-match");s.addEventListener("click",t=>{t.preventDefault(),s.remove(),ME()}),Re.add(Nr,Qi,er,Pa,La)}function ME(){if(Yn){mm();return}Vn.to(yi.position,{y:.1,duration:.7,onComplete:()=>{Yn=!0}}),Re.add(yi),document.addEventListener("keydown",gm,!0),document.addEventListener("keyup",_m,!0)}function vm(){xE(),document.removeEventListener("keydown",gm,!0),document.removeEventListener("keyup",_m,!0),Re.remove(Nr,Qi,er,Pa,La,yi)}let fc;function EE(s){for(;s<0;)s+=Math.PI*2;for(;s>Math.PI*2;)s-=Math.PI*2;return s}function TE(){let s=pi,t=-Math.cos(zt)*Ss,n=-Math.sin(zt)*Ss,i=Qt+Yt;if(i>Qt*2||i<0)return 0;for(;i>0;){s+=t,(s<-Qt||s>Qt)&&(t*=-1),s<-Qt?s=-Qt:s>Qt&&(s=Qt);let r=EE(zt);if(r>0&&r<Math.PI)i+=n;else if(r>Math.PI&&r<Math.PI*2)i-=n;else return 0;if(i>Qt*2)return 0}return s}function wE(){let s;Date.now()-th>1e3&&(s=TE(),fc=s,th=Date.now());let t=0;Bn>fc?t=-1:Bn<fc?t=1:t=0,Bn+=t*dm,Bn>Xn?Bn=Xn:Bn<-Xn&&(Bn=-Xn)}const AE=Object.freeze(Object.defineProperty({__proto__:null,camera:dE,cleanUp:vm,controls:fE,startQuickGame:SE,tick:hE},Symbol.toStringTag,{value:"Module"})),Ur=new Ze(new ut(4,.01,4),new ot);Ur.name="plate";Ur.material.color=new Be("grey");Ur.material.transparent=!0;Ur.material.opacity=.25;Ur.position.set(0,.005,0);const tr=new Ze(new ut(.7,.2,.2),new ot);tr.name="left";tr.material.color=new Be("yellow");tr.position.set(0,.1,2.1);const nr=new Ze(new ut(.7,.2,.2),new ot);nr.name="right";nr.material.color=new Be("purple");nr.position.set(0,.1,-2.1);const Da=new Ze(new ut(.2,.125,4),new ot);Da.name="top";Da.material.color=new Be("darkblue");Da.position.set(-2.1,.0625,0);const Ia=new Ze(new ut(.2,.125,4),new ot);Ia.name="bot";Ia.material.color=new Be("darkblue");Ia.position.set(2.1,.0625,0);const Ki=new Ze(new bi(.1,16,16),new fl);Ki.name="ball";Ki.position.set(0,5,0);const fs=new Ze(new bi(.1,16,16),new ot);let ym=Vn.to(Ki.position,{y:.1,duration:.7,paused:!0,onComplete:()=>{Q.game_running=!0}});fs.name="score_original";fs.position.set(20,0,0);const CE=on,RE=Aa,PE=()=>{tr.position.x=Q.left_pos*Xe.paddle_vmax/Xe.paddle_max,nr.position.x=Q.right_pos*Xe.paddle_vmax/Xe.paddle_max,Ki.position.z=Q.ballX*Xe.area_vmax/Xe.pos_max,Ki.position.x=Q.ballY*Xe.area_vmax/Xe.pos_max},Xe={area_vmax:2,paddle_vmax:1.65,pos_max:1e6,ball_radius:12500,paddle_halfwidth:0,ball_max:0,paddle_max:0,player_speed:12e3,ball_speed:8e3};Xe.paddle_halfwidth=(Xe.area_vmax-Xe.paddle_vmax)*Xe.pos_max/Xe.area_vmax+Xe.ball_radius*1.5;Xe.ball_max=Xe.pos_max-Xe.ball_radius;Xe.paddle_max=Xe.pos_max-Xe.paddle_halfwidth;Object.freeze(Xe);const Q={matchIsTourney:!1,left_pos:0,leftName:"",right_pos:0,rightName:"",up_pressed:!1,down_pressed:!1,up2_pressed:!1,down2_pressed:!1,game_started:!1,game_running:!1,score_to_win:1,score_left:0,score_right:0,ballX:0,ballY:0,ball_direction:0,ball_speed:Xe.ball_speed,bounce_distance:0,ball_passed:!1,ball_passed_timer:0,gameover_timer:0};function xm(){Q.ball_direction=Math.random()<.5?Math.random()*90+225:Math.random()*90+45,Q.ball_direction=Math.random()*90+225,Q.ball_direction*=Math.PI/180}xm();function LE(){if(!Q.game_running&&Q.game_started&&(Q.score_left>Q.score_to_win||Q.score_right>Q.score_to_win)){Q.gameover_timer++>360&&ad();return}Q.up_pressed&&(Q.left_pos-=Xe.player_speed),Q.down_pressed&&(Q.left_pos+=Xe.player_speed),Q.left_pos>Xe.paddle_max?Q.left_pos=Xe.paddle_max:Q.left_pos<-Xe.paddle_max&&(Q.left_pos=-Xe.paddle_max),Q.up2_pressed&&(Q.right_pos-=Xe.player_speed),Q.down2_pressed&&(Q.right_pos+=Xe.player_speed),Q.right_pos>Xe.paddle_max?Q.right_pos=Xe.paddle_max:Q.right_pos<-Xe.paddle_max&&(Q.right_pos=-Xe.paddle_max),!(!Q.game_started||!Q.game_running)&&(Q.ballX-=Q.ball_speed*Math.sin(Q.ball_direction),Q.ballY-=Q.ball_speed*Math.cos(Q.ball_direction),!Q.ball_passed&&(Q.ballX>Xe.ball_max||Q.ballX<-Xe.ball_max)&&DE()&&(Q.ballX>0?(Q.ball_direction=Math.PI-Q.ball_direction-Math.PI,Q.ballX=Xe.ball_max-(Q.ballX-Xe.ball_max)):(Q.ball_direction=2*Math.PI-Q.ball_direction,Q.ballX=-Xe.ball_max-(Q.ballX+Xe.ball_max)),Q.ball_direction-=Q.bounce_distance/Xe.paddle_halfwidth*Math.PI/4,Q.ball_speed+=1e3),(!Q.ball_passed&&Q.ballY>Xe.ball_max||!Q.ball_passed&&Q.ballY<-Xe.ball_max)&&(Q.ball_direction=Math.PI-Q.ball_direction),Q.ball_passed&&Q.ball_passed_timer++>200&&IE())}function DE(){return Q.ballX>0&&Math.abs(Q.bounce_distance=Q.left_pos-Q.ballY)<Xe.paddle_halfwidth||Q.ballX<0&&Math.abs(Q.bounce_distance=Q.right_pos-Q.ballY)<Xe.paddle_halfwidth?!0:(Q.ballX>0?ih("right"):ih("left"),Q.ball_passed=!0,!1)}setInterval(LE,1e3/120);function IE(){Q.game_running=!1,!(Q.score_right>Q.score_to_win||Q.score_left>Q.score_to_win)&&(xm(),bm(),ym.restart())}function bm(){Q.ball_passed=Q.game_running=!1,Q.ballX=Q.ballY=Q.ball_passed_timer=0,Q.ball_speed=Xe.ball_speed,Ki.position.y=5}function ih(s){if(s==="left"){if(Q.score_left===Q.score_to_win)if(Q.matchIsTourney==!1){console.log("victory"),OE();return}else{Q.score_left++,rh();return}const t=fs.clone();t.name="score",t.material=fs.material.clone(),t.material.color=tr.material.color.clone(),t.position.set(-1.8+.25*Q.score_left,0,2.25),Re.add(t),Q.score_left++}else if(s==="right"){if(Q.score_right===Q.score_to_win)if(Q.matchIsTourney==!1){console.log("loss"),NE();return}else{Q.score_right++,rh();return}const t=fs.clone();t.name="score",t.material=fs.material.clone(),t.material.color=nr.material.color.clone(),t.position.set(1.8-.25*Q.score_right,0,-2.25),Re.add(t),Q.score_right++}}function OE(){_n.material.color=tr.material.color.clone(),_n.lookAt(on.position),Re.add(_n),Q.score_left++,console.log("won, name :",Q.rightName),yl(Q.score_left,Q.score_right,!0,Q.rightName)}function NE(){jn.material.color=nr.material.color.clone(),jn.lookAt(on.position),Re.add(jn),Q.score_right++,console.log("lost, name :",Q.rightName),yl(Q.score_left,Q.score_right,!0,Q.rightName)}function rh(){JE(Q.score_left,Q.score_right,!0,Q.leftName,Q.rightName)}function UE(){for(Q.score_left=Q.score_right=0,Re.remove(_n),Re.remove(jn);Re.getObjectByName("score");)Re.remove(Re.getObjectByName("score"))}function FE(s,t,n){if(Re.add(Ur,tr,nr,Da,Ia),Re.add(Ki),document.addEventListener("keydown",Sm,!0),document.addEventListener("keyup",Mm,!0),s){const i=document.getElementById("begin-tourney-match");i.addEventListener("click",r=>{r.preventDefault,console.log("Tournament match between",t,"and",n,"started"),sh(1,t,n),i.remove()})}else{const i=document.getElementById("opp-name"),r=document.getElementById("opp-name-submit"),a=document.getElementById("start-button"),o=document.getElementById("instruction-purple");a.hidden=!0;let l;r.addEventListener("click",c=>{c.preventDefault(),l=i.value,l!==""&&(i.remove(),r.remove(),a.hidden=!1,o.innerText=`${l} (purple) uses Arrowkeys left and right`),console.log(l)}),a.addEventListener("click",c=>{c.preventDefault(),a.remove(),i.remove(),r.remove(),sh(0,"",l)})}}function BE(){UE(),bm(),Q.game_started=!1,document.removeEventListener("keydown",Sm,!0),document.removeEventListener("keyup",Mm,!0),Re.remove(Ur,tr,nr,Da,Ia,Ki)}function Sm(s){var t=s.which;t===65?Q.up_pressed=!0:t===68?Q.down_pressed=!0:t===37?Q.up2_pressed=!0:t===39?Q.down2_pressed=!0:t===80&&(Q.game_running=!Q.game_running)}function Mm(s){var t=s.which;t===65?Q.up_pressed=!1:t===68?Q.down_pressed=!1:t===37?Q.up2_pressed=!1:t===39&&(Q.down2_pressed=!1)}function sh(s,t,n){Q.game_started=!0,s&&(Q.matchIsTourney=!0,Q.leftName=t),Q.rightName=n,console.log(Q),ym.restart()}const Em=Object.freeze(Object.defineProperty({__proto__:null,camera:CE,cleanUp:BE,controls:RE,startGame:FE,tick:PE},Symbol.toStringTag,{value:"Module"})),Us=new Ze(new ut(4,.01,4),new ot);Us.name="plate";Us.material.color=new Be("grey");Us.material.transparent=!0;Us.material.opacity=.25;Us.position.set(0,.005,0);const Oa=new Ze(new ut(.7,.2,.2),new ot);Oa.name="left";Oa.material.color=new Be("yellow");Oa.position.set(0,.1,2.1);const Na=new Ze(new ut(.7,.2,.2),new ot);Na.name="right";Na.material.color=new Be("purple");Na.position.set(0,.1,-2.1);const Ua=new Ze(new ut(.2,.2,.7),new ot);Ua.name="top";Ua.material.color=new Be("blue");Ua.position.set(-2.1,.1,0);const Fa=new Ze(new ut(.2,.2,.7),new ot);Fa.name="bot";Fa.material.color=new Be("red");Fa.position.set(2.1,.1,0);const ed=new Ze(new bi(.1,16,16),new fl);ed.name="ball";ed.position.set(0,5,0);const Tm=new Ze(new bi(.1,16,16),new ot);Tm.name="score";const ir=new Ze(new ut(.2,.125,.2),new ot);ir.name="corner";ir.material.color=new Be("darkblue");ir.position.set(-2.1,.0625,-2.1);const td=ir.clone();td.position.set(2.1,.0625,2.1);const nd=ir.clone();nd.position.set(-2.1,.0625,2.1);const id=ir.clone();id.position.set(2.1,.0625,-2.1);const rd=new Ze(new ut(4,.125,.2),new ot);rd.name="wall";rd.material.color=new Be("darkblue");const sd=new Ze(new ut(.2,.125,4),new ot);sd.name="wall";sd.material.color=new Be("darkblue");const vu=2,wm=1.65,vl=1e6,Am=12500,hs=(vu-wm)*vl/vu+Am*1.5,bn=vl-Am,js=vl-hs,ah=12e3,yu=8e3,vo=1e3,Gt=3,sl=[],yo=wm/js,oh=vu/vl,V={nameRight:"",nameTop:"",nameBottom:"",left_pos:0,right_pos:0,top_pos:0,bot_pos:0,l_left_pressed:!1,l_right_pressed:!1,r_left_pressed:!1,r_right_pressed:!1,t_left_pressed:!1,t_right_pressed:!1,b_left_pressed:!1,b_right_pressed:!1,game_started:!1,game_running:!1,score_to_win:Gt,player_status:[{lives:Gt,obj:Oa},{lives:Gt,obj:Na},{lives:Gt,obj:Ua},{lives:Gt,obj:Fa}],lives_left:Gt,lives_right:Gt,lives_top:Gt,lives_bot:Gt,players_remaining:4,score_left:0,score_right:0,ballX:0,ballY:0,ball_direction:0,ball_speed:yu,bounce_distance:0,ball_passed:!1,ball_passed_timer:0,gameover_timer:0,reset:function(){this.left_pos=this.right_pos=this.top_pos=this.bot_pos=0,this.lives_left=this.lives_bot=this.lives_right=this.lives_top=Gt,this.ballX=this.ballY=this.ball_direction=this.bounce_distance=this.ball_passed_timer=0,this.gameover_timer=0,this.l_left_pressed=this.l_right_pressed=this.r_left_pressed=this.r_right_pressed=!1,this.b_left_pressed=this.b_right_pressed=this.t_left_pressed=this.top_pos_right_pressed=!1,this.game_running=this.game_started=this.ball_passed=!1,this.score_to_win=Gt,this.ball_speed=yu,this.players_remaining=4,this.player_status.forEach(s=>{s.lives=Gt})}},Cm=Us,Gi=Oa,Wi=Na,fi=Ua,Xi=Fa,Os=ed,lh=Tm;let Rm=Vn.to(Os.position,{y:.1,duration:.3,paused:!0,onComplete:()=>{V.game_running=!0}});const kE=on,zE=Aa,HE=()=>{Gi.position.x=V.left_pos*yo,Wi.position.x=V.right_pos*yo,fi.position.z=V.top_pos*yo,Xi.position.z=V.bot_pos*yo,Os.position.z=V.ballX*oh,Os.position.x=V.ballY*oh};function Pm(){if(V.players_remaining===4)V.ball_direction=Math.random()*360;else{const s=[];V.lives_right!==0&&s.push(45),V.lives_bot!==0&&s.push(135),V.lives_left!==0&&s.push(225),V.lives_top!==0&&s.push(315),V.ball_direction=s[Math.floor(Math.random()*V.players_remaining)]+Math.random()*90,V.ball_direction>=360&&(V.ball_direction-=360)}V.ball_direction*=Math.PI/180}function VE(){if(!V.game_running&&V.game_started&&V.players_remaining===1){V.gameover_timer++>360&&(clearInterval(xu),V.reset(),ad());return}V.left_pos=xo(V.left_pos,V.l_left_pressed,V.l_right_pressed),V.right_pos=xo(V.right_pos,V.r_left_pressed,V.r_right_pressed),V.top_pos=xo(V.top_pos,V.t_left_pressed,V.t_right_pressed),V.bot_pos=xo(V.bot_pos,V.b_left_pressed,V.b_right_pressed),!(!V.game_started||!V.game_running)&&(V.ballX-=V.ball_speed*Math.sin(V.ball_direction),V.ballY-=V.ball_speed*Math.cos(V.ball_direction),!V.ball_passed&&V.ballX>bn&&(V.lives_left===0||bo("left",V.ballY,V.left_pos))?(V.ball_direction=Math.PI-V.ball_direction-Math.PI,V.ballX=bn-(V.ballX-bn),V.lives_left!==0&&(V.ball_direction-=V.bounce_distance/hs*Math.PI/4,V.ball_speed+=vo/2)):!V.ball_passed&&V.ballX<-bn&&(V.lives_right===0||bo("right",V.ballY,V.right_pos))&&(V.ball_direction=2*Math.PI-V.ball_direction,V.ballX=-bn-(V.ballX+bn),V.lives_right!==0&&(V.ball_direction-=V.bounce_distance/hs*Math.PI/4,V.ball_speed+=vo/2)),!V.ball_passed&&V.ballY>bn&&(V.lives_bot===0||bo("bot",V.ballX,V.bot_pos))?(V.ball_direction=Math.PI-V.ball_direction,V.ballY=bn-(V.ballY-bn),V.lives_bot!==0&&(V.ball_direction+=V.bounce_distance/hs*Math.PI/4,V.ball_speed+=vo/2)):!V.ball_passed&&V.ballY<-bn&&(V.lives_top===0||bo("top",V.ballX,V.top_pos))&&(V.ball_direction=Math.PI-V.ball_direction,V.ballY=-bn-(V.ballY+bn),V.lives_top!==0&&(V.ball_direction-=V.bounce_distance/hs*Math.PI/4,V.ball_speed+=vo/2)),V.ball_passed&&V.ball_passed_timer++>200&&GE())}let xu;function xo(s,t,n){return t&&n||(t?(s-=ah,s<-js&&(s=-js)):n&&(s+=ah,s>js&&(s=js))),s}function bo(s,t,n){return Math.abs(V.bounce_distance=n-t)<hs?!0:(XE(s),V.ball_passed=!0,!1)}function GE(){V.game_running=!1,V.players_remaining!==1&&(Pm(),Lm(),Rm.restart())}function Lm(){V.ball_passed=V.game_running=!1,V.ballX=V.ballY=V.ball_passed_timer=0,V.ball_speed=yu,Os.position.y=5}function So(s,t,n,i){const r=lh.clone();r.name=s+"_score1",r.material=lh.material.clone(),r.material.color=t;const a=r.clone();a.name=s+"_score2",r.position.set(n.x,n.y,n.z),a.position.set(i.x,i.y,i.z),sl.push(r,a),Re.add(r,a)}function WE(){So("l",Gi.material.color.clone(),{x:-1.7,y:0,z:2.3},{x:-1.7+.3,y:0,z:2.3}),So("r",Wi.material.color.clone(),{x:1.7,y:0,z:-2.3},{x:1.7-.3,y:0,z:-2.3}),So("t",fi.material.color.clone(),{x:-2.3,y:0,z:-1.7},{x:-2.3,y:0,z:-1.7+.3}),So("b",Xi.material.color.clone(),{x:2.3,y:0,z:1.7},{x:2.3,y:0,z:1.7-.3}),console.log(sl)}function XE(s){switch(s){case"left":(V.lives_left=--V.player_status.filter(t=>t.obj===Gi)[0].lives)===0?Mo("left"):Re.remove(Re.getObjectByName("l_score"+String.fromCharCode(48+Gt-V.lives_left)));break;case"right":(V.lives_right=--V.player_status.filter(t=>t.obj===Wi)[0].lives)===0?Mo("right"):Re.remove(Re.getObjectByName("r_score"+String.fromCharCode(48+Gt-V.lives_right)));break;case"top":(V.lives_top=--V.player_status.filter(t=>t.obj===fi)[0].lives)===0?Mo("top"):Re.remove(Re.getObjectByName("t_score"+String.fromCharCode(48+Gt-V.lives_top)));break;case"bot":(V.lives_bot=--V.player_status.filter(t=>t.obj===Xi)[0].lives)===0?Mo("bot"):Re.remove(Re.getObjectByName("b_score"+String.fromCharCode(48+Gt-V.lives_bot)));break}}function Mo(s){if(console.log("removePlayer:",s),--V.players_remaining===1){let t;V.lives_right?t=V.nameRight:V.lives_bot?t=V.nameBottom:V.lives_left?t=sessionStorage.getItem("username"):V.lives_top&&(t=V.nameTop),$E(t)}else{const t=s==="left"||s==="right"?rd:sd,n=t.clone();n.material=t.material,n.material.color=t.material.color,console.log(s,"lost last life"),s==="left"?(n.position.set(0,5,2.1),Vn.to(Gi.position,{z:5,duration:.5,onComplete:()=>{Re.remove(Gi),Gi.position.z=2.1}})):s==="right"?(n.position.set(0,5,-2.1),Vn.to(Wi.position,{z:-5,duration:.5,onComplete:()=>{Re.remove(Wi),Wi.position.z=-2.1}})):s==="top"?(n.position.set(-2.1,5,0),Re.remove(fi),Vn.to(fi.position,{x:-5,duration:.5,onComplete:()=>{Re.remove(fi),fi.position.x=-2.1}})):s==="bot"&&(n.position.set(2.1,5,0),Vn.to(Xi.position,{x:5,duration:.5,onComplete:()=>{Re.remove(Xi),Xi.position.x=2.1}})),Vn.to(n.position,{y:.0625,duration:.5}),Re.add(n)}}function $E(s){_n.material.color=V.player_status.filter(n=>n.lives!==0)[0].obj.material.color.clone(),_n.lookAt(on.position),Re.add(_n);let t;t="Winner is "+s,pe(t,"warning"),xe("home")}function qE(){for(Re.remove(_n),Re.remove(jn);sl.length>0;)Re.remove(sl.pop());console.log("SCORE RESET")}function jE(){Re.add(Cm,Gi,Wi,fi,Xi),Re.add(ir,td,nd,id),Re.add(Os),document.addEventListener("keydown",Dm,!0),document.addEventListener("keyup",Im,!0);const s=document.getElementById("playerSelectForm"),t=document.getElementById("username1"),n=document.getElementById("username2"),i=document.getElementById("username3"),r=document.getElementById("instruction-blue-4"),a=document.getElementById("instruction-purple-4"),o=document.getElementById("instruction-red-4");r.hidden=!0,a.hidden=!0,o.hidden=!0,s.addEventListener("click",l=>{l.preventDefault(),V.nameTop=t.value,V.nameRight=n.value,V.nameBottom=i.value,V.nameTop!=""&&t.remove(),V.nameRight!=""&&n.remove(),V.nameBottom!=""&&i.remove(),V.nameTop!=""&&V.nameRight!=""&&V.nameBottom!=""&&(console.log("users are",V.nameTop,V.nameRight,V.nameBottom),clearInterval(xu),xu=setInterval(VE,1e3/120),KE(),s.remove(),r.innerText=`${V.nameTop} N - M`,r.hidden=!1,a.innerText=`${V.nameRight} - - +`,a.hidden=!1,o.innerText=`${V.nameBottom} <- - ->`,o.hidden=!1)})}function YE(){for(qE(),Lm(),V.game_started=!1,document.removeEventListener("keydown",Dm,!0),document.removeEventListener("keyup",Im,!0),Re.remove(Cm,Gi,Wi,fi,Xi,Os),Re.remove(ir,td,nd,id);Re.getObjectByName("wall");)Re.remove(Re.getObjectByName("wall"))}function Dm(s){var t=s.which;t===65?V.l_left_pressed=!0:t===90?V.l_right_pressed=!0:t===78?V.t_right_pressed=!0:t===77?V.t_left_pressed=!0:t===37?V.b_right_pressed=!0:t===39?V.b_left_pressed=!0:t===109?V.r_left_pressed=!0:t===107&&(V.r_right_pressed=!0)}function Im(s){var t=s.which;t===65?V.l_left_pressed=!1:t===90?V.l_right_pressed=!1:t===78?V.t_right_pressed=!1:t===77?V.t_left_pressed=!1:t===37?V.b_right_pressed=!1:t===39?V.b_left_pressed=!1:t===109?V.r_left_pressed=!1:t===107&&(V.r_right_pressed=!1)}function KE(){V.reset(),WE(),Pm(),V.game_started=!0,Rm.restart()}const ZE=Object.freeze(Object.defineProperty({__proto__:null,camera:kE,cleanUp:YE,controls:zE,startGame:jE,tick:HE},Symbol.toStringTag,{value:"Module"}));let Ut=cm;window.addEventListener("resize",()=>{am(),xa.setSize(Zn.width,Zn.height),xa.setPixelRatio(Math.min(window.devicePixelRatio,2))});bs.position.z=5;Re.add(bs);on.position.set(4,4,4);on.rotation.y=Math.PI/2;on.lookAt(Re.position);Re.add(on);const Om=()=>{Ut.tick(),Ut.controls.update(),xa.render(Re,Ut.camera),window.requestAnimationFrame(Om)};Om();async function Eo(s,t,n){if(s===0)return`
     <button class="btn btn-primary btn-lg mb-3" id="begin-solo-match" translate="begin"></button>
            <p class="w-100" style="color: white;" translate="instruction solo"></p>
            </div>`;if(s===1)return`
    <button type="button" id="start-button" class="btn btn-link" translate="start"></button>
    <p class="w-100" style="color: white; id="instruction-yellow"><span>${t}</span><span translate="instruction yellow"></span></p></p>
    <p class="w-100" style="color: white;" id="instruction-purple" translate="instruction purple"></p>
 
    <form id="name-red">
        <div class="form-group">
            <input type="text" id="opp-name" class="form-control" required>
        </div>
    <button type="submit" class="btn btn-success mt-3" id="opp-name-submit" translate="set name"></button>
    </form>
    `;if(s===2)try{const i=await fetch("http://localhost:8000/profile/",{method:"GET",credentials:"include"});if(!i.ok){console.error("Failed getting display name:",i.statusText),pe("Error occurred getting display name. Try again.","danger"),xe("home");return}return`
            <p style="color: white;"><span>${(await i.json()).display_name} </span><span translate="4p p1"></span></p>
            <p class="w-100" style="color: white;" id="instruction-blue-4" translate="instruction blue 4"></p>
            <p class="w-100" style="color: white;" id="instruction-purple-4" translate="instruction purple 4"></p>
            <p class="w-100" style="color: white;" id="instruction-red-4" translate="instruction red 4"></p>
            <form id="playerSelectForm">
            
            <label for="username1" style="color: white;" translate="4p p2"></label><br>
            <input type="text" id="username1" name="username1" list="players"><br>
            
            <label for="username2" style="color: white;" translate="4p p3"></label><br>
            <input type="text" id="username2" name="username2" list="players"><br>
            
            <label for="username3" style="color: white;" translate="4p p4"></label><br>
            <input type="text" id="username3" name="username3" list="players"><br>
            
            <datalist id="players" style="color: white;">
                <option value="Player1">
                <option value="Player2">
                <option value="Player3">
                <!-- Add more options as needed -->
            </datalist><br>
            
            <input type="submit" value="Start">
            </form>
            `}catch(i){console.log(i),xe("home");return}if(s==3)try{const i=await fetch(`http://localhost:8000/get_display_name/?username=${t}`,{method:"GET",credentials:"include"});if(!i.ok){console.error("Failed getting display name:",i.statusText),pe("Error occurred getting display name. Try again.","danger"),xe("home");return}const r=await i.json(),a=await fetch(`http://localhost:8000/get_display_name/?username=${n}`,{method:"GET",credentials:"include"});a.ok||(console.error("Failed getting display name:",i.statusText),pe("Error occurred getting display name. Try again.","danger"));const o=await a.json();return`
            <button class="btn btn-primary btn-lg mb-3" id="begin-tourney-match" translate="begin"></button>
            <p class="w-100" style="color: white;">
                <span>${r.display_name} </span>
                <span translate="instruction tournament p1"></span>
            </p>
            <p class="w-100" style="color: white;">
                <span>${o.display_name} </span>
                <span translate="instruction tournament p2"><span/>
            </p>
            </div>
            `}catch(i){console.log(i),xe("home")}return""}function To(s,t,n){s===0?QE():s===1?eT():s===2?nT():s===3&&tT(t,n),s=-1}function yl(s,t,n,i){try{console.log("result",s,t,n,"",i),s>t?pe("Player on the left wins","warning"):pe("Player on the right wins","warning"),xe("result",s,t,n,"",i)}catch(r){console.log("failed to sendResults:",r)}}function JE(s,t,n,i,r){try{xe("tourneyResult",s,t,n,i,r)}catch(a){console.log("failed to sendResults:",a)}}function ad(){Ut.cleanUp(),Ut=cm,Ut.addIdleObjs()}function QE(){Ut.cleanUp(),Ut=AE,Ut.startQuickGame()}function eT(){Ut.cleanUp(),Ut=Em,Ut.startGame(0)}function tT(s,t){Ut.cleanUp(),Ut=Em,Ut.startGame(1,s,t)}function nT(){console.log("Start 4"),Ut.cleanUp(),Ut=ZE,Ut.startGame()}async function iT(){try{const s=await fetch("http://localhost:8000/is_user_in_tournament/",{method:"GET",credentials:"include"});if(!s.ok){console.error("Failed:",s.statusText),pe("Error occurred. Try again.","danger");return}const t=await s.json(),n=t.tournament_id,i=await fetch(`http://localhost:8000/get_tournament_matches/?tournament_id=${t.tournament_id}`,{method:"GET",credentials:"include"});if(!i.ok){console.error("Failed loading tournament matches:",i.statusText),pe("Error occurred loading tournament matches. Try again.","danger");return}const r=await i.json();if(r.game_over===!0){console.log("tournament is over"),pe(r.message,"warning"),xe("home");return}console.log("testing: ",r);const o=`
			<div class="container mt-5">
				${r.matches.map(c=>`
			<div class="match-container mb-3">
				<!-- <p style="color: white"><strong>Round ${c.round_number}, Group ${c.group_number}</strong></p> -->
				<p style="color: white">${c.player_1} vs ${c.player_2}</p>
				${c.result==="Pending"?`<button type="button" class="btn btn-primary start-game-btn" data-round="${c.round_number}" data-group="${c.group_number}" translate="start game"></button>`:`<button type="button" class="btn btn-secondary" disabled>${c.result==="in_progress"?"In Progress":"Completed"}</button>`}			</div>
		`).join("")}
				<div class="float-right">
					<button type="button" id="cancel-tournament-btn" class="btn btn-danger w-100 mt-3" translate="cancel tournament"></button>
				</div>
			</div>
		`,l=document.getElementById("content");l?(l.innerHTML=o,Jt(),document.querySelectorAll(".start-game-btn").forEach(d=>{d.addEventListener("click",()=>{const h=d.getAttribute("data-round"),f=d.getAttribute("data-group");console.log(`Start game for round ${h}, group ${f}`),rT(t.tournament_id,h,f)})}),document.getElementById("cancel-tournament-btn").addEventListener("click",()=>{Nm(n)})):console.error("Content element not found")}catch(s){console.error("Error with tournament lobby",s),pe("Error occurred with tournament lobby. Try again.","danger"),xe("home")}}async function rT(s,t,n){console.log(`Starting game for tournament ${s}, round ${t}, group ${n}`);try{const i=await fetch(`http://localhost:8000/get_players/?tournament_id=${s}&group=${n}`,{method:"GET",credentials:"include"});if(!i.ok){console.error("Failed fetching match details:",i.statusText),pe("Error occurred fetching match details. Try again.","danger");return}const r=await i.json();console.log("player names: ",r);const a=`
		<div class="container-fluid d-flex flex-column align-items-center">
			<div class="d-flex justify-content-center mb-3" style="margin-top: 3%">
				<div class="card p-4" style="width: 20rem; margin-right: 5%;">
					<h3 class="card-title text-center mb-4 d-flex justify-content-center align-items-center">
						<span>${r.player1.display_name}</span>
						<span id="success-1" class="bi bi-check-circle ms-2" style="margin-left: 10px; color: green; display: none;"></span>						
						<span id="error-message-1" class="bi bi-x-circle ms-2" style="margin-left: 10px; color: red; display: none;"></span>

					</h3>
					<form id="auth1-form" method="POST">
						<div class="form-group mb-3">
							<label for="username" class="form-label" translate="username"></label>
							<input type="text" class="form-control" id="username" value="${r.player1.username}" readonly>
						</div>
						<div class="form-group mb-3">
							<label for="password" class="form-label" translate="password"></label>
							<input type="password" class="form-control" id="password" required>
						</div>
						<button type="submit" class="btn btn-primary w-100" translate="authenticate"></button>
					</form>
				</div>
	
				<div class="card p-4" style="width: 20rem;">
					<h3 class="card-title text-center mb-4 d-flex justify-content-center align-items-center">
						<span>${r.player2.display_name}</span>
						<span id="success-2" class="bi bi-check-circle ms-2" style="margin-left: 10px; color: green; display: none;"></span>
						<span id="error-message-2" class="bi bi-x-circle ms-2" style="margin-left: 10px; color: red; display: none;"></span>
					</h3>


					<form id="auth2-form" method="POST">
						<div id="error-message-2" class="text-danger mb-3" style="display: none;"></div>
						<div class="form-group mb-3">
							<label for="username" class="form-label" translate="username"></label>
							<input type="text" class="form-control" id="usernameRight" value="${r.player2.username}" readonly>
						</div>
						<div class="form-group mb-3">
							<label for="password2" class="form-label" translate="password"></label>
							<input type="password" class="form-control" id="password2" required>
						</div>
						<button type="submit" class="btn btn-primary w-100" translate="authenticate"></button>
					</form>
				</div>
			</div>
	
			<div class="d-flex justify-content-center mt-3">
				<button type="button" id="continue-btn" class="btn btn-warning btn-lg" translate="continue"></button>
z			</div>
		</div>
	</div>
	`,o=document.getElementById("content");if(o){o.innerHTML=a,Jt();const l=document.getElementById("auth1-form");if(!l){console.error("Auth1 form not found"),pe("Error occured. Try again","danger");return}const c=document.getElementById("auth2-form");if(!c){console.error("Auth1 form not found"),pe("Error occured. Try again","danger");return}let u=!1,d,h=!1,f;const p=document.getElementById("error-message-1"),v=document.getElementById("error-message-2"),_=document.getElementById("success-1"),m=document.getElementById("success-2");l.addEventListener("submit",async S=>{S.preventDefault();const y=document.getElementById("username").value,x=document.getElementById("password").value;try{const R=St("csrftoken"),A=await fetch("http://localhost:8000/check_game_password/",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json","X-CSRFToken":R},body:JSON.stringify({check_user:y,check_pass:x})});if(A.ok){const w=await A.json();console.log(w),u=!0,d=y,_.style.display="block",p.style.display="none"}else{const w=await A.json();console.error(w),p.style.display="block",u=!1,_.style.display="none"}}catch(R){console.error(R)}}),c.addEventListener("submit",async S=>{S.preventDefault();const y=document.getElementById("usernameRight").value,x=document.getElementById("password2").value;try{const R=St("csrftoken"),A=await fetch("http://localhost:8000/check_game_password/",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json","X-CSRFToken":R},body:JSON.stringify({check_user:y,check_pass:x})});if(A.ok){const w=await A.json();console.log(w),h=!0,f=y,m.style.display="block",v.style.display="none"}else{const w=await A.json();console.error(w),v.style.display="block",h=!1,m.style.display="none"}}catch(R){console.error(R)}});const g=document.getElementById("continue-btn");g&&g.addEventListener("click",()=>{u===!0&&h===!0&&(console.log("Users are",d,"and",f),xe("tourney",0,0,0,d,f,!1))})}else console.error("Content element not found")}catch(i){console.error(i)}}async function Fo(s){let t=-1;const n=St("csrftoken");try{const a=await fetch("http://localhost:8000/create_tournament/",{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":n},credentials:"include",body:JSON.stringify({player_count:s})});if(a.ok){const o=await a.json();console.log("Sending tournament data successful",o),t=o.tournament_id,s=o.player_count}else{const o=await a.json();console.error("Tournament setup failed",o),pe("Error during tournament setup . Try again.","danger"),xe("home")}}catch(a){console.error("Error during tournament setup",a),pe("Error during tournament setup. Try again.","danger"),xe("home")}let i=`
		<div class="card-body d-flex flex-column align-items-center">
			<div class="card p-4" style="width: 20rem;">
				<div class="float-right">
					<button type="button" id="cancel-button" class="btn btn-link" translate="back"></button>
					<button type="button" id="refresh-button" class="btn-sm btn-primary float-right">
							<i class="bi bi-arrow-clockwise" style="font-size: 100%;"></i>
					</button>
				</div>

				<hr style="visibility:hidden;"></hr>
				
				<h5 class="card-title text-center mb-4">
					<span translate="tournament for"></span>
					<span>${s}</span>
					<span translate="players"></span>
				</h5>
				<div id="players-container">
					<!-- Players will be dynamically added here -->
				</div><br>

				<hr style="visibility:hidden;"></hr>
				<hr></hr>

				<form id="add-player-form">
					<div id="error-message" class="text-danger mb-3" style="display: none;"></div>
					<div class="form-group mb-3">
						<label for="new-player" class="form-label" translate="enter player username"></label>
						<input type="text" class="form-control" id="new-player" required>
					</div>
					<button type="submit" class="btn btn-primary w-100" translate="invite player"></button>
				</form>

				<button type="button" id="start-tournament-btn" class="btn btn-success w-100 mt-3" translate="start tournament"></button>
				<button type="button" id="cancel-tournament-btn" class="btn btn-danger w-100 mt-3" translate="cancel tournament"></button>

			</div>
		</div>`;const r=document.getElementById("content");r?(r.innerHTML=i,Jt(),hc(t),document.getElementById("cancel-button").addEventListener("click",()=>{xe("home")}),document.getElementById("refresh-button").addEventListener("click",()=>{hc(t)}),document.getElementById("cancel-tournament-btn").addEventListener("click",()=>{Nm(t)}),document.getElementById("start-tournament-btn").addEventListener("click",async u=>{u.preventDefault();try{const d=St("csrftoken"),h=await fetch("http://localhost:8000/start_tournament/",{method:"POST",headers:{"X-CSRFToken":d},credentials:"include",body:JSON.stringify({tournament_id:t})});if(h.ok){const f=await h.json();console.log("Starting tournament successful"),pe(f.message,"success"),xe("home")}else{const f=await h.json();console.error("Starting tournament failed: ",f),errorMessage.textContent=f.error,errorMessage.style.display="block"}}catch(d){console.error("Error during start tournament",d),pe("Error during starting tournament. Try Again","danger");return}}),document.getElementById("add-player-form").addEventListener("submit",async u=>{u.preventDefault();const d=document.getElementById("new-player"),h=d.value.trim(),f=document.getElementById("error-message");if(f.style.display="none",!!h){try{const p=St("csrftoken"),v=await fetch("http://localhost:8000/invite_to_tournament/",{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":p},credentials:"include",body:JSON.stringify({opponent_username:h,tournament_id:t})});if(v.ok){const _=await v.json();console.log("Sending invite to player successful",_),hc(t)}else{const _=await v.json();console.error("Error inviting player",_),f.textContent=_.error,f.style.display="block";return}}catch(p){console.error("Error during tournament setup",p),pe("Error during tournament setup. Try again.","danger")}d.value=""}})):console.error("Content element not found")}async function Nm(s){try{const t=St("csrftoken"),n=await fetch("http://localhost:8000/cancel_tournament/",{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":t},credentials:"include",body:JSON.stringify({tournament_id:s})});if(n.ok){const i=await n.json();console.log("Cancelling tournament successful",i),pe("Tournament cancelled","success"),xe("home")}else{const i=await n.json();console.error("Cancelling tournament",i),pe("Error cancelling tournament. Try again.","danger"),xe("home")}}catch(t){console.error("Error cancelling tournament",t),pe("Error cancelling tournament. Try again.","danger"),xe("home")}}async function hc(s){try{const t=await fetch(`http://localhost:8000/list_invited_participants/?tournament_id=${s}`,{method:"GET",credentials:"include"});if(!t.ok){console.error("Failed:",t.statusText),pe("Error occurred. Try again.","danger");return}if(t.ok){const n=await t.json(),i=document.getElementById("players-container");i.innerHTML="",n.participants.forEach(a=>{const o=document.createElement("div");o.className="player-item",o.style.display="flex",o.style.alignItems="center",o.style.marginBottom="10px";const l=document.createElement("span");l.className="player-name",l.textContent=a.display_name,l.style.flexGrow="1";const c=document.createElement("span");c.className="player-status",c.textContent=a.status,c.style.flexGrow="1",o.appendChild(l),o.appendChild(c),i.appendChild(o)})}else{const n=await t.json();console.error("Starting tournament failed: ",n),errorMessage.textContent=n.error,errorMessage.style.display="block"}}catch(t){console.error("Error during start tournament",t),pe("Error during starting tournament. Try Again","danger")}}async function sT(){const s=`
        <div class="container-fluid d-flex justify-content-center align-items-center">
            <div class="card p-4" style="width: 20rem; background-color: rgba(255, 255, 255, 0);">
                <div class="card-body d-flex flex-column align-items-center">
                    <button class="btn btn-primary btn-lg mb-3" id="single-player-btn" translate="single player">Single Player</button>
                    <button class="btn btn-success btn-lg mb-3" id="local-multiplayer-btn" translate="local multiplayer">Local Multiplayer</button>
                    <button class="btn btn-default btn-lg mb-3" id="4player-btn" translate="4player">4 Player Local</button>
                    <button class="btn btn-warning btn-lg mb-3" id="tournament-btn" translate="tournament">Tournament</button>

                    <div id="tournament-waiting" class="d-none mt-3 flex-column align-items-center">
                    <p class="w-100 text-center mb-2" style="color: white;" translate="wait for tournament to start">Wait for tournament to start</p>
                    </div>

                    <div id="tournament-form-exists" class="d-none mt-3 flex-column align-items-center">
                        <button class="btn btn-link btn-md mb-3" id="back-to-invites" style="color: white" translate="back to invites">Back to invites</button>
                    </div>

                    <div id="enter-tournament" class="d-none mt-3 flex-column align-items-center">
                        <button class="btn btn-light btn-md mb-3" id="enter-tournament-btn" translate="enter tournament">Enter tournament</button>
                    </div>

                    <div id="tournament-options" class="d-none mt-3 flex-column align-items-center">
                        <p class="w-100 text-center mb-2" style="color: white;" translate="how many players?"></p>
                        <div id="num-players" class="d-flex justify-content-center w-100">
                            <button class="btn btn-light mx-1" id="four-players">4</button>
                            <button class="btn btn-light mx-1" id="eight-players">8</button>
                            <button class="btn btn-light mx-1" id="sixteen-players">16</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    `;return window.requestAnimationFrame(()=>{const t=document.getElementById("single-player-btn"),n=document.getElementById("local-multiplayer-btn"),i=document.getElementById("4player-btn"),r=document.getElementById("tournament-btn");let a=!1;t&&t.addEventListener("click",o=>{o.preventDefault(),xe("single")}),n&&n.addEventListener("click",o=>{o.preventDefault(),xe("localMulti")}),i&&i.addEventListener("click",o=>{o.preventDefault(),xe("local4")}),r.addEventListener("click",async o=>{o.preventDefault(),a===!1?a=!0:a===!0&&(a=!1),aT(a);const l=document.getElementById("four-players"),c=document.getElementById("eight-players"),u=document.getElementById("sixteen-players");l&&l.addEventListener("click",d=>{d.preventDefault(),Fo(4)}),c&&c.addEventListener("click",d=>{d.preventDefault(),Fo(8)}),u&&u.addEventListener("click",d=>{d.preventDefault(),Fo(16)})})}),s}async function aT(s){try{const t=document.getElementById("tournament-options"),n=document.getElementById("tournament-waiting"),i=document.getElementById("tournament-form-exists"),r=document.getElementById("enter-tournament"),a=document.getElementById("back-to-invites"),o=document.getElementById("enter-tournament-btn"),l=await fetch("http://localhost:8000/is_user_in_tournament/",{method:"GET",credentials:"include"});if(!l.ok){console.error("Failed:",l.statusText),pe("Error occurred. Try again.","danger");return}const c=await l.json();s===!1?(t.classList.add("d-none"),t.classList.remove("d-flex"),r.classList.add("d-none"),r.classList.remove("d-flex"),n.classList.add("d-none"),n.classList.remove("d-flex"),i.classList.add("d-none"),i.classList.remove("d-flex")):c.in_tournament&&c.status=="Active"?(r.classList.remove("d-none"),r.classList.add("d-flex"),n.classList.add("d-none"),n.classList.remove("d-flex"),t.classList.add("d-none"),t.classList.remove("d-flex"),i.classList.add("d-none"),i.classList.remove("d-flex")):c.in_tournament&&c.tournament_initiator!==c.user&&c.status=="Pending"?(n.classList.remove("d-none"),n.classList.add("d-flex"),r.classList.add("d-none"),r.classList.remove("d-flex"),t.classList.add("d-none"),t.classList.remove("d-flex"),i.classList.add("d-none"),i.classList.remove("d-flex")):c.in_tournament&&c.tournament_initiator===c.user?(i.classList.remove("d-none"),i.classList.add("d-flex"),r.classList.add("d-none"),r.classList.remove("d-flex"),n.classList.add("d-none"),n.classList.remove("d-flex"),t.classList.add("d-none"),t.classList.remove("d-flex")):(t.classList.remove("d-none"),t.classList.add("d-flex"),r.classList.add("d-none"),r.classList.remove("d-flex"),n.classList.add("d-none"),n.classList.remove("d-flex"),i.classList.add("d-none"),i.classList.remove("d-flex")),a&&a.addEventListener("click",u=>{u.preventDefault(),Fo(4)}),o&&o.addEventListener("click",u=>{u.preventDefault(),xe("tournament-lobby")})}catch(t){console.error("Error during checking tournament status",t),pe("Error occurred. Try again.","danger")}}function oT(){return`
		<div class="bg-fade container-fluid d-flex justify-content-center align-items-center">

			<div class="card p-4" style="width: 20rem;">
				<h3 class="card-title text-center mb-4" translate="log in"></h3>
				<form id="login-form" method="POST">
					<div id="error-message" class="text-danger mb-3" styl2="display: none;"></div>
					<div class="form-group mb-3">
						<label for="username" class="form-label" translate="username"></label>
						<input type="text" class="form-control" id="username" required>
					</div>
					<div class="form-group mb-3">
						<label for="password" class="form-label" translate="password"></label>
						<input type="password" class="form-control" id="password" required>
					</div>
					<button type="submit" class="btn btn-primary w-100" translate="log in"></button>
					<p translate="don't have an account?"></p>
					<button type="button" id="register-button" class="btn btn-link" translate="register"></button>

				</form>
			</div>
		</div>
	`}function lT(){const s=document.getElementById("login-form");if(!s){console.error("Login form not found"),pe("Error occured. Try again.","danger");return}const t=document.getElementById("error-message"),n=document.getElementById("register-button"),i=St("csrftoken");s.addEventListener("submit",async r=>{r.preventDefault();const a=document.getElementById("username").value,o=document.getElementById("password").value;try{const l=await fetch("http://localhost:8000/login/",{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":i},credentials:"include",body:JSON.stringify({username:a,password:o})});if(l.ok){const c=await l.json();console.log("Login successful:",c),sessionStorage.setItem("username",a),localStorage.setItem("username",a),vh(),xe("home")}else{const c=await l.json();console.error("Login failed:",c),t.textContent=c.error,t.style.display="block"}}catch(l){console.error("Error during login:",l),t.textContent=l,t.style.display="block"}}),n.addEventListener("click",()=>{xe("register")})}function cT(){return`
        <div class="bg-fade container-fluid d-flex justify-content-center align-items-center">
            <div class="card p-4" style="width: 20rem;">
				<button type="button" id="cancel-button" class="btn btn-link" translate="back"></button>
				<h3 class="card-title text-center mb-4" translate="register"></h3>
                <form id="register-form" method="POST">
                    <div id="error-message" class="text-danger mb-3" style="display: none;"></div>
                    <div class="form-group mb-3">
                        <label for="first_name" class="form-label" translate="first name"></label>
                        <input type="text" class="form-control" id="first_name" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="last_name" class="form-label" translate="last name"></label>
                        <input type="text" class="form-control" id="last_name" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="username" class="form-label" translate="username"></label>
                        <input type="text" class="form-control" id="username" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="password" class="form-label" translate="password"></label>
                        <input type="password" class="form-control" id="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100" translate="register"></button>
                </form>
            </div>
        </div>
    `}function uT(){console.log("initializeRegister called");const s=document.getElementById("register-form");if(!s){console.error("Register form not found"),pe("Error getting registeration form. Try Again.","danger");return}const t=document.getElementById("error-message"),n=document.getElementById("cancel-button");s.addEventListener("submit",async i=>{i.preventDefault();const r=document.getElementById("first_name").value,a=document.getElementById("last_name").value,o=document.getElementById("username").value,l=document.getElementById("password").value,c=St("csrftoken");try{const u=await fetch("http://localhost:8000/register/",{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":c},credentials:"include",body:JSON.stringify({first_name:r,last_name:a,username:o,password:l})});if(u.ok){const d=await u.json();console.log("Registration successful:",d),pe(d.message,"success"),xe("login")}else{const d=await u.json();console.error("Registration failed:",d),t.textContent=d.error,t.style.display="block"}}catch(u){console.error("Error during registration:",u),pe("Error occured. Try again.","danger")}}),n.addEventListener("click",()=>{xe("login")})}async function dT(){const s=await fetch("http://localhost:8000/profile/",{method:"GET",credentials:"include"});if(!s.ok){console.error("Failed editing profile:",s.statusText),pe("Error editing profile. Try again.","danger");return}const t=await s.json(),n=`
       <div class="container mt-5">
            <div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">
            
				<h2 translate="edit user information"></h2>
			
				<div id="error-message" class="text-danger mb-3" styl2="display: none;"></div>

				<form id="edit-info-form" enctype="multipart/form-data">
					<div class="form-group">
						<label for="first_name" translate="first name"></label>
						<input type="text" id="first_name" name="first_name" class="form-control" value="${t.first_name}" required>
					</div>
					<div class="form-group">
						<label for="last_name" translate="last name"></label>
						<input type="text" id="last_name" name="last_name" class="form-control" value="${t.last_name}" required>
					</div>
					<div class="form-group">
						<label for="display_name" translate="display name"></label>
						<input type="text" id="display_name" name="display_name" class="form-control" value="${t.display_name}" required>
					</div>
				    <div class="form-group">
        				<label for="username" translate="username"></label>
        				<input type="text" id="username" name="username" class="form-control" value="${t.username}" readonly>
    				</div>
					<div class="form-group">
					    <label for="preferred_language" translate="preferred language"></label>
					    <select id="preferred_language" name="preferred_language" class="form-control">
							<option value="EN" ${t.language==="en"?"selected":""} translate="english"></option>
							<option value="FI" ${t.language==="fi"?"selected":""} translate="finnish"></option>
							<option value="RU" ${t.language==="ru"?"selected":""} translate="russian"></option>
					    </select>
  					</div>
					<button type="submit" class="btn btn-primary mt-3" translate="save changes"></button>
					<button type="button" id="cancel-button" class="btn btn-link" translate="cancel"></button>
				</form>
			</div>
        </div>
    `,i=document.getElementById("content");i?(i.innerHTML=n,fT(),Jt()):(console.error("Content element not found"),pe("Error occured. Try again.","danger"),xe("profile"))}async function fT(){const s=document.getElementById("edit-info-form");if(!s){console.error("Edit form not found"),pe("Error occured. Try again","danger");return}const t=document.getElementById("cancel-button"),n=document.getElementById("error-message");s.addEventListener("submit",async i=>{i.preventDefault();const r=new FormData(s),a=St("csrftoken");try{const o=await fetch("http://localhost:8000/update_profile/",{method:"POST",headers:{"X-CSRFToken":a},credentials:"include",body:r});if(o.ok){const l=await o.json();console.log("Edit info successful"),pe(l.message,"success"),await vh(),xe("profile")}else{const l=await o.json();console.error("Edit info failed",l),n.textContent=l.error,n.style.display="block"}}catch(o){console.error("Error during edit info",o),pe("Error editin user info. Try again.","danger"),xe("profile")}}),t.addEventListener("click",()=>{xe("profile")})}async function hT(){const s=`
       <div class="container mt-5">
            <div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">
				<h5>
					<span translate="change avatar"></span>
				</h5>
				<div id="error-message" class="text-danger mb-3" styl2="display: none;"></div>
				<form id="edit-avatar-form" enctype="multipart/form-data">
					<div class="form-group">
						<label for="avatar"></label>
						<input type="file" id="avatar" name="avatar" class="form-control">
					</div>
					<button type="submit" class="btn btn-primary mt-3" translate="save changes"></button>
					<button type="button" id="cancel-button" class="btn btn-link" translate="cancel"></button>
				</form>
			</div>
        </div>
    `,t=document.getElementById("content");t?(t.innerHTML=s,Jt(),pT()):(console.error("Content element not found"),pe("Error occured. Try again","danger"),xe("profile"))}async function pT(){const s=document.getElementById("edit-avatar-form");if(!s){console.error("Edit Avatar form not found"),pe("Error occured. Try again.","danger");return}const t=document.getElementById("cancel-button"),n=document.getElementById("error-message");s.addEventListener("submit",async i=>{i.preventDefault();const r=new FormData(s),a=St("csrftoken");try{const o=await fetch("http://localhost:8000/update_profile/",{method:"POST",headers:{"X-CSRFToken":a},credentials:"include",body:r});if(o.ok){const l=await o.json();console.log("Edit avatar successful"),pe(l.message,"success"),xe("profile")}else{const l=await o.json();console.error("Edit avatar failed",l),n.textContent=l.error,n.style.display="block"}}catch(o){console.error("Error during edit avatar",o),pe("Error during edit avatar. Try Again","danger")}}),t.addEventListener("click",()=>{xe("profile")})}async function mT(){const s=`
		<div class="container mt-5">
			<div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">
				<h2>
					<span translate="change password"></span>
				</h2>
				<div id="error-message" class="text-danger mb-3" styl2="display: none;"></div>
				<form id="change-password-form">
					<div class="form-group">
						<label for="current_password" translate="current password"></label>
						<input type="password" id="current_password" class="form-control" required>
					</div>
					<div class="form-group">
						<label for="new_password" translate="new password"></label>
						<input type="password" id="new_password" class="form-control" required>
					</div>
					<div class="form-group">
						<label for="confirm_password" translate="type new password again"></label>
						<input type="password" id="confirm_password" class="form-control" required>
					</div>
					<button type="submit" class="btn btn-primary mt-3" translate="save changes"></button>
					<button type="button" id="cancel-button" class="btn btn-link" translate="cancel"></button>
				</form>
			</div>
		</div>
	`,t=document.getElementById("content");t?(t.innerHTML=s,Jt(),gT()):console.error("Content element not found")}async function gT(){const s=document.getElementById("change-password-form");s||(console.error("Change password form not found"),pe("Error changing password. Try again","danger"),xe("profile"));const t=document.getElementById("error-message"),n=document.getElementById("cancel-button");s.addEventListener("submit",async i=>{i.preventDefault();const r=document.getElementById("current_password").value,a=document.getElementById("new_password").value,o=document.getElementById("confirm_password").value,l=St("csrftoken");try{const c=await fetch("http://localhost:8000/change_password/",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json","X-CSRFToken":l},body:JSON.stringify({current_password:r,new_password:a,confirm_password:o})});if(c.ok){const u=await c.json();console.log("Password change succesfull"),pe(u.message,"success"),xe("profile")}else{const u=await c.json();console.error("Password change failed",u),t.textContent=u.error,t.style.display="block"}}catch(c){console.error("Error during change password",c),pe("Error occured when changing the password. Try again.","danger"),xe("profile")}}),n.addEventListener("click",()=>{xe("profile")})}async function Um(s){try{const t=St("csrftoken"),n=await fetch("http://localhost:8000/public_profile/",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json","X-CSRFToken":t},body:JSON.stringify({user_username:s})});if(n.ok){const i=await n.json(),r=i.wins+i.losses>0?(i.wins/(i.wins+i.losses)*100).toFixed(0):0,a=`
				<div class="container mt-5">
					<div class="row">
						<div class="col-md-5 mx-auto">
							<div class="card text-center profile-card">
								<div class="card-body">
									<button type="button" id="back-button" class="btn btn-link float-left" translate="back"></button>
									<div>
										<img src="http://localhost:8000/${i.avatar}" class="rounded-circle img-fluid mb-3" alt="Avatar" style="width: 150px; height: 150px;">							
									</div>
									<h4 class="card-title">${i.display_name}</h4>
										<p class="text-muted">@${i.username}</p>
								</div>
							
								<div class="card-body">
									<h5 class="card-title">
										<span translate="stats"></span>
									</h5>
									<table class="table table-striped">
										<tbody>
											<tr>
												<th scope="row" translate="wins"></th>
												<td>${i.wins}</td>
											</tr>
											<tr>
												<th scope="row" translate="losses"></th>
												<td>${i.losses}</td>
											</tr>
											<tr>
												<th scope="row" translate="win %"></th>
												<td>${r}%</td>
											</tr>
										</tbody>
									</table>
									<button type="button" id="match-history-button" class="btn btn-info" translate="match history"></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			`,o=document.getElementById("content");if(o){o.innerHTML=a,Jt();const l=document.getElementById("match-history-button");l&&l.addEventListener("click",()=>{_T(s)}),xl()}else console.error("Content element not found")}else console.error("User profile loading failed"),pe("Error loading user profile.","danger"),xe("profile")}catch(t){console.error("Error loading user profile: ",t),pe("Error loading user profile. Try again.","danger"),xe("profile")}}async function _T(s){try{const t=await fetch(`http://localhost:8000/public_match_history/?user_username=${s}`,{method:"GET",credentials:"include"});if(!t.ok){console.error("Failed loading user match history:",t.statusText),pe("Error occurred loading user match history. Try again.","danger"),xe("profile");return}const r=`
			<div class="container mt-5">
				<div class="row">
					<div class="col-md-12">
						<div class="card">
							<div class="card-body">
								<h5 class="card-title">
									<span translate="match history"></span>
								</h5>
								<table class="table table-striped">
									<thead>
										<tr>
											<th translate="date"></th>
											<th translate="opponent"></th>
											<th translate="result"></th>
										</tr>
									</thead>
									<tbody>
                            			${(await t.json()).matches.map(o=>`
                                            	<tr>
                                            	    <td>${new Date(o.date).toLocaleString()}</td>
                                            	    <td>${o.opponent}</td>
                                            	    <td>${o.result}</td>
                                            	</tr>
                                            	`).join("")}
									</tbody>
								</table>
								<button type="button" id="back-button" class="btn btn-primary" translate="back"></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`,a=document.getElementById("content");if(a){a.innerHTML=r,Jt();const o=document.getElementById("back-button");o&&o.addEventListener("click",()=>{console.log("Clicked back button"),Um(s)})}else console.error("Content element not found")}catch(t){console.error("Error fetching user match history:",t),pe("Error fetching user match history. Try Again.","danger"),xe("profile")}}async function vT(){try{const s=await fetch("http://localhost:8000/profile/",{method:"GET",credentials:"include"});if(!s.ok){console.error("Failed loading profile:",s.statusText),pe("Error occured displaying friends. Try again.","danger");return}const n=(await s.json()).friends,i=document.getElementById("friends-list");i.innerHTML="",n.forEach((r,a)=>{const o=["#f0f0f0","#ffffff"],l=document.createElement("div");l.className="friend-item",l.style.backgroundColor=o[a%o.length],l.style.padding="10px",l.style.display="flex",l.style.alignItems="center";const c=document.createElement("span");c.className="online-status",c.style.marginRight="10px",c.style.fontSize="80%",r.online_status==!0?(c.innerHTML='<i class="bi bi-circle-fill"></i>',c.style.color="green"):r.online_status==!1&&(c.innerHTML='<i class="bi bi-circle-fill"></i>',c.style.color="red");const u=document.createElement("button");u.className="btn btn-link",u.style.transform="scale(1.3)",u.textContent=r.username,u.onclick=()=>Um(r.username);const d=document.createElement("button");d.className="btn btn-link btn-sm",d.innerHTML='<i class="bi bi-trash3-fill"></i>',d.style.marginRight="10px",d.style.marginLeft="auto",d.style.color="red",d.style.fontSize="110%",d.onclick=()=>ET(r.username),l.appendChild(c),l.appendChild(u),l.appendChild(d),i.appendChild(l)})}catch(s){console.log(s)}}async function yT(){const s=await fetch("http://localhost:8000/profile/",{method:"GET",credentials:"include"});if(!s.ok){console.error("Failed loading profile:",s.statusText),pe("Error occured displaying friend requests. Try again.","danger");return}const n=(await s.json()).friend_requests,i=document.getElementById("friend-requests");i.innerHTML="",n.forEach((r,a)=>{const o=["#f0f0f0","#ffffff"],l=document.createElement("div");l.className="friend-item",l.style.display="flex",l.style.alignItems="center",l.style.marginBottom="10px",l.style.backgroundColor=o[a%o.length],l.style.padding="10px";const c=document.createElement("span");c.className="friend-name",c.textContent=r.username,c.style.flexGrow="1";const u=document.createElement("button");u.className="btn btn-success btn-sm",u.innerHTML='<i class="bi bi-check-lg"></i>',u.style.marginRight="10px",u.onclick=()=>xT(r.username);const d=document.createElement("button");d.className="btn btn-danger btn-sm",d.innerHTML='<i class="bi bi-x-lg"></i>',d.onclick=()=>bT(r.username),l.appendChild(c),l.appendChild(u),l.appendChild(d),i.appendChild(l)})}async function xT(s){try{const t=St("csrftoken"),n=await fetch("http://localhost:8000/accept_friend_request/",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json","X-CSRFToken":t},body:JSON.stringify({request_user_username:s})});if(n.ok){const i=await n.json();console.log("Friend added succesfully"),pe(i.message,"success"),xe("profile")}else{const i=await n.json();console.error("Adding friend failed",i),pe(i.error,"danger"),xe("profile")}}catch(t){console.error("Error during adding friend",t),pe("Error occured when adding friend. Try again.","danger")}}async function bT(s){try{const t=St("csrftoken"),n=await fetch("http://localhost:8000/decline_friend_request/",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json","X-CSRFToken":t},body:JSON.stringify({request_user_username:s})});if(n.ok){const i=await n.json();console.log("Friend declined succesfully"),pe(i.message,"success"),xe("profile")}else{const i=await n.json();console.error("Declining friend failed"),pe(i.error,"danger"),xe("profile")}}catch(t){console.error("Error during adding friend",t),pe("Error occured when adding friend. Try again.","danger")}}async function ST(){const s=await fetch("http://localhost:8000/profile/",{method:"GET",credentials:"include"});if(!s.ok){console.error("Failed loading profile:",s.statusText),pe("Error occured adding friend. Try again.","danger");return}const t=`
		<div class="container mt-5">
			<div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">
			<form id="add-friends-form">
				<div class="form-group">
					<label for="friends-name" translate="friend's name"></label>
					<input type="text" id="new-friend" class="form-control" required>
				</div>
				<button type="submit" class="btn btn-success mt-3" translate="send request"></button>
				<button type="button" id="cancel-button" class="btn btn-link" translate="cancel"></button>
			</form>
			</div>
		</div>
	`,n=document.getElementById("content");n?(n.innerHTML=t,Jt(),MT()):console.error("Content element not found")}async function MT(){const s=document.getElementById("add-friends-form");s||(console.error("Add friends form not found"),pe("Error occured adding friend. Try again.","danger"),xe("profile"));const t=document.getElementById("cancel-button");s.addEventListener("submit",async n=>{n.preventDefault();const i=document.getElementById("new-friend").value;try{const r=St("csrftoken"),a=await fetch("http://localhost:8000/add_friend/",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json","X-CSRFToken":r},body:JSON.stringify({friend_username:i})});if(a.ok){const o=await a.json();console.log("Friend added succesfully"),pe(o.message,"success"),xe("profile")}else{const o=await a.json();console.error("Adding friend failed",o),pe(o.error,"danger"),xe("profile")}}catch(r){console.error("Error during adding friend",r),pe("Error occured when adding friend. Try again.","danger")}}),t.addEventListener("click",()=>{xe("profile")})}async function ET(s){try{const t=St("csrftoken"),n=await fetch("http://localhost:8000/remove_friend/",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json","X-CSRFToken":t},body:JSON.stringify({friend_username:s})});if(n.ok){const i=await n.json();console.log("Friend removed succesfully"),pe(i.message,"success"),xe("profile")}else{const i=await n.json();console.error("Removing friend failed"),pe(i.error,"danger"),xe("profile")}}catch(t){console.error("Error during removing friend",t),pe("Error occured when removing friend. Try again.","danger"),xe("profile")}}async function TT(){try{const s=await fetch("http://localhost:8000/match_history/",{method:"GET",credentials:"include"});if(!s.ok){console.error("Failed loading match history:",s.statusText),pe("Error occurred loading match history. Try again.","danger");return}const i=`
			<div class="container mt-5">
				<div class="row">
					<div class="col-md-12">
						<div class="card">
							<div class="card-body">
								<h5 class="card-title">
									<span translate="match history"></span>
								</h5>

								<table class="table table-striped">
									<thead>
										<tr>
											<th translate="date"></th>
											<th translate="opponent"></th>
											<th translate="result"></th>
										</tr>
									</thead>
									<tbody>
                            			${(await s.json()).matches.map(a=>`
                                            	<tr>
                                            	    <td>${new Date(a.date).toLocaleString()}</td>
                                            	    <td>${a.opponent}</td>
                                            	    <td>${a.result}</td>
                                            	</tr>
                                            	`).join("")}
									</tbody>
								</table>
								<button type="button" id="back-button" class="btn btn-primary" translate="back"></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`,r=document.getElementById("content");r?(r.innerHTML=i,Jt(),xl()):console.error("Content element not found")}catch(s){console.error("Error fetching match history:",s),pe("Error fetching match history. Try Again.","danger"),xe("profile")}}async function wT(){try{const s=await fetch("http://localhost:8000/friends_statistics/",{method:"GET",credentials:"include"});if(!s.ok){console.error("Failed loading friends statistics:",s.statusText),pe("Error occurred loading friends statistics. Try Again.","danger");return}const t=await s.json(),n=t.friends.map(o=>o.friend_name),i=t.friends.map(o=>{const l=o.wins+o.losses;return l>0?o.wins/l*100:0}),r=`
			<div class="chart-container" style="width: 100%">
				<canvas class="chart" id="myChart"></canvas>
				<div id="profile-card" style="text-align: center; padding: 50px; font-size: 1.2em; font-weight: bold; background-color: white">
					<button type="button" id="back-button" class="btn btn-primary float-right" translate="back"></button>
				</div>
			</div>		
		`,a=document.getElementById("content");if(a){a.innerHTML=r;const o=document.getElementById("myChart").getContext("2d"),l=new Chart(o,{type:"bar",data:{labels:n,datasets:[{label:"Win Percentage",data:i,backgroundColor:"rgba(75, 192, 192, 0.6)",borderColor:"rgba(75, 192, 192, 1)",borderWidth:1}]},options:{scales:{xAxes:[{ticks:{fontSize:16,fontColor:"#333",fontStyle:"bold"},scaleLabel:{display:!0,labelString:"Friends' Names",fontSize:15,fontColor:"#333"}}],yAxes:[{ticks:{beginAtZero:!0,callback:function(c){return c+"%"}},scaleLabel:{display:!0,labelString:"Win Percentage (%)"}}]},tooltips:{callbacks:{label:function(c,u){return"Win Percentage: "+u.datasets[c.datasetIndex].data[c.index].toFixed(2)+"%"}}},title:{display:!0,text:"Win Percentages of Friends"},legend:{display:!1}}});Jt(),xl()}else console.error("Content element not found")}catch(s){console.error("Error fetching chart:",s),pe("Error fetching chart. Try Again.","danger"),xe("profile")}}async function AT(){try{const s=await fetch("http://localhost:8000/friends_statistics/",{method:"GET",credentials:"include"});if(!s.ok){console.error("Failed loading friends statistics:",s.statusText),pe("Error occurred loading friends statistics. Try Again.","danger");return}const t=await s.json(),n=await fetch("http://localhost:8000/profile/",{method:"GET",credentials:"include"});if(!n.ok){console.error("Failed loading profile statistics:",s.statusText),pe("Error occurred loading profile statistics. Try Again.","danger");return}const i=await n.json(),r=t.friends.map(p=>p.friend_name),a=t.friends.map(p=>p.wins),o=t.friends.map(p=>p.losses);r.push(i.username),a.push(i.wins),o.push(i.losses);const l=a.reduce((p,v)=>p+v,0),c=o.reduce((p,v)=>p+v,0),u=l+c,d=["#36a2eb","#ff6384"],h=`
            <div class="chart-container" style="width: 100%">
                <canvas id="myChart" style="width: 100%; background-color: white"></canvas>
				<div id="profile-card" style="text-align: center; padding: 20px; font-size: 1.2em; font-weight: bold; background-color: white">
               		Total Games Played: ${u}
					<button type="button" id="back-button" class="btn btn-primary float-right" translate="back"></button>
            	</div>
            </div>
        `,f=document.getElementById("content");f?(f.innerHTML=h,new Chart("myChart",{type:"doughnut",data:{labels:["Wins","Losses"],datasets:[{label:"Overall Stats",backgroundColor:d,data:[l,c]}]},options:{title:{display:!0,text:"Overall Wins & Losses with friends"},tooltips:{callbacks:{label:function(p,v){const _=v.datasets[p.datasetIndex],m=_.data.reduce((x,R)=>x+R,0),g=_.data[p.index],S=Math.floor(g/m*100+.5);return v.labels[p.index]+": "+g+" ("+S+"%)"}}}}}),Jt(),xl()):(console.error("Content element not found"),pe("Error occured loading chart. Try Again","danger"),xe("profile"))}catch(s){console.error("Error fetching chart:",s),pe("Error fetching chart. Try Again.","danger"),xe("profile")}}async function CT(){const s=await fetch("http://localhost:8000/profile/",{method:"GET",credentials:"include"});if(!s.ok){console.error("Failed loading profile:",s.statusText),pe("Error occured loading profile. Try Again.","danger");return}const t=await s.json(),n=t.wins+t.losses>0?(t.wins/(t.wins+t.losses)*100).toFixed(0):0,i=`
		<div class="container mt-5">
			<div class="row">
				<div class="col-md-4">
					<div class="card text-center profile-card">
						<div class="card-body">
		                	<div class="d-flex justify-content-end mb-1">
								<button type="submit" id="edit-avatar-button" class="btn btn-primary float-right">
									<i class="bi bi-pencil-fill"></i>
								</button>
							</div>
							<div>
								<img src="http://localhost:8000/${t.avatar}" class="rounded-circle img-fluid mb-3" alt="Avatar" style="width: 150px; height: 150px;">							
        	                </div>
							<h4 class="card-title">${t.display_name}</h4>
							<p class="text-muted">@${t.username}</p>
						</div>
					</div>
				</div>
				
				<div class="col-md-4">
					<div class="card profile-card">
						<div class="card-body">
							<h5 class="card-title">
								<span translate="stats"></span>
							</h5>
							<table class="table table-striped">
								<tbody>
									<tr>
										<th scope="row" translate="wins"></th>
										<td>${t.wins}</td>
									</tr>
									<tr>
										<th scope="row" translate="losses"></th>
										<td>${t.losses}</td>
									</tr>
									<tr>
										<th scope="row" translate="win %"></th>
										<td>${n}%</td>
									</tr>
								</tbody>
							</table>
							<button type="submit" id="match-history-button" class="btn btn-info" translate="match history"></button>
							<button type="button" id="chart-one-button" class="btn btn-warning">1</button>
							<button type="button" id="chart-two-button" class="btn btn-warning">2</button>
						</div>
					</div>
				</div>

				<div class="col-md-4">
					<div class="card profile-card">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-center mb-4">
								<h5 class="card-title mb-0">
									<span translate="friends"></span>
								</h5>
								<div class="float-right">
									<button type="submit" id="add-friend-button" class="btn btn-success" >
										<i class="bi bi-person-plus-fill" style="font-size: 120%"></i>
									</button>
								</div>
							</div>
							<ul id="friends-list" class="list-group">
								<!-- Friends here dinamically -->
							</ul>
							<hr></hr>
							<h5>
								<span translate="requests"></span>
							</h5>
							<ul id="friend-requests" class="list-group">
								<!-- Friends here dinamically -->
							</ul>
						</div>
					</div>
				</div>

				<div class="col-md-4">
					<div class="card profile-card">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-center mb-4">
								<h5 class="card-title mb-0">
									<span translate="game invites"></span>
								</h5>
							</div>
							<ul id="game-invite-list" class="list-group">
								<!-- Game invites here dinamically -->
							</ul>
							<hr></hr>
						</div>
					</div>
				</div>
				
				<div class="col-md-8">
					<div class="card profile-card">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-center mb-4">
								<h4 class="card-title mb-0">
									<span translate="user info"></span>
								</h4>
								<button type="submit" id="edit-button" class="btn btn-primary">
									<i class="bi bi-pencil-fill"></i>
								</button>
							</div>
							<table class="table table-striped">
								<tbody>
									<tr>
										<th scope="row" translate="first name"></th>
										<td>${t.first_name}</td>
									</tr>
									<tr>
										<th scope="row" translate="last name"></th>
										<td>${t.last_name}</td>
									</tr>
									<tr>
										<th scope="row" translate="display name"></th>
										<td>${t.display_name}</td>
									</tr>
									<tr>
										<th scope="row" translate="username"></th>
										<td>${t.username}</td>
									</tr>
									<tr>
										<th scope="row" translate="language"></th>
										<td>${t.preferred_language}</td>
									</tr>
								</tbody>
							</table>
							<button type="submit" id="change-password-button" class="btn btn-link float-right" translate="change password"></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,r=document.getElementById("content");r?(r.innerHTML=i,Jt(),await vT(),await yT(),await RT(),DT()):console.error("Content element not found")}async function RT(){const s=await fetch("http://localhost:8000/profile/",{method:"GET",credentials:"include"});if(!s.ok){console.error("Failed loading profile:",s.statusText),pe("Error occured displaying friend requests. Try again.","danger");return}const n=(await s.json()).tournament_invitations,i=document.getElementById("game-invite-list");i.innerHTML="",n.forEach((r,a)=>{const o=["#f0f0f0","#ffffff"],l=document.createElement("div");l.className="friend-item",l.style.display="flex",l.style.alignItems="center",l.style.marginBottom="10px",l.style.backgroundColor=o[a%o.length],l.style.padding="10px";const c=document.createElement("span");c.className="friend-name",c.textContent=r.tournament_initiator,c.style.flexGrow="1";const u=document.createElement("button");u.className="btn btn-success btn-sm",u.innerHTML='<i class="bi bi-check-lg"></i>',u.style.marginRight="10px",u.onclick=()=>PT(r.tournament_initiator);const d=document.createElement("button");d.className="btn btn-danger btn-sm",d.innerHTML='<i class="bi bi-x-lg"></i>',d.onclick=()=>LT(r.tournament_initiator),l.appendChild(c),l.appendChild(u),l.appendChild(d),i.appendChild(l)})}async function PT(s){try{const t=St("csrftoken"),n=await fetch("http://localhost:8000/accept_tournament_invitation/",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json","X-CSRFToken":t},body:JSON.stringify({initiator_username:s})});if(n.ok){const i=await n.json();console.log("Invitation accepted succesfully"),pe(i.message,"success"),xe("profile")}else{const i=await n.json();console.error("Accepting invitation failed",i),pe(i.error,"danger"),xe("profile")}}catch(t){console.error("Error during accepting game invite",t),pe("Error occured when accepting invite. Try again.","danger"),xe("profile")}}async function LT(s){try{const t=St("csrftoken"),n=await fetch("http://localhost:8000/decline_tournament_invitation/",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json","X-CSRFToken":t},body:JSON.stringify({initiator_username:s})});if(n.ok){const i=await n.json();console.log("Game invite declined succesfully"),pe(i.message,"success"),xe("profile")}else{const i=await n.json();console.error("Declining game invite failed"),pe(i.error,"danger"),xe("profile")}}catch(t){console.error("Error during declining game invite",t),pe("Error occured when declining game invite. Try again.","danger")}}async function xl(){const s=document.getElementById("back-button");s&&s.addEventListener("click",()=>{xe("profile")})}async function DT(){const s=document.getElementById("edit-button"),t=document.getElementById("change-password-button"),n=document.getElementById("add-friend-button"),i=document.getElementById("match-history-button"),r=document.getElementById("edit-avatar-button"),a=document.getElementById("chart-one-button");a&&a.addEventListener("click",()=>{wT()});const o=document.getElementById("chart-two-button");o&&o.addEventListener("click",()=>{AT()}),s&&s.addEventListener("click",()=>{dT()}),r&&r.addEventListener("click",()=>{hT()}),t&&t.addEventListener("click",()=>{mT()}),n&&n.addEventListener("click",()=>{ST()}),i&&i.addEventListener("click",()=>{TT()})}async function IT(s,t,n,i){try{const r=await fetch("http://localhost:8000/profile/",{method:"GET",credentials:"include"});if(!r.ok)return console.error("Failed loading profile:",r.statusText),"<h1>Error loading profile</h1>";const a=await r.json();if(s>0||t>0)try{const o=St("csrftoken");await fetch("http://localhost:8000/add_result/",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json","X-CSRFToken":o},body:JSON.stringify({scoreLeft:s,scoreRight:t,oppIsHuman:n,oppName:i})})}catch(o){console.log(o)}return n==!1&&xe("home"),s>t?`
            <p class="w-100" style="color: white;">${a.display_name} wins!</p>
            <p class="w-100" style="color: white;">Final score is ${s} - ${t}!</p>
        `:n?`
                <p class="w-100" style="color: white;">${i} wins!<p>
                <p class="w-100" style="color: white;">Final score is ${s} - ${t}!</p>
            `:`
        <p class="w-100" style="color: white;>AI wins!<p>
        <p class="w-100" style="color: white;>Final score is ${s} - ${t}!</p>
        `}catch(r){console.log(r)}}async function OT(s,t,n,i){try{const r=St("csrftoken"),o=await(await fetch("http://localhost:8000/add_tourney_result/",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json","X-CSRFToken":r},body:JSON.stringify({scoreLeft:s,scoreRight:t,nameLeft:n,nameRight:i})})).json();console.log(o)}catch(r){console.log(r)}xe("home")}function Nn(s){const t=document.getElementById("home-link"),n=document.getElementById("profile-link"),i=document.getElementById("login-link"),r=document.getElementById("languageDropdown");s==1?(t.style.display="block",n.style.display="block",i.style.display="block",r.style.display="block"):s==2?(t.style.display="block",n.style.display="none",i.style.display="none",r.style.display="none"):(t.style.display="none",n.style.display="none",i.style.display="none",r.style.display="block")}sessionStorage.setItem("timeoutTimer",Date.now());let NT=15*60*1e3;setInterval(UT,2*60*1e3);async function UT(){try{const s=await fetch("http://localhost:8000/is_online/",{method:"GET",credentials:"include"});if(s.ok){if((await s.json()).is_online){const n=sessionStorage.getItem("timeoutTimer");Date.now()>Number(n)+Number(NT)&&(await Bm(),xe("login"))}}else console.error("Failed to fetch is_online status")}catch(s){console.error("Error in handleInactives:",s)}}function Fm(){sessionStorage.setItem("timeoutTimer",Date.now())}document.addEventListener("click",Fm);document.addEventListener("keypress",Fm);async function xe(s,t,n,i,r,a,o=!0){await _h;const l=document.getElementById("content");switch(sessionStorage.setItem("timeoutTimer",Date.now()),!localStorage.getItem("username")&&!sessionStorage.getItem("username")&&s!=="login"&&s!=="register"&&(s="login",console.log("Redirected to login"),pe("Please log in","danger")),o&&window.location.pathname.replace("/","")!==s&&window.history.pushState({content:s},"",`/${s}#`),document.getElementById("profile-name").innerHTML=sessionStorage.getItem("username"),s){case"home":await void 0,l.innerHTML=await sT(),Nn(1);break;case"login":l.innerHTML=oT(),lT(),Nn(0);break;case"register":l.innerHTML=cT(),uT(),Nn(0);break;case"profile":CT();break;case"single":l.innerHTML=await Eo(0),To(0),Nn(2);break;case"localMulti":l.innerHTML=await Eo(1,sessionStorage.getItem("username")),To(1),Nn(2);break;case"local4":l.innerHTML=await Eo(2,sessionStorage.getItem("username")),To(2),Nn(2);break;case"tourney":l.innerHTML=await Eo(3,r,a),To(3,r,a),Nn(2);break;case"result":console.log(i,a),l.innerHTML=await IT(t,n,i,a),Nn(1);break;case"tourneyResult":l.innerHTML=await OT(t,n,r,a),Nn(1);break;case"tournament-lobby":await iT(),Nn(1);break;default:xe("home");return}Jt()}document.getElementById("home-link").addEventListener("click",s=>{s.preventDefault(),xe("home")});document.getElementById("login-link").addEventListener("click",s=>{s.preventDefault(),Bm(),sessionStorage.removeItem("username"),localStorage.removeItem("username"),xe("login")});document.getElementById("profile-link").addEventListener("click",s=>{s.preventDefault(),xe("profile")});document.getElementById("languageDropdown").addEventListener("change",s=>{setLanguage(e.target.value),s.preventDefault()});async function Bm(){const s=St("csrftoken");try{const t=await fetch("http://localhost:8000/logout/",{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":s},credentials:"include"});if(t.ok){const n=await t.json();console.log("Logged out succesfully: ",n.message)}else{const n=await t.json();console.error("Log out failed"),pe(n,"danger")}}catch(t){console.error("Error during log out",t),pe("Error occured when logging out. Try again.","danger")}}async function FT(){try{await i18next,await _h;const s=window.location.pathname.replace("/","");!localStorage.getItem("username")&&!sessionStorage.getItem("username")?xe("login",!1):xe(s||"home",!1)}catch(s){console.error("Error initializing app:",s)}}FT();window.addEventListener("popstate",s=>{s.state&&s.state.content?xe(s.state.content,!1):xe("home",!1)});function pe(s,t){const n=document.getElementById("alert-container"),i=document.createElement("div");i.className=`alert alert-${t} alert-dismissible fade show`,i.role="alert",i.innerHTML=`${s}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>`,n.appendChild(i),setTimeout(()=>{$(i).alert("close")},5e3)}
//# sourceMappingURL=index-sUqJ8dK0.js.map
