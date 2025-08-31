export type LanguageOption = {
  label: string;
  code: "fa" | "en";
};

export type IImagePrompt = {
  image: File | null;
  tone: string;
  language: LanguageOption | null;
  context?: string;
  model: "gpt4o" | "gemini_pro" | "blip" | "llama";
};
