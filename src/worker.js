import { DurableObject } from "cloudflare:workers";
import { Game } from "./game.js";

// Một phòng duy nhất: giữ trạng thái, nhận lệnh qua WebSocket và đẩy trạng thái mới cho mọi thiết bị.
export class Room extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair("ping", "pong")); // giữ kết nối, không đánh thức DO
    ctx.blockConcurrencyWhile(async () => {
      const d = await ctx.storage.get(["s", "L"]);
      this.g = new Game(d.get("s"), d.get("L"), env.ADMIN_KEY);
    });
  }

  async fetch(req) {
    if (req.headers.get("Upgrade") !== "websocket") return new Response("Cần WebSocket", { status: 426 });
    const [client, server] = Object.values(new WebSocketPair());
    this.ctx.acceptWebSocket(server);
    server.send(JSON.stringify(this.g.view())); // gửi ngay trạng thái hiện tại
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws, data) {
    if (typeof data !== "string" || data.length > 4000) return;
    let p; try { p = JSON.parse(data); } catch { return; }
    if (!p || typeof p !== "object") return;
    const r = this.g.act(p), v = this.g.view();
    ws.send(JSON.stringify({ ...v, err: r.err, me: r.me, rejoin: r.rejoin, rid: p.rid })); // phản hồi riêng cho người gửi
    if (r.dirty) {
      await this.ctx.storage.put({ s: this.g.s, L: this.g.L });
      const m = JSON.stringify(v);
      for (const w of this.ctx.getWebSockets()) { try { w.send(m); } catch {} } // phát cho tất cả
    }
  }

  webSocketClose(ws, code) { try { ws.close(code); } catch {} }
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === "/ws") return env.ROOM.get(env.ROOM.idFromName("main")).fetch(req);
    return new Response("Not found", { status: 404 }); // file tĩnh trong /public do Cloudflare tự phục vụ
  },
};
