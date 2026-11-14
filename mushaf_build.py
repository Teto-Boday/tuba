# يجهّز بيانات المصحف (صفحات مصحف المدينة ٦٠٤) من حزمة quran-qcf4 (بيانات MIT، والخطوط من مجمع الملك فهد)
import json, os, shutil
SRC = "/home/claude/qcf/pkg/package"
OUT = "/home/claude/tuba-repo/web/mushaf"
quran = json.load(open("/home/claude/deps/node_modules/quran-json/dist/quran.json", encoding="utf-8"))
base = [0]
for s in quran: base.append(base[-1] + len(s["verses"]))
def gi(key):
    s, a = map(int, key.split(":")); return base[s - 1] + a - 1
fonts, pages, ap = [], [], [None] * base[-1]
for p in range(1, 605):
    d = json.load(open(f"{SRC}/pages/{p:03d}.json", encoding="utf-8"))
    fonts.append(int(d["font"].rsplit("_", 1)[1]))
    lines = []
    for l in d["lines"]:
        ws = l["words"]
        if ws[0]["type"] == "surah_header": lines.append(["H", ws[0]["sura"], ws[0]["code"]]); continue
        if ws[0]["type"] == "bismillah": lines.append(["B", ws[0]["code"]]); continue
        chars, runs, ends = "", [], []
        for k, w in enumerate(ws):
            assert w["font"] == d["font"], (p, w)
            chars += chr(w["code"])
            i = gi(w["verse_key"]) if w.get("verse_key") else (runs[-2] if runs else -1)
            if ap[i] is None: ap[i] = p
            if w["type"] == "end": ends.append(k)
            elif w["type"] == "quarter": ends.append(-k - 1)
            if runs and runs[-2] == i: runs[-1] += 1
            else: runs += [i, 1]
        lines.append([chars, runs, ends])
    pages.append(lines)
assert all(x is not None for x in ap)
os.makedirs(OUT + "/fonts", exist_ok=True)
json.dump({"v": 1, "f": fonts, "p": pages, "ap": ap}, open(OUT + "/pages.json", "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
for fn in os.listdir(SRC + "/fonts-woff2"):
    shutil.copy(f"{SRC}/fonts-woff2/{fn}", f"{OUT}/fonts/{fn.replace('_W.woff2', '.woff2')}")
shutil.copy(SRC + "/LICENSE.md", OUT + "/LICENSE.md")
print("pages.json", os.path.getsize(OUT + "/pages.json") // 1024, "KB;", len(os.listdir(OUT + "/fonts")), "fonts")
