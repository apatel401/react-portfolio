
const currentLanguage = document.querySelector("html").lang || "en";

const translations = {
  "correctly matched" : {
    fr: "correctement apparié" // @TODO this is probably not correct
  }
}

export default function _t (text) {
  return translations[text][currentLanguage] || text;
}