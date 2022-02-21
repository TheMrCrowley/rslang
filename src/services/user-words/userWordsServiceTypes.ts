export interface UserWord {
  difficulty: string;
  optional: UserOptionalObject;
}

export interface UserWordResponse {
  id: string;
  wordId: string;
  difficulty: string;
  optional: UserOptionalObject;
}

export interface UserOptionalObject {
  totalAnswers: number;
  totalCorrectAnswers: number;
  correctStreak: number;
  sprint: boolean;
  audiocall: boolean;
}

export interface RequestUserWordsData {
  userId: string;
}

export interface ChangeDifficultyRequest extends RequestUserWordsData {
  wordId: string;
  method: 'PUT' | 'POST';
  difficulty: 'hard' | 'studied' | 'learning';
}

export interface ChangeOptionalRequest extends RequestUserWordsData {
  wordId: string;
  method: 'PUT' | 'POST';
  from: 'SPRINT' | 'AUDIOCALL';
}
