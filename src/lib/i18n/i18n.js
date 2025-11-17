import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    ns: ['common', 'navbar', 'footer', 'home'], 
    defaultNS: 'common', 
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  })
  .then(() => {
    // Set initial document direction (RTL for Arabic, LTR for English)
    document.dir = i18n.dir();
    // Update direction when language changes
    i18n.on('languageChanged', () => {
      document.dir = i18n.dir();
    });
  });

export default i18n;