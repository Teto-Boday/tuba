# طُوبَى — Tuba

قصيرة. إسلامية. مفيدة. مقاطع إسلامية قصيرة من مصادر موثوقة، والقرآن الكريم، ومواقيت الصلاة، والأذكار. مجاني ومن غير إعلانات.

- الموقع: https://tuba-app.github.io/
- التطبيق على المتصفح: https://tuba-app.github.io/app/
- أندرويد: https://github.com/Teto-Boday/tuba/releases/latest/download/Tuba.apk

تصميم وتطوير: محمد صلاح

## الملفات
- `web/` التطبيق نفسه. اللي ممكن تعدّله من غير برمجة:
  - `web/config.js` المقاطع وطرق الدعم.
  - `web/azkar.js` الأذكار (لازم تتراجع من متخصص).
- `site/` صفحة التطبيق اللي فيها التحميل.
- `.github/workflows/pages.yml` بينشر الموقع والتطبيق على GitHub Pages مع كل تعديل.
- `.github/workflows/android.yml` بيبني ملف الأندرويد (Tuba.apk) وبينزّله في Releases.

## المصادر
- نص المصحف: موسوعة القرآن الكريم QuranEnc.com عن طريق مشروع quran-json (CC BY-SA 4.0). ممنوع التعديل في النص.
- مواقيت الصلاة: مكتبة Adhan (MIT)، طريقة الهيئة المصرية العامة للمساحة.
- الأذكار: حصن المسلم.

## النشر على العنوانين
- الكود بيترفع على المستودعين: `Teto-Boday/tuba` (العنوان القديم teto-boday.github.io/tuba، للبرامج القديمة المتسطّبة) و`tuba-app/tuba-app.github.io` (العنوان الأساسي).
- `git push origin main && git push new main`
