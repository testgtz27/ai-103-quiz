/* =========================================================
   AI-103 Quiz — Shared engine (render, scoring, sidebar, progress)
   Used by every quiz-N.html. Requires quizData to be defined
   by a previously-loaded data/quiz-N-data.js script tag, and
   theme.js to be loaded for the light/dark toggle.
   ========================================================= */

/* ---------- Progress & history tracking (localStorage) ---------
   Storage keys used (kept stable across future deploys so old
   data is never lost when the site code is updated):
     - 'ai103_progress_<quiz-file>.html' → current/last state of one quiz
     - 'ai103_history' → array of every completed attempt, newest last
   ------------------------------------------------------------- */
const QUIZ_FILE = (location.pathname.split('/').pop() || 'unknown-quiz.html');
let historyLoggedThisLoad = false;

function getQuizTitle(){
  const h1 = document.querySelector('header h1');
  return h1 ? h1.textContent.trim() : QUIZ_FILE;
}

function saveProgress(){
  try{
    const correctCount = answered.filter(a=>a===true).length;
    const answeredCount = answered.filter(a=>a!==null).length;
    const data = {
      quizFile: QUIZ_FILE,
      quizTitle: getQuizTitle(),
      correct: correctCount,
      answeredCount: answeredCount,
      total: quizData.length,
      updatedAt: Date.now()
    };
    localStorage.setItem('ai103_progress_' + QUIZ_FILE, JSON.stringify(data));
    if(answeredCount === quizData.length && answeredCount > 0 && !historyLoggedThisLoad){
      logHistoryEntry(data);
      historyLoggedThisLoad = true;
    }
  }catch(e){ /* localStorage unavailable (private mode etc.) — fail silently */ }
}

function logHistoryEntry(data){
  try{
    const raw = localStorage.getItem('ai103_history');
    const history = raw ? JSON.parse(raw) : [];
    history.push({
      quizFile: data.quizFile,
      quizTitle: data.quizTitle,
      correct: data.correct,
      total: data.total,
      date: Date.now()
    });
    if(history.length > 300) history.splice(0, history.length - 300);
    localStorage.setItem('ai103_history', JSON.stringify(history));
  }catch(e){}
}


/* =========================================================
   STATE & RENDER LOGIC
   ========================================================= */
let current = 0;
let answered = new Array(quizData.length).fill(null); // null | true | false (correct?)
let userSel = new Array(quizData.length).fill(null);

const quizArea = document.getElementById('quizArea');
const scoreLabel = document.getElementById('scoreLabel');
const progressFill = document.getElementById('progressFill');
const jumpGrid = document.getElementById('jumpGrid');

function buildJumpGrid(){
  jumpGrid.innerHTML = '';
  quizData.forEach((q,i)=>{
    const b = document.createElement('button');
    b.textContent = i+1;
    b.onclick = ()=>{ current = i; render(); closeSidebar(); };
    jumpGrid.appendChild(b);
  });
}

function updateHeader(){
  const answeredCount = answered.filter(a=>a!==null).length;
  const correctCount = answered.filter(a=>a===true).length;
  scoreLabel.textContent = correctCount + ' / ' + quizData.length + ' đúng (' + answeredCount + ' đã làm)';
  progressFill.style.width = (answeredCount/quizData.length*100) + '%';
  Array.from(jumpGrid.children).forEach((b,i)=>{
    b.classList.remove('done-ok','done-no','current');
    if(answered[i]===true) b.classList.add('done-ok');
    else if(answered[i]===false) b.classList.add('done-no');
    if(i===current) b.classList.add('current');
  });
  saveProgress();
}

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function getDisplay(q){
  // Shuffles single/multi answer options once per question and remaps the
  // correct index/indices so the correct answer isn't always in the same spot.
  if(q._d) return q._d;
  if(q.type === 'single' || q.type === 'multi'){
    const order = shuffle(q.options.map((_,i)=>i));
    const newOptions = order.map(oi=>q.options[oi]);
    let newCorrect;
    if(q.type === 'single'){
      newCorrect = order.indexOf(q.correct);
    } else {
      newCorrect = q.correct.map(oc=>order.indexOf(oc));
    }
    q._d = {options:newOptions, correct:newCorrect};
  } else {
    q._d = {options:q.options, correct:q.correct};
  }
  return q._d;
}

function formatExplain(text){
  // Xuống hàng giữa các câu/mệnh đề để dễ đọc: tách sau dấu chấm khi
  // theo sau là chữ hoa hoặc số (tránh tách nhầm viết tắt như "v.v." hay "e.g.").
  var parts = text.split(/(?<=\.)\s+(?=[A-Z0-9ÀÁẢÃẠĂẰẲẴẶẤẦẨẪẬÂÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ])/u);
  return parts.join('<br><br>');
}

function render(){
  const q = quizData[current];
  const isDone = answered[current] !== null;
  let html = '<div class="card">';
  html += '<div class="qnum">Câu ' + (current+1) + ' / ' + quizData.length + '</div>';
  html += '<div class="qtext">' + q.text + '</div>';
  if(q.note) html += '<div class="hint">' + q.note + '</div>';

  if(q.type === 'single' || q.type === 'multi'){
    const d = getDisplay(q);
    html += '<div id="optList">';
    d.options.forEach((opt,i)=>{
      html += '<div class="option ' + (q.type==='multi'?'multi':'') + '" data-i="'+i+'" onclick="toggleOption('+i+')"><div class="mark"></div><div class="label">'+opt+'</div></div>';
    });
    html += '</div>';
  } else if(q.type === 'tf'){
    html += '<div id="tfList">';
    q.statements.forEach((s,i)=>{
      html += '<div class="statement" data-i="'+i+'"><div class="stext">'+s.text+'</div><div class="tfbtns">'+
        '<div class="tfbtn" data-val="true" onclick="setTF('+i+',true)">True / Đúng</div>'+
        '<div class="tfbtn" data-val="false" onclick="setTF('+i+',false)">False / Sai</div>'+
        '</div></div>';
    });
    html += '</div>';
  } else if(q.type === 'match'){
    if(!q._poolDisplay) q._poolDisplay = shuffle(q.pool);
    html += '<div id="matchList">';
    q.rows.forEach((r,i)=>{
      html += '<div class="matchrow" data-i="'+i+'"><div class="desc">'+r.desc+'</div><select onchange="setMatch('+i+',this.value)"><option value="">-- chọn --</option>';
      q._poolDisplay.forEach(p=>{ html += '<option value="'+p+'">'+p+'</option>'; });
      html += '</select></div>';
    });
    html += '</div>';
  } else if(q.type === 'order'){
    if(!q._display) q._display = shuffle(q.correctOrder);
    html += '<div id="orderList">';
    q._display.forEach((text,i)=>{
      html += '<div class="orderitem" data-text="'+encodeURIComponent(text)+'"><select onchange="setOrder(this)"><option value="">#</option>';
      for(let n=1;n<=q.correctOrder.length;n++) html += '<option value="'+n+'">'+n+'</option>';
      html += '</select><div class="otext">'+text+'</div></div>';
    });
    html += '</div>';
  } else if(q.type === 'fill'){
    html += '<div id="fillList">';
    q.blanks.forEach((b,i)=>{
      if(!b._displayOptions) b._displayOptions = shuffle(b.options);
      html += '<div class="fillrow" data-i="'+i+'">'+ (b.prefix?b.prefix+' ':'') +
        '<select onchange="setFill('+i+',this.value)"><option value="">-- chọn --</option>';
      b._displayOptions.forEach(o=>{ html += '<option value="'+o+'">'+o+'</option>'; });
      html += '</select> ' + (b.suffix||'') + '</div>';
    });
    html += '</div>';
  }

  html += '<div class="explain" id="explainBox"><b>Giải thích:</b><br><br>' + formatExplain(q.explain) + '</div>';
  html += '<div class="actions">';
  html += '<button class="act btn-check" id="checkBtn" onclick="checkAnswer()">Kiểm tra</button>';
  html += '<button class="act btn-copy" onclick="copyPrompt()">📋 Copy prompt hỏi AI</button>';
  html += '</div>';
  html += '<div class="navrow"><button onclick="goPrev()" '+(current===0?'disabled':'')+'>&larr; Câu trước</button><button onclick="goNext()" '+(current===quizData.length-1?'disabled':'')+'>Câu sau &rarr;</button></div>';
  html += '</div>';

  quizArea.innerHTML = html;

  // restore state if already answered
  if(isDone){
    restoreState(q);
  }
  updateHeader();
}

function toggleOption(i){
  const q = quizData[current];
  if(answered[current] !== null) return;
  if(!userSel[current]) userSel[current] = q.type==='multi' ? new Set() : null;
  const els = document.querySelectorAll('#optList .option');
  if(q.type === 'single'){
    userSel[current] = i;
    els.forEach(e=>e.classList.remove('selected'));
    els[i].classList.add('selected');
  } else {
    if(userSel[current].has(i)) userSel[current].delete(i);
    else userSel[current].add(i);
    els[i].classList.toggle('selected');
  }
}

function setTF(i,val){
  if(answered[current] !== null) return;
  if(!userSel[current]) userSel[current] = {};
  userSel[current][i] = val;
  const stmt = document.querySelectorAll('#tfList .statement')[i];
  stmt.querySelectorAll('.tfbtn').forEach(b=>b.classList.remove('selected'));
  stmt.querySelector('.tfbtn[data-val="'+val+'"]').classList.add('selected');
}

function setMatch(i,val){
  if(!userSel[current]) userSel[current] = {};
  userSel[current][i] = val;
}

function setOrder(sel){
  if(!userSel[current]) userSel[current] = {};
  const item = sel.closest('.orderitem');
  const text = decodeURIComponent(item.getAttribute('data-text'));
  userSel[current][text] = sel.value;
}

function setFill(i,val){
  if(!userSel[current]) userSel[current] = {};
  userSel[current][i] = val;
}

function checkAnswer(){
  const q = quizData[current];
  if(answered[current] !== null) return;
  let isCorrect = false;

  if(q.type === 'single'){
    const d = getDisplay(q);
    const sel = userSel[current];
    if(sel === null || sel === undefined){ alert('Hãy chọn một đáp án.'); return; }
    isCorrect = (sel === d.correct);
    const els = document.querySelectorAll('#optList .option');
    els.forEach((e,i)=>{
      if(i === d.correct) e.classList.add('correct');
      else if(i === sel) e.classList.add('incorrect');
    });
  } else if(q.type === 'multi'){
    const d = getDisplay(q);
    const sel = userSel[current] || new Set();
    if(sel.size === 0){ alert('Hãy chọn các đáp án.'); return; }
    const correctSet = new Set(d.correct);
    isCorrect = sel.size === correctSet.size && [...sel].every(x=>correctSet.has(x));
    const els = document.querySelectorAll('#optList .option');
    els.forEach((e,i)=>{
      if(correctSet.has(i)) e.classList.add('correct');
      else if(sel.has(i)) e.classList.add('incorrect');
    });
  } else if(q.type === 'tf'){
    const sel = userSel[current] || {};
    if(Object.keys(sel).length < q.statements.length){ alert('Hãy chọn True/False cho tất cả.'); return; }
    isCorrect = true;
    const stmts = document.querySelectorAll('#tfList .statement');
    q.statements.forEach((s,i)=>{
      const userVal = sel[i];
      const ok = (userVal === s.answer);
      if(!ok) isCorrect = false;
      const btn = stmts[i].querySelector('.tfbtn[data-val="'+s.answer+'"]');
      btn.classList.add('correct');
      if(!ok){
        const wrongBtn = stmts[i].querySelector('.tfbtn[data-val="'+userVal+'"]');
        if(wrongBtn) wrongBtn.classList.add('incorrect');
      }
    });
  } else if(q.type === 'match'){
    const sel = userSel[current] || {};
    if(Object.keys(sel).length < q.rows.length){ alert('Hãy chọn cho tất cả các dòng.'); return; }
    isCorrect = true;
    const rows = document.querySelectorAll('#matchList .matchrow');
    q.rows.forEach((r,i)=>{
      const ok = sel[i] === r.correct;
      if(!ok) isCorrect = false;
      rows[i].classList.add(ok?'correct':'incorrect');
      const select = rows[i].querySelector('select');
      select.disabled = true;
      if(!ok){
        const hintSpan = document.createElement('div');
        hintSpan.style.fontSize='12px'; hintSpan.style.color='#1e8e3e'; hintSpan.style.marginTop='4px';
        hintSpan.textContent = 'Đáp án đúng: ' + r.correct;
        rows[i].appendChild(hintSpan);
      }
    });
  } else if(q.type === 'order'){
    const sel = userSel[current] || {};
    if(Object.keys(sel).length < q.correctOrder.length || Object.values(sel).some(v=>!v)){ alert('Hãy chọn số thứ tự cho tất cả.'); return; }
    isCorrect = true;
    const items = document.querySelectorAll('#orderList .orderitem');
    items.forEach(item=>{
      const text = decodeURIComponent(item.getAttribute('data-text'));
      const correctPos = q.correctOrder.indexOf(text) + 1;
      const userPos = parseInt(sel[text]);
      const ok = (userPos === correctPos);
      if(!ok) isCorrect = false;
      item.classList.add(ok?'correct':'incorrect');
      item.querySelector('select').disabled = true;
      if(!ok){
        const hintSpan = document.createElement('span');
        hintSpan.style.fontSize='12px'; hintSpan.style.color='#1e8e3e'; hintSpan.style.marginLeft='8px';
        hintSpan.textContent = '(đúng: #' + correctPos + ')';
        item.appendChild(hintSpan);
      }
    });
  } else if(q.type === 'fill'){
    const sel = userSel[current] || {};
    if(Object.keys(sel).length < q.blanks.length || Object.values(sel).some(v=>!v)){ alert('Hãy chọn cho tất cả các ô trống.'); return; }
    isCorrect = true;
    const rows = document.querySelectorAll('#fillList .fillrow');
    q.blanks.forEach((b,i)=>{
      const ok = sel[i] === b.correct;
      if(!ok) isCorrect = false;
      rows[i].classList.add(ok?'correct':'incorrect');
      rows[i].querySelector('select').disabled = true;
      if(!ok){
        const hintSpan = document.createElement('span');
        hintSpan.style.fontSize='12px'; hintSpan.style.color='#1e8e3e'; hintSpan.style.marginLeft='6px';
        hintSpan.textContent = '(đúng: ' + b.correct + ')';
        rows[i].appendChild(hintSpan);
      }
    });
  }

  answered[current] = isCorrect;
  document.getElementById('checkBtn').disabled = true;
  document.getElementById('explainBox').classList.add('show');
  const badge = document.createElement('div');
  badge.className = 'result-badge ' + (isCorrect?'ok':'no');
  badge.textContent = isCorrect ? '✔ Chính xác' : '✘ Chưa đúng';
  document.getElementById('explainBox').prepend(badge);

  updateHeader();
}

function restoreState(q){
  // disable inputs and re-apply visual state after navigating back to an answered question
  const sel = userSel[current];
  if(q.type === 'single' || q.type === 'multi'){
    const d = getDisplay(q);
    const els = document.querySelectorAll('#optList .option');
    const correctSet = new Set(Array.isArray(d.correct)?d.correct:[d.correct]);
    els.forEach((e,i)=>{
      e.onclick = null;
      const userHas = q.type==='multi' ? (sel && sel.has && sel.has(i)) : (sel===i);
      if(correctSet.has(i)) e.classList.add('correct');
      else if(userHas) e.classList.add('incorrect');
    });
  } else if(q.type === 'tf'){
    const stmts = document.querySelectorAll('#tfList .statement');
    q.statements.forEach((s,i)=>{
      stmts[i].querySelectorAll('.tfbtn').forEach(b=>b.onclick=null);
      const btn = stmts[i].querySelector('.tfbtn[data-val="'+s.answer+'"]');
      btn.classList.add('correct');
      const userVal = sel ? sel[i] : undefined;
      if(userVal !== undefined && userVal !== s.answer){
        const wrongBtn = stmts[i].querySelector('.tfbtn[data-val="'+userVal+'"]');
        if(wrongBtn) wrongBtn.classList.add('incorrect');
      }
    });
  } else if(q.type === 'match'){
    const rows = document.querySelectorAll('#matchList .matchrow');
    q.rows.forEach((r,i)=>{
      const select = rows[i].querySelector('select');
      select.disabled = true;
      if(sel && sel[i]) select.value = sel[i];
      const ok = sel && sel[i] === r.correct;
      rows[i].classList.add(ok?'correct':'incorrect');
      if(!ok){
        const hintSpan = document.createElement('div');
        hintSpan.style.fontSize='12px'; hintSpan.style.color='#1e8e3e'; hintSpan.style.marginTop='4px';
        hintSpan.textContent = 'Đáp án đúng: ' + r.correct;
        rows[i].appendChild(hintSpan);
      }
    });
  } else if(q.type === 'order'){
    const items = document.querySelectorAll('#orderList .orderitem');
    items.forEach(item=>{
      const text = decodeURIComponent(item.getAttribute('data-text'));
      const select = item.querySelector('select');
      select.disabled = true;
      if(sel && sel[text]) select.value = sel[text];
      const correctPos = q.correctOrder.indexOf(text) + 1;
      const userPos = sel ? parseInt(sel[text]) : null;
      const ok = (userPos === correctPos);
      item.classList.add(ok?'correct':'incorrect');
      if(!ok){
        const hintSpan = document.createElement('span');
        hintSpan.style.fontSize='12px'; hintSpan.style.color='#1e8e3e'; hintSpan.style.marginLeft='8px';
        hintSpan.textContent = '(đúng: #' + correctPos + ')';
        item.appendChild(hintSpan);
      }
    });
  } else if(q.type === 'fill'){
    const rows = document.querySelectorAll('#fillList .fillrow');
    q.blanks.forEach((b,i)=>{
      const select = rows[i].querySelector('select');
      select.disabled = true;
      if(sel && sel[i]) select.value = sel[i];
      const ok = sel && sel[i] === b.correct;
      rows[i].classList.add(ok?'correct':'incorrect');
      if(!ok){
        const hintSpan = document.createElement('span');
        hintSpan.style.fontSize='12px'; hintSpan.style.color='#1e8e3e'; hintSpan.style.marginLeft='6px';
        hintSpan.textContent = '(đúng: ' + b.correct + ')';
        rows[i].appendChild(hintSpan);
      }
    });
  }
  document.getElementById('checkBtn').disabled = true;
  document.getElementById('explainBox').classList.add('show');
  const badge = document.createElement('div');
  badge.className = 'result-badge ' + (answered[current]?'ok':'no');
  badge.textContent = answered[current] ? '✔ Chính xác' : '✘ Chưa đúng';
  document.getElementById('explainBox').prepend(badge);
}

function buildPromptText(q){
  let body = 'Giải thích ngắn gọn, dễ hiểu bằng tiếng Việt câu hỏi AI-103 sau — vì sao đáp án đúng là đúng và các lựa chọn khác sai ở đâu:\n\n';
  body += q.text + '\n';

  if(q.type === 'single' || q.type === 'multi'){
    const d = getDisplay(q);
    d.options.forEach((opt,i)=>{ body += String.fromCharCode(65+i) + '. ' + opt + '\n'; });
    const correctArr = Array.isArray(d.correct) ? d.correct : [d.correct];
    body += 'Đáp án đúng: ' + correctArr.map(i=>String.fromCharCode(65+i)).join(', ') + '\n';
  } else if(q.type === 'tf'){
    q.statements.forEach((s,i)=>{
      body += (i+1) + '. ' + s.text + ' → ' + (s.answer?'True':'False') + '\n';
    });
  } else if(q.type === 'match'){
    q.rows.forEach((r,i)=>{
      body += (i+1) + '. ' + r.desc + ' → ' + r.correct + '\n';
    });
  } else if(q.type === 'order'){
    q.correctOrder.forEach((s,i)=>{
      body += (i+1) + '. ' + s + '\n';
    });
  } else if(q.type === 'fill'){
    q.blanks.forEach((b,i)=>{
      body += (i+1) + '. ' + (b.prefix||'') + ' ___ ' + (b.suffix||'') + ' → ' + b.correct + '\n';
    });
  }

  return body;
}

function copyPrompt(){
  const q = quizData[current];
  const text = buildPromptText(q);
  const doToast = ()=>{
    const toast = document.getElementById('copyToast');
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'), 1800);
  };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(doToast).catch(()=>fallbackCopy(text, doToast));
  } else {
    fallbackCopy(text, doToast);
  }
}

function fallbackCopy(text, cb){
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try{ document.execCommand('copy'); }catch(e){}
  document.body.removeChild(ta);
  if(cb) cb();
}

function goPrev(){ if(current>0){ current--; render(); } }
function goNext(){ if(current<quizData.length-1){ current++; render(); } }

function openSidebar(){
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('open');
}
function closeSidebar(){
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

buildJumpGrid();
render();
