window.TOLIE=(()=>{
'use strict';
/* =====================================================================
   CONTENT — edit the words here
   ===================================================================== */
const C={
  name:'Christianto Lie', role:'Senior Software Engineer', location:'Singapore',
  summary:'I design and build high-performance, scalable applications with solid system architecture: mostly on the backend, comfortable on the frontend, and always pushing for code that the next person can actually maintain.',
  site:'https://tolie.space',
  github:'https://github.com/nocturnalcoders',
  linkedin:'https://www.linkedin.com/in/christianto-lie',
  blog:'https://blog.tolie.space', lab:'https://lab.tolie.space',
  cv:''            // e.g. 'assets/christianto-lie-cv.pdf' — the CV links appear once this is set
};
/* Work history. Leave empty to point people at LinkedIn instead.
   {role:'Senior Software Engineer',company:'Acme',period:'2023 to now',note:'One line on what you did.'} */
const CAREER=[];
const EDU={school:'Universitas Bunda Mulia',period:'2017 to 2021',degree:'Bachelor of Computer Science, majoring in Information Systems (Sistem Informasi)'};
const SKILLS=[
  {area:'Backend',items:['Java','Spring Boot','Go','Python','Node.js','C# / .NET','PHP']},
  {area:'Frontend',items:['TypeScript','JavaScript','React','Redux','Angular','Vue','Tailwind']},
  {area:'Data',items:['PostgreSQL','MySQL','MongoDB','Redis']},
  {area:'DevOps',items:['Docker','Linux','Nginx','Jenkins','GitHub Actions']},
  {area:'Testing',items:['JUnit','Jest','Cypress','SonarQube']}
];
/* url = live site (optional), repo = source (optional) */
const PROJECTS=[
  {name:'tolie.space Lab',blurb:'A learn-to-code platform: free courses with Python exercises that run in the browser, quizzes, progress tracking and verifiable certificates, in Indonesian and English.',stack:['React','Flask','PostgreSQL','Docker'],url:C.lab,repo:C.github+'/tolie-lab'},
  {name:'tolie.space notes',blurb:'The blog behind this town. A React frontend, a Flask API and PostgreSQL, self-hosted with Docker Compose.',stack:['React','Flask','PostgreSQL','Docker'],url:C.blog,repo:C.github+'/tolie-blog'},
  {name:'FOODWISE',blurb:'A household food management app: track what’s in the kitchen, plan meals and cut waste, with photo scan and AI recipe ideas.',stack:['React','FastAPI','PostgreSQL'],url:'https://foodwise-murex.vercel.app',repo:C.github+'/foodwise'},
  {name:'Commerce API suite',blurb:'Four Java services covering payments, promo codes, e-vouchers and the store.',stack:['Java'],repo:C.github+'/payment-api'},
  {name:'e-Kost platform',blurb:'A boarding-house (kost) platform built end to end: Go services and a Vue frontend.',stack:['Go','Vue'],repo:C.github+'/BackendEkost'},
  {name:'tolie.space',blurb:'This little town. Drawn entirely in code on a canvas, with no game engine.',stack:['JavaScript','Canvas'],url:C.site,repo:C.github+'/tolie-space'}
];
/* [heading, key in DL] — shown under “Off the clock” in the plain view */
const INTERESTS=[['Futsal','trophy'],['Barça','barca'],['Anime','tv'],['Movies','movies'],['Reading','readshelf'],['New tech','techdesk']];
const CONTACT={
  to:'hi@tolie.space',
  web3formsKey:'330515c4-3205-4ed8-bd27-f4071df5d3b9',
  endpoint:''
};
const DL={
  sign:{name:'Signpost',pages:['Welcome to tolie.space.','I’m Christianto Lie, but most people call me tolie. Senior software engineer, futsal player, night walker.','Wander around, peek inside the houses, and kick the ball on the court. Everything here is me, one way or another.']},
  mail:{name:'Mailbox',pages:['Want to say hi? I’m nocturnalcoders on GitHub.','Longer thoughts live on the blog, and the half-baked experiments live in the lab.'],links:[{t:'GitHub',u:C.github},{t:'Blog',u:C.blog},{t:'Lab',u:C.lab}]},
  cat:{name:'Cat',pages:['Mrrp.','(The cat has no opinion on your code, but it approves of your company.)']},
  homeDesk:{name:'My desk',pages:['This is where the late-night building happens.','Senior software engineer by day, tinkerer by night.'],links:[{t:'GitHub',u:C.github}]},
  trophy:{name:'Futsal shelf',pages:['Boots by the door, ball on the shelf.','Futsal is my reset button. Nothing clears my head like a fast game.']},
  poster:{name:'Poster',pages:['A night walk through the city, painted the way I like to remember it.']},
  bed:{name:'Bed',pages:['Tempting. But there’s still one more commit to push.']},
  workDesk:{name:'Workstation',pages:['Senior Software Engineer.','I like building things that are fast, reliable, and pleasant to use, then sanding off the rough edges.'],links:[{t:'LinkedIn',u:C.linkedin},{t:'GitHub',u:C.github}]},
  board:{name:'Whiteboard',pages:['Architecture, trade-offs, and the occasional doodle.','Good engineering is mostly good decisions made calmly.']},
  rack:{name:'Server rack',pages:['Blinking lights make everything feel productive.']},
  coffee:{name:'Coffee machine',pages:['Fuel. Always fuel.']},
  blogDesk:{name:'Writing desk',pages:['This is where posts get drafted.','Notes on building software, things I’m learning, and the odd tangent.'],links:[{t:'Open the blog',u:C.blog}]},
  books:{name:'Bookshelf',pages:['Half read, half intended to be read.']},
  nook:{name:'Reading nook',pages:['A good chair, a warm lamp, and a long article.']},
  labScreen:{name:'Experiment console',pages:['Prototypes, odd ideas, and things that might break.','If it’s half-baked but interesting, it lives here.'],links:[{t:'Open the lab',u:C.lab},{t:'GitHub',u:C.github}]},
  bench:{name:'Workbench',pages:['Please do not drink the blue one.']},
  compute:{name:'Compute',pages:['Quietly humming away at something.']},
  barca:{name:'Barça shirt',pages:['Visca Barça!','I love Barcelona, and I love Messi. Watching him play is pure joy.']},
  tv:{name:'The TV',pages:['I watch anime. A lot of it.','It’s how I unwind. The Ghibli look of this little town is no accident.']},
  movies:{name:'Movie poster',pages:['I love watching movies.','Lights off, snacks out. Best way to spend an evening.']},
  readshelf:{name:'Bookshelf',pages:['I love reading.','Books, long articles, docs, anything with a good idea in it.']},
  readnook:{name:'Reading chair',pages:['My favourite spot to get lost in a book.']},
  techdesk:{name:'Research desk',pages:['I’m a tech geek. I love researching and learning about new tech.','New frameworks, AI, hardware, how things work under the hood. If it’s new, I’m reading about it.']},
  edu:{name:'Diploma',pages:[EDU.school+', '+EDU.period+'.',EDU.degree+'.']}
};

/* built from the lists above, so the town and the plain view never drift apart */
const cvLink=C.cv?[{t:'Download CV',u:C.cv}]:[];
DL.board.pages=DL.board.pages.concat(SKILLS.map(s=>s.area+': '+s.items.join(', ')+'.'));
DL.career={name:'Career log',
  pages:CAREER.length?CAREER.map(j=>j.role+' at '+j.company+', '+j.period+'.'+(j.note?' '+j.note:'')):[C.role+', based in '+C.location+'.','The full timeline lives on LinkedIn.'],
  links:[{t:'LinkedIn',u:C.linkedin}].concat(cvLink)};
DL.projects={name:'Project wall',
  pages:['Things I’ve built outside the day job.'].concat(PROJECTS.map(p=>p.name+': '+p.blurb+' ('+p.stack.join(', ')+')')),
  links:PROJECTS.filter(p=>p.url&&p.url!==C.site).map(p=>({t:p.name,u:p.url})).concat([{t:'More on GitHub',u:C.github}])};

return {C,CONTACT,DL,CAREER,EDU,SKILLS,PROJECTS,INTERESTS};
})();
