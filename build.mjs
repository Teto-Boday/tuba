// يجهّز الموقع في dist/ والتطبيق في dist/app
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist/app", { recursive: true });
cpSync("web", "dist/app", { recursive: true });
// رقم نسخة جديد مع كل بناء عشان الموبايلات تاخد التحديث
writeFileSync("dist/app/sw.js", readFileSync("web/sw.js", "utf8").replace("__BUILD__", String(Date.now())));
cpSync("site", "dist", { recursive: true });
console.log("built dist/");
