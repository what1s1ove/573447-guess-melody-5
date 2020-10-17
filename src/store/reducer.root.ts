import { combineReducers } from 'redux';
import { gameReducer } from '~/store/reducers/game/game';

const rootReducer = combineReducers({
  game: gameReducer,
});

export { rootReducer };
