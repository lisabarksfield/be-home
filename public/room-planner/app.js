import {ROOMS,CATALOG,clampItem,placementIssues,validateProject,autoPlace} from './model.js';
import {PRESETS} from './presets.js';
import {History,escapeXml as xml} from './state.js';
import {LOGO} from './brand.js';
const $=id=>document.getElementById(id), KEY='behome-room-planner-v1';
const clone=v=>structuredClone(v), labelFor=kind=>CATALOG.find(x=>x.kind===kind).label;
const defaultState=()=>({roomId:'studio',plans:Object.fromEntries(ROOMS.map(r=>[r.id,{items:r.id==='studio'?validateProject({version:1,roomId:r.id,items:PRESETS[1].items}).items:[],name:r.id==='studio'?PRESETS[1].title:'Your layout'}]))});
let state=defaultState(), selected=null, drag=null, toastTimer, storageAvailable=true;
try {
  const raw=localStorage.getItem(KEY);
  if(raw){if(raw.length>600000) throw Error('Stored plan is too large.');const parsed=JSON.parse(raw);
    if(!ROOMS.some(r=>r.id===parsed.roomId)) throw Error('Invalid saved room.');
    for(const r of ROOMS){const p=parsed.plans?.[r.id];state.plans[r.id]={items:validateProject({version:1,roomId:r.id,items:p?.items}).items,name:typeof p?.name==='string'?p.name.slice(0,80):'Your layout'};}
    state.roomId=parsed.roomId;
  }
} catch {state=defaultState();storageAvailable=false;}
const roomParam=new URLSearchParams(location.search).get('room');
if(roomParam&&ROOMS.some(r=>r.id===roomParam))state.roomId=roomParam;
const history=new History(state), svg=$('plan');
const room=()=>ROOMS.find(r=>r.id===state.roomId), plan=()=>state.plans[state.roomId], items=()=>plan().items;
const item=()=>items().find(i=>i.id===selected), uid=()=>`piece-${crypto.randomUUID?.()||Math.random().toString(36).slice(2)}`;
function toast(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3800);}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));storageAvailable=true;}catch{storageAvailable=false;}$('save-state').textContent=storageAvailable?'Saved on this device':'Use Save plan to keep edits';}
function commit(custom=true){if(custom)plan().name='Your layout';history.push(state);save();render();}
function changeItem(edit){if(!item())return;Object.assign(item(),edit);item().angle_deg=((item().angle_deg%360)+360)%360;commit();}
function moveItem(edit){if(!item())return;Object.assign(item(),clampItem({...item(),...edit},state.roomId));commit();}
const rounded=n=>Math.round(n*100)/100;

function pieceBody(i){
  const w=i.w,d=i.d,x=-w/2,y=-d/2;
  const rect=(rx,ry,rw,rh,fill,rad=.04)=>`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" rx="${rad}" fill="${fill}"/>`;
  const line=(x1,y1,x2,y2)=>`<path d="M${x1},${y1}L${x2},${y2}" fill="none" stroke="#657759" stroke-width=".025"/>`;
  if(i.kind==='chair')return rect(x,y,w,d,'#a8b89b',.06)+rect(x,y,w,d*.2,'#657759',.05)+line(x+.06,y+d*.85,x+w-.06,y+d*.85);
  if(i.kind==='poseur')return `<ellipse rx="${w/2}" ry="${d/2}" fill="#e8e0d5" stroke="#a89880" stroke-width=".025"/><ellipse rx="${w*.09}" ry="${d*.09}" fill="#a89880"/>`;
  if(i.kind==='person')return `<ellipse rx="${w/2}" ry="${d/2}" fill="#c9bfb2"/><ellipse cy="${-d*.09}" rx="${w*.19}" ry="${d*.19}" fill="#8e8172"/>`;
  if(i.kind==='table')return rect(x,y,w,d,'#e8e0d5',.04)+`<rect x="${x+.035}" y="${y+.035}" width="${Math.max(.02,w-.07)}" height="${Math.max(.02,d-.07)}" rx=".025" fill="none" stroke="#a89880" stroke-width=".015"/>`;
  if(i.kind==='reformer')return rect(x,y,w,d,'#c9bfb2',.07)+rect(x+w*.13,y+d*.12,w*.74,d*.61,'#8b9e7b',.05)+line(x+w*.15,y+d*.88,x+w*.85,y+d*.88)+rect(x+w*.28,y+d*.04,w*.44,d*.07,'#657759',.02);
  if(i.kind==='massage')return rect(x,y,w,d,'#a8b89b',.1)+`<ellipse cy="${y+d*.16}" rx="${w*.13}" ry="${d*.055}" fill="#faf7f2"/>`+line(x+.04,y+d*.35,x+w-.04,y+d*.35);
  if(i.kind==='sofa')return rect(x,y,w,d,'#8b9e7b',.1)+rect(x+w*.08,y+d*.25,w*.84,d*.64,'#b4c0aa',.06)+line(0,y+d*.27,0,y+d*.86);
  const color=i.kind==='instructor_mat'?'#edff00':'#8b9e7b';
  return rect(x,y,w,d,color,.065)+`<rect x="${x+.055}" y="${y+.055}" width="${Math.max(.01,w-.11)}" height="${Math.max(.01,d-.11)}" rx=".035" fill="none" stroke="#596b50" stroke-width=".012" opacity=".6"/>`;
}
function pieceMarkup(i,warnings,exporting=false){
 const chosen=!exporting&&i.id===selected,bad=warnings.has(i.id),name=i.label||labelFor(i.kind);
 const outline=`<rect class="focus-outline ${chosen?'selection-mark':''}" x="${-i.w/2-.045}" y="${-i.d/2-.045}" width="${i.w+.09}" height="${i.d+.09}" rx=".06" fill="none" stroke="${bad?'#a34f37':chosen?'#2c2825':'transparent'}" stroke-width="${chosen?.035:.025}" ${chosen?'stroke-dasharray=".08 .035"':''}/>`;
 return `<g class="furniture" data-id="${xml(i.id)}" transform="translate(${i.x} ${i.y}) rotate(${i.angle_deg})" ${exporting?'':`role="button" tabindex="0" aria-label="${xml(name)}. X ${i.x.toFixed(2)}, Y ${i.y.toFixed(2)} metres." aria-pressed="${chosen}"`}><title>${xml(name)} · ${i.w.toFixed(2)} × ${i.d.toFixed(2)} m</title>${pieceBody(i)}${outline}</g>`;
}
function contents(exporting=false){
 const r=room(),issues=placementIssues(items(),r.id),warnings=new Set(issues.flatMap(i=>i.ids));
 const showGrid=$('grid').checked,showRoutes=$('routes').checked;
 let markup=`<defs><pattern id="grid-pattern" width=".5" height=".5" patternUnits="userSpaceOnUse"><path d="M.5 0H0V.5" fill="none" stroke="#e8e0d5" stroke-width=".01"/></pattern><pattern id="route-pattern" width=".16" height=".16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line y2=".16" stroke="#d9dece" stroke-width=".02"/></pattern><clipPath id="room-clip"><polygon points="${r.polygon.map(p=>p.join(',')).join(' ')}"/></clipPath></defs>`;
 markup+=`<rect x="-1" y="-1.25" width="${r.width+2}" height="${r.height+2.4}" fill="#faf7f2"/>${LOGO}<text x="${r.width}" y="-.79" text-anchor="end" font-family="Arial,sans-serif" font-size=".14" letter-spacing=".025" fill="#70685f">${xml(r.name.toUpperCase())} · ${r.area.toFixed(1)} m²</text>`;
 markup+=`<polygon points="${r.polygon.map(p=>p.join(',')).join(' ')}" fill="#fffdf9"/>`;
 if(showGrid)markup+=`<rect width="${r.width}" height="${r.height}" fill="url(#grid-pattern)" clip-path="url(#room-clip)"/>`;
 if(showRoutes)for(const z of r.accessZones)markup+=`<rect x="${z.x}" y="${z.y}" width="${z.w}" height="${z.d}" fill="url(#route-pattern)"/>`;
 if(showRoutes&&r.id==='studio')markup+=`<text x=".52" y="5.1" transform="rotate(-90 .52 5.1)" text-anchor="middle" font-family="Arial,sans-serif" font-size=".12" letter-spacing=".025" fill="#8c987f">1 M CLEAR ROUTE</text><text x="2.8" y="9.43" text-anchor="middle" font-family="Arial,sans-serif" font-size=".12" letter-spacing=".02" fill="#8c987f">KEEP ENTRY CLEAR</text>`;
 markup+=`<polygon points="${r.polygon.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#2c2825" stroke-width=".07" stroke-linejoin="round"/>`;
 if(r.id==='studio'){
  for(const [a,b]of[[1.18,2.1],[4.89,5.78]])markup+=`<path d="M${a} 0H${b}" stroke="#faf7f2" stroke-width=".09"/><path d="M${a} -.025H${b}M${a} .025H${b}" stroke="#a89880" stroke-width=".012"/>`;
  markup+=`<path d="M0 7.53V8.36" stroke="#faf7f2" stroke-width=".09"/><path d="M-.025 7.53V8.36M.025 7.53V8.36" stroke="#a89880" stroke-width=".012"/>`;
  markup+=`<path d="M0 1.8V2.64M4.42 10.04H5.99" stroke="#faf7f2" stroke-width=".095"/><path d="M0 1.8H.84 A.84 .84 0 0 1 0 2.64M4.42 10.04V9.255 A.785 .785 0 0 1 5.205 10.04 A.785 .785 0 0 1 5.99 9.255 V10.04" fill="none" stroke="#a89880" stroke-width=".018"/>`;
 }
 markup+=`<g stroke="#a89880" stroke-width=".012" fill="none"><path d="M0 -.37H${r.width}M0 -.44V-.3M${r.width} -.44V-.3M-.4 0V${r.height}M-.47 0H-.33M-.47 ${r.height}H-.33"/></g><rect x="${r.width/2-.45}" y="-.49" width=".9" height=".22" fill="#faf7f2"/><text x="${r.width/2}" y="-.32" text-anchor="middle" font-family="Arial,sans-serif" font-size=".15" fill="#70685f">${r.width.toFixed(2)} m</text><text x="-.55" y="${r.height/2}" transform="rotate(-90 -.55 ${r.height/2})" text-anchor="middle" font-family="Arial,sans-serif" font-size=".15" fill="#70685f">${r.height.toFixed(2)} m</text>`;
 markup+=items().map(i=>pieceMarkup(i,warnings,exporting)).join('');
 markup+=`<text x="0" y="${r.height+.49}" font-family="Arial,sans-serif" font-size=".16" fill="#2c2825">${xml(plan().name)}</text><path d="M0 ${r.height+.79}H1M0 ${r.height+.74}V${r.height+.84}M1 ${r.height+.74}V${r.height+.84}" stroke="#2c2825" stroke-width=".02"/><text x="1.12" y="${r.height+.83}" font-family="Arial,sans-serif" font-size=".12" fill="#70685f">1 m</text><text x="${r.width}" y="${r.height+.83}" text-anchor="end" font-family="Arial,sans-serif" font-size=".11" fill="#70685f">APPROXIMATE PLANNING LAYOUT</text>`;
 return markup;
}
function renderPlan(){const r=room();svg.setAttribute('viewBox',`-1 -1.25 ${r.width+2} ${r.height+2.4}`);svg.innerHTML=contents();}
function renderInspector(){
 const i=item();$('item-form').hidden=!i;$('empty-selection').hidden=!!i;
 $('object-picker').innerHTML='<option value="">Choose a piece</option>'+items().map((v,n)=>`<option value="${xml(v.id)}">${n+1}. ${xml(v.label||labelFor(v.kind))}</option>`).join('');$('object-picker').value=selected||'';$('object-picker').disabled=!items().length;
 if(i){$('item-kind').textContent=labelFor(i.kind);$('item-label').value=i.label||labelFor(i.kind);for(const p of ['w','d','x','y'])$('item-'+p).value=rounded(i[p]);$('item-angle').value=rounded(i.angle_deg);$('item-w').max=room().width*2;$('item-d').max=room().height*2;}
}
function render(){
 if(selected&&!item())selected=null;
 for(const b of $('rooms').children)b.setAttribute('aria-pressed',b.dataset.room===state.roomId);
 const isStudio=state.roomId==='studio';$('preset').innerHTML=(isStudio?PRESETS:[{id:'empty',title:'Empty room'}]).map(p=>`<option value="${p.id}">${xml(p.title)}</option>`).join('')+'<option value="custom" hidden>Your layout</option>';
 $('preset').value=isStudio?(PRESETS.find(p=>p.title===plan().name)?.id||'custom'):(items().length?'custom':'empty');
 $('preset-help').textContent=isStudio?'Change any layout to suit your event.':'Build your layout from the pieces below.';
 $('room-caption').textContent=`${room().name} · ${room().width.toFixed(2)} × ${room().height.toFixed(2)} m`;
 $('room-description').textContent=room().description;
 $('routes').disabled=!room().accessZones.length;
 $('undo').disabled=!history.canUndo;$('redo').disabled=!history.canRedo;
 $('object-count').textContent=items().length;
 const tally={};for(const i of items())tally[i.kind]=(tally[i.kind]||0)+1;
 $('count-detail').textContent=Object.entries(tally).map(([k,n])=>`${n} ${labelFor(k).toLowerCase()}${n!==1?'s':''}`).join(' · ')||'An open space. A fresh start.';
 const issues=placementIssues(items(),state.roomId),status=$('placement-status');status.classList.toggle('has-issues',!!issues.length);
 status.textContent=issues.length?`${issues.length} placement ${issues.length===1?'note':'notes'} to review`:'No footprint conflicts';
 $('issues').replaceChildren();
 const messages=[...new Set(issues.map(x=>x.message))];
 if(!issues.length)messages.push(room().accessZones.length?'Marked routes are clear.':'Check door and access space in this room.');
 for(const m of messages){const li=document.createElement('li');li.textContent=m;$('issues').append(li);}
 $('issues').style.color=issues.length?'var(--clay)':'var(--muted)';
 renderPlan();renderInspector();
}
function setup(){
 for(const r of ROOMS){const b=document.createElement('button');b.type='button';b.className='room-tab';b.dataset.room=r.id;b.innerHTML=`<strong>${r.name==='Treatment'?'Treatment room':r.name}</strong><span>${r.area.toFixed(1)} m²</span>`;b.onclick=()=>{if(state.roomId===r.id)return;state.roomId=r.id;selected=null;commit(false);};$('rooms').append(b);}
 for(const c of CATALOG){const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Add '+c.label.toLowerCase());b.innerHTML=`<svg aria-hidden="true" viewBox="${-c.w*.65} ${-c.d*.65} ${c.w*1.3} ${c.d*1.3}">${pieceBody(c)}</svg><span>${c.label}</span>`;b.onclick=()=>{const i=autoPlace(c.kind,items(),state.roomId,uid());if(!i){toast('No clear space found. Move or remove a piece first.');return;}items().push(i);selected=i.id;commit();toast(c.label+' added');};$('catalog').append(b);}
 $('preset').onchange=()=>{const p=PRESETS.find(x=>x.id===$('preset').value);if(!p)return;plan().items=state.roomId==='studio'?validateProject({version:1,roomId:'studio',items:p.items}).items:[];plan().name=state.roomId==='studio'?p.title:'Your layout';selected=null;commit(false);toast('Layout loaded. Undo restores your previous plan.');};
 $('undo').onclick=()=>{state=history.undo();selected=null;save();render();};$('redo').onclick=()=>{state=history.redo();selected=null;save();render();};
 for(const id of ['grid','routes'])$(id).onchange=renderPlan;
 $('item-form').onsubmit=e=>e.preventDefault();
 $('object-picker').onchange=()=>{selected=$('object-picker').value||null;renderInspector();renderPlan();};
 $('item-label').onchange=()=>{if(!item())return;const value=$('item-label').value.trim();if(value===(item().label||labelFor(item().kind)))return;changeItem({label:value});};
 for(const p of ['w','d','x','y','angle'])$('item-'+p).onchange=()=>{
  if(!item())return;
  const input=$('item-'+p),v=input.valueAsNumber,prop=p==='angle'?'angle_deg':p;
  if(v===rounded(item()[prop]))return;
  if(!Number.isFinite(v)||(p==='w'||p==='d')&&v<.1){toast('Enter a valid size or position.');renderInspector();return;}
  try{const changed=validateProject({version:1,roomId:state.roomId,items:[{...item(),[prop]:v}]}).items[0];Object.assign(item(),clampItem(changed,state.roomId));commit();}catch(e){toast(e.message);renderInspector();}
 };
 for(const id of ['item-label','item-w','item-d','item-x','item-y','item-angle'])$(id).onblur=$(id).onchange;
 $('rotate-left').onclick=()=>moveItem({angle_deg:(item().angle_deg+345)%360});$('rotate-right').onclick=()=>moveItem({angle_deg:(item().angle_deg+15)%360});
 $('remove').onclick=()=>{plan().items=items().filter(i=>i.id!==selected);selected=null;commit();};
 $('duplicate').onclick=()=>{if(!item())return;if(items().length>=200){toast('This plan has reached the 200-piece limit.');return;}const i=clampItem({...clone(item()),id:uid(),x:item().x+.35,y:item().y+.35},state.roomId);items().push(i);selected=i.id;commit();toast('Piece duplicated. Move it into place.');};
 $('save-json').onclick=()=>download(new Blob([JSON.stringify({version:1,roomId:state.roomId,items:items()},null,2)],{type:'application/json'}),filename('json'));
 $('load-json').onclick=()=>$('file-input').click();
 $('file-input').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>250000)throw Error('Choose a plan file smaller than 250 KB.');const p=validateProject(JSON.parse(await f.text()));state.roomId=p.roomId;state.plans[p.roomId]={items:p.items,name:'Your layout'};selected=null;commit();toast('Your plan is open.');}catch(err){toast('Could not open plan: '+err.message);}finally{e.target.value='';}};
 $('export-svg').onclick=()=>download(new Blob([exportSvg()],{type:'image/svg+xml;charset=utf-8'}),filename('svg'));
 $('export-png').onclick=exportPng;
 $('print').onclick=()=>window.print();
}
function point(e){const matrix=svg.getScreenCTM();return matrix?new DOMPoint(e.clientX,e.clientY).matrixTransform(matrix.inverse()):{x:0,y:0};}
svg.addEventListener('pointerdown',e=>{
 const g=e.target.closest?.('[data-id]');
 if(!g){selected=null;renderInspector();renderPlan();return;}
 e.preventDefault();selected=g.dataset.id;const p=point(e),i=item();
 drag={id:e.pointerId,x:p.x,y:p.y,original:clone(i),moved:false};svg.setPointerCapture(e.pointerId);renderInspector();renderPlan();svg.focus({preventScroll:true});
});
svg.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId||!item())return;const p=point(e),dx=p.x-drag.x,dy=p.y-drag.y;if(Math.hypot(dx,dy)<.02&&!drag.moved)return;drag.moved=true;
 let x=drag.original.x+dx,y=drag.original.y+dy;if($('snap').checked){x=Math.round(x*10)/10;y=Math.round(y*10)/10;}
 Object.assign(item(),clampItem({...item(),x,y},state.roomId));renderPlan();
});
function endDrag(e){if(!drag||drag.id!==e.pointerId)return;const moved=drag.moved;drag=null;if(svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId);if(moved)commit();else render();}
svg.addEventListener('pointerup',endDrag);
function cancelDrag(){if(!drag)return;const old=drag;drag=null;const target=items().find(i=>i.id===old.original.id);if(target)Object.assign(target,old.original);if(svg.hasPointerCapture(old.id))svg.releasePointerCapture(old.id);render();}
svg.addEventListener('pointercancel',cancelDrag);
svg.addEventListener('lostpointercapture',cancelDrag);
svg.addEventListener('keydown',e=>{const g=e.target.closest?.('[data-id]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();selected=g.dataset.id;render();svg.focus({preventScroll:true});}});
document.addEventListener('keydown',e=>{
 if(e.target.closest('input,select,textarea,[contenteditable]'))return;
 if(drag)cancelDrag();
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='z'){e.preventDefault();(e.shiftKey?$('redo'):$('undo')).click();return;}
 if(!item())return;
 if(e.key==='Escape'){selected=null;render();return;}
 if(['Delete','Backspace'].includes(e.key)){e.preventDefault();$('remove').click();return;}
 if(e.key.toLowerCase()==='r'&&!e.metaKey&&!e.ctrlKey){e.preventDefault();moveItem({angle_deg:(item().angle_deg+(e.shiftKey?345:15))%360});return;}
 const delta={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];
 if(delta){e.preventDefault();const step=e.shiftKey?1:.1;moveItem({x:item().x+delta[0]*step,y:item().y+delta[1]*step});}
});
function filename(ext){return `be-home-${state.roomId}-plan.${ext}`;}
function exportSvg(){const r=room();return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="${Math.round(1600*(r.height+2.4)/(r.width+2))}" viewBox="-1 -1.25 ${r.width+2} ${r.height+2.4}"><title>Be Home ${xml(r.name)} layout</title><desc>Approximate planning layout. Area ${r.area.toFixed(1)} square metres. Furniture footprints only; verify access and measurements.</desc>${contents(true)}</svg>`;}
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
async function exportPng(){const button=$('export-png');button.disabled=true;const url=URL.createObjectURL(new Blob([exportSvg()],{type:'image/svg+xml;charset=utf-8'}));
 try{const img=new Image();img.src=url;await img.decode();const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;canvas.getContext('2d').drawImage(img,0,0);const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('Image export failed.')),'image/png'));download(blob,filename('png'));toast('Your plan image is ready.');}catch{toast('Image export is unavailable. Download the vector SVG instead.');}finally{URL.revokeObjectURL(url);button.disabled=false;}
}
setup();save();render();

if(new URLSearchParams(location.search).get('embed')==='1'){
 document.body.classList.add('embedded');
 const postHeight=()=>parent.postMessage({type:'behome-planner:resize',height:Math.ceil(document.body.scrollHeight)},location.origin);
 new ResizeObserver(postHeight).observe(document.body);
 window.addEventListener('message',e=>{if(e.origin===location.origin&&e.data?.type==='behome-planner:request-resize')postHeight();});
}
