import * as React from 'react';
import { render } from 'enzyme';
import { mockedGenreQuestionAnswer } from '~/mocks/mocks';
import GenreQuestionAnswer from './genre-question-answer';

describe(`GenreQuestionAnswer component`, () => {
  it(`should render GenreQuestionAnswer component`, () => {
    const component = render(
      <GenreQuestionAnswer
        answer={mockedGenreQuestionAnswer}
        isChecked={true}
        idx={1}
        changeAnswer={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
