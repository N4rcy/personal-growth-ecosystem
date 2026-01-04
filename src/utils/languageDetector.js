export const detectInputLanguage = (text) => {
  return "en";
};

export const enforceSingleLanguage = (text, targetLanguage) => {
  if (!text) return "";
  return text;
};

export const containsMixedLanguages = (text) => {
  return false;
};

export const getLanguageName = (code) => {
  return "English";
};
