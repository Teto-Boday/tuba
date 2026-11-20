// يخلي طُوبَى يشتغل من غير نت، وياخد آخر نسخة أول ما يكون فيه نت
const CACHE = "tuba-__BUILD__";
// المصحف (الخطوط والصفحات) في كاش لوحده مبيتمسحش مع التحديثات، عشان يتنزّل مرة واحدة بس
const MUSHAF = "tuba-mushaf";
// التلاوات المتنزّلة: مواقع الصوت مش بتسمح للتطبيق يقرا الملف، فبنحفظه زي ما هو والمشغّل بياخده من هنا
const AUDIO = "tuba-audio";
const CORE = ["./", "index.html", "config.js", "azkar.js", "amiri-quran.woff2", "font-scheherazade.woff2", "font-naskh.woff2", "manifest.json", "icon.svg", "icon-192.png", "icon-512.png", "quiz-data.json"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE.map((u) => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE && k !== MUSHAF && k !== AUDIO).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// الأيفون بيطلب الصوت حتة حتة (Range)، فبنرجّعله الحتة اللي طلبها من الملف المحفوظ
async function ranged(hit, req) {
  const rg = req.headers.get("range"); if (!rg || hit.type === "opaque") return hit;
  const buf = await hit.arrayBuffer(), n = buf.byteLength, m = /bytes=(\d*)-(\d*)/.exec(rg);
  let a = m && m[1] ? +m[1] : 0, b = m && m[2] ? +m[2] : n - 1; if (m && !m[1] && m[2]) { a = Math.max(0, n - +m[2]); b = n - 1; }
  b = Math.min(b, n - 1); if (a > b) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${n}` } });
  return new Response(buf.slice(a, b + 1), { status: 206, headers: { "Content-Type": hit.headers.get("Content-Type") || "audio/mpeg", "Content-Range": `bytes ${a}-${b}/${n}`, "Content-Length": String(b - a + 1), "Accept-Ranges": "bytes" } });
}
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (url.searchParams.has("fresh")) return; // فحص التحديث: من النت على طول، من غير الكاش
  if (url.hostname.includes("youtube") || url.hostname.includes("ytimg")) return; // الفيديو دايمًا من يوتيوب
  if (url.origin === location.origin && url.pathname.includes("/mushaf/")) {
    e.respondWith(caches.open(MUSHAF).then((c) => c.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request).then((res) => { if (res && res.ok) c.put(e.request, res.clone()); return res; }))));
    return;
  }
  if (url.hostname === "cdn.islamic.network" || url.hostname === "everyayah.com" || url.hostname === "archive.org" || url.hostname.endsWith(".mp3quran.net")) {
    if (url.searchParams.has("s")) return; // تشغيل من النت: المتصفح يتعامل معاه لوحده عشان الصوت ميعلقش
    e.respondWith(caches.open(AUDIO).then((c) => c.match(url.href, { ignoreVary: true }).then((hit) => hit ? ranged(hit, e.request) : fetch(e.request))));
    return;
  }
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com" || url.pathname.endsWith(".woff2");
  if (url.origin !== location.origin && !isFont) return;
  if (isFont) {
    // الخطوط مش بتتغير: من الكاش الأول
    e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
      return res;
    })));
    return;
  }
  // ملفات التطبيق: من النت الأول عشان التعديلات توصل على طول. ولو النت فاصل أو بطيء (أكتر من ٢٫٥ ثانية) نفتح من الكاش، والنسخة الجديدة تتحفظ في الخلفية للمرة الجاية
  const fromCache = () => caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || caches.match("index.html"));
  const net = fetch(e.request, { cache: "no-cache" }).then((res) => {
    if (res && res.ok) { const copy = res.clone(); return caches.open(CACHE).then((c) => c.put(e.request, copy)).then(() => res); }
    return res;
  });
  e.waitUntil(net.catch(() => {}));
  e.respondWith(new Promise((done) => {
    let settled = false; const finish = (r) => { if (!settled && r) { settled = true; done(r); } };
    const timer = setTimeout(() => fromCache().then(finish), 2500);
    net.then((res) => { clearTimeout(timer); finish(res); }, () => { clearTimeout(timer); fromCache().then((r) => finish(r || Response.error())); });
  }));
});
