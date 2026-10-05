// 分享预览图：用无头 Edge 把一段 HTML 渲染成 1200x630 的 PNG，写入 public/images/og/default.png。
// 用法：node scripts/og.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const ROOT = path.resolve(import.meta.dirname, '..');
const tmp = path.join(ROOT, '.tmp-icons');
fs.mkdirSync(tmp, { recursive: true });

const rows = [
  ['B1', '新手第一次买', '无忧链接'],
  ['A1', '预算有限 / 学生党', '无忧链接'],
  ['A2', '游戏加速', '无忧链接'],
  ['A3', '远程办公', '无忧链接'],
  ['A4', '流媒体解锁', '无忧链接'],
  ['B4', '怕跑路稳妥买', '无忧链接'],
];
const html = `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#08111f;color:#e7eefa;font-family:"Microsoft YaHei","PingFang SC",sans-serif;display:grid;grid-template-columns:1fr 520px;gap:48px;padding:56px 64px;position:relative;overflow:hidden}
body::before{content:"";position:absolute;right:-120px;top:-120px;width:520px;height:520px;background:radial-gradient(circle,rgba(255,184,31,.22),transparent 65%)}
.brand{display:flex;align-items:center;gap:16px;margin-bottom:34px}
.brand svg{width:64px;height:64px}
.brand b{font-size:34px;letter-spacing:.02em}
.brand small{display:block;font-size:17px;color:#93a8c9}
h1{font-size:58px;line-height:1.22;margin-bottom:22px}
h1 em{font-style:normal;color:#ffb81f}
p{font-size:24px;color:#93a8c9;line-height:1.6}
.board{align-self:center;background:#0a1a33;border:1px solid #264574;border-radius:18px;overflow:hidden}
.h{background:#10264a;color:#ffb81f;font:700 15px ui-monospace,Consolas,monospace;letter-spacing:.14em;padding:14px 22px;display:flex;justify-content:space-between}
.r{display:grid;grid-template-columns:60px 1fr auto;gap:12px;padding:15px 22px;border-top:1px solid #1d355b;font-size:21px;align-items:center}
.r b{font:800 20px ui-monospace,Consolas,monospace;color:#ffb81f}
.r span:last-child{color:#7be3ad;font-weight:700}
</style>
<div>
<div class="brand"><svg viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0a1a33" stroke="#264574"/><path d="M11 33 53 12 42 53 31 40Z" fill="#ffb81f"/><path d="M31 40 53 12 26 36Z" fill="#e39a00"/><path d="M11 33 31 40 26 36Z" fill="#ffd36b"/><circle cx="51" cy="52" r="3.5" fill="#6ea2ff"/></svg><div><b>机场TJ</b><small>jichangtj.net</small></div></div>
<h1>先说你<em>要做什么</em>，<br>再决定买哪家机场</h1>
<p>8 个选择场景 · 综合排行榜 · 服务商对比 · 站长自测数据 · 术语表与知识库</p>
</div>
<div class="board"><div class="h"><span>DEPARTURES · 场景 → 首选</span><span>2026-10</span></div>
${rows.map(([g, w, p]) => `<div class="r"><b>${g}</b><span>${w}</span><span>${p}</span></div>`).join('')}
</div>`;
const f = path.join(tmp, 'og.html');
fs.writeFileSync(f, html);
const out = path.join(ROOT, 'public/images/og/default.png');
execFileSync(EDGE, ['--headless=new', '--disable-gpu', `--user-data-dir=${path.join(tmp, 'prof2').split(path.sep).join('/')}`, '--hide-scrollbars', '--window-size=1200,630', `--screenshot=${out.split(path.sep).join('/')}`, `file:///${f.split(path.sep).join('/')}`], { timeout: 60000, stdio: 'ignore' });
fs.rmSync(tmp, { recursive: true, force: true });
console.log('og ok', fs.statSync(out).size + 'B');
