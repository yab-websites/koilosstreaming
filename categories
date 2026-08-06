/* ============================================================
   NIGUNIM_CATEGORIES — דאס איז די איינציגע פלאץ וואו מ'דארף
   טוישן פאלדערן פאר דעם גאנצן זייטל.

   טוישט א נאמען, אדער לייגט צו א נייע שורה — עס וועט זיך
   אויטאמאטיש ווייזן ביידע אויף index.html (די הויפט-זייטל)
   און אויף admin.html (וואו מ'לאדט ארויף פיילן), ווייל ביידע
   זייטלעך לייענען פון דעם זעלביגן פייל.

   כדי צו לייגן צו א נייע פאלדער: לייגט צו א שורה מיטן פארמאט
     key: "א נייער שליסל אן ליידיגע פלעצער (א-ז, ציפערן, _)",
     val: "דער נאמען וואס וועט זיך ווייזן אויף דער זייטל"
   אין דעם ריכטיגן גרופע (GENERAL אדער MOADIM) אונטן.
   ============================================================ */

const NIGUNIM_CATEGORIES = {
  general: [
    { key: "collection",    label: "קאלעקשאן" },
    { key: "live",          label: "לעבעדיגע" },
    { key: "studio",        label: "שטילע" },
    { key: "instrumental",  label: "בלויז מוזיק" },
    { key: "music",         label: "מוזיק" },
    { key: "vocal",         label: "וואקאליש" },
  ],
  moadim: [
    { key: "shabbos",        label: "שבת קודש" },
    { key: "motzash",        label: "מוצאי שבת" },
    { key: "roshchodesh",    label: "ראש חודש" },
    { key: "yamimnoraim",    label: "ימים נוראים" },
    { key: "sukkos",         label: "סוכות" },
    { key: "chanukah",       label: "חנוכה" },
    { key: "purim",          label: "פורים" },
    { key: "pesach",         label: "פסח" },
    { key: "lagbaomer",      label: "ל״ג בעומר" },
    { key: "shavuos",        label: "שבועות" },
    { key: "beinhametzarim", label: "בין המצרים" },
  ]
};

/* Helpers shared by both pages — leave as-is */
function nigunimAllCategories(){
  return [...NIGUNIM_CATEGORIES.general, ...NIGUNIM_CATEGORIES.moadim];
}
function nigunimLabel(key){
  const found = nigunimAllCategories().find(c => c.key === key);
  return found ? found.label : key;
}
