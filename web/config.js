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
// topic = موضوع المقطع (صلاة، زكاة، توبة، ذكر...). اللي يحفظ مقطع في موضوع، التطبيق يطلّعله منه أكتر.
const CLIPS = [
  { youtubeId: "Q6kfa4YuOSw", title: "", sheikh: "الشيخ سمير مصطفى", source: "قناة الشيخ سمير مصطفى الرسمية", topic: "" },
  { youtubeId: "xJVrSHayQic", title: "", sheikh: "الشيخ سمير مصطفى", source: "قناة الشيخ سمير مصطفى الرسمية", topic: "" },
  { youtubeId: "IslIl76RYVE", title: "", sheikh: "الشيخ سمير مصطفى", source: "قناة الشيخ سمير مصطفى الرسمية", topic: "" },
  { youtubeId: "Xw52LalNPo4", title: "", sheikh: "الشيخ سمير مصطفى", source: "قناة الشيخ سمير مصطفى الرسمية", topic: "" },
  { youtubeId: "krAZCScImok", title: "", sheikh: "الشيخ سمير مصطفى", source: "قناة الشيخ سمير مصطفى الرسمية", topic: "" },
  { youtubeId: "FTpBikQy-o0", title: "", sheikh: "محمد الغليظ", source: "القناة الرسمية لمحمد الغليظ", topic: "" },
  { youtubeId: "JeuprJgqInE", title: "", sheikh: "محمد الغليظ", source: "القناة الرسمية لمحمد الغليظ", topic: "" },
  { youtubeId: "YiTIn51Fkak", title: "", sheikh: "محمد الغليظ", source: "القناة الرسمية لمحمد الغليظ", topic: "" },
  { youtubeId: "mbqmyVeci0g", title: "", sheikh: "محمد الغليظ", source: "القناة الرسمية لمحمد الغليظ", topic: "" },
  { youtubeId: "JBYtww-iKt0", title: "", sheikh: "محمد الغليظ", source: "القناة الرسمية لمحمد الغليظ", topic: "" },
  { youtubeId: "DY4lnePGeSc", title: "", sheikh: "محمد الغليظ", source: "القناة الرسمية لمحمد الغليظ", topic: "" },
  { youtubeId: "Emu4PDoZaj8", title: "", sheikh: "محمد الغليظ", source: "القناة الرسمية لمحمد الغليظ", topic: "" },
  { youtubeId: "MJnYdIyVyNI", title: "", sheikh: "محمد الغليظ", source: "القناة الرسمية لمحمد الغليظ", topic: "" },
  { youtubeId: "8FBnh8vkEYs", title: "", sheikh: "محمد الغليظ", source: "القناة الرسمية لمحمد الغليظ", topic: "" },
  { youtubeId: "JhvOazA4OsA", title: "", sheikh: "محمد الغليظ", source: "القناة الرسمية لمحمد الغليظ", topic: "" },
  { youtubeId: "XenQyW-nQ1U", title: "", sheikh: "الشيخ أمجد سمير", source: "القناة الرسمية للشيخ أمجد سمير", topic: "الزواج" },
  { youtubeId: "vdGFGdPavoI", title: "", sheikh: "الشيخ أمجد سمير", source: "القناة الرسمية للشيخ أمجد سمير", topic: "قصص الأنبياء" },
  { youtubeId: "WO_DyfSRRdQ", title: "", sheikh: "الشيخ أمجد سمير", source: "القناة الرسمية للشيخ أمجد سمير", topic: "الصلاة" },
  { youtubeId: "Ob7_tISLU0g", title: "", sheikh: "الشيخ أمجد سمير", source: "القناة الرسمية للشيخ أمجد سمير", topic: "غض البصر" },
  { youtubeId: "2SzwisQHmss", title: "", sheikh: "الشيخ أمجد سمير", source: "القناة الرسمية للشيخ أمجد سمير", topic: "غض البصر" },
  { youtubeId: "tyiJmaN6vOA", title: "", sheikh: "الشيخ أمجد سمير", source: "القناة الرسمية للشيخ أمجد سمير", topic: "غض البصر" },
  { youtubeId: "O_8TmnKWdrg", title: "", sheikh: "الشيخ أمجد سمير", source: "القناة الرسمية للشيخ أمجد سمير", topic: "البلاء" },
  { youtubeId: "XAzggASyKtQ", title: "", sheikh: "الشيخ أمجد سمير", source: "القناة الرسمية للشيخ أمجد سمير", topic: "الزواج" },
  { youtubeId: "hkdLg3BOaWk", title: "", sheikh: "الشيخ أمجد سمير", source: "القناة الرسمية للشيخ أمجد سمير", topic: "الصلاة" },
  { youtubeId: "t1qcAvo1iD4", title: "", sheikh: "يوسف القط", source: "القناة الرسمية ليوسف القط", topic: "الآخرة" },
  { youtubeId: "4S4VmKktwnc", title: "", sheikh: "يوسف القط", source: "القناة الرسمية ليوسف القط", topic: "الزكاة" },
  { youtubeId: "vettIM4vbbc", title: "", sheikh: "يوسف القط", source: "القناة الرسمية ليوسف القط", topic: "السعي" },
  { youtubeId: "Q-RYYAn2G5U", title: "", sheikh: "يوسف القط", source: "القناة الرسمية ليوسف القط", topic: "الزواج" },
  { youtubeId: "lUnoQggtIbs", title: "", sheikh: "يوسف القط", source: "القناة الرسمية ليوسف القط", topic: "الزكاة" },
  { youtubeId: "el5hk90XpiU", title: "", sheikh: "يوسف القط", source: "القناة الرسمية ليوسف القط", topic: "الصحابة" },
  { youtubeId: "0PjM262I8b8", title: "", sheikh: "يوسف القط", source: "القناة الرسمية ليوسف القط", topic: "الصحابة" },
  { youtubeId: "iVhFhFDEiFI", title: "", sheikh: "يوسف القط", source: "القناة الرسمية ليوسف القط", topic: "الصحابة" },
  { youtubeId: "_o5AGiXpDWU", title: "", sheikh: "يوسف القط", source: "القناة الرسمية ليوسف القط", topic: "الزواج" },
  { youtubeId: "lE6m0fyG_Uc", title: "", sheikh: "يوسف القط", source: "القناة الرسمية ليوسف القط", topic: "الرسول ﷺ" },
];
