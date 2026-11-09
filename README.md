# طُوبَى — Tuba

قصيرة. إسلامية. مفيدة. مقاطع إسلامية قصيرة من مصادر موثوقة، والقرآن الكريم، ومواقيت الصلاة، والأذكار. مجاني ومن غير إعلانات.

- الموقع: https://teto-boday.github.io/tuba/
- التطبيق على المتصفح: https://teto-boday.github.io/tuba/app/
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
