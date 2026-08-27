const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  try {
    tg.setHeaderColor('#071248');
    tg.setBackgroundColor('#030b35');
  } catch {}
}

// Kulüp logoları artık sprite yerine doğrudan PNG dosyalarından yüklenir.
// Yeni bir logo yükledikten sonra Telegram cache'ini kırmak için bu değeri artırabilirsin.
const LOGO_VERSION = '9';
const LOGO_BASE = './assets/logos';

const teams = [
  ['psg','PSG',1,'FR'],['bayern','Bayern Münih',1,'DE'],['real-madrid','Real Madrid',1,'ES'],['liverpool','Liverpool',1,'EN'],['inter','Inter',1,'IT'],['man-city','Manchester City',1,'EN'],['arsenal','Arsenal',1,'EN'],['barcelona','Barcelona',1,'ES'],['atletico','Atletico Madrid',1,'ES'],
  ['dortmund','Borussia Dortmund',2,'DE'],['roma','Roma',2,'IT'],['sporting','Sporting CP',2,'PT'],['aston-villa','Aston Villa',2,'EN'],['porto','Porto',2,'PT'],['man-united','Manchester United',2,'EN'],['club-brugge','Club Brugge',2,'BE'],['real-betis','Real Betis',2,'ES'],['psv','PSV',2,'NL'],
  ['fenerbahce','Fenerbahçe',3,'TR'],['galatasaray','Galatasaray',3,'TR'],['feyenoord','Feyenoord',3,'NL'],['lille','Lille',3,'FR'],['bodo-glimt','Bodø/Glimt',3,'NO'],['napoli','Napoli',3,'IT'],['leipzig','RB Leipzig',3,'DE'],['villarreal','Villarreal',3,'ES'],['shakhtar','Shakhtar Donetsk',3,'UA'],
  ['slavia-prague','Slavia Prag',4,'CZ'],['stuttgart','Stuttgart',4,'DE'],['aek','AEK',4,'GR'],['slovan','Slovan Bratislava',4,'SK'],['lask','LASK Linz',4,'AT'],['como','Como',4,'IT'],['lens','Lens',4,'FR'],['viking','Viking FK',4,'NO'],['sabah','Sabah FC',4,'AZ'],
].map(([id,name,pot,country])=>({id,name,pot,country}));

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
  const src = `${LOGO_BASE}/${team.id}.png?v=${LOGO_VERSION}`;
  return `<span class="team-logo" role="img" aria-label="${team.name}">
    <img class="team-logo-img" src="${src}" alt="${team.name}" draggable="false" decoding="async" loading="lazy"
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
