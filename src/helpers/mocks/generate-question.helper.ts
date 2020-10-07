import { generateGenreQuestion } from '~/helpers/mocks/generate-genre-question.helper';
import { QuestionType } from '~/common/enums/enums';

const generateQuestion = (type: QuestionType) => {
  switch (type) {
    case QuestionType.GENRE: {
      return generateGenreQuestion();
    }
    case QuestionType.ARTIST: {
      return null;
    }
  }

  return null;
};

export { generateQuestion };
