/* =====================================================================
   core — language switch (EN / ID) and optional analytics.
   Words live in content.js; nothing to edit here.
   ===================================================================== */
(()=>{
'use strict';
const W=window.TOLIE,{C,DL,ID,STR,ANALYTICS,CAREER,EDU,SKILLS,PROJECTS}=W;
const BASE={};Object.keys(DL).forEach(k=>{BASE[k]=DL[k];});

let lang='en';
try{const v=localStorage.getItem('tolie.lang');if(v==='en'||v==='id')lang=v;else if(/^id\b/i.test(navigator.language||''))lang='id';}catch(e){}

/* s('English text') → the text in the current language; {name} placeholders are filled from vars */
function s(key,vars){
  let v=(lang==='id'&&ID.str[key])||STR[key]||key;
  if(vars)for(const n in vars)v=v.split('{'+n+'}').join(vars[n]);
  return v;
}
/* loc(obj,'blurb') → obj.blurb_id in Indonesian when it exists */
const loc=(o,f)=>(lang==='id'&&o[f+'_id'])||o[f];

/* latest blog posts from C.feed. The blog has to allow this origin (see README); if it doesn’t, nothing is shown. */
let posts=[];
function loadPosts(){
  if(!C.feed||!window.fetch||!window.DOMParser)return;
  fetch(C.feed).then(r=>{if(!r.ok)throw 0;return r.text();}).then(x=>{
    const d=new DOMParser().parseFromString(x,'text/xml'),txt=(n,q)=>{const e=n.querySelector(q);return e?(e.textContent||'').trim():'';};
    posts=Array.from(d.querySelectorAll('item')).slice(0,3).map(n=>({t:txt(n,'title'),u:txt(n,'link'),d:txt(n,'pubDate')})).filter(p=>p.t&&/^https?:\/\//.test(p.u));
    if(posts.length){build();window.dispatchEvent(new Event('tolie:posts'));}
  }).catch(()=>{});
}

/* DL is rebuilt in place so the town and the plain view never drift apart */
function build(){
  Object.keys(BASE).forEach(k=>{
    const e=BASE[k],o=(lang==='id'&&ID.dl[k])||{},d={name:o.name||e.name,pages:(o.pages||e.pages).slice()};
    if(e.links)d.links=e.links.map((l,i)=>({t:(o.linkT&&o.linkT[i])||l.t,u:l.u}));
    DL[k]=d;
  });
  DL.board.pages=DL.board.pages.concat(SKILLS.map(x=>x.area+': '+x.items.join(', ')+'.'));
  DL.edu.pages=[EDU.school+', '+loc(EDU,'period')+'.',loc(EDU,'degree')+'.'];
  DL.career.pages=CAREER.length
    ?CAREER.map(j=>s('{role} at {company}, {period}.',{role:j.role,company:j.company,period:loc(j,'period')})+(j.note?' '+loc(j,'note'):''))
    :[s('{role}, based in {loc}.',{role:C.role,loc:loc(C,'location')}),s('The full timeline lives on LinkedIn.')];
  DL.career.links=[{t:'LinkedIn',u:C.linkedin}].concat(C.cv?[{t:s('Download CV'),u:C.cv}]:[]);
  DL.projects.pages=DL.projects.pages.concat(PROJECTS.map(p=>p.name+': '+loc(p,'blurb')+' ('+p.stack.join(', ')+')'));
  if(posts.length){
    const cut=t=>t.length>34?t.slice(0,32).trim()+'…':t;
    DL.blogDesk.pages.push(s('Latest on the blog: {list}.',{list:posts.map(p=>'“'+p.t+'”').join(', ')}));
    DL.blogDesk.links=posts.map(p=>({t:cut(p.t),u:p.u})).concat(DL.blogDesk.links);
  }
  DL.projects.links=PROJECTS.filter(p=>p.url&&p.url!==C.site).map(p=>({t:p.name,u:p.url})).concat([{t:s('More on GitHub'),u:C.github}]);
}

/* static markup: data-i18n (text), data-i18n-aria (aria-label), data-i18n-title (title).
   An empty attribute means “use my current English wording as the key”. */
function apply(){
  document.documentElement.lang=lang;
  [['data-i18n',null],['data-i18n-aria','aria-label'],['data-i18n-title','title']].forEach(p=>{
    document.querySelectorAll('['+p[0]+']').forEach(el=>{
      let k=el.getAttribute(p[0]);
      if(!k){k=p[1]?el.getAttribute(p[1]):el.textContent;el.setAttribute(p[0],k);}
      if(p[1])el.setAttribute(p[1],s(k));else el.textContent=s(k);
    });
  });
}
function setLang(l){
  if(l!=='en'&&l!=='id'||l===lang)return;
  lang=l;try{localStorage.setItem('tolie.lang',l);}catch(e){}
  build();apply();window.dispatchEvent(new Event('tolie:lang'));track('lang',{lang:l});
}
const toggleLang=()=>setLang(lang==='en'?'id':'en');

/* analytics: only loads when ANALYTICS is filled in (content.js) */
function track(name,data){try{if(window.umami)window.umami.track(name,data);}catch(e){}}
if(ANALYTICS.src&&ANALYTICS.websiteId){
  const sc=document.createElement('script');sc.defer=true;sc.src=ANALYTICS.src;sc.setAttribute('data-website-id',ANALYTICS.websiteId);document.head.appendChild(sc);
}

build();apply();
document.querySelectorAll('[data-lang-toggle]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();toggleLang();b.blur();}));

loadPosts();
W.posts=()=>posts;W.s=s;W.loc=loc;W.lang=()=>lang;W.setLang=setLang;W.toggleLang=toggleLang;W.track=track;
})();
