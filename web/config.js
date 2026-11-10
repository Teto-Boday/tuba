// ====== إعدادات طُوبَى — عدّل هنا ======

// رابط الدعم بإنستاباي (زرار "ادعم بإنستاباي")
const DONATE_URL = "https://ipn.eg/S/teto.2362006/instapay/6Qt402";

// طرق الدعم اللي بتظهر في صفحة "ادعمنا" وجنب كل واحدة زرار نسخ
const PAY_OPTIONS = [
  { label: "فودافون كاش", value: "01031544361" }
];

// المقاطع: ضيف هنا مقاطع يوتيوب من القنوات الرسمية للمشايخ بعد ما تراجعها.
// youtubeId = الجزء اللي بعد watch?v= أو بعد /shorts/ في رابط الفيديو.
// مثال:
// { youtubeId: "XXXXXXXXXXX", title: "عنوان المقطع", sheikh: "اسم الشيخ", source: "القناة الرسمية للشيخ على يوتيوب", topic: "قصص الأنبياء" },
const CLIPS = [
  { youtubeId: "Q6kfa4YuOSw", title: "", sheikh: "الشيخ سمير مصطفى", source: "قناة الشيخ سمير مصطفى الرسمية", topic: "الشيخ سمير مصطفى" },
  { youtubeId: "xJVrSHayQic", title: "", sheikh: "الشيخ سمير مصطفى", source: "قناة الشيخ سمير مصطفى الرسمية", topic: "الشيخ سمير مصطفى" },
  { youtubeId: "IslIl76RYVE", title: "", sheikh: "الشيخ سمير مصطفى", source: "قناة الشيخ سمير مصطفى الرسمية", topic: "الشيخ سمير مصطفى" },
  { youtubeId: "Xw52LalNPo4", title: "", sheikh: "الشيخ سمير مصطفى", source: "قناة الشيخ سمير مصطفى الرسمية", topic: "الشيخ سمير مصطفى" },
  { youtubeId: "krAZCScImok", title: "", sheikh: "الشيخ سمير مصطفى", source: "قناة الشيخ سمير مصطفى الرسمية", topic: "الشيخ سمير مصطفى" },
  { youtubeId: "FTpBikQy-o0", title: "", sheikh: "محمد الغليظ", source: "يوتيوب", topic: "محمد الغليظ" },
  { youtubeId: "JeuprJgqInE", title: "", sheikh: "محمد الغليظ", source: "يوتيوب", topic: "محمد الغليظ" },
  { youtubeId: "YiTIn51Fkak", title: "", sheikh: "محمد الغليظ", source: "يوتيوب", topic: "محمد الغليظ" },
  { youtubeId: "mbqmyVeci0g", title: "", sheikh: "محمد الغليظ", source: "يوتيوب", topic: "محمد الغليظ" },
  { youtubeId: "JBYtww-iKt0", title: "", sheikh: "محمد الغليظ", source: "يوتيوب", topic: "محمد الغليظ" },
  { youtubeId: "DY4lnePGeSc", title: "", sheikh: "محمد الغليظ", source: "يوتيوب", topic: "محمد الغليظ" },
  { youtubeId: "Emu4PDoZaj8", title: "", sheikh: "محمد الغليظ", source: "يوتيوب", topic: "محمد الغليظ" },
  { youtubeId: "MJnYdIyVyNI", title: "", sheikh: "محمد الغليظ", source: "يوتيوب", topic: "محمد الغليظ" },
  { youtubeId: "8FBnh8vkEYs", title: "", sheikh: "محمد الغليظ", source: "يوتيوب", topic: "محمد الغليظ" },
  { youtubeId: "JhvOazA4OsA", title: "", sheikh: "محمد الغليظ", source: "يوتيوب", topic: "محمد الغليظ" },
];
