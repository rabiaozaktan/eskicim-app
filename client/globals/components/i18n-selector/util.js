const getLang = function () {
  const lang = navigator.languages && navigator.languages[0] ||
    navigator.language ||
    navigator.browserLanguage ||
    navigator.userLanguage ||
    'en-US'
  return lang
}
i18n.setLocale(getLang());
CurrentLocale = new ReactiveVar(i18n.getLocale());
Translate = i18n.createReactiveTranslator();

Tracker.autorun(function () {
  const language = localStorage.getItem('language');

  if (!language) {
    return;
  }

  CurrentLocale.set(language);
});

Tracker.autorun(function () {
  const language = CurrentLocale.get();

  if (!language) {
    return;
  }

  localStorage.setItem('language', language);
  i18n.setLocale(language);
  document.documentElement.setAttribute('lang', language.slice(0, 2));
});

Template.registerHelper('currentLocale', function () {
  return CurrentLocale;
});


Template.registerHelper('_', function (..._datas) {
  return Translate(..._datas, { _purify: true });
});