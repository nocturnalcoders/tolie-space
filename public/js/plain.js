/* =====================================================================
   plain view — the same content as the town, as a normal page
   (tolie.space/#plain). Built from content.js, nothing to edit here.
   ===================================================================== */
(()=>{
'use strict';
const {C,DL,CAREER,EDU,SKILLS,PROJECTS,INTERESTS}=window.TOLIE;
const root=document.getElementById('plain');
const BEHIND=['title','btns','act'];

function el(tag,props,kids){
  const e=document.createElement(tag);
  if(props)for(const k in props){if(k==='cls')e.className=props[k];else if(k==='text')e.textContent=props[k];else e.setAttribute(k,props[k]);}
  (kids||[]).forEach(c=>{if(c)e.appendChild(c);});
  return e;
}
const link=(t,u,cls)=>el('a',{href:u,target:'_blank',rel:'noopener noreferrer',text:t,cls:cls||''});
const section=(title,kids)=>el('section',null,[el('h2',{text:title})].concat(kids));
const tags=list=>el('p',{cls:'pv-tags'},list.map(s=>el('span',{text:s})));

function build(){
  const links=[link('LinkedIn',C.linkedin),link('GitHub',C.github),link('Blog',C.blog),link('Lab',C.lab)];
  if(C.cv)links.push(link('Download CV',C.cv));
  links.push(el('button',{type:'button','data-modal':'form',text:'Send a message'}));

  const jobs=CAREER.length
    ?el('ul',{cls:'pv-jobs'},CAREER.map(j=>el('li',null,[el('h3',{text:j.role+' · '+j.company}),el('p',{cls:'pv-meta',text:j.period}),j.note?el('p',{text:j.note}):null])))
    :el('p',null,[document.createTextNode(C.role+', based in '+C.location+'. The full timeline lives on '),link('LinkedIn',C.linkedin),document.createTextNode('.')]);

  const projects=el('ul',{cls:'pv-proj'},PROJECTS.map(p=>el('li',null,[
    el('h3',{text:p.name}),el('p',{text:p.blurb}),tags(p.stack),
    el('p',{cls:'pv-plinks'},[p.url?link('Visit',p.url):null,p.repo?link('Source',p.repo):null])
  ])));

  const skills=el('dl',{cls:'pv-skills'},[].concat.apply([],SKILLS.map(s=>[el('dt',{text:s.area}),el('dd',null,[tags(s.items)])])));
  const hobbies=el('dl',{cls:'pv-hob'},[].concat.apply([],INTERESTS.map(i=>[el('dt',{text:i[0]}),el('dd',{text:DL[i[1]].pages.join(' ')})])));

  root.appendChild(el('div',{cls:'pv'},[
    el('button',{type:'button',cls:'pv-back','data-plain':'close',text:'← Back to the town'}),
    el('header',{cls:'pv-head'},[
      el('img',{src:'assets/avatar.jpg',alt:'',width:'200',height:'200'}),
      el('div',null,[el('h1',{text:C.name}),el('p',{cls:'pv-role',text:C.role+' · '+C.location})])
    ]),
    el('p',{cls:'pv-sum',text:C.summary}),
    el('nav',{cls:'pv-links','aria-label':'Links'},links),
    section('Experience',[jobs]),
    section('Projects',[projects]),
    section('Skills',[skills]),
    section('Education',[el('h3',{text:EDU.school}),el('p',{cls:'pv-meta',text:EDU.period}),el('p',{text:EDU.degree+'.'})]),
    section('Off the clock',[hobbies]),
    el('footer',null,[el('button',{type:'button',cls:'pv-enter','data-plain':'close',text:'Enter the town →'})])
  ]));
}

const isOpen=()=>!root.hidden;
function show(on){
  root.hidden=!on;document.body.classList.toggle('plain',on);
  BEHIND.forEach(id=>{const e=document.getElementById(id);if(e)e.inert=on;});
  if(on){root.scrollTop=0;root.focus({preventScroll:true});}
}
function setHash(on){try{history.replaceState(null,'',on?'#plain':location.pathname+location.search);}catch(e){}}
function open(){if(isOpen())return;show(true);setHash(true);}
function close(){if(!isOpen())return;show(false);setHash(false);}

build();
document.querySelectorAll('[data-plain]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();if(b.getAttribute('data-plain')==='open')open();else close();}));
window.addEventListener('hashchange',()=>show(location.hash==='#plain'));
if(location.hash==='#plain')show(true);

window.TOLIE.plain={open:open,close:close,isOpen:isOpen};
})();
