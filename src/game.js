// Logic trò chơi (chuyển từ Code_v1.gs). Không phụ thuộc Cloudflare nên dễ kiểm thử.
export const PER_TURN = 10, DUR = 6000, MAX = 10;
export const newState = () => ({status:'lobby', rounds:1, cnt:0, ang:0, turn:null, auto:false, mode:'seq', pl:{}, kicked:[]});

function nextTurn(s, L) {
  if (!L.length) return 'Chưa có người chơi';
  const m = Math.min(...L.map(x => x.turns));
  if (m >= s.rounds) { s.status = 'ended'; return ''; }
  const q = L.find(x => x.turns === m); s.status = 'playing'; s.cnt++;
  s.turn = {id:s.cnt, pid:q.id, name:q.name, phase:'ready', a0:s.ang, d:0, t0:0, region:'', n:0, ok:0};
  return '';
}

export class Game {
  constructor(s, L, adminKey) { this.s = s || newState(); this.L = L || []; this.adminKey = adminKey; }

  view() { return Object.assign({}, this.s, {players:this.L, dur:DUR, per:PER_TURN, now:Date.now()}); }

  // p: các tham số (đều là chuỗi). Trả về {err, me, rejoin, dirty}
  act(p) {
    const a = String(p.a || ''), s = this.s;
    let L = this.L, err = '', me = '', rejoin = false;
    const adm = !!this.adminKey && p.k === this.adminKey;
    const dirty = !['state', 'auth'].includes(a);
    if (!s.kicked) s.kicked = [];
    if (['start','turn','skip','reset','auth','kick'].includes(a) && !adm) err = 'Sai mã admin';
    else if (a === 'join') {
      const nm = String(p.name || '').trim().slice(0, 14) || 'Người chơi';
      const ex = L.find(x => x.name.trim().toLowerCase() === nm.toLowerCase());
      if (ex) { me = ex.id; rejoin = true; }      // trùng tên → vào lại đúng người cũ
      else if (L.length >= MAX) err = 'Đã đủ ' + MAX + ' người chơi';
      else { me = 'p' + Math.random().toString(36).slice(2, 8); L.push({id:me, name:nm, score:0, turns:0}); }
    }
    else if (a === 'reset') { L = []; this.s = newState(); }
    else if (a === 'kick') {
      const id = String(p.pid || '');
      if (!id) err = 'Thiếu pid';
      else {
        L = L.filter(x => x.id !== id);
        if (s.turn && String(s.turn.pid) === id) s.turn = null;
        if (s.pl) delete s.pl[id];
        if (s.kicked.indexOf(id) < 0) s.kicked.push(id);
        if (s.kicked.length > 100) s.kicked = s.kicked.slice(-100);
        if (s.mode === 'all' && s.status === 'playing' && L.length && L.every(x => s.pl[x.id] && s.pl[x.id].n >= PER_TURN)) s.status = 'ended';
      }
    }
    else if (a === 'start') {
      s.status = 'playing'; s.rounds = 1; s.turn = null; s.auto = p.auto === '1'; s.mode = p.mode === 'all' ? 'all' : 'seq'; s.pl = {};
      if (s.mode === 'all') s.auto = false;
      else if (s.auto && L.length) nextTurn(s, L);
    }
    // ===== TẤT CẢ CÙNG CHƠI =====
    else if (a === 'spinme') {
      const me2 = L.find(x => x.id === p.pid);
      if (s.mode !== 'all' || s.status !== 'playing' || !me2) err = 'Chưa thể quay';
      else if (!s.pl[p.pid]) {
        const d = 1800 + Math.random() * 360, end = d % 360, t0 = Date.now(),
              region = (end < 60 || end >= 300) ? 'bac' : end < 180 ? 'trung' : 'nam';
        s.pl[p.pid] = {region, a0:0, d, t0, n:0, ok:0};
        s.cnt++; s.turn = {id:s.cnt, pid:p.pid, name:me2.name, phase:'spin', a0:0, d, t0, region, n:0, ok:0};
      }
    }
    else if (a === 'ans' && s.mode === 'all' && s.status === 'playing' && s.pl[p.pid] && s.pl[p.pid].n < PER_TURN) {
      const o = s.pl[p.pid], ok = p.ok === '1' ? 1 : 0, m = L.find(x => x.id === p.pid);
      o.n++; o.ok += ok; m.score += ok;
      if (L.every(x => s.pl[x.id] && s.pl[x.id].n >= PER_TURN)) s.status = 'ended';
    }
    else if (a === 'skip' && s.mode === 'all') { s.status = 'ended'; }
    else if (a === 'turn') {
      if (s.turn && s.turn.phase !== 'done') err = 'Lượt hiện tại chưa xong (dùng Bỏ lượt)';
      else err = nextTurn(s, L);
    }
    else if (a === 'next') {
      if (s.auto && s.turn && s.turn.phase === 'done' && String(s.turn.id) === p.tid) nextTurn(s, L);
    }
    else if (a === 'skip' && s.turn && s.turn.phase !== 'done') {
      L.find(x => x.id === s.turn.pid).turns++; s.turn.phase = 'done';
      if (s.turn.region) s.pl[s.turn.pid] = {region:s.turn.region, a0:s.turn.a0, d:s.turn.d, t0:s.turn.t0, n:s.turn.n, ok:s.turn.ok};
      if (s.auto) nextTurn(s, L);
    }
    else if (a === 'spin' && s.turn && s.turn.pid === p.pid && s.turn.phase === 'ready') {
      const d = 360 * (4 + Math.floor(Math.random() * 3)) + Math.random() * 360, end = (s.ang + d) % 360;
      Object.assign(s.turn, {d, t0:Date.now(), phase:'spin', region:(end < 60 || end >= 300) ? 'bac' : end < 180 ? 'trung' : 'nam'});
      s.ang = end;
    }
    else if (a === 'q' && s.mode === 'seq' && s.turn && s.turn.pid === p.pid && (s.turn.phase === 'spin' || s.turn.phase === 'quiz')) {
      s.turn.q = {q:String(p.q || '').slice(0, 400), a:[p.a0, p.a1, p.a2, p.a3].map(x => String(x || '').slice(0, 200)), c:+p.c, n:s.turn.n, done:0, pick:-1};
    }
    else if (a === 'ans' && s.turn && s.turn.pid === p.pid && (s.turn.phase === 'spin' || s.turn.phase === 'quiz') && s.turn.n < PER_TURN) {
      const t = s.turn, ok = p.ok === '1' ? 1 : 0, m = L.find(x => x.id === p.pid);
      if (t.q) { t.q.done = 1; t.q.pick = p.pick !== undefined ? +p.pick : -1; }
      t.n++; t.ok += ok; t.phase = 'quiz'; m.score += ok;
      if (t.n >= PER_TURN) { t.phase = 'done'; m.turns++; s.pl[t.pid] = {region:t.region, a0:t.a0, d:t.d, t0:t.t0, n:t.n, ok:t.ok}; }
    }
    this.L = L;
    return {err, me, rejoin, dirty};
  }
}
