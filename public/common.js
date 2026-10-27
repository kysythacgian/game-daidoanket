const $=s=>document.querySelector(s);
const NM={bac:"MIỀN BẮC",trung:"MIỀN TRUNG",nam:"MIỀN NAM"},COL={bac:"#e0679a",trung:"#e8872a",nam:"#2d8fd0"};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
let S=null,OFF=0;
/* ===== Kết nối thời gian thực (WebSocket -> Durable Object) ===== */
let ws=null,wsReady=null,RID=0;const PEND={},LIS=[];
function wsConnect(){
 if(wsReady)return wsReady;
 return wsReady=new Promise((res,rej)=>{
  const w=new WebSocket((location.protocol=="https:"?"wss://":"ws://")+location.host+"/ws");let ok=false;
  w.onopen=()=>{ok=true;ws=w;res(w)};
  w.onmessage=e=>{if(e.data==="pong")return;let m;try{m=JSON.parse(e.data)}catch(x){return}
   if(m.now)OFF=m.now-Date.now();
   if(m.rid&&PEND[m.rid]){PEND[m.rid](m);delete PEND[m.rid]}else if(m.players){S=m;LIS.forEach(f=>{try{f()}catch(x){}})}};
  w.onclose=()=>{if(ws===w)ws=null;wsReady=null;if(!ok)rej(new Error("ws"));setTimeout(()=>wsConnect().catch(()=>{}),1500)}})}
setInterval(()=>{if(ws&&ws.readyState==1)ws.send("ping")},25000);
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&(!ws||ws.readyState!=1)){wsReady=null;wsConnect().catch(()=>{})}});
async function api(a,p={}){const w=await wsConnect(),o={a},rid=++RID;
 for(const k in p)o[k]=String(p[k]);o.rid=rid;
 return new Promise((res,rej)=>{PEND[rid]=res;setTimeout(()=>{if(PEND[rid]){delete PEND[rid];rej(new Error("timeout"))}},10000);w.send(JSON.stringify(o))})}
/* Không còn hỏi dò: máy chủ tự đẩy trạng thái mới cho mọi thiết bị */
function poll(cb,ms=500){LIS.push(cb);wsConnect().catch(()=>{});
 /* Gọi lại cb định kỳ (chỉ tính toán tại máy, không tốn mạng) để phát hiện xe quay xong -> hiện câu hỏi */
 setInterval(()=>{if(S&&S.now)try{cb()}catch(x){}},ms)}
const ease=t=>1-Math.pow(1-t,3);
const angleOf=(S,t=S&&S.turn)=>t?t.a0+t.d*ease(Math.min(1,Math.max(0,(Date.now()+OFF-t.t0)/S.dur))):0;
const spinDone=(S,t=S&&S.turn)=>!!t&&t.t0>0&&Date.now()+OFF>=t.t0+S.dur;
/* Xe dừng rồi còn "giữ" thêm HOLD ms để mọi người kịp xem vùng nổi bật, rồi mới hiện câu hỏi */
const HOLD=2200,held=(S,t=S&&S.turn)=>spinDone(S,t)&&Date.now()+OFF>=t.t0+S.dur+HOLD;
let SRC=()=>S&&S.turn; // nguồn góc quay của xe (điện thoại có thể ghi đè)
function fit(){const w=$("#wrap").getBoundingClientRect(),s=Math.max(100,Math.min(w.width,w.height)-16),b=$("#board");
 b.style.width=b.style.height=s+"px";b.style.setProperty("--s",s+"px");window.Board&&Board.init(b)}
addEventListener("resize",()=>$("#wrap")&&fit());
function loop(){(function f(){const src=SRC(),a=angleOf(S,src),t=a*Math.PI/180,c=$("#car");
 window.Board&&Board.update(a,!src||!(src.t0>0)?"idle":spinDone(S,src)?"stop":"run");
 c.style.left=50+46.5*Math.sin(t)+"%";c.style.top=50-46.5*Math.cos(t)+"%";
 c.style.transform=`translate(-50%,-50%) rotate(${a}deg)`;requestAnimationFrame(f)})()}
function renderScore(){const L=[...S.players].sort((a,b)=>b.score-a.score),m=["🥇","🥈","🥉"];
 $("#score").innerHTML=L.map((p,i)=>`<div class="p ${S.status=="playing"&&S.turn&&S.turn.pid==p.id?"on":""}"><span>${S.status=="ended"&&m[i]||i+1+"."} ${esc(p.name)}${S.pl&&S.pl[p.id]&&S.pl[p.id].region&&spinDone(S,S.pl[p.id])?` <small style="color:${COL[S.pl[p.id].region]}">● ${NM[S.pl[p.id].region]}</small>`:""}</span><b>${p.score}</b></div>`).join("")}
