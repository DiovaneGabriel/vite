export type Language = "en";

export type LanguageContextProps = {
    language: Language,
    setLanguage: (language: Language) => void;
};