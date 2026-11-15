/* =====================================================================
   plain view — the same content as the town, as a normal page
   (tolie.space/#plain). Built from content.js, nothing to edit here.
   ===================================================================== */
(()=>{
'use strict';
const W=window.TOLIE,{C,DL,CAREER,EDU,SKILLS,PROJECTS,INTERESTS,s,loc}=W;
const root=document.getElementById('plain');
const BEHIND=['title','btns','act','found'];

function el(tag,props,kids){
  const e=document.createElement(tag);
  if(props)for(const k in props){if(k==='cls')e.className=props[k];else if(k==='text')e.textContent=props[k];else e.setAttribute(k,props[k]);}
  (kids||[]).forEach(c=>{if(c)e.appendChild(c);});
  return e;
}
const link=(t,u,cls)=>el('a',{href:u,target:'_blank',rel:'noopener noreferrer',text:t,cls:cls||''});
const section=(title,kids)=>el('section',null,[el('h2',{text:s(title)})].concat(kids));
const tags=list=>el('p',{cls:'pv-tags'},list.map(x=>el('span',{text:x})));

function build(){
  const links=[link('LinkedIn',C.linkedin),link('GitHub',C.github),link('Blog',C.blog),link('Lab',C.lab)];
  if(C.cv)links.push(link(s('Download CV'),C.cv));
  links.push(el('button',{type:'button','data-modal':'form',text:s('Send a message')}));

  const jobs=CAREER.length
    ?el('ul',{cls:'pv-jobs'},CAREER.map(j=>el('li',null,[el('h3',{text:j.role+' · '+j.company}),el('p',{cls:'pv-meta',text:loc(j,'period')}),j.note?el('p',{text:loc(j,'note')}):null])))
    :el('p',null,[document.createTextNode(DL.career.pages.join(' ')+' '),link('LinkedIn →',C.linkedin)]);

  const projects=el('ul',{cls:'pv-proj'},PROJECTS.map(p=>el('li',null,[
    el('h3',{text:p.name}),el('p',{text:loc(p,'blurb')}),tags(p.stack),
    el('p',{cls:'pv-plinks'},[p.url?link(s('Visit'),p.url):null,p.repo?link(s('Source'),p.repo):null])
  ])));

  const skills=el('dl',{cls:'pv-skills'},[].concat.apply([],SKILLS.map(x=>[el('dt',{text:x.area}),el('dd',null,[tags(x.items)])])));
  const hobbies=el('dl',{cls:'pv-hob'},[].concat.apply([],INTERESTS.map(i=>[el('dt',{text:loc(i,'t')}),el('dd',{text:DL[i.k].pages.join(' ')})])));

  root.textContent='';
  root.appendChild(el('div',{cls:'pv'},[
    el('div',{cls:'pv-top'},[
      el('button',{type:'button','data-plain':'close',text:s('← Back to the town')}),
      el('button',{type:'button','data-lang-toggle':'','aria-label':s('langAria'),text:s('langName')})
    ]),
    el('header',{cls:'pv-head'},[
      el('img',{src:'assets/avatar.jpg',alt:'',width:'200',height:'200'}),
      el('div',null,[el('h1',{text:C.name}),el('p',{cls:'pv-role',text:C.role+' · '+loc(C,'location')})])
    ]),
    el('p',{cls:'pv-sum',text:loc(C,'summary')}),
    el('nav',{cls:'pv-links','aria-label':'Links'},links),
    section('Experience',[jobs]),
    section('Projects',[projects]),
    section('Skills',[skills]),
    section('Education',[el('h3',{text:EDU.school}),el('p',{cls:'pv-meta',text:loc(EDU,'period')}),el('p',{text:loc(EDU,'degree')+'.'})]),
    section('Off the clock',[hobbies]),
    el('footer',null,[el('button',{type:'button',cls:'pv-enter','data-plain':'close',text:s('Enter the town →')})])
  ]));
}

const isOpen=()=>!root.hidden;
function show(on){
  root.hidden=!on;document.body.classList.toggle('plain',on);
  BEHIND.forEach(id=>{const e=document.getElementById(id);if(e)e.inert=on;});
  if(on){root.scrollTop=0;root.focus({preventScroll:true});}
}
function setHash(on){try{history.replaceState(null,'',on?'#plain':location.pathname+location.search);}catch(e){}}
function open(){if(isOpen())return;show(true);setHash(true);W.track('plain');}
function close(){if(!isOpen())return;show(false);setHash(false);}

build();
window.addEventListener('tolie:lang',()=>{const y=root.scrollTop;build();root.scrollTop=y;});
/* buttons outside the plain view are bound directly so a click on the title screen doesn’t also start the game */
document.querySelectorAll('[data-plain]').forEach(b=>{if(!root.contains(b))b.addEventListener('click',e=>{e.stopPropagation();b.blur();if(b.getAttribute('data-plain')==='open')open();else close();});});
root.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('[data-plain],[data-lang-toggle]');if(!t)return;
  if(t.hasAttribute('data-plain'))close();else W.toggleLang();
});
window.addEventListener('hashchange',()=>show(location.hash==='#plain'));
if(location.hash==='#plain')show(true);

W.plain={open:open,close:close,isOpen:isOpen};
})();
