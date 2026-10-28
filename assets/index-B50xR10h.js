var qm=Object.defineProperty;var $m=(r,t,e)=>t in r?qm(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var Bt=(r,t,e)=>$m(r,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();var Bu="1.3.27";function Od(r,t,e){return Math.max(r,Math.min(t,e))}function Zm(r,t,e){return(1-e)*r+e*t}function Jm(r,t,e,n){return Zm(r,t,1-Math.exp(-e*n))}function Km(r,t){return(r%t+t)%t}var jm=class{constructor(){Bt(this,"isRunning",!1);Bt(this,"value",0);Bt(this,"from",0);Bt(this,"to",0);Bt(this,"currentTime",0);Bt(this,"lerp");Bt(this,"duration");Bt(this,"easing");Bt(this,"onUpdate")}advance(r){var e;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=Od(0,this.currentTime/this.duration,1);t=n>=1;const i=t?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=Jm(this.value,this.to,this.lerp*60,r),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(e=this.onUpdate)==null||e.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(r,t,{lerp:e,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=t,this.lerp=e,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function Qm(r,t){let e;return function(...n){clearTimeout(e),e=setTimeout(()=>{e=void 0,r.apply(this,n)},t)}}var t0=class{constructor(r,t,{autoResize:e=!0,debounce:n=250}={}){Bt(this,"width",0);Bt(this,"height",0);Bt(this,"scrollHeight",0);Bt(this,"scrollWidth",0);Bt(this,"debouncedResize");Bt(this,"wrapperResizeObserver");Bt(this,"contentResizeObserver");Bt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Bt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Bt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=t,e&&(this.debouncedResize=Qm(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,t;(r=this.wrapperResizeObserver)==null||r.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Fd=class{constructor(){Bt(this,"events",{})}emit(r,...t){var n;const e=this.events[r]||[];for(let i=0,s=e.length;i<s;i++)(n=e[i])==null||n.call(e,...t)}on(r,t){return this.events[r]?this.events[r].push(t):this.events[r]=[t],()=>{var e;this.events[r]=(e=this.events[r])==null?void 0:e.filter(n=>t!==n)}}off(r,t){var e;this.events[r]=(e=this.events[r])==null?void 0:e.filter(n=>t!==n)}destroy(){this.events={}}};const e0=100/6,Qi={passive:!1};function zu(r,t){return r===1?e0:r===2?t:1}var n0=class{constructor(r,t={wheelMultiplier:1,touchMultiplier:1}){Bt(this,"touchStart",{x:0,y:0});Bt(this,"lastDelta",{x:0,y:0});Bt(this,"window",{width:0,height:0});Bt(this,"emitter",new Fd);Bt(this,"onTouchStart",r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Bt(this,"onTouchMove",r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r,n=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Bt(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Bt(this,"onWheel",r=>{let{deltaX:t,deltaY:e,deltaMode:n}=r;const i=zu(n,this.window.width),s=zu(n,this.window.height);t*=i,e*=s,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:r})});Bt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Qi),this.element.addEventListener("touchstart",this.onTouchStart,Qi),this.element.addEventListener("touchmove",this.onTouchMove,Qi),this.element.addEventListener("touchend",this.onTouchEnd,Qi)}on(r,t){return this.emitter.on(r,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Qi),this.element.removeEventListener("touchstart",this.onTouchStart,Qi),this.element.removeEventListener("touchmove",this.onTouchMove,Qi),this.element.removeEventListener("touchend",this.onTouchEnd,Qi)}};const ku=r=>Math.min(1,1.001-2**(-10*r));var i0=class{constructor({wrapper:r=window,content:t=document.documentElement,eventsTarget:e=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:h=!1,orientation:u="vertical",gestureOrientation:f=u==="horizontal"?"both":"vertical",touchMultiplier:d=1,wheelMultiplier:p=1,autoResize:_=!0,prevent:g,virtualScroll:m,overscroll:y=!0,autoRaf:x=!1,anchors:v=!1,autoToggle:C=!1,allowNestedScroll:b=!1,__experimental__naiveDimensions:w=!1,naiveDimensions:R=w,stopInertiaOnNavigate:S=!1,respectReducedMotion:M=!0}={}){Bt(this,"_isScrolling",!1);Bt(this,"_isStopped",!1);Bt(this,"_isLocked",!1);Bt(this,"_preventNextNativeScrollEvent",!1);Bt(this,"_resetVelocityTimeout",null);Bt(this,"_rafId",null);Bt(this,"_isDraggingSelection",!1);Bt(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));Bt(this,"isTouching");Bt(this,"isIos");Bt(this,"time",0);Bt(this,"userData",{});Bt(this,"lastVelocity",0);Bt(this,"velocity",0);Bt(this,"direction",0);Bt(this,"options");Bt(this,"targetScroll");Bt(this,"animatedScroll");Bt(this,"animate",new jm);Bt(this,"emitter",new Fd);Bt(this,"dimensions");Bt(this,"virtualScroll");Bt(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Bt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Bt(this,"onTransitionEnd",r=>{var t;(t=r.propertyName)!=null&&t.includes("overflow")&&r.target===this.rootElement&&this.checkOverflow()});Bt(this,"onClick",r=>{const t=r.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),e=new URL(window.location.href);if(this.options.anchors){const n=t.find(i=>e.host===i.host&&e.pathname===i.pathname&&i.hash);if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=decodeURIComponent(n.hash);this.scrollTo(s,i);return}}if(this.options.stopInertiaOnNavigate&&t.some(n=>e.host===n.host&&e.pathname!==n.pathname)){this.reset();return}});Bt(this,"onPointerDown",r=>{r.button===1&&this.reset()});Bt(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:t,deltaY:e,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");if(i&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=t===0&&e===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,h=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(p=>{var _,g,m,y,x;return p instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(p))||((_=p.hasAttribute)==null?void 0:_.call(p,"data-lenis-prevent"))||h==="vertical"&&((g=p.hasAttribute)==null?void 0:g.call(p,"data-lenis-prevent-vertical"))||h==="horizontal"&&((m=p.hasAttribute)==null?void 0:m.call(p,"data-lenis-prevent-horizontal"))||i&&((y=p.hasAttribute)==null?void 0:y.call(p,"data-lenis-prevent-touch"))||s&&((x=p.hasAttribute)==null?void 0:x.call(p,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(p,{deltaX:t,deltaY:e}))}))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let u=e;this.options.gestureOrientation==="both"?u=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(u=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const f=i&&this.options.syncTouch,d=i&&n.type==="touchend";d&&(u=Math.sign(u)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+u,{programmatic:!1,...f?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Bt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Bt(this,"raf",r=>{const t=r-(this.time||r);this.time=r,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Bu,window.lenis||(window.lenis={}),window.lenis.version=Bu,u==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=ku:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:t,eventsTarget:e,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:h,gestureOrientation:f,orientation:u,touchMultiplier:d,wheelMultiplier:p,autoResize:_,prevent:g,virtualScroll:m,overscroll:y,autoRaf:x,anchors:v,autoToggle:C,allowNestedScroll:b,naiveDimensions:R,stopInertiaOnNavigate:S,respectReducedMotion:M},this.dimensions=new t0(r,t,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new n0(e,{touchMultiplier:d,wheelMultiplier:p}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(r,t){return this.emitter.on(r,t)}off(r,t){return this.emitter.off(r,t)}get overflow(){const r=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[r]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}isTouchOnSelectionHandle(r){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=r.targetTouches[0]??r.changedTouches[0];if(!e)return!1;const n=t.getRangeAt(0).getClientRects();if(n.length===0)return!1;const i=n[0],s=n[n.length-1],o=40,a=Math.hypot(e.clientX-i.left,e.clientY-i.top)<=o,l=Math.hypot(e.clientX-s.right,e.clientY-s.bottom)<=o;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:t=0,immediate:e=!1,lock:n=!1,programmatic:i=!0,lerp:s=i?this.options.lerp:void 0,duration:o=i?this.options.duration:void 0,easing:a=i?this.options.easing:void 0,onStart:l,onComplete:c,force:h=!1,userData:u}={}){if(this.prefersReducedMotion&&(i?e=!0:(s=1,o=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!h)return;let f=r,d=t;if(typeof f=="string"&&["top","left","start","#"].includes(f))f=0;else if(typeof f=="string"&&["bottom","right","end"].includes(f))f=this.limit;else{let p=null;if(typeof f=="string"?(p=f.startsWith("#")?document.getElementById(f.slice(1)):document.querySelector(f),p||(f==="#top"?f=0:console.warn("Lenis: Target not found",f))):f instanceof Element&&(p=f),p){if(this.options.wrapper!==window){const v=this.rootElement.getBoundingClientRect();d-=this.isHorizontal?v.left:v.top}const _=p.getBoundingClientRect(),g=getComputedStyle(p),m=this.isHorizontal?Number.parseFloat(g.scrollMarginLeft):Number.parseFloat(g.scrollMarginTop),y=getComputedStyle(this.rootElement),x=this.isHorizontal?Number.parseFloat(y.scrollPaddingLeft):Number.parseFloat(y.scrollPaddingTop);f=(this.isHorizontal?_.left:_.top)+this.animatedScroll-(Number.isNaN(m)?0:m)-(Number.isNaN(x)?0:x)}}if(typeof f=="number"){if(f+=d,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;const p=f-this.animatedScroll;p>this.limit/2?f-=this.limit:p<-this.limit/2&&(f+=this.limit)}}else f=Od(0,f,this.limit);if(f===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=u??{},e){this.animatedScroll=this.targetScroll=f,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=f),typeof o=="number"&&typeof a!="function"?a=ku:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,f,{duration:o,easing:a,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(p,_)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=p-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=p,this.setScroll(this.scroll),i&&(this.targetScroll=p),_||this.emit(),_&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(r,{deltaX:t,deltaY:e}){const n=Date.now();r._lenis||(r._lenis={});const i=r._lenis;let s,o,a,l,c,h,u,f,d,p;if(n-(i.time??0)>2e3){i.time=Date.now();const b=window.getComputedStyle(r);if(i.computedStyle=b,s=["auto","overlay","scroll"].includes(b.overflowX),o=["auto","overlay","scroll"].includes(b.overflowY),c=["auto"].includes(b.overscrollBehaviorX),h=["auto"].includes(b.overscrollBehaviorY),i.hasOverflowX=s,i.hasOverflowY=o,!(s||o))return!1;u=r.scrollWidth,f=r.scrollHeight,d=r.clientWidth,p=r.clientHeight,a=u>d,l=f>p,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=u,i.scrollHeight=f,i.clientWidth=d,i.clientHeight=p,i.hasOverscrollBehaviorX=c,i.hasOverscrollBehaviorY=h}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,u=i.scrollWidth,f=i.scrollHeight,d=i.clientWidth,p=i.clientHeight,c=i.hasOverscrollBehaviorX,h=i.hasOverscrollBehaviorY;if(!(s&&a||o&&l))return!1;const _=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let g,m,y,x,v,C;if(_==="horizontal")g=Math.round(r.scrollLeft),m=u-d,y=t,x=s,v=a,C=c;else if(_==="vertical")g=Math.round(r.scrollTop),m=f-p,y=e,x=o,v=l,C=h;else return!1;return!C&&(g>=m||g<=0)?!0:(y>0?g<m:g>0)&&x&&v}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?Km(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(r=>{this.rootElement.classList.add(r)})}cleanUpClassName(){for(const r of Array.from(this.rootElement.classList))(r==="lenis"||r.startsWith("lenis-"))&&this.rootElement.classList.remove(r)}};function ki(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Bd(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Kn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ko={duration:.5,overwrite:!1,delay:0},Zh,cn,Oe,ai=1e8,Ae=1/ai,Nc=Math.PI*2,r0=Nc/4,s0=0,zd=Math.sqrt,o0=Math.cos,a0=Math.sin,on=function(t){return typeof t=="string"},He=function(t){return typeof t=="function"},$i=function(t){return typeof t=="number"},Jh=function(t){return typeof t>"u"},Pi=function(t){return typeof t=="object"},Ln=function(t){return t!==!1},Kh=function(){return typeof window<"u"},da=function(t){return He(t)||on(t)},kd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},_n=Array.isArray,l0=/random\([^)]+\)/g,c0=/,\s*/g,Gu=/(?:-?\.?\d|\.)+/gi,Gd=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Is=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,zl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Hd=/[+-]=-?[.\d]+/,h0=/[^,'"\[\]\s]+/gi,u0=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ze,Mi,Oc,jh,Qn={},pl={},Vd,Wd=function(t){return(pl=$s(t,Qn))&&On},Qh=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},jo=function(t,e){return!e&&console.warn(t)},Xd=function(t,e){return t&&(Qn[t]=e)&&pl&&(pl[t]=e)||Qn},Qo=function(){return 0},f0={suppressEvents:!0,isStart:!0,kill:!1},Qa={suppressEvents:!0,kill:!1},d0={suppressEvents:!0},tu={},pr=[],Fc={},Yd,Wn={},kl={},Hu=30,tl=[],eu="",nu=function(t){var e=t[0],n,i;if(Pi(e)||He(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=tl.length;i--&&!tl[i].targetTest(e););n=tl[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new pp(t[i],n)))||t.splice(i,1);return t},$r=function(t){return t._gsap||nu(li(t))[0]._gsap},qd=function(t,e,n){return(n=t[e])&&He(n)?t[e]():Jh(n)&&t.getAttribute&&t.getAttribute(e)||n},Dn=function(t,e){return(t=t.split(",")).forEach(e)||t},Ve=function(t){return Math.round(t*1e5)/1e5||0},Be=function(t){return Math.round(t*1e7)/1e7||0},Bs=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},p0=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},ml=function(){var t=pr.length,e=pr.slice(0),n,i;for(Fc={},pr.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},iu=function(t){return!!(t._initted||t._startAt||t.add)},$d=function(t,e,n,i){pr.length&&!cn&&ml(),t.render(e,n,!!(cn&&e<0&&iu(t))),pr.length&&!cn&&ml()},Zd=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(h0).length<2?e:on(t)?t.trim():t},Jd=function(t){return t},ti=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},m0=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},$s=function(t,e){for(var n in e)t[n]=e[n];return t},Vu=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Pi(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},gl=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},Oo=function(t){var e=t.parent||ze,n=t.keyframes?m0(_n(t.keyframes)):ti;if(Ln(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},g0=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Kd=function(t,e,n,i,s){var o=t[i],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},Pl=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},Mr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Zr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},_0=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Bc=function(t,e,n,i){return t._startAt&&(cn?t._startAt.revert(Qa):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},v0=function r(t){return!t||t._ts&&r(t.parent)},Wu=function(t){return t._repeat?Zs(t._tTime,t=t.duration()+t._rDelay)*t:0},Zs=function(t,e){var n=Math.floor(t=Be(t/e));return t&&n===t?n-1:n},_l=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Ll=function(t){return t._end=Be(t._start+(t._tDur/Math.abs(t._ts||t._rts||Ae)||0))},Dl=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Be(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Ll(t),n._dirty||Zr(n,t)),t},jd=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=_l(t.rawTime(),e),(!e._dur||ua(0,e.totalDuration(),n)-e._tTime>Ae)&&e.render(n,!0)),Zr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-Ae}},Ei=function(t,e,n,i){return e.parent&&Mr(e),e._start=Be(($i(n)?n:n||t!==ze?ii(t,n,e):t._time)+e._delay),e._end=Be(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Kd(t,e,"_first","_last",t._sort?"_start":0),zc(e)||(t._recent=e),i||jd(t,e),t._ts<0&&Dl(t,t._tTime),t},Qd=function(t,e){return(Qn.ScrollTrigger||Qh("scrollTrigger",e))&&Qn.ScrollTrigger.create(e,t)},tp=function(t,e,n,i,s){if(su(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!cn&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Yd!==qn.frame)return pr.push(t),t._lazy=[s,i],1},x0=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},zc=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},M0=function(t,e,n,i){var s=t.ratio,o=e<0||!e&&(!t._start&&x0(t)&&!(!t._initted&&zc(t))||(t._ts<0||t._dp._ts<0)&&!zc(t))?0:1,a=t._rDelay,l=0,c,h,u;if(a&&t._repeat&&(l=ua(0,t._tDur,e),h=Zs(l,a),t._yoyo&&h&1&&(o=1-o),h!==Zs(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||cn||i||t._zTime===Ae||!e&&t._zTime){if(!t._initted&&tp(t,e,i,n,l))return;for(u=t._zTime,t._zTime=e||(n?Ae:0),n||(n=e&&!u),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&Bc(t,e,n,!0),t._onUpdate&&!n&&Zn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&Zn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&Mr(t,1),!n&&!cn&&(Zn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},y0=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Js=function(t,e,n,i){var s=t._repeat,o=Be(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:Be(o*(s+1)+t._rDelay*s):o,a>0&&!i&&Dl(t,t._tTime=t._tDur*a),t.parent&&Ll(t),n||Zr(t.parent,t),t},Xu=function(t){return t instanceof Pn?Zr(t):Js(t,t._dur)},S0={_start:0,endTime:Qo,totalDuration:Qo},ii=function r(t,e,n){var i=t.labels,s=t._recent||S0,o=t.duration()>=ai?s.endTime(!1):t._dur,a,l,c;return on(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(_n(n)?n[0]:n).totalDuration()),a>1?r(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},Fo=function(t,e,n){var i=$i(e[1]),s=(i?2:1)+(t<2?0:1),o=e[s],a,l;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Ln(l.vars.inherit)&&l.parent;o.immediateRender=Ln(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new $e(e[0],o,e[s+1])},br=function(t,e){return t||t===0?e(t):e},ua=function(t,e,n){return n<t?t:n>e?e:n},mn=function(t,e){return!on(t)||!(e=u0.exec(t))?"":e[1]},w0=function(t,e,n){return br(n,function(i){return ua(t,e,i)})},kc=[].slice,ep=function(t,e){return t&&Pi(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Pi(t[0]))&&!t.nodeType&&t!==Mi},E0=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return on(i)&&!e||ep(i,1)?(s=n).push.apply(s,li(i)):n.push(i)})||n},li=function(t,e,n){return Oe&&!e&&Oe.selector?Oe.selector(t):on(t)&&!n&&(Oc||!Ks())?kc.call((e||jh).querySelectorAll(t),0):_n(t)?E0(t,n):ep(t)?kc.call(t,0):t?[t]:[]},Gc=function(t){return t=li(t)[0]||jo("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return li(e,n.querySelectorAll?n:n===t?jo("Invalid scope")||jh.createElement("div"):t)}},np=function(t){return t.sort(function(){return .5-Math.random()})},ip=function(t){if(He(t))return t;var e=Pi(t)?t:{each:t},n=Jr(e.ease),i=e.from||0,s=parseFloat(e.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=e.axis,h=i,u=i;return on(i)?h=u={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(h=i[0],u=i[1]),function(f,d,p){var _=(p||e).length,g=o[_],m,y,x,v,C,b,w,R,S;if(!g){if(S=e.grid==="auto"?0:(e.grid||[1,ai])[1],!S){for(w=-ai;w<(w=p[S++].getBoundingClientRect().left)&&S<_;);S<_&&S--}for(g=o[_]=[],m=l?Math.min(S,_)*h-.5:i%S,y=S===ai?0:l?_*u/S-.5:i/S|0,w=0,R=ai,b=0;b<_;b++)x=b%S-m,v=y-(b/S|0),g[b]=C=c?Math.abs(c==="y"?v:x):zd(x*x+v*v),C>w&&(w=C),C<R&&(R=C);i==="random"&&np(g),g.max=w-R,g.min=R,g.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(S>_?_-1:c?c==="y"?_/S:S:Math.max(S,_/S))||0)*(i==="edges"?-1:1),g.b=_<0?s-_:s,g.u=mn(e.amount||e.each)||0,n=n&&_<0?F0(n):n}return _=(g[f]-g.min)/g.max||0,Be(g.b+(n?n(_):_)*g.v)+g.u}},Hc=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Be(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+($i(n)?0:mn(n))}},rp=function(t,e){var n=_n(t),i,s;return!n&&Pi(t)&&(i=n=t.radius||ai,t.values?(t=li(t.values),(s=!$i(t[0]))&&(i*=i)):t=Hc(t.increment)),br(e,n?He(t)?function(o){return s=t(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=ai,h=0,u=t.length,f,d;u--;)s?(f=t[u].x-a,d=t[u].y-l,f=f*f+d*d):f=Math.abs(t[u]-a),f<c&&(c=f,h=u);return h=!i||c<=i?t[h]:o,s||h===o||$i(o)?h:h+mn(o)}:Hc(t))},sp=function(t,e,n,i){return br(_n(t)?!e:n===!0?!!(n=0):!i,function(){return _n(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},T0=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,o){return o(s)},i)}},b0=function(t,e){return function(n){return t(parseFloat(n))+(e||mn(n))}},A0=function(t,e,n){return ap(t,e,0,1,n)},op=function(t,e,n){return br(n,function(i){return t[~~e(i)]})},C0=function r(t,e,n){var i=e-t;return _n(t)?op(t,r(0,t.length),e):br(n,function(s){return(i+(s-t)%i)%i+t})},R0=function r(t,e,n){var i=e-t,s=i*2;return _n(t)?op(t,r(0,t.length-1),e):br(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>i?s-o:o)})},ta=function(t){return t.replace(l0,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(c0);return sp(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},ap=function(t,e,n,i,s){var o=e-t,a=i-n;return br(s,function(l){return n+((l-t)/o*a||0)})},P0=function r(t,e,n,i){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var o=on(t),a={},l,c,h,u,f;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(_n(t)&&!_n(e)){for(h=[],u=t.length,f=u-2,c=1;c<u;c++)h.push(r(t[c-1],t[c]));u--,s=function(p){p*=u;var _=Math.min(f,~~p);return h[_](p-_)},n=e}else i||(t=$s(_n(t)?[]:{},t));if(!h){for(l in e)ru.call(a,t,l,"get",e[l]);s=function(p){return lu(p,a)||(o?t.p:t)}}}return br(n,s)},Yu=function(t,e,n){var i=t.labels,s=ai,o,a,l;for(o in i)a=i[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Zn=function(t,e,n){var i=t.vars,s=i[e],o=Oe,a=t._ctx,l,c,h;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&pr.length&&ml(),a&&(Oe=a),h=l?s.apply(c,l):s.call(c),Oe=o,h},Ao=function(t){return Mr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!cn),t.progress()<1&&Zn(t,"onInterrupt"),t},Us,lp=[],cp=function(t){if(t)if(t=!t.name&&t.default||t,Kh()||t.headless){var e=t.name,n=He(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:Qo,render:lu,add:ru,kill:q0,modifier:Y0,rawVars:0},o={targetTest:0,get:0,getSetter:au,aliases:{},register:0};if(Ks(),t!==i){if(Wn[e])return;ti(i,ti(gl(t,s),o)),$s(i.prototype,$s(s,gl(t,o))),Wn[i.prop=e]=i,t.targetTest&&(tl.push(i),tu[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Xd(e,i),t.register&&t.register(On,i,In)}else lp.push(t)},be=255,Co={aqua:[0,be,be],lime:[0,be,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,be],navy:[0,0,128],white:[be,be,be],olive:[128,128,0],yellow:[be,be,0],orange:[be,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[be,0,0],pink:[be,192,203],cyan:[0,be,be],transparent:[be,be,be,0]},Gl=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*be+.5|0},hp=function(t,e,n){var i=t?$i(t)?[t>>16,t>>8&be,t&be]:0:Co.black,s,o,a,l,c,h,u,f,d,p;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Co[t])i=Co[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&be,i&be,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&be,t&be]}else if(t.substr(0,3)==="hsl"){if(i=p=t.match(Gu),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,o=h<=.5?h*(c+1):h+c-h*c,s=h*2-o,i.length>3&&(i[3]*=1),i[0]=Gl(l+1/3,s,o),i[1]=Gl(l,s,o),i[2]=Gl(l-1/3,s,o);else if(~t.indexOf("="))return i=t.match(Gd),n&&i.length<4&&(i[3]=1),i}else i=t.match(Gu)||Co.transparent;i=i.map(Number)}return e&&!p&&(s=i[0]/be,o=i[1]/be,a=i[2]/be,u=Math.max(s,o,a),f=Math.min(s,o,a),h=(u+f)/2,u===f?l=c=0:(d=u-f,c=h>.5?d/(2-u-f):d/(u+f),l=u===s?(o-a)/d+(o<a?6:0):u===o?(a-s)/d+2:(s-o)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},up=function(t){var e=[],n=[],i=-1;return t.split(mr).forEach(function(s){var o=s.match(Is)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},qu=function(t,e,n){var i="",s=(t+i).match(mr),o=e?"hsla(":"rgba(",a=0,l,c,h,u;if(!s)return t;if(s=s.map(function(f){return(f=hp(f,e,1))&&o+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(h=up(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(mr,"1").split(Is),u=c.length-1;a<u;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=t.split(mr),u=c.length-1;a<u;a++)i+=c[a]+s[a];return i+c[u]},mr=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Co)r+="|"+t+"\\b";return new RegExp(r+")","gi")})(),L0=/hsl[a]?\(/,fp=function(t){var e=t.join(" "),n;if(mr.lastIndex=0,mr.test(e))return n=L0.test(e),t[1]=qu(t[1],n),t[0]=qu(t[0],n,up(t[1])),!0},ea,qn=(function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,h,u,f,d,p=function _(g){var m=r()-i,y=g===!0,x,v,C,b;if((m>t||m<0)&&(n+=m-e),i+=m,C=i-n,x=C-o,(x>0||y)&&(b=++u.frame,f=C-u.time*1e3,u.time=C=C/1e3,o+=x+(x>=s?4:s-x),v=1),y||(l=c(_)),v)for(d=0;d<a.length;d++)a[d](C,f,b,g)};return u={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(g){return f/(1e3/(g||60))},wake:function(){Vd&&(!Oc&&Kh()&&(Mi=Oc=window,jh=Mi.document||{},Qn.gsap=On,(Mi.gsapVersions||(Mi.gsapVersions=[])).push(On.version),Wd(pl||Mi.GreenSockGlobals||!Mi.gsap&&Mi||{}),lp.forEach(cp)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&u.sleep(),c=h||function(g){return setTimeout(g,o-u.time*1e3+1|0)},ea=1,p(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),ea=0,c=Qo},lagSmoothing:function(g,m){t=g||1/0,e=Math.min(m||33,t)},fps:function(g){s=1e3/(g||240),o=u.time*1e3+s},add:function(g,m,y){var x=m?function(v,C,b,w){g(v,C,b,w),u.remove(x)}:g;return u.remove(g),a[y?"unshift":"push"](x),Ks(),x},remove:function(g,m){~(m=a.indexOf(g))&&a.splice(m,1)&&d>=m&&d--},_listeners:a},u})(),Ks=function(){return!ea&&qn.wake()},fe={},D0=/^[\d.\-M][\d.\-,\s]/,I0=/["']/g,U0=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[i]=isNaN(c)?c.replace(I0,"").trim():+c,i=l.substr(a+1).trim();return e},N0=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},O0=function(t){var e=(t+"").split("("),n=fe[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[U0(e[1])]:N0(t).split(",").map(Zd)):fe._CE&&D0.test(t)?fe._CE("",t):n},F0=function(t){return function(e){return 1-t(1-e)}},Jr=function(t,e){return t&&(He(t)?t:fe[t]||O0(t))||e},ls=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},o;return Dn(t,function(a){fe[a]=Qn[a]=s,fe[o=a.toLowerCase()]=n;for(var l in s)fe[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=fe[a+"."+l]=s[l]}),s},dp=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Hl=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/Nc*(Math.asin(1/i)||0),a=function(h){return h===1?1:i*Math.pow(2,-10*h)*a0((h-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:dp(a);return s=Nc/s,l.config=function(c,h){return r(t,c,h)},l},Vl=function r(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:dp(n);return i.config=function(s){return r(t,s)},i};Dn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;ls(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});fe.Linear.easeNone=fe.none=fe.Linear.easeIn;ls("Elastic",Hl("in"),Hl("out"),Hl());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(a){return a<e?r*a*a:a<n?r*Math.pow(a-1.5/t,2)+.75:a<i?r*(a-=2.25/t)*a+.9375:r*Math.pow(a-2.625/t,2)+.984375};ls("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);ls("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});ls("Circ",function(r){return-(zd(1-r*r)-1)});ls("Sine",function(r){return r===1?1:-o0(r*r0)+1});ls("Back",Vl("in"),Vl("out"),Vl());fe.SteppedEase=fe.steps=Qn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,o=1-Ae;return function(a){return((i*ua(0,o,a)|0)+s)*n}}};Ko.ease=fe["quad.out"];Dn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return eu+=r+","+r+"Params,"});var pp=function(t,e){this.id=s0++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:qd,this.set=e?e.getSetter:au},na=(function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Js(this,+e.duration,1,1),this.data=e.data,Oe&&(this._ctx=Oe,Oe.data.push(this)),ea||qn.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Js(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Ks(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Dl(this,n),!s._dp||s.parent||jd(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Ei(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Ae||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),$d(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Wu(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Wu(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Zs(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-Ae?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?_l(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Ae?0:this._rts,this.totalTime(ua(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),Ll(this),_0(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ks(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Ae&&(this._tTime-=Ae)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=Be(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Ei(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(Ln(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?_l(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=d0);var i=cn;return cn=n,iu(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),cn=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Xu(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Xu(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(ii(this,n),Ln(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Ln(i)),this._dur||(this._zTime=-Ae),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Ae:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-Ae,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Ae)},t.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this,s=i._prom;return new Promise(function(o){var a=He(n)?n:Jd,l=function(){var h=i.then;i.then=null,s&&s(),He(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=h),o(a),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){Ao(this)},r})();ti(na.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Ae,_prom:0,_ps:!1,_rts:1});var Pn=(function(r){Bd(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Ln(n.sortChildren),ze&&Ei(n.parent||ze,ki(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Qd(ki(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,o){return Fo(0,arguments,this),this},e.from=function(i,s,o){return Fo(1,arguments,this),this},e.fromTo=function(i,s,o,a){return Fo(2,arguments,this),this},e.set=function(i,s,o){return s.duration=0,s.parent=this,Oo(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new $e(i,s,ii(this,o),1),this},e.call=function(i,s,o){return Ei(this,$e.delayedCall(0,i,s),o)},e.staggerTo=function(i,s,o,a,l,c,h){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=h,o.parent=this,new $e(i,o,ii(this,l)),this},e.staggerFrom=function(i,s,o,a,l,c,h){return o.runBackwards=1,Oo(o).immediateRender=Ln(o.immediateRender),this.staggerTo(i,s,o,a,l,c,h)},e.staggerFromTo=function(i,s,o,a,l,c,h,u){return a.startAt=o,Oo(a).immediateRender=Ln(a.immediateRender),this.staggerTo(i,s,a,l,c,h,u)},e.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Be(i),u=this._zTime<0!=i<0&&(this._initted||!c),f,d,p,_,g,m,y,x,v,C,b,w;if(this!==ze&&h>l&&i>=0&&(h=l),h!==this._tTime||o||u){if(a!==this._time&&c&&(h+=this._time-a,i+=this._time-a),f=h,v=this._start,x=this._ts,m=!x,u&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(b=this._yoyo,g=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(g*100+i,s,o);if(f=Be(h%g),h===l?(_=this._repeat,f=c):(C=Be(h/g),_=~~C,_&&_===C&&(f=c,_--),f>c&&(f=c)),C=Zs(this._tTime,g),!a&&this._tTime&&C!==_&&this._tTime-C*g-this._dur<=0&&(C=_),b&&_&1&&(f=c-f,w=1),_!==C&&!this._lock){var R=b&&C&1,S=R===(b&&_&1);if(_<C&&(R=!R),a=R?0:h%c?c:h,this._lock=1,this.render(a||(w?0:Be(_*g)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&Zn(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1,C=_),a&&a!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,a=R?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=y0(this,Be(a),Be(f)),y&&(h-=f-(f=y._start))),this._tTime=h,this._time=f,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&h&&c&&!s&&!C&&(Zn(this,"onStart"),this._tTime!==h))return this;if(f>=a&&i>=0)for(d=this._first;d;){if(p=d._next,(d._act||f>=d._start)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,o),f!==this._time||!this._ts&&!m){y=0,p&&(h+=this._zTime=-Ae);break}}d=p}else{d=this._last;for(var M=i<0?i:f;d;){if(p=d._prev,(d._act||M<=d._end)&&d._ts&&y!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(M-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(M-d._start)*d._ts,s,o||cn&&iu(d)),f!==this._time||!this._ts&&!m){y=0,p&&(h+=this._zTime=M?-Ae:Ae);break}}d=p}}if(y&&!s&&(this.pause(),y.render(f>=a?0:-Ae)._zTime=f>=a?1:-1,this._ts))return this._start=v,Ll(this),this.render(i,s,o);this._onUpdate&&!s&&Zn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&a)&&(v===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Mr(this,1),!s&&!(i<0&&!a)&&(h||a||!l)&&(Zn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var o=this;if($i(s)||(s=ii(this,s,i)),!(i instanceof na)){if(_n(i))return i.forEach(function(a){return o.add(a,s)}),this;if(on(i))return this.addLabel(i,s);if(He(i))i=$e.delayedCall(0,i);else return this}return this!==i?Ei(this,i,s):this},e.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-ai);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof $e?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},e.remove=function(i){return on(i)?this.removeLabel(i):He(i)?this.killTweensOf(i):(i.parent===this&&Pl(this,i),i===this._recent&&(this._recent=this._last),Zr(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Be(qn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=ii(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,o){var a=$e.delayedCall(0,s||Qo,o);return a.data="isPause",this._hasPause=1,Ei(this,a,ii(this,i))},e.removePause=function(i){var s=this._first;for(i=ii(this,i);s;)s._start===i&&s.data==="isPause"&&Mr(s),s=s._next},e.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)lr!==a[l]&&a[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var o=[],a=li(i),l=this._first,c=$i(s),h;l;)l instanceof $e?p0(l._targets,a)&&(c?(!lr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(h=l.getTweensOf(a,s)).length&&o.push.apply(o,h),l=l._next;return o},e.tweenTo=function(i,s){s=s||{};var o=this,a=ii(o,i),l=s,c=l.startAt,h=l.onStart,u=l.onStartParams,f=l.immediateRender,d,p=$e.to(o,ti({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Ae,onStart:function(){if(o.pause(),!d){var g=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());p._dur!==g&&Js(p,g,0,1).render(p._time,!0,!0),d=1}h&&h.apply(p,u||[])}},s));return f?p.render(0):p},e.tweenFromTo=function(i,s,o){return this.tweenTo(s,ti({startAt:{time:ii(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),Yu(this,ii(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),Yu(this,ii(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Ae)},e.shiftChildren=function(i,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(i=Be(i);a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Zr(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Zr(this)},e.totalDuration=function(i){var s=0,o=this,a=o._last,l=ai,c,h,u;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(u=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),h=a._start,h>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Ei(o,a,h-a._delay,1)._lock=0):l=h,h<0&&a._ts&&(s-=h,(!u&&!o._dp||u&&u.smoothChildTiming)&&(o._start+=Be(h/o._ts),o._time-=h,o._tTime-=h),o.shiftChildren(-h,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Js(o,o===ze&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(ze._ts&&($d(ze,_l(i,ze)),Yd=qn.frame),qn.frame>=Hu){Hu+=Kn.autoSleep||120;var s=ze._first;if((!s||!s._ts)&&Kn.autoSleep&&qn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||qn.sleep()}}},t})(na);ti(Pn.prototype,{_lock:0,_hasPause:0,_forcing:0});var B0=function(t,e,n,i,s,o,a){var l=new In(this._pt,t,e,0,1,Mp,null,s),c=0,h=0,u,f,d,p,_,g,m,y;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=ta(i)),o&&(y=[n,i],o(y,t,e),n=y[0],i=y[1]),f=n.match(zl)||[];u=zl.exec(i);)p=u[0],_=i.substring(c,u.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),p!==f[h++]&&(g=parseFloat(f[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:g,c:p.charAt(1)==="="?Bs(g,p)-g:parseFloat(p)-g,m:d&&d<4?Math.round:0},c=zl.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(Hd.test(i)||m)&&(l.e=0),this._pt=l,l},ru=function(t,e,n,i,s,o,a,l,c,h){He(i)&&(i=i(s||0,t,o));var u=t[e],f=n!=="get"?n:He(u)?c?t[e.indexOf("set")||!He(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():u,d=He(u)?c?V0:vp:ou,p;if(on(i)&&(~i.indexOf("random(")&&(i=ta(i)),i.charAt(1)==="="&&(p=Bs(f,i)+(mn(f)||0),(p||p===0)&&(i=p))),!h||f!==i||Vc)return!isNaN(f*i)&&i!==""?(p=new In(this._pt,t,e,+f||0,i-(f||0),typeof u=="boolean"?X0:xp,0,d),c&&(p.fp=c),a&&p.modifier(a,this,t),this._pt=p):(!u&&!(e in t)&&Qh(e,i),B0.call(this,t,e,f,i,d,l||Kn.stringFilter,c))},z0=function(t,e,n,i,s){if(He(t)&&(t=Bo(t,s,e,n,i)),!Pi(t)||t.style&&t.nodeType||_n(t)||kd(t))return on(t)?Bo(t,s,e,n,i):t;var o={},a;for(a in t)o[a]=Bo(t[a],s,e,n,i);return o},mp=function(t,e,n,i,s,o){var a,l,c,h;if(Wn[t]&&(a=new Wn[t]).init(s,a.rawVars?e[t]:z0(e[t],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new In(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==Us))for(c=n._ptLookup[n._targets.indexOf(s)],h=a._props.length;h--;)c[a._props[h]]=l;return a},lr,Vc,su=function r(t,e,n){var i=t.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,u=i.yoyoEase,f=i.keyframes,d=i.autoRevert,p=t._dur,_=t._startAt,g=t._targets,m=t.parent,y=m&&m.data==="nested"?m.vars.targets:g,x=t._overwrite==="auto"&&!Zh,v=t.timeline,C=i.easeReverse||u,b,w,R,S,M,P,I,F,k,X,H,W,G;if(v&&(!f||!s)&&(s="none"),t._ease=Jr(s,Ko.ease),t._rEase=C&&(Jr(C)||t._ease),t._from=!v&&!!i.runBackwards,t._from&&(t.ratio=1),!v||f&&!i.stagger){if(F=g[0]?$r(g[0]).harness:0,W=F&&i[F.prop],b=gl(i,tu),_&&(_._zTime<0&&_.progress(1),e<0&&h&&a&&!d?_.render(-1,!0):_.revert(h&&p?Qa:f0),_._lazy=0),o){if(Mr(t._startAt=$e.set(g,ti({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!_&&Ln(l),startAt:null,delay:0,onUpdate:c&&function(){return Zn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(cn||!a&&!d)&&t._startAt.revert(Qa),a&&p&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&p&&!_){if(e&&(a=!1),R=ti({overwrite:!1,data:"isFromStart",lazy:a&&!_&&Ln(l),immediateRender:a,stagger:0,parent:m},b),W&&(R[F.prop]=W),Mr(t._startAt=$e.set(g,R)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(cn?t._startAt.revert(Qa):t._startAt.render(-1,!0)),t._zTime=e,!a)r(t._startAt,Ae,Ae);else if(!e)return}for(t._pt=t._ptCache=0,l=p&&Ln(l)||l&&!p,w=0;w<g.length;w++){if(M=g[w],I=M._gsap||nu(g)[w]._gsap,t._ptLookup[w]=X={},Fc[I.id]&&pr.length&&ml(),H=y===g?w:y.indexOf(M),F&&(k=new F).init(M,W||b,t,H,y)!==!1&&(t._pt=S=new In(t._pt,M,k.name,0,1,k.render,k,0,k.priority),k._props.forEach(function(it){X[it]=S}),k.priority&&(P=1)),!F||W)for(R in b)Wn[R]&&(k=mp(R,b,t,H,M,y))?k.priority&&(P=1):X[R]=S=ru.call(t,M,R,"get",b[R],H,y,0,i.stringFilter);t._op&&t._op[w]&&t.kill(M,t._op[w]),x&&t._pt&&(lr=t,ze.killTweensOf(M,X,t.globalTime(e)),G=!t.parent,lr=0),t._pt&&l&&(Fc[I.id]=1)}P&&yp(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!G,f&&e<=0&&v.render(ai,!0,!0)},k0=function(t,e,n,i,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,u,f,d;if(!c)for(c=t._ptCache[e]=[],f=t._ptLookup,d=t._targets.length;d--;){if(h=f[d][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return Vc=1,t.vars[e]="+=0",su(t,a),Vc=0,l?jo(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(d=c.length;d--;)u=c[d],h=u._pt||u,h.s=(i||i===0)&&!s?i:h.s+(i||0)+o*h.c,h.c=n-h.s,u.e&&(u.e=Ve(n)+mn(u.e)),u.b&&(u.b=h.s+mn(u.b))},G0=function(t,e){var n=t[0]?$r(t[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return e;s=$s({},e);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},H0=function(t,e,n,i){var s=e.ease||i||"power1.inOut",o,a;if(_n(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},Bo=function(t,e,n,i,s){return He(t)?t.call(e,n,i,s):on(t)&&~t.indexOf("random(")?ta(t):t},gp=eu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",_p={};Dn(gp+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return _p[r]=1});var $e=(function(r){Bd(t,r);function t(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Oo(i))||this;var l=a.vars,c=l.duration,h=l.delay,u=l.immediateRender,f=l.stagger,d=l.overwrite,p=l.keyframes,_=l.defaults,g=l.scrollTrigger,m=i.parent||ze,y=(_n(n)||kd(n)?$i(n[0]):"length"in i)?[n]:li(n),x,v,C,b,w,R,S,M;if(a._targets=y.length?nu(y):jo("GSAP target "+n+" not found. https://gsap.com",!Kn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,p||f||da(c)||da(h)){i=a.vars;var P=i.easeReverse||i.yoyoEase;if(x=a.timeline=new Pn({data:"nested",defaults:_||{},targets:m&&m.data==="nested"?m.vars.targets:y}),x.kill(),x.parent=x._dp=ki(a),x._start=0,f||da(c)||da(h)){if(b=y.length,S=f&&ip(f),Pi(f))for(w in f)~gp.indexOf(w)&&(M||(M={}),M[w]=f[w]);for(v=0;v<b;v++)C=gl(i,_p),C.stagger=0,P&&(C.easeReverse=P),M&&$s(C,M),R=y[v],C.duration=+Bo(c,ki(a),v,R,y),C.delay=(+Bo(h,ki(a),v,R,y)||0)-a._delay,!f&&b===1&&C.delay&&(a._delay=h=C.delay,a._start+=h,C.delay=0),x.to(R,C,S?S(v,R,y):0),x._ease=fe.none;x.duration()?c=h=0:a.timeline=0}else if(p){Oo(ti(x.vars.defaults,{ease:"none"})),x._ease=Jr(p.ease||i.ease||"none");var I=0,F,k,X;if(_n(p))p.forEach(function(H){return x.to(y,H,">")}),x.duration();else{C={};for(w in p)w==="ease"||w==="easeEach"||H0(w,p[w],C,p.easeEach);for(w in C)for(F=C[w].sort(function(H,W){return H.t-W.t}),I=0,v=0;v<F.length;v++)k=F[v],X={ease:k.e,duration:(k.t-(v?F[v-1].t:0))/100*c},X[w]=k.v,x.to(y,X,I),I+=X.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return d===!0&&!Zh&&(lr=ki(a),ze.killTweensOf(y),lr=0),Ei(m,ki(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(u||!c&&!p&&a._start===Be(m._time)&&Ln(u)&&v0(ki(a))&&m.data!=="nested")&&(a._tTime=-Ae,a.render(Math.max(0,-h)||0)),g&&Qd(ki(a),g),a}var e=t.prototype;return e.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,h=i<0,u=i>l-Ae&&!h?l:i<Ae?0:i,f,d,p,_,g,m,y,x;if(!c)M0(this,i,s,o);else if(u!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(f=u,x=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,s,o);if(f=Be(u%_),u===l?(p=this._repeat,f=c):(g=Be(u/_),p=~~g,p&&p===g?(f=c,p--):f>c&&(f=c)),m=this._yoyo&&p&1,m&&(f=c-f),g=Zs(this._tTime,_),f===a&&!o&&this._initted&&p===g)return this._tTime=u,this;p!==g&&this.vars.repeatRefresh&&!m&&!this._lock&&f!==_&&this._initted&&(this._lock=o=1,this.render(Be(_*p),!0).invalidate()._lock=0)}if(!this._initted){if(tp(this,h?i:f,o,s,u))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&p!==g))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._rEase){var v=f<a;if(v!==this._inv){var C=v?a:c-a;this._inv=v,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=C?(v?-1:1)/C:0,this._invScale=v?-this.ratio:1-this.ratio,this._invEase=v?this._rEase:this._ease}this.ratio=y=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=y=this._ease(f/c);if(this._from&&(this.ratio=y=1-y),this._tTime=u,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&u&&!s&&!g&&(Zn(this,"onStart"),this._tTime!==u))return this;for(d=this._pt;d;)d.r(y,d.d),d=d._next;x&&x.render(i<0?i:x._dur*x._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&Bc(this,i,s,o),Zn(this,"onUpdate")),this._repeat&&p!==g&&this.vars.onRepeat&&!s&&this.parent&&Zn(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&Bc(this,i,!0,!0),(i||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&Mr(this,1),!s&&!(h&&!a)&&(u||a||m)&&(Zn(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,o,a,l){ea||qn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||su(this,c),h=this._ease(c/this._dur),k0(this,i,s,o,a,h,c,l)?this.resetTo(i,s,o,a,1):(Dl(this,0),this.parent||Kd(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Ao(this):this.scrollTrigger&&this.scrollTrigger.kill(!!cn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,lr&&lr.vars.overwrite!==!0)._first||Ao(this),this.parent&&o!==this.timeline.totalDuration()&&Js(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?li(i):a,c=this._ptLookup,h=this._pt,u,f,d,p,_,g,m;if((!s||s==="all")&&g0(a,l))return s==="all"&&(this._pt=0),Ao(this);for(u=this._op=this._op||[],s!=="all"&&(on(s)&&(_={},Dn(s,function(y){return _[y]=1}),s=_),s=G0(a,s)),m=a.length;m--;)if(~l.indexOf(a[m])){f=c[m],s==="all"?(u[m]=s,p=f,d={}):(d=u[m]=u[m]||{},p=s);for(_ in p)g=f&&f[_],g&&((!("kill"in g.d)||g.d.kill(_)===!0)&&Pl(this,g,"_pt"),delete f[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&h&&Ao(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return Fo(1,arguments)},t.delayedCall=function(i,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,s,o){return Fo(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,o){return ze.killTweensOf(i,s,o)},t})(na);ti($e.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Dn("staggerTo,staggerFrom,staggerFromTo",function(r){$e[r]=function(){var t=new Pn,e=kc.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var ou=function(t,e,n){return t[e]=n},vp=function(t,e,n){return t[e](n)},V0=function(t,e,n,i){return t[e](i.fp,n)},W0=function(t,e,n){return t.setAttribute(e,n)},au=function(t,e){return He(t[e])?vp:Jh(t[e])&&t.setAttribute?W0:ou},xp=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},X0=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Mp=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},lu=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},Y0=function(t,e,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(t,e,n),s=o},q0=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Pl(this,e,"_pt"):e.dep||(n=1),e=i;return!n},$0=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},yp=function(t){for(var e=t._pt,n,i,s,o;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=s},In=(function(){function r(e,n,i,s,o,a,l,c,h){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||xp,this.d=l||this,this.set=c||ou,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=$0,this.m=n,this.mt=s,this.tween=i},r})();Dn(eu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return tu[r]=1});Qn.TweenMax=Qn.TweenLite=$e;Qn.TimelineLite=Qn.TimelineMax=Pn;ze=new Pn({sortChildren:!1,defaults:Ko,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Kn.stringFilter=fp;var Kr=[],el={},Z0=[],$u=0,J0=0,Wl=function(t){return(el[t]||Z0).map(function(e){return e()})},Wc=function(){var t=Date.now(),e=[];t-$u>2&&(Wl("matchMediaInit"),Kr.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=Mi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),Wl("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),$u=t,Wl("matchMedia"))},Sp=(function(){function r(e,n){this.selector=n&&Gc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=J0++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){He(n)&&(s=i,i=n,n=He);var o=this,a=function(){var c=Oe,h=o.selector,u;return c&&c!==o&&c.data.push(o),s&&(o.selector=Gc(s)),Oe=o,u=i.apply(o,arguments),He(u)&&o._r.push(u),Oe=c,o.selector=h,o.isReverted=!1,u};return o.last=a,n===He?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var i=Oe;Oe=null,n(this),Oe=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof $e&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?(function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return a.splice(a.indexOf(h),1)}));for(a.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,u){return u.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Pn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof $e)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Kr.length;o--;)Kr[o].id===this.id&&Kr.splice(o,1)},t.revert=function(n){this.kill(n||{})},r})(),K0=(function(){function r(e){this.contexts=[],this.scope=e,Oe&&Oe.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){Pi(n)||(n={matches:n});var o=new Sp(0,s||this.scope),a=o.conditions={},l,c,h;Oe&&!o.selector&&(o.selector=Oe.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?h=1:(l=Mi.matchMedia(n[c]),l&&(Kr.indexOf(o)<0&&Kr.push(o),(a[c]=l.matches)&&(h=1),l.addListener?l.addListener(Wc):l.addEventListener("change",Wc)));return h&&i(o,function(u){return o.add(null,u)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),vl={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return cp(i)})},timeline:function(t){return new Pn(t)},getTweensOf:function(t,e){return ze.getTweensOf(t,e)},getProperty:function(t,e,n,i){on(t)&&(t=li(t)[0]);var s=$r(t||{}).get,o=n?Jd:Zd;return n==="native"&&(n=""),t&&(e?o((Wn[e]&&Wn[e].get||s)(t,e,n,i)):function(a,l,c){return o((Wn[a]&&Wn[a].get||s)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=li(t),t.length>1){var i=t.map(function(h){return On.quickSetter(h,e,n)}),s=i.length;return function(h){for(var u=s;u--;)i[u](h)}}t=t[0]||{};var o=Wn[e],a=$r(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(h){var u=new o;Us._pt=0,u.init(t,n?h+n:h,Us,0,[t]),u.render(1,u),Us._pt&&lu(1,Us)}:a.set(t,l);return o?c:function(h){return c(t,l,n?h+n:h,a,1)}},quickTo:function(t,e,n){var i,s=On.to(t,ti((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,h){return s.resetTo(e,l,c,h)};return o.tween=s,o},isTweening:function(t){return ze.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Jr(t.ease,Ko.ease)),Vu(Ko,t||{})},config:function(t){return Vu(Kn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Wn[a]&&!Qn[a]&&jo(e+" effect requires "+a+" plugin.")}),kl[e]=function(a,l,c){return n(li(a),ti(l||{},s),c)},o&&(Pn.prototype[e]=function(a,l,c){return this.add(kl[e](a,Pi(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){fe[t]=Jr(e)},parseEase:function(t,e){return arguments.length?Jr(t,e):fe},getById:function(t){return ze.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Pn(t),i,s;for(n.smoothChildTiming=Ln(t.smoothChildTiming),ze.remove(n),n._dp=0,n._time=n._tTime=ze._time,i=ze._first;i;)s=i._next,(e||!(!i._dur&&i instanceof $e&&i.vars.onComplete===i._targets[0]))&&Ei(n,i,i._start-i._delay),i=s;return Ei(ze,n,0),n},context:function(t,e){return t?new Sp(t,e):Oe},matchMedia:function(t){return new K0(t)},matchMediaRefresh:function(){return Kr.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||Wc()},addEventListener:function(t,e){var n=el[t]||(el[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=el[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:C0,wrapYoyo:R0,distribute:ip,random:sp,snap:rp,normalize:A0,getUnit:mn,clamp:w0,splitColor:hp,toArray:li,selector:Gc,mapRange:ap,pipe:T0,unitize:b0,interpolate:P0,shuffle:np},install:Wd,effects:kl,ticker:qn,updateRoot:Pn.updateRoot,plugins:Wn,globalTimeline:ze,core:{PropTween:In,globals:Xd,Tween:$e,Timeline:Pn,Animation:na,getCache:$r,_removeLinkedListItem:Pl,reverting:function(){return cn},context:function(t){return t&&Oe&&(Oe.data.push(t),t._ctx=Oe),Oe},suppressOverwrites:function(t){return Zh=t}}};Dn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return vl[r]=$e[r]});qn.add(Pn.updateRoot);Us=vl.to({},{duration:0});var j0=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},Q0=function(t,e){var n=t._targets,i,s,o;for(i in e)for(s=n.length;s--;)o=t._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=j0(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[s],i))},Xl=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(on(s)&&(l={},Dn(s,function(h){return l[h]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}Q0(a,s)}}}},On=vl.registerPlugin({name:"attr",init:function(t,e,n,i,s){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)cn?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Xl("roundProps",Hc),Xl("modifiers"),Xl("snap",rp))||vl;$e.version=Pn.version=On.version="3.15.0";Vd=1;Kh()&&Ks();fe.Power0;fe.Power1;fe.Power2;fe.Power3;fe.Power4;fe.Linear;fe.Quad;fe.Cubic;fe.Quart;fe.Quint;fe.Strong;fe.Elastic;fe.Back;fe.SteppedEase;fe.Bounce;fe.Sine;fe.Expo;fe.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Zu,cr,zs,cu,Xr,Ju,hu,tg=function(){return typeof window<"u"},Zi={},Or=180/Math.PI,ks=Math.PI/180,us=Math.atan2,Ku=1e8,uu=/([A-Z])/g,eg=/(left|right|width|margin|padding|x)/i,ng=/[\s,\(]\S/,Ti={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Xc=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},ig=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},rg=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},sg=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},og=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},wp=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Ep=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},ag=function(t,e,n){return t.style[e]=n},lg=function(t,e,n){return t.style.setProperty(e,n)},cg=function(t,e,n){return t._gsap[e]=n},hg=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},ug=function(t,e,n,i,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},fg=function(t,e,n,i,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},ke="transform",Un=ke+"Origin",dg=function r(t,e){var n=this,i=this.target,s=i.style,o=i._gsap;if(t in Zi&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Ti[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=Hi(i,a)}):this.tfm[t]=o.x?o[t]:Hi(i,t),t===Un&&(this.tfm.zOrigin=o.zOrigin);else return Ti.transform.split(",").forEach(function(a){return r.call(n,a,e)});if(this.props.indexOf(ke)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Un,e,"")),t=ke}(s||e)&&this.props.push(t,e,s[t])},Tp=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},pg=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(uu,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=hu(),(!s||!s.isStart)&&!n[ke]&&(Tp(n),i.zOrigin&&n[Un]&&(n[Un]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},bp=function(t,e){var n={target:t,props:[],revert:pg,save:dg};return t._gsap||On.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},Ap,Yc=function(t,e){var n=cr.createElementNS?cr.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):cr.createElement(t);return n&&n.style?n:cr.createElement(t)},Jn=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(uu,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,js(e)||e,1)||""},ju="O,Moz,ms,Ms,Webkit".split(","),js=function(t,e,n){var i=e||Xr,s=i.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(ju[o]+t in s););return o<0?null:(o===3?"ms":o>=0?ju[o]:"")+t},qc=function(){tg()&&window.document&&(Zu=window,cr=Zu.document,zs=cr.documentElement,Xr=Yc("div")||{style:{}},Yc("div"),ke=js(ke),Un=ke+"Origin",Xr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Ap=!!js("perspective"),hu=On.core.reverting,cu=1)},Qu=function(t){var e=t.ownerSVGElement,n=Yc("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",n.appendChild(i),zs.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),zs.removeChild(n),s},tf=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Cp=function(t){var e,n;try{e=t.getBBox()}catch{e=Qu(t),n=1}return e&&(e.width||e.height)||n||(e=Qu(t)),e&&!e.width&&!e.x&&!e.y?{x:+tf(t,["x","cx","x1"])||0,y:+tf(t,["y","cy","y1"])||0,width:0,height:0}:e},Rp=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Cp(t))},yr=function(t,e){if(e){var n=t.style,i;e in Zi&&e!==Un&&(e=ke),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(uu,"-$1").toLowerCase())):n.removeAttribute(e)}},hr=function(t,e,n,i,s,o){var a=new In(t._pt,e,n,0,1,o?Ep:wp);return t._pt=a,a.b=i,a.e=s,t._props.push(n),a},ef={deg:1,rad:1,turn:1},mg={grid:1,flex:1},Sr=function r(t,e,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Xr.style,l=eg.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),u=100,f=i==="px",d=i==="%",p,_,g,m;if(i===o||!s||ef[i]||ef[o])return s;if(o!=="px"&&!f&&(s=r(t,e,n,"px")),m=t.getCTM&&Rp(t),(d||o==="%")&&(Zi[e]||~e.indexOf("adius")))return p=m?t.getBBox()[l?"width":"height"]:t[h],Ve(d?s/p*u:s/100*p);if(a[l?"width":"height"]=u+(f?o:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,m&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===cr||!_.appendChild)&&(_=cr.body),g=_._gsap,g&&d&&g.width&&l&&g.time===qn.time&&!g.uncache)return Ve(s/g.width*u);if(d&&(e==="height"||e==="width")){var y=t.style[e];t.style[e]=u+i,p=t[h],y?t.style[e]=y:yr(t,e)}else(d||o==="%")&&!mg[Jn(_,"display")]&&(a.position=Jn(t,"position")),_===t&&(a.position="static"),_.appendChild(Xr),p=Xr[h],_.removeChild(Xr),a.position="absolute";return l&&d&&(g=$r(_),g.time=qn.time,g.width=_[h]),Ve(f?p*s/u:p&&s?u/p*s:0)},Hi=function(t,e,n,i){var s;return cu||qc(),e in Ti&&e!=="transform"&&(e=Ti[e],~e.indexOf(",")&&(e=e.split(",")[0])),Zi[e]&&e!=="transform"?(s=ra(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:Ml(Jn(t,Un))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=xl[e]&&xl[e](t,e,n)||Jn(t,e)||qd(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Sr(t,e,s,n)+n:s},gg=function(t,e,n,i){if(!n||n==="none"){var s=js(e,t,1),o=s&&Jn(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=Jn(t,"borderTopColor"))}var a=new In(this._pt,t.style,e,0,1,Mp),l=0,c=0,h,u,f,d,p,_,g,m,y,x,v,C;if(a.b=n,a.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Jn(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=Jn(t,e)||i,_?t.style[e]=_:yr(t,e)),h=[n,i],fp(h),n=h[0],i=h[1],f=n.match(Is)||[],C=i.match(Is)||[],C.length){for(;u=Is.exec(i);)g=u[0],y=i.substring(l,u.index),p?p=(p+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(p=1),g!==(_=f[c++]||"")&&(d=parseFloat(_)||0,v=_.substr((d+"").length),g.charAt(1)==="="&&(g=Bs(d,g)+v),m=parseFloat(g),x=g.substr((m+"").length),l=Is.lastIndex-x.length,x||(x=x||Kn.units[e]||v,l===i.length&&(i+=x,a.e+=x)),v!==x&&(d=Sr(t,e,_,x)||0),a._pt={_next:a._pt,p:y||c===1?y:",",s:d,c:m-d,m:p&&p<4||e==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=e==="display"&&i==="none"?Ep:wp;return Hd.test(i)&&(a.e=0),this._pt=a,a},nf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},_g=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=nf[n]||n,e[1]=nf[i]||i,e.join(" ")},vg=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Zi[a]&&(l=1,a=a==="transformOrigin"?Un:ke),yr(n,a);l&&(yr(n,ke),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",ra(n,1),o.uncache=1,Tp(i)))}},xl={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var o=t._pt=new In(t._pt,e,n,0,0,vg);return o.u=i,o.pr=-10,o.tween=s,t._props.push(n),1}}},ia=[1,0,0,1,0,0],Pp={},Lp=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},rf=function(t){var e=Jn(t,ke);return Lp(e)?ia:e.substr(7).match(Gd).map(Ve)},fu=function(t,e){var n=t._gsap||$r(t),i=t.style,s=rf(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?ia:s):(s===ia&&!t.offsetParent&&t!==zs&&!n.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,zs.appendChild(t)),s=rf(t),l?i.display=l:yr(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):zs.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},$c=function(t,e,n,i,s,o){var a=t._gsap,l=s||fu(t,!0),c=a.xOrigin||0,h=a.yOrigin||0,u=a.xOffset||0,f=a.yOffset||0,d=l[0],p=l[1],_=l[2],g=l[3],m=l[4],y=l[5],x=e.split(" "),v=parseFloat(x[0])||0,C=parseFloat(x[1])||0,b,w,R,S;n?l!==ia&&(w=d*g-p*_)&&(R=v*(g/w)+C*(-_/w)+(_*y-g*m)/w,S=v*(-p/w)+C*(d/w)-(d*y-p*m)/w,v=R,C=S):(b=Cp(t),v=b.x+(~x[0].indexOf("%")?v/100*b.width:v),C=b.y+(~(x[1]||x[0]).indexOf("%")?C/100*b.height:C)),i||i!==!1&&a.smooth?(m=v-c,y=C-h,a.xOffset=u+(m*d+y*_)-m,a.yOffset=f+(m*p+y*g)-y):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=C,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[Un]="0px 0px",o&&(hr(o,a,"xOrigin",c,v),hr(o,a,"yOrigin",h,C),hr(o,a,"xOffset",u,a.xOffset),hr(o,a,"yOffset",f,a.yOffset)),t.setAttribute("data-svg-origin",v+" "+C)},ra=function(t,e){var n=t._gsap||new pp(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=Jn(t,Un)||"0",h,u,f,d,p,_,g,m,y,x,v,C,b,w,R,S,M,P,I,F,k,X,H,W,G,it,D,ct,Lt,$t,$,rt;return h=u=f=_=g=m=y=x=v=0,d=p=1,n.svg=!!(t.getCTM&&Rp(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[ke]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[ke]!=="none"?l[ke]:"")),i.scale=i.rotate=i.translate="none"),w=fu(t,n.svg),n.svg&&(n.uncache?(G=t.getBBox(),c=n.xOrigin-G.x+"px "+(n.yOrigin-G.y)+"px",W=""):W=!e&&t.getAttribute("data-svg-origin"),$c(t,W||c,!!W||n.originIsAbsolute,n.smooth!==!1,w)),C=n.xOrigin||0,b=n.yOrigin||0,w!==ia&&(P=w[0],I=w[1],F=w[2],k=w[3],h=X=w[4],u=H=w[5],w.length===6?(d=Math.sqrt(P*P+I*I),p=Math.sqrt(k*k+F*F),_=P||I?us(I,P)*Or:0,y=F||k?us(F,k)*Or+_:0,y&&(p*=Math.abs(Math.cos(y*ks))),n.svg&&(h-=C-(C*P+b*F),u-=b-(C*I+b*k))):(rt=w[6],$t=w[7],D=w[8],ct=w[9],Lt=w[10],$=w[11],h=w[12],u=w[13],f=w[14],R=us(rt,Lt),g=R*Or,R&&(S=Math.cos(-R),M=Math.sin(-R),W=X*S+D*M,G=H*S+ct*M,it=rt*S+Lt*M,D=X*-M+D*S,ct=H*-M+ct*S,Lt=rt*-M+Lt*S,$=$t*-M+$*S,X=W,H=G,rt=it),R=us(-F,Lt),m=R*Or,R&&(S=Math.cos(-R),M=Math.sin(-R),W=P*S-D*M,G=I*S-ct*M,it=F*S-Lt*M,$=k*M+$*S,P=W,I=G,F=it),R=us(I,P),_=R*Or,R&&(S=Math.cos(R),M=Math.sin(R),W=P*S+I*M,G=X*S+H*M,I=I*S-P*M,H=H*S-X*M,P=W,X=G),g&&Math.abs(g)+Math.abs(_)>359.9&&(g=_=0,m=180-m),d=Ve(Math.sqrt(P*P+I*I+F*F)),p=Ve(Math.sqrt(H*H+rt*rt)),R=us(X,H),y=Math.abs(R)>2e-4?R*Or:0,v=$?1/($<0?-$:$):0),n.svg&&(W=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Lp(Jn(t,ke)),W&&t.setAttribute("transform",W))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(d*=-1,y+=_<=0?180:-180,_+=_<=0?180:-180):(p*=-1,y+=y<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=u-((n.yPercent=u&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-u)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=Ve(d),n.scaleY=Ve(p),n.rotation=Ve(_)+a,n.rotationX=Ve(g)+a,n.rotationY=Ve(m)+a,n.skewX=y+a,n.skewY=x+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Un]=Ml(c)),n.xOffset=n.yOffset=0,n.force3D=Kn.force3D,n.renderTransform=n.svg?Mg:Ap?Dp:xg,n.uncache=0,n},Ml=function(t){return(t=t.split(" "))[0]+" "+t[1]},Yl=function(t,e,n){var i=mn(e);return Ve(parseFloat(e)+parseFloat(Sr(t,"x",n+"px",i)))+i},xg=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Dp(t,e)},Ar="0deg",mo="0px",Cr=") ",Dp=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,h=n.rotationY,u=n.rotationX,f=n.skewX,d=n.skewY,p=n.scaleX,_=n.scaleY,g=n.transformPerspective,m=n.force3D,y=n.target,x=n.zOrigin,v="",C=m==="auto"&&t&&t!==1||m===!0;if(x&&(u!==Ar||h!==Ar)){var b=parseFloat(h)*ks,w=Math.sin(b),R=Math.cos(b),S;b=parseFloat(u)*ks,S=Math.cos(b),o=Yl(y,o,w*S*-x),a=Yl(y,a,-Math.sin(b)*-x),l=Yl(y,l,R*S*-x+x)}g!==mo&&(v+="perspective("+g+Cr),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(C||o!==mo||a!==mo||l!==mo)&&(v+=l!==mo||C?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Cr),c!==Ar&&(v+="rotate("+c+Cr),h!==Ar&&(v+="rotateY("+h+Cr),u!==Ar&&(v+="rotateX("+u+Cr),(f!==Ar||d!==Ar)&&(v+="skew("+f+", "+d+Cr),(p!==1||_!==1)&&(v+="scale("+p+", "+_+Cr),y.style[ke]=v||"translate(0, 0)"},Mg=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,h=n.skewY,u=n.scaleX,f=n.scaleY,d=n.target,p=n.xOrigin,_=n.yOrigin,g=n.xOffset,m=n.yOffset,y=n.forceCSS,x=parseFloat(o),v=parseFloat(a),C,b,w,R,S;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=ks,c*=ks,C=Math.cos(l)*u,b=Math.sin(l)*u,w=Math.sin(l-c)*-f,R=Math.cos(l-c)*f,c&&(h*=ks,S=Math.tan(c-h),S=Math.sqrt(1+S*S),w*=S,R*=S,h&&(S=Math.tan(h),S=Math.sqrt(1+S*S),C*=S,b*=S)),C=Ve(C),b=Ve(b),w=Ve(w),R=Ve(R)):(C=u,R=f,b=w=0),(x&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(x=Sr(d,"x",o,"px"),v=Sr(d,"y",a,"px")),(p||_||g||m)&&(x=Ve(x+p-(p*C+_*w)+g),v=Ve(v+_-(p*b+_*R)+m)),(i||s)&&(S=d.getBBox(),x=Ve(x+i/100*S.width),v=Ve(v+s/100*S.height)),S="matrix("+C+","+b+","+w+","+R+","+x+","+v+")",d.setAttribute("transform",S),y&&(d.style[ke]=S)},yg=function(t,e,n,i,s){var o=360,a=on(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Or:1),c=l-i,h=i+c+"deg",u,f;return a&&(u=s.split("_")[1],u==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),u==="cw"&&c<0?c=(c+o*Ku)%o-~~(c/o)*o:u==="ccw"&&c>0&&(c=(c-o*Ku)%o-~~(c/o)*o)),t._pt=f=new In(t._pt,e,n,i,c,ig),f.e=h,f.u="deg",t._props.push(n),f},sf=function(t,e){for(var n in e)t[n]=e[n];return t},Sg=function(t,e,n){var i=sf({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,h,u,f,d,p;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[ke]=e,a=ra(n,1),yr(n,ke),n.setAttribute("transform",c)):(c=getComputedStyle(n)[ke],o[ke]=e,a=ra(n,1),o[ke]=c);for(l in Zi)c=i[l],h=a[l],c!==h&&s.indexOf(l)<0&&(d=mn(c),p=mn(h),u=d!==p?Sr(n,l,c,p):parseFloat(c),f=parseFloat(h),t._pt=new In(t._pt,a,l,u,f-u,Xc),t._pt.u=p||0,t._props.push(l));sf(a,i)};Dn("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",o=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(a){return t<2?r+a:"border"+a+r});xl[t>1?"border"+r:r]=function(a,l,c,h,u){var f,d;if(arguments.length<4)return f=o.map(function(p){return Hi(a,p,c)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(h+"").split(" "),d={},o.forEach(function(p,_){return d[p]=f[_]=f[_]||f[(_-1)/2|0]}),a.init(l,d,u)}});var Ip={name:"css",register:qc,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var o=this._props,a=t.style,l=n.vars.startAt,c,h,u,f,d,p,_,g,m,y,x,v,C,b,w,R,S;cu||qc(),this.styles=this.styles||bp(t),R=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(Wn[_]&&mp(_,e,n,i,t,s)))){if(d=typeof h,p=xl[_],d==="function"&&(h=h.call(n,i,t,s),d=typeof h),d==="string"&&~h.indexOf("random(")&&(h=ta(h)),p)p(this,t,_,h,n)&&(w=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",mr.lastIndex=0,mr.test(c)||(g=mn(c),m=mn(h),m?g!==m&&(c=Sr(t,_,c,m)+m):g&&(h+=g)),this.add(a,"setProperty",c,h,i,s,0,0,_),o.push(_),R.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,s):l[_],on(c)&&~c.indexOf("random(")&&(c=ta(c)),mn(c+"")||c==="auto"||(c+=Kn.units[_]||mn(Hi(t,_))||""),(c+"").charAt(1)==="="&&(c=Hi(t,_))):c=Hi(t,_),f=parseFloat(c),y=d==="string"&&h.charAt(1)==="="&&h.substr(0,2),y&&(h=h.substr(2)),u=parseFloat(h),_ in Ti&&(_==="autoAlpha"&&(f===1&&Hi(t,"visibility")==="hidden"&&u&&(f=0),R.push("visibility",0,a.visibility),hr(this,a,"visibility",f?"inherit":"hidden",u?"inherit":"hidden",!u)),_!=="scale"&&_!=="transform"&&(_=Ti[_],~_.indexOf(",")&&(_=_.split(",")[0]))),x=_ in Zi,x){if(this.styles.save(_),S=h,d==="string"&&h.substring(0,6)==="var(--"){if(h=Jn(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var M=t.style.perspective;t.style.perspective=h,h=Jn(t,"perspective"),M?t.style.perspective=M:yr(t,"perspective")}u=parseFloat(h)}if(v||(C=t._gsap,C.renderTransform&&!e.parseTransform||ra(t,e.parseTransform),b=e.smoothOrigin!==!1&&C.smooth,v=this._pt=new In(this._pt,a,ke,0,1,C.renderTransform,C,0,-1),v.dep=1),_==="scale")this._pt=new In(this._pt,C,"scaleY",C.scaleY,(y?Bs(C.scaleY,y+u):u)-C.scaleY||0,Xc),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){R.push(Un,0,a[Un]),h=_g(h),C.svg?$c(t,h,0,b,0,this):(m=parseFloat(h.split(" ")[2])||0,m!==C.zOrigin&&hr(this,C,"zOrigin",C.zOrigin,m),hr(this,a,_,Ml(c),Ml(h)));continue}else if(_==="svgOrigin"){$c(t,h,1,b,0,this);continue}else if(_ in Pp){yg(this,C,_,f,y?Bs(f,y+h):h);continue}else if(_==="smoothOrigin"){hr(this,C,"smooth",C.smooth,h);continue}else if(_==="force3D"){C[_]=h;continue}else if(_==="transform"){Sg(this,h,t);continue}}else _ in a||(_=js(_)||_);if(x||(u||u===0)&&(f||f===0)&&!ng.test(h)&&_ in a)g=(c+"").substr((f+"").length),u||(u=0),m=mn(h)||(_ in Kn.units?Kn.units[_]:g),g!==m&&(f=Sr(t,_,c,m)),this._pt=new In(this._pt,x?C:a,_,f,(y?Bs(f,y+u):u)-f,!x&&(m==="px"||_==="zIndex")&&e.autoRound!==!1?og:Xc),this._pt.u=m||0,x&&S!==h?(this._pt.b=c,this._pt.e=S,this._pt.r=sg):g!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=rg);else if(_ in a)gg.call(this,t,_,c,y?y+h:h);else if(_ in t)this.add(t,_,c||t[_],y?y+h:h,i,s);else if(_!=="parseTransform"){Qh(_,h);continue}x||(_ in a?R.push(_,0,a[_]):typeof t[_]=="function"?R.push(_,2,t[_]()):R.push(_,1,c||t[_])),o.push(_)}}w&&yp(this)},render:function(t,e){if(e.tween._time||!hu())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Hi,aliases:Ti,getSetter:function(t,e,n){var i=Ti[e];return i&&i.indexOf(",")<0&&(e=i),e in Zi&&e!==Un&&(t._gsap.x||Hi(t,"x"))?n&&Ju===n?e==="scale"?hg:cg:(Ju=n||{})&&(e==="scale"?ug:fg):t.style&&!Jh(t.style[e])?ag:~e.indexOf("-")?lg:au(t,e)},core:{_removeProperty:yr,_getMatrix:fu}};On.utils.checkPrefix=js;On.core.getStyleSaver=bp;(function(r,t,e,n){var i=Dn(r+","+t+","+e,function(s){Zi[s]=1});Dn(t,function(s){Kn.units[s]="deg",Pp[s]=1}),Ti[i[13]]=r+","+t,Dn(n,function(s){var o=s.split(":");Ti[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Dn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Kn.units[r]="px"});On.registerPlugin(Ip);var Ke=On.registerPlugin(Ip)||On;Ke.core.Tween;function wg(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Eg(r,t,e){return t&&wg(r.prototype,t),r}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var ln,nl,$n,ur,fr,Gs,Up,Fr,Hs,Np,Wi,gi,Op,Fp=function(){return ln||typeof window<"u"&&(ln=window.gsap)&&ln.registerPlugin&&ln},Bp=1,Ns=[],le=[],Ri=[],zo=Date.now,Zc=function(t,e){return e},Tg=function(){var t=Hs.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,le),i.push.apply(i,Ri),le=n,Ri=i,Zc=function(o,a){return e[o](a)}},gr=function(t,e){return~Ri.indexOf(t)&&Ri[Ri.indexOf(t)+1][e]},ko=function(t){return!!~Np.indexOf(t)},Sn=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:i!==!1,capture:!!s})},yn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},pa="scrollLeft",ma="scrollTop",Jc=function(){return Wi&&Wi.isPressed||le.cache++},yl=function(t,e){var n=function i(s){if(s||s===0){Bp&&($n.history.scrollRestoration="manual");var o=Wi&&Wi.isPressed;s=i.v=Math.round(s)||(Wi&&Wi.iOS?1:0),t(s),i.cacheID=le.cache,o&&Zc("ss",s)}else(e||le.cache!==i.cacheID||Zc("ref"))&&(i.cacheID=le.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},An={s:pa,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:yl(function(r){return arguments.length?$n.scrollTo(r,je.sc()):$n.pageXOffset||ur[pa]||fr[pa]||Gs[pa]||0})},je={s:ma,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:An,sc:yl(function(r){return arguments.length?$n.scrollTo(An.sc(),r):$n.pageYOffset||ur[ma]||fr[ma]||Gs[ma]||0})},Rn=function(t,e){return(e&&e._ctx&&e._ctx.selector||ln.utils.toArray)(t)[0]||(typeof t=="string"&&ln.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},bg=function(t,e){for(var n=e.length;n--;)if(e[n]===t||e[n].contains(t))return!0;return!1},wr=function(t,e){var n=e.s,i=e.sc;ko(t)&&(t=ur.scrollingElement||fr);var s=le.indexOf(t),o=i===je.sc?1:2;!~s&&(s=le.push(t)-1),le[s+o]||Sn(t,"scroll",Jc);var a=le[s+o],l=a||(le[s+o]=yl(gr(t,n),!0)||(ko(t)?i:yl(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,a||(l.smooth=ln.getProperty(t,"scrollBehavior")==="smooth"),l},Kc=function(t,e,n){var i=t,s=t,o=zo(),a=o,l=e||50,c=Math.max(500,l*3),h=function(p,_){var g=zo();_||g-o>l?(s=i,i=p,a=o,o=g):n?i+=p:i=s+(p-s)/(g-a)*(o-a)},u=function(){s=i=n?0:i,a=o=0},f=function(p){var _=a,g=s,m=zo();return(p||p===0)&&p!==i&&h(p),o===a||m-a>c?0:(i+(n?g:-g))/((n?m:o)-_)*1e3};return{update:h,reset:u,getVelocity:f}},go=function(t,e){return e&&!t._gsapAllow&&t.cancelable!==!1&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},of=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},zp=function(){Hs=ln.core.globals().ScrollTrigger,Hs&&Hs.core&&Tg()},kp=function(t){return ln=t||Fp(),!nl&&ln&&typeof document<"u"&&document.body&&($n=window,ur=document,fr=ur.documentElement,Gs=ur.body,Np=[$n,ur,fr,Gs],ln.utils.clamp,Op=ln.core.context||function(){},Fr="onpointerenter"in Gs?"pointer":"mouse",Up=We.isTouch=$n.matchMedia&&$n.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in $n||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,gi=We.eventTypes=("ontouchstart"in fr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in fr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Bp=0},500),nl=1),Hs||zp(),nl};An.op=je;le.cache=0;var We=(function(){function r(e){this.init(e)}var t=r.prototype;return t.init=function(n){nl||kp(ln)||console.warn("Please gsap.registerPlugin(Observer)"),Hs||zp();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,h=n.preventDefault,u=n.onStop,f=n.onStopDelay,d=n.ignore,p=n.wheelSpeed,_=n.event,g=n.onDragStart,m=n.onDragEnd,y=n.onDrag,x=n.onPress,v=n.onRelease,C=n.onRight,b=n.onLeft,w=n.onUp,R=n.onDown,S=n.onChangeX,M=n.onChangeY,P=n.onChange,I=n.onToggleX,F=n.onToggleY,k=n.onHover,X=n.onHoverEnd,H=n.onMove,W=n.ignoreCheck,G=n.isNormalizer,it=n.onGestureStart,D=n.onGestureEnd,ct=n.onWheel,Lt=n.onEnable,$t=n.onDisable,$=n.onClick,rt=n.scrollSpeed,vt=n.capture,st=n.allowClicks,Ct=n.lockAxis,Ut=n.onLockAxis;this.target=a=Rn(a)||fr,this.vars=n,d&&(d=ln.utils.toArray(d)),i=i||1e-9,s=s||0,p=p||1,rt=rt||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat($n.getComputedStyle(Gs).lineHeight)||22);var zt,Wt,tt,et,L,bt,ot,O=this,lt=0,Ft=0,Mt=n.passive||!h&&n.passive!==!1,A=wr(a,An),E=wr(a,je),V=A(),K=E(),Q=~o.indexOf("touch")&&!~o.indexOf("pointer")&&gi[0]==="pointerdown",j=ko(a),pt=a.ownerDocument||ur,ut=[0,0,0],_t=[0,0,0],Yt=0,at=function(){return Yt=zo()},ft=function(Dt,Qt){return(O.event=Dt)&&d&&bg(Dt.target,d)||Qt&&Q&&Dt.pointerType!=="touch"||W&&W(Dt,Qt)},Gt=function(){O._vx.reset(),O._vy.reset(),Wt.pause(),u&&u(O)},kt=function(){var Dt=O.deltaX=of(ut),Qt=O.deltaY=of(_t),yt=Math.abs(Dt)>=i,Zt=Math.abs(Qt)>=i;P&&(yt||Zt)&&P(O,Dt,Qt,ut,_t),yt&&(C&&O.deltaX>0&&C(O),b&&O.deltaX<0&&b(O),S&&S(O),I&&O.deltaX<0!=lt<0&&I(O),lt=O.deltaX,ut[0]=ut[1]=ut[2]=0),Zt&&(R&&O.deltaY>0&&R(O),w&&O.deltaY<0&&w(O),M&&M(O),F&&O.deltaY<0!=Ft<0&&F(O),Ft=O.deltaY,_t[0]=_t[1]=_t[2]=0),(et||tt)&&(H&&H(O),tt&&(g&&tt===1&&g(O),y&&y(O),tt=0),et=!1),bt&&!(bt=!1)&&Ut&&Ut(O),L&&(ct(O),L=!1),zt=0},Rt=function(Dt,Qt,yt){ut[yt]+=Dt,_t[yt]+=Qt,O._vx.update(Dt),O._vy.update(Qt),c?zt||(zt=requestAnimationFrame(kt)):kt()},jt=function(Dt,Qt){Ct&&!ot&&(O.axis=ot=Math.abs(Dt)>Math.abs(Qt)?"x":"y",bt=!0),ot!=="y"&&(ut[2]+=Dt,O._vx.update(Dt,!0)),ot!=="x"&&(_t[2]+=Qt,O._vy.update(Qt,!0)),c?zt||(zt=requestAnimationFrame(kt)):kt()},Vt=function(Dt){if(!ft(Dt,1)){Dt=go(Dt,h);var Qt=Dt.clientX,yt=Dt.clientY,Zt=Qt-O.x,Ot=yt-O.y,qt=O.isDragging;O.x=Qt,O.y=yt,(qt||(Zt||Ot)&&(Math.abs(O.startX-Qt)>=s||Math.abs(O.startY-yt)>=s))&&(tt||(tt=qt?2:1),qt||(O.isDragging=!0),jt(Zt,Ot))}},oe=O.onPress=function(Tt){ft(Tt,1)||Tt&&Tt.button||(O.axis=ot=null,Wt.pause(),O.isPressed=!0,Tt=go(Tt),lt=Ft=0,O.startX=O.x=Tt.clientX,O.startY=O.y=Tt.clientY,O._vx.reset(),O._vy.reset(),Sn(G?a:pt,gi[1],Vt,Mt,!0),O.deltaX=O.deltaY=0,x&&x(O))},U=O.onRelease=function(Tt){if(!ft(Tt,1)){yn(G?a:pt,gi[1],Vt,!0);var Dt=!isNaN(O.y-O.startY),Qt=O.isDragging,yt=Qt&&(Math.abs(O.x-O.startX)>3||Math.abs(O.y-O.startY)>3),Zt=go(Tt);!yt&&Dt&&(O._vx.reset(),O._vy.reset(),h&&st&&ln.delayedCall(.08,function(){if(zo()-Yt>300&&!Tt.defaultPrevented){if(Tt.target.click)Tt.target.click();else if(pt.createEvent){var Ot=pt.createEvent("MouseEvents");Ot.initMouseEvent("click",!0,!0,$n,1,Zt.screenX,Zt.screenY,Zt.clientX,Zt.clientY,!1,!1,!1,!1,0,null),Tt.target.dispatchEvent(Ot)}}})),O.isDragging=O.isGesturing=O.isPressed=!1,u&&Qt&&!G&&Wt.restart(!0),tt&&kt(),m&&Qt&&m(O),v&&v(O,yt)}},mt=function(Dt){return Dt.touches&&Dt.touches.length>1&&(O.isGesturing=!0)&&it(Dt,O.isDragging)},Z=function(){return(O.isGesturing=!1)||D(O)},nt=function(Dt){if(!ft(Dt)){var Qt=A(),yt=E();Rt((Qt-V)*rt,(yt-K)*rt,1),V=Qt,K=yt,u&&Wt.restart(!0)}},gt=function(Dt){if(!ft(Dt)){Dt=go(Dt,h),ct&&(L=!0);var Qt=(Dt.deltaMode===1?l:Dt.deltaMode===2?$n.innerHeight:1)*p;Rt(Dt.deltaX*Qt,Dt.deltaY*Qt,0),u&&!G&&Wt.restart(!0)}},xt=function(Dt){if(!ft(Dt)){var Qt=Dt.clientX,yt=Dt.clientY,Zt=Qt-O.x,Ot=yt-O.y;O.x=Qt,O.y=yt,et=!0,u&&Wt.restart(!0),(Zt||Ot)&&jt(Zt,Ot)}},Xt=function(Dt){O.event=Dt,k(O)},he=function(Dt){O.event=Dt,X(O)},Ce=function(Dt){return ft(Dt)||go(Dt,h)&&$(O)};Wt=O._dc=ln.delayedCall(f||.25,Gt).pause(),O.deltaX=O.deltaY=0,O._vx=Kc(0,50,!0),O._vy=Kc(0,50,!0),O.scrollX=A,O.scrollY=E,O.isDragging=O.isGesturing=O.isPressed=!1,Op(this),O.enable=function(Tt){return O.isEnabled||(Sn(j?pt:a,"scroll",Jc),o.indexOf("scroll")>=0&&Sn(j?pt:a,"scroll",nt,Mt,vt),o.indexOf("wheel")>=0&&Sn(a,"wheel",gt,Mt,vt),(o.indexOf("touch")>=0&&Up||o.indexOf("pointer")>=0)&&(Sn(a,gi[0],oe,Mt,vt),Sn(pt,gi[2],U),Sn(pt,gi[3],U),st&&Sn(a,"click",at,!0,!0),$&&Sn(a,"click",Ce),it&&Sn(pt,"gesturestart",mt),D&&Sn(pt,"gestureend",Z),k&&Sn(a,Fr+"enter",Xt),X&&Sn(a,Fr+"leave",he),H&&Sn(a,Fr+"move",xt)),O.isEnabled=!0,O.isDragging=O.isGesturing=O.isPressed=et=tt=!1,O._vx.reset(),O._vy.reset(),V=A(),K=E(),Tt&&Tt.type&&oe(Tt),Lt&&Lt(O)),O},O.disable=function(){O.isEnabled&&(Ns.filter(function(Tt){return Tt!==O&&ko(Tt.target)}).length||yn(j?pt:a,"scroll",Jc),O.isPressed&&(O._vx.reset(),O._vy.reset(),yn(G?a:pt,gi[1],Vt,!0)),yn(j?pt:a,"scroll",nt,vt),yn(a,"wheel",gt,vt),yn(a,gi[0],oe,vt),yn(pt,gi[2],U),yn(pt,gi[3],U),yn(a,"click",at,!0),yn(a,"click",Ce),yn(pt,"gesturestart",mt),yn(pt,"gestureend",Z),yn(a,Fr+"enter",Xt),yn(a,Fr+"leave",he),yn(a,Fr+"move",xt),O.isEnabled=O.isPressed=O.isDragging=!1,$t&&$t(O))},O.kill=O.revert=function(){O.disable();var Tt=Ns.indexOf(O);Tt>=0&&Ns.splice(Tt,1),Wi===O&&(Wi=0)},Ns.push(O),G&&ko(a)&&(Wi=O),O.enable(_)},Eg(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();We.version="3.15.0";We.create=function(r){return new We(r)};We.register=kp;We.getAll=function(){return Ns.slice()};We.getById=function(r){return Ns.filter(function(t){return t.vars.id===r})[0]};Fp()&&ln.registerPlugin(We);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var It,Ls,ae,ye,Xn,xe,du,Sl,sa,Go,Ro,ga,fn,Il,jc,Tn,af,lf,Ds,Gp,ql,Hp,En,Qc,Vp,Wp,or,th,pu,Vs,mu,Ho,eh,$l,_a=1,dn=Date.now,Zl=dn(),ci=0,Po=0,cf=function(t,e,n){var i=Vn(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},hf=function(t,e){return e&&(!Vn(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},Ag=function r(){return Po&&requestAnimationFrame(r)},uf=function(){return Il=1},ff=function(){return Il=0},yi=function(t){return t},Lo=function(t){return Math.round(t*1e5)/1e5||0},Xp=function(){return typeof window<"u"},Yp=function(){return It||Xp()&&(It=window.gsap)&&It.registerPlugin&&It},es=function(t){return!!~du.indexOf(t)},qp=function(t){return(t==="Height"?mu:ae["inner"+t])||Xn["client"+t]||xe["client"+t]},$p=function(t){return gr(t,"getBoundingClientRect")||(es(t)?function(){return al.width=ae.innerWidth,al.height=mu,al}:function(){return Vi(t)})},Cg=function(t,e,n){var i=n.d,s=n.d2,o=n.a;return(o=gr(t,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(e?qp(s):t["client"+s])||0}},Rg=function(t,e){return!e||~Ri.indexOf(t)?$p(t):function(){return al}},bi=function(t,e){var n=e.s,i=e.d2,s=e.d,o=e.a;return Math.max(0,(n="scroll"+i)&&(o=gr(t,n))?o()-$p(t)()[s]:es(t)?(Xn[n]||xe[n])-qp(i):t[n]-t["offset"+i])},va=function(t,e){for(var n=0;n<Ds.length;n+=3)(!e||~e.indexOf(Ds[n+1]))&&t(Ds[n],Ds[n+1],Ds[n+2])},Vn=function(t){return typeof t=="string"},gn=function(t){return typeof t=="function"},Do=function(t){return typeof t=="number"},Br=function(t){return typeof t=="object"},_o=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},fs=function(t,e,n){if(t.enabled){var i=t._ctx?t._ctx.add(function(){return e(t,n)}):e(t,n);i&&i.totalTime&&(t.callbackAnimation=i)}},ds=Math.abs,Zp="left",Jp="top",gu="right",_u="bottom",jr="width",Qr="height",Vo="Right",Wo="Left",Xo="Top",Yo="Bottom",Ye="padding",si="margin",Qs="Width",vu="Height",Je="px",oi=function(t){return ae.getComputedStyle(t.nodeType===Node.DOCUMENT_NODE?t.scrollingElement:t)},Pg=function(t){var e=oi(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},df=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Vi=function(t,e){var n=e&&oi(t)[jc]!=="matrix(1, 0, 0, 1, 0, 0)"&&It.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect?t.getBoundingClientRect():t.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},wl=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},Kp=function(t){var e=[],n=t.labels,i=t.duration(),s;for(s in n)e.push(n[s]/i);return e},Lg=function(t){return function(e){return It.utils.snap(Kp(t),e)}},xu=function(t){var e=It.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return e(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=e(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:e(s<0?i-t:i+t)}},Dg=function(t){return function(e,n){return xu(Kp(t))(e,n.direction)}},xa=function(t,e,n,i){return n.split(",").forEach(function(s){return t(e,s,i)})},sn=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:!i,capture:!!s})},rn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},Ma=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},pf={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ya={toggleActions:"play",anticipatePin:0},El={top:0,left:0,center:.5,bottom:1,right:1},il=function(t,e){if(Vn(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in El?El[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},Sa=function(t,e,n,i,s,o,a,l){var c=s.startColor,h=s.endColor,u=s.fontSize,f=s.indent,d=s.fontWeight,p=ye.createElement("div"),_=es(n)||gr(n,"pinType")==="fixed",g=t.indexOf("scroller")!==-1,m=_?xe:n.tagName==="IFRAME"?n.contentDocument.body:n,y=t.indexOf("start")!==-1,x=y?c:h,v="border-color:"+x+";font-size:"+u+";color:"+x+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((g||l)&&_?"fixed;":"absolute;"),(g||l||!_)&&(v+=(i===je?gu:_u)+":"+(o+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),p._isStart=y,p.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),p.style.cssText=v,p.innerText=e||e===0?t+"-"+e:t,m.children[0]?m.insertBefore(p,m.children[0]):m.appendChild(p),p._offset=p["offset"+i.op.d2],rl(p,0,i,y),p},rl=function(t,e,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];t._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Qs]=1,s["border"+a+Qs]=0,s[n.p]=e+"px",It.set(t,s)},se=[],nh={},oa,mf=function(){return dn()-ci>34&&(oa||(oa=requestAnimationFrame(Yi)))},ps=function(){(!En||!En.isPressed||En.startX>xe.clientWidth)&&(le.cache++,En?oa||(oa=requestAnimationFrame(Yi)):Yi(),ci||is("scrollStart"),ci=dn())},Jl=function(){Wp=ae.innerWidth,Vp=ae.innerHeight},Io=function(t){le.cache++,(t===!0||!fn&&!Hp&&!ye.fullscreenElement&&!ye.webkitFullscreenElement&&(!Qc||Wp!==ae.innerWidth||Math.abs(ae.innerHeight-Vp)>ae.innerHeight*.25))&&Sl.restart(!0)},ns={},Ig=[],jp=function r(){return rn(ce,"scrollEnd",r)||Yr(!0)},is=function(t){return ns[t]&&ns[t].map(function(e){return e()})||Ig},Hn=[],Qp=function(t){for(var e=0;e<Hn.length;e+=5)(!t||Hn[e+4]&&Hn[e+4].query===t)&&(Hn[e].style.cssText=Hn[e+1],Hn[e].getBBox&&Hn[e].setAttribute("transform",Hn[e+2]||""),Hn[e+3].uncache=1)},tm=function(){return le.forEach(function(t){return gn(t)&&++t.cacheID&&(t.rec=t())})},Mu=function(t,e){var n;for(Tn=0;Tn<se.length;Tn++)n=se[Tn],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));Ho=!0,e&&Qp(e),e||is("revert")},em=function(t,e){le.cache++,(e||!bn)&&le.forEach(function(n){return gn(n)&&n.cacheID++&&(n.rec=0)}),Vn(t)&&(ae.history.scrollRestoration=pu=t)},bn,ts=0,gf,Ug=function(){if(gf!==ts){var t=gf=ts;requestAnimationFrame(function(){return t===ts&&Yr(!0)})}},nm=function(){xe.appendChild(Vs),mu=!En&&Vs.offsetHeight||ae.innerHeight,xe.removeChild(Vs)},_f=function(t){return sa(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Yr=function(t,e){if(Xn=ye.documentElement,xe=ye.body,du=[ae,ye,Xn,xe],ci&&!t&&!Ho){sn(ce,"scrollEnd",jp);return}nm(),bn=ce.isRefreshing=!0,Ho||tm();var n=is("refreshInit");Gp&&ce.sort(),e||Mu(),le.forEach(function(i){gn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),se.slice(0).forEach(function(i){return i.refresh()}),Ho=!1,se.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),eh=1,_f(!0),se.forEach(function(i){var s=bi(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),_f(!1),eh=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),le.forEach(function(i){gn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),em(pu,1),Sl.pause(),ts++,bn=2,Yi(2),se.forEach(function(i){return gn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),bn=ce.isRefreshing=!1,is("refresh")},ih=0,sl=1,qo,Yi=function(t){if(t===2||!bn&&!Ho){ce.isUpdating=!0,qo&&qo.update(0);var e=se.length,n=dn(),i=n-Zl>=50,s=e&&se[0].scroll();if(sl=ih>s?-1:1,bn||(ih=s),i&&(ci&&!Il&&n-ci>200&&(ci=0,is("scrollEnd")),Ro=Zl,Zl=n),sl<0){for(Tn=e;Tn-- >0;)se[Tn]&&se[Tn].update(0,i);sl=1}else for(Tn=0;Tn<e;Tn++)se[Tn]&&se[Tn].update(0,i);ce.isUpdating=!1}oa=0},rh=[Zp,Jp,_u,gu,si+Yo,si+Vo,si+Xo,si+Wo,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],ol=rh.concat([jr,Qr,"boxSizing","max"+Qs,"max"+vu,"position",si,Ye,Ye+Xo,Ye+Vo,Ye+Yo,Ye+Wo]),Ng=function(t,e,n){Ws(n);var i=t._gsap;if(i.spacerIsNative)Ws(i.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},Kl=function(t,e,n,i){if(!t._gsap.swappedIn){for(var s=rh.length,o=e.style,a=t.style,l;s--;)l=rh[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[_u]=a[gu]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[jr]=wl(t,An)+Je,o[Qr]=wl(t,je)+Je,o[Ye]=a[si]=a[Jp]=a[Zp]="0",Ws(i),a[jr]=a["max"+Qs]=n[jr],a[Qr]=a["max"+vu]=n[Qr],a[Ye]=n[Ye],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},Og=/([A-Z])/g,Ws=function(t){if(t){var e=t.t.style,n=t.length,i=0,s,o;for((t.t._gsap||It.core.getCache(t.t)).uncache=1;i<n;i+=2)o=t[i+1],s=t[i],o?e[s]=o:e[s]&&e.removeProperty(s.replace(Og,"-$1").toLowerCase())}},wa=function(t){for(var e=ol.length,n=t.style,i=[],s=0;s<e;s++)i.push(ol[s],n[ol[s]]);return i.t=t,i},Fg=function(t,e,n){for(var i=[],s=t.length,o=n?8:0,a;o<s;o+=2)a=t[o],i.push(a,a in e?e[a]:t[o+1]);return i.t=t.t,i},al={left:0,top:0},vf=function(t,e,n,i,s,o,a,l,c,h,u,f,d,p){gn(t)&&(t=t(l)),Vn(t)&&t.substr(0,3)==="max"&&(t=f+(t.charAt(4)==="="?il("0"+t.substr(3),n):0));var _=d?d.time():0,g,m,y;if(d&&d.seek(0),isNaN(t)||(t=+t),Do(t))d&&(t=It.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,t)),a&&rl(a,n,i,!0);else{gn(e)&&(e=e(l));var x=(t||"0").split(" "),v,C,b,w;y=Rn(e,l)||xe,v=Vi(y)||{},(!v||!v.left&&!v.top)&&oi(y).display==="none"&&(w=y.style.display,y.style.display="block",v=Vi(y),w?y.style.display=w:y.style.removeProperty("display")),C=il(x[0],v[i.d]),b=il(x[1]||"0",n),t=v[i.p]-c[i.p]-h+C+s-b,a&&rl(a,b,i,n-b<20||a._isStart&&b>20),n-=n-b}if(p&&(l[p]=t||-.001,t<0&&(t=0)),o){var R=t+n,S=o._isStart;g="scroll"+i.d2,rl(o,R,i,S&&R>20||!S&&(u?Math.max(xe[g],Xn[g]):o.parentNode[g])<=R+1),u&&(c=Vi(a),u&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+Je))}return d&&y&&(g=Vi(y),d.seek(f),m=Vi(y),d._caScrollDist=g[i.p]-m[i.p],t=t/d._caScrollDist*f),d&&d.seek(_),d?t:Math.round(t)},Bg=/(webkit|moz|length|cssText|inset)/i,xf=function(t,e,n,i){if(t.parentNode!==e){var s=t.style,o,a;if(e===xe){t._stOrig=s.cssText,a=oi(t);for(o in a)!+o&&!Bg.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=t._stOrig;It.core.getCache(t).uncache=1,e.appendChild(t)}},im=function(t,e,n){var i=e,s=i;return function(o){var a=Math.round(t());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},Ea=function(t,e,n){var i={};i[e.p]="+="+n,It.set(t,i)},Mf=function(t,e){var n=wr(t,e),i="_scroll"+e.p2,s=function o(a,l,c,h,u){var f=o.tween,d=l.onComplete,p={};c=c||n();var _=im(n,c,function(){f.kill(),o.tween=0});return u=h&&u||0,h=h||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=p,p[i]=function(){return _(c+h*f.ratio+u*f.ratio*f.ratio)},l.onUpdate=function(){le.cache++,o.tween&&Yi()},l.onComplete=function(){o.tween=0,d&&d.call(f)},f=o.tween=It.to(t,l),f};return t[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},sn(t,"wheel",n.wheelHandler),ce.isTouch&&sn(t,"touchmove",n.wheelHandler),s},ce=(function(){function r(e,n){Ls||r.register(It)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),th(this),this.init(e,n)}var t=r.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Po){this.update=this.refresh=this.kill=yi;return}n=df(Vn(n)||Do(n)||n.nodeType?{trigger:n}:n,ya);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,h=s.onRefresh,u=s.scrub,f=s.trigger,d=s.pin,p=s.pinSpacing,_=s.invalidateOnRefresh,g=s.anticipatePin,m=s.onScrubComplete,y=s.onSnapComplete,x=s.once,v=s.snap,C=s.pinReparent,b=s.pinSpacer,w=s.containerAnimation,R=s.fastScrollEnd,S=s.preventOverlaps,M=n.horizontal||n.containerAnimation&&n.horizontal!==!1?An:je,P=!u&&u!==0,I=Rn(n.scroller||ae),F=It.core.getCache(I),k=es(I),X=("pinType"in n?n.pinType:gr(I,"pinType")||k&&"fixed")==="fixed",H=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],W=P&&n.toggleActions.split(" "),G="markers"in n?n.markers:ya.markers,it=k?0:parseFloat(oi(I)["border"+M.p2+Qs])||0,D=this,ct=n.onRefreshInit&&function(){return n.onRefreshInit(D)},Lt=Cg(I,k,M),$t=Rg(I,k),$=0,rt=0,vt=0,st=wr(I,M),Ct,Ut,zt,Wt,tt,et,L,bt,ot,O,lt,Ft,Mt,A,E,V,K,Q,j,pt,ut,_t,Yt,at,ft,Gt,kt,Rt,jt,Vt,oe,U,mt,Z,nt,gt,xt,Xt,he;if(D._startClamp=D._endClamp=!1,D._dir=M,g*=45,D.scroller=I,D.scroll=w?w.time.bind(w):st,Wt=st(),D.vars=n,i=i||n.animation,"refreshPriority"in n&&(Gp=1,n.refreshPriority===-9999&&(qo=D)),F.tweenScroll=F.tweenScroll||{top:Mf(I,je),left:Mf(I,An)},D.tweenTo=Ct=F.tweenScroll[M.p],D.scrubDuration=function(yt){mt=Do(yt)&&yt,mt?U?U.duration(yt):U=It.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:mt,paused:!0,onComplete:function(){return m&&m(D)}}):(U&&U.progress(1).kill(),U=0)},i&&(i.vars.lazy=!1,i._initted&&!D.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),D.animation=i.pause(),i.scrollTrigger=D,D.scrubDuration(u),Vt=0,l||(l=i.vars.id)),v&&((!Br(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in xe.style&&It.set(k?[xe,Xn]:I,{scrollBehavior:"auto"}),le.forEach(function(yt){return gn(yt)&&yt.target===(k?ye.scrollingElement||Xn:I)&&(yt.smooth=!1)}),zt=gn(v.snapTo)?v.snapTo:v.snapTo==="labels"?Lg(i):v.snapTo==="labelsDirectional"?Dg(i):v.directional!==!1?function(yt,Zt){return xu(v.snapTo)(yt,dn()-rt<500?0:Zt.direction)}:It.utils.snap(v.snapTo),Z=v.duration||{min:.1,max:2},Z=Br(Z)?Go(Z.min,Z.max):Go(Z,Z),nt=It.delayedCall(v.delay||mt/2||.1,function(){var yt=st(),Zt=dn()-rt<500,Ot=Ct.tween;if((Zt||Math.abs(D.getVelocity())<10)&&!Ot&&!Il&&$!==yt){var qt=(yt-et)/A,Le=i&&!P?i.totalProgress():qt,ne=Zt?0:(Le-oe)/(dn()-Ro)*1e3||0,Re=It.utils.clamp(-qt,1-qt,ds(ne/2)*ne/.185),Ze=qt+(v.inertia===!1?0:Re),Ee,Te,me=v,Fn=me.onStart,De=me.onInterrupt,Mn=me.onComplete;if(Ee=zt(Ze,D),Do(Ee)||(Ee=Ze),Te=Math.max(0,Math.round(et+Ee*A)),yt<=L&&yt>=et&&Te!==yt){if(Ot&&!Ot._initted&&Ot.data<=ds(Te-yt))return;v.inertia===!1&&(Re=Ee-qt),Ct(Te,{duration:Z(ds(Math.max(ds(Ze-Le),ds(Ee-Le))*.185/ne/.05||0)),ease:v.ease||"power3",data:ds(Te-yt),onInterrupt:function(){return nt.restart(!0)&&De&&fs(D,De)},onComplete:function(){D.update(),$=st(),i&&!P&&(U?U.resetTo("totalProgress",Ee,i._tTime/i._tDur):i.progress(Ee)),Vt=oe=i&&!P?i.totalProgress():D.progress,y&&y(D),Mn&&fs(D,Mn)}},yt,Re*A,Te-yt-Re*A),Fn&&fs(D,Fn,Ct.tween)}}else D.isActive&&$!==yt&&nt.restart(!0)}).pause()),l&&(nh[l]=D),f=D.trigger=Rn(f||d!==!0&&d),he=f&&f._gsap&&f._gsap.stRevert,he&&(he=he(D)),d=d===!0?f:Rn(d),Vn(a)&&(a={targets:f,className:a}),d&&(p===!1||p===si||(p=!p&&d.parentNode&&d.parentNode.style&&oi(d.parentNode).display==="flex"?!1:Ye),D.pin=d,Ut=It.core.getCache(d),Ut.spacer?E=Ut.pinState:(b&&(b=Rn(b),b&&!b.nodeType&&(b=b.current||b.nativeElement),Ut.spacerIsNative=!!b,b&&(Ut.spacerState=wa(b))),Ut.spacer=Q=b||ye.createElement("div"),Q.classList.add("pin-spacer"),l&&Q.classList.add("pin-spacer-"+l),Ut.pinState=E=wa(d)),n.force3D!==!1&&It.set(d,{force3D:!0}),D.spacer=Q=Ut.spacer,jt=oi(d),at=jt[p+M.os2],pt=It.getProperty(d),ut=It.quickSetter(d,M.a,Je),Kl(d,Q,jt),K=wa(d)),G){Ft=Br(G)?df(G,pf):pf,O=Sa("scroller-start",l,I,M,Ft,0),lt=Sa("scroller-end",l,I,M,Ft,0,O),j=O["offset"+M.op.d2];var Ce=Rn(gr(I,"content")||I);bt=this.markerStart=Sa("start",l,Ce,M,Ft,j,0,w),ot=this.markerEnd=Sa("end",l,Ce,M,Ft,j,0,w),w&&(Xt=It.quickSetter([bt,ot],M.a,Je)),!X&&!(Ri.length&&gr(I,"fixedMarkers")===!0)&&(Pg(k?xe:I),It.set([O,lt],{force3D:!0}),Gt=It.quickSetter(O,M.a,Je),Rt=It.quickSetter(lt,M.a,Je))}if(w){var Tt=w.vars.onUpdate,Dt=w.vars.onUpdateParams;w.eventCallback("onUpdate",function(){D.update(0,0,1),Tt&&Tt.apply(w,Dt||[])})}if(D.previous=function(){return se[se.indexOf(D)-1]},D.next=function(){return se[se.indexOf(D)+1]},D.revert=function(yt,Zt){if(!Zt)return D.kill(!0);var Ot=yt!==!1||!D.enabled,qt=fn;Ot!==D.isReverted&&(Ot&&(gt=Math.max(st(),D.scroll.rec||0),vt=D.progress,xt=i&&i.progress()),bt&&[bt,ot,O,lt].forEach(function(Le){return Le.style.display=Ot?"none":"block"}),Ot&&(fn=D,D.update(Ot)),d&&(!C||!D.isActive)&&(Ot?Ng(d,Q,E):Kl(d,Q,oi(d),ft)),Ot||D.update(Ot),fn=qt,D.isReverted=Ot)},D.refresh=function(yt,Zt,Ot,qt){if(!((fn||!D.enabled)&&!Zt)){if(d&&yt&&ci){sn(r,"scrollEnd",jp);return}!bn&&ct&&ct(D),fn=D,Ct.tween&&!Ot&&(Ct.tween.kill(),Ct.tween=0),U&&U.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(Fe){return Fe.vars.immediateRender&&Fe.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),D.isReverted||D.revert(!0,!0),D._subPinOffset=!1;var Le=Lt(),ne=$t(),Re=w?w.duration():bi(I,M),Ze=A<=.01||!A,Ee=0,Te=qt||0,me=Br(Ot)?Ot.end:n.end,Fn=n.endTrigger||f,De=Br(Ot)?Ot.start:n.start||(n.start===0||!f?0:d?"0 0":"0 100%"),Mn=D.pinnedContainer=n.pinnedContainer&&Rn(n.pinnedContainer,D),T=f&&Math.max(0,se.indexOf(D))||0,B=T,Y,q,z,ht,dt,St,Pt,Jt,te,Nt,ee,pe,ge;for(G&&Br(Ot)&&(pe=It.getProperty(O,M.p),ge=It.getProperty(lt,M.p));B-- >0;)St=se[B],St.end||St.refresh(0,1)||(fn=D),Pt=St.pin,Pt&&(Pt===f||Pt===d||Pt===Mn)&&!St.isReverted&&(Nt||(Nt=[]),Nt.unshift(St),St.revert(!0,!0)),St!==se[B]&&(T--,B--);for(gn(De)&&(De=De(D)),De=cf(De,"start",D),et=vf(De,f,Le,M,st(),bt,O,D,ne,it,X,Re,w,D._startClamp&&"_startClamp")||(d?-.001:0),gn(me)&&(me=me(D)),Vn(me)&&!me.indexOf("+=")&&(~me.indexOf(" ")?me=(Vn(De)?De.split(" ")[0]:"")+me:(Ee=il(me.substr(2),Le),me=Vn(De)?De:(w?It.utils.mapRange(0,w.duration(),w.scrollTrigger.start,w.scrollTrigger.end,et):et)+Ee,Fn=f)),me=cf(me,"end",D),L=Math.max(et,vf(me||(Fn?"100% 0":Re),Fn,Le,M,st()+Ee,ot,lt,D,ne,it,X,Re,w,D._endClamp&&"_endClamp"))||-.001,Ee=0,B=T;B--;)St=se[B]||{},Pt=St.pin,Pt&&St.start-St._pinPush<=et&&!w&&St.end>0&&(Y=St.end-(D._startClamp?Math.max(0,St.start):St.start),(Pt===f&&St.start-St._pinPush<et||Pt===Mn)&&isNaN(De)&&(Ee+=Y*(1-St.progress)),Pt===d&&(Te+=Y));if(et+=Ee,L+=Ee,D._startClamp&&(D._startClamp+=Ee),D._endClamp&&!bn&&(D._endClamp=L||-.001,L=Math.min(L,bi(I,M))),A=L-et||(et-=.01)&&.001,Ze&&(vt=It.utils.clamp(0,1,It.utils.normalize(et,L,gt))),D._pinPush=Te,bt&&Ee&&(Y={},Y[M.a]="+="+Ee,Mn&&(Y[M.p]="-="+st()),It.set([bt,ot],Y)),d&&!(eh&&D.end>=bi(I,M)))Y=oi(d),ht=M===je,z=st(),_t=parseFloat(pt(M.a))+Te,!Re&&L>1&&(ee=(k?ye.scrollingElement||Xn:I).style,ee={style:ee,value:ee["overflow"+M.a.toUpperCase()]},k&&oi(xe)["overflow"+M.a.toUpperCase()]!=="scroll"&&(ee.style["overflow"+M.a.toUpperCase()]="scroll")),Kl(d,Q,Y),K=wa(d),q=Vi(d,!0),Jt=X&&wr(I,ht?An:je)(),p?(ft=[p+M.os2,A+Te+Je],ft.t=Q,B=p===Ye?wl(d,M)+A+Te:0,B&&(ft.push(M.d,B+Je),Q.style.flexBasis!=="auto"&&(Q.style.flexBasis=B+Je)),Ws(ft),Mn&&se.forEach(function(Fe){Fe.pin===Mn&&Fe.vars.pinSpacing!==!1&&(Fe._subPinOffset=!0)}),X&&st(gt)):(B=wl(d,M),B&&Q.style.flexBasis!=="auto"&&(Q.style.flexBasis=B+Je)),X&&(dt={top:q.top+(ht?z-et:Jt)+Je,left:q.left+(ht?Jt:z-et)+Je,boxSizing:"border-box",position:"fixed"},dt[jr]=dt["max"+Qs]=Math.ceil(q.width)+Je,dt[Qr]=dt["max"+vu]=Math.ceil(q.height)+Je,dt[si]=dt[si+Xo]=dt[si+Vo]=dt[si+Yo]=dt[si+Wo]="0",dt[Ye]=Y[Ye],dt[Ye+Xo]=Y[Ye+Xo],dt[Ye+Vo]=Y[Ye+Vo],dt[Ye+Yo]=Y[Ye+Yo],dt[Ye+Wo]=Y[Ye+Wo],V=Fg(E,dt,C),bn&&st(0)),i?(te=i._initted,ql(1),i.render(i.duration(),!0,!0),Yt=pt(M.a)-_t+A+Te,kt=Math.abs(A-Yt)>1,X&&kt&&V.splice(V.length-2,2),i.render(0,!0,!0),te||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),ql(0)):Yt=A,ee&&(ee.value?ee.style["overflow"+M.a.toUpperCase()]=ee.value:ee.style.removeProperty("overflow-"+M.a));else if(f&&st()&&!w)for(q=f.parentNode;q&&q!==xe;)q._pinOffset&&(et-=q._pinOffset,L-=q._pinOffset),q=q.parentNode;Nt&&Nt.forEach(function(Fe){return Fe.revert(!1,!0)}),D.start=et,D.end=L,Wt=tt=bn?gt:st(),!w&&!bn&&(Wt<gt&&st(gt),D.scroll.rec=0),D.revert(!1,!0),rt=dn(),nt&&($=-1,nt.restart(!0)),fn=0,i&&P&&(i._initted||xt)&&i.progress()!==xt&&i.progress(xt||0,!0).render(i.time(),!0,!0),(Ze||vt!==D.progress||w||_||i&&!i._initted)&&(i&&!P&&(i._initted||vt||i.vars.immediateRender!==!1)&&i.totalProgress(w&&et<-.001&&!vt?It.utils.normalize(et,L,0):vt,!0),D.progress=Ze||(Wt-et)/A===vt?0:vt),d&&p&&(Q._pinOffset=Math.round(D.progress*Yt)),U&&U.invalidate(),isNaN(pe)||(pe-=It.getProperty(O,M.p),ge-=It.getProperty(lt,M.p),Ea(O,M,pe),Ea(bt,M,pe-(qt||0)),Ea(lt,M,ge),Ea(ot,M,ge-(qt||0))),Ze&&!bn&&D.update(),h&&!bn&&!Mt&&(Mt=!0,h(D),Mt=!1)}},D.getVelocity=function(){return(st()-tt)/(dn()-Ro)*1e3||0},D.endAnimation=function(){_o(D.callbackAnimation),i&&(U?U.progress(1):i.paused()?P||_o(i,D.direction<0,1):_o(i,i.reversed()))},D.labelToScroll=function(yt){return i&&i.labels&&(et||D.refresh()||et)+i.labels[yt]/i.duration()*A||0},D.getTrailing=function(yt){var Zt=se.indexOf(D),Ot=D.direction>0?se.slice(0,Zt).reverse():se.slice(Zt+1);return(Vn(yt)?Ot.filter(function(qt){return qt.vars.preventOverlaps===yt}):Ot).filter(function(qt){return D.direction>0?qt.end<=et:qt.start>=L})},D.update=function(yt,Zt,Ot){if(!(w&&!Ot&&!yt)){var qt=bn===!0?gt:D.scroll(),Le=yt?0:(qt-et)/A,ne=Le<0?0:Le>1?1:Le||0,Re=D.progress,Ze,Ee,Te,me,Fn,De,Mn,T;if(Zt&&(tt=Wt,Wt=w?st():qt,v&&(oe=Vt,Vt=i&&!P?i.totalProgress():ne)),g&&d&&!fn&&!_a&&ci&&(!ne&&et<qt+(qt-tt)/(dn()-Ro)*g?ne=1e-4:ne===1&&L>qt+(qt-tt)/(dn()-Ro)*g&&(ne=.9999)),ne!==Re&&D.enabled){if(Ze=D.isActive=!!ne&&ne<1,Ee=!!Re&&Re<1,De=Ze!==Ee,Fn=De||!!ne!=!!Re,D.direction=ne>Re?1:-1,D.progress=ne,Fn&&!fn&&(Te=ne&&!Re?0:ne===1?1:Re===1?2:3,P&&(me=!De&&W[Te+1]!=="none"&&W[Te+1]||W[Te],T=i&&(me==="complete"||me==="reset"||me in i))),S&&(De||T)&&(T||u||!i)&&(gn(S)?S(D):D.getTrailing(S).forEach(function(z){return z.endAnimation()})),P||(U&&!fn&&!_a?(U._dp._time-U._start!==U._time&&U.render(U._dp._time-U._start),U.resetTo?U.resetTo("totalProgress",ne,i._tTime/i._tDur):(U.vars.totalProgress=ne,U.invalidate().restart())):i&&i.totalProgress(ne,!!(fn&&(rt||yt)))),d){if(yt&&p&&(Q.style[p+M.os2]=at),!X)ut(Lo(_t+Yt*ne));else if(Fn){if(Mn=!yt&&ne>Re&&L+1>qt&&qt+1>=bi(I,M),C)if(!yt&&(Ze||Mn)){var B=Vi(d,!0),Y=qt-et;xf(d,xe,B.top+(M===je?Y:0)+Je,B.left+(M===je?0:Y)+Je)}else xf(d,Q);Ws(Ze||Mn?V:K),kt&&ne<1&&Ze||ut(_t+(ne===1&&!Mn?Yt:0))}}v&&!Ct.tween&&!fn&&!_a&&nt.restart(!0),a&&(De||x&&ne&&(ne<1||!$l))&&sa(a.targets).forEach(function(z){return z.classList[Ze||x?"add":"remove"](a.className)}),o&&!P&&!yt&&o(D),Fn&&!fn?(P&&(T&&(me==="complete"?i.pause().totalProgress(1):me==="reset"?i.restart(!0).pause():me==="restart"?i.restart(!0):i[me]()),o&&o(D)),(De||!$l)&&(c&&De&&fs(D,c),H[Te]&&fs(D,H[Te]),x&&(ne===1?D.kill(!1,1):H[Te]=0),De||(Te=ne===1?1:3,H[Te]&&fs(D,H[Te]))),R&&!Ze&&Math.abs(D.getVelocity())>(Do(R)?R:2500)&&(_o(D.callbackAnimation),U?U.progress(1):_o(i,me==="reverse"?1:!ne,1))):P&&o&&!fn&&o(D)}if(Rt){var q=w?qt/w.duration()*(w._caScrollDist||0):qt;Gt(q+(O._isFlipped?1:0)),Rt(q)}Xt&&Xt(-qt/w.duration()*(w._caScrollDist||0))}},D.enable=function(yt,Zt){D.enabled||(D.enabled=!0,sn(I,"resize",Io),k||sn(I,"scroll",ps),ct&&sn(r,"refreshInit",ct),yt!==!1&&(D.progress=vt=0,Wt=tt=$=st()),Zt!==!1&&D.refresh())},D.getTween=function(yt){return yt&&Ct?Ct.tween:U},D.setPositions=function(yt,Zt,Ot,qt){if(w){var Le=w.scrollTrigger,ne=w.duration(),Re=Le.end-Le.start;yt=Le.start+Re*yt/ne,Zt=Le.start+Re*Zt/ne}D.refresh(!1,!1,{start:hf(yt,Ot&&!!D._startClamp),end:hf(Zt,Ot&&!!D._endClamp)},qt),D.update()},D.adjustPinSpacing=function(yt){if(ft&&yt){var Zt=ft.indexOf(M.d)+1;ft[Zt]=parseFloat(ft[Zt])+yt+Je,ft[1]=parseFloat(ft[1])+yt+Je,Ws(ft)}},D.disable=function(yt,Zt){if(yt!==!1&&D.revert(!0,!0),D.enabled&&(D.enabled=D.isActive=!1,Zt||U&&U.pause(),gt=0,Ut&&(Ut.uncache=1),ct&&rn(r,"refreshInit",ct),nt&&(nt.pause(),Ct.tween&&Ct.tween.kill()&&(Ct.tween=0)),!k)){for(var Ot=se.length;Ot--;)if(se[Ot].scroller===I&&se[Ot]!==D)return;rn(I,"resize",Io),k||rn(I,"scroll",ps)}},D.kill=function(yt,Zt){D.disable(yt,Zt),U&&!Zt&&U.kill(),l&&delete nh[l];var Ot=se.indexOf(D);Ot>=0&&se.splice(Ot,1),Ot===Tn&&sl>0&&Tn--,Ot=0,se.forEach(function(qt){return qt.scroller===D.scroller&&(Ot=1)}),Ot||bn||(D.scroll.rec=0),i&&(i.scrollTrigger=null,yt&&i.revert({kill:!1}),Zt||i.kill()),bt&&[bt,ot,O,lt].forEach(function(qt){return qt.parentNode&&qt.parentNode.removeChild(qt)}),qo===D&&(qo=0),d&&(Ut&&(Ut.uncache=1),Ot=0,se.forEach(function(qt){return qt.pin===d&&Ot++}),Ot||(Ut.spacer=0)),n.onKill&&n.onKill(D)},se.push(D),D.enable(!1,!1),he&&he(D),i&&i.add&&!A){var Qt=D.update;D.update=function(){D.update=Qt,le.cache++,et||L||D.refresh()},It.delayedCall(.01,D.update),A=.01,et=L=0}else D.refresh();d&&Ug()},r.register=function(n){return Ls||(It=n||Yp(),Xp()&&window.document&&r.enable(),Ls=Po),Ls},r.defaults=function(n){if(n)for(var i in n)ya[i]=n[i];return ya},r.disable=function(n,i){Po=0,se.forEach(function(o){return o[i?"kill":"disable"](n)}),rn(ae,"wheel",ps),rn(ye,"scroll",ps),clearInterval(ga),rn(ye,"touchcancel",yi),rn(xe,"touchstart",yi),xa(rn,ye,"pointerdown,touchstart,mousedown",uf),xa(rn,ye,"pointerup,touchend,mouseup",ff),Sl.kill(),va(rn);for(var s=0;s<le.length;s+=3)Ma(rn,le[s],le[s+1]),Ma(rn,le[s],le[s+2])},r.enable=function(){if(ae=window,ye=document,Xn=ye.documentElement,xe=ye.body,It){if(sa=It.utils.toArray,Go=It.utils.clamp,th=It.core.context||yi,ql=It.core.suppressOverwrites||yi,pu=ae.history.scrollRestoration||"auto",ih=ae.pageYOffset||0,It.core.globals("ScrollTrigger",r),xe){Po=1,Vs=document.createElement("div"),Vs.style.height="100vh",Vs.style.position="absolute",nm(),Ag(),We.register(It),r.isTouch=We.isTouch,or=We.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Qc=We.isTouch===1,sn(ae,"wheel",ps),du=[ae,ye,Xn,xe],It.matchMedia?(r.matchMedia=function(h){var u=It.matchMedia(),f;for(f in h)u.add(f,h[f]);return u},It.addEventListener("matchMediaInit",function(){tm(),Mu()}),It.addEventListener("matchMediaRevert",function(){return Qp()}),It.addEventListener("matchMedia",function(){Yr(0,1),is("matchMedia")}),It.matchMedia().add("(orientation: portrait)",function(){return Jl(),Jl})):console.warn("Requires GSAP 3.11.0 or later"),Jl(),sn(ye,"scroll",ps);var n=xe.hasAttribute("style"),i=xe.style,s=i.borderTopStyle,o=It.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Vi(xe),je.m=Math.round(a.top+je.sc())||0,An.m=Math.round(a.left+An.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(xe.setAttribute("style",""),xe.removeAttribute("style")),ga=setInterval(mf,250),It.delayedCall(.5,function(){return _a=0}),sn(ye,"touchcancel",yi),sn(xe,"touchstart",yi),xa(sn,ye,"pointerdown,touchstart,mousedown",uf),xa(sn,ye,"pointerup,touchend,mouseup",ff),jc=It.utils.checkPrefix("transform"),ol.push(jc),Ls=dn(),Sl=It.delayedCall(.2,Yr).pause(),Ds=[ye,"visibilitychange",function(){var h=ae.innerWidth,u=ae.innerHeight;ye.hidden?(af=h,lf=u):(af!==h||lf!==u)&&Io()},ye,"DOMContentLoaded",Yr,ae,"load",Yr,ae,"resize",Io],va(sn),se.forEach(function(h){return h.enable(0,1)}),l=0;l<le.length;l+=3)Ma(rn,le[l],le[l+1]),Ma(rn,le[l],le[l+2])}else if(ye){var c=function h(){r.enable(),ye.removeEventListener("DOMContentLoaded",h)};ye.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&($l=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(ga)||(ga=i)&&setInterval(mf,i),"ignoreMobileResize"in n&&(Qc=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(va(rn)||va(sn,n.autoRefreshEvents||"none"),Hp=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=Rn(n),o=le.indexOf(s),a=es(s);~o&&le.splice(o,a?6:2),i&&(a?Ri.unshift(ae,i,xe,i,Xn,i):Ri.unshift(s,i))},r.clearMatchMedia=function(n){se.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Vn(n)?Rn(n):n).getBoundingClientRect(),a=o[s?jr:Qr]*i||0;return s?o.right-a>0&&o.left+a<ae.innerWidth:o.bottom-a>0&&o.top+a<ae.innerHeight},r.positionInViewport=function(n,i,s){Vn(n)&&(n=Rn(n));var o=n.getBoundingClientRect(),a=o[s?jr:Qr],l=i==null?a/2:i in El?El[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/ae.innerWidth:(o.top+l)/ae.innerHeight},r.killAll=function(n){if(se.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=ns.killAll||[];ns={},i.forEach(function(s){return s()})}},r})();ce.version="3.15.0";ce.saveStyles=function(r){return r?sa(r).forEach(function(t){if(t&&t.style){var e=Hn.indexOf(t);e>=0&&Hn.splice(e,5),Hn.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),It.core.getCache(t),th())}}):Hn};ce.revert=function(r,t){return Mu(!r,t)};ce.create=function(r,t){return new ce(r,t)};ce.refresh=function(r){return r?Io(!0):(Ls||ce.register())&&Yr(!0)};ce.update=function(r){return++le.cache&&Yi(r===!0?2:0)};ce.clearScrollMemory=em;ce.maxScroll=function(r,t){return bi(r,t?An:je)};ce.getScrollFunc=function(r,t){return wr(Rn(r),t?An:je)};ce.getById=function(r){return nh[r]};ce.getAll=function(){return se.filter(function(r){return r.vars.id!=="ScrollSmoother"})};ce.isScrolling=function(){return!!ci};ce.snapDirectional=xu;ce.addEventListener=function(r,t){var e=ns[r]||(ns[r]=[]);~e.indexOf(t)||e.push(t)};ce.removeEventListener=function(r,t){var e=ns[r],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};ce.batch=function(r,t){var e=[],n={},i=t.interval||.016,s=t.batchMax||1e9,o=function(c,h){var u=[],f=[],d=It.delayedCall(i,function(){h(u,f),u=[],f=[]}).pause();return function(p){u.length||d.restart(!0),u.push(p.trigger),f.push(p),s<=u.length&&d.progress(1)}},a;for(a in t)n[a]=a.substr(0,2)==="on"&&gn(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return gn(s)&&(s=s(),sn(ce,"refresh",function(){return s=t.batchMax()})),sa(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,e.push(ce.create(c))}),e};var yf=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},jl=function r(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(We.isTouch?" pinch-zoom":""):"none",t===Xn&&r(xe,e)},Ta={auto:1,scroll:1},zg=function(t){var e=t.event,n=t.target,i=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,o=s._gsap||It.core.getCache(s),a=dn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==xe&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Ta[(l=oi(s)).overflowY]||Ta[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!es(s)&&(Ta[(l=oi(s)).overflowY]||Ta[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},rm=function(t,e,n,i){return We.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&zg,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&sn(ye,We.eventTypes[0],wf,!1,!0)},onDisable:function(){return rn(ye,We.eventTypes[0],wf,!0)}})},kg=/(input|label|select|textarea)/i,Sf,wf=function(t){var e=kg.test(t.target.tagName);(e||Sf)&&(t._gsapAllow=!0,Sf=e)},Gg=function(t){Br(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,s=e.allowNestedScroll,o=e.onRelease,a,l,c=Rn(t.target)||Xn,h=It.core.globals().ScrollSmoother,u=h&&h.get(),f=or&&(t.content&&Rn(t.content)||u&&t.content!==!1&&!u.smooth()&&u.content()),d=wr(c,je),p=wr(c,An),_=1,g=(We.isTouch&&ae.visualViewport?ae.visualViewport.scale*ae.visualViewport.width:ae.outerWidth)/ae.innerWidth,m=0,y=gn(i)?function(){return i(a)}:function(){return i||2.8},x,v,C=rm(c,t.type,!0,s),b=function(){return v=!1},w=yi,R=yi,S=function(){l=bi(c,je),R=Go(or?1:0,l),n&&(w=Go(0,bi(c,An))),x=ts},M=function(){f._gsap.y=Lo(parseFloat(f._gsap.y)+d.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},P=function(){if(v){requestAnimationFrame(b);var G=Lo(a.deltaY/2),it=R(d.v-G);if(f&&it!==d.v+d.offset){d.offset=it-d.v;var D=Lo((parseFloat(f&&f._gsap.y)||0)-d.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+D+", 0, 1)",f._gsap.y=D+"px",d.cacheID=le.cache,Yi()}return!0}d.offset&&M(),v=!0},I,F,k,X,H=function(){S(),I.isActive()&&I.vars.scrollY>l&&(d()>l?I.progress(1)&&d(l):I.resetTo("scrollY",l))};return f&&It.set(f,{y:"+=0"}),t.ignoreCheck=function(W){return or&&W.type==="touchmove"&&P()||_>1.05&&W.type!=="touchstart"||a.isGesturing||W.touches&&W.touches.length>1},t.onPress=function(){v=!1;var W=_;_=Lo((ae.visualViewport&&ae.visualViewport.scale||1)/g),I.pause(),W!==_&&jl(c,_>1.01?!0:n?!1:"x"),F=p(),k=d(),S(),x=ts},t.onRelease=t.onGestureStart=function(W,G){if(d.offset&&M(),!G)X.restart(!0);else{le.cache++;var it=y(),D,ct;n&&(D=p(),ct=D+it*.05*-W.velocityX/.227,it*=yf(p,D,ct,bi(c,An)),I.vars.scrollX=w(ct)),D=d(),ct=D+it*.05*-W.velocityY/.227,it*=yf(d,D,ct,bi(c,je)),I.vars.scrollY=R(ct),I.invalidate().duration(it).play(.01),(or&&I.vars.scrollY>=l||D>=l-1)&&It.to({},{onUpdate:H,duration:it})}o&&o(W)},t.onWheel=function(){I._ts&&I.pause(),dn()-m>1e3&&(x=0,m=dn())},t.onChange=function(W,G,it,D,ct){if(ts!==x&&S(),G&&n&&p(w(D[2]===G?F+(W.startX-W.x):p()+G-D[1])),it){d.offset&&M();var Lt=ct[2]===it,$t=Lt?k+W.startY-W.y:d()+it-ct[1],$=R($t);Lt&&$t!==$&&(k+=$-$t),d($)}(it||G)&&Yi()},t.onEnable=function(){jl(c,n?!1:"x"),ce.addEventListener("refresh",H),sn(ae,"resize",H),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=p.smooth=!1),C.enable()},t.onDisable=function(){jl(c,!0),rn(ae,"resize",H),ce.removeEventListener("refresh",H),C.kill()},t.lockAxis=t.lockAxis!==!1,a=new We(t),a.iOS=or,or&&!d()&&d(1),or&&It.ticker.add(yi),X=a._dc,I=It.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:im(d,d(),function(){return I.pause()})},onUpdate:Yi,onComplete:X.vars.onComplete}),a};ce.sort=function(r){if(gn(r))return se.sort(r);var t=ae.pageYOffset||0;return ce.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+ae.innerHeight}),se.sort(r||function(e,n){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};ce.observe=function(r){return new We(r)};ce.normalizeScroll=function(r){if(typeof r>"u")return En;if(r===!0&&En)return En.enable();if(r===!1){En&&En.kill(),En=r;return}var t=r instanceof We?r:Gg(r);return En&&En.target===t.target&&En.kill(),es(t.target)&&(En=t),t};ce.core={_getVelocityProp:Kc,_inputObserver:rm,_scrollers:le,_proxies:Ri,bridge:{ss:function(){ci||is("scrollStart"),ci=dn()},ref:function(){return fn}}};Yp()&&It.registerPlugin(ce);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const yu="170",Hg=0,Ef=1,Vg=2,Wg=0,sm=1,Xg=2,zi=3,Er=0,Nn=1,qe=2,_r=0,Xs=1,sh=2,Tf=3,bf=4,Yg=5,Gr=100,qg=101,$g=102,Zg=103,Jg=104,Kg=200,jg=201,Qg=202,t_=203,oh=204,ah=205,e_=206,n_=207,i_=208,r_=209,s_=210,o_=211,a_=212,l_=213,c_=214,lh=0,ch=1,hh=2,to=3,uh=4,fh=5,dh=6,ph=7,om=0,h_=1,u_=2,vr=0,f_=1,d_=2,p_=3,am=4,m_=5,g_=6,__=7,lm=300,eo=301,no=302,mh=303,gh=304,Ul=306,Si=1e3,dr=1001,_h=1002,jn=1003,v_=1004,ba=1005,Ai=1006,Ql=1007,qr=1008,Ji=1009,cm=1010,hm=1011,aa=1012,Su=1013,rs=1014,Ci=1015,fa=1016,wu=1017,Eu=1018,io=1020,um=35902,fm=1021,dm=1022,vi=1023,pm=1024,mm=1025,Ys=1026,ro=1027,Tu=1028,bu=1029,gm=1030,Au=1031,Cu=1033,ll=33776,cl=33777,hl=33778,ul=33779,vh=35840,xh=35841,Mh=35842,yh=35843,Sh=36196,wh=37492,Eh=37496,Th=37808,bh=37809,Ah=37810,Ch=37811,Rh=37812,Ph=37813,Lh=37814,Dh=37815,Ih=37816,Uh=37817,Nh=37818,Oh=37819,Fh=37820,Bh=37821,fl=36492,zh=36494,kh=36495,_m=36283,Gh=36284,Hh=36285,Vh=36286,x_=3200,M_=3201,vm=0,y_=1,ar="",ri="srgb",oo="srgb-linear",Nl="linear",Se="srgb",ms=7680,Af=519,S_=512,w_=513,E_=514,xm=515,T_=516,b_=517,A_=518,C_=519,Cf=35044,Rf="300 es",Xi=2e3,Tl=2001;class ao{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],tc=Math.PI/180,Wh=180/Math.PI;function lo(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(hn[r&255]+hn[r>>8&255]+hn[r>>16&255]+hn[r>>24&255]+"-"+hn[t&255]+hn[t>>8&255]+"-"+hn[t>>16&15|64]+hn[t>>24&255]+"-"+hn[e&63|128]+hn[e>>8&255]+"-"+hn[e>>16&255]+hn[e>>24&255]+hn[n&255]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]).toLowerCase()}function pn(r,t,e){return Math.max(t,Math.min(e,r))}function R_(r,t){return(r%t+t)%t}function ec(r,t,e){return(1-e)*r+e*t}function vo(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Cn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class Et{constructor(t=0,e=0){Et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(pn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ie{constructor(t,e,n,i,s,o,a,l,c){ie.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],p=n[8],_=i[0],g=i[3],m=i[6],y=i[1],x=i[4],v=i[7],C=i[2],b=i[5],w=i[8];return s[0]=o*_+a*y+l*C,s[3]=o*g+a*x+l*b,s[6]=o*m+a*v+l*w,s[1]=c*_+h*y+u*C,s[4]=c*g+h*x+u*b,s[7]=c*m+h*v+u*w,s[2]=f*_+d*y+p*C,s[5]=f*g+d*x+p*b,s[8]=f*m+d*v+p*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*s,d=c*s-o*l,p=e*u+n*f+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return t[0]=u*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=f*_,t[4]=(h*e-i*l)*_,t[5]=(i*s-a*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(nc.makeScale(t,e)),this}rotate(t){return this.premultiply(nc.makeRotation(-t)),this}translate(t,e){return this.premultiply(nc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const nc=new ie;function Mm(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function bl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function P_(){const r=bl("canvas");return r.style.display="block",r}const Pf={};function Uo(r){r in Pf||(Pf[r]=!0,console.warn(r))}function L_(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function D_(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function I_(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const de={enabled:!0,workingColorSpace:oo,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Se&&(r.r=qi(r.r),r.g=qi(r.g),r.b=qi(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Se&&(r.r=qs(r.r),r.g=qs(r.g),r.b=qs(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ar?Nl:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function qi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function qs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const Lf=[.64,.33,.3,.6,.15,.06],Df=[.2126,.7152,.0722],If=[.3127,.329],Uf=new ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nf=new ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);de.define({[oo]:{primaries:Lf,whitePoint:If,transfer:Nl,toXYZ:Uf,fromXYZ:Nf,luminanceCoefficients:Df,workingColorSpaceConfig:{unpackColorSpace:ri},outputColorSpaceConfig:{drawingBufferColorSpace:ri}},[ri]:{primaries:Lf,whitePoint:If,transfer:Se,toXYZ:Uf,fromXYZ:Nf,luminanceCoefficients:Df,outputColorSpaceConfig:{drawingBufferColorSpace:ri}}});let gs;class U_{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{gs===void 0&&(gs=bl("canvas")),gs.width=t.width,gs.height=t.height;const n=gs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=gs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=bl("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=qi(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(qi(e[n]/255)*255):e[n]=qi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let N_=0;class ym{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:N_++}),this.uuid=lo(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(ic(i[o].image)):s.push(ic(i[o]))}else s=ic(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function ic(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?U_.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let O_=0;class vn extends ao{constructor(t=vn.DEFAULT_IMAGE,e=vn.DEFAULT_MAPPING,n=dr,i=dr,s=Ai,o=qr,a=vi,l=Ji,c=vn.DEFAULT_ANISOTROPY,h=ar){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:O_++}),this.uuid=lo(),this.name="",this.source=new ym(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==lm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Si:t.x=t.x-Math.floor(t.x);break;case dr:t.x=t.x<0?0:1;break;case _h:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Si:t.y=t.y-Math.floor(t.y);break;case dr:t.y=t.y<0?0:1;break;case _h:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=lm;vn.DEFAULT_ANISOTROPY=1;class we{constructor(t=0,e=0,n=0,i=1){we.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,v=(d+1)/2,C=(m+1)/2,b=(h+f)/4,w=(u+_)/4,R=(p+g)/4;return x>v&&x>C?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=b/n,s=w/n):v>C?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=b/i,s=R/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=w/s,i=R/s),this.set(n,i,s,e),this}let y=Math.sqrt((g-p)*(g-p)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(g-p)/y,this.y=(u-_)/y,this.z=(f-h)/y,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class F_ extends ao{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new we(0,0,t,e),this.scissorTest=!1,this.viewport=new we(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ai,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new vn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ym(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ss extends F_{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Sm extends vn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=jn,this.minFilter=jn,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class B_ extends vn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=jn,this.minFilter=jn,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class os{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const f=s[o+0],d=s[o+1],p=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=p,t[e+3]=_;return}if(u!==_||l!==f||c!==d||h!==p){let g=1-a;const m=l*f+c*d+h*p+u*_,y=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const C=Math.sqrt(x),b=Math.atan2(C,m*y);g=Math.sin(g*b)/C,a=Math.sin(a*b)/C}const v=a*y;if(l=l*g+f*v,c=c*g+d*v,h=h*g+p*v,u=u*g+_*v,g===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],f=s[o+1],d=s[o+2],p=s[o+3];return t[e]=a*p+h*u+l*d-c*f,t[e+1]=l*p+h*f+c*u-a*d,t[e+2]=c*p+h*d+a*f-l*u,t[e+3]=h*p-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),f=l(n/2),d=l(i/2),p=l(s/2);switch(o){case"XYZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"YXZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"ZXY":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"ZYX":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"YZX":this._x=f*h*u+c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u-f*d*p;break;case"XZY":this._x=f*h*u-c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u+f*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(o-i)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(s-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-i)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(pn(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,n=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Of.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Of.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return rc.copy(this).projectOnVector(t),this.sub(rc)}reflect(t){return this.sub(rc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(pn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const rc=new N,Of=new os;class cs{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(di.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(di.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=di.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,di):di.fromBufferAttribute(s,o),di.applyMatrix4(t.matrixWorld),this.expandByPoint(di);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Aa.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Aa.copy(n.boundingBox)),Aa.applyMatrix4(t.matrixWorld),this.union(Aa)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,di),di.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(xo),Ca.subVectors(this.max,xo),_s.subVectors(t.a,xo),vs.subVectors(t.b,xo),xs.subVectors(t.c,xo),tr.subVectors(vs,_s),er.subVectors(xs,vs),Rr.subVectors(_s,xs);let e=[0,-tr.z,tr.y,0,-er.z,er.y,0,-Rr.z,Rr.y,tr.z,0,-tr.x,er.z,0,-er.x,Rr.z,0,-Rr.x,-tr.y,tr.x,0,-er.y,er.x,0,-Rr.y,Rr.x,0];return!sc(e,_s,vs,xs,Ca)||(e=[1,0,0,0,1,0,0,0,1],!sc(e,_s,vs,xs,Ca))?!1:(Ra.crossVectors(tr,er),e=[Ra.x,Ra.y,Ra.z],sc(e,_s,vs,xs,Ca))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,di).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(di).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ii),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ii=[new N,new N,new N,new N,new N,new N,new N,new N],di=new N,Aa=new cs,_s=new N,vs=new N,xs=new N,tr=new N,er=new N,Rr=new N,xo=new N,Ca=new N,Ra=new N,Pr=new N;function sc(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Pr.fromArray(r,s);const a=i.x*Math.abs(Pr.x)+i.y*Math.abs(Pr.y)+i.z*Math.abs(Pr.z),l=t.dot(Pr),c=e.dot(Pr),h=n.dot(Pr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const z_=new cs,Mo=new N,oc=new N;class co{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):z_.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Mo.subVectors(t,this.center);const e=Mo.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Mo,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(oc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Mo.copy(t.center).add(oc)),this.expandByPoint(Mo.copy(t.center).sub(oc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ui=new N,ac=new N,Pa=new N,nr=new N,lc=new N,La=new N,cc=new N;class wm{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ui)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ui.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ui.copy(this.origin).addScaledVector(this.direction,e),Ui.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){ac.copy(t).add(e).multiplyScalar(.5),Pa.copy(e).sub(t).normalize(),nr.copy(this.origin).sub(ac);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Pa),a=nr.dot(this.direction),l=-nr.dot(Pa),c=nr.lengthSq(),h=Math.abs(1-o*o);let u,f,d,p;if(h>0)if(u=o*l-a,f=o*a-l,p=s*h,u>=0)if(f>=-p)if(f<=p){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-p?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c):f<=p?(u=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ac).addScaledVector(Pa,f),d}intersectSphere(t,e){Ui.subVectors(t.center,this.origin);const n=Ui.dot(this.direction),i=Ui.dot(Ui)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(s=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(s=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Ui)!==null}intersectTriangle(t,e,n,i,s){lc.subVectors(e,t),La.subVectors(n,t),cc.crossVectors(lc,La);let o=this.direction.dot(cc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;nr.subVectors(this.origin,t);const l=a*this.direction.dot(La.crossVectors(nr,La));if(l<0)return null;const c=a*this.direction.dot(lc.cross(nr));if(c<0||l+c>o)return null;const h=-a*nr.dot(cc);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(t,e,n,i,s,o,a,l,c,h,u,f,d,p,_,g){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,u,f,d,p,_,g)}set(t,e,n,i,s,o,a,l,c,h,u,f,d,p,_,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ms.setFromMatrixColumn(t,0).length(),s=1/Ms.setFromMatrixColumn(t,1).length(),o=1/Ms.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const f=o*h,d=o*u,p=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+p*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=p+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,p=c*h,_=c*u;e[0]=f+_*a,e[4]=p*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-p,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,p=c*h,_=c*u;e[0]=f-_*a,e[4]=-o*u,e[8]=p+d*a,e[1]=d+p*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,d=o*u,p=a*h,_=a*u;e[0]=l*h,e[4]=p*c-d,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=d*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=_-f*u,e[8]=p*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+p,e[10]=f-_*u}else if(t.order==="XZY"){const f=o*l,d=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-p,e[2]=p*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(k_,t,G_)}lookAt(t,e,n){const i=this.elements;return zn.subVectors(t,e),zn.lengthSq()===0&&(zn.z=1),zn.normalize(),ir.crossVectors(n,zn),ir.lengthSq()===0&&(Math.abs(n.z)===1?zn.x+=1e-4:zn.z+=1e-4,zn.normalize(),ir.crossVectors(n,zn)),ir.normalize(),Da.crossVectors(zn,ir),i[0]=ir.x,i[4]=Da.x,i[8]=zn.x,i[1]=ir.y,i[5]=Da.y,i[9]=zn.y,i[2]=ir.z,i[6]=Da.z,i[10]=zn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],p=n[2],_=n[6],g=n[10],m=n[14],y=n[3],x=n[7],v=n[11],C=n[15],b=i[0],w=i[4],R=i[8],S=i[12],M=i[1],P=i[5],I=i[9],F=i[13],k=i[2],X=i[6],H=i[10],W=i[14],G=i[3],it=i[7],D=i[11],ct=i[15];return s[0]=o*b+a*M+l*k+c*G,s[4]=o*w+a*P+l*X+c*it,s[8]=o*R+a*I+l*H+c*D,s[12]=o*S+a*F+l*W+c*ct,s[1]=h*b+u*M+f*k+d*G,s[5]=h*w+u*P+f*X+d*it,s[9]=h*R+u*I+f*H+d*D,s[13]=h*S+u*F+f*W+d*ct,s[2]=p*b+_*M+g*k+m*G,s[6]=p*w+_*P+g*X+m*it,s[10]=p*R+_*I+g*H+m*D,s[14]=p*S+_*F+g*W+m*ct,s[3]=y*b+x*M+v*k+C*G,s[7]=y*w+x*P+v*X+C*it,s[11]=y*R+x*I+v*H+C*D,s[15]=y*S+x*F+v*W+C*ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],p=t[3],_=t[7],g=t[11],m=t[15];return p*(+s*l*u-i*c*u-s*a*f+n*c*f+i*a*d-n*l*d)+_*(+e*l*d-e*c*f+s*o*f-i*o*d+i*c*h-s*l*h)+g*(+e*c*u-e*a*d-s*o*u+n*o*d+s*a*h-n*c*h)+m*(-i*a*h-e*l*u+e*a*f+i*o*u-n*o*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],p=t[12],_=t[13],g=t[14],m=t[15],y=u*g*c-_*f*c+_*l*d-a*g*d-u*l*m+a*f*m,x=p*f*c-h*g*c-p*l*d+o*g*d+h*l*m-o*f*m,v=h*_*c-p*u*c+p*a*d-o*_*d-h*a*m+o*u*m,C=p*u*l-h*_*l-p*a*f+o*_*f+h*a*g-o*u*g,b=e*y+n*x+i*v+s*C;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/b;return t[0]=y*w,t[1]=(_*f*s-u*g*s-_*i*d+n*g*d+u*i*m-n*f*m)*w,t[2]=(a*g*s-_*l*s+_*i*c-n*g*c-a*i*m+n*l*m)*w,t[3]=(u*l*s-a*f*s-u*i*c+n*f*c+a*i*d-n*l*d)*w,t[4]=x*w,t[5]=(h*g*s-p*f*s+p*i*d-e*g*d-h*i*m+e*f*m)*w,t[6]=(p*l*s-o*g*s-p*i*c+e*g*c+o*i*m-e*l*m)*w,t[7]=(o*f*s-h*l*s+h*i*c-e*f*c-o*i*d+e*l*d)*w,t[8]=v*w,t[9]=(p*u*s-h*_*s-p*n*d+e*_*d+h*n*m-e*u*m)*w,t[10]=(o*_*s-p*a*s+p*n*c-e*_*c-o*n*m+e*a*m)*w,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*d-e*a*d)*w,t[12]=C*w,t[13]=(h*_*i-p*u*i+p*n*f-e*_*f-h*n*g+e*u*g)*w,t[14]=(p*a*i-o*_*i-p*n*l+e*_*l+o*n*g-e*a*g)*w,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*f+e*a*f)*w,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,f=s*c,d=s*h,p=s*u,_=o*h,g=o*u,m=a*u,y=l*c,x=l*h,v=l*u,C=n.x,b=n.y,w=n.z;return i[0]=(1-(_+m))*C,i[1]=(d+v)*C,i[2]=(p-x)*C,i[3]=0,i[4]=(d-v)*b,i[5]=(1-(f+m))*b,i[6]=(g+y)*b,i[7]=0,i[8]=(p+x)*w,i[9]=(g-y)*w,i[10]=(1-(f+_))*w,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=Ms.set(i[0],i[1],i[2]).length();const o=Ms.set(i[4],i[5],i[6]).length(),a=Ms.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],pi.copy(this);const c=1/s,h=1/o,u=1/a;return pi.elements[0]*=c,pi.elements[1]*=c,pi.elements[2]*=c,pi.elements[4]*=h,pi.elements[5]*=h,pi.elements[6]*=h,pi.elements[8]*=u,pi.elements[9]*=u,pi.elements[10]*=u,e.setFromRotationMatrix(pi),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=Xi){const l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let d,p;if(a===Xi)d=-(o+s)/(o-s),p=-2*o*s/(o-s);else if(a===Tl)d=-o/(o-s),p=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Xi){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-s),f=(e+t)*c,d=(n+i)*h;let p,_;if(a===Xi)p=(o+s)*u,_=-2*u;else if(a===Tl)p=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ms=new N,pi=new Kt,k_=new N(0,0,0),G_=new N(1,1,1),ir=new N,Da=new N,zn=new N,Ff=new Kt,Bf=new os;class ui{constructor(t=0,e=0,n=0,i=ui.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(pn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-pn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(pn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-pn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(pn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-pn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ff.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ff,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Bf.setFromEuler(this),this.setFromQuaternion(Bf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ui.DEFAULT_ORDER="XYZ";class Em{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let H_=0;const zf=new N,ys=new os,Ni=new Kt,Ia=new N,yo=new N,V_=new N,W_=new os,kf=new N(1,0,0),Gf=new N(0,1,0),Hf=new N(0,0,1),Vf={type:"added"},X_={type:"removed"},Ss={type:"childadded",child:null},hc={type:"childremoved",child:null};class Qe extends ao{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:H_++}),this.uuid=lo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Qe.DEFAULT_UP.clone();const t=new N,e=new ui,n=new os,i=new N(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Kt},normalMatrix:{value:new ie}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=Qe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Em,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ys.setFromAxisAngle(t,e),this.quaternion.multiply(ys),this}rotateOnWorldAxis(t,e){return ys.setFromAxisAngle(t,e),this.quaternion.premultiply(ys),this}rotateX(t){return this.rotateOnAxis(kf,t)}rotateY(t){return this.rotateOnAxis(Gf,t)}rotateZ(t){return this.rotateOnAxis(Hf,t)}translateOnAxis(t,e){return zf.copy(t).applyQuaternion(this.quaternion),this.position.add(zf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(kf,t)}translateY(t){return this.translateOnAxis(Gf,t)}translateZ(t){return this.translateOnAxis(Hf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ni.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ia.copy(t):Ia.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),yo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ni.lookAt(yo,Ia,this.up):Ni.lookAt(Ia,yo,this.up),this.quaternion.setFromRotationMatrix(Ni),i&&(Ni.extractRotation(i.matrixWorld),ys.setFromRotationMatrix(Ni),this.quaternion.premultiply(ys.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vf),Ss.child=t,this.dispatchEvent(Ss),Ss.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(X_),hc.child=t,this.dispatchEvent(hc),hc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ni.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ni.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ni),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vf),Ss.child=t,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yo,t,V_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yo,W_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Qe.DEFAULT_UP=new N(0,1,0);Qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mi=new N,Oi=new N,uc=new N,Fi=new N,ws=new N,Es=new N,Wf=new N,fc=new N,dc=new N,pc=new N,mc=new we,gc=new we,_c=new we;class _i{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),mi.subVectors(t,e),i.cross(mi);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){mi.subVectors(i,e),Oi.subVectors(n,e),uc.subVectors(t,e);const o=mi.dot(mi),a=mi.dot(Oi),l=mi.dot(uc),c=Oi.dot(Oi),h=Oi.dot(uc),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,d=(c*l-a*h)*f,p=(o*h-a*l)*f;return s.set(1-d-p,p,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Fi)===null?!1:Fi.x>=0&&Fi.y>=0&&Fi.x+Fi.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,Fi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Fi.x),l.addScaledVector(o,Fi.y),l.addScaledVector(a,Fi.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return mc.setScalar(0),gc.setScalar(0),_c.setScalar(0),mc.fromBufferAttribute(t,e),gc.fromBufferAttribute(t,n),_c.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(mc,s.x),o.addScaledVector(gc,s.y),o.addScaledVector(_c,s.z),o}static isFrontFacing(t,e,n,i){return mi.subVectors(n,e),Oi.subVectors(t,e),mi.cross(Oi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mi.subVectors(this.c,this.b),Oi.subVectors(this.a,this.b),mi.cross(Oi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return _i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return _i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return _i.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return _i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return _i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;ws.subVectors(i,n),Es.subVectors(s,n),fc.subVectors(t,n);const l=ws.dot(fc),c=Es.dot(fc);if(l<=0&&c<=0)return e.copy(n);dc.subVectors(t,i);const h=ws.dot(dc),u=Es.dot(dc);if(h>=0&&u<=h)return e.copy(i);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(ws,o);pc.subVectors(t,s);const d=ws.dot(pc),p=Es.dot(pc);if(p>=0&&d<=p)return e.copy(s);const _=d*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(Es,a);const g=h*p-d*u;if(g<=0&&u-h>=0&&d-p>=0)return Wf.subVectors(s,i),a=(u-h)/(u-h+(d-p)),e.copy(i).addScaledVector(Wf,a);const m=1/(g+_+f);return o=_*m,a=f*m,e.copy(n).addScaledVector(ws,o).addScaledVector(Es,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Tm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rr={h:0,s:0,l:0},Ua={h:0,s:0,l:0};function vc(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class ue{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ri){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=de.workingColorSpace){if(t=R_(t,1),e=pn(e,0,1),n=pn(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=vc(o,s,t+1/3),this.g=vc(o,s,t),this.b=vc(o,s,t-1/3)}return de.toWorkingColorSpace(this,i),this}setStyle(t,e=ri){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ri){const n=Tm[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=qi(t.r),this.g=qi(t.g),this.b=qi(t.b),this}copyLinearToSRGB(t){return this.r=qs(t.r),this.g=qs(t.g),this.b=qs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ri){return de.fromWorkingColorSpace(un.copy(this),t),Math.round(pn(un.r*255,0,255))*65536+Math.round(pn(un.g*255,0,255))*256+Math.round(pn(un.b*255,0,255))}getHexString(t=ri){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.fromWorkingColorSpace(un.copy(this),e);const n=un.r,i=un.g,s=un.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.fromWorkingColorSpace(un.copy(this),e),t.r=un.r,t.g=un.g,t.b=un.b,t}getStyle(t=ri){de.fromWorkingColorSpace(un.copy(this),t);const e=un.r,n=un.g,i=un.b;return t!==ri?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(rr),this.setHSL(rr.h+t,rr.s+e,rr.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(rr),t.getHSL(Ua);const n=ec(rr.h,Ua.h,e),i=ec(rr.s,Ua.s,e),s=ec(rr.l,Ua.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const un=new ue;ue.NAMES=Tm;let Y_=0;class ho extends ao{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Y_++}),this.uuid=lo(),this.name="",this.blending=Xs,this.side=Er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oh,this.blendDst=ah,this.blendEquation=Gr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ue(0,0,0),this.blendAlpha=0,this.depthFunc=to,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Af,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ms,this.stencilZFail=ms,this.stencilZPass=ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Xs&&(n.blending=this.blending),this.side!==Er&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oh&&(n.blendSrc=this.blendSrc),this.blendDst!==ah&&(n.blendDst=this.blendDst),this.blendEquation!==Gr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==to&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Af&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ms&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ms&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ms&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Hr extends ho{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=om,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Xe=new N,Na=new Et;class hi{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Cf,this.updateRanges=[],this.gpuType=Ci,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Na.fromBufferAttribute(this,e),Na.applyMatrix3(t),this.setXY(e,Na.x,Na.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix3(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=vo(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Cn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vo(e,this.array)),e}setX(t,e){return this.normalized&&(e=Cn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vo(e,this.array)),e}setY(t,e){return this.normalized&&(e=Cn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vo(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Cn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vo(e,this.array)),e}setW(t,e){return this.normalized&&(e=Cn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Cn(e,this.array),n=Cn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Cn(e,this.array),n=Cn(n,this.array),i=Cn(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Cn(e,this.array),n=Cn(n,this.array),i=Cn(i,this.array),s=Cn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Cf&&(t.usage=this.usage),t}}class bm extends hi{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Am extends hi{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ue extends hi{constructor(t,e,n){super(new Float32Array(t),e,n)}}let q_=0;const ni=new Kt,xc=new Qe,Ts=new N,kn=new cs,So=new cs,nn=new N;class xn extends ao{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:q_++}),this.uuid=lo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Mm(t)?Am:bm)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ie().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ni.makeRotationFromQuaternion(t),this.applyMatrix4(ni),this}rotateX(t){return ni.makeRotationX(t),this.applyMatrix4(ni),this}rotateY(t){return ni.makeRotationY(t),this.applyMatrix4(ni),this}rotateZ(t){return ni.makeRotationZ(t),this.applyMatrix4(ni),this}translate(t,e,n){return ni.makeTranslation(t,e,n),this.applyMatrix4(ni),this}scale(t,e,n){return ni.makeScale(t,e,n),this.applyMatrix4(ni),this}lookAt(t){return xc.lookAt(t),xc.updateMatrix(),this.applyMatrix4(xc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ue(n,3))}else{for(let n=0,i=e.count;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];kn.setFromBufferAttribute(s),this.morphTargetsRelative?(nn.addVectors(this.boundingBox.min,kn.min),this.boundingBox.expandByPoint(nn),nn.addVectors(this.boundingBox.max,kn.max),this.boundingBox.expandByPoint(nn)):(this.boundingBox.expandByPoint(kn.min),this.boundingBox.expandByPoint(kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new co);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const n=this.boundingSphere.center;if(kn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];So.setFromBufferAttribute(a),this.morphTargetsRelative?(nn.addVectors(kn.min,So.min),kn.expandByPoint(nn),nn.addVectors(kn.max,So.max),kn.expandByPoint(nn)):(kn.expandByPoint(So.min),kn.expandByPoint(So.max))}kn.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)nn.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(nn));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)nn.fromBufferAttribute(a,c),l&&(Ts.fromBufferAttribute(t,c),nn.add(Ts)),i=Math.max(i,n.distanceToSquared(nn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hi(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new N,l[R]=new N;const c=new N,h=new N,u=new N,f=new Et,d=new Et,p=new Et,_=new N,g=new N;function m(R,S,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),f.fromBufferAttribute(s,R),d.fromBufferAttribute(s,S),p.fromBufferAttribute(s,M),h.sub(c),u.sub(c),d.sub(f),p.sub(f);const P=1/(d.x*p.y-p.x*d.y);isFinite(P)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-d.y).multiplyScalar(P),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(P),a[R].add(_),a[S].add(_),a[M].add(_),l[R].add(g),l[S].add(g),l[M].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let R=0,S=y.length;R<S;++R){const M=y[R],P=M.start,I=M.count;for(let F=P,k=P+I;F<k;F+=3)m(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const x=new N,v=new N,C=new N,b=new N;function w(R){C.fromBufferAttribute(i,R),b.copy(C);const S=a[R];x.copy(S),x.sub(C.multiplyScalar(C.dot(S))).normalize(),v.crossVectors(b,S);const P=v.dot(l[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,P)}for(let R=0,S=y.length;R<S;++R){const M=y[R],P=M.start,I=M.count;for(let F=P,k=P+I;F<k;F+=3)w(t.getX(F+0)),w(t.getX(F+1)),w(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new hi(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new N,s=new N,o=new N,a=new N,l=new N,c=new N,h=new N,u=new N;if(t)for(let f=0,d=t.count;f<d;f+=3){const p=t.getX(f+0),_=t.getX(f+1),g=t.getX(f+2);i.fromBufferAttribute(e,p),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)nn.fromBufferAttribute(t,e),nn.normalize(),t.setXYZ(e,nn.x,nn.y,nn.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let d=0,p=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*h;for(let m=0;m<h;m++)f[p++]=c[d++]}return new hi(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new xn,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Xf=new Kt,Lr=new wm,Oa=new co,Yf=new N,Fa=new N,Ba=new N,za=new N,Mc=new N,ka=new N,qf=new N,Ga=new N;class J extends Qe{constructor(t=new xn,e=new Hr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){ka.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(Mc.fromBufferAttribute(u,t),o?ka.addScaledVector(Mc,h):ka.addScaledVector(Mc.sub(e),h))}e.add(ka)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Oa.copy(n.boundingSphere),Oa.applyMatrix4(s),Lr.copy(t.ray).recast(t.near),!(Oa.containsPoint(Lr.origin)===!1&&(Lr.intersectSphere(Oa,Yf)===null||Lr.origin.distanceToSquared(Yf)>(t.far-t.near)**2))&&(Xf.copy(s).invert(),Lr.copy(t.ray).applyMatrix4(Xf),!(n.boundingBox!==null&&Lr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Lr)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=f.length;p<_;p++){const g=f[p],m=o[g.materialIndex],y=Math.max(g.start,d.start),x=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let v=y,C=x;v<C;v+=3){const b=a.getX(v),w=a.getX(v+1),R=a.getX(v+2);i=Ha(this,m,t,n,c,h,u,b,w,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const y=a.getX(g),x=a.getX(g+1),v=a.getX(g+2);i=Ha(this,o,t,n,c,h,u,y,x,v),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=f.length;p<_;p++){const g=f[p],m=o[g.materialIndex],y=Math.max(g.start,d.start),x=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let v=y,C=x;v<C;v+=3){const b=v,w=v+1,R=v+2;i=Ha(this,m,t,n,c,h,u,b,w,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const y=g,x=g+1,v=g+2;i=Ha(this,o,t,n,c,h,u,y,x,v),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function $_(r,t,e,n,i,s,o,a){let l;if(t.side===Nn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===Er,a),l===null)return null;Ga.copy(a),Ga.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Ga);return c<e.near||c>e.far?null:{distance:c,point:Ga.clone(),object:r}}function Ha(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,Fa),r.getVertexPosition(l,Ba),r.getVertexPosition(c,za);const h=$_(r,t,e,n,Fa,Ba,za,qf);if(h){const u=new N;_i.getBarycoord(qf,Fa,Ba,za,u),i&&(h.uv=_i.getInterpolatedAttribute(i,a,l,c,u,new Et)),s&&(h.uv1=_i.getInterpolatedAttribute(s,a,l,c,u,new Et)),o&&(h.normal=_i.getInterpolatedAttribute(o,a,l,c,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new N,materialIndex:0};_i.getNormal(Fa,Ba,za,f.normal),h.face=f,h.barycoord=u}return h}class wt extends xn{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,d=0;p("z","y","x",-1,-1,n,e,t,o,s,0),p("z","y","x",1,-1,n,e,-t,o,s,1),p("x","z","y",1,1,t,n,e,i,o,2),p("x","z","y",1,-1,t,n,-e,i,o,3),p("x","y","z",1,-1,t,e,n,i,s,4),p("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ue(c,3)),this.setAttribute("normal",new Ue(h,3)),this.setAttribute("uv",new Ue(u,2));function p(_,g,m,y,x,v,C,b,w,R,S){const M=v/w,P=C/R,I=v/2,F=C/2,k=b/2,X=w+1,H=R+1;let W=0,G=0;const it=new N;for(let D=0;D<H;D++){const ct=D*P-F;for(let Lt=0;Lt<X;Lt++){const $t=Lt*M-I;it[_]=$t*y,it[g]=ct*x,it[m]=k,c.push(it.x,it.y,it.z),it[_]=0,it[g]=0,it[m]=b>0?1:-1,h.push(it.x,it.y,it.z),u.push(Lt/w),u.push(1-D/R),W+=1}}for(let D=0;D<R;D++)for(let ct=0;ct<w;ct++){const Lt=f+ct+X*D,$t=f+ct+X*(D+1),$=f+(ct+1)+X*(D+1),rt=f+(ct+1)+X*D;l.push(Lt,$t,rt),l.push($t,$,rt),G+=6}a.addGroup(d,G,S),d+=G,f+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function so(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function wn(r){const t={};for(let e=0;e<r.length;e++){const n=so(r[e]);for(const i in n)t[i]=n[i]}return t}function Z_(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Cm(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}const J_={clone:so,merge:wn};var K_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,j_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tr extends ho{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=K_,this.fragmentShader=j_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=so(t.uniforms),this.uniformsGroups=Z_(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Rm extends Qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=Xi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const sr=new N,$f=new Et,Zf=new Et;class Yn extends Rm{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Wh*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(tc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Wh*2*Math.atan(Math.tan(tc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){sr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(sr.x,sr.y).multiplyScalar(-t/sr.z),sr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(sr.x,sr.y).multiplyScalar(-t/sr.z)}getViewSize(t,e){return this.getViewBounds(t,$f,Zf),e.subVectors(Zf,$f)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(tc*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const bs=-90,As=1;class Q_ extends Qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Yn(bs,As,t,e);i.layers=this.layers,this.add(i);const s=new Yn(bs,As,t,e);s.layers=this.layers,this.add(s);const o=new Yn(bs,As,t,e);o.layers=this.layers,this.add(o);const a=new Yn(bs,As,t,e);a.layers=this.layers,this.add(a);const l=new Yn(bs,As,t,e);l.layers=this.layers,this.add(l);const c=new Yn(bs,As,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Xi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Tl)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Pm extends vn{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:eo,super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class tv extends ss{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Pm(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ai}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new wt(5,5,5),s=new Tr({name:"CubemapFromEquirect",uniforms:so(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Nn,blending:_r});s.uniforms.tEquirect.value=e;const o=new J(i,s),a=e.minFilter;return e.minFilter===qr&&(e.minFilter=Ai),new Q_(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const yc=new N,ev=new N,nv=new ie;class zr{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=yc.subVectors(n,e).cross(ev.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(yc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||nv.getNormalMatrix(t),i=this.coplanarPoint(yc).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Dr=new co,Va=new N;class Ru{constructor(t=new zr,e=new zr,n=new zr,i=new zr,s=new zr,o=new zr){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Xi){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],f=i[7],d=i[8],p=i[9],_=i[10],g=i[11],m=i[12],y=i[13],x=i[14],v=i[15];if(n[0].setComponents(l-s,f-c,g-d,v-m).normalize(),n[1].setComponents(l+s,f+c,g+d,v+m).normalize(),n[2].setComponents(l+o,f+h,g+p,v+y).normalize(),n[3].setComponents(l-o,f-h,g-p,v-y).normalize(),n[4].setComponents(l-a,f-u,g-_,v-x).normalize(),e===Xi)n[5].setComponents(l+a,f+u,g+_,v+x).normalize();else if(e===Tl)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Dr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Dr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Dr)}intersectsSprite(t){return Dr.center.set(0,0,0),Dr.radius=.7071067811865476,Dr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Dr)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Va.x=i.normal.x>0?t.max.x:t.min.x,Va.y=i.normal.y>0?t.max.y:t.min.y,Va.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Va)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Lm(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function iv(r){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=r.SHORT;else if(c instanceof Uint32Array)d=r.UNSIGNED_INT;else if(c instanceof Int32Array)d=r.INT;else if(c instanceof Int8Array)d=r.BYTE;else if(c instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(r.bindBuffer(c,a),u.length===0)r.bufferSubData(c,0,h);else{u.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<u.length;d++){const p=u[f],_=u[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,p=u.length;d<p;d++){const _=u[d];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}class Me extends xn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,f=e/l,d=[],p=[],_=[],g=[];for(let m=0;m<h;m++){const y=m*f-o;for(let x=0;x<c;x++){const v=x*u-s;p.push(v,-y,0),_.push(0,0,1),g.push(x/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<a;y++){const x=y+c*m,v=y+c*(m+1),C=y+1+c*(m+1),b=y+1+c*m;d.push(x,v,b),d.push(v,C,b)}this.setIndex(d),this.setAttribute("position",new Ue(p,3)),this.setAttribute("normal",new Ue(_,3)),this.setAttribute("uv",new Ue(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Me(t.width,t.height,t.widthSegments,t.heightSegments)}}var rv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sv=`#ifdef USE_ALPHAHASH
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
#endif`,ov=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,av=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hv=`#ifdef USE_AOMAP
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
#endif`,uv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fv=`#ifdef USE_BATCHING
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
#endif`,dv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,_v=`#ifdef USE_IRIDESCENCE
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
#endif`,vv=`#ifdef USE_BUMPMAP
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
#endif`,xv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Mv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ev=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Tv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,bv=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Av=`#define PI 3.141592653589793
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
} // validated`,Cv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Rv=`vec3 transformedNormal = objectNormal;
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
#endif`,Pv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Iv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Uv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Nv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ov=`#ifdef USE_ENVMAP
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
#endif`,Fv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Bv=`#ifdef USE_ENVMAP
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
#endif`,zv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kv=`#ifdef USE_ENVMAP
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
#endif`,Gv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xv=`#ifdef USE_GRADIENTMAP
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
}`,Yv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$v=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zv=`uniform bool receiveShadow;
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
#endif`,Jv=`#ifdef USE_ENVMAP
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
#endif`,Kv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ex=`PhysicalMaterial material;
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
#endif`,nx=`struct PhysicalMaterial {
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
}`,ix=`
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
#endif`,rx=`#if defined( RE_IndirectDiffuse )
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
#endif`,sx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ox=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ax=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cx=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ux=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,dx=`#if defined( USE_POINTS_UV )
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
#endif`,px=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_x=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xx=`#ifdef USE_MORPHTARGETS
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
#endif`,Mx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Sx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,wx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ex=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bx=`#ifdef USE_NORMALMAP
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
#endif`,Ax=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Px=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ix=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ux=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ox=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hx=`float getShadowMask() {
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
}`,Vx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wx=`#ifdef USE_SKINNING
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
#endif`,Xx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yx=`#ifdef USE_SKINNING
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
#endif`,qx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$x=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jx=`#ifndef saturate
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
vec3 CineonToneMapping( vec3 color ) {
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kx=`#ifdef USE_TRANSMISSION
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
#endif`,jx=`#ifdef USE_TRANSMISSION
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
#endif`,Qx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,eM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const iM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rM=`uniform sampler2D t2D;
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
}`,sM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,aM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cM=`#include <common>
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
}`,hM=`#if DEPTH_PACKING == 3200
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
}`,uM=`#define DISTANCE
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
}`,fM=`#define DISTANCE
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
}`,dM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mM=`uniform float scale;
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
}`,gM=`uniform vec3 diffuse;
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
}`,_M=`#include <common>
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
}`,vM=`uniform vec3 diffuse;
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
}`,xM=`#define LAMBERT
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
}`,MM=`#define LAMBERT
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
}`,yM=`#define MATCAP
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
}`,SM=`#define MATCAP
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
}`,wM=`#define NORMAL
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
}`,EM=`#define NORMAL
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
}`,TM=`#define PHONG
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
}`,bM=`#define PHONG
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
}`,AM=`#define STANDARD
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
}`,CM=`#define STANDARD
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
}`,RM=`#define TOON
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
}`,PM=`#define TOON
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
}`,LM=`uniform float size;
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
}`,DM=`uniform vec3 diffuse;
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
}`,IM=`#include <common>
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
}`,UM=`uniform vec3 color;
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
}`,NM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
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
}`,OM=`uniform vec3 diffuse;
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
}`,re={alphahash_fragment:rv,alphahash_pars_fragment:sv,alphamap_fragment:ov,alphamap_pars_fragment:av,alphatest_fragment:lv,alphatest_pars_fragment:cv,aomap_fragment:hv,aomap_pars_fragment:uv,batching_pars_vertex:fv,batching_vertex:dv,begin_vertex:pv,beginnormal_vertex:mv,bsdfs:gv,iridescence_fragment:_v,bumpmap_pars_fragment:vv,clipping_planes_fragment:xv,clipping_planes_pars_fragment:Mv,clipping_planes_pars_vertex:yv,clipping_planes_vertex:Sv,color_fragment:wv,color_pars_fragment:Ev,color_pars_vertex:Tv,color_vertex:bv,common:Av,cube_uv_reflection_fragment:Cv,defaultnormal_vertex:Rv,displacementmap_pars_vertex:Pv,displacementmap_vertex:Lv,emissivemap_fragment:Dv,emissivemap_pars_fragment:Iv,colorspace_fragment:Uv,colorspace_pars_fragment:Nv,envmap_fragment:Ov,envmap_common_pars_fragment:Fv,envmap_pars_fragment:Bv,envmap_pars_vertex:zv,envmap_physical_pars_fragment:Jv,envmap_vertex:kv,fog_vertex:Gv,fog_pars_vertex:Hv,fog_fragment:Vv,fog_pars_fragment:Wv,gradientmap_pars_fragment:Xv,lightmap_pars_fragment:Yv,lights_lambert_fragment:qv,lights_lambert_pars_fragment:$v,lights_pars_begin:Zv,lights_toon_fragment:Kv,lights_toon_pars_fragment:jv,lights_phong_fragment:Qv,lights_phong_pars_fragment:tx,lights_physical_fragment:ex,lights_physical_pars_fragment:nx,lights_fragment_begin:ix,lights_fragment_maps:rx,lights_fragment_end:sx,logdepthbuf_fragment:ox,logdepthbuf_pars_fragment:ax,logdepthbuf_pars_vertex:lx,logdepthbuf_vertex:cx,map_fragment:hx,map_pars_fragment:ux,map_particle_fragment:fx,map_particle_pars_fragment:dx,metalnessmap_fragment:px,metalnessmap_pars_fragment:mx,morphinstance_vertex:gx,morphcolor_vertex:_x,morphnormal_vertex:vx,morphtarget_pars_vertex:xx,morphtarget_vertex:Mx,normal_fragment_begin:yx,normal_fragment_maps:Sx,normal_pars_fragment:wx,normal_pars_vertex:Ex,normal_vertex:Tx,normalmap_pars_fragment:bx,clearcoat_normal_fragment_begin:Ax,clearcoat_normal_fragment_maps:Cx,clearcoat_pars_fragment:Rx,iridescence_pars_fragment:Px,opaque_fragment:Lx,packing:Dx,premultiplied_alpha_fragment:Ix,project_vertex:Ux,dithering_fragment:Nx,dithering_pars_fragment:Ox,roughnessmap_fragment:Fx,roughnessmap_pars_fragment:Bx,shadowmap_pars_fragment:zx,shadowmap_pars_vertex:kx,shadowmap_vertex:Gx,shadowmask_pars_fragment:Hx,skinbase_vertex:Vx,skinning_pars_vertex:Wx,skinning_vertex:Xx,skinnormal_vertex:Yx,specularmap_fragment:qx,specularmap_pars_fragment:$x,tonemapping_fragment:Zx,tonemapping_pars_fragment:Jx,transmission_fragment:Kx,transmission_pars_fragment:jx,uv_pars_fragment:Qx,uv_pars_vertex:tM,uv_vertex:eM,worldpos_vertex:nM,background_vert:iM,background_frag:rM,backgroundCube_vert:sM,backgroundCube_frag:oM,cube_vert:aM,cube_frag:lM,depth_vert:cM,depth_frag:hM,distanceRGBA_vert:uM,distanceRGBA_frag:fM,equirect_vert:dM,equirect_frag:pM,linedashed_vert:mM,linedashed_frag:gM,meshbasic_vert:_M,meshbasic_frag:vM,meshlambert_vert:xM,meshlambert_frag:MM,meshmatcap_vert:yM,meshmatcap_frag:SM,meshnormal_vert:wM,meshnormal_frag:EM,meshphong_vert:TM,meshphong_frag:bM,meshphysical_vert:AM,meshphysical_frag:CM,meshtoon_vert:RM,meshtoon_frag:PM,points_vert:LM,points_frag:DM,shadow_vert:IM,shadow_frag:UM,sprite_vert:NM,sprite_frag:OM},At={common:{diffuse:{value:new ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ie}},envmap:{envMap:{value:null},envMapRotation:{value:new ie},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ie},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0},uvTransform:{value:new ie}},sprite:{diffuse:{value:new ue(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}}},wi={basic:{uniforms:wn([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:re.meshbasic_vert,fragmentShader:re.meshbasic_frag},lambert:{uniforms:wn([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new ue(0)}}]),vertexShader:re.meshlambert_vert,fragmentShader:re.meshlambert_frag},phong:{uniforms:wn([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new ue(0)},specular:{value:new ue(1118481)},shininess:{value:30}}]),vertexShader:re.meshphong_vert,fragmentShader:re.meshphong_frag},standard:{uniforms:wn([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag},toon:{uniforms:wn([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new ue(0)}}]),vertexShader:re.meshtoon_vert,fragmentShader:re.meshtoon_frag},matcap:{uniforms:wn([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:re.meshmatcap_vert,fragmentShader:re.meshmatcap_frag},points:{uniforms:wn([At.points,At.fog]),vertexShader:re.points_vert,fragmentShader:re.points_frag},dashed:{uniforms:wn([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:re.linedashed_vert,fragmentShader:re.linedashed_frag},depth:{uniforms:wn([At.common,At.displacementmap]),vertexShader:re.depth_vert,fragmentShader:re.depth_frag},normal:{uniforms:wn([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:re.meshnormal_vert,fragmentShader:re.meshnormal_frag},sprite:{uniforms:wn([At.sprite,At.fog]),vertexShader:re.sprite_vert,fragmentShader:re.sprite_frag},background:{uniforms:{uvTransform:{value:new ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:re.background_vert,fragmentShader:re.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ie}},vertexShader:re.backgroundCube_vert,fragmentShader:re.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:re.cube_vert,fragmentShader:re.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:re.equirect_vert,fragmentShader:re.equirect_frag},distanceRGBA:{uniforms:wn([At.common,At.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:re.distanceRGBA_vert,fragmentShader:re.distanceRGBA_frag},shadow:{uniforms:wn([At.lights,At.fog,{color:{value:new ue(0)},opacity:{value:1}}]),vertexShader:re.shadow_vert,fragmentShader:re.shadow_frag}};wi.physical={uniforms:wn([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ie},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ie},sheen:{value:0},sheenColor:{value:new ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ie},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ie},attenuationDistance:{value:0},attenuationColor:{value:new ue(0)},specularColor:{value:new ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ie},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ie}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag};const Wa={r:0,b:0,g:0},Ir=new ui,FM=new Kt;function BM(r,t,e,n,i,s,o){const a=new ue(0);let l=s===!0?0:1,c,h,u=null,f=0,d=null;function p(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?e:t).get(x)),x}function _(y){let x=!1;const v=p(y);v===null?m(a,l):v&&v.isColor&&(m(v,1),x=!0);const C=r.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(y,x){const v=p(x);v&&(v.isCubeTexture||v.mapping===Ul)?(h===void 0&&(h=new J(new wt(1,1,1),new Tr({name:"BackgroundCubeMaterial",uniforms:so(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Ir.copy(x.backgroundRotation),Ir.x*=-1,Ir.y*=-1,Ir.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ir.y*=-1,Ir.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(FM.makeRotationFromEuler(Ir)),h.material.toneMapped=de.getTransfer(v.colorSpace)!==Se,(u!==v||f!==v.version||d!==r.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,d=r.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new J(new Me(2,2),new Tr({name:"BackgroundMaterial",uniforms:so(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:Er,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=de.getTransfer(v.colorSpace)!==Se,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,d=r.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,x){y.getRGB(Wa,Cm(r)),n.buffers.color.setClear(Wa.r,Wa.g,Wa.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,m(a,l)},render:_,addToRenderList:g}}function zM(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(M,P,I,F,k){let X=!1;const H=u(F,I,P);s!==H&&(s=H,c(s.object)),X=d(M,F,I,k),X&&p(M,F,I,k),k!==null&&t.update(k,r.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,v(M,P,I,F),k!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,P,I){const F=I.wireframe===!0;let k=n[M.id];k===void 0&&(k={},n[M.id]=k);let X=k[P.id];X===void 0&&(X={},k[P.id]=X);let H=X[F];return H===void 0&&(H=f(l()),X[F]=H),H}function f(M){const P=[],I=[],F=[];for(let k=0;k<e;k++)P[k]=0,I[k]=0,F[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:I,attributeDivisors:F,object:M,attributes:{},index:null}}function d(M,P,I,F){const k=s.attributes,X=P.attributes;let H=0;const W=I.getAttributes();for(const G in W)if(W[G].location>=0){const D=k[G];let ct=X[G];if(ct===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(ct=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(ct=M.instanceColor)),D===void 0||D.attribute!==ct||ct&&D.data!==ct.data)return!0;H++}return s.attributesNum!==H||s.index!==F}function p(M,P,I,F){const k={},X=P.attributes;let H=0;const W=I.getAttributes();for(const G in W)if(W[G].location>=0){let D=X[G];D===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(D=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(D=M.instanceColor));const ct={};ct.attribute=D,D&&D.data&&(ct.data=D.data),k[G]=ct,H++}s.attributes=k,s.attributesNum=H,s.index=F}function _(){const M=s.newAttributes;for(let P=0,I=M.length;P<I;P++)M[P]=0}function g(M){m(M,0)}function m(M,P){const I=s.newAttributes,F=s.enabledAttributes,k=s.attributeDivisors;I[M]=1,F[M]===0&&(r.enableVertexAttribArray(M),F[M]=1),k[M]!==P&&(r.vertexAttribDivisor(M,P),k[M]=P)}function y(){const M=s.newAttributes,P=s.enabledAttributes;for(let I=0,F=P.length;I<F;I++)P[I]!==M[I]&&(r.disableVertexAttribArray(I),P[I]=0)}function x(M,P,I,F,k,X,H){H===!0?r.vertexAttribIPointer(M,P,I,k,X):r.vertexAttribPointer(M,P,I,F,k,X)}function v(M,P,I,F){_();const k=F.attributes,X=I.getAttributes(),H=P.defaultAttributeValues;for(const W in X){const G=X[W];if(G.location>=0){let it=k[W];if(it===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(it=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(it=M.instanceColor)),it!==void 0){const D=it.normalized,ct=it.itemSize,Lt=t.get(it);if(Lt===void 0)continue;const $t=Lt.buffer,$=Lt.type,rt=Lt.bytesPerElement,vt=$===r.INT||$===r.UNSIGNED_INT||it.gpuType===Su;if(it.isInterleavedBufferAttribute){const st=it.data,Ct=st.stride,Ut=it.offset;if(st.isInstancedInterleavedBuffer){for(let zt=0;zt<G.locationSize;zt++)m(G.location+zt,st.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let zt=0;zt<G.locationSize;zt++)g(G.location+zt);r.bindBuffer(r.ARRAY_BUFFER,$t);for(let zt=0;zt<G.locationSize;zt++)x(G.location+zt,ct/G.locationSize,$,D,Ct*rt,(Ut+ct/G.locationSize*zt)*rt,vt)}else{if(it.isInstancedBufferAttribute){for(let st=0;st<G.locationSize;st++)m(G.location+st,it.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let st=0;st<G.locationSize;st++)g(G.location+st);r.bindBuffer(r.ARRAY_BUFFER,$t);for(let st=0;st<G.locationSize;st++)x(G.location+st,ct/G.locationSize,$,D,ct*rt,ct/G.locationSize*st*rt,vt)}}else if(H!==void 0){const D=H[W];if(D!==void 0)switch(D.length){case 2:r.vertexAttrib2fv(G.location,D);break;case 3:r.vertexAttrib3fv(G.location,D);break;case 4:r.vertexAttrib4fv(G.location,D);break;default:r.vertexAttrib1fv(G.location,D)}}}}y()}function C(){R();for(const M in n){const P=n[M];for(const I in P){const F=P[I];for(const k in F)h(F[k].object),delete F[k];delete P[I]}delete n[M]}}function b(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const I in P){const F=P[I];for(const k in F)h(F[k].object),delete F[k];delete P[I]}delete n[M.id]}function w(M){for(const P in n){const I=n[P];if(I[M.id]===void 0)continue;const F=I[M.id];for(const k in F)h(F[k].object),delete F[k];delete I[M.id]}}function R(){S(),o=!0,s!==i&&(s=i,c(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:S,dispose:C,releaseStatesOfGeometry:b,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function kM(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let p=0;p<u;p++)d+=h[p];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<c.length;p++)o(c[p],h[p],f[p]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let p=0;for(let _=0;_<u;_++)p+=h[_]*f[_];e.update(p,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function GM(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(w){return!(w!==vi&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const R=w===fa&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Ji&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Ci&&!R)}function l(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),C=p>0,b=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:C,maxSamples:b}}function HM(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new zr,a=new ie,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const p=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,m=r.get(u);if(!i||p===null||p.length===0||s&&!g)s?h(null):c();else{const y=s?0:n,x=y*4;let v=m.clippingState||null;l.value=v,v=h(p,f,x,d);for(let C=0;C!==x;++C)v[C]=e[C];m.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,p){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=l.value,p!==!0||g===null){const m=d+_*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<m)&&(g=new Float32Array(m));for(let x=0,v=d;x!==_;++x,v+=4)o.copy(u[x]).applyMatrix4(y,a),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function VM(r){let t=new WeakMap;function e(o,a){return a===mh?o.mapping=eo:a===gh&&(o.mapping=no),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===mh||a===gh)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new tv(l.height);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Dm extends Rm{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Os=4,Jf=[.125,.215,.35,.446,.526,.582],Vr=20,Sc=new Dm,Kf=new ue;let wc=null,Ec=0,Tc=0,bc=!1;const kr=(1+Math.sqrt(5))/2,Cs=1/kr,jf=[new N(-kr,Cs,0),new N(kr,Cs,0),new N(-Cs,0,kr),new N(Cs,0,kr),new N(0,kr,-Cs),new N(0,kr,Cs),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class Qf{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){wc=this._renderer.getRenderTarget(),Ec=this._renderer.getActiveCubeFace(),Tc=this._renderer.getActiveMipmapLevel(),bc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ed(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(wc,Ec,Tc),this._renderer.xr.enabled=bc,t.scissorTest=!1,Xa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===eo||t.mapping===no?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),wc=this._renderer.getRenderTarget(),Ec=this._renderer.getActiveCubeFace(),Tc=this._renderer.getActiveMipmapLevel(),bc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ai,minFilter:Ai,generateMipmaps:!1,type:fa,format:vi,colorSpace:oo,depthBuffer:!1},i=td(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=td(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=WM(s)),this._blurMaterial=XM(s,t,e)}return i}_compileMaterial(t){const e=new J(this._lodPlanes[0],t);this._renderer.compile(e,Sc)}_sceneToCubeUV(t,e,n,i){const a=new Yn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Kf),h.toneMapping=vr,h.autoClear=!1;const d=new Hr({name:"PMREM.Background",side:Nn,depthWrite:!1,depthTest:!1}),p=new J(new wt,d);let _=!1;const g=t.background;g?g.isColor&&(d.color.copy(g),t.background=null,_=!0):(d.color.copy(Kf),_=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):y===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const x=this._cubeSize;Xa(i,y*x,m>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(p,a),h.render(t,a)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===eo||t.mapping===no;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=nd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ed());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new J(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Xa(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Sc)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=jf[(i-s-1)%jf.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new J(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Vr-1),_=s/p,g=isFinite(s)?1+Math.floor(h*_):Vr;g>Vr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Vr}`);const m=[];let y=0;for(let w=0;w<Vr;++w){const R=w/_,S=Math.exp(-R*R/2);m.push(S),w===0?y+=S:w<g&&(y+=2*S)}for(let w=0;w<m.length;w++)m[w]=m[w]/y;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=p,f.mipInt.value=x-n;const v=this._sizeLods[i],C=3*v*(i>x-Os?i-x+Os:0),b=4*(this._cubeSize-v);Xa(e,C,b,3*v,2*v),l.setRenderTarget(e),l.render(u,Sc)}}function WM(r){const t=[],e=[],n=[];let i=r;const s=r-Os+1+Jf.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-Os?l=Jf[o-r+Os-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,p=6,_=3,g=2,m=1,y=new Float32Array(_*p*d),x=new Float32Array(g*p*d),v=new Float32Array(m*p*d);for(let b=0;b<d;b++){const w=b%3*2/3-1,R=b>2?0:-1,S=[w,R,0,w+2/3,R,0,w+2/3,R+1,0,w,R,0,w+2/3,R+1,0,w,R+1,0];y.set(S,_*p*b),x.set(f,g*p*b);const M=[b,b,b,b,b,b];v.set(M,m*p*b)}const C=new xn;C.setAttribute("position",new hi(y,_)),C.setAttribute("uv",new hi(x,g)),C.setAttribute("faceIndex",new hi(v,m)),t.push(C),i>Os&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function td(r,t,e){const n=new ss(r,t,e);return n.texture.mapping=Ul,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xa(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function XM(r,t,e){const n=new Float32Array(Vr),i=new N(0,1,0);return new Tr({name:"SphericalGaussianBlur",defines:{n:Vr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Pu(),fragmentShader:`

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
		`,blending:_r,depthTest:!1,depthWrite:!1})}function ed(){return new Tr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pu(),fragmentShader:`

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
		`,blending:_r,depthTest:!1,depthWrite:!1})}function nd(){return new Tr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:_r,depthTest:!1,depthWrite:!1})}function Pu(){return`

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
	`}function YM(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===mh||l===gh,h=l===eo||l===no;if(c||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Qf(r)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return c&&d&&d.height>0||h&&d&&i(d)?(e===null&&(e=new Qf(r)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function qM(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Uo("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function $M(r,t,e,n){const i={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const p in f.attributes)t.remove(f.attributes[p]);for(const p in f.morphAttributes){const _=f.morphAttributes[p];for(let g=0,m=_.length;g<m;g++)t.remove(_[g])}f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const p in f)t.update(f[p],r.ARRAY_BUFFER);const d=u.morphAttributes;for(const p in d){const _=d[p];for(let g=0,m=_.length;g<m;g++)t.update(_[g],r.ARRAY_BUFFER)}}function c(u){const f=[],d=u.index,p=u.attributes.position;let _=0;if(d!==null){const y=d.array;_=d.version;for(let x=0,v=y.length;x<v;x+=3){const C=y[x+0],b=y[x+1],w=y[x+2];f.push(C,b,b,w,w,C)}}else if(p!==void 0){const y=p.array;_=p.version;for(let x=0,v=y.length/3-1;x<v;x+=3){const C=x+0,b=x+1,w=x+2;f.push(C,b,b,w,w,C)}}else return;const g=new(Mm(f)?Am:bm)(f,1);g.version=_;const m=s.get(u);m&&t.remove(m),s.set(u,g)}function h(u){const f=s.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function ZM(r,t,e){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){r.drawElements(n,d,s,f*o),e.update(d,n,1)}function c(f,d,p){p!==0&&(r.drawElementsInstanced(n,d,s,f*o,p),e.update(d,n,p))}function h(f,d,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,p);let g=0;for(let m=0;m<p;m++)g+=d[m];e.update(g,n,1)}function u(f,d,p,_){if(p===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<f.length;m++)c(f[m]/o,d[m],_[m]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,_,0,p);let m=0;for(let y=0;y<p;y++)m+=d[y]*_[y];e.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function JM(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function KM(r,t,e){const n=new WeakMap,i=new we;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let M=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var d=M;f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;p===!0&&(v=1),_===!0&&(v=2),g===!0&&(v=3);let C=a.attributes.position.count*v,b=1;C>t.maxTextureSize&&(b=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const w=new Float32Array(C*b*4*u),R=new Sm(w,C,b,u);R.type=Ci,R.needsUpdate=!0;const S=v*4;for(let P=0;P<u;P++){const I=m[P],F=y[P],k=x[P],X=C*b*4*P;for(let H=0;H<I.count;H++){const W=H*S;p===!0&&(i.fromBufferAttribute(I,H),w[X+W+0]=i.x,w[X+W+1]=i.y,w[X+W+2]=i.z,w[X+W+3]=0),_===!0&&(i.fromBufferAttribute(F,H),w[X+W+4]=i.x,w[X+W+5]=i.y,w[X+W+6]=i.z,w[X+W+7]=0),g===!0&&(i.fromBufferAttribute(k,H),w[X+W+8]=i.x,w[X+W+9]=i.y,w[X+W+10]=i.z,w[X+W+11]=k.itemSize===4?i.w:1)}}f={count:u,texture:R,size:new Et(C,b)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const _=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function jM(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class Im extends vn{constructor(t,e,n,i,s,o,a,l,c,h=Ys){if(h!==Ys&&h!==ro)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ys&&(n=rs),n===void 0&&h===ro&&(n=io),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:jn,this.minFilter=l!==void 0?l:jn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Um=new vn,id=new Im(1,1),Nm=new Sm,Om=new B_,Fm=new Pm,rd=[],sd=[],od=new Float32Array(16),ad=new Float32Array(9),ld=new Float32Array(4);function uo(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=rd[i];if(s===void 0&&(s=new Float32Array(i),rd[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function tn(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function en(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Ol(r,t){let e=sd[t];e===void 0&&(e=new Int32Array(t),sd[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function QM(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function ty(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(tn(e,t))return;r.uniform2fv(this.addr,t),en(e,t)}}function ey(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(tn(e,t))return;r.uniform3fv(this.addr,t),en(e,t)}}function ny(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(tn(e,t))return;r.uniform4fv(this.addr,t),en(e,t)}}function iy(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(tn(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),en(e,t)}else{if(tn(e,n))return;ld.set(n),r.uniformMatrix2fv(this.addr,!1,ld),en(e,n)}}function ry(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(tn(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),en(e,t)}else{if(tn(e,n))return;ad.set(n),r.uniformMatrix3fv(this.addr,!1,ad),en(e,n)}}function sy(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(tn(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),en(e,t)}else{if(tn(e,n))return;od.set(n),r.uniformMatrix4fv(this.addr,!1,od),en(e,n)}}function oy(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function ay(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(tn(e,t))return;r.uniform2iv(this.addr,t),en(e,t)}}function ly(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(tn(e,t))return;r.uniform3iv(this.addr,t),en(e,t)}}function cy(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(tn(e,t))return;r.uniform4iv(this.addr,t),en(e,t)}}function hy(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function uy(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(tn(e,t))return;r.uniform2uiv(this.addr,t),en(e,t)}}function fy(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(tn(e,t))return;r.uniform3uiv(this.addr,t),en(e,t)}}function dy(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(tn(e,t))return;r.uniform4uiv(this.addr,t),en(e,t)}}function py(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(id.compareFunction=xm,s=id):s=Um,e.setTexture2D(t||s,i)}function my(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Om,i)}function gy(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Fm,i)}function _y(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Nm,i)}function vy(r){switch(r){case 5126:return QM;case 35664:return ty;case 35665:return ey;case 35666:return ny;case 35674:return iy;case 35675:return ry;case 35676:return sy;case 5124:case 35670:return oy;case 35667:case 35671:return ay;case 35668:case 35672:return ly;case 35669:case 35673:return cy;case 5125:return hy;case 36294:return uy;case 36295:return fy;case 36296:return dy;case 35678:case 36198:case 36298:case 36306:case 35682:return py;case 35679:case 36299:case 36307:return my;case 35680:case 36300:case 36308:case 36293:return gy;case 36289:case 36303:case 36311:case 36292:return _y}}function xy(r,t){r.uniform1fv(this.addr,t)}function My(r,t){const e=uo(t,this.size,2);r.uniform2fv(this.addr,e)}function yy(r,t){const e=uo(t,this.size,3);r.uniform3fv(this.addr,e)}function Sy(r,t){const e=uo(t,this.size,4);r.uniform4fv(this.addr,e)}function wy(r,t){const e=uo(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function Ey(r,t){const e=uo(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function Ty(r,t){const e=uo(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function by(r,t){r.uniform1iv(this.addr,t)}function Ay(r,t){r.uniform2iv(this.addr,t)}function Cy(r,t){r.uniform3iv(this.addr,t)}function Ry(r,t){r.uniform4iv(this.addr,t)}function Py(r,t){r.uniform1uiv(this.addr,t)}function Ly(r,t){r.uniform2uiv(this.addr,t)}function Dy(r,t){r.uniform3uiv(this.addr,t)}function Iy(r,t){r.uniform4uiv(this.addr,t)}function Uy(r,t,e){const n=this.cache,i=t.length,s=Ol(e,i);tn(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Um,s[o])}function Ny(r,t,e){const n=this.cache,i=t.length,s=Ol(e,i);tn(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Om,s[o])}function Oy(r,t,e){const n=this.cache,i=t.length,s=Ol(e,i);tn(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Fm,s[o])}function Fy(r,t,e){const n=this.cache,i=t.length,s=Ol(e,i);tn(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Nm,s[o])}function By(r){switch(r){case 5126:return xy;case 35664:return My;case 35665:return yy;case 35666:return Sy;case 35674:return wy;case 35675:return Ey;case 35676:return Ty;case 5124:case 35670:return by;case 35667:case 35671:return Ay;case 35668:case 35672:return Cy;case 35669:case 35673:return Ry;case 5125:return Py;case 36294:return Ly;case 36295:return Dy;case 36296:return Iy;case 35678:case 36198:case 36298:case 36306:case 35682:return Uy;case 35679:case 36299:case 36307:return Ny;case 35680:case 36300:case 36308:case 36293:return Oy;case 36289:case 36303:case 36311:case 36292:return Fy}}class zy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=vy(e.type)}}class ky{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=By(e.type)}}class Gy{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const Ac=/(\w+)(\])?(\[|\.)?/g;function cd(r,t){r.seq.push(t),r.map[t.id]=t}function Hy(r,t,e){const n=r.name,i=n.length;for(Ac.lastIndex=0;;){const s=Ac.exec(n),o=Ac.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){cd(e,c===void 0?new zy(a,r,t):new ky(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new Gy(a),cd(e,u)),e=u}}}class dl{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);Hy(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function hd(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const Vy=37297;let Wy=0;function Xy(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const ud=new ie;function Yy(r){de._getMatrix(ud,de.workingColorSpace,r);const t=`mat3( ${ud.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(r)){case Nl:return[t,"LinearTransferOETF"];case Se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function fd(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Xy(r.getShaderSource(t),o)}else return i}function qy(r,t){const e=Yy(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function $y(r,t){let e;switch(t){case f_:e="Linear";break;case d_:e="Reinhard";break;case p_:e="Cineon";break;case am:e="ACESFilmic";break;case g_:e="AgX";break;case __:e="Neutral";break;case m_:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ya=new N;function Zy(){de.getLuminanceCoefficients(Ya);const r=Ya.x.toFixed(4),t=Ya.y.toFixed(4),e=Ya.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jy(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(No).join(`
`)}function Ky(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function jy(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function No(r){return r!==""}function dd(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function pd(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Qy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xh(r){return r.replace(Qy,eS)}const tS=new Map;function eS(r,t){let e=re[t];if(e===void 0){const n=tS.get(t);if(n!==void 0)e=re[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Xh(e)}const nS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function md(r){return r.replace(nS,iS)}function iS(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function gd(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function rS(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===sm?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Xg?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===zi&&(t="SHADOWMAP_TYPE_VSM"),t}function sS(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case eo:case no:t="ENVMAP_TYPE_CUBE";break;case Ul:t="ENVMAP_TYPE_CUBE_UV";break}return t}function oS(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case no:t="ENVMAP_MODE_REFRACTION";break}return t}function aS(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case om:t="ENVMAP_BLENDING_MULTIPLY";break;case h_:t="ENVMAP_BLENDING_MIX";break;case u_:t="ENVMAP_BLENDING_ADD";break}return t}function lS(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function cS(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=rS(e),c=sS(e),h=oS(e),u=aS(e),f=lS(e),d=Jy(e),p=Ky(s),_=i.createProgram();let g,m,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(No).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(No).join(`
`),m.length>0&&(m+=`
`)):(g=[gd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(No).join(`
`),m=[gd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==vr?"#define TONE_MAPPING":"",e.toneMapping!==vr?re.tonemapping_pars_fragment:"",e.toneMapping!==vr?$y("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",re.colorspace_pars_fragment,qy("linearToOutputTexel",e.outputColorSpace),Zy(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(No).join(`
`)),o=Xh(o),o=dd(o,e),o=pd(o,e),a=Xh(a),a=dd(a,e),a=pd(a,e),o=md(o),a=md(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Rf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Rf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=y+g+o,v=y+m+a,C=hd(i,i.VERTEX_SHADER,x),b=hd(i,i.FRAGMENT_SHADER,v);i.attachShader(_,C),i.attachShader(_,b),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function w(P){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(_).trim(),F=i.getShaderInfoLog(C).trim(),k=i.getShaderInfoLog(b).trim();let X=!0,H=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(X=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,C,b);else{const W=fd(i,C,"vertex"),G=fd(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+I+`
`+W+`
`+G)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(F===""||k==="")&&(H=!1);H&&(P.diagnostics={runnable:X,programLog:I,vertexShader:{log:F,prefix:g},fragmentShader:{log:k,prefix:m}})}i.deleteShader(C),i.deleteShader(b),R=new dl(i,_),S=jy(i,_)}let R;this.getUniforms=function(){return R===void 0&&w(this),R};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,Vy)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Wy++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=b,this}let hS=0;class uS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new fS(t),e.set(t,n)),n}}class fS{constructor(t){this.id=hS++,this.code=t,this.usedTimes=0}}function dS(r,t,e,n,i,s,o){const a=new Em,l=new uS,c=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,M,P,I,F){const k=I.fog,X=F.geometry,H=S.isMeshStandardMaterial?I.environment:null,W=(S.isMeshStandardMaterial?e:t).get(S.envMap||H),G=W&&W.mapping===Ul?W.image.height:null,it=p[S.type];S.precision!==null&&(d=i.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const D=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ct=D!==void 0?D.length:0;let Lt=0;X.morphAttributes.position!==void 0&&(Lt=1),X.morphAttributes.normal!==void 0&&(Lt=2),X.morphAttributes.color!==void 0&&(Lt=3);let $t,$,rt,vt;if(it){const Tt=wi[it];$t=Tt.vertexShader,$=Tt.fragmentShader}else $t=S.vertexShader,$=S.fragmentShader,l.update(S),rt=l.getVertexShaderID(S),vt=l.getFragmentShaderID(S);const st=r.getRenderTarget(),Ct=r.state.buffers.depth.getReversed(),Ut=F.isInstancedMesh===!0,zt=F.isBatchedMesh===!0,Wt=!!S.map,tt=!!S.matcap,et=!!W,L=!!S.aoMap,bt=!!S.lightMap,ot=!!S.bumpMap,O=!!S.normalMap,lt=!!S.displacementMap,Ft=!!S.emissiveMap,Mt=!!S.metalnessMap,A=!!S.roughnessMap,E=S.anisotropy>0,V=S.clearcoat>0,K=S.dispersion>0,Q=S.iridescence>0,j=S.sheen>0,pt=S.transmission>0,ut=E&&!!S.anisotropyMap,_t=V&&!!S.clearcoatMap,Yt=V&&!!S.clearcoatNormalMap,at=V&&!!S.clearcoatRoughnessMap,ft=Q&&!!S.iridescenceMap,Gt=Q&&!!S.iridescenceThicknessMap,kt=j&&!!S.sheenColorMap,Rt=j&&!!S.sheenRoughnessMap,jt=!!S.specularMap,Vt=!!S.specularColorMap,oe=!!S.specularIntensityMap,U=pt&&!!S.transmissionMap,mt=pt&&!!S.thicknessMap,Z=!!S.gradientMap,nt=!!S.alphaMap,gt=S.alphaTest>0,xt=!!S.alphaHash,Xt=!!S.extensions;let he=vr;S.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(he=r.toneMapping);const Ce={shaderID:it,shaderType:S.type,shaderName:S.name,vertexShader:$t,fragmentShader:$,defines:S.defines,customVertexShaderID:rt,customFragmentShaderID:vt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:zt,batchingColor:zt&&F._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&F.instanceColor!==null,instancingMorph:Ut&&F.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:st===null?r.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:oo,alphaToCoverage:!!S.alphaToCoverage,map:Wt,matcap:tt,envMap:et,envMapMode:et&&W.mapping,envMapCubeUVHeight:G,aoMap:L,lightMap:bt,bumpMap:ot,normalMap:O,displacementMap:f&&lt,emissiveMap:Ft,normalMapObjectSpace:O&&S.normalMapType===y_,normalMapTangentSpace:O&&S.normalMapType===vm,metalnessMap:Mt,roughnessMap:A,anisotropy:E,anisotropyMap:ut,clearcoat:V,clearcoatMap:_t,clearcoatNormalMap:Yt,clearcoatRoughnessMap:at,dispersion:K,iridescence:Q,iridescenceMap:ft,iridescenceThicknessMap:Gt,sheen:j,sheenColorMap:kt,sheenRoughnessMap:Rt,specularMap:jt,specularColorMap:Vt,specularIntensityMap:oe,transmission:pt,transmissionMap:U,thicknessMap:mt,gradientMap:Z,opaque:S.transparent===!1&&S.blending===Xs&&S.alphaToCoverage===!1,alphaMap:nt,alphaTest:gt,alphaHash:xt,combine:S.combine,mapUv:Wt&&_(S.map.channel),aoMapUv:L&&_(S.aoMap.channel),lightMapUv:bt&&_(S.lightMap.channel),bumpMapUv:ot&&_(S.bumpMap.channel),normalMapUv:O&&_(S.normalMap.channel),displacementMapUv:lt&&_(S.displacementMap.channel),emissiveMapUv:Ft&&_(S.emissiveMap.channel),metalnessMapUv:Mt&&_(S.metalnessMap.channel),roughnessMapUv:A&&_(S.roughnessMap.channel),anisotropyMapUv:ut&&_(S.anisotropyMap.channel),clearcoatMapUv:_t&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Yt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Gt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&_(S.sheenRoughnessMap.channel),specularMapUv:jt&&_(S.specularMap.channel),specularColorMapUv:Vt&&_(S.specularColorMap.channel),specularIntensityMapUv:oe&&_(S.specularIntensityMap.channel),transmissionMapUv:U&&_(S.transmissionMap.channel),thicknessMapUv:mt&&_(S.thicknessMap.channel),alphaMapUv:nt&&_(S.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(O||E),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!X.attributes.uv&&(Wt||nt),fog:!!k,useFog:S.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ct,skinning:F.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ct,morphTextureStride:Lt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:he,decodeVideoTexture:Wt&&S.map.isVideoTexture===!0&&de.getTransfer(S.map.colorSpace)===Se,decodeVideoTextureEmissive:Ft&&S.emissiveMap.isVideoTexture===!0&&de.getTransfer(S.emissiveMap.colorSpace)===Se,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===qe,flipSided:S.side===Nn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Xt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xt&&S.extensions.multiDraw===!0||zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function m(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(y(M,S),x(M,S),M.push(r.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function y(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function x(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){const M=p[S.type];let P;if(M){const I=wi[M];P=J_.clone(I.uniforms)}else P=S.uniforms;return P}function C(S,M){let P;for(let I=0,F=h.length;I<F;I++){const k=h[I];if(k.cacheKey===M){P=k,++P.usedTimes;break}}return P===void 0&&(P=new cS(r,M,S,s),h.push(P)),P}function b(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function w(S){l.remove(S)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:v,acquireProgram:C,releaseProgram:b,releaseShaderCache:w,programs:h,dispose:R}}function pS(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function mS(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function _d(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function vd(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,f,d,p,_,g){let m=r[t];return m===void 0?(m={id:u.id,object:u,geometry:f,material:d,groupOrder:p,renderOrder:u.renderOrder,z:_,group:g},r[t]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=d,m.groupOrder=p,m.renderOrder=u.renderOrder,m.z=_,m.group=g),t++,m}function a(u,f,d,p,_,g){const m=o(u,f,d,p,_,g);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):e.push(m)}function l(u,f,d,p,_,g){const m=o(u,f,d,p,_,g);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):e.unshift(m)}function c(u,f){e.length>1&&e.sort(u||mS),n.length>1&&n.sort(f||_d),i.length>1&&i.sort(f||_d)}function h(){for(let u=t,f=r.length;u<f;u++){const d=r[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function gS(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new vd,r.set(n,[o])):i>=s.length?(o=new vd,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function _S(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new ue};break;case"SpotLight":e={position:new N,direction:new N,color:new ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new ue,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new ue,groundColor:new ue};break;case"RectAreaLight":e={color:new ue,position:new N,halfWidth:new N,halfHeight:new N};break}return r[t.id]=e,e}}}function vS(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let xS=0;function MS(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function yS(r){const t=new _S,e=vS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);const i=new N,s=new Kt,o=new Kt;function a(c){let h=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,p=0,_=0,g=0,m=0,y=0,x=0,v=0,C=0,b=0,w=0;c.sort(MS);for(let S=0,M=c.length;S<M;S++){const P=c[S],I=P.color,F=P.intensity,k=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=I.r*F,u+=I.g*F,f+=I.b*F;else if(P.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(P.sh.coefficients[H],F);w++}else if(P.isDirectionalLight){const H=t.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const W=P.shadow,G=e.get(P);G.shadowIntensity=W.intensity,G.shadowBias=W.bias,G.shadowNormalBias=W.normalBias,G.shadowRadius=W.radius,G.shadowMapSize=W.mapSize,n.directionalShadow[d]=G,n.directionalShadowMap[d]=X,n.directionalShadowMatrix[d]=P.shadow.matrix,y++}n.directional[d]=H,d++}else if(P.isSpotLight){const H=t.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(I).multiplyScalar(F),H.distance=k,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,n.spot[_]=H;const W=P.shadow;if(P.map&&(n.spotLightMap[C]=P.map,C++,W.updateMatrices(P),P.castShadow&&b++),n.spotLightMatrix[_]=W.matrix,P.castShadow){const G=e.get(P);G.shadowIntensity=W.intensity,G.shadowBias=W.bias,G.shadowNormalBias=W.normalBias,G.shadowRadius=W.radius,G.shadowMapSize=W.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=X,v++}_++}else if(P.isRectAreaLight){const H=t.get(P);H.color.copy(I).multiplyScalar(F),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=H,g++}else if(P.isPointLight){const H=t.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){const W=P.shadow,G=e.get(P);G.shadowIntensity=W.intensity,G.shadowBias=W.bias,G.shadowNormalBias=W.normalBias,G.shadowRadius=W.radius,G.shadowMapSize=W.mapSize,G.shadowCameraNear=W.camera.near,G.shadowCameraFar=W.camera.far,n.pointShadow[p]=G,n.pointShadowMap[p]=X,n.pointShadowMatrix[p]=P.shadow.matrix,x++}n.point[p]=H,p++}else if(P.isHemisphereLight){const H=t.get(P);H.skyColor.copy(P.color).multiplyScalar(F),H.groundColor.copy(P.groundColor).multiplyScalar(F),n.hemi[m]=H,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=At.LTC_FLOAT_1,n.rectAreaLTC2=At.LTC_FLOAT_2):(n.rectAreaLTC1=At.LTC_HALF_1,n.rectAreaLTC2=At.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const R=n.hash;(R.directionalLength!==d||R.pointLength!==p||R.spotLength!==_||R.rectAreaLength!==g||R.hemiLength!==m||R.numDirectionalShadows!==y||R.numPointShadows!==x||R.numSpotShadows!==v||R.numSpotMaps!==C||R.numLightProbes!==w)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+C-b,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=w,R.directionalLength=d,R.pointLength=p,R.spotLength=_,R.rectAreaLength=g,R.hemiLength=m,R.numDirectionalShadows=y,R.numPointShadows=x,R.numSpotShadows=v,R.numSpotMaps=C,R.numLightProbes=w,n.version=xS++)}function l(c,h){let u=0,f=0,d=0,p=0,_=0;const g=h.matrixWorldInverse;for(let m=0,y=c.length;m<y;m++){const x=c[m];if(x.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),u++}else if(x.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),d++}else if(x.isRectAreaLight){const v=n.rectArea[p];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),o.identity(),s.copy(x.matrixWorld),s.premultiply(g),o.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),p++}else if(x.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),f++}else if(x.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:n}}function xd(r){const t=new yS(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function SS(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new xd(r),t.set(i,[a])):s>=o.length?(a=new xd(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class wS extends ho{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=x_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ES extends ho{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const TS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bS=`uniform sampler2D shadow_pass;
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
}`;function AS(r,t,e){let n=new Ru;const i=new Et,s=new Et,o=new we,a=new wS({depthPacking:M_}),l=new ES,c={},h=e.maxTextureSize,u={[Er]:Nn,[Nn]:Er,[qe]:qe},f=new Tr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:TS,fragmentShader:bS}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const p=new xn;p.setAttribute("position",new hi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new J(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sm;let m=this.type;this.render=function(b,w,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;const S=r.getRenderTarget(),M=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),I=r.state;I.setBlending(_r),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const F=m!==zi&&this.type===zi,k=m===zi&&this.type!==zi;for(let X=0,H=b.length;X<H;X++){const W=b[X],G=W.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const it=G.getFrameExtents();if(i.multiply(it),s.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/it.x),i.x=s.x*it.x,G.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/it.y),i.y=s.y*it.y,G.mapSize.y=s.y)),G.map===null||F===!0||k===!0){const ct=this.type!==zi?{minFilter:jn,magFilter:jn}:{};G.map!==null&&G.map.dispose(),G.map=new ss(i.x,i.y,ct),G.map.texture.name=W.name+".shadowMap",G.camera.updateProjectionMatrix()}r.setRenderTarget(G.map),r.clear();const D=G.getViewportCount();for(let ct=0;ct<D;ct++){const Lt=G.getViewport(ct);o.set(s.x*Lt.x,s.y*Lt.y,s.x*Lt.z,s.y*Lt.w),I.viewport(o),G.updateMatrices(W,ct),n=G.getFrustum(),v(w,R,G.camera,W,this.type)}G.isPointLightShadow!==!0&&this.type===zi&&y(G,R),G.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(S,M,P)};function y(b,w){const R=t.update(_);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new ss(i.x,i.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(w,null,R,f,_,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(w,null,R,d,_,null)}function x(b,w,R,S){let M=null;const P=R.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)M=P;else if(M=R.isPointLight===!0?l:a,r.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const I=M.uuid,F=w.uuid;let k=c[I];k===void 0&&(k={},c[I]=k);let X=k[F];X===void 0&&(X=M.clone(),k[F]=X,w.addEventListener("dispose",C)),M=X}if(M.visible=w.visible,M.wireframe=w.wireframe,S===zi?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:u[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const I=r.properties.get(M);I.light=R}return M}function v(b,w,R,S,M){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===zi)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,b.matrixWorld);const F=t.update(b),k=b.material;if(Array.isArray(k)){const X=F.groups;for(let H=0,W=X.length;H<W;H++){const G=X[H],it=k[G.materialIndex];if(it&&it.visible){const D=x(b,it,S,M);b.onBeforeShadow(r,b,w,R,F,D,G),r.renderBufferDirect(R,null,F,D,b,G),b.onAfterShadow(r,b,w,R,F,D,G)}}}else if(k.visible){const X=x(b,k,S,M);b.onBeforeShadow(r,b,w,R,F,X,null),r.renderBufferDirect(R,null,F,X,b,null),b.onAfterShadow(r,b,w,R,F,X,null)}}const I=b.children;for(let F=0,k=I.length;F<k;F++)v(I[F],w,R,S,M)}function C(b){b.target.removeEventListener("dispose",C);for(const R in c){const S=c[R],M=b.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const CS={[lh]:ch,[hh]:dh,[uh]:ph,[to]:fh,[ch]:lh,[dh]:hh,[ph]:uh,[fh]:to};function RS(r,t){function e(){let U=!1;const mt=new we;let Z=null;const nt=new we(0,0,0,0);return{setMask:function(gt){Z!==gt&&!U&&(r.colorMask(gt,gt,gt,gt),Z=gt)},setLocked:function(gt){U=gt},setClear:function(gt,xt,Xt,he,Ce){Ce===!0&&(gt*=he,xt*=he,Xt*=he),mt.set(gt,xt,Xt,he),nt.equals(mt)===!1&&(r.clearColor(gt,xt,Xt,he),nt.copy(mt))},reset:function(){U=!1,Z=null,nt.set(-1,0,0,0)}}}function n(){let U=!1,mt=!1,Z=null,nt=null,gt=null;return{setReversed:function(xt){if(mt!==xt){const Xt=t.get("EXT_clip_control");mt?Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.ZERO_TO_ONE_EXT):Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.NEGATIVE_ONE_TO_ONE_EXT);const he=gt;gt=null,this.setClear(he)}mt=xt},getReversed:function(){return mt},setTest:function(xt){xt?st(r.DEPTH_TEST):Ct(r.DEPTH_TEST)},setMask:function(xt){Z!==xt&&!U&&(r.depthMask(xt),Z=xt)},setFunc:function(xt){if(mt&&(xt=CS[xt]),nt!==xt){switch(xt){case lh:r.depthFunc(r.NEVER);break;case ch:r.depthFunc(r.ALWAYS);break;case hh:r.depthFunc(r.LESS);break;case to:r.depthFunc(r.LEQUAL);break;case uh:r.depthFunc(r.EQUAL);break;case fh:r.depthFunc(r.GEQUAL);break;case dh:r.depthFunc(r.GREATER);break;case ph:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}nt=xt}},setLocked:function(xt){U=xt},setClear:function(xt){gt!==xt&&(mt&&(xt=1-xt),r.clearDepth(xt),gt=xt)},reset:function(){U=!1,Z=null,nt=null,gt=null,mt=!1}}}function i(){let U=!1,mt=null,Z=null,nt=null,gt=null,xt=null,Xt=null,he=null,Ce=null;return{setTest:function(Tt){U||(Tt?st(r.STENCIL_TEST):Ct(r.STENCIL_TEST))},setMask:function(Tt){mt!==Tt&&!U&&(r.stencilMask(Tt),mt=Tt)},setFunc:function(Tt,Dt,Qt){(Z!==Tt||nt!==Dt||gt!==Qt)&&(r.stencilFunc(Tt,Dt,Qt),Z=Tt,nt=Dt,gt=Qt)},setOp:function(Tt,Dt,Qt){(xt!==Tt||Xt!==Dt||he!==Qt)&&(r.stencilOp(Tt,Dt,Qt),xt=Tt,Xt=Dt,he=Qt)},setLocked:function(Tt){U=Tt},setClear:function(Tt){Ce!==Tt&&(r.clearStencil(Tt),Ce=Tt)},reset:function(){U=!1,mt=null,Z=null,nt=null,gt=null,xt=null,Xt=null,he=null,Ce=null}}}const s=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],p=null,_=!1,g=null,m=null,y=null,x=null,v=null,C=null,b=null,w=new ue(0,0,0),R=0,S=!1,M=null,P=null,I=null,F=null,k=null;const X=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,W=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(G)[1]),H=W>=1):G.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),H=W>=2);let it=null,D={};const ct=r.getParameter(r.SCISSOR_BOX),Lt=r.getParameter(r.VIEWPORT),$t=new we().fromArray(ct),$=new we().fromArray(Lt);function rt(U,mt,Z,nt){const gt=new Uint8Array(4),xt=r.createTexture();r.bindTexture(U,xt),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Xt=0;Xt<Z;Xt++)U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?r.texImage3D(mt,0,r.RGBA,1,1,nt,0,r.RGBA,r.UNSIGNED_BYTE,gt):r.texImage2D(mt+Xt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,gt);return xt}const vt={};vt[r.TEXTURE_2D]=rt(r.TEXTURE_2D,r.TEXTURE_2D,1),vt[r.TEXTURE_CUBE_MAP]=rt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),vt[r.TEXTURE_2D_ARRAY]=rt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),vt[r.TEXTURE_3D]=rt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),st(r.DEPTH_TEST),o.setFunc(to),ot(!1),O(Ef),st(r.CULL_FACE),L(_r);function st(U){h[U]!==!0&&(r.enable(U),h[U]=!0)}function Ct(U){h[U]!==!1&&(r.disable(U),h[U]=!1)}function Ut(U,mt){return u[U]!==mt?(r.bindFramebuffer(U,mt),u[U]=mt,U===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=mt),U===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=mt),!0):!1}function zt(U,mt){let Z=d,nt=!1;if(U){Z=f.get(mt),Z===void 0&&(Z=[],f.set(mt,Z));const gt=U.textures;if(Z.length!==gt.length||Z[0]!==r.COLOR_ATTACHMENT0){for(let xt=0,Xt=gt.length;xt<Xt;xt++)Z[xt]=r.COLOR_ATTACHMENT0+xt;Z.length=gt.length,nt=!0}}else Z[0]!==r.BACK&&(Z[0]=r.BACK,nt=!0);nt&&r.drawBuffers(Z)}function Wt(U){return p!==U?(r.useProgram(U),p=U,!0):!1}const tt={[Gr]:r.FUNC_ADD,[qg]:r.FUNC_SUBTRACT,[$g]:r.FUNC_REVERSE_SUBTRACT};tt[Zg]=r.MIN,tt[Jg]=r.MAX;const et={[Kg]:r.ZERO,[jg]:r.ONE,[Qg]:r.SRC_COLOR,[oh]:r.SRC_ALPHA,[s_]:r.SRC_ALPHA_SATURATE,[i_]:r.DST_COLOR,[e_]:r.DST_ALPHA,[t_]:r.ONE_MINUS_SRC_COLOR,[ah]:r.ONE_MINUS_SRC_ALPHA,[r_]:r.ONE_MINUS_DST_COLOR,[n_]:r.ONE_MINUS_DST_ALPHA,[o_]:r.CONSTANT_COLOR,[a_]:r.ONE_MINUS_CONSTANT_COLOR,[l_]:r.CONSTANT_ALPHA,[c_]:r.ONE_MINUS_CONSTANT_ALPHA};function L(U,mt,Z,nt,gt,xt,Xt,he,Ce,Tt){if(U===_r){_===!0&&(Ct(r.BLEND),_=!1);return}if(_===!1&&(st(r.BLEND),_=!0),U!==Yg){if(U!==g||Tt!==S){if((m!==Gr||v!==Gr)&&(r.blendEquation(r.FUNC_ADD),m=Gr,v=Gr),Tt)switch(U){case Xs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case sh:r.blendFunc(r.ONE,r.ONE);break;case Tf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case bf:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Xs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case sh:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Tf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case bf:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}y=null,x=null,C=null,b=null,w.set(0,0,0),R=0,g=U,S=Tt}return}gt=gt||mt,xt=xt||Z,Xt=Xt||nt,(mt!==m||gt!==v)&&(r.blendEquationSeparate(tt[mt],tt[gt]),m=mt,v=gt),(Z!==y||nt!==x||xt!==C||Xt!==b)&&(r.blendFuncSeparate(et[Z],et[nt],et[xt],et[Xt]),y=Z,x=nt,C=xt,b=Xt),(he.equals(w)===!1||Ce!==R)&&(r.blendColor(he.r,he.g,he.b,Ce),w.copy(he),R=Ce),g=U,S=!1}function bt(U,mt){U.side===qe?Ct(r.CULL_FACE):st(r.CULL_FACE);let Z=U.side===Nn;mt&&(Z=!Z),ot(Z),U.blending===Xs&&U.transparent===!1?L(_r):L(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const nt=U.stencilWrite;a.setTest(nt),nt&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ft(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?st(r.SAMPLE_ALPHA_TO_COVERAGE):Ct(r.SAMPLE_ALPHA_TO_COVERAGE)}function ot(U){M!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),M=U)}function O(U){U!==Hg?(st(r.CULL_FACE),U!==P&&(U===Ef?r.cullFace(r.BACK):U===Vg?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ct(r.CULL_FACE),P=U}function lt(U){U!==I&&(H&&r.lineWidth(U),I=U)}function Ft(U,mt,Z){U?(st(r.POLYGON_OFFSET_FILL),(F!==mt||k!==Z)&&(r.polygonOffset(mt,Z),F=mt,k=Z)):Ct(r.POLYGON_OFFSET_FILL)}function Mt(U){U?st(r.SCISSOR_TEST):Ct(r.SCISSOR_TEST)}function A(U){U===void 0&&(U=r.TEXTURE0+X-1),it!==U&&(r.activeTexture(U),it=U)}function E(U,mt,Z){Z===void 0&&(it===null?Z=r.TEXTURE0+X-1:Z=it);let nt=D[Z];nt===void 0&&(nt={type:void 0,texture:void 0},D[Z]=nt),(nt.type!==U||nt.texture!==mt)&&(it!==Z&&(r.activeTexture(Z),it=Z),r.bindTexture(U,mt||vt[U]),nt.type=U,nt.texture=mt)}function V(){const U=D[it];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function K(){try{r.compressedTexImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{r.compressedTexImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{r.texSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pt(){try{r.texSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ut(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _t(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Yt(){try{r.texStorage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function at(){try{r.texStorage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ft(){try{r.texImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Gt(){try{r.texImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function kt(U){$t.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),$t.copy(U))}function Rt(U){$.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),$.copy(U))}function jt(U,mt){let Z=c.get(mt);Z===void 0&&(Z=new WeakMap,c.set(mt,Z));let nt=Z.get(U);nt===void 0&&(nt=r.getUniformBlockIndex(mt,U.name),Z.set(U,nt))}function Vt(U,mt){const nt=c.get(mt).get(U);l.get(mt)!==nt&&(r.uniformBlockBinding(mt,nt,U.__bindingPointIndex),l.set(mt,nt))}function oe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},it=null,D={},u={},f=new WeakMap,d=[],p=null,_=!1,g=null,m=null,y=null,x=null,v=null,C=null,b=null,w=new ue(0,0,0),R=0,S=!1,M=null,P=null,I=null,F=null,k=null,$t.set(0,0,r.canvas.width,r.canvas.height),$.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:st,disable:Ct,bindFramebuffer:Ut,drawBuffers:zt,useProgram:Wt,setBlending:L,setMaterial:bt,setFlipSided:ot,setCullFace:O,setLineWidth:lt,setPolygonOffset:Ft,setScissorTest:Mt,activeTexture:A,bindTexture:E,unbindTexture:V,compressedTexImage2D:K,compressedTexImage3D:Q,texImage2D:ft,texImage3D:Gt,updateUBOMapping:jt,uniformBlockBinding:Vt,texStorage2D:Yt,texStorage3D:at,texSubImage2D:j,texSubImage3D:pt,compressedTexSubImage2D:ut,compressedTexSubImage3D:_t,scissor:kt,viewport:Rt,reset:oe}}function Md(r,t,e,n){const i=PS(n);switch(e){case fm:return r*t;case pm:return r*t;case mm:return r*t*2;case Tu:return r*t/i.components*i.byteLength;case bu:return r*t/i.components*i.byteLength;case gm:return r*t*2/i.components*i.byteLength;case Au:return r*t*2/i.components*i.byteLength;case dm:return r*t*3/i.components*i.byteLength;case vi:return r*t*4/i.components*i.byteLength;case Cu:return r*t*4/i.components*i.byteLength;case ll:case cl:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case hl:case ul:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case xh:case yh:return Math.max(r,16)*Math.max(t,8)/4;case vh:case Mh:return Math.max(r,8)*Math.max(t,8)/2;case Sh:case wh:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Eh:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Th:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case bh:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Ah:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Ch:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Rh:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Ph:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Lh:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Dh:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Ih:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Uh:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Nh:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Oh:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Fh:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Bh:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case fl:case zh:case kh:return Math.ceil(r/4)*Math.ceil(t/4)*16;case _m:case Gh:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Hh:case Vh:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function PS(r){switch(r){case Ji:case cm:return{byteLength:1,components:1};case aa:case hm:case fa:return{byteLength:2,components:1};case wu:case Eu:return{byteLength:2,components:4};case rs:case Su:case Ci:return{byteLength:4,components:1};case um:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function LS(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Et,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,E){return d?new OffscreenCanvas(A,E):bl("canvas")}function _(A,E,V){let K=1;const Q=Mt(A);if((Q.width>V||Q.height>V)&&(K=V/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const j=Math.floor(K*Q.width),pt=Math.floor(K*Q.height);u===void 0&&(u=p(j,pt));const ut=E?p(j,pt):u;return ut.width=j,ut.height=pt,ut.getContext("2d").drawImage(A,0,0,j,pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+j+"x"+pt+")."),ut}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function g(A){return A.generateMipmaps}function m(A){r.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(A,E,V,K,Q=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let j=E;if(E===r.RED&&(V===r.FLOAT&&(j=r.R32F),V===r.HALF_FLOAT&&(j=r.R16F),V===r.UNSIGNED_BYTE&&(j=r.R8)),E===r.RED_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.R8UI),V===r.UNSIGNED_SHORT&&(j=r.R16UI),V===r.UNSIGNED_INT&&(j=r.R32UI),V===r.BYTE&&(j=r.R8I),V===r.SHORT&&(j=r.R16I),V===r.INT&&(j=r.R32I)),E===r.RG&&(V===r.FLOAT&&(j=r.RG32F),V===r.HALF_FLOAT&&(j=r.RG16F),V===r.UNSIGNED_BYTE&&(j=r.RG8)),E===r.RG_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.RG8UI),V===r.UNSIGNED_SHORT&&(j=r.RG16UI),V===r.UNSIGNED_INT&&(j=r.RG32UI),V===r.BYTE&&(j=r.RG8I),V===r.SHORT&&(j=r.RG16I),V===r.INT&&(j=r.RG32I)),E===r.RGB_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.RGB8UI),V===r.UNSIGNED_SHORT&&(j=r.RGB16UI),V===r.UNSIGNED_INT&&(j=r.RGB32UI),V===r.BYTE&&(j=r.RGB8I),V===r.SHORT&&(j=r.RGB16I),V===r.INT&&(j=r.RGB32I)),E===r.RGBA_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),V===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),V===r.UNSIGNED_INT&&(j=r.RGBA32UI),V===r.BYTE&&(j=r.RGBA8I),V===r.SHORT&&(j=r.RGBA16I),V===r.INT&&(j=r.RGBA32I)),E===r.RGB&&V===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),E===r.RGBA){const pt=Q?Nl:de.getTransfer(K);V===r.FLOAT&&(j=r.RGBA32F),V===r.HALF_FLOAT&&(j=r.RGBA16F),V===r.UNSIGNED_BYTE&&(j=pt===Se?r.SRGB8_ALPHA8:r.RGBA8),V===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),V===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function v(A,E){let V;return A?E===null||E===rs||E===io?V=r.DEPTH24_STENCIL8:E===Ci?V=r.DEPTH32F_STENCIL8:E===aa&&(V=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===rs||E===io?V=r.DEPTH_COMPONENT24:E===Ci?V=r.DEPTH_COMPONENT32F:E===aa&&(V=r.DEPTH_COMPONENT16),V}function C(A,E){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==jn&&A.minFilter!==Ai?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function b(A){const E=A.target;E.removeEventListener("dispose",b),R(E),E.isVideoTexture&&h.delete(E)}function w(A){const E=A.target;E.removeEventListener("dispose",w),M(E)}function R(A){const E=n.get(A);if(E.__webglInit===void 0)return;const V=A.source,K=f.get(V);if(K){const Q=K[E.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&S(A),Object.keys(K).length===0&&f.delete(V)}n.remove(A)}function S(A){const E=n.get(A);r.deleteTexture(E.__webglTexture);const V=A.source,K=f.get(V);delete K[E.__cacheKey],o.memory.textures--}function M(A){const E=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(E.__webglFramebuffer[K]))for(let Q=0;Q<E.__webglFramebuffer[K].length;Q++)r.deleteFramebuffer(E.__webglFramebuffer[K][Q]);else r.deleteFramebuffer(E.__webglFramebuffer[K]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[K])}else{if(Array.isArray(E.__webglFramebuffer))for(let K=0;K<E.__webglFramebuffer.length;K++)r.deleteFramebuffer(E.__webglFramebuffer[K]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let K=0;K<E.__webglColorRenderbuffer.length;K++)E.__webglColorRenderbuffer[K]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[K]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const V=A.textures;for(let K=0,Q=V.length;K<Q;K++){const j=n.get(V[K]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(V[K])}n.remove(A)}let P=0;function I(){P=0}function F(){const A=P;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),P+=1,A}function k(A){const E=[];return E.push(A.wrapS),E.push(A.wrapT),E.push(A.wrapR||0),E.push(A.magFilter),E.push(A.minFilter),E.push(A.anisotropy),E.push(A.internalFormat),E.push(A.format),E.push(A.type),E.push(A.generateMipmaps),E.push(A.premultiplyAlpha),E.push(A.flipY),E.push(A.unpackAlignment),E.push(A.colorSpace),E.join()}function X(A,E){const V=n.get(A);if(A.isVideoTexture&&lt(A),A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){const K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(V,A,E);return}}e.bindTexture(r.TEXTURE_2D,V.__webglTexture,r.TEXTURE0+E)}function H(A,E){const V=n.get(A);if(A.version>0&&V.__version!==A.version){$(V,A,E);return}e.bindTexture(r.TEXTURE_2D_ARRAY,V.__webglTexture,r.TEXTURE0+E)}function W(A,E){const V=n.get(A);if(A.version>0&&V.__version!==A.version){$(V,A,E);return}e.bindTexture(r.TEXTURE_3D,V.__webglTexture,r.TEXTURE0+E)}function G(A,E){const V=n.get(A);if(A.version>0&&V.__version!==A.version){rt(V,A,E);return}e.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture,r.TEXTURE0+E)}const it={[Si]:r.REPEAT,[dr]:r.CLAMP_TO_EDGE,[_h]:r.MIRRORED_REPEAT},D={[jn]:r.NEAREST,[v_]:r.NEAREST_MIPMAP_NEAREST,[ba]:r.NEAREST_MIPMAP_LINEAR,[Ai]:r.LINEAR,[Ql]:r.LINEAR_MIPMAP_NEAREST,[qr]:r.LINEAR_MIPMAP_LINEAR},ct={[S_]:r.NEVER,[C_]:r.ALWAYS,[w_]:r.LESS,[xm]:r.LEQUAL,[E_]:r.EQUAL,[A_]:r.GEQUAL,[T_]:r.GREATER,[b_]:r.NOTEQUAL};function Lt(A,E){if(E.type===Ci&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===Ai||E.magFilter===Ql||E.magFilter===ba||E.magFilter===qr||E.minFilter===Ai||E.minFilter===Ql||E.minFilter===ba||E.minFilter===qr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,it[E.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,it[E.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,it[E.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,D[E.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,D[E.minFilter]),E.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,ct[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===jn||E.minFilter!==ba&&E.minFilter!==qr||E.type===Ci&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");r.texParameterf(A,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function $t(A,E){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",b));const K=E.source;let Q=f.get(K);Q===void 0&&(Q={},f.set(K,Q));const j=k(E);if(j!==A.__cacheKey){Q[j]===void 0&&(Q[j]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,V=!0),Q[j].usedTimes++;const pt=Q[A.__cacheKey];pt!==void 0&&(Q[A.__cacheKey].usedTimes--,pt.usedTimes===0&&S(E)),A.__cacheKey=j,A.__webglTexture=Q[j].texture}return V}function $(A,E,V){let K=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(K=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(K=r.TEXTURE_3D);const Q=$t(A,E),j=E.source;e.bindTexture(K,A.__webglTexture,r.TEXTURE0+V);const pt=n.get(j);if(j.version!==pt.__version||Q===!0){e.activeTexture(r.TEXTURE0+V);const ut=de.getPrimaries(de.workingColorSpace),_t=E.colorSpace===ar?null:de.getPrimaries(E.colorSpace),Yt=E.colorSpace===ar||ut===_t?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let at=_(E.image,!1,i.maxTextureSize);at=Ft(E,at);const ft=s.convert(E.format,E.colorSpace),Gt=s.convert(E.type);let kt=x(E.internalFormat,ft,Gt,E.colorSpace,E.isVideoTexture);Lt(K,E);let Rt;const jt=E.mipmaps,Vt=E.isVideoTexture!==!0,oe=pt.__version===void 0||Q===!0,U=j.dataReady,mt=C(E,at);if(E.isDepthTexture)kt=v(E.format===ro,E.type),oe&&(Vt?e.texStorage2D(r.TEXTURE_2D,1,kt,at.width,at.height):e.texImage2D(r.TEXTURE_2D,0,kt,at.width,at.height,0,ft,Gt,null));else if(E.isDataTexture)if(jt.length>0){Vt&&oe&&e.texStorage2D(r.TEXTURE_2D,mt,kt,jt[0].width,jt[0].height);for(let Z=0,nt=jt.length;Z<nt;Z++)Rt=jt[Z],Vt?U&&e.texSubImage2D(r.TEXTURE_2D,Z,0,0,Rt.width,Rt.height,ft,Gt,Rt.data):e.texImage2D(r.TEXTURE_2D,Z,kt,Rt.width,Rt.height,0,ft,Gt,Rt.data);E.generateMipmaps=!1}else Vt?(oe&&e.texStorage2D(r.TEXTURE_2D,mt,kt,at.width,at.height),U&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,at.width,at.height,ft,Gt,at.data)):e.texImage2D(r.TEXTURE_2D,0,kt,at.width,at.height,0,ft,Gt,at.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Vt&&oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,mt,kt,jt[0].width,jt[0].height,at.depth);for(let Z=0,nt=jt.length;Z<nt;Z++)if(Rt=jt[Z],E.format!==vi)if(ft!==null)if(Vt){if(U)if(E.layerUpdates.size>0){const gt=Md(Rt.width,Rt.height,E.format,E.type);for(const xt of E.layerUpdates){const Xt=Rt.data.subarray(xt*gt/Rt.data.BYTES_PER_ELEMENT,(xt+1)*gt/Rt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,xt,Rt.width,Rt.height,1,ft,Xt)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,Rt.width,Rt.height,at.depth,ft,Rt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Z,kt,Rt.width,Rt.height,at.depth,0,Rt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?U&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,Rt.width,Rt.height,at.depth,ft,Gt,Rt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Z,kt,Rt.width,Rt.height,at.depth,0,ft,Gt,Rt.data)}else{Vt&&oe&&e.texStorage2D(r.TEXTURE_2D,mt,kt,jt[0].width,jt[0].height);for(let Z=0,nt=jt.length;Z<nt;Z++)Rt=jt[Z],E.format!==vi?ft!==null?Vt?U&&e.compressedTexSubImage2D(r.TEXTURE_2D,Z,0,0,Rt.width,Rt.height,ft,Rt.data):e.compressedTexImage2D(r.TEXTURE_2D,Z,kt,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?U&&e.texSubImage2D(r.TEXTURE_2D,Z,0,0,Rt.width,Rt.height,ft,Gt,Rt.data):e.texImage2D(r.TEXTURE_2D,Z,kt,Rt.width,Rt.height,0,ft,Gt,Rt.data)}else if(E.isDataArrayTexture)if(Vt){if(oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,mt,kt,at.width,at.height,at.depth),U)if(E.layerUpdates.size>0){const Z=Md(at.width,at.height,E.format,E.type);for(const nt of E.layerUpdates){const gt=at.data.subarray(nt*Z/at.data.BYTES_PER_ELEMENT,(nt+1)*Z/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,nt,at.width,at.height,1,ft,Gt,gt)}E.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,ft,Gt,at.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,kt,at.width,at.height,at.depth,0,ft,Gt,at.data);else if(E.isData3DTexture)Vt?(oe&&e.texStorage3D(r.TEXTURE_3D,mt,kt,at.width,at.height,at.depth),U&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,ft,Gt,at.data)):e.texImage3D(r.TEXTURE_3D,0,kt,at.width,at.height,at.depth,0,ft,Gt,at.data);else if(E.isFramebufferTexture){if(oe)if(Vt)e.texStorage2D(r.TEXTURE_2D,mt,kt,at.width,at.height);else{let Z=at.width,nt=at.height;for(let gt=0;gt<mt;gt++)e.texImage2D(r.TEXTURE_2D,gt,kt,Z,nt,0,ft,Gt,null),Z>>=1,nt>>=1}}else if(jt.length>0){if(Vt&&oe){const Z=Mt(jt[0]);e.texStorage2D(r.TEXTURE_2D,mt,kt,Z.width,Z.height)}for(let Z=0,nt=jt.length;Z<nt;Z++)Rt=jt[Z],Vt?U&&e.texSubImage2D(r.TEXTURE_2D,Z,0,0,ft,Gt,Rt):e.texImage2D(r.TEXTURE_2D,Z,kt,ft,Gt,Rt);E.generateMipmaps=!1}else if(Vt){if(oe){const Z=Mt(at);e.texStorage2D(r.TEXTURE_2D,mt,kt,Z.width,Z.height)}U&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,ft,Gt,at)}else e.texImage2D(r.TEXTURE_2D,0,kt,ft,Gt,at);g(E)&&m(K),pt.__version=j.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function rt(A,E,V){if(E.image.length!==6)return;const K=$t(A,E),Q=E.source;e.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+V);const j=n.get(Q);if(Q.version!==j.__version||K===!0){e.activeTexture(r.TEXTURE0+V);const pt=de.getPrimaries(de.workingColorSpace),ut=E.colorSpace===ar?null:de.getPrimaries(E.colorSpace),_t=E.colorSpace===ar||pt===ut?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const Yt=E.isCompressedTexture||E.image[0].isCompressedTexture,at=E.image[0]&&E.image[0].isDataTexture,ft=[];for(let nt=0;nt<6;nt++)!Yt&&!at?ft[nt]=_(E.image[nt],!0,i.maxCubemapSize):ft[nt]=at?E.image[nt].image:E.image[nt],ft[nt]=Ft(E,ft[nt]);const Gt=ft[0],kt=s.convert(E.format,E.colorSpace),Rt=s.convert(E.type),jt=x(E.internalFormat,kt,Rt,E.colorSpace),Vt=E.isVideoTexture!==!0,oe=j.__version===void 0||K===!0,U=Q.dataReady;let mt=C(E,Gt);Lt(r.TEXTURE_CUBE_MAP,E);let Z;if(Yt){Vt&&oe&&e.texStorage2D(r.TEXTURE_CUBE_MAP,mt,jt,Gt.width,Gt.height);for(let nt=0;nt<6;nt++){Z=ft[nt].mipmaps;for(let gt=0;gt<Z.length;gt++){const xt=Z[gt];E.format!==vi?kt!==null?Vt?U&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt,0,0,xt.width,xt.height,kt,xt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt,jt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt,0,0,xt.width,xt.height,kt,Rt,xt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt,jt,xt.width,xt.height,0,kt,Rt,xt.data)}}}else{if(Z=E.mipmaps,Vt&&oe){Z.length>0&&mt++;const nt=Mt(ft[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,mt,jt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(at){Vt?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,ft[nt].width,ft[nt].height,kt,Rt,ft[nt].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,jt,ft[nt].width,ft[nt].height,0,kt,Rt,ft[nt].data);for(let gt=0;gt<Z.length;gt++){const Xt=Z[gt].image[nt].image;Vt?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt+1,0,0,Xt.width,Xt.height,kt,Rt,Xt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt+1,jt,Xt.width,Xt.height,0,kt,Rt,Xt.data)}}else{Vt?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,kt,Rt,ft[nt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,jt,kt,Rt,ft[nt]);for(let gt=0;gt<Z.length;gt++){const xt=Z[gt];Vt?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt+1,0,0,kt,Rt,xt.image[nt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt+1,jt,kt,Rt,xt.image[nt])}}}g(E)&&m(r.TEXTURE_CUBE_MAP),j.__version=Q.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function vt(A,E,V,K,Q,j){const pt=s.convert(V.format,V.colorSpace),ut=s.convert(V.type),_t=x(V.internalFormat,pt,ut,V.colorSpace),Yt=n.get(E),at=n.get(V);if(at.__renderTarget=E,!Yt.__hasExternalTextures){const ft=Math.max(1,E.width>>j),Gt=Math.max(1,E.height>>j);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?e.texImage3D(Q,j,_t,ft,Gt,E.depth,0,pt,ut,null):e.texImage2D(Q,j,_t,ft,Gt,0,pt,ut,null)}e.bindFramebuffer(r.FRAMEBUFFER,A),O(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,K,Q,at.__webglTexture,0,ot(E)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,K,Q,at.__webglTexture,j),e.bindFramebuffer(r.FRAMEBUFFER,null)}function st(A,E,V){if(r.bindRenderbuffer(r.RENDERBUFFER,A),E.depthBuffer){const K=E.depthTexture,Q=K&&K.isDepthTexture?K.type:null,j=v(E.stencilBuffer,Q),pt=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ut=ot(E);O(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ut,j,E.width,E.height):V?r.renderbufferStorageMultisample(r.RENDERBUFFER,ut,j,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,j,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,pt,r.RENDERBUFFER,A)}else{const K=E.textures;for(let Q=0;Q<K.length;Q++){const j=K[Q],pt=s.convert(j.format,j.colorSpace),ut=s.convert(j.type),_t=x(j.internalFormat,pt,ut,j.colorSpace),Yt=ot(E);V&&O(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Yt,_t,E.width,E.height):O(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Yt,_t,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,_t,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ct(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,A),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(E.depthTexture);K.__renderTarget=E,(!K.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),X(E.depthTexture,0);const Q=K.__webglTexture,j=ot(E);if(E.depthTexture.format===Ys)O(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(E.depthTexture.format===ro)O(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ut(A){const E=n.get(A),V=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){const K=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),K){const Q=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),E.__depthDisposeCallback=Q}E.__boundDepthTexture=K}if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Ct(E.__webglFramebuffer,A)}else if(V){E.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[K]),E.__webglDepthbuffer[K]===void 0)E.__webglDepthbuffer[K]=r.createRenderbuffer(),st(E.__webglDepthbuffer[K],A,!1);else{const Q=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=E.__webglDepthbuffer[K];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,j)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),st(E.__webglDepthbuffer,A,!1);else{const K=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,Q)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function zt(A,E,V){const K=n.get(A);E!==void 0&&vt(K.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),V!==void 0&&Ut(A)}function Wt(A){const E=A.texture,V=n.get(A),K=n.get(E);A.addEventListener("dispose",w);const Q=A.textures,j=A.isWebGLCubeRenderTarget===!0,pt=Q.length>1;if(pt||(K.__webglTexture===void 0&&(K.__webglTexture=r.createTexture()),K.__version=E.version,o.memory.textures++),j){V.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer[ut]=[];for(let _t=0;_t<E.mipmaps.length;_t++)V.__webglFramebuffer[ut][_t]=r.createFramebuffer()}else V.__webglFramebuffer[ut]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer=[];for(let ut=0;ut<E.mipmaps.length;ut++)V.__webglFramebuffer[ut]=r.createFramebuffer()}else V.__webglFramebuffer=r.createFramebuffer();if(pt)for(let ut=0,_t=Q.length;ut<_t;ut++){const Yt=n.get(Q[ut]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=r.createTexture(),o.memory.textures++)}if(A.samples>0&&O(A)===!1){V.__webglMultisampledFramebuffer=r.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ut=0;ut<Q.length;ut++){const _t=Q[ut];V.__webglColorRenderbuffer[ut]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,V.__webglColorRenderbuffer[ut]);const Yt=s.convert(_t.format,_t.colorSpace),at=s.convert(_t.type),ft=x(_t.internalFormat,Yt,at,_t.colorSpace,A.isXRRenderTarget===!0),Gt=ot(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Gt,ft,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ut,r.RENDERBUFFER,V.__webglColorRenderbuffer[ut])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=r.createRenderbuffer(),st(V.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){e.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture),Lt(r.TEXTURE_CUBE_MAP,E);for(let ut=0;ut<6;ut++)if(E.mipmaps&&E.mipmaps.length>0)for(let _t=0;_t<E.mipmaps.length;_t++)vt(V.__webglFramebuffer[ut][_t],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ut,_t);else vt(V.__webglFramebuffer[ut],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);g(E)&&m(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let ut=0,_t=Q.length;ut<_t;ut++){const Yt=Q[ut],at=n.get(Yt);e.bindTexture(r.TEXTURE_2D,at.__webglTexture),Lt(r.TEXTURE_2D,Yt),vt(V.__webglFramebuffer,A,Yt,r.COLOR_ATTACHMENT0+ut,r.TEXTURE_2D,0),g(Yt)&&m(r.TEXTURE_2D)}e.unbindTexture()}else{let ut=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ut=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ut,K.__webglTexture),Lt(ut,E),E.mipmaps&&E.mipmaps.length>0)for(let _t=0;_t<E.mipmaps.length;_t++)vt(V.__webglFramebuffer[_t],A,E,r.COLOR_ATTACHMENT0,ut,_t);else vt(V.__webglFramebuffer,A,E,r.COLOR_ATTACHMENT0,ut,0);g(E)&&m(ut),e.unbindTexture()}A.depthBuffer&&Ut(A)}function tt(A){const E=A.textures;for(let V=0,K=E.length;V<K;V++){const Q=E[V];if(g(Q)){const j=y(A),pt=n.get(Q).__webglTexture;e.bindTexture(j,pt),m(j),e.unbindTexture()}}}const et=[],L=[];function bt(A){if(A.samples>0){if(O(A)===!1){const E=A.textures,V=A.width,K=A.height;let Q=r.COLOR_BUFFER_BIT;const j=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,pt=n.get(A),ut=E.length>1;if(ut)for(let _t=0;_t<E.length;_t++)e.bindFramebuffer(r.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,pt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let _t=0;_t<E.length;_t++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),ut){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,pt.__webglColorRenderbuffer[_t]);const Yt=n.get(E[_t]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Yt,0)}r.blitFramebuffer(0,0,V,K,0,0,V,K,Q,r.NEAREST),l===!0&&(et.length=0,L.length=0,et.push(r.COLOR_ATTACHMENT0+_t),A.depthBuffer&&A.resolveDepthBuffer===!1&&(et.push(j),L.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,L)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,et))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ut)for(let _t=0;_t<E.length;_t++){e.bindFramebuffer(r.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.RENDERBUFFER,pt.__webglColorRenderbuffer[_t]);const Yt=n.get(E[_t]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,pt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.TEXTURE_2D,Yt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const E=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function ot(A){return Math.min(i.maxSamples,A.samples)}function O(A){const E=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function lt(A){const E=o.render.frame;h.get(A)!==E&&(h.set(A,E),A.update())}function Ft(A,E){const V=A.colorSpace,K=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||V!==oo&&V!==ar&&(de.getTransfer(V)===Se?(K!==vi||Q!==Ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),E}function Mt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=I,this.setTexture2D=X,this.setTexture2DArray=H,this.setTexture3D=W,this.setTextureCube=G,this.rebindTextures=zt,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=bt,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=O}function DS(r,t){function e(n,i=ar){let s;const o=de.getTransfer(i);if(n===Ji)return r.UNSIGNED_BYTE;if(n===wu)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Eu)return r.UNSIGNED_SHORT_5_5_5_1;if(n===um)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===cm)return r.BYTE;if(n===hm)return r.SHORT;if(n===aa)return r.UNSIGNED_SHORT;if(n===Su)return r.INT;if(n===rs)return r.UNSIGNED_INT;if(n===Ci)return r.FLOAT;if(n===fa)return r.HALF_FLOAT;if(n===fm)return r.ALPHA;if(n===dm)return r.RGB;if(n===vi)return r.RGBA;if(n===pm)return r.LUMINANCE;if(n===mm)return r.LUMINANCE_ALPHA;if(n===Ys)return r.DEPTH_COMPONENT;if(n===ro)return r.DEPTH_STENCIL;if(n===Tu)return r.RED;if(n===bu)return r.RED_INTEGER;if(n===gm)return r.RG;if(n===Au)return r.RG_INTEGER;if(n===Cu)return r.RGBA_INTEGER;if(n===ll||n===cl||n===hl||n===ul)if(o===Se)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ll)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===cl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===hl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ul)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ll)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===cl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===hl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ul)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===vh||n===xh||n===Mh||n===yh)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===vh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Mh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===yh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Sh||n===wh||n===Eh)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Sh||n===wh)return o===Se?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Eh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Th||n===bh||n===Ah||n===Ch||n===Rh||n===Ph||n===Lh||n===Dh||n===Ih||n===Uh||n===Nh||n===Oh||n===Fh||n===Bh)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Th)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ah)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ch)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Rh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ph)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Lh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Dh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ih)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Uh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Nh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Bh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fl||n===zh||n===kh)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===fl)return o===Se?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===kh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===_m||n===Gh||n===Hh||n===Vh)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===fl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Gh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Hh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===io?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class IS extends Yn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ne extends Qe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const US={type:"move"};class Cc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ne,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ne,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ne,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,p=.005;c.inputState.pinching&&f>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(US)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ne;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const NS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,OS=`
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

}`;class FS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new vn,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Tr({vertexShader:NS,fragmentShader:OS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new J(new Me(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class BS extends ao{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,p=null;const _=new FS,g=e.getContextAttributes();let m=null,y=null;const x=[],v=[],C=new Et;let b=null;const w=new Yn;w.viewport=new we;const R=new Yn;R.viewport=new we;const S=[w,R],M=new IS;let P=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let rt=x[$];return rt===void 0&&(rt=new Cc,x[$]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function($){let rt=x[$];return rt===void 0&&(rt=new Cc,x[$]=rt),rt.getGripSpace()},this.getHand=function($){let rt=x[$];return rt===void 0&&(rt=new Cc,x[$]=rt),rt.getHandSpace()};function F($){const rt=v.indexOf($.inputSource);if(rt===-1)return;const vt=x[rt];vt!==void 0&&(vt.update($.inputSource,$.frame,c||o),vt.dispatchEvent({type:$.type,data:$.inputSource}))}function k(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",X);for(let $=0;$<x.length;$++){const rt=v[$];rt!==null&&(v[$]=null,x[$].disconnect(rt))}P=null,I=null,_.reset(),t.setRenderTarget(m),d=null,f=null,u=null,i=null,y=null,$t.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",k),i.addEventListener("inputsourceschange",X),g.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(C),i.renderState.layers===void 0){const rt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,e,rt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new ss(d.framebufferWidth,d.framebufferHeight,{format:vi,type:Ji,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let rt=null,vt=null,st=null;g.depth&&(st=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=g.stencil?ro:Ys,vt=g.stencil?io:rs);const Ct={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:s};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(Ct),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new ss(f.textureWidth,f.textureHeight,{format:vi,type:Ji,depthTexture:new Im(f.textureWidth,f.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),$t.setContext(i),$t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X($){for(let rt=0;rt<$.removed.length;rt++){const vt=$.removed[rt],st=v.indexOf(vt);st>=0&&(v[st]=null,x[st].disconnect(vt))}for(let rt=0;rt<$.added.length;rt++){const vt=$.added[rt];let st=v.indexOf(vt);if(st===-1){for(let Ut=0;Ut<x.length;Ut++)if(Ut>=v.length){v.push(vt),st=Ut;break}else if(v[Ut]===null){v[Ut]=vt,st=Ut;break}if(st===-1)break}const Ct=x[st];Ct&&Ct.connect(vt)}}const H=new N,W=new N;function G($,rt,vt){H.setFromMatrixPosition(rt.matrixWorld),W.setFromMatrixPosition(vt.matrixWorld);const st=H.distanceTo(W),Ct=rt.projectionMatrix.elements,Ut=vt.projectionMatrix.elements,zt=Ct[14]/(Ct[10]-1),Wt=Ct[14]/(Ct[10]+1),tt=(Ct[9]+1)/Ct[5],et=(Ct[9]-1)/Ct[5],L=(Ct[8]-1)/Ct[0],bt=(Ut[8]+1)/Ut[0],ot=zt*L,O=zt*bt,lt=st/(-L+bt),Ft=lt*-L;if(rt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ft),$.translateZ(lt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ct[10]===-1)$.projectionMatrix.copy(rt.projectionMatrix),$.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const Mt=zt+lt,A=Wt+lt,E=ot-Ft,V=O+(st-Ft),K=tt*Wt/A*Mt,Q=et*Wt/A*Mt;$.projectionMatrix.makePerspective(E,V,K,Q,Mt,A),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function it($,rt){rt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(rt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let rt=$.near,vt=$.far;_.texture!==null&&(_.depthNear>0&&(rt=_.depthNear),_.depthFar>0&&(vt=_.depthFar)),M.near=R.near=w.near=rt,M.far=R.far=w.far=vt,(P!==M.near||I!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,I=M.far),w.layers.mask=$.layers.mask|2,R.layers.mask=$.layers.mask|4,M.layers.mask=w.layers.mask|R.layers.mask;const st=$.parent,Ct=M.cameras;it(M,st);for(let Ut=0;Ut<Ct.length;Ut++)it(Ct[Ut],st);Ct.length===2?G(M,w,R):M.projectionMatrix.copy(w.projectionMatrix),D($,M,st)};function D($,rt,vt){vt===null?$.matrix.copy(rt.matrixWorld):($.matrix.copy(vt.matrixWorld),$.matrix.invert(),$.matrix.multiply(rt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(rt.projectionMatrix),$.projectionMatrixInverse.copy(rt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Wh*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let ct=null;function Lt($,rt){if(h=rt.getViewerPose(c||o),p=rt,h!==null){const vt=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let st=!1;vt.length!==M.cameras.length&&(M.cameras.length=0,st=!0);for(let Ut=0;Ut<vt.length;Ut++){const zt=vt[Ut];let Wt=null;if(d!==null)Wt=d.getViewport(zt);else{const et=u.getViewSubImage(f,zt);Wt=et.viewport,Ut===0&&(t.setRenderTargetTextures(y,et.colorTexture,f.ignoreDepthValues?void 0:et.depthStencilTexture),t.setRenderTarget(y))}let tt=S[Ut];tt===void 0&&(tt=new Yn,tt.layers.enable(Ut),tt.viewport=new we,S[Ut]=tt),tt.matrix.fromArray(zt.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(zt.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(Wt.x,Wt.y,Wt.width,Wt.height),Ut===0&&(M.matrix.copy(tt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),st===!0&&M.cameras.push(tt)}const Ct=i.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const Ut=u.getDepthInformation(vt[0]);Ut&&Ut.isValid&&Ut.texture&&_.init(t,Ut,i.renderState)}}for(let vt=0;vt<x.length;vt++){const st=v[vt],Ct=x[vt];st!==null&&Ct!==void 0&&Ct.update(st,rt,c||o)}ct&&ct($,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),p=null}const $t=new Lm;$t.setAnimationLoop(Lt),this.setAnimationLoop=function($){ct=$},this.dispose=function(){}}}const Ur=new ui,zS=new Kt;function kS(r,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Cm(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,y,x,v){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(g,m):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m)):m.isMeshStandardMaterial?(s(g,m),f(g,m),m.isMeshPhysicalMaterial&&d(g,m,v)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,y,x):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Nn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Nn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const y=t.get(m),x=y.envMap,v=y.envMapRotation;x&&(g.envMap.value=x,Ur.copy(v),Ur.x*=-1,Ur.y*=-1,Ur.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ur.y*=-1,Ur.z*=-1),g.envMapRotation.value.setFromMatrix4(zS.makeRotationFromEuler(Ur)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,y,x){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*y,g.scale.value=x*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,y){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Nn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const y=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function GS(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,x){const v=x.program;n.uniformBlockBinding(y,v)}function c(y,x){let v=i[y.id];v===void 0&&(p(y),v=h(y),i[y.id]=v,y.addEventListener("dispose",g));const C=x.program;n.updateUBOMapping(y,C);const b=t.render.frame;s[y.id]!==b&&(f(y),s[y.id]=b)}function h(y){const x=u();y.__bindingPointIndex=x;const v=r.createBuffer(),C=y.__size,b=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,C,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,v),v}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const x=i[y.id],v=y.uniforms,C=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let b=0,w=v.length;b<w;b++){const R=Array.isArray(v[b])?v[b]:[v[b]];for(let S=0,M=R.length;S<M;S++){const P=R[S];if(d(P,b,S,C)===!0){const I=P.__offset,F=Array.isArray(P.value)?P.value:[P.value];let k=0;for(let X=0;X<F.length;X++){const H=F[X],W=_(H);typeof H=="number"||typeof H=="boolean"?(P.__data[0]=H,r.bufferSubData(r.UNIFORM_BUFFER,I+k,P.__data)):H.isMatrix3?(P.__data[0]=H.elements[0],P.__data[1]=H.elements[1],P.__data[2]=H.elements[2],P.__data[3]=0,P.__data[4]=H.elements[3],P.__data[5]=H.elements[4],P.__data[6]=H.elements[5],P.__data[7]=0,P.__data[8]=H.elements[6],P.__data[9]=H.elements[7],P.__data[10]=H.elements[8],P.__data[11]=0):(H.toArray(P.__data,k),k+=W.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(y,x,v,C){const b=y.value,w=x+"_"+v;if(C[w]===void 0)return typeof b=="number"||typeof b=="boolean"?C[w]=b:C[w]=b.clone(),!0;{const R=C[w];if(typeof b=="number"||typeof b=="boolean"){if(R!==b)return C[w]=b,!0}else if(R.equals(b)===!1)return R.copy(b),!0}return!1}function p(y){const x=y.uniforms;let v=0;const C=16;for(let w=0,R=x.length;w<R;w++){const S=Array.isArray(x[w])?x[w]:[x[w]];for(let M=0,P=S.length;M<P;M++){const I=S[M],F=Array.isArray(I.value)?I.value:[I.value];for(let k=0,X=F.length;k<X;k++){const H=F[k],W=_(H),G=v%C,it=G%W.boundary,D=G+it;v+=it,D!==0&&C-D<W.storage&&(v+=C-D),I.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=v,v+=W.storage}}}const b=v%C;return b>0&&(v+=C-b),y.__size=v,y.__cache={},this}function _(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function g(y){const x=y.target;x.removeEventListener("dispose",g);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const y in i)r.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:l,update:c,dispose:m}}class HS{constructor(t={}){const{canvas:e=P_(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const p=new Uint32Array(4),_=new Int32Array(4);let g=null,m=null;const y=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ri,this.toneMapping=vr,this.toneMappingExposure=1;const v=this;let C=!1,b=0,w=0,R=null,S=-1,M=null;const P=new we,I=new we;let F=null;const k=new ue(0);let X=0,H=e.width,W=e.height,G=1,it=null,D=null;const ct=new we(0,0,H,W),Lt=new we(0,0,H,W);let $t=!1;const $=new Ru;let rt=!1,vt=!1;const st=new Kt,Ct=new Kt,Ut=new N,zt=new we,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let tt=!1;function et(){return R===null?G:1}let L=n;function bt(T,B){return e.getContext(T,B)}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${yu}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",xt,!1),L===null){const B="webgl2";if(L=bt(B,T),L===null)throw bt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let ot,O,lt,Ft,Mt,A,E,V,K,Q,j,pt,ut,_t,Yt,at,ft,Gt,kt,Rt,jt,Vt,oe,U;function mt(){ot=new qM(L),ot.init(),Vt=new DS(L,ot),O=new GM(L,ot,t,Vt),lt=new RS(L,ot),O.reverseDepthBuffer&&f&&lt.buffers.depth.setReversed(!0),Ft=new JM(L),Mt=new pS,A=new LS(L,ot,lt,Mt,O,Vt,Ft),E=new VM(v),V=new YM(v),K=new iv(L),oe=new zM(L,K),Q=new $M(L,K,Ft,oe),j=new jM(L,Q,K,Ft),kt=new KM(L,O,A),at=new HM(Mt),pt=new dS(v,E,V,ot,O,oe,at),ut=new kS(v,Mt),_t=new gS,Yt=new SS(ot),Gt=new BM(v,E,V,lt,j,d,l),ft=new AS(v,j,O),U=new GS(L,Ft,O,lt),Rt=new kM(L,ot,Ft),jt=new ZM(L,ot,Ft),Ft.programs=pt.programs,v.capabilities=O,v.extensions=ot,v.properties=Mt,v.renderLists=_t,v.shadowMap=ft,v.state=lt,v.info=Ft}mt();const Z=new BS(v,L);this.xr=Z,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const T=ot.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ot.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(T){T!==void 0&&(G=T,this.setSize(H,W,!1))},this.getSize=function(T){return T.set(H,W)},this.setSize=function(T,B,Y=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=T,W=B,e.width=Math.floor(T*G),e.height=Math.floor(B*G),Y===!0&&(e.style.width=T+"px",e.style.height=B+"px"),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set(H*G,W*G).floor()},this.setDrawingBufferSize=function(T,B,Y){H=T,W=B,G=Y,e.width=Math.floor(T*Y),e.height=Math.floor(B*Y),this.setViewport(0,0,T,B)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(ct)},this.setViewport=function(T,B,Y,q){T.isVector4?ct.set(T.x,T.y,T.z,T.w):ct.set(T,B,Y,q),lt.viewport(P.copy(ct).multiplyScalar(G).round())},this.getScissor=function(T){return T.copy(Lt)},this.setScissor=function(T,B,Y,q){T.isVector4?Lt.set(T.x,T.y,T.z,T.w):Lt.set(T,B,Y,q),lt.scissor(I.copy(Lt).multiplyScalar(G).round())},this.getScissorTest=function(){return $t},this.setScissorTest=function(T){lt.setScissorTest($t=T)},this.setOpaqueSort=function(T){it=T},this.setTransparentSort=function(T){D=T},this.getClearColor=function(T){return T.copy(Gt.getClearColor())},this.setClearColor=function(){Gt.setClearColor.apply(Gt,arguments)},this.getClearAlpha=function(){return Gt.getClearAlpha()},this.setClearAlpha=function(){Gt.setClearAlpha.apply(Gt,arguments)},this.clear=function(T=!0,B=!0,Y=!0){let q=0;if(T){let z=!1;if(R!==null){const ht=R.texture.format;z=ht===Cu||ht===Au||ht===bu}if(z){const ht=R.texture.type,dt=ht===Ji||ht===rs||ht===aa||ht===io||ht===wu||ht===Eu,St=Gt.getClearColor(),Pt=Gt.getClearAlpha(),Jt=St.r,te=St.g,Nt=St.b;dt?(p[0]=Jt,p[1]=te,p[2]=Nt,p[3]=Pt,L.clearBufferuiv(L.COLOR,0,p)):(_[0]=Jt,_[1]=te,_[2]=Nt,_[3]=Pt,L.clearBufferiv(L.COLOR,0,_))}else q|=L.COLOR_BUFFER_BIT}B&&(q|=L.DEPTH_BUFFER_BIT),Y&&(q|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),_t.dispose(),Yt.dispose(),Mt.dispose(),E.dispose(),V.dispose(),j.dispose(),oe.dispose(),U.dispose(),pt.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",yt),Z.removeEventListener("sessionend",Zt),Ot.stop()};function nt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const T=Ft.autoReset,B=ft.enabled,Y=ft.autoUpdate,q=ft.needsUpdate,z=ft.type;mt(),Ft.autoReset=T,ft.enabled=B,ft.autoUpdate=Y,ft.needsUpdate=q,ft.type=z}function xt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Xt(T){const B=T.target;B.removeEventListener("dispose",Xt),he(B)}function he(T){Ce(T),Mt.remove(T)}function Ce(T){const B=Mt.get(T).programs;B!==void 0&&(B.forEach(function(Y){pt.releaseProgram(Y)}),T.isShaderMaterial&&pt.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,Y,q,z,ht){B===null&&(B=Wt);const dt=z.isMesh&&z.matrixWorld.determinant()<0,St=Fn(T,B,Y,q,z);lt.setMaterial(q,dt);let Pt=Y.index,Jt=1;if(q.wireframe===!0){if(Pt=Q.getWireframeAttribute(Y),Pt===void 0)return;Jt=2}const te=Y.drawRange,Nt=Y.attributes.position;let ee=te.start*Jt,pe=(te.start+te.count)*Jt;ht!==null&&(ee=Math.max(ee,ht.start*Jt),pe=Math.min(pe,(ht.start+ht.count)*Jt)),Pt!==null?(ee=Math.max(ee,0),pe=Math.min(pe,Pt.count)):Nt!=null&&(ee=Math.max(ee,0),pe=Math.min(pe,Nt.count));const ge=pe-ee;if(ge<0||ge===1/0)return;oe.setup(z,q,St,Y,Pt);let Fe,_e=Rt;if(Pt!==null&&(Fe=K.get(Pt),_e=jt,_e.setIndex(Fe)),z.isMesh)q.wireframe===!0?(lt.setLineWidth(q.wireframeLinewidth*et()),_e.setMode(L.LINES)):_e.setMode(L.TRIANGLES);else if(z.isLine){let Ht=q.linewidth;Ht===void 0&&(Ht=1),lt.setLineWidth(Ht*et()),z.isLineSegments?_e.setMode(L.LINES):z.isLineLoop?_e.setMode(L.LINE_LOOP):_e.setMode(L.LINE_STRIP)}else z.isPoints?_e.setMode(L.POINTS):z.isSprite&&_e.setMode(L.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)_e.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(ot.get("WEBGL_multi_draw"))_e.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Ht=z._multiDrawStarts,Di=z._multiDrawCounts,ve=z._multiDrawCount,fi=Pt?K.get(Pt).bytesPerElement:1,hs=Mt.get(q).currentProgram.getUniforms();for(let Bn=0;Bn<ve;Bn++)hs.setValue(L,"_gl_DrawID",Bn),_e.render(Ht[Bn]/fi,Di[Bn])}else if(z.isInstancedMesh)_e.renderInstances(ee,ge,z.count);else if(Y.isInstancedBufferGeometry){const Ht=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Di=Math.min(Y.instanceCount,Ht);_e.renderInstances(ee,ge,Di)}else _e.render(ee,ge)};function Tt(T,B,Y){T.transparent===!0&&T.side===qe&&T.forceSinglePass===!1?(T.side=Nn,T.needsUpdate=!0,Ee(T,B,Y),T.side=Er,T.needsUpdate=!0,Ee(T,B,Y),T.side=qe):Ee(T,B,Y)}this.compile=function(T,B,Y=null){Y===null&&(Y=T),m=Yt.get(Y),m.init(B),x.push(m),Y.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),T!==Y&&T.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights();const q=new Set;return T.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ht=z.material;if(ht)if(Array.isArray(ht))for(let dt=0;dt<ht.length;dt++){const St=ht[dt];Tt(St,Y,z),q.add(St)}else Tt(ht,Y,z),q.add(ht)}),x.pop(),m=null,q},this.compileAsync=function(T,B,Y=null){const q=this.compile(T,B,Y);return new Promise(z=>{function ht(){if(q.forEach(function(dt){Mt.get(dt).currentProgram.isReady()&&q.delete(dt)}),q.size===0){z(T);return}setTimeout(ht,10)}ot.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let Dt=null;function Qt(T){Dt&&Dt(T)}function yt(){Ot.stop()}function Zt(){Ot.start()}const Ot=new Lm;Ot.setAnimationLoop(Qt),typeof self<"u"&&Ot.setContext(self),this.setAnimationLoop=function(T){Dt=T,Z.setAnimationLoop(T),T===null?Ot.stop():Ot.start()},Z.addEventListener("sessionstart",yt),Z.addEventListener("sessionend",Zt),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(B),B=Z.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,B,R),m=Yt.get(T,x.length),m.init(B),x.push(m),Ct.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),$.setFromProjectionMatrix(Ct),vt=this.localClippingEnabled,rt=at.init(this.clippingPlanes,vt),g=_t.get(T,y.length),g.init(),y.push(g),Z.enabled===!0&&Z.isPresenting===!0){const ht=v.xr.getDepthSensingMesh();ht!==null&&qt(ht,B,-1/0,v.sortObjects)}qt(T,B,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(it,D),tt=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,tt&&Gt.addToRenderList(g,T),this.info.render.frame++,rt===!0&&at.beginShadows();const Y=m.state.shadowsArray;ft.render(Y,T,B),rt===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=g.opaque,z=g.transmissive;if(m.setupLights(),B.isArrayCamera){const ht=B.cameras;if(z.length>0)for(let dt=0,St=ht.length;dt<St;dt++){const Pt=ht[dt];ne(q,z,T,Pt)}tt&&Gt.render(T);for(let dt=0,St=ht.length;dt<St;dt++){const Pt=ht[dt];Le(g,T,Pt,Pt.viewport)}}else z.length>0&&ne(q,z,T,B),tt&&Gt.render(T),Le(g,T,B);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(v,T,B),oe.resetDefaultState(),S=-1,M=null,x.pop(),x.length>0?(m=x[x.length-1],rt===!0&&at.setGlobalState(v.clippingPlanes,m.state.camera)):m=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function qt(T,B,Y,q){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)Y=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||$.intersectsSprite(T)){q&&zt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ct);const dt=j.update(T),St=T.material;St.visible&&g.push(T,dt,St,Y,zt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||$.intersectsObject(T))){const dt=j.update(T),St=T.material;if(q&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),zt.copy(T.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),zt.copy(dt.boundingSphere.center)),zt.applyMatrix4(T.matrixWorld).applyMatrix4(Ct)),Array.isArray(St)){const Pt=dt.groups;for(let Jt=0,te=Pt.length;Jt<te;Jt++){const Nt=Pt[Jt],ee=St[Nt.materialIndex];ee&&ee.visible&&g.push(T,dt,ee,Y,zt.z,Nt)}}else St.visible&&g.push(T,dt,St,Y,zt.z,null)}}const ht=T.children;for(let dt=0,St=ht.length;dt<St;dt++)qt(ht[dt],B,Y,q)}function Le(T,B,Y,q){const z=T.opaque,ht=T.transmissive,dt=T.transparent;m.setupLightsView(Y),rt===!0&&at.setGlobalState(v.clippingPlanes,Y),q&&lt.viewport(P.copy(q)),z.length>0&&Re(z,B,Y),ht.length>0&&Re(ht,B,Y),dt.length>0&&Re(dt,B,Y),lt.buffers.depth.setTest(!0),lt.buffers.depth.setMask(!0),lt.buffers.color.setMask(!0),lt.setPolygonOffset(!1)}function ne(T,B,Y,q){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[q.id]===void 0&&(m.state.transmissionRenderTarget[q.id]=new ss(1,1,{generateMipmaps:!0,type:ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float")?fa:Ji,minFilter:qr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:de.workingColorSpace}));const ht=m.state.transmissionRenderTarget[q.id],dt=q.viewport||P;ht.setSize(dt.z,dt.w);const St=v.getRenderTarget();v.setRenderTarget(ht),v.getClearColor(k),X=v.getClearAlpha(),X<1&&v.setClearColor(16777215,.5),v.clear(),tt&&Gt.render(Y);const Pt=v.toneMapping;v.toneMapping=vr;const Jt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),m.setupLightsView(q),rt===!0&&at.setGlobalState(v.clippingPlanes,q),Re(T,Y,q),A.updateMultisampleRenderTarget(ht),A.updateRenderTargetMipmap(ht),ot.has("WEBGL_multisampled_render_to_texture")===!1){let te=!1;for(let Nt=0,ee=B.length;Nt<ee;Nt++){const pe=B[Nt],ge=pe.object,Fe=pe.geometry,_e=pe.material,Ht=pe.group;if(_e.side===qe&&ge.layers.test(q.layers)){const Di=_e.side;_e.side=Nn,_e.needsUpdate=!0,Ze(ge,Y,q,Fe,_e,Ht),_e.side=Di,_e.needsUpdate=!0,te=!0}}te===!0&&(A.updateMultisampleRenderTarget(ht),A.updateRenderTargetMipmap(ht))}v.setRenderTarget(St),v.setClearColor(k,X),Jt!==void 0&&(q.viewport=Jt),v.toneMapping=Pt}function Re(T,B,Y){const q=B.isScene===!0?B.overrideMaterial:null;for(let z=0,ht=T.length;z<ht;z++){const dt=T[z],St=dt.object,Pt=dt.geometry,Jt=q===null?dt.material:q,te=dt.group;St.layers.test(Y.layers)&&Ze(St,B,Y,Pt,Jt,te)}}function Ze(T,B,Y,q,z,ht){T.onBeforeRender(v,B,Y,q,z,ht),T.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),z.onBeforeRender(v,B,Y,q,T,ht),z.transparent===!0&&z.side===qe&&z.forceSinglePass===!1?(z.side=Nn,z.needsUpdate=!0,v.renderBufferDirect(Y,B,q,z,T,ht),z.side=Er,z.needsUpdate=!0,v.renderBufferDirect(Y,B,q,z,T,ht),z.side=qe):v.renderBufferDirect(Y,B,q,z,T,ht),T.onAfterRender(v,B,Y,q,z,ht)}function Ee(T,B,Y){B.isScene!==!0&&(B=Wt);const q=Mt.get(T),z=m.state.lights,ht=m.state.shadowsArray,dt=z.state.version,St=pt.getParameters(T,z.state,ht,B,Y),Pt=pt.getProgramCacheKey(St);let Jt=q.programs;q.environment=T.isMeshStandardMaterial?B.environment:null,q.fog=B.fog,q.envMap=(T.isMeshStandardMaterial?V:E).get(T.envMap||q.environment),q.envMapRotation=q.environment!==null&&T.envMap===null?B.environmentRotation:T.envMapRotation,Jt===void 0&&(T.addEventListener("dispose",Xt),Jt=new Map,q.programs=Jt);let te=Jt.get(Pt);if(te!==void 0){if(q.currentProgram===te&&q.lightsStateVersion===dt)return me(T,St),te}else St.uniforms=pt.getUniforms(T),T.onBeforeCompile(St,v),te=pt.acquireProgram(St,Pt),Jt.set(Pt,te),q.uniforms=St.uniforms;const Nt=q.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Nt.clippingPlanes=at.uniform),me(T,St),q.needsLights=Mn(T),q.lightsStateVersion=dt,q.needsLights&&(Nt.ambientLightColor.value=z.state.ambient,Nt.lightProbe.value=z.state.probe,Nt.directionalLights.value=z.state.directional,Nt.directionalLightShadows.value=z.state.directionalShadow,Nt.spotLights.value=z.state.spot,Nt.spotLightShadows.value=z.state.spotShadow,Nt.rectAreaLights.value=z.state.rectArea,Nt.ltc_1.value=z.state.rectAreaLTC1,Nt.ltc_2.value=z.state.rectAreaLTC2,Nt.pointLights.value=z.state.point,Nt.pointLightShadows.value=z.state.pointShadow,Nt.hemisphereLights.value=z.state.hemi,Nt.directionalShadowMap.value=z.state.directionalShadowMap,Nt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Nt.spotShadowMap.value=z.state.spotShadowMap,Nt.spotLightMatrix.value=z.state.spotLightMatrix,Nt.spotLightMap.value=z.state.spotLightMap,Nt.pointShadowMap.value=z.state.pointShadowMap,Nt.pointShadowMatrix.value=z.state.pointShadowMatrix),q.currentProgram=te,q.uniformsList=null,te}function Te(T){if(T.uniformsList===null){const B=T.currentProgram.getUniforms();T.uniformsList=dl.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function me(T,B){const Y=Mt.get(T);Y.outputColorSpace=B.outputColorSpace,Y.batching=B.batching,Y.batchingColor=B.batchingColor,Y.instancing=B.instancing,Y.instancingColor=B.instancingColor,Y.instancingMorph=B.instancingMorph,Y.skinning=B.skinning,Y.morphTargets=B.morphTargets,Y.morphNormals=B.morphNormals,Y.morphColors=B.morphColors,Y.morphTargetsCount=B.morphTargetsCount,Y.numClippingPlanes=B.numClippingPlanes,Y.numIntersection=B.numClipIntersection,Y.vertexAlphas=B.vertexAlphas,Y.vertexTangents=B.vertexTangents,Y.toneMapping=B.toneMapping}function Fn(T,B,Y,q,z){B.isScene!==!0&&(B=Wt),A.resetTextureUnits();const ht=B.fog,dt=q.isMeshStandardMaterial?B.environment:null,St=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:oo,Pt=(q.isMeshStandardMaterial?V:E).get(q.envMap||dt),Jt=q.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,te=!!Y.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Nt=!!Y.morphAttributes.position,ee=!!Y.morphAttributes.normal,pe=!!Y.morphAttributes.color;let ge=vr;q.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ge=v.toneMapping);const Fe=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,_e=Fe!==void 0?Fe.length:0,Ht=Mt.get(q),Di=m.state.lights;if(rt===!0&&(vt===!0||T!==M)){const ei=T===M&&q.id===S;at.setState(q,T,ei)}let ve=!1;q.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==Di.state.version||Ht.outputColorSpace!==St||z.isBatchedMesh&&Ht.batching===!1||!z.isBatchedMesh&&Ht.batching===!0||z.isBatchedMesh&&Ht.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Ht.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Ht.instancing===!1||!z.isInstancedMesh&&Ht.instancing===!0||z.isSkinnedMesh&&Ht.skinning===!1||!z.isSkinnedMesh&&Ht.skinning===!0||z.isInstancedMesh&&Ht.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ht.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ht.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ht.instancingMorph===!1&&z.morphTexture!==null||Ht.envMap!==Pt||q.fog===!0&&Ht.fog!==ht||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==at.numPlanes||Ht.numIntersection!==at.numIntersection)||Ht.vertexAlphas!==Jt||Ht.vertexTangents!==te||Ht.morphTargets!==Nt||Ht.morphNormals!==ee||Ht.morphColors!==pe||Ht.toneMapping!==ge||Ht.morphTargetsCount!==_e)&&(ve=!0):(ve=!0,Ht.__version=q.version);let fi=Ht.currentProgram;ve===!0&&(fi=Ee(q,B,z));let hs=!1,Bn=!1,fo=!1;const Ie=fi.getUniforms(),xi=Ht.uniforms;if(lt.useProgram(fi.program)&&(hs=!0,Bn=!0,fo=!0),q.id!==S&&(S=q.id,Bn=!0),hs||M!==T){lt.buffers.depth.getReversed()?(st.copy(T.projectionMatrix),D_(st),I_(st),Ie.setValue(L,"projectionMatrix",st)):Ie.setValue(L,"projectionMatrix",T.projectionMatrix),Ie.setValue(L,"viewMatrix",T.matrixWorldInverse);const Ki=Ie.map.cameraPosition;Ki!==void 0&&Ki.setValue(L,Ut.setFromMatrixPosition(T.matrixWorld)),O.logarithmicDepthBuffer&&Ie.setValue(L,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Ie.setValue(L,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Bn=!0,fo=!0)}if(z.isSkinnedMesh){Ie.setOptional(L,z,"bindMatrix"),Ie.setOptional(L,z,"bindMatrixInverse");const ei=z.skeleton;ei&&(ei.boneTexture===null&&ei.computeBoneTexture(),Ie.setValue(L,"boneTexture",ei.boneTexture,A))}z.isBatchedMesh&&(Ie.setOptional(L,z,"batchingTexture"),Ie.setValue(L,"batchingTexture",z._matricesTexture,A),Ie.setOptional(L,z,"batchingIdTexture"),Ie.setValue(L,"batchingIdTexture",z._indirectTexture,A),Ie.setOptional(L,z,"batchingColorTexture"),z._colorsTexture!==null&&Ie.setValue(L,"batchingColorTexture",z._colorsTexture,A));const po=Y.morphAttributes;if((po.position!==void 0||po.normal!==void 0||po.color!==void 0)&&kt.update(z,Y,fi),(Bn||Ht.receiveShadow!==z.receiveShadow)&&(Ht.receiveShadow=z.receiveShadow,Ie.setValue(L,"receiveShadow",z.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(xi.envMap.value=Pt,xi.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&B.environment!==null&&(xi.envMapIntensity.value=B.environmentIntensity),Bn&&(Ie.setValue(L,"toneMappingExposure",v.toneMappingExposure),Ht.needsLights&&De(xi,fo),ht&&q.fog===!0&&ut.refreshFogUniforms(xi,ht),ut.refreshMaterialUniforms(xi,q,G,W,m.state.transmissionRenderTarget[T.id]),dl.upload(L,Te(Ht),xi,A)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(dl.upload(L,Te(Ht),xi,A),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Ie.setValue(L,"center",z.center),Ie.setValue(L,"modelViewMatrix",z.modelViewMatrix),Ie.setValue(L,"normalMatrix",z.normalMatrix),Ie.setValue(L,"modelMatrix",z.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const ei=q.uniformsGroups;for(let Ki=0,ji=ei.length;Ki<ji;Ki++){const Fu=ei[Ki];U.update(Fu,fi),U.bind(Fu,fi)}}return fi}function De(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function Mn(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,B,Y){Mt.get(T.texture).__webglTexture=B,Mt.get(T.depthTexture).__webglTexture=Y;const q=Mt.get(T);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=Y===void 0,q.__autoAllocateDepthBuffer||ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,B){const Y=Mt.get(T);Y.__webglFramebuffer=B,Y.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(T,B=0,Y=0){R=T,b=B,w=Y;let q=!0,z=null,ht=!1,dt=!1;if(T){const Pt=Mt.get(T);if(Pt.__useDefaultFramebuffer!==void 0)lt.bindFramebuffer(L.FRAMEBUFFER,null),q=!1;else if(Pt.__webglFramebuffer===void 0)A.setupRenderTarget(T);else if(Pt.__hasExternalTextures)A.rebindTextures(T,Mt.get(T.texture).__webglTexture,Mt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Nt=T.depthTexture;if(Pt.__boundDepthTexture!==Nt){if(Nt!==null&&Mt.has(Nt)&&(T.width!==Nt.image.width||T.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(T)}}const Jt=T.texture;(Jt.isData3DTexture||Jt.isDataArrayTexture||Jt.isCompressedArrayTexture)&&(dt=!0);const te=Mt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(te[B])?z=te[B][Y]:z=te[B],ht=!0):T.samples>0&&A.useMultisampledRTT(T)===!1?z=Mt.get(T).__webglMultisampledFramebuffer:Array.isArray(te)?z=te[Y]:z=te,P.copy(T.viewport),I.copy(T.scissor),F=T.scissorTest}else P.copy(ct).multiplyScalar(G).floor(),I.copy(Lt).multiplyScalar(G).floor(),F=$t;if(lt.bindFramebuffer(L.FRAMEBUFFER,z)&&q&&lt.drawBuffers(T,z),lt.viewport(P),lt.scissor(I),lt.setScissorTest(F),ht){const Pt=Mt.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+B,Pt.__webglTexture,Y)}else if(dt){const Pt=Mt.get(T.texture),Jt=B||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Pt.__webglTexture,Y||0,Jt)}S=-1},this.readRenderTargetPixels=function(T,B,Y,q,z,ht,dt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=Mt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&dt!==void 0&&(St=St[dt]),St){lt.bindFramebuffer(L.FRAMEBUFFER,St);try{const Pt=T.texture,Jt=Pt.format,te=Pt.type;if(!O.textureFormatReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!O.textureTypeReadable(te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-q&&Y>=0&&Y<=T.height-z&&L.readPixels(B,Y,q,z,Vt.convert(Jt),Vt.convert(te),ht)}finally{const Pt=R!==null?Mt.get(R).__webglFramebuffer:null;lt.bindFramebuffer(L.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(T,B,Y,q,z,ht,dt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=Mt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&dt!==void 0&&(St=St[dt]),St){const Pt=T.texture,Jt=Pt.format,te=Pt.type;if(!O.textureFormatReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!O.textureTypeReadable(te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=T.width-q&&Y>=0&&Y<=T.height-z){lt.bindFramebuffer(L.FRAMEBUFFER,St);const Nt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Nt),L.bufferData(L.PIXEL_PACK_BUFFER,ht.byteLength,L.STREAM_READ),L.readPixels(B,Y,q,z,Vt.convert(Jt),Vt.convert(te),0);const ee=R!==null?Mt.get(R).__webglFramebuffer:null;lt.bindFramebuffer(L.FRAMEBUFFER,ee);const pe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await L_(L,pe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Nt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ht),L.deleteBuffer(Nt),L.deleteSync(pe),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,B=null,Y=0){T.isTexture!==!0&&(Uo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,T=arguments[1]);const q=Math.pow(2,-Y),z=Math.floor(T.image.width*q),ht=Math.floor(T.image.height*q),dt=B!==null?B.x:0,St=B!==null?B.y:0;A.setTexture2D(T,0),L.copyTexSubImage2D(L.TEXTURE_2D,Y,0,0,dt,St,z,ht),lt.unbindTexture()},this.copyTextureToTexture=function(T,B,Y=null,q=null,z=0){T.isTexture!==!0&&(Uo("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,T=arguments[1],B=arguments[2],z=arguments[3]||0,Y=null);let ht,dt,St,Pt,Jt,te,Nt,ee,pe;const ge=T.isCompressedTexture?T.mipmaps[z]:T.image;Y!==null?(ht=Y.max.x-Y.min.x,dt=Y.max.y-Y.min.y,St=Y.isBox3?Y.max.z-Y.min.z:1,Pt=Y.min.x,Jt=Y.min.y,te=Y.isBox3?Y.min.z:0):(ht=ge.width,dt=ge.height,St=ge.depth||1,Pt=0,Jt=0,te=0),q!==null?(Nt=q.x,ee=q.y,pe=q.z):(Nt=0,ee=0,pe=0);const Fe=Vt.convert(B.format),_e=Vt.convert(B.type);let Ht;B.isData3DTexture?(A.setTexture3D(B,0),Ht=L.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(A.setTexture2DArray(B,0),Ht=L.TEXTURE_2D_ARRAY):(A.setTexture2D(B,0),Ht=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,B.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,B.unpackAlignment);const Di=L.getParameter(L.UNPACK_ROW_LENGTH),ve=L.getParameter(L.UNPACK_IMAGE_HEIGHT),fi=L.getParameter(L.UNPACK_SKIP_PIXELS),hs=L.getParameter(L.UNPACK_SKIP_ROWS),Bn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ge.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ge.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Pt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Jt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,te);const fo=T.isDataArrayTexture||T.isData3DTexture,Ie=B.isDataArrayTexture||B.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const xi=Mt.get(T),po=Mt.get(B),ei=Mt.get(xi.__renderTarget),Ki=Mt.get(po.__renderTarget);lt.bindFramebuffer(L.READ_FRAMEBUFFER,ei.__webglFramebuffer),lt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ki.__webglFramebuffer);for(let ji=0;ji<St;ji++)fo&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Mt.get(T).__webglTexture,z,te+ji),T.isDepthTexture?(Ie&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Mt.get(B).__webglTexture,z,pe+ji),L.blitFramebuffer(Pt,Jt,ht,dt,Nt,ee,ht,dt,L.DEPTH_BUFFER_BIT,L.NEAREST)):Ie?L.copyTexSubImage3D(Ht,z,Nt,ee,pe+ji,Pt,Jt,ht,dt):L.copyTexSubImage2D(Ht,z,Nt,ee,pe+ji,Pt,Jt,ht,dt);lt.bindFramebuffer(L.READ_FRAMEBUFFER,null),lt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Ie?T.isDataTexture||T.isData3DTexture?L.texSubImage3D(Ht,z,Nt,ee,pe,ht,dt,St,Fe,_e,ge.data):B.isCompressedArrayTexture?L.compressedTexSubImage3D(Ht,z,Nt,ee,pe,ht,dt,St,Fe,ge.data):L.texSubImage3D(Ht,z,Nt,ee,pe,ht,dt,St,Fe,_e,ge):T.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,z,Nt,ee,ht,dt,Fe,_e,ge.data):T.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,z,Nt,ee,ge.width,ge.height,Fe,ge.data):L.texSubImage2D(L.TEXTURE_2D,z,Nt,ee,ht,dt,Fe,_e,ge);L.pixelStorei(L.UNPACK_ROW_LENGTH,Di),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ve),L.pixelStorei(L.UNPACK_SKIP_PIXELS,fi),L.pixelStorei(L.UNPACK_SKIP_ROWS,hs),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Bn),z===0&&B.generateMipmaps&&L.generateMipmap(Ht),lt.unbindTexture()},this.copyTextureToTexture3D=function(T,B,Y=null,q=null,z=0){return T.isTexture!==!0&&(Uo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,q=arguments[1]||null,T=arguments[2],B=arguments[3],z=arguments[4]||0),Uo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,B,Y,q,z)},this.initRenderTarget=function(T){Mt.get(T).__webglFramebuffer===void 0&&A.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?A.setTextureCube(T,0):T.isData3DTexture?A.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?A.setTexture2DArray(T,0):A.setTexture2D(T,0),lt.unbindTexture()},this.resetState=function(){b=0,w=0,R=null,lt.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}}class Lu{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ue(t),this.density=e}clone(){return new Lu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class VS extends Qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ui,this.environmentIntensity=1,this.environmentRotation=new ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class WS extends vn{constructor(t=null,e=1,n=1,i,s,o,a,l,c=jn,h=jn,u,f){super(null,o,a,l,c,h,i,s,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yd extends hi{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Rs=new Kt,Sd=new Kt,qa=[],wd=new cs,XS=new Kt,wo=new J,Eo=new co;class YS extends J{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new yd(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,XS)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new cs),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Rs),wd.copy(t.boundingBox).applyMatrix4(Rs),this.boundingBox.union(wd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new co),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Rs),Eo.copy(t.boundingSphere).applyMatrix4(Rs),this.boundingSphere.union(Eo)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(wo.geometry=this.geometry,wo.material=this.material,wo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Eo.copy(this.boundingSphere),Eo.applyMatrix4(n),t.ray.intersectsSphere(Eo)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Rs),Sd.multiplyMatrices(n,Rs),wo.matrixWorld=Sd,wo.raycast(t,qa);for(let o=0,a=qa.length;o<a;o++){const l=qa[o];l.instanceId=s,l.object=this,e.push(l)}qa.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new yd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new WS(new Float32Array(i*this.count),i,this.count,Tu,Ci));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Bm extends ho{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Al=new N,Cl=new N,Ed=new Kt,To=new wm,$a=new co,Rc=new N,Td=new N;class qS extends Qe{constructor(t=new xn,e=new Bm){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)Al.fromBufferAttribute(e,i-1),Cl.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Al.distanceTo(Cl);t.setAttribute("lineDistance",new Ue(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$a.copy(n.boundingSphere),$a.applyMatrix4(i),$a.radius+=s,t.ray.intersectsSphere($a)===!1)return;Ed.copy(i).invert(),To.copy(t.ray).applyMatrix4(Ed);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=d,g=p-1;_<g;_+=c){const m=h.getX(_),y=h.getX(_+1),x=Za(this,t,To,l,m,y);x&&e.push(x)}if(this.isLineLoop){const _=h.getX(p-1),g=h.getX(d),m=Za(this,t,To,l,_,g);m&&e.push(m)}}else{const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let _=d,g=p-1;_<g;_+=c){const m=Za(this,t,To,l,_,_+1);m&&e.push(m)}if(this.isLineLoop){const _=Za(this,t,To,l,p-1,d);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Za(r,t,e,n,i,s){const o=r.geometry.attributes.position;if(Al.fromBufferAttribute(o,i),Cl.fromBufferAttribute(o,s),e.distanceSqToSegment(Al,Cl,Rc,Td)>n)return;Rc.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(Rc);if(!(l<t.near||l>t.far))return{distance:l,point:Td.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}class $S extends qS{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Bi extends vn{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Li{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const h=n[i],f=n[i+1]-h,d=(o-h)/f;return(i+d)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=e||(o.isVector2?new Et:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new N,i=[],s=[],o=[],a=new N,l=new Kt;for(let d=0;d<=t;d++){const p=d/t;i[d]=this.getTangentAt(p,new N)}s[0]=new N,o[0]=new N;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(pn(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,p))}o[d].crossVectors(i[d],s[d])}if(e===!0){let d=Math.acos(pn(s[0].dot(s[t]),-1,1));d/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let p=1;p<=t;p++)s[p].applyMatrix4(l.makeRotationAxis(i[p],d*p)),o[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Fl extends Li{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Et){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class ZS extends Fl{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Du(){let r=0,t=0,e=0,n=0;function i(s,o,a,l){r=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let f=(o-s)/c-(a-s)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,d*=h,i(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const Ja=new N,Pc=new Du,Lc=new Du,Dc=new Du;class JS extends Li{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new N){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:(Ja.subVectors(i[0],i[1]).add(i[0]),c=Ja);const u=i[a%s],f=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Ja.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Ja),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),Pc.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,p,_,g),Lc.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,p,_,g),Dc.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(Pc.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Lc.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Dc.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Pc.calc(l),Lc.calc(l),Dc.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new N().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function bd(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*r+e}function KS(r,t){const e=1-r;return e*e*t}function jS(r,t){return 2*(1-r)*r*t}function QS(r,t){return r*r*t}function $o(r,t,e,n){return KS(r,t)+jS(r,e)+QS(r,n)}function t1(r,t){const e=1-r;return e*e*e*t}function e1(r,t){const e=1-r;return 3*e*e*r*t}function n1(r,t){return 3*(1-r)*r*r*t}function i1(r,t){return r*r*r*t}function Zo(r,t,e,n,i){return t1(r,t)+e1(r,e)+n1(r,n)+i1(r,i)}class zm extends Li{constructor(t=new Et,e=new Et,n=new Et,i=new Et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Et){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Zo(t,i.x,s.x,o.x,a.x),Zo(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class r1 extends Li{constructor(t=new N,e=new N,n=new N,i=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new N){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Zo(t,i.x,s.x,o.x,a.x),Zo(t,i.y,s.y,o.y,a.y),Zo(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class km extends Li{constructor(t=new Et,e=new Et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Et){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class s1 extends Li{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gm extends Li{constructor(t=new Et,e=new Et,n=new Et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Et){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set($o(t,i.x,s.x,o.x),$o(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class o1 extends Li{constructor(t=new N,e=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new N){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set($o(t,i.x,s.x,o.x),$o(t,i.y,s.y,o.y),$o(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Hm extends Li{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Et){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(bd(a,l.x,c.x,h.x,u.x),bd(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new Et().fromArray(i))}return this}}var Yh=Object.freeze({__proto__:null,ArcCurve:ZS,CatmullRomCurve3:JS,CubicBezierCurve:zm,CubicBezierCurve3:r1,EllipseCurve:Fl,LineCurve:km,LineCurve3:s1,QuadraticBezierCurve:Gm,QuadraticBezierCurve3:o1,SplineCurve:Hm});class a1 extends Li{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Yh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Yh[i.type]().fromJSON(i))}return this}}class Gn extends a1{constructor(t){super(),this.type="Path",this.currentPoint=new Et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new km(this.currentPoint.clone(),new Et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new Gm(this.currentPoint.clone(),new Et(t,e),new Et(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new zm(this.currentPoint.clone(),new Et(t,e),new Et(n,i),new Et(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Hm(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,s,o,a,l),this}absellipse(t,e,n,i,s,o,a,l){const c=new Fl(t,e,n,i,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Jo extends xn{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],o=[],a=[],l=[],c=new N,h=new Et;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*i;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Ue(o,3)),this.setAttribute("normal",new Ue(a,3)),this.setAttribute("uv",new Ue(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jo(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class an extends xn{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],f=[],d=[];let p=0;const _=[],g=n/2;let m=0;y(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new Ue(u,3)),this.setAttribute("normal",new Ue(f,3)),this.setAttribute("uv",new Ue(d,2));function y(){const v=new N,C=new N;let b=0;const w=(e-t)/n;for(let R=0;R<=s;R++){const S=[],M=R/s,P=M*(e-t)+t;for(let I=0;I<=i;I++){const F=I/i,k=F*l+a,X=Math.sin(k),H=Math.cos(k);C.x=P*X,C.y=-M*n+g,C.z=P*H,u.push(C.x,C.y,C.z),v.set(X,w,H).normalize(),f.push(v.x,v.y,v.z),d.push(F,1-M),S.push(p++)}_.push(S)}for(let R=0;R<i;R++)for(let S=0;S<s;S++){const M=_[S][R],P=_[S+1][R],I=_[S+1][R+1],F=_[S][R+1];(t>0||S!==0)&&(h.push(M,P,F),b+=3),(e>0||S!==s-1)&&(h.push(P,I,F),b+=3)}c.addGroup(m,b,0),m+=b}function x(v){const C=p,b=new Et,w=new N;let R=0;const S=v===!0?t:e,M=v===!0?1:-1;for(let I=1;I<=i;I++)u.push(0,g*M,0),f.push(0,M,0),d.push(.5,.5),p++;const P=p;for(let I=0;I<=i;I++){const k=I/i*l+a,X=Math.cos(k),H=Math.sin(k);w.x=S*H,w.y=g*M,w.z=S*X,u.push(w.x,w.y,w.z),f.push(0,M,0),b.x=X*.5+.5,b.y=H*.5*M+.5,d.push(b.x,b.y),p++}for(let I=0;I<i;I++){const F=C+I,k=P+I;v===!0?h.push(k,k+1,F):h.push(k+1,k,F),R+=3}c.addGroup(m,R,v===!0?1:2),m+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new an(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Iu extends an{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Iu(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Gi extends Gn{constructor(t){super(t),this.uuid=lo(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Gn().fromJSON(i))}return this}}const l1={triangulate:function(r,t,e=2){const n=t&&t.length,i=n?t[0]*e:r.length;let s=Vm(r,0,i,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,h,u,f,d;if(n&&(s=d1(r,t,s,e)),r.length>80*e){a=c=r[0],l=h=r[1];for(let p=e;p<i;p+=e)u=r[p],f=r[p+1],u<a&&(a=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);d=Math.max(c-a,h-l),d=d!==0?32767/d:0}return la(s,o,e,a,l,d,0),o}};function Vm(r,t,e,n,i){let s,o;if(i===E1(r,t,e,n)>0)for(s=t;s<e;s+=n)o=Ad(s,r[s],r[s+1],o);else for(s=e-n;s>=t;s-=n)o=Ad(s,r[s],r[s+1],o);return o&&Bl(o,o.next)&&(ha(o),o=o.next),o}function as(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(Bl(e,e.next)||Ge(e.prev,e,e.next)===0)){if(ha(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function la(r,t,e,n,i,s,o){if(!r)return;!o&&s&&v1(r,n,i,s);let a=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?h1(r,n,i,s):c1(r)){t.push(l.i/e|0),t.push(r.i/e|0),t.push(c.i/e|0),ha(r),r=c.next,a=c.next;continue}if(r=c,r===a){o?o===1?(r=u1(as(r),t,e),la(r,t,e,n,i,s,2)):o===2&&f1(r,t,e,n,i,s):la(as(r),t,e,n,i,s,1);break}}}function c1(r){const t=r.prev,e=r,n=r.next;if(Ge(t,e,n)>=0)return!1;const i=t.x,s=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=i<s?i<o?i:o:s<o?s:o,u=a<l?a<c?a:c:l<c?l:c,f=i>s?i>o?i:o:s>o?s:o,d=a>l?a>c?a:c:l>c?l:c;let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=f&&p.y>=u&&p.y<=d&&Fs(i,a,s,l,o,c,p.x,p.y)&&Ge(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function h1(r,t,e,n){const i=r.prev,s=r,o=r.next;if(Ge(i,s,o)>=0)return!1;const a=i.x,l=s.x,c=o.x,h=i.y,u=s.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,p=h<u?h<f?h:f:u<f?u:f,_=a>l?a>c?a:c:l>c?l:c,g=h>u?h>f?h:f:u>f?u:f,m=qh(d,p,t,e,n),y=qh(_,g,t,e,n);let x=r.prevZ,v=r.nextZ;for(;x&&x.z>=m&&v&&v.z<=y;){if(x.x>=d&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&Fs(a,h,l,u,c,f,x.x,x.y)&&Ge(x.prev,x,x.next)>=0||(x=x.prevZ,v.x>=d&&v.x<=_&&v.y>=p&&v.y<=g&&v!==i&&v!==o&&Fs(a,h,l,u,c,f,v.x,v.y)&&Ge(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;x&&x.z>=m;){if(x.x>=d&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&Fs(a,h,l,u,c,f,x.x,x.y)&&Ge(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;v&&v.z<=y;){if(v.x>=d&&v.x<=_&&v.y>=p&&v.y<=g&&v!==i&&v!==o&&Fs(a,h,l,u,c,f,v.x,v.y)&&Ge(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function u1(r,t,e){let n=r;do{const i=n.prev,s=n.next.next;!Bl(i,s)&&Wm(i,n,n.next,s)&&ca(i,s)&&ca(s,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(s.i/e|0),ha(n),ha(n.next),n=r=s),n=n.next}while(n!==r);return as(n)}function f1(r,t,e,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&y1(o,a)){let l=Xm(o,a);o=as(o,o.next),l=as(l,l.next),la(o,t,e,n,i,s,0),la(l,t,e,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function d1(r,t,e,n){const i=[];let s,o,a,l,c;for(s=0,o=t.length;s<o;s++)a=t[s]*n,l=s<o-1?t[s+1]*n:r.length,c=Vm(r,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(M1(c));for(i.sort(p1),s=0;s<i.length;s++)e=m1(i[s],e);return e}function p1(r,t){return r.x-t.x}function m1(r,t){const e=g1(r,t);if(!e)return t;const n=Xm(e,r);return as(n,n.next),as(e,e.next)}function g1(r,t){let e=t,n=-1/0,i;const s=r.x,o=r.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=s&&f>n&&(n=f,i=e.x<e.next.x?e:e.next,f===s))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;e=i;do s>=e.x&&e.x>=l&&s!==e.x&&Fs(o<c?s:n,o,l,c,o<c?n:s,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(s-e.x),ca(e,r)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&_1(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function _1(r,t){return Ge(r.prev,r,t.prev)<0&&Ge(t.next,r,r.next)<0}function v1(r,t,e,n){let i=r;do i.z===0&&(i.z=qh(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,x1(i)}function x1(r){let t,e,n,i,s,o,a,l,c=1;do{for(e=r,r=null,s=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;e=n}s.nextZ=null,c*=2}while(o>1);return r}function qh(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function M1(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function Fs(r,t,e,n,i,s,o,a){return(i-o)*(t-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(i-o)*(n-a)}function y1(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!S1(r,t)&&(ca(r,t)&&ca(t,r)&&w1(r,t)&&(Ge(r.prev,r,t.prev)||Ge(r,t.prev,t))||Bl(r,t)&&Ge(r.prev,r,r.next)>0&&Ge(t.prev,t,t.next)>0)}function Ge(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function Bl(r,t){return r.x===t.x&&r.y===t.y}function Wm(r,t,e,n){const i=ja(Ge(r,t,e)),s=ja(Ge(r,t,n)),o=ja(Ge(e,n,r)),a=ja(Ge(e,n,t));return!!(i!==s&&o!==a||i===0&&Ka(r,e,t)||s===0&&Ka(r,n,t)||o===0&&Ka(e,r,n)||a===0&&Ka(e,t,n))}function Ka(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function ja(r){return r>0?1:r<0?-1:0}function S1(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&Wm(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function ca(r,t){return Ge(r.prev,r,r.next)<0?Ge(r,t,r.next)>=0&&Ge(r,r.prev,t)>=0:Ge(r,t,r.prev)<0||Ge(r,r.next,t)<0}function w1(r,t){let e=r,n=!1;const i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function Xm(r,t){const e=new $h(r.i,r.x,r.y),n=new $h(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Ad(r,t,e,n){const i=new $h(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ha(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function $h(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function E1(r,t,e,n){let i=0;for(let s=t,o=e-n;s<e;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class xr{static area(t){const e=t.length;let n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return xr.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[];Cd(t),Rd(n,t);let o=t.length;e.forEach(Cd);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,Rd(n,e[l]);const a=l1.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Cd(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function Rd(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class Wr extends xn{constructor(t=new Gi([new Et(.5,.5),new Et(-.5,.5),new Et(-.5,-.5),new Et(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],s=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new Ue(i,3)),this.setAttribute("uv",new Ue(s,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:T1;let x,v=!1,C,b,w,R;m&&(x=m.getSpacedPoints(h),v=!0,f=!1,C=m.computeFrenetFrames(h,!1),b=new N,w=new N,R=new N),f||(g=0,d=0,p=0,_=0);const S=a.extractPoints(c);let M=S.shape;const P=S.holes;if(!xr.isClockWise(M)){M=M.reverse();for(let tt=0,et=P.length;tt<et;tt++){const L=P[tt];xr.isClockWise(L)&&(P[tt]=L.reverse())}}const F=xr.triangulateShape(M,P),k=M;for(let tt=0,et=P.length;tt<et;tt++){const L=P[tt];M=M.concat(L)}function X(tt,et,L){return et||console.error("THREE.ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(et,L)}const H=M.length,W=F.length;function G(tt,et,L){let bt,ot,O;const lt=tt.x-et.x,Ft=tt.y-et.y,Mt=L.x-tt.x,A=L.y-tt.y,E=lt*lt+Ft*Ft,V=lt*A-Ft*Mt;if(Math.abs(V)>Number.EPSILON){const K=Math.sqrt(E),Q=Math.sqrt(Mt*Mt+A*A),j=et.x-Ft/K,pt=et.y+lt/K,ut=L.x-A/Q,_t=L.y+Mt/Q,Yt=((ut-j)*A-(_t-pt)*Mt)/(lt*A-Ft*Mt);bt=j+lt*Yt-tt.x,ot=pt+Ft*Yt-tt.y;const at=bt*bt+ot*ot;if(at<=2)return new Et(bt,ot);O=Math.sqrt(at/2)}else{let K=!1;lt>Number.EPSILON?Mt>Number.EPSILON&&(K=!0):lt<-Number.EPSILON?Mt<-Number.EPSILON&&(K=!0):Math.sign(Ft)===Math.sign(A)&&(K=!0),K?(bt=-Ft,ot=lt,O=Math.sqrt(E)):(bt=lt,ot=Ft,O=Math.sqrt(E/2))}return new Et(bt/O,ot/O)}const it=[];for(let tt=0,et=k.length,L=et-1,bt=tt+1;tt<et;tt++,L++,bt++)L===et&&(L=0),bt===et&&(bt=0),it[tt]=G(k[tt],k[L],k[bt]);const D=[];let ct,Lt=it.concat();for(let tt=0,et=P.length;tt<et;tt++){const L=P[tt];ct=[];for(let bt=0,ot=L.length,O=ot-1,lt=bt+1;bt<ot;bt++,O++,lt++)O===ot&&(O=0),lt===ot&&(lt=0),ct[bt]=G(L[bt],L[O],L[lt]);D.push(ct),Lt=Lt.concat(ct)}for(let tt=0;tt<g;tt++){const et=tt/g,L=d*Math.cos(et*Math.PI/2),bt=p*Math.sin(et*Math.PI/2)+_;for(let ot=0,O=k.length;ot<O;ot++){const lt=X(k[ot],it[ot],bt);st(lt.x,lt.y,-L)}for(let ot=0,O=P.length;ot<O;ot++){const lt=P[ot];ct=D[ot];for(let Ft=0,Mt=lt.length;Ft<Mt;Ft++){const A=X(lt[Ft],ct[Ft],bt);st(A.x,A.y,-L)}}}const $t=p+_;for(let tt=0;tt<H;tt++){const et=f?X(M[tt],Lt[tt],$t):M[tt];v?(w.copy(C.normals[0]).multiplyScalar(et.x),b.copy(C.binormals[0]).multiplyScalar(et.y),R.copy(x[0]).add(w).add(b),st(R.x,R.y,R.z)):st(et.x,et.y,0)}for(let tt=1;tt<=h;tt++)for(let et=0;et<H;et++){const L=f?X(M[et],Lt[et],$t):M[et];v?(w.copy(C.normals[tt]).multiplyScalar(L.x),b.copy(C.binormals[tt]).multiplyScalar(L.y),R.copy(x[tt]).add(w).add(b),st(R.x,R.y,R.z)):st(L.x,L.y,u/h*tt)}for(let tt=g-1;tt>=0;tt--){const et=tt/g,L=d*Math.cos(et*Math.PI/2),bt=p*Math.sin(et*Math.PI/2)+_;for(let ot=0,O=k.length;ot<O;ot++){const lt=X(k[ot],it[ot],bt);st(lt.x,lt.y,u+L)}for(let ot=0,O=P.length;ot<O;ot++){const lt=P[ot];ct=D[ot];for(let Ft=0,Mt=lt.length;Ft<Mt;Ft++){const A=X(lt[Ft],ct[Ft],bt);v?st(A.x,A.y+x[h-1].y,x[h-1].x+L):st(A.x,A.y,u+L)}}}$(),rt();function $(){const tt=i.length/3;if(f){let et=0,L=H*et;for(let bt=0;bt<W;bt++){const ot=F[bt];Ct(ot[2]+L,ot[1]+L,ot[0]+L)}et=h+g*2,L=H*et;for(let bt=0;bt<W;bt++){const ot=F[bt];Ct(ot[0]+L,ot[1]+L,ot[2]+L)}}else{for(let et=0;et<W;et++){const L=F[et];Ct(L[2],L[1],L[0])}for(let et=0;et<W;et++){const L=F[et];Ct(L[0]+H*h,L[1]+H*h,L[2]+H*h)}}n.addGroup(tt,i.length/3-tt,0)}function rt(){const tt=i.length/3;let et=0;vt(k,et),et+=k.length;for(let L=0,bt=P.length;L<bt;L++){const ot=P[L];vt(ot,et),et+=ot.length}n.addGroup(tt,i.length/3-tt,1)}function vt(tt,et){let L=tt.length;for(;--L>=0;){const bt=L;let ot=L-1;ot<0&&(ot=tt.length-1);for(let O=0,lt=h+g*2;O<lt;O++){const Ft=H*O,Mt=H*(O+1),A=et+bt+Ft,E=et+ot+Ft,V=et+ot+Mt,K=et+bt+Mt;Ut(A,E,V,K)}}}function st(tt,et,L){l.push(tt),l.push(et),l.push(L)}function Ct(tt,et,L){zt(tt),zt(et),zt(L);const bt=i.length/3,ot=y.generateTopUV(n,i,bt-3,bt-2,bt-1);Wt(ot[0]),Wt(ot[1]),Wt(ot[2])}function Ut(tt,et,L,bt){zt(tt),zt(et),zt(bt),zt(et),zt(L),zt(bt);const ot=i.length/3,O=y.generateSideWallUV(n,i,ot-6,ot-3,ot-2,ot-1);Wt(O[0]),Wt(O[1]),Wt(O[3]),Wt(O[1]),Wt(O[2]),Wt(O[3])}function zt(tt){i.push(l[tt*3+0]),i.push(l[tt*3+1]),i.push(l[tt*3+2])}function Wt(tt){s.push(tt.x),s.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return b1(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,o=t.shapes.length;s<o;s++){const a=e[t.shapes[s]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Yh[i.type]().fromJSON(i)),new Wr(n,t.options)}}const T1={generateTopUV:function(r,t,e,n,i){const s=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new Et(s,o),new Et(a,l),new Et(c,h)]},generateSideWallUV:function(r,t,e,n,i,s){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[i*3],d=t[i*3+1],p=t[i*3+2],_=t[s*3],g=t[s*3+1],m=t[s*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new Et(o,1-l),new Et(c,1-u),new Et(f,1-p),new Et(_,1-m)]:[new Et(a,1-l),new Et(h,1-u),new Et(d,1-p),new Et(g,1-m)]}};function b1(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Rl extends xn{constructor(t=new Gi([new Et(0,.5),new Et(-.5,-.5),new Et(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],s=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ue(i,3)),this.setAttribute("normal",new Ue(s,3)),this.setAttribute("uv",new Ue(o,2));function c(h){const u=i.length/3,f=h.extractPoints(e);let d=f.shape;const p=f.holes;xr.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,m=p.length;g<m;g++){const y=p[g];xr.isClockWise(y)===!0&&(p[g]=y.reverse())}const _=xr.triangulateShape(d,p);for(let g=0,m=p.length;g<m;g++){const y=p[g];d=d.concat(y)}for(let g=0,m=d.length;g<m;g++){const y=d[g];i.push(y.x,y.y,0),s.push(0,0,1),o.push(y.x,y.y)}for(let g=0,m=_.length;g<m;g++){const y=_[g],x=y[0]+u,v=y[1]+u,C=y[2]+u;n.push(x,v,C),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return A1(e,t)}static fromJSON(t,e){const n=[];for(let i=0,s=t.shapes.length;i<s;i++){const o=e[t.shapes[i]];n.push(o)}return new Rl(n,t.curveSegments)}}function A1(r,t){if(t.shapes=[],Array.isArray(r))for(let e=0,n=r.length;e<n;e++){const i=r[e];t.shapes.push(i.uuid)}else t.shapes.push(r.uuid);return t}class Uu extends xn{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new N,f=new N,d=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const y=[],x=m/n;let v=0;m===0&&o===0?v=.5/e:m===n&&l===Math.PI&&(v=-.5/e);for(let C=0;C<=e;C++){const b=C/e;u.x=-t*Math.cos(i+b*s)*Math.sin(o+x*a),u.y=t*Math.cos(o+x*a),u.z=t*Math.sin(i+b*s)*Math.sin(o+x*a),p.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),g.push(b+v,1-x),y.push(c++)}h.push(y)}for(let m=0;m<n;m++)for(let y=0;y<e;y++){const x=h[m][y+1],v=h[m][y],C=h[m+1][y],b=h[m+1][y+1];(m!==0||o>0)&&d.push(x,v,b),(m!==n-1||l<Math.PI)&&d.push(v,C,b)}this.setIndex(d),this.setAttribute("position",new Ue(p,3)),this.setAttribute("normal",new Ue(_,3)),this.setAttribute("uv",new Ue(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Uu(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Nu extends xn{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new N,u=new N,f=new N;for(let d=0;d<=n;d++)for(let p=0;p<=i;p++){const _=p/i*s,g=d/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(_),u.y=(t+e*Math.cos(g))*Math.sin(_),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(p/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let p=1;p<=i;p++){const _=(i+1)*d+p-1,g=(i+1)*(d-1)+p-1,m=(i+1)*(d-1)+p,y=(i+1)*d+p;o.push(_,g,y),o.push(g,m,y)}this.setIndex(o),this.setAttribute("position",new Ue(a,3)),this.setAttribute("normal",new Ue(l,3)),this.setAttribute("uv",new Ue(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nu(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Pe extends ho{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vm,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ou extends Qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ue(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class C1 extends Ou{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ue(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ic=new Kt,Pd=new N,Ld=new N;class Ym{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ru,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new we(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Pd.setFromMatrixPosition(t.matrixWorld),e.position.copy(Pd),Ld.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ld),e.updateMatrixWorld(),Ic.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ic),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ic)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Dd=new Kt,bo=new N,Uc=new N;class R1 extends Ym{constructor(){super(new Yn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Et(4,2),this._viewportCount=6,this._viewports=[new we(2,1,1,1),new we(0,1,1,1),new we(3,1,1,1),new we(1,1,1,1),new we(3,0,1,1),new we(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),bo.setFromMatrixPosition(t.matrixWorld),n.position.copy(bo),Uc.copy(n.position),Uc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Uc),n.updateMatrixWorld(),i.makeTranslation(-bo.x,-bo.y,-bo.z),Dd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dd)}}class Ps extends Ou{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new R1}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class P1 extends Ym{constructor(){super(new Dm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Id extends Ou{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.target=new Qe,this.shadow=new P1}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yu);function Nr(r,t=!1){const e=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},o={},a=r[0].morphTargetsRelative,l=new xn;let c=0;for(let h=0;h<r.length;++h){const u=r[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0;const u=[];for(let f=0;f<r.length;++f){const d=r[f].index;for(let p=0;p<d.count;++p)u.push(d.getX(p)+h);h+=r[f].attributes.position.count}l.setIndex(u)}for(const h in s){const u=Ud(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let _=0;_<o[h].length;++_)d.push(o[h][_][f]);const p=Ud(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}return l}function Ud(r){let t,e,n,i=-1,s=0;for(let c=0;c<r.length;++c){const h=r[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*e}const o=new t(s),a=new hi(o,e,n);let l=0;for(let c=0;c<r.length;++c){const h=r[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let f=0,d=h.count;f<d;f++)for(let p=0;p<e;p++){const _=h.getComponent(f,p);a.setComponent(f+u,p,_)}}else o.set(h.array,l);l+=h.count*e}return i!==void 0&&(a.gpuType=i),a}class L1{constructor(t){this.container=document.getElementById(t),this.container&&(this.scene=new VS,this.scene.background=new ue(658707),this.scene.fog=new Lu(658707,.022),this.width=this.container.clientWidth,this.height=this.container.clientHeight,this.camera=new Yn(36,this.width/this.height,.1,100),this.initialCamPos=new N(1,3.9,17.6),this.initialTarget=new N(3.2,2.6,-.3),this.camera.position.copy(this.initialCamPos),this.camera.lookAt(this.initialTarget),this.renderer=new HS({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setSize(this.width,this.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.toneMapping=am,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Wg,this.container.appendChild(this.renderer.domElement),this.mouse={x:0,y:0,targetX:0,targetY:0},this.isTransitioning=!1,this.isPaused=!1,this.buildingGroup=new Ne,this.buildingGroup.position.set(0,-.4,0),this.buildingGroup.rotation.y=.52,this.scene.add(this.buildingGroup),window.__heroScene=this,this._boundAnimate=this.animate.bind(this),this.initMaterials(),this.initLights(),this.buildGround(),this.buildBuilding(),this.addEventListeners(),this.animate())}createPorcelainTileTexture(t,e){const n=document.createElement("canvas");n.width=1024,n.height=1024;const i=n.getContext("2d");i.fillStyle="#9b8779",i.fillRect(0,0,1024,1024);const s=8,o=1024/s;for(let l=0;l<s;l++)for(let c=0;c<s;c++){const h=c*o,u=l*o,f=(Math.random()-.5)*8,d=Math.min(255,Math.max(0,160+f)),p=Math.min(255,Math.max(0,142+f*.9)),_=Math.min(255,Math.max(0,128+f*.8)),g=i.createLinearGradient(h,u,h+o,u+o);g.addColorStop(0,`rgb(${Math.min(255,d+15)}, ${Math.min(255,p+13)}, ${Math.min(255,_+11)})`),g.addColorStop(.5,`rgb(${d}, ${p}, ${_})`),g.addColorStop(1,`rgb(${Math.max(0,d-12)}, ${Math.max(0,p-12)}, ${Math.max(0,_-10)})`),i.fillStyle=g,i.fillRect(h+1.5,u+1.5,o-3,o-3),i.fillStyle="rgba(255, 245, 235, 0.12)",i.fillRect(h+1.5,u+1.5,o-3,2),i.fillRect(h+1.5,u+1.5,2,o-3),i.fillStyle="rgba(40, 30, 25, 0.22)",i.fillRect(h+1.5,u+o-3.5,o-3,2),i.fillRect(h+o-3.5,u+1.5,2,o-3)}i.strokeStyle="#4e3f36",i.lineWidth=2.5;for(let l=0;l<=s;l++){const c=l*o;i.beginPath(),i.moveTo(c,0),i.lineTo(c,1024),i.stroke(),i.beginPath(),i.moveTo(0,c),i.lineTo(1024,c),i.stroke()}for(let l=0;l<400;l++){i.fillStyle=Math.random()>.5?"rgba(255,255,255,0.025)":"rgba(0,0,0,0.035)";const c=Math.random()*1024,h=Math.random()*1024;i.fillRect(c,h,Math.random()*40+10,Math.random()*40+10)}const a=new Bi(n);return a.wrapS=Si,a.wrapT=Si,a.repeat.set(t,e),a}createSpruceNeedleTexture(t){const e=document.createElement("canvas");e.width=512,e.height=512;const n=e.getContext("2d");n.clearRect(0,0,512,512),n.strokeStyle="#2b1f14",n.lineWidth=14,n.lineCap="round",n.beginPath(),n.moveTo(256,495),n.quadraticCurveTo(256,260,256,35),n.stroke();for(let c=0;c<10;c++){const h=440-c*38,u=100-c*7.5;n.lineWidth=Math.max(3,7-c*.4),n.beginPath(),n.moveTo(256,h),n.quadraticCurveTo(256-u*.5,h-16,256-u,h-28),n.stroke(),n.beginPath(),n.moveTo(256,h),n.quadraticCurveTo(256+u*.5,h-16,256+u,h-28),n.stroke()}const i=t?"#0f221c":"#0d1f14",s=t?"#1c382f":"#17311f",o=t?"#294d40":"#23442a";for(let c=475;c>45;c-=5){const h=(490-c)*.33,u=16;for(let f=0;f<u;f++){const d=f%2===0?-1:1,p=256+d*(Math.random()*h*.72),_=d<0?-Math.PI*(.58+Math.random()*.32):-Math.PI*(.42-Math.random()*.32),g=38+Math.random()*26,m=p+Math.cos(_)*g,y=c+Math.sin(_)*g,x=n.createLinearGradient(p,c,m,y);x.addColorStop(0,i),x.addColorStop(.5,s),x.addColorStop(1,o),n.strokeStyle=x,n.lineWidth=3.2,n.beginPath(),n.moveTo(p,c),n.lineTo(m,y),n.stroke()}}n.globalCompositeOperation="destination-in";const a=n.createRadialGradient(256,260,185,256,260,252);a.addColorStop(0,"rgba(0, 0, 0, 1)"),a.addColorStop(1,"rgba(0, 0, 0, 0)"),n.fillStyle=a,n.fillRect(0,0,512,512),n.globalCompositeOperation="source-over";const l=new Bi(e);return l.anisotropy=4,l}createPineNeedleTexture(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d");e.clearRect(0,0,512,512),[{x:256,y:256,r:210,count:210},{x:175,y:210,r:155,count:120},{x:337,y:210,r:155,count:120},{x:256,y:145,r:145,count:110},{x:195,y:330,r:135,count:95},{x:317,y:330,r:135,count:95}].forEach(o=>{for(let a=0;a<o.count;a++){const l=Math.random()*Math.PI*2,c=o.r*(.65+Math.random()*.35),h=(Math.random()-.5)*.28,u=o.x+Math.cos(l+h)*c,f=o.y+Math.sin(l+h)*c,d=e.createLinearGradient(o.x,o.y,u,f);d.addColorStop(0,"#0d1f14"),d.addColorStop(.55,"#17311f"),d.addColorStop(1,"#23442a"),e.strokeStyle=d,e.lineWidth=3.4,e.beginPath(),e.moveTo(o.x,o.y),e.quadraticCurveTo(o.x+Math.cos(l)*(c*.5)+(Math.random()-.5)*8,o.y+Math.sin(l)*(c*.5)+(Math.random()-.5)*8,u,f),e.stroke()}}),e.globalCompositeOperation="destination-in";const i=e.createRadialGradient(256,256,175,256,256,252);i.addColorStop(0,"rgba(0, 0, 0, 1)"),i.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=i,e.fillRect(0,0,512,512),e.globalCompositeOperation="source-over";const s=new Bi(t);return s.anisotropy=4,s}createBushTexture(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d");e.clearRect(0,0,512,512),[{x:256,y:256,r:210,count:240},{x:180,y:210,r:150,count:140},{x:332,y:210,r:150,count:140},{x:256,y:150,r:140,count:120},{x:190,y:320,r:140,count:120},{x:322,y:320,r:140,count:120}].forEach(o=>{for(let a=0;a<o.count;a++){const l=Math.random()*Math.PI*2,c=Math.pow(Math.random(),.6)*o.r,h=o.x+Math.cos(l)*c,u=o.y+Math.sin(l)*c,f=14+Math.random()*18,d=Math.random()*Math.PI*2;e.save(),e.translate(h,u),e.rotate(d);const p=Math.random();p<.4?e.fillStyle="#0e2015":p<.75?e.fillStyle="#17311f":e.fillStyle="#23442a",e.beginPath(),e.ellipse(0,0,f*.5,f*.85,0,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(50, 95, 60, 0.2)",e.lineWidth=1.2,e.beginPath(),e.moveTo(0,-f*.7),e.lineTo(0,f*.7),e.stroke(),e.restore()}}),e.globalCompositeOperation="destination-in";const i=e.createRadialGradient(256,256,175,256,256,252);i.addColorStop(0,"rgba(0, 0, 0, 1)"),i.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=i,e.fillRect(0,0,512,512),e.globalCompositeOperation="source-over";const s=new Bi(t);return s.anisotropy=4,s}createHorizonBackdropTexture(){const t=document.createElement("canvas");t.width=2048,t.height=512;const e=t.getContext("2d");e.clearRect(0,0,2048,512);const n=140;for(let s=0;s<n;s++){const o=s/n*2048+(Math.random()-.5)*16,a=220+Math.random()*200,l=40+Math.random()*50,c=512-a;e.fillStyle=s%2===0?"#080d11":"#0b1216",e.beginPath(),e.moveTo(o,c),e.lineTo(o+l*.55,512),e.lineTo(o-l*.55,512),e.closePath(),e.fill();for(let h=0;h<4;h++){const u=c+25+h*(a*.18),f=l*.35*(1+h*.2);e.beginPath(),e.arc(o,u,f,0,Math.PI*2),e.fill()}}e.fillStyle="#0a0d13",e.fillRect(0,360,2048,152);const i=new Bi(t);return i.wrapS=Si,i.wrapT=dr,i.repeat.set(3,1),i}createPlazaPavingTexture(){const t=document.createElement("canvas");t.width=1024,t.height=1024;const e=t.getContext("2d");e.fillStyle="#2b2927",e.fillRect(0,0,1024,1024);const n=16,i=1024/n,s=i*2;for(let a=0;a<n;a++){const l=a*i,c=a%2*(s*.5),h=Math.ceil(1024/s)+2;for(let u=-1;u<h;u++){const f=u*s+c,d=(Math.random()-.5)*18,p=Math.min(255,Math.max(0,56+d)),_=Math.min(255,Math.max(0,52+d*.95)),g=Math.min(255,Math.max(0,48+d*.9));e.fillStyle=`rgb(${Math.round(p)}, ${Math.round(_)}, ${Math.round(g)})`,e.fillRect(f+1.5,l+1.5,s-3,i-3),e.fillStyle="rgba(255, 255, 255, 0.06)",e.fillRect(f+1.5,l+1.5,s-3,1.5),e.fillRect(f+1.5,l+1.5,1.5,i-3),e.fillStyle="rgba(0, 0, 0, 0.28)",e.fillRect(f+1.5,l+i-3,s-3,1.5),e.fillRect(f+s-3,l+1.5,1.5,i-3)}}e.strokeStyle="#181615",e.lineWidth=2;for(let a=0;a<=n;a++)e.beginPath(),e.moveTo(0,a*i),e.lineTo(1024,a*i),e.stroke();for(let a=0;a<500;a++)e.fillStyle=Math.random()>.5?"rgba(255, 255, 255, 0.035)":"rgba(0, 0, 0, 0.04)",e.fillRect(Math.random()*1024,Math.random()*1024,Math.random()*16+4,Math.random()*16+4);const o=new Bi(t);return o.wrapS=Si,o.wrapT=Si,o.repeat.set(14,14),o.anisotropy=4,o}createLawnGrassTexture(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d");e.fillStyle="#1c241a",e.fillRect(0,0,512,512);for(let i=0;i<6e3;i++){const s=Math.random()*512,o=Math.random()*512,a=38+Math.random()*38,l=a*.72,c=a*.52;e.fillStyle=`rgba(${Math.round(l)}, ${Math.round(a)}, ${Math.round(c)}, 0.45)`,e.fillRect(s,o,Math.random()*5+1,Math.random()*5+1)}const n=new Bi(t);return n.wrapS=Si,n.wrapT=Si,n.repeat.set(4,4),n.anisotropy=4,n}initMaterials(){this.facadeMat=new Pe({color:11903378,map:this.createPorcelainTileTexture(3.25,1.25),roughness:.32,metalness:.15}),this.leftFacadeMat=new Pe({color:11903378,map:this.createPorcelainTileTexture(2.4,1.25),roughness:.32,metalness:.15}),this.darkRoofMat=new Pe({color:2565154,roughness:.85,metalness:.1}),this.soffitMat=new Pe({color:16103496,roughness:.45,metalness:.1,emissive:14257442,emissiveIntensity:.65}),this.frameMat=new Pe({color:1776672,roughness:.3,metalness:.85}),this.glassMat=new Pe({color:1450028,roughness:.12,metalness:.85,transparent:!0,opacity:.35,side:qe}),this.interiorGlowMat=new Pe({color:16757314,emissive:16747540,emissiveIntensity:3.6,roughness:.3,metalness:.05,side:qe}),this.neonSignMat=new Hr({color:16771584,side:qe}),this.fairyLightMat=new Pe({color:16772244,emissive:16762672,emissiveIntensity:5.5,roughness:.1}),this.chromeMat=new Pe({color:15265010,metalness:.95,roughness:.15}),this.woodMat=new Pe({color:4007709,roughness:.75,metalness:.05}),this.pineBarkMat=new Pe({color:2366744,roughness:.95,metalness:.02}),this.pineOrangeBarkMat=new Pe({color:7222812,roughness:.85,metalness:.04}),this.spruceBarkMat=new Pe({color:1972501,roughness:.95,metalness:.02}),this.spruceCoreMat=new Pe({color:1055252,roughness:.92,metalness:.02}),this.spruceNeedleTex1=this.createSpruceNeedleTexture(!0),this.spruceNeedleTex2=this.createSpruceNeedleTexture(!1),this.pineNeedleTex=this.createPineNeedleTexture(),this.bushTex=this.createBushTexture(),this.blueNeedleCanopyMat=new Pe({map:this.spruceNeedleTex1,color:1320992,transparent:!0,alphaTest:.25,roughness:.85,metalness:.02,emissive:198405,side:qe}),this.greenNeedleCanopyMat=new Pe({map:this.spruceNeedleTex2,color:1320992,transparent:!0,alphaTest:.25,roughness:.85,metalness:.02,emissive:198405,side:qe}),this.pineCanopyMat=new Pe({map:this.pineNeedleTex,color:1320992,transparent:!0,alphaTest:.25,roughness:.85,metalness:.02,emissive:198405,side:qe}),this.bushMat=new Pe({map:this.bushTex,color:1320992,transparent:!0,alphaTest:.22,roughness:.84,metalness:.02,emissive:198405,side:qe}),this.backdropMat=new Hr({map:this.createHorizonBackdropTexture(),transparent:!0,side:qe,depthWrite:!0}),this.pavingMat=new Pe({map:this.createPlazaPavingTexture(),color:8552316,roughness:.74,metalness:.08}),this.lawnMat=new Pe({map:this.createLawnGrassTexture(),color:4739654,roughness:.92,metalness:.02}),this.curbMat=new Pe({color:4538943,roughness:.62,metalness:.1}),this.lanternGlassMat=new Pe({color:16773836,emissive:16755251,emissiveIntensity:4.5,roughness:.15,metalness:.05}),this.benchWoodMat=new Pe({color:2825236,roughness:.74,metalness:.06})}initLights(){const t=new C1(3690092,1448998,.95);this.scene.add(t);const e=new Id(6654898,.85);e.position.set(14,20,15),e.castShadow=!0,e.shadow.mapSize.set(512,512),e.shadow.camera.near=4,e.shadow.camera.far=42,e.shadow.camera.left=-26,e.shadow.camera.right=28,e.shadow.camera.top=22,e.shadow.camera.bottom=-22,e.shadow.bias=-4e-4,this.scene.add(e);const n=new Id(4876944,.75);n.position.set(-15,14,10),n.castShadow=!1,this.scene.add(n),this.porchLight=new Ps(16754738,5.5,11),this.porchLight.position.set(1.9,2.5,-1),this.porchLight.castShadow=!1,this.buildingGroup.add(this.porchLight);const i=new Ps(16751142,5.5,12);i.position.set(4,3.6,-2.2),this.buildingGroup.add(i);const s=new Ps(16749600,4.2,12);s.position.set(1.8,3.1,-5.5),this.buildingGroup.add(s);const o=new Ps(16753708,3.6,8);o.position.set(8.8,1.8,.4),this.buildingGroup.add(o)}buildGround(){const t=new Me(120,120),e=new J(t,this.pavingMat);e.rotation.x=-Math.PI/2,e.position.y=-.41,e.receiveShadow=!0,this.scene.add(e);const n=new wt(12.4,.42,14.4),i=new Pe({color:2236446,roughness:.88,metalness:.08}),s=new J(n,i);s.position.set(9.8,-.21,-7.1),s.receiveShadow=!0,this.buildingGroup.add(s)}buildBuilding(){this.buildCornerPortico(),this.buildRightFacade(),this.buildLeftFacade(),this.buildRoofStructure(),this.buildEnvironment()}buildCornerPortico(){this.porticoGroup=new Ne,this.buildingGroup.add(this.porticoGroup);const t=new wt(3,.15,3),e=new J(t,this.soffitMat);e.position.set(1.85,3.11,-1.85),this.porticoGroup.add(e);const n=new wt(3.5,.42,3.4),i=new Pe({color:2828068,roughness:.72,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),s=new J(n,i);s.position.set(1.8,-.21,-1.7),s.receiveShadow=!0,this.porticoGroup.add(s);const o=new J(new wt(2.9,.14,.35),i);o.position.set(1.8,-.14,.18),o.receiveShadow=!0,this.porticoGroup.add(o);const a=new J(new wt(3.3,.14,.35),i);a.position.set(1.8,-.28,.5),a.receiveShadow=!0,this.porticoGroup.add(a);const l=new J(new wt(.35,3.12,1.8),this.facadeMat);l.position.set(3.42,1.56,-.9),l.castShadow=!0,this.porticoGroup.add(l);const c=new J(new wt(1.8,3.12,.35),this.facadeMat);c.position.set(.9,1.56,-3.02),c.castShadow=!0,this.porticoGroup.add(c);const h=new Ne;h.position.set(1.75,0,-1.75),h.rotation.y=-Math.PI/4,this.porticoGroup.add(h);const u=3.6,f=2.95,d=.08,p=new J(new wt(u,.08,d),this.frameMat);p.position.set(0,2.9,0),h.add(p);const _=new J(new wt(u,.06,d),this.frameMat);_.position.set(0,2.2,0),h.add(_);const g=new J(new wt(u,.12,d),this.frameMat);g.position.set(0,.06,0),h.add(g),[-1.6,-.85,.85,1.6].forEach(F=>{const k=new J(new wt(.06,f,d),this.frameMat);k.position.set(F,1.48,0),h.add(k)});const m=new J(new Me(3.5,.65),this.glassMat);m.position.set(0,2.55,.01),h.add(m);const y=new J(new Me(.7,2.05),this.glassMat);y.position.set(-1.22,1.1,.01),h.add(y);const x=new J(new Me(.7,2.05),this.glassMat);x.position.set(1.22,1.1,.01),h.add(x);const v=new J(new Me(.68,2),this.interiorGlowMat);v.position.set(1.22,1.1,-.05),h.add(v);const C=new Hr({color:0,side:qe}),b=new J(new Me(8,6),C);b.position.set(0,1.8,-5),h.add(b);const w=new J(new Me(6,6),C);w.rotation.y=Math.PI/2,w.position.set(-2,1.8,-2.5),h.add(w);const R=new J(new Me(6,6),C);R.rotation.y=-Math.PI/2,R.position.set(2,1.8,-2.5),h.add(R);const S=new J(new Me(4,6),C);S.rotation.x=-Math.PI/2,S.position.set(0,-.02,-2.5),h.add(S);const M=new J(new Me(4,6),C);M.rotation.x=Math.PI/2,M.position.set(0,3.2,-2.5),h.add(M);const P=new wt(2.1,.12,.08),I=new J(P,this.frameMat);I.position.set(0,2.18,.04),h.add(I),this.doorLeft=this.createDetailedDoorLeaf(!0),this.doorLeft.position.set(-.43,1.1,.03),h.add(this.doorLeft),this.doorRight=this.createDetailedDoorLeaf(!1),this.doorRight.position.set(.43,1.1,.03),h.add(this.doorRight),this.buildDenseFairyLights(h),this.buildNeonSign()}createDetailedDoorLeaf(t){const e=new Ne,n=.82,i=2.05,s=.045,o=.055,a=n-o*2,l=i-.22,c=new wt(a,l,.015),h=new J(c,this.glassMat);h.position.set(0,.05,0),e.add(h);const u=new wt(o,i,s),f=new J(u,this.frameMat);f.position.set(-n*.5+o*.5,0,0),e.add(f);const d=new J(u,this.frameMat);d.position.set(n*.5-o*.5,0,0),e.add(d);const p=new wt(n,.06,s),_=new J(p,this.frameMat);_.position.set(0,i*.5-.03,0),e.add(_);const g=new wt(n,.16,s+.005),m=new J(g,this.frameMat);m.position.set(0,-i*.5+.08,0),e.add(m);const y=new wt(a,.045,s),x=new J(y,this.frameMat);x.position.set(0,-.05,0),e.add(x);const v=t?n*.5-.12:-n*.5+.12,C=new an(.015,.015,1.15,16),b=new J(C,this.chromeMat);b.position.set(v,.05,.045),e.add(b);const w=new an(.012,.012,.04,12),R=new J(w,this.chromeMat);R.rotation.x=Math.PI/2,R.position.set(v,.5,.022),e.add(R);const S=new J(w,this.chromeMat);return S.rotation.x=Math.PI/2,S.position.set(v,-.4,.022),e.add(S),e}buildDenseFairyLights(t){const s=[];for(let h=0;h<36;h++){const u=-1.75+h/35*3.5;Math.abs(u)<.95||s.push(u)}const o=s.length*22,a=new Uu(.024,6,6);this.fairyMesh=new YS(a,this.fairyLightMat,o);const l=new Qe;let c=0;for(let h=0;h<s.length;h++){const u=s[h];for(let f=0;f<22;f++){const d=2.9-f/22*2.55,p=.1+(Math.random()-.5)*.04;l.position.set(u+(Math.random()-.5)*.02,d,p),l.scale.setScalar(.75+Math.random()*.5),l.updateMatrix(),this.fairyMesh.setMatrixAt(c++,l.matrix)}}this.fairyMesh.instanceMatrix.needsUpdate=!0,t.add(this.fairyMesh)}buildNeonSign(){const t=new Ne;t.position.set(1.85,3.42,.12);const e=document.createElement("canvas");e.width=1600,e.height=280;const n=e.getContext("2d");n.clearRect(0,0,1600,280);const i=(u,f,d,p,_)=>{n.font=p,n.textBaseline="middle",n.save(),n.shadowColor="rgba(255, 225, 0, 0.75)",n.shadowBlur=_?20:12,n.strokeStyle="#ffcc00",n.lineWidth=_?7:4.5,n.strokeText(u,f,d),n.restore(),n.save(),n.shadowColor="rgba(255, 245, 60, 0.95)",n.shadowBlur=_?8:5,n.strokeStyle="#ffe833",n.lineWidth=_?4:2.5,n.strokeText(u,f,d),n.restore(),n.save(),n.fillStyle="#fffdf0",n.fillText(u,f,d),n.restore()};i("Т А Й С Ё",50,140,'900 102px "Outfit", "Inter", sans-serif',!0),n.font='700 46px "Outfit", "Inter", sans-serif';const s="АЗИАТСКОЕ БИСТРО";let o=670;for(let u=0;u<s.length;u++){const f=s[u];i(f,o,140,'700 46px "Outfit", "Inter", sans-serif',!1),o+=n.measureText(f).width+7}const a=new Bi(e);a.anisotropy=8;const l=new Me(3.5,.6),c=new Hr({map:a,transparent:!0,depthWrite:!1,side:qe}),h=new J(l,c);h.position.set(0,0,.04),t.add(h),this.buildingGroup.add(t)}buildRightFacade(){const t=new Ne;this.buildingGroup.add(t);const e=new Gi;e.moveTo(0,0),e.lineTo(3.6,0),e.lineTo(3.6,6.2),e.lineTo(0,6.2),e.closePath();const n=new Gn;n.moveTo(3.6,0),n.quadraticCurveTo(3.2,3.15,1.6,3.15),n.quadraticCurveTo(.2,3,0,0),n.closePath(),e.holes.push(n);const i=new Gn;i.moveTo(1.2,4.05),i.quadraticCurveTo(2.1,3.85,2.7,4.3),i.quadraticCurveTo(2.95,4.95,2.55,5.4),i.quadraticCurveTo(1.9,5.55,1.35,5.25),i.quadraticCurveTo(.95,4.65,1.2,4.05),i.closePath(),e.holes.push(i);const s=new Wr(e,{depth:.35,bevelEnabled:!1}),o=new J(s,this.facadeMat);o.position.set(0,0,-.35),t.add(o),this.buildAmoebaWindow(t);const a=new Gi;a.moveTo(3.6,0),a.lineTo(8.2,0),a.lineTo(8.2,6.2),a.lineTo(3.6,6.2),a.closePath();const l=new Gn;l.absarc(5.9,3.1,2.1,0,Math.PI*2,!0),a.holes.push(l);const c=new Wr(a,{depth:.35,bevelEnabled:!1}),h=new J(c,this.facadeMat);h.position.set(0,0,-.35),t.add(h),this.buildAtriumWindow(t,5.9,3.1,2.1),this.buildSculpturalPylon(t,7.6),this.buildRightWing(t,10.5)}buildAmoebaWindow(t){const e=new Ne;t.add(e);const n=new Gi;n.moveTo(1.2,4.05),n.quadraticCurveTo(2.1,3.85,2.7,4.3),n.quadraticCurveTo(2.95,4.95,2.55,5.4),n.quadraticCurveTo(1.9,5.55,1.35,5.25),n.quadraticCurveTo(.95,4.65,1.2,4.05),n.closePath();const i=new Rl(n),s=new J(i,this.glassMat);s.position.set(0,0,-.05),e.add(s);const o=new J(i,this.interiorGlowMat);o.position.set(0,0,-.28),e.add(o);const a=n.getPoints(48),l=new xn().setFromPoints(a),c=new $S(l,new Bm({color:1776672,linewidth:2}));c.position.set(0,0,-.02),e.add(c);const h=new J(new wt(.045,1.45,.04),this.frameMat);h.position.set(1.95,4.7,-.05),e.add(h);const u=new J(new wt(1.6,.045,.04),this.frameMat);u.position.set(1.95,4.7,-.05),e.add(u)}buildAtriumWindow(t,e,n,i){const s=new Jo(i,48),o=new J(s,this.glassMat);o.position.set(e,n,-.05),t.add(o);const a=new Jo(i*.98,36),l=new J(a,this.interiorGlowMat);l.position.set(e,n,-.32),t.add(l);const c=new Nu(i,.05,12,48),h=new J(c,this.frameMat);h.position.set(e,n,.01),t.add(h);const u=new wt(i*2,.16,.08),f=new J(u,this.frameMat);f.position.set(e,n,.02),t.add(f),[-1.4,-.7,0,.7,1.4].forEach(d=>{const p=Math.sqrt(Math.max(0,i*i-d*d))*2,_=new J(new wt(.045,p,.06),this.frameMat);_.position.set(e+d,n,.01),t.add(_)}),[-1,1].forEach(d=>{const p=Math.sqrt(Math.max(0,i*i-d*d))*2,_=new J(new wt(p,.04,.06),this.frameMat);_.position.set(e,n+d,.01),t.add(_)})}buildSculpturalPylon(t,e){const n=new Ne;n.position.set(e,0,0),t.add(n);const i=new Gi;i.moveTo(0,0),i.quadraticCurveTo(.4,4.2,1.8,7),i.lineTo(2.9,7),i.lineTo(2.9,0),i.lineTo(2.4,0);const s=new Gn;s.moveTo(.35,0),s.lineTo(.35,2),s.quadraticCurveTo(1.2,3.2,2.05,2),s.lineTo(2.05,0),s.closePath(),i.holes.push(s);const o=new Wr(i,{depth:.65,bevelEnabled:!0,bevelSize:.03,bevelThickness:.03}),a=new J(o,this.facadeMat);a.position.set(0,0,0),a.castShadow=!1,n.add(a);const l=new J(new wt(3.4,6.2,.35),this.facadeMat);l.position.set(1.7,3.1,-.35),n.add(l);for(let c=0;c<4;c++){const h=new wt(1.9,.12,.32),u=new J(h,this.woodMat);u.position.set(1.2,.06+c*.12,.45-c*.28),u.receiveShadow=!0,n.add(u)}this.buildDecorativePylonDoor(n)}buildDecorativePylonDoor(t){const e=new Ne;e.position.set(1.2,0,.05),t.add(e);const n=new Ps(16760392,3.8,6);n.position.set(0,2.7,.35),e.add(n);const i=1.72,s=2.95,o=.1,a=new wt(.08,s,o),l=new J(a,this.frameMat);l.position.set(-i*.5+.04,s*.5+.42,0),e.add(l);const c=new J(a,this.frameMat);c.position.set(i*.5-.04,s*.5+.42,0),e.add(c);const h=new J(new wt(i,.08,o),this.frameMat);h.position.set(0,s+.38,0),e.add(h);const u=new J(new wt(i,.07,o),this.frameMat);u.position.set(0,2.45,0),e.add(u);const f=new J(new Me(i-.16,.85),this.glassMat);f.position.set(0,2.88,.01),e.add(f);const d=new J(new Me(i-.16,.85),this.interiorGlowMat);d.position.set(0,2.88,-.06),e.add(d),[-.45,0,.45].forEach(g=>{const m=new J(new wt(.025,.82,.03),this.frameMat);m.position.set(g,2.88,.02),e.add(m)});const p=(i-.2)*.5,_=1.95;[-p*.5-.02,p*.5+.02].forEach((g,m)=>{const y=new Ne;y.position.set(g,.42+_*.5,0),e.add(y);const x=new wt(.06,_,.05),v=new J(x,this.frameMat);v.position.set(-p*.5+.03,0,0),y.add(v);const C=new J(x,this.frameMat);C.position.set(p*.5-.03,0,0),y.add(C);const b=new J(new wt(p,.35,.05),this.frameMat);b.position.set(0,-_*.5+.175,0),y.add(b);const w=10,R=.085;for(let P=0;P<w;P++){const I=-_*.5+.42+P*.15,F=new J(new wt(p-.12,R,.03),this.woodMat);F.position.set(0,I,.01),y.add(F);const k=new J(new Me(p-.12,R),this.interiorGlowMat);k.position.set(0,I,-.02),y.add(k)}const S=m===0?p*.5-.09:-p*.5+.09,M=new J(new an(.015,.015,.85,12),this.chromeMat);M.position.set(S,.05,.05),y.add(M),[-.35,.35].forEach(P=>{const I=new J(new an(.012,.012,.04,12),this.chromeMat);I.rotation.x=Math.PI/2,I.position.set(S,P,.03),y.add(I)})})}buildRightWing(t,e){const n=new Ne;n.position.set(e,0,0),t.add(n);const i=5.1,s=6.2,o=new Gi;o.moveTo(0,0),o.lineTo(i,0),o.lineTo(i,s),o.lineTo(0,s),o.closePath();const a=new Gn;a.moveTo(.4,3.8),a.lineTo(4.4,3.8),a.lineTo(4.4,4.8),a.lineTo(.4,4.8),a.closePath(),o.holes.push(a),[1.2,2.8].forEach(f=>{const d=new Gn;d.moveTo(f,1.5),d.lineTo(f+.9,1.5),d.absarc(f+.9,1.85,.35,-Math.PI/2,Math.PI/2,!1),d.lineTo(f,2.2),d.absarc(f,1.85,.35,Math.PI/2,-Math.PI/2,!1),d.closePath(),o.holes.push(d)});const l=new Wr(o,{depth:.35,bevelEnabled:!1}),c=new J(l,this.facadeMat);c.position.set(0,0,-.35),n.add(c);const h=new J(new Me(4,1),this.glassMat);h.position.set(2.4,4.3,-.05),n.add(h);const u=new J(new Me(4,1),this.interiorGlowMat);u.position.set(2.4,4.3,-.3),n.add(u);for(let f=.4;f<=4.4;f+=.6){const d=new J(new wt(.04,1,.06),this.frameMat);d.position.set(f,4.3,.01),n.add(d)}[1.65,3.25].forEach(f=>{const d=new J(new Me(1.4,.7),this.glassMat);d.position.set(f,1.85,-.05),n.add(d);const p=new J(new Me(1.4,.7),this.interiorGlowMat);p.position.set(f,1.85,-.28),n.add(p),[-.3,0,.3].forEach(_=>{const g=new J(new an(.015,.015,.7,8),this.frameMat);g.position.set(f+_,1.85,.01),n.add(g)})})}buildLeftFacade(){const t=new Ne;t.position.set(0,0,0),t.rotation.y=Math.PI/2,this.buildingGroup.add(t);const e=11.5,n=6.2,i=new Gi;i.moveTo(0,0),i.lineTo(e,0),i.lineTo(e,n),i.lineTo(0,n),i.closePath();const s=new Gn;s.moveTo(0,0),s.quadraticCurveTo(.2,3,1.6,3.15),s.quadraticCurveTo(3,3.15,3.2,0),s.closePath(),i.holes.push(s);const o=new Gn;o.absellipse(9.8,3.2,1.25,2.05,0,Math.PI*2,!0),i.holes.push(o);const a=new Gn;a.absarc(6.8,1.9,.95,0,Math.PI*2,!0),i.holes.push(a);const l=new Gn;l.absellipse(6.8,4.6,.65,.92,0,Math.PI*2,!0),i.holes.push(l);const c=new Gn;c.absellipse(4.2,4.6,.85,.95,0,Math.PI*2,!0),i.holes.push(c);const h=new Wr(i,{depth:.35,bevelEnabled:!1}),u=new J(h,this.leftFacadeMat);u.position.set(0,0,0),t.add(u);const f=e-3.5,d=new J(new Me(f,n),new Pe({color:1579552,roughness:.9,side:qe}));d.position.set(3.5+f*.5,n*.5,.5),t.add(d),this.createMullionWindow(t,{x:9.8,y:3.2,z:.18,type:"oval",rx:1.25,ry:2.05,bars:"dense-grid"}),this.createMullionWindow(t,{x:6.8,y:1.9,z:.18,type:"round",r:.95,bars:"grid"}),this.createMullionWindow(t,{x:6.8,y:4.6,z:.18,type:"oval",rx:.65,ry:.92,bars:"cross"}),this.createMullionWindow(t,{x:4.2,y:4.6,z:.18,type:"oval",rx:.85,ry:.95,bars:"cross"})}createMullionWindow(t,e){const n=new Ne;n.position.set(e.x,e.y,e.z),t.add(n);const i=e.rx||e.r,s=e.ry||e.r;let o;if(e.type==="round")o=new Jo(i,36);else{const h=new Fl(0,0,i,s,0,Math.PI*2,!1).getPoints(36),u=new Gi(h);o=new Rl(u)}const a=new J(o,this.glassMat);a.position.z=-.08,n.add(a);const l=new J(o,this.interiorGlowMat);if(l.position.z=.06,n.add(l),e.bars==="cross"){const c=new J(new wt(.045,s*2,.05),this.frameMat);c.position.z=-.12,n.add(c);const h=new J(new wt(i*2,.045,.05),this.frameMat);h.position.z=-.12,n.add(h)}else e.bars==="grid"?([-.45,.45].forEach(c=>{const h=new J(new wt(.04,s*1.8,.05),this.frameMat);h.position.set(c,0,-.12),n.add(h)}),[-.35,.35].forEach(c=>{const h=new J(new wt(i*1.8,.04,.05),this.frameMat);h.position.set(0,c,-.12),n.add(h)})):e.bars==="dense-grid"&&([-.8,-.4,0,.4,.8].forEach(c=>{const h=new J(new wt(.04,s*1.9,.05),this.frameMat);h.position.set(c,0,-.12),n.add(h)}),[-1.2,-.6,0,.6,1.2].forEach(c=>{const h=new J(new wt(i*1.9,.04,.05),this.frameMat);h.position.set(0,c,-.12),n.add(h)}))}buildRoofStructure(){const t=new wt(16.5,.35,13.5),e=new J(t,this.darkRoofMat);e.position.set(8,6.25,-6.5),this.buildingGroup.add(e);const n=new wt(16.5,.4,.25),i=new J(n,this.facadeMat);i.position.set(8,6.55,0),this.buildingGroup.add(i);const s=new wt(.25,.4,13.25),o=new J(s,this.leftFacadeMat);o.position.set(0,6.55,-.125-13.25*.5),this.buildingGroup.add(o)}buildEnvironment(){this.envGroup=new Ne,this.buildingGroup.add(this.envGroup);const t=new an(52,52,26,48,1,!0,Math.PI*.22,Math.PI*1.56),e=new J(t,this.backdropMat);e.position.set(5,7,-18),this.envGroup.add(e);const n=new wt(1.8,.06,16.3),i=new J(n,this.pavingMat);i.position.set(-.9,-.38,-6.35),i.receiveShadow=!0,this.envGroup.add(i);const s=new wt(18.3,.06,1.8),o=new J(s,this.pavingMat);o.position.set(7.35,-.38,.9),o.receiveShadow=!0,this.envGroup.add(o);const a=new wt(2.6,.06,3.4),l=new J(a,this.pavingMat);l.position.set(1.9,-.38,3.5),l.receiveShadow=!0,this.envGroup.add(l);const c=new wt(2.4,.06,3.4),h=new J(c,this.pavingMat);h.position.set(8.8,-.38,3.5),h.receiveShadow=!0,this.envGroup.add(h);const u=new wt(23.3,.06,5.3),f=new J(u,this.pavingMat);f.position.set(7.85,-.38,7.85),f.receiveShadow=!0,this.envGroup.add(f);const d=new wt(.18,.14,16.3),p=new J(d,this.curbMat);p.position.set(-1.85,-.32,-6.35),p.receiveShadow=!0,this.envGroup.add(p);const _=new J(new wt(4.2,.14,.18),this.curbMat);_.position.set(-1.5,-.32,1.8),_.receiveShadow=!0,this.envGroup.add(_);const g=new J(new wt(4.2,.14,.18),this.curbMat);g.position.set(-1.5,-.32,5.2),g.receiveShadow=!0,this.envGroup.add(g);const m=new J(new wt(.18,.14,3.4),this.curbMat);m.position.set(-3.6,-.32,3.5),m.receiveShadow=!0,this.envGroup.add(m);const y=new J(new wt(.18,.14,3.4),this.curbMat);y.position.set(.6,-.32,3.5),y.receiveShadow=!0,this.envGroup.add(y);const x=new J(new wt(4.4,.14,.18),this.curbMat);x.position.set(5.4,-.32,1.8),x.receiveShadow=!0,this.envGroup.add(x);const v=new J(new wt(4.4,.14,.18),this.curbMat);v.position.set(5.4,-.32,5.2),v.receiveShadow=!0,this.envGroup.add(v);const C=new J(new wt(.18,.14,3.4),this.curbMat);C.position.set(3.2,-.32,3.5),C.receiveShadow=!0,this.envGroup.add(C);const b=new J(new wt(.18,.14,3.4),this.curbMat);b.position.set(7.6,-.32,3.5),b.receiveShadow=!0,this.envGroup.add(b);const w=new J(new wt(6.5,.14,.18),this.curbMat);w.position.set(13.25,-.32,1.8),w.receiveShadow=!0,this.envGroup.add(w);const R=new J(new wt(6.5,.14,.18),this.curbMat);R.position.set(13.25,-.32,5.2),R.receiveShadow=!0,this.envGroup.add(R);const S=new J(new wt(.18,.14,3.4),this.curbMat);S.position.set(10,-.32,3.5),S.receiveShadow=!0,this.envGroup.add(S);const M=new J(new wt(.18,.14,3.4),this.curbMat);M.position.set(16.5,-.32,3.5),M.receiveShadow=!0,this.envGroup.add(M);const P=new J(new wt(.18,.14,16.3),this.curbMat);P.position.set(16.5,-.32,-6.35),P.receiveShadow=!0,this.envGroup.add(P);const I=new wt(18,.05,18),F=new J(I,this.lawnMat);F.position.set(-10.9,-.36,-7),F.receiveShadow=!0,this.envGroup.add(F);const k=new wt(4,.05,3.2),X=new J(k,this.lawnMat);X.position.set(-1.5,-.36,3.5),X.receiveShadow=!0,this.envGroup.add(X);const H=new wt(4.2,.05,3.2),W=new J(H,this.lawnMat);W.position.set(5.4,-.36,3.5),W.receiveShadow=!0,this.envGroup.add(W);const G=new wt(6.3,.05,3.2),it=new J(G,this.lawnMat);it.position.set(13.25,-.36,3.5),it.receiveShadow=!0,this.envGroup.add(it);const D=new wt(18,.05,18),ct=new J(D,this.lawnMat);ct.position.set(25.5,-.36,-7),ct.receiveShadow=!0,this.envGroup.add(ct);const Lt=this.createShrubCluster(18,3.8,2.6,.85,1.25);Lt.position.set(-1.5,0,3.5),this.envGroup.add(Lt);const $t=this.createOrganicConiferTree(3,3.4,1.3);$t.position.set(-2.4,0,3.6),$t.rotation.y=.6,this.envGroup.add($t);const $=this.createShrubCluster(22,3.8,2.6,.72,1.15);$.position.set(5.4,0,3.5),this.envGroup.add($);const rt=this.createOrganicConiferTree(2,2.8,1.1);rt.position.set(3.8,0,3.8),rt.rotation.y=1.1,this.envGroup.add(rt);const vt=this.createShrubCluster(20,5.8,2.6,.95,1.35);vt.position.set(13.25,0,3.5),this.envGroup.add(vt);const st=this.createOrganicConiferTree(1,6.5,2.3);st.position.set(12.8,0,3.8),st.rotation.y=-.7,this.envGroup.add(st);const Ct=this.createOrganicConiferTree(2,5.2,1.9);Ct.position.set(15.2,0,3.6),Ct.rotation.y=1.2,this.envGroup.add(Ct);const Ut=this.createShrubCluster(18,2.5,7,1.25,1.6);Ut.position.set(-3.8,0,-3.5),this.envGroup.add(Ut);const zt=this.createShrubCluster(20,3,8,1.35,1.7);zt.position.set(-4,0,-10.5),this.envGroup.add(zt);const Wt=this.createShrubCluster(14,3.5,3.5,1.2,1.5);Wt.position.set(-4.5,0,1.8),this.envGroup.add(Wt);const tt=this.createShrubCluster(22,10,12,1.45,1.8);tt.position.set(-10.5,0,-6.5),this.envGroup.add(tt);const et=this.createShrubCluster(28,16,5,1.55,2.2);et.position.set(-2,0,-16),this.envGroup.add(et);const L=this.createShrubCluster(28,16,5,1.55,2.2);L.position.set(12,0,-16),this.envGroup.add(L);const bt=this.createShrubCluster(24,14,5,1.5,2);bt.position.set(5,0,-18.5),this.envGroup.add(bt);const ot=this.createShrubCluster(18,3,7,1.35,1.7);ot.position.set(18,0,-3.5),this.envGroup.add(ot);const O=this.createShrubCluster(20,4,9,1.45,1.8);O.position.set(18.5,0,-10.5),this.envGroup.add(O);const lt=this.createShrubCluster(16,5,5,1.25,1.5);lt.position.set(19,0,1.5),this.envGroup.add(lt);const Ft=this.createShrubCluster(24,10,12,1.45,1.9);Ft.position.set(23,0,-6.5),this.envGroup.add(Ft);const Mt=this.createPineTree(2,16.2,4.5);Mt.position.set(-8.5,0,-5.5),Mt.rotation.y=.4,this.envGroup.add(Mt);const A=this.createPineTree(1,15,4.2);A.position.set(-12.5,0,-10.5),A.rotation.y=-.8,this.envGroup.add(A);const E=this.createPineTree(2,14.2,3.9);E.position.set(-8,0,-13),E.rotation.y=1.2,this.envGroup.add(E);const V=this.createPineTree(1,15.5,4.3);V.position.set(-13.5,0,-4.5),V.rotation.y=2.3,this.envGroup.add(V);const K=this.createPineTree(2,16.8,4.6);K.position.set(-17,0,-8.5),K.rotation.y=.1,this.envGroup.add(K);const Q=this.createOrganicConiferTree(1,7.8,2.6);Q.position.set(-6.8,0,-2.5),Q.rotation.y=.6,this.envGroup.add(Q);const j=this.createOrganicConiferTree(2,6.8,2.4);j.position.set(-7,0,-8),j.rotation.y=-.3,this.envGroup.add(j);const pt=this.createOrganicConiferTree(3,5.8,2.2);pt.position.set(-7.5,0,1.8),pt.rotation.y=1.1,this.envGroup.add(pt);const ut=this.createOrganicConiferTree(1,7,2.4);ut.position.set(-10.8,0,-5.5),ut.rotation.y=2.1,this.envGroup.add(ut);const _t=this.createPineTree(2,15.5,4.2);_t.position.set(-5,0,-18),_t.rotation.y=.5,this.envGroup.add(_t);const Yt=this.createPineTree(1,16.2,4.4);Yt.position.set(-1,0,-18.5),Yt.rotation.y=-.6,this.envGroup.add(Yt);const at=this.createPineTree(2,16.8,4.6);at.position.set(3.5,0,-19),at.rotation.y=.8,this.envGroup.add(at);const ft=this.createPineTree(1,15.8,4.3);ft.position.set(7.5,0,-18.5),ft.rotation.y=-1.1,this.envGroup.add(ft);const Gt=this.createPineTree(2,16.5,4.5);Gt.position.set(11.8,0,-19),Gt.rotation.y=1.6,this.envGroup.add(Gt);const kt=this.createPineTree(1,15.4,4.1);kt.position.set(16,0,-18),kt.rotation.y=-.4,this.envGroup.add(kt);const Rt=this.createPineTree(2,16.2,4.4);Rt.position.set(1.5,0,-21.5),Rt.rotation.y=1.3,this.envGroup.add(Rt);const jt=this.createPineTree(1,16,4.3);jt.position.set(5.5,0,-22),jt.rotation.y=-.9,this.envGroup.add(jt);const Vt=this.createPineTree(2,16.6,4.5);Vt.position.set(9.8,0,-21.5),Vt.rotation.y=.4,this.envGroup.add(Vt);const oe=this.createPineTree(1,15.8,4.2);oe.position.set(-3,0,-20.5),oe.rotation.y=1.7,this.envGroup.add(oe);const U=this.createPineTree(2,16.4,4.4);U.position.set(14,0,-21),U.rotation.y=-1.2,this.envGroup.add(U);const mt=this.createPineTree(1,16,4.3);mt.position.set(19,0,-19.5),mt.rotation.y=.9,this.envGroup.add(mt);const Z=this.createOrganicConiferTree(2,8.5,2.8);Z.position.set(.5,0,-17.5),this.envGroup.add(Z);const nt=this.createOrganicConiferTree(1,8.8,2.9);nt.position.set(5.5,0,-17.8),this.envGroup.add(nt);const gt=this.createOrganicConiferTree(3,8.2,2.7);gt.position.set(10.5,0,-17.5),this.envGroup.add(gt);const xt=this.createPineTree(2,15.8,4.3);xt.position.set(18.5,0,-5.5),xt.rotation.y=-.5,this.envGroup.add(xt);const Xt=this.createPineTree(1,16.2,4.5);Xt.position.set(22.5,0,-10.5),Xt.rotation.y=1.4,this.envGroup.add(Xt);const he=this.createPineTree(2,15,4.1);he.position.set(25.5,0,-5.5),he.rotation.y=-1.2,this.envGroup.add(he);const Ce=this.createPineTree(1,15.6,4.2);Ce.position.set(27,0,-12),Ce.rotation.y=.7,this.envGroup.add(Ce);const Tt=this.createOrganicConiferTree(2,7.4,2.5);Tt.position.set(18.2,0,-1.5),Tt.rotation.y=.9,this.envGroup.add(Tt);const Dt=this.createOrganicConiferTree(1,6.5,2.3);Dt.position.set(21,0,1.5),Dt.rotation.y=-1.2,this.envGroup.add(Dt);const Qt=this.createParkLantern();Qt.position.set(-3.2,0,3.2),this.envGroup.add(Qt);const yt=this.createParkLantern();yt.position.set(-.4,0,5.4),this.envGroup.add(yt);const Zt=this.createParkLantern();Zt.position.set(9.8,0,5.4),this.envGroup.add(Zt);const Ot=this.createParkLantern();Ot.position.set(16.5,0,3.2),this.envGroup.add(Ot);const qt=this.createParkLantern();qt.position.set(-1.85,0,-5.5),this.envGroup.add(qt);const Le=this.createParkBench();Le.position.set(-1.5,0,6.8),Le.rotation.y=.15,this.envGroup.add(Le);const ne=this.createParkBench();ne.position.set(8.8,0,6.8),ne.rotation.y=-.1,this.envGroup.add(ne)}createShrubCluster(t,e,n,i,s){const o=new Ne,a=[];for(let l=0;l<t;l++){const c=(Math.random()-.5)*e,h=(Math.random()-.5)*n,u=.75+Math.random()*.5,f=i*u,d=s*u,p=d*.45,_=f*1.6,g=d*1.1,m=new Me(_,g);[0,Math.PI/4,Math.PI/2,Math.PI*3/4].forEach(y=>{const x=m.clone();x.applyMatrix4(new Kt().makeRotationY(y).setPosition(c,p,h)),a.push(x)}),[-.4,.4].forEach(y=>{const x=m.clone(),v=new Kt().makeRotationX(Math.PI*.38).multiply(new Kt().makeRotationZ(y)).setPosition(c,p+d*.15,h);x.applyMatrix4(v),a.push(x)})}if(a.length>0){const l=Nr(a,!1),c=new J(l,this.bushMat);c.castShadow=!1,c.receiveShadow=!0,o.add(c)}return o}createOrganicConiferTree(t,e,n){const i=new Ne,s=6,o=e/s;let a=0,l=0,c=0;const h=(Math.random()-.5)*.4,u=(Math.random()-.5)*.4,f=[],d=[],p=[];for(let x=0;x<s;x++){const v=(x+1)/s,C=h*v*v,b=l+o,w=u*v*v,R=(.04+(1-v)*.14)*(e/7),S=(.04+(1-x/s)*.14)*(e/7),M=new an(R,S,o,8),P=new N(C-a,b-l,w-c).normalize(),I=new os().setFromUnitVectors(new N(0,1,0),P),F=new Kt().compose(new N((a+C)*.5,(l+b)*.5,(c+w)*.5),I,new N(1,1,1));M.applyMatrix4(F),f.push(M),a=C,l=b,c=w}const _=t===2?8:t===3?7:8,g=t===3?this.greenNeedleCanopyMat:this.blueNeedleCanopyMat;for(let x=0;x<_;x++){const v=x/(_-1),C=(.12+v*.78)*e,b=n*Math.pow(1-v*.88,.75),w=5+(x%2===0?1:0),R=x%2*(Math.PI/w);for(let S=0;S<w;S++){const M=S/w*Math.PI*2+R+(Math.random()-.5)*.2,P=b*(.85+Math.random()*.25),I=.22+(1-v)*.18,F=new N(Math.cos(M)*.15,C,Math.sin(M)*.15),k=new ui(0,M,-Math.PI*I,"YXZ"),X=new Kt().makeRotationFromEuler(k).setPosition(F),H=new an(.025,.055,P,6);H.applyMatrix4(new Kt().makeTranslation(0,P*.45,0)),H.applyMatrix4(X),d.push(H);const W=2+(x<4?1:0);for(let G=0;G<W;G++){const it=.35+G/W*.65,D=b*(.48+(1-v)*.25),ct=D*.75,Lt=new N((Math.random()-.5)*.1,P*it,(Math.random()-.5)*.1);Lt.applyMatrix4(X);const $t=new Me(D,ct);[0,Math.PI/3,Math.PI*2/3].forEach(vt=>{const st=$t.clone(),Ct=new Kt().makeRotationY(vt).setPosition(Lt);st.applyMatrix4(Ct),p.push(st)});const $=$t.clone(),rt=new Kt().makeRotationX(Math.PI*.4).multiply(new Kt().makeRotationY(M)).setPosition(Lt);$.applyMatrix4(rt),p.push($)}}}const m=new N(a,e*.94,c),y=new Me(1.2,1.8);if([0,Math.PI/3,Math.PI*2/3].forEach(x=>{const v=y.clone();v.applyMatrix4(new Kt().makeRotationY(x).setPosition(m)),p.push(v)}),f.length>0){const x=Nr(f,!1),v=new J(x,this.spruceBarkMat);v.castShadow=!1,i.add(v)}if(d.length>0){const x=Nr(d,!1),v=new J(x,this.spruceBarkMat);v.castShadow=!1,i.add(v)}if(p.length>0){const x=Nr(p,!1),v=new J(x,g);v.castShadow=!1,v.receiveShadow=!0,i.add(v)}return i}createPineTree(t,e,n){const i=new Ne,s=(Math.random()-.5)*.85,o=(Math.random()-.5)*.85,a=5,l=e*.84/a;let c=0,h=0,u=0;const f=[],d=[],p=[];for(let y=0;y<a;y++){const x=(y+1)/a,v=s*x*x,C=h+l,b=o*x*x,w=(c+v)*.5,R=(h+C)*.5,S=(u+b)*.5,M=.3*Math.pow(1-x*.52,.8),P=.3*Math.pow(1-y/a*.52,.8),I=new an(M,P,l,8),F=new N(v-c,C-h,b-u).normalize(),k=new os().setFromUnitVectors(new N(0,1,0),F),X=new Kt().compose(new N(w,R,S),k,new N(1,1,1));I.applyMatrix4(X),y<2?f.push(I):d.push(I),c=v,h=C,u=b}const _=t===2?7:6,g=e*.5;for(let y=0;y<_;y++){const x=y/(_-1),v=g+x*(e*.34),C=y/_*Math.PI*2+y%2*.45,b=n*(.7+Math.random()*.35),w=new N(c*(.6+x*.4),v,u*(.6+x*.4)),R=new ui(0,C,-Math.PI*(.28+x*.08),"YXZ"),S=new Kt().makeRotationFromEuler(R).setPosition(w),M=new an(.045,.09,b,6);M.applyMatrix4(new Kt().makeTranslation(0,b*.4,0)),M.applyMatrix4(S),d.push(M);const P=2+(y%2===0?1:0);for(let I=0;I<P;I++){const F=.4+I/P*.65,k=1.55+(1-x*.3)*.85,X=new N((Math.random()-.5)*.2,b*F+.15,(Math.random()-.5)*.2);X.applyMatrix4(S);const H=new Me(k*1.7,k*1.2);[0,Math.PI/4,Math.PI/2,Math.PI*3/4].forEach(W=>{const G=H.clone();G.applyMatrix4(new Kt().makeRotationY(W).setPosition(X)),p.push(G)}),[-.35,.35].forEach(W=>{const G=H.clone(),it=new Kt().makeRotationX(Math.PI*.4).multiply(new Kt().makeRotationZ(W)).setPosition(X);G.applyMatrix4(it),p.push(G)})}}const m=new N(c,e*.88,u);for(let y=0;y<4;y++){const x=y/4*Math.PI*2,v=n*.48,C=new N(m.x+Math.cos(x)*v,m.y+y*.25,m.z+Math.sin(x)*v),b=new Me(2.6,1.8);[0,Math.PI/4,Math.PI/2,Math.PI*3/4].forEach(w=>{const R=b.clone();R.applyMatrix4(new Kt().makeRotationY(w).setPosition(C)),p.push(R)}),[-.35,.35].forEach(w=>{const R=b.clone(),S=new Kt().makeRotationX(Math.PI*.4).multiply(new Kt().makeRotationZ(w)).setPosition(C);R.applyMatrix4(S),p.push(R)})}if(f.length>0){const y=Nr(f,!1),x=new J(y,this.pineBarkMat);x.castShadow=!1,i.add(x)}if(d.length>0){const y=Nr(d,!1),x=new J(y,this.pineOrangeBarkMat);x.castShadow=!1,i.add(x)}if(p.length>0){const y=Nr(p,!1),x=new J(y,this.pineCanopyMat);x.castShadow=!1,x.receiveShadow=!0,i.add(x)}return i}createParkLantern(){const t=new Ne,e=new an(.18,.24,.22,8),n=new J(e,this.frameMat);n.position.y=.11,n.castShadow=!1,t.add(n);const i=new an(.045,.065,3.2,8),s=new J(i,this.frameMat);s.position.y=1.71,s.castShadow=!1,t.add(s);const o=new an(.14,.07,.1,8),a=new J(o,this.frameMat);a.position.y=3.28,t.add(a);const l=new an(.32,.16,.45,4),c=new J(l,this.frameMat);c.position.y=3.52,c.rotation.y=Math.PI/4,t.add(c);const h=new wt(.22,.34,.22),u=new J(h,this.lanternGlassMat);u.position.y=3.52,u.rotation.y=Math.PI/4,t.add(u);const f=new Iu(.38,.14,4),d=new J(f,this.frameMat);d.position.y=3.81,d.rotation.y=Math.PI/4,d.castShadow=!1,t.add(d);const p=new Ps(16758861,3.8,9.5,2);if(p.position.set(0,3.52,0),p.castShadow=!1,t.add(p),!this._lanternGroundPoolTex){const y=document.createElement("canvas");y.width=128,y.height=128;const x=y.getContext("2d"),v=x.createRadialGradient(64,64,0,64,64,64);v.addColorStop(0,"rgba(255, 185, 70, 0.55)"),v.addColorStop(.35,"rgba(255, 150, 40, 0.28)"),v.addColorStop(.7,"rgba(255, 120, 20, 0.08)"),v.addColorStop(1,"rgba(255, 100, 10, 0)"),x.fillStyle=v,x.fillRect(0,0,128,128),this._lanternGroundPoolTex=new Bi(y)}const _=new Me(4.8,4.8),g=new Hr({map:this._lanternGroundPoolTex,transparent:!0,blending:sh,depthWrite:!1}),m=new J(_,g);return m.rotation.x=-Math.PI/2,m.position.y=.03,t.add(m),t}createParkTrashCan(){const t=new Ne,e=new wt(.42,.68,.42),n=new J(e,this.frameMat);n.position.y=.34,n.castShadow=!1,t.add(n);const i=new wt(.36,.08,.36),s=new J(i,this.benchWoodMat);return s.position.y=.65,t.add(s),t}createParkBench(){const t=new Ne;[-.72,.72].forEach(e=>{const n=new wt(.05,.45,.48),i=new J(n,this.frameMat);i.position.set(e,.225,0),i.castShadow=!1,t.add(i);const s=new wt(.045,.45,.05),o=new J(s,this.frameMat);o.position.set(e,.62,-.22),o.rotation.x=-.12,o.castShadow=!1,t.add(o)});for(let e=0;e<4;e++){const n=-.16+e*.11,i=new wt(1.6,.035,.085),s=new J(i,this.benchWoodMat);s.position.set(0,.46,n),s.castShadow=!1,t.add(s)}for(let e=0;e<3;e++){const n=.56+e*.09,i=-.21-e*.015,s=new wt(1.6,.075,.025),o=new J(s,this.benchWoodMat);o.position.set(0,n,i),o.rotation.x=-.12,o.castShadow=!1,t.add(o)}return t}addEventListeners(){window.addEventListener("resize",this.onResize.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),document.addEventListener("visibilitychange",()=>{if(document.hidden)this.pause();else{const t=document.getElementById("hero-section");(!t||!t.classList.contains("departed"))&&this.resume()}})}onResize(){this.container&&(this.width=this.container.clientWidth,this.height=this.container.clientHeight,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height))}onMouseMove(t){this.isTransitioning||this._mouseRaf||(this._mouseRaf=!0,requestAnimationFrame(()=>{this._mouseRaf=!1;const e=t.clientX/window.innerWidth*2-1,n=-(t.clientY/window.innerHeight)*2+1;this.mouse.targetX=e*.55,this.mouse.targetY=n*.25}))}flyIntoEntrance(t){this.isTransitioning=!0;const e=Ke.timeline({onComplete:()=>{t&&t()}});this.doorLeft&&this.doorRight&&(e.to(this.doorLeft.position,{x:-1.35,duration:1,ease:"power2.inOut"},.3),e.to(this.doorRight.position,{x:1.35,duration:1,ease:"power2.inOut"},.3)),e.to(this.camera.position,{x:1.2,y:1.35,z:-1.8,duration:2,ease:"power3.inOut"},0);const n={x:this.initialTarget.x,y:this.initialTarget.y,z:this.initialTarget.z};e.to(n,{x:1.2,y:1.35,z:-6,duration:2,ease:"power3.inOut",onUpdate:()=>{this.camera.lookAt(n.x,n.y,n.z)}},0);const i=document.getElementById("portal-flash");return i&&e.to(i,{opacity:1,duration:.7,ease:"power2.in"},1.3),e}flyBackToStreet(t){const e=Ke.timeline({onComplete:()=>{this.isTransitioning=!1,t&&t()}});this.camera.position.set(1.2,1.35,-1.8),this.camera.lookAt(1.2,1.35,-6),e.to(this.camera.position,{x:this.initialCamPos.x,y:this.initialCamPos.y,z:this.initialCamPos.z,duration:1.5,ease:"power3.out"},0);const n={x:1.2,y:1.35,z:-6};e.to(n,{x:this.initialTarget.x,y:this.initialTarget.y,z:this.initialTarget.z,duration:1.5,ease:"power3.out",onUpdate:()=>{this.camera.lookAt(n.x,n.y,n.z)}},0),this.doorLeft&&this.doorRight&&(e.to(this.doorLeft.position,{x:-.43,duration:.9,ease:"power2.inOut"},.4),e.to(this.doorRight.position,{x:.43,duration:.9,ease:"power2.inOut"},.4)),e.to(this.porchLight,{intensity:6,distance:14,duration:1},.2);const i=document.getElementById("portal-flash");return i&&e.to(i,{opacity:0,duration:.7,ease:"power2.out"},.2),e}pause(){this.isPaused=!0}resume(){this.isPaused&&(this.isPaused=!1,this.animate())}animate(){if(this.isPaused)return;requestAnimationFrame(this._boundAnimate),this.isTransitioning||(this.mouse.x+=(this.mouse.targetX-this.mouse.x)*.05,this.mouse.y+=(this.mouse.targetY-this.mouse.y)*.05,this.camera.position.x=this.initialCamPos.x+this.mouse.x*.8,this.camera.position.y=this.initialCamPos.y+this.mouse.y*.5,this.camera.lookAt(this.initialTarget.x+this.mouse.x*.2,this.initialTarget.y+this.mouse.y*.1,this.initialTarget.z));const t=performance.now()*.002;this.signPointLight&&(this.signPointLight.intensity=2.8+Math.sin(t*3)*.15),this.porchLight&&!this.isTransitioning&&(this.porchLight.intensity=5.5+Math.cos(t*2.5)*.25),this.renderer.render(this.scene,this.camera)}}class D1{constructor(){this.initCardTilt(),this.initSubZeroTabs(),this.initDishHoverPreview()}initCardTilt(){document.querySelectorAll(".mockup-card").forEach(e=>{const n=e.querySelector(".mockup-stage"),i=e.querySelector(".mockup-ambient-glow");n&&(e.addEventListener("mousemove",s=>{const o=n.getBoundingClientRect(),a=s.clientX-o.left,l=s.clientY-o.top,c=o.width/2,h=o.height/2,u=(l-h)/h*-10,f=(a-c)/c*12;Ke.to(n,{rotateX:u,rotateY:f,duration:.4,ease:"power2.out",transformPerspective:1e3}),i&&Ke.to(i,{x:(a-c)/c*25,y:(l-h)/h*25,scale:1.1,opacity:.65,duration:.4})}),e.addEventListener("mouseleave",()=>{Ke.to(n,{rotateX:0,rotateY:0,duration:.7,ease:"power3.out"}),i&&Ke.to(i,{x:0,y:0,scale:1,opacity:.45,duration:.7})}))})}initSubZeroTabs(){const t=document.querySelectorAll(".subzero-tab"),e=document.querySelectorAll(".menu-row");t.forEach(n=>{n.addEventListener("click",()=>{t.forEach(s=>s.classList.remove("active")),n.classList.add("active");const i=n.getAttribute("data-filter");e.forEach(s=>{const o=s.getAttribute("data-category");i==="all"||o===i?Ke.to(s,{opacity:1,height:"auto",paddingTop:"24px",paddingBottom:"24px",duration:.4,display:"grid",ease:"power2.out"}):Ke.to(s,{opacity:0,height:0,paddingTop:0,paddingBottom:0,duration:.3,display:"none",ease:"power2.in"})})})})}initDishHoverPreview(){const t=document.getElementById("dish-preview-tooltip"),e=t?t.querySelector("img"):null,n=document.querySelectorAll(".menu-row");!t||!e||n.forEach(i=>{i.addEventListener("mouseenter",()=>{const s=i.getAttribute("data-image");s&&(e.src=s,t.classList.add("visible"))}),i.addEventListener("mousemove",s=>{Ke.to(t,{left:s.clientX+30,top:s.clientY-40,duration:.15,ease:"power1.out"})}),i.addEventListener("mouseleave",()=>{t.classList.remove("visible")})})}}Ke.registerPlugin(ce);class Nd{constructor(){this.isInside=!1,this.initLenis(),this.initHeroScene(),this.initMenuInteractions(),this.bindEvents()}initLenis(){this.lenis=new i0({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),orientation:"vertical",smoothWheel:!0}),this.lenis.on("scroll",ce.update),Ke.ticker.add(t=>{this.lenis.raf(t*1e3)}),Ke.ticker.lagSmoothing(0),this.lenis.stop()}initHeroScene(){this.heroScene=new L1("hero-canvas-container")}initMenuInteractions(){this.menu=new D1}bindEvents(){const t=document.getElementById("btn-enter-trigger"),e=document.getElementById("btn-back-street"),n=document.getElementById("hero-section"),i=document.getElementById("night-experience"),s=document.querySelector(".hero-content-col"),o=document.getElementById("table-booking-form"),a=document.getElementById("nav-book-btn");t&&t.addEventListener("click",()=>{this.isInside||(this.isInside=!0,Ke.to(s,{opacity:0,x:-40,duration:.6,ease:"power2.in"}),this.heroScene.flyIntoEntrance(()=>{document.body.classList.add("night-mode"),n.classList.add("departed"),i.classList.add("active"),this.heroScene.pause(),window.scrollTo(0,0),this.lenis.start(),this.lenis.scrollTo(0,{immediate:!0});const l=document.getElementById("portal-flash");l&&Ke.to(l,{opacity:0,duration:.6,ease:"power2.out"})}))}),e&&e.addEventListener("click",l=>{if(l.preventDefault(),!this.isInside)return;const c=document.getElementById("portal-flash");Ke.to(c,{opacity:1,duration:.4,ease:"power2.in",onComplete:()=>{this.lenis.stop(),document.body.classList.remove("night-mode"),n.classList.remove("departed"),i.classList.remove("active"),window.scrollTo(0,0),this.heroScene.resume(),this.heroScene.flyBackToStreet(()=>{this.isInside=!1,Ke.to(s,{opacity:1,x:0,duration:.8,ease:"power2.out"})}),Ke.to(c,{opacity:0,duration:.6,delay:.1,ease:"power2.out"})}})}),a&&a.addEventListener("click",l=>{l.preventDefault(),!this.isInside&&t?(t.click(),Ke.delayedCall(2.8,()=>{this.lenis.scrollTo("#tattu-reveal-footer",{duration:1.6})})):this.lenis.scrollTo("#tattu-reveal-footer",{duration:1.6})}),o&&o.addEventListener("submit",l=>{l.preventDefault();const c=o.querySelector('button[type="submit"]'),h=c.innerHTML;c.innerHTML='<span class="btn-text">СТОЛ ЗАБРОНИРОВАН ✓</span>',c.style.borderColor="var(--neon-amber)",c.style.color="var(--neon-amber)",setTimeout(()=>{c.innerHTML=h,o.reset()},4e3)})}}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",()=>{window.__taiseApp=new Nd}):window.__taiseApp=new Nd;
