CurrencyFormat = function (value, currencyType, division) {
  if (value == undefined) {
    return '';
  }

  const lang = CurrentLocale.get() || 'en-US' // default value
  let currency;

  if (currencyType && ((typeof currencyType) == 'string')) {
    currency = currencyType;
  }

  if (division == true && ((typeof division) == 'boolean')) {
    value = value / 100;
  }

  if (!currency) {
    return value;
  }

  return Intl.NumberFormat(lang, { style: 'currency', currency: currency }).format(value);
}

Template.registerHelper('currencyFormat', function (value, currencyType, division) {
  return CurrencyFormat(value, currencyType, division);
});