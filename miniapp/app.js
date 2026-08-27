const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); try { tg.setHeaderColor('#071248'); tg.setBackgroundColor('#030b35'); } catch {} }

const TEAM_SPRITE_SRC = (window.__TEAM_SPRITE_PARTS?.length === 4)
  ? `data:image/webp;base64,${window.__TEAM_SPRITE_PARTS.join('')}`
  : './assets/team-sprite.webp?v=5';

const STUTTGART_LOGO_SRC = 'data:image/webp;base64,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';

const teams = [
  ['psg','PSG',1,'FR'],['bayern','Bayern Münih',1,'DE'],['real-madrid','Real Madrid',1,'ES'],['liverpool','Liverpool',1,'EN'],['inter','Inter',1,'IT'],['man-city','Manchester City',1,'EN'],['arsenal','Arsenal',1,'EN'],['barcelona','Barcelona',1,'ES'],['atletico','Atletico Madrid',1,'ES'],
  ['dortmund','Borussia Dortmund',2,'DE'],['roma','Roma',2,'IT'],['sporting','Sporting CP',2,'PT'],['aston-villa','Aston Villa',2,'EN'],['porto','Porto',2,'PT'],['man-united','Manchester United',2,'EN'],['club-brugge','Club Brugge',2,'BE'],['real-betis','Real Betis',2,'ES'],['psv','PSV',2,'NL'],
  ['fenerbahce','Fenerbahçe',3,'TR'],['galatasaray','Galatasaray',3,'TR'],['feyenoord','Feyenoord',3,'NL'],['lille','Lille',3,'FR'],['bodo-glimt','Bodø/Glimt',3,'NO'],['napoli','Napoli',3,'IT'],['leipzig','RB Leipzig',3,'DE'],['villarreal','Villarreal',3,'ES'],['shakhtar','Shakhtar Donetsk',3,'UA'],
  ['slavia-prague','Slavia Prag',4,'CZ'],['stuttgart','Stuttgart',4,'DE'],['aek','AEK',4,'GR'],['slovan','Slovan Bratislava',4,'SK'],['lask','LASK Linz',4,'AT'],['como','Como',4,'IT'],['lens','Lens',4,'FR'],['viking','Viking FK',4,'NO'],['sabah','Sabah FC',4,'AZ'],
].map(([id,name,pot,country],i)=>({id,name,pot,country,spriteX:Math.floor(i/9),spriteY:i%9}));

const byId = new Map(teams.map(t=>[t.id,t]));
const picks = { fenerbahce: new Set(), galatasaray: new Set() };
let active = 'fenerbahce';
const picker = document.getElementById('picker');
const statusEl = document.getElementById('status');
const submitBtn = document.getElementById('submit');
const pbu = document.getElementById('pbu');

function selectedByPot(target,pot){ return [...picks[target]].map(id=>byId.get(id)).filter(t=>t?.pot===pot); }
function countryCount(target,country){ return [...picks[target]].map(id=>byId.get(id)).filter(t=>t?.country===country).length; }
function isComplete(target){ return picks[target].size===8 && [1,2,3,4].every(p=>selectedByPot(target,p).length===2); }

function setMessage(msg=''){ statusEl.textContent=msg; }

function canSelect(target,team){
  if(team.country==='TR') return {ok:false,why:'Aynı ülke takımları eşleşemez.'};
  if(selectedByPot(target,team.pot).length>=2) return {ok:false,why:`${team.pot}. torbadan zaten 2 takım seçtin.`};
  if(countryCount(target,team.country)>=2) return {ok:false,why:'Aynı ülkeden en fazla 2 rakip seçebilirsin.'};
  return {ok:true};
}

function toggle(team){
  const set=picks[active];
  if(set.has(team.id)){ set.delete(team.id); setMessage(''); render(); return; }
  const rule=canSelect(active,team);
  if(!rule.ok){ setMessage(rule.why); try{tg?.HapticFeedback?.notificationOccurred('error')}catch{}; return; }
  set.add(team.id); setMessage(''); try{tg?.HapticFeedback?.selectionChanged()}catch{}; render();
}

function logoMarkup(team){
  if (team.id === 'stuttgart') {
    return `<span class="team-logo" role="img" aria-label="${team.name}"><img src="${STUTTGART_LOGO_SRC}" alt="" draggable="false" decoding="sync" style="left:0;top:0;width:100%;height:100%;object-fit:contain;padding:4px"></span>`;
  }
  const left = -(team.spriteX * 100);
  const top = -(team.spriteY * 100);
  return `<span class="team-logo" role="img" aria-label="${team.name}">
    <img src="${TEAM_SPRITE_SRC}" alt="" draggable="false" decoding="sync"
      style="left:${left}%;top:${top}%"
      onerror="this.closest('.team-logo').classList.add('logo-error');this.remove()">
  </span>`;
}

function render(){
  picker.innerHTML='';
  for(let pot=1;pot<=4;pot++){
    const chosen=selectedByPot(active,pot).length;
    const section=document.createElement('section'); section.className='pot';
    section.innerHTML=`<div class="pot-head"><div class="pot-title">${pot}. TORBA</div><div class="pot-count">${chosen}/2 seçildi</div></div><div class="team-grid"></div>`;
    const grid=section.querySelector('.team-grid');
    teams.filter(t=>t.pot===pot && t.country!=='TR').forEach(team=>{
      const selected=picks[active].has(team.id);
      const allowed=selected||canSelect(active,team).ok;
      const b=document.createElement('button');
      b.type='button';
      b.className=`team-card${selected?' selected':''}${!allowed?' disabled':''}`;
      b.innerHTML=`<span class="check">${selected?'✓':''}</span>${logoMarkup(team)}<span class="team-name">${team.name}</span>`;
      b.addEventListener('click',()=>toggle(team));
      grid.appendChild(b);
    });
    picker.appendChild(section);
  }
  document.getElementById('fb-count').textContent=`${picks.fenerbahce.size}/8`;
  document.getElementById('gs-count').textContent=`${picks.galatasaray.size}/8`;
  document.getElementById('fb-summary').textContent=`${picks.fenerbahce.size} / 8`;
  document.getElementById('gs-summary').textContent=`${picks.galatasaray.size} / 8`;
  submitBtn.disabled=!(isComplete('fenerbahce')&&isComplete('galatasaray')&&pbu.value.trim());
}

document.querySelectorAll('.team-tab').forEach(btn=>btn.addEventListener('click',()=>{
  active=btn.dataset.target;
  document.querySelectorAll('.team-tab').forEach(x=>x.classList.toggle('active',x===btn));
  setMessage('');
  render();
  window.scrollTo({top:document.querySelector('.team-tabs').offsetTop-4,behavior:'smooth'});
}));

pbu.addEventListener('input',render);

submitBtn.addEventListener('click',()=>{
  const username=pbu.value.trim();
  if(!username){ setMessage('Pusulabet kullanıcı adı zorunlu.'); return; }
  if(!isComplete('fenerbahce')||!isComplete('galatasaray')){ setMessage('Her iki takım için de 8 rakibi tamamla.'); return; }
  if(!tg?.sendData){ setMessage('Kayıt için bu sayfayı Telegram botundaki Mini App butonundan açmalısın.'); return; }
  const payload={
    type:'sl_draw_submission',
    pusulabet_username:username,
    fenerbahce:[...picks.fenerbahce],
    galatasaray:[...picks.galatasaray]
  };
  submitBtn.disabled=true;
  submitBtn.textContent='Kaydediliyor…';
  try{
    tg.sendData(JSON.stringify(payload));
    tg.HapticFeedback?.notificationOccurred('success');
    setMessage('Tahminin bota gönderildi.');
    setTimeout(()=>tg.close(),700);
  } catch(e){
    submitBtn.disabled=false;
    submitBtn.textContent='Tahminimi Kaydet';
    setMessage('Gönderim başarısız. Mini App’i bottan tekrar aç.');
  }
});

render();
