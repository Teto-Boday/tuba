// يخلي طُوبَى يشتغل من غير نت، وياخد آخر نسخة أول ما يكون فيه نت
const CACHE = "tuba-__BUILD__";
const CORE = ["./", "index.html", "config.js", "azkar.js", "amiri-quran.woff2", "manifest.json", "icon.svg", "icon-192.png", "icon-512.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE.map((u) => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (url.hostname.includes("youtube") || url.hostname.includes("ytimg")) return; // الفيديو دايمًا من يوتيوب
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
  // ملفات التطبيق: من النت الأول عشان التعديلات توصل على طول، ولو مفيش نت من الكاش
  e.respondWith(fetch(e.request, { cache: "no-cache" }).then((res) => {
    if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || caches.match("index.html"))));
});
