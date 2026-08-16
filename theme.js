/* =========================================================
   AI-103 Quiz — Shared theme toggle (light/dark)
   Used by index.html and every quiz-N.html.
   Preference is stored in localStorage under 'ai103-theme'
   so it persists across visits and across future deployments.
   ========================================================= */
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  try{ localStorage.setItem('ai103-theme', theme); }catch(e){}
  const btn = document.getElementById('themeToggle');
  if(btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme(){
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

(function initTheme(){
  let saved = null;
  try{ saved = localStorage.getItem('ai103-theme'); }catch(e){}
  if(saved === 'dark' || saved === 'light'){
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
})();
