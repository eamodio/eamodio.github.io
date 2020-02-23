/*! For license information please see main.js.LICENSE.txt */
!function(t){var e={};function n(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(s,i,function(e){return t[e]}.bind(null,i));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=1)}([function(t,e,n){var s;s=function(){return function(t){var e={};function n(s){if(e[s])return e[s].exports;var i=e[s]={exports:{},id:s,loaded:!1};return t[s].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}return n.m=t,n.c=e,n.p="",n(0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,n,s){return n&&t(e.prototype,n),s&&t(e,s),e}}(),i=n(1),o=n(3),a=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),i.initializer.load(this,n,e),this.begin()}return s(t,[{key:"toggle",value:function(){this.pause.status?this.start():this.stop()}},{key:"stop",value:function(){this.typingComplete||this.pause.status||(this.toggleBlinking(!0),this.pause.status=!0,this.options.onStop(this.arrayPos,this))}},{key:"start",value:function(){this.typingComplete||this.pause.status&&(this.pause.status=!1,this.pause.typewrite?this.typewrite(this.pause.curString,this.pause.curStrPos):this.backspace(this.pause.curString,this.pause.curStrPos),this.options.onStart(this.arrayPos,this))}},{key:"destroy",value:function(){this.reset(!1),this.options.onDestroy(this)}},{key:"reset",value:function(){var t=arguments.length<=0||void 0===arguments[0]||arguments[0];clearInterval(this.timeout),this.replaceText(""),this.cursor&&this.cursor.parentNode&&(this.cursor.parentNode.removeChild(this.cursor),this.cursor=null),this.strPos=0,this.arrayPos=0,this.curLoop=0,t&&(this.insertCursor(),this.options.onReset(this),this.begin())}},{key:"begin",value:function(){var t=this;this.options.onBegin(this),this.typingComplete=!1,this.shuffleStringsIfNeeded(this),this.insertCursor(),this.bindInputFocusEvents&&this.bindFocusEvents(),this.timeout=setTimeout((function(){t.currentElContent&&0!==t.currentElContent.length?t.backspace(t.currentElContent,t.currentElContent.length):t.typewrite(t.strings[t.sequence[t.arrayPos]],t.strPos)}),this.startDelay)}},{key:"typewrite",value:function(t,e){var n=this;this.fadeOut&&this.el.classList.contains(this.fadeOutClass)&&(this.el.classList.remove(this.fadeOutClass),this.cursor&&this.cursor.classList.remove(this.fadeOutClass));var s=this.humanizer(this.typeSpeed),i=1;!0!==this.pause.status?this.timeout=setTimeout((function(){e=o.htmlParser.typeHtmlChars(t,e,n);var s=0,a=t.substr(e);if("^"===a.charAt(0)&&/^\^\d+/.test(a)){var r=1;r+=(a=/\d+/.exec(a)[0]).length,s=parseInt(a),n.temporaryPause=!0,n.options.onTypingPaused(n.arrayPos,n),t=t.substring(0,e)+t.substring(e+r),n.toggleBlinking(!0)}if("`"===a.charAt(0)){for(;"`"!==t.substr(e+i).charAt(0)&&(i++,!(e+i>t.length)););var u=t.substring(0,e),c=t.substring(u.length+1,e+i),l=t.substring(e+i+1);t=u+c+l,i--}n.timeout=setTimeout((function(){n.toggleBlinking(!1),e>=t.length?n.doneTyping(t,e):n.keepTyping(t,e,i),n.temporaryPause&&(n.temporaryPause=!1,n.options.onTypingResumed(n.arrayPos,n))}),s)}),s):this.setPauseStatus(t,e,!0)}},{key:"keepTyping",value:function(t,e,n){0===e&&(this.toggleBlinking(!1),this.options.preStringTyped(this.arrayPos,this)),e+=n;var s=t.substr(0,e);this.replaceText(s),this.typewrite(t,e)}},{key:"doneTyping",value:function(t,e){var n=this;this.options.onStringTyped(this.arrayPos,this),this.toggleBlinking(!0),this.arrayPos===this.strings.length-1&&(this.complete(),!1===this.loop||this.curLoop===this.loopCount)||(this.timeout=setTimeout((function(){n.backspace(t,e)}),this.backDelay))}},{key:"backspace",value:function(t,e){var n=this;if(!0!==this.pause.status){if(this.fadeOut)return this.initFadeOut();this.toggleBlinking(!1);var s=this.humanizer(this.backSpeed);this.timeout=setTimeout((function(){e=o.htmlParser.backSpaceHtmlChars(t,e,n);var s=t.substr(0,e);if(n.replaceText(s),n.smartBackspace){var i=n.strings[n.arrayPos+1];i&&s===i.substr(0,e)?n.stopNum=e:n.stopNum=0}e>n.stopNum?(e--,n.backspace(t,e)):e<=n.stopNum&&(n.arrayPos++,n.arrayPos===n.strings.length?(n.arrayPos=0,n.options.onLastStringBackspaced(),n.shuffleStringsIfNeeded(),n.begin()):n.typewrite(n.strings[n.sequence[n.arrayPos]],e))}),s)}else this.setPauseStatus(t,e,!0)}},{key:"complete",value:function(){this.options.onComplete(this),this.loop?this.curLoop++:this.typingComplete=!0}},{key:"setPauseStatus",value:function(t,e,n){this.pause.typewrite=n,this.pause.curString=t,this.pause.curStrPos=e}},{key:"toggleBlinking",value:function(t){this.cursor&&(this.pause.status||this.cursorBlinking!==t&&(this.cursorBlinking=t,t?this.cursor.classList.add("typed-cursor--blink"):this.cursor.classList.remove("typed-cursor--blink")))}},{key:"humanizer",value:function(t){return Math.round(Math.random()*t/2)+t}},{key:"shuffleStringsIfNeeded",value:function(){this.shuffle&&(this.sequence=this.sequence.sort((function(){return Math.random()-.5})))}},{key:"initFadeOut",value:function(){var t=this;return this.el.className+=" "+this.fadeOutClass,this.cursor&&(this.cursor.className+=" "+this.fadeOutClass),setTimeout((function(){t.arrayPos++,t.replaceText(""),t.strings.length>t.arrayPos?t.typewrite(t.strings[t.sequence[t.arrayPos]],0):(t.typewrite(t.strings[0],0),t.arrayPos=0)}),this.fadeOutDelay)}},{key:"replaceText",value:function(t){this.attr?this.el.setAttribute(this.attr,t):this.isInput?this.el.value=t:"html"===this.contentType?this.el.innerHTML=t:this.el.textContent=t}},{key:"bindFocusEvents",value:function(){var t=this;this.isInput&&(this.el.addEventListener("focus",(function(e){t.stop()})),this.el.addEventListener("blur",(function(e){t.el.value&&0!==t.el.value.length||t.start()})))}},{key:"insertCursor",value:function(){this.showCursor&&(this.cursor||(this.cursor=document.createElement("span"),this.cursor.className="typed-cursor",this.cursor.innerHTML=this.cursorChar,this.el.parentNode&&this.el.parentNode.insertBefore(this.cursor,this.el.nextSibling)))}}]),t}();e.default=a,t.exports=e.default},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,n,s){return n&&t(e.prototype,n),s&&t(e,s),e}}(),a=n(2),r=(s=a)&&s.__esModule?s:{default:s},u=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return o(t,[{key:"load",value:function(t,e,n){if(t.el="string"==typeof n?document.querySelector(n):n,t.options=i({},r.default,e),t.isInput="input"===t.el.tagName.toLowerCase(),t.attr=t.options.attr,t.bindInputFocusEvents=t.options.bindInputFocusEvents,t.showCursor=!t.isInput&&t.options.showCursor,t.cursorChar=t.options.cursorChar,t.cursorBlinking=!0,t.elContent=t.attr?t.el.getAttribute(t.attr):t.el.textContent,t.contentType=t.options.contentType,t.typeSpeed=t.options.typeSpeed,t.startDelay=t.options.startDelay,t.backSpeed=t.options.backSpeed,t.smartBackspace=t.options.smartBackspace,t.backDelay=t.options.backDelay,t.fadeOut=t.options.fadeOut,t.fadeOutClass=t.options.fadeOutClass,t.fadeOutDelay=t.options.fadeOutDelay,t.isPaused=!1,t.strings=t.options.strings.map((function(t){return t.trim()})),"string"==typeof t.options.stringsElement?t.stringsElement=document.querySelector(t.options.stringsElement):t.stringsElement=t.options.stringsElement,t.stringsElement){t.strings=[],t.stringsElement.style.display="none";var s=Array.prototype.slice.apply(t.stringsElement.children),o=s.length;if(o)for(var a=0;a<o;a+=1){var u=s[a];t.strings.push(u.innerHTML.trim())}}for(var a in t.strPos=0,t.arrayPos=0,t.stopNum=0,t.loop=t.options.loop,t.loopCount=t.options.loopCount,t.curLoop=0,t.shuffle=t.options.shuffle,t.sequence=[],t.pause={status:!1,typewrite:!0,curString:"",curStrPos:0},t.typingComplete=!1,t.strings)t.sequence[a]=a;t.currentElContent=this.getCurrentElContent(t),t.autoInsertCss=t.options.autoInsertCss,this.appendAnimationCss(t)}},{key:"getCurrentElContent",value:function(t){return t.attr?t.el.getAttribute(t.attr):t.isInput?t.el.value:"html"===t.contentType?t.el.innerHTML:t.el.textContent}},{key:"appendAnimationCss",value:function(t){if(t.autoInsertCss&&(t.showCursor||t.fadeOut)&&!document.querySelector("[data-typed-js-css]")){var e=document.createElement("style");e.type="text/css",e.setAttribute("data-typed-js-css",!0);var n="";t.showCursor&&(n+="\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "),t.fadeOut&&(n+="\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      "),0!==e.length&&(e.innerHTML=n,document.body.appendChild(e))}}}]),t}();e.default=u;var c=new u;e.initializer=c},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,smartBackspace:!0,shuffle:!1,backDelay:700,fadeOut:!1,fadeOutClass:"typed-fade-out",fadeOutDelay:500,loop:!1,loopCount:1/0,showCursor:!0,cursorChar:"|",autoInsertCss:!0,attr:null,bindInputFocusEvents:!1,contentType:"html",onBegin:function(t){},onComplete:function(t){},preStringTyped:function(t,e){},onStringTyped:function(t,e){},onLastStringBackspaced:function(t){},onTypingPaused:function(t,e){},onTypingResumed:function(t,e){},onReset:function(t){},onStop:function(t,e){},onStart:function(t,e){},onDestroy:function(t){}};e.default=n,t.exports=e.default},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,n,s){return n&&t(e.prototype,n),s&&t(e,s),e}}(),s=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return n(t,[{key:"typeHtmlChars",value:function(t,e,n){if("html"!==n.contentType)return e;var s=t.substr(e).charAt(0);if("<"===s||"&"===s){var i="";for(i="<"===s?">":";";t.substr(e+1).charAt(0)!==i&&!(++e+1>t.length););e++}return e}},{key:"backSpaceHtmlChars",value:function(t,e,n){if("html"!==n.contentType)return e;var s=t.substr(e).charAt(0);if(">"===s||";"===s){var i="";for(i=">"===s?"<":"&";t.substr(e-1).charAt(0)!==i&&!(--e<0););e--}return e}}]),t}();e.default=s;var i=new s;e.htmlParser=i}])},t.exports=s()},function(t,e,n){n(3),t.exports=n(2)},function(t,e,n){},function(t,e,n){"use strict";var s,i;n.r(e),function(t){t.on=function(t,e,n,s,i){let o=!1;if("string"==typeof t){const a=(null!=i?i:document).querySelectorAll(t);for(const t of a)t.addEventListener(e,n,null!=s&&s);return{dispose:()=>{if(!o){o=!0;for(const t of a)t.removeEventListener(e,n,null!=s&&s)}}}}return t.addEventListener(e,n,null!=s&&s),{dispose:()=>{o||(o=!0,t.removeEventListener(e,n,null!=s&&s))}}},t.$=function(t){return document.querySelectorAll(t)}}(s||(s={})),function(t){t.clear=function(){localStorage.clear()},t.get=function(t){const e=localStorage.getItem(t);if(null!=e)return JSON.parse(e)},t.remove=function(t){localStorage.removeItem(t)},t.set=function(t,e){localStorage.setItem(t,JSON.stringify(e))}}(i||(i={}));var o,a=n(0),r=n.n(a);class u{constructor(){this.typingCompleted=!1}activate(t){t?setTimeout(()=>this.startSubheadTyping(),1e3):this.startSubheadTyping()}pause(){return(void 0!==this.typingSubhead||void 0!==this.typingDesc)&&(this.typingSubhead&&this.typingSubhead.stop(),this.typingDesc&&this.typingDesc.stop(),!0)}resume(){return(void 0!==this.typingSubhead||void 0!==this.typingDesc)&&(setTimeout(()=>{this.typingSubhead&&this.typingSubhead.start(),this.typingDesc&&this.typingDesc.start()},1e3),!0)}onSubheadTypingCompleted(t){setTimeout(()=>{this.typingSubhead.destroy(),this.typingSubhead=void 0,document.getElementById("subhead").innerText=t[t.length-1],this.startDescTyping()},750)}onDescTypingCompleted(t){this.typingCompleted=!0;const e=document.querySelectorAll('[data-target="hero-button"]');for(const t of e)t.classList.remove("hidden");setTimeout(()=>{this.typingDesc.destroy(),this.typingDesc=void 0,document.getElementById("desc").innerHTML=t[t.length-1]},1e3)}startSubheadTyping(){const t=["entrepreneur","leader","innovator","architect","developer."],e={strings:t,autoInsertCss:!1,backDelay:1500,backSpeed:30,typeSpeed:90,onComplete:()=>this.onSubheadTypingCompleted(t)};this.typingSubhead=new r.a("#subhead",e)}startDescTyping(){const t=['full-stack<br /><span class="heart">&#10084;</span> open-source'],e={strings:t,autoInsertCss:!1,backDelay:1500,backSpeed:30,typeSpeed:90,onComplete:()=>this.onDescTypingCompleted(t)};this.typingDesc=new r.a("#desc",e)}}class c{constructor(t){this.name=t,s.on(`[data-action="${this.name}"]`,"click",this.onButtonClicked.bind(this))}get hash(){return`#${this.name}`}activate(t){}deactivate(){}getHash(t){return`${this.hash}${t?`${t.startsWith("/")?t:`/${t}`}`:""}`.toLowerCase()}matchesPath(t){var e;return(null===(e=document.location.hash)||void 0===e?void 0:e.toLowerCase())===this.getHash(t)}setPath(t){document.location.hash=this.getHash(t)}onButtonClicked(t){var e;(null===(e=document.location.hash)||void 0===e?void 0:e.startsWith(this.hash))?document.location.hash="":this.setPath()}}!function(t){t[t.OneDollar=1]="OneDollar",t[t.TwoDollars=2]="TwoDollars",t[t.ThreePlusDollars=3]="ThreePlusDollars"}(o||(o={}));class l extends c{constructor(t){super(t),this.name=t,this._initialLoad=!0,s.on(document.body,"click",this.onBodyClicked.bind(this)),s.on('[data-action="pure-donate-close-button"]',"click",this.onCloseButtonClicked.bind(this)),s.on('[data-action="pure-donate-button"]',"click",this.onDonateButtonClicked.bind(this)),s.on('[data-action="pure-tier"]',"click",this.onTierClicked.bind(this)),s.on('[data-action="watch-toggle"]',"click",this.onWatchClicked.bind(this)),[this.$donatePopup]=s.$('[data-target="pure-donate-popup"]');const e=i.get("pure-donation");if(void 0===e)return;const[n]=s.$('[data-target="pure-donated-on"]');if(null==n){const t=document.createElement("template");t.innerHTML=`<p class="donated" data-target="pure-donated-on">\n\tYou donated on ${new Date(e.timestamp).toLocaleDateString()}. Thank you!\n</p>`,this.$donatePopup.prepend(t.content.firstChild)}this.updateDonation(s.$('[data-target="pure-donate-code-container"]')[0],s.$('[data-target="pure-donate-code"]')[0])}activate(t){var e;super.activate(t);const n=this._initialLoad;this._initialLoad=!1;const[o]=s.$('[data-target="email"]');o&&(o.href="mailto:eamodio+pure@gmail.com?subject=Pure Clock Face"),null===(e=s.$('[data-action="watch-toggle"]')[0])||void 0===e||e.classList.remove("expand");const[a,...r]=null!=t?t:[];switch(a){case"donate":{const[t]=r;if("reset"===t)return i.clear(),this.setPath("donate"),void location.reload();let e;if([e]=s.$(`[data-target="donate-scroll-to${document.documentElement.clientHeight>840?"-tall":""}"]`),null==e||e.scrollIntoView({behavior:"smooth",block:"start"}),!t){const t=i.get("pure-donation");return void(void 0!==(null==t?void 0:t.tier)&&n?this.setPath(`/donate/${t.tier}`):this.setActiveTier(void 0))}const[o]=s.$(`[data-tier="${t}"]`),a=o.dataset.tierName,u=o.dataset.tierAmount;[e]=s.$('[data-target="pure-donate-button"]'),e.href=`https://www.paypal.com/paypalme2/eamodio${null==u?"":`/${u}`}`,e.innerHTML=`Donate ${a?`${a} `:""}<span class="via">via</span> PayPal`,this.setActiveTier((null==o?void 0:o.classList.contains("active"))?void 0:Number(t),o);break}default:this.setActiveTier(void 0)}}deactivate(){super.deactivate();const[t]=s.$('[data-target="email"]');t&&(t.href="mailto:eric@amod.io")}onBodyClicked(t){var e;null===(e=s.$('[data-action="watch-toggle"]')[0])||void 0===e||e.classList.remove("expand")}onCloseButtonClicked(t){this.setPath("/donate")}onDonateButtonClicked(t){t.stopPropagation();const e={timestamp:(new Date).getTime(),tier:this._tier,version:1};i.set("pure-donation",e),this.update()}onTierClicked(t){var e;t.stopPropagation();const n=null===(e=t.currentTarget)||void 0===e?void 0:e.dataset.tier,s=`/donate${n?`/${n}`:""}`;this.setPath(this.matchesPath(s)?"/donate":s)}onWatchClicked(t){var e;t.stopPropagation(),null===(e=t.currentTarget)||void 0===e||e.classList.toggle("expand")}setActiveTier(t,e){this._tier=t;const n=s.$('[data-action="pure-tier"]');for(const t of n)t.classList.remove("active");null==t?this.$donatePopup.classList.add("hide"):(null==e||e.classList.add("active"),this.$donatePopup.classList.remove("hide"))}update(){var t;if(null===(t=this._donateDisposable)||void 0===t||t.dispose(),void 0===i.get("pure-donation"))return;const[e]=s.$('[data-target="pure-donate-code-container"]'),[n]=s.$('[data-target="pure-donate-code"]');let o,a=0,r=0,u=0;const c=s.on(document,"visibilitychange",()=>{document.hidden||(c.dispose(),e.dataset.status="pending",a=setTimeout(()=>{e.dataset.status="still-pending",o=s.on(n,"click",()=>{null==o||o.dispose(),clearTimeout(u),e.dataset.status="pending",r=setTimeout(()=>this.updateDonation(e,n),1e3)}),u=setTimeout(()=>{null==o||o.dispose(),this.updateDonation(e,n)},2e4)},1e4))});this._donateDisposable={dispose:()=>{clearTimeout(a),clearTimeout(r),clearTimeout(u),c.dispose(),null==o||o.dispose()}}}updateDonation(t,e){const n=new Date,s=`${n.getUTCFullYear().toString().substr(2)}${n.getUTCMonth().toString(16)}`;t.dataset.status="donated",e.textContent=s}}const d=/^is-section\S*/;new class{constructor(){this.activeView="",this.main=new u,this.views=[];for(const t of document.querySelectorAll(".section[data-view]")){const e=t.dataset.view;if(void 0===e)continue;const n="pure"===e?l:c;this.views.push(new n(e))}s.on('[data-action="marvin"]',"click",this.onMarvinClicked.bind(this)),s.on('[data-action="back"]',"click",this.onBackButtonClicked.bind(this)),window.addEventListener("hashchange",this.onHashChanged.bind(this),!1);const[t,e]=this.getHashAndPaths();this.switchView(t,e,!0),setTimeout(()=>{document.body.classList.remove("preload")},750)}switchView(t,e,n=!1){const s=this.activeView,i=document.body.classList;switch(t){case"":if(this.activeView="",s!==this.activeView){const t=this.views.find(t=>t.name===s);null!=t&&t.deactivate()}if(n||(i.remove(...[...i].filter(t=>d.test(t))),document.location.hash=""),this.main.typingCompleted)break;if(this.main.resume())break;this.main.activate(s);break;default:{const n=this.views.find(e=>e.name===t);if(null==n)return void this.switchView("",[],!1);if(this.activeView=t,s!==this.activeView){const t=this.views.find(t=>t.name===s);null!=t&&t.deactivate()}this.main.pause();const o=`is-section--${t}`;if(i.contains(o))return void n.activate(e);i.contains("is-section")&&i.remove(...[...i].filter(t=>d.test(t))),i.add("is-section",o),n.activate(e);break}}}onBackButtonClicked(t){document.location.hash=""}onHashChanged(t){const[e,n]=this.getHashAndPaths();this.switchView(e,n)}getHashAndPaths(){var t;let e=null===(t=document.location.hash)||void 0===t?void 0:t.substring(1),n=[];return e&&([e,...n]=e.split("/")),[e,n]}onMarvinClicked(t){const e=document.createElement("template");e.innerHTML='<div class="marvin">\n\t<audio id="kaboom" autoplay><source src="assets/kaboom.mp3"></audio>\n</div>';const n=document.body.appendChild(e.content.firstChild);n.addEventListener("click",()=>document.body.removeChild(n),!1)}}}]);