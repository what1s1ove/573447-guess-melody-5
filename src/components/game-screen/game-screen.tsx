import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { GameActionCreator } from '~/store/actions/actions';
import { RootState } from '~/store/reducer.root';
import { AppRoute, GameConfig, QuestionType } from '~/common/enums/enums';
import {
  GameQuestion,
  UserAnswerCb,
  GameAnswer,
} from '~/common/types/types';
import withActivePlayer from '~/hocs/with-audio-player/with-audio-player';
import withUserAnswer from '~/hocs/with-user-answer/with-user-answer';
import GameHeader from '~/components/game-header/game-header';
import GenreQuestionScreen from '~/components/genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '~/components/artist-question-screen/artist-question-screen';

const GenreQuestionScreenWrapped = withUserAnswer(
  withActivePlayer(GenreQuestionScreen)
);
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

type Props = {
  step: number;
  mistakesCount: number;
  questions: GameQuestion[];
  onAnswer: UserAnswerCb;
};

const GameScreen: React.FC<Props> = ({
  step,
  questions,
  mistakesCount,
  onAnswer,
}) => {
  const currentQuestion = questions[step];

  const getScreen = (question: GameQuestion) => {
    switch (question.type) {
      case QuestionType.GENRE: {
        return (
          <GenreQuestionScreenWrapped
            key={question.id}
            onAnswer={onAnswer}
            question={question}
          />
        );
      }
      case QuestionType.ARTIST: {
        return (
          <ArtistQuestionScreenWrapped
            key={question.id}
            onAnswer={onAnswer}
            question={question}
          />
        );
      }
    }

    return null;
  };

  if (mistakesCount >= GameConfig.MAX_MISTAKES_COUNT) {
    return <Redirect to={AppRoute.LOSE} />;
  }

  if (step >= questions.length || !currentQuestion) {
    return <Redirect to={AppRoute.RESULT} />;
  }

  return (
    <section className={`game game--${currentQuestion.type}`}>
      <GameHeader mistakesCount={mistakesCount} />
      {getScreen(currentQuestion)}
    </section>
  );
};

export { GameScreen };

export default connect(
  ({ game }: RootState) => ({
    step: game.step,
    mistakesCount: game.mistakesCount,
  }),
  (dispatch) => ({
    onAnswer: (question: GameQuestion, answer: GameAnswer) => {
      dispatch(GameActionCreator.incrementStep());
      dispatch(GameActionCreator.incrementMistake(question, answer));
    }
  })
)(GameScreen);
