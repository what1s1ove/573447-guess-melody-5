import * as React from 'react';
import { shallow } from 'enzyme';
import { mockedGenreQuestion } from '~/mocks/mocks';
import GenreQuestionScreen from './genre-question-screen';

describe(`GenreQuestionScreen component`, () => {
  it(`should call callback if answer is selected`, () => {
    const onSubmit = jest.fn();
    const component = shallow(
      <GenreQuestionScreen
        onAnswer={onSubmit}
        question={mockedGenreQuestion}
        renderPlayer={jest.fn()}
      />
    );

    component.find(`.game__tracks`).simulate(`submit`, {
      preventDefault: jest.fn(),
    });

    expect(onSubmit).toHaveBeenCalled();
  });
});
