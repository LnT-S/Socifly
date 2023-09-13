import i18next from "i18next";
import english from "../languages/english.json";
import hindi from "../languages/hindi.json";
import marathi from "../languages/marathi.json";

i18next.use(initReactI18next).init({
    lng : "en",
    resources: {
        en: english,
        hi: hindi,
        ma: marathi,
    },
    react:{
        useSuspense : false,
    },
});

export default i18next;