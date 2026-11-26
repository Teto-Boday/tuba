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
- `.github/workflows/apps.yml` بيبني الأندرويد (Tuba.apk) والويندوز وبينزّلهم في Releases بتاعة `Teto-Boday/tuba`.
- `.github/workflows/sync-old.yml` بيحدّث العنوان القديم لوحده (تحت).

## المصادر
- نص المصحف: موسوعة القرآن الكريم QuranEnc.com عن طريق مشروع quran-json (CC BY-SA 4.0). ممنوع التعديل في النص.
- مواقيت الصلاة: مكتبة Adhan (MIT)، طريقة الهيئة المصرية العامة للمساحة.
- الأذكار: حصن المسلم.

## النشر على العنوانين
- الأساس هو `tuba-app/tuba-app.github.io` (العنوان الأساسي). ارفع عليه بس: `git push new main`
- `Teto-Boday/tuba` (العنوان القديم teto-boday.github.io/tuba، للبرامج القديمة المتسطّبة، وفيه بناء الأندرويد والويندوز) بيتحدّث لوحده: `.github/workflows/sync-old.yml` بيبص كل ربع ساعة على `main` في tuba-app، ولو فيه جديد بينقله وينشر الموقع القديم ويبني التطبيقات لو ملفاتها اتغيّرت. عايزه دلوقتي؟ شغّله بإيدك من Actions ← Sync from tuba-app ← Run workflow.
- لو التعديل فيه ملفات في `.github/workflows/`، GitHub مش بيسمح للمزامنة تنقلها، فارفع على القديم بإيدك المرة دي بس: `git push origin main`
- ماتعدّلش في `Teto-Boday/tuba` مباشرة، وإلا المزامنة هتقف لحد ما التعديل يتنقل لـ tuba-app.
