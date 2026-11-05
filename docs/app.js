(() => {
  const $ = id => document.getElementById(id);
  const world = $('world'), plane = $('plane'), panel = $('inspector'), content = $('panel-content');
  const projects = {
    observatory: { number:'01', category:'THE RESEARCH OBSERVATORY', symbol:'✦', title:'Follow the question.', description:'This is the research corner of my universe: machine learning, quantum computing, and security. A place to learn the underlying ideas, run experiments, and ask what the evidence actually supports.', note:'The most useful result is the one that teaches you what to question next.', tags:['Machine learning','Quantum computing','Security'], label:'Explore my repositories', url:'https://github.com/ishankpandey7?tab=repositories' },
    workshop: { number:'02', category:'THE WORKSHOP / JARVIS', symbol:'⌘', title:'Small tools. Real usefulness.', description:'JARVIS is a voice assistant for a Windows laptop: opening apps, finding files, setting reminders, and helping with everyday tasks. An experiment in making software respond to the way people actually ask for things.', note:'Useful actions, understandable behavior, and explicit user control.', tags:['Python','Voice interface','Desktop automation'], label:'Explore JARVIS', url:'https://github.com/ishankpandey7/jarvis-voice-assistant' },
    flight: { number:'03', category:'THE FLIGHT DECK / TELEMETRY', symbol:'↗', title:'Listen before the failure.', description:'Drone Flight Safety Monitor explores whether flight telemetry can reveal early signs of motor, battery, and sensor problems. The work focuses on anomaly detection, warning time, and careful evaluation on flight logs.', note:'How early can a stream of measurements tell us that something is going wrong?', tags:['Python','Anomaly detection','Flight telemetry'], label:'Read the research & code', url:'https://github.com/ishankpandey7/drone-flight-safety-monitor', secondary:'Open the flight demo', secondaryUrl:'https://drone-flight-safety-monitor.vercel.app' },
    garden: { number:'04', category:'THE IDEA GARDEN / MYVERSE', symbol:'✳', title:'Give an idea somewhere to grow.', description:'MyVerse is a personal world where saved ideas become missions, and everyday progress brings an island to life. It explores 3D environments, interaction design, and keeping local progress safe.', note:'A little playfulness can make everyday software feel more human.', tags:['TypeScript','React','Three.js'], label:'Explore MyVerse', url:'https://github.com/ishankpandey7/myverse' }
  };
  const escape = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let opener = null;
  function show(html) {
    if (!panel.open) opener = document.activeElement;
    content.innerHTML = html;
    if (!panel.open) panel.showModal();
    $('close-panel').focus();
  }
  function openPlace(id) {
    const p = projects[id];
    if (!p) return;
    show(`<button class="panel-back" data-all-projects>← All places</button><p class="panel-kicker">${p.category}</p><div class="panel-icon" aria-hidden="true">${p.symbol}</div><h2 id="panel-title" class="panel-title">${p.title}</h2><p class="panel-description">${p.description}</p><p class="panel-note">${p.note}</p><div class="tags">${p.tags.map(t=>`<span class="tag">${escape(t)}</span>`).join('')}</div><a class="panel-action" href="${p.url}" target="_blank" rel="noopener noreferrer">${p.label}<span aria-hidden="true">&rsaquo;</span></a>${p.secondary?`<a class="panel-action secondary" href="${p.secondaryUrl}" target="_blank" rel="noopener noreferrer">${p.secondary}<span aria-hidden="true">&rsaquo;</span></a>`:''}`);
  }
  function showProjects() {
    const names = {flight:'Drone Flight Safety Monitor',workshop:'JARVIS',garden:'MyVerse',observatory:'Research interests'};
    show(`<p class="panel-kicker">THE FIELD NOTES</p><h2 id="panel-title" class="panel-title">Choose a place to begin.</h2><p class="panel-description">Projects, experiments, and the questions behind them. Every destination is also available here without moving the camera.</p><div class="project-list">${['flight','workshop','garden','observatory'].map((id,i)=>`<button data-place="${id}"><span>0${i+1}</span><div><strong>${names[id]}</strong><small>${projects[id].tags.join(' · ')}</small></div><span aria-hidden="true">&rsaquo;</span></button>`).join('')}</div>`);
  }
  function about() {
    show(`<p class="panel-kicker">MEET THE EXPLORER</p><h2 id="panel-title" class="panel-title">Hello, I'm Ishank.</h2><p class="panel-description">I build practical tools and explore the ideas behind them. My work ranges from drone telemetry and desktop assistants to interactive worlds, with a growing interest in quantum computing and security.</p><p class="panel-note">A good question. A small working prototype. Evidence that tells me what to improve next.</p><div class="tags"><span class="tag">Python</span><span class="tag">TypeScript</span><span class="tag">React</span><span class="tag">Three.js</span></div><a class="panel-action" href="https://github.com/ishankpandey7" target="_blank" rel="noopener noreferrer">Find me on GitHub <span aria-hidden="true">&rsaquo;</span></a><p class="muted">Questions and thoughtful feedback are welcome in the relevant project's issues.</p>`);
  }
  document.addEventListener('click', e => {
    const place = e.target.closest('[data-place]');
    if(place && !suppressClick) {
      if(window.portfolio3d && place.closest('.places')) window.portfolio3d.travel(place.dataset.place,()=>openPlace(place.dataset.place));
      else openPlace(place.dataset.place);
    }
    if(e.target.closest('[data-all-projects]')) showProjects();
  });
  $('projects').addEventListener('click',showProjects);
  $('about').addEventListener('click',about);
  $('about-bottom').addEventListener('click',about);
  $('close-panel').addEventListener('click',()=>panel.close());
  panel.addEventListener('click',e=>{if(e.target===panel){const r=panel.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)panel.close();}});
  panel.addEventListener('close',()=>{opener?.focus({preventScroll:true});});
  $('help').addEventListener('click',()=>show(`<p class="panel-kicker">A QUICK ORIENTATION</p><h2 id="panel-title" class="panel-title">Make yourself at home.</h2><ul class="help-list"><li>Click a place to walk there and open its project. Click a walkway to move without opening a panel.</li><li>Drag to orbit the camera. Right-drag or two fingers pan it.</li><li>Use <kbd>W A S D</kbd> or arrow keys to walk. <kbd>E</kbd> opens the nearest destination.</li><li>Use the camera buttons, wheel, or two-finger pinch to zoom.</li><li>Use <kbd>Tab</kbd> and <kbd>Enter</kbd> to select a place. <kbd>Escape</kbd> closes a panel; the crosshair resets the camera.</li><li>The Projects menu provides every destination without walking.</li></ul><p class="muted">This is a real 3D browser prototype with a walking character. On devices without WebGL2, it falls back to an illustrated map. Reduced-motion mode skips walking transitions.</p>`));

  let x=0,y=0,zoom=1,drag=null,suppressClick=false;
  function bounds(){return {x:Math.max(70,(plane.offsetWidth*zoom-world.clientWidth)/2+65),y:Math.max(70,(plane.offsetHeight*zoom-world.clientHeight)/2+85)};}
  function render(){if(window.portfolio3d)return;const b=bounds();x=Math.max(-b.x,Math.min(b.x,x));y=Math.max(-b.y,Math.min(b.y,y));plane.style.setProperty('--pan-x',`${x}px`);plane.style.setProperty('--pan-y',`${y}px`);plane.style.setProperty('--zoom',zoom);$('zoom-label').textContent=`${Math.round(zoom*100)}%`;$('zoom-in').disabled=zoom>=1.65;$('zoom-out').disabled=zoom<=.85;}
  function setZoom(z){if(window.portfolio3d){window.portfolio3d.zoom(z>zoom?1:-1);return;}zoom=Math.max(.85,Math.min(1.65,Math.round(z*100)/100));render();}
  function reset(){if(window.portfolio3d){window.portfolio3d.reset();return;}x=0;y=0;zoom=1;render();}
  $('zoom-in').addEventListener('click',()=>setZoom(zoom+.1));$('zoom-out').addEventListener('click',()=>setZoom(zoom-.1));$('reset').addEventListener('click',reset);$('explore').addEventListener('click',reset);
  document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();reset();});
  world.addEventListener('pointerdown',e=>{if(window.portfolio3d||e.button!==0||e.target.closest('button'))return;drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,x,y,moved:false};world.setPointerCapture(e.pointerId);world.classList.add('dragging');});
  world.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.startX,dy=e.clientY-drag.startY;drag.moved ||= Math.hypot(dx,dy)>5;x=drag.x+dx;y=drag.y+dy;render();});
  function release(e){if(!drag||e.pointerId!==drag.id)return;suppressClick=drag.moved;drag=null;world.classList.remove('dragging');if(world.hasPointerCapture(e.pointerId))world.releasePointerCapture(e.pointerId);setTimeout(()=>{suppressClick=false;},0);}
  world.addEventListener('pointerup',release);world.addEventListener('pointercancel',release);
  world.addEventListener('wheel',e=>{if(window.portfolio3d||panel.open||e.ctrlKey)return;e.preventDefault();setZoom(zoom+(e.deltaY<0?.05:-.05));},{passive:false});
  world.addEventListener('keydown',e=>{if(window.portfolio3d||panel.open)return;const moves={ArrowLeft:[45,0],ArrowRight:[-45,0],ArrowUp:[0,45],ArrowDown:[0,-45]};if(moves[e.key]){e.preventDefault();x+=moves[e.key][0];y+=moves[e.key][1];render();}else if(e.key==='Home'){e.preventDefault();reset();}});
  document.querySelectorAll('.places .place').forEach(button=>button.addEventListener('focus',()=>{if(window.portfolio3d)return;const a=button.getBoundingClientRect(),r=world.getBoundingClientRect();const margin=30;if(a.left<r.left+margin)x+=r.left+margin-a.left;if(a.right>r.right-margin)x-=a.right-(r.right-margin);if(a.top<r.top+90)y+=r.top+90-a.top;if(a.bottom>r.bottom-130)y-=a.bottom-(r.bottom-130);render();}));
  window.openPortfolioPlace=openPlace;
  document.querySelector('.world-art').addEventListener('error',()=>document.querySelector('.experience').classList.add('fallback'));
  window.addEventListener('resize',render);
  render();
})();
