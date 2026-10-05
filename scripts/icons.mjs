// 网站图标：用无头 Edge 把 public/favicon.svg 渲染成多尺寸 PNG，再拼出 favicon.ico（内嵌 PNG）。
// 生成结果写进 public/，构建后出现在站点根目录。无需任何 npm 依赖。
// 用法：node scripts/icons.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const ROOT = path.resolve(import.meta.dirname, '..');
const svg = fs.readFileSync(path.join(ROOT, 'public/favicon.svg'), 'utf8');
const SIZES = [16, 32, 48, 180, 192, 512];
const tmp = path.join(ROOT, '.tmp-icons');
fs.mkdirSync(tmp, { recursive: true });

const html = `<!doctype html><meta charset="utf-8"><body><pre id="r">pending</pre><script>
var SIZES=${JSON.stringify(SIZES)},out={};
var img=new Image();
img.onload=function(){
  SIZES.forEach(function(n){
    var c=document.createElement('canvas');c.width=n;c.height=n;var x=c.getContext('2d');x.imageSmoothingQuality='high';
    if(n===180){x.fillStyle='#0a1a33';x.fillRect(0,0,n,n);}
    x.drawImage(img,0,0,n,n);
    out[n]=c.toDataURL('image/png').split(',')[1];
  });
  document.getElementById('r').textContent=JSON.stringify(out);
};
img.onerror=function(){document.getElementById('r').textContent='ERROR';};
img.src=${JSON.stringify('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg))};
</script>`;
const f = path.join(tmp, 'icons.html');
fs.writeFileSync(f, html);

const dom = execFileSync(EDGE, ['--headless=new', '--disable-gpu', `--user-data-dir=${path.join(tmp, 'prof').split(path.sep).join('/')}`, '--virtual-time-budget=8000', '--dump-dom', `file:///${f.split(path.sep).join('/')}`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 60000 });
const m = dom.match(/<pre id="r">([\s\S]*?)<\/pre>/);
if (!m || m[1] === 'pending' || m[1] === 'ERROR') throw new Error('render failed: ' + (m ? m[1] : 'no pre'));
const data = JSON.parse(m[1].replace(/&quot;/g, '"'));
const png = (n) => Buffer.from(data[n], 'base64');

function ico(list) {
  const head = Buffer.alloc(6 + 16 * list.length);
  head.writeUInt16LE(0, 0);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(list.length, 4);
  let offset = head.length;
  list.forEach(([size, p], i) => {
    const o = 6 + 16 * i;
    head.writeUInt8(size, o);
    head.writeUInt8(size, o + 1);
    head.writeUInt8(0, o + 2);
    head.writeUInt8(0, o + 3);
    head.writeUInt16LE(1, o + 4);
    head.writeUInt16LE(32, o + 6);
    head.writeUInt32LE(p.length, o + 8);
    head.writeUInt32LE(offset, o + 12);
    offset += p.length;
  });
  return Buffer.concat([head, ...list.map(([, p]) => p)]);
}

const pub = path.join(ROOT, 'public');
fs.writeFileSync(path.join(pub, 'favicon.ico'), ico([[16, png(16)], [32, png(32)], [48, png(48)]]));
fs.writeFileSync(path.join(pub, 'favicon-48x48.png'), png(48));
fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), png(180));
fs.writeFileSync(path.join(pub, 'icon-192.png'), png(192));
fs.writeFileSync(path.join(pub, 'icon-512.png'), png(512));
fs.rmSync(tmp, { recursive: true, force: true });
console.log('icons ok:', ['favicon.ico', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'].map((n) => `${n} ${fs.statSync(path.join(pub, n)).size}B`).join(', '));
