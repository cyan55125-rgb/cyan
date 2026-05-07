import type { Language, Difficulty } from './index';

export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction' | 'interjection' | 'phrase';

export interface VocabularyWord {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  partOfSpeech: PartOfSpeech;
  difficulty: Difficulty;
  exampleSentence: string;
  exampleTranslation: string;
  language: Language;
}
