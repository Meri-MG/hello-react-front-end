import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { GET_GREETINGS_SUCCESS } from '../components/HelloWorld';

const inititalState = {
  greetings: [
    {
      name: 'Hi',
    },
  ],
};

function rootReducer(state, action) {
  switch (action.type) {
    case GET_GREETINGS_SUCCESS:
      return { greetings: action.json };
    default:
      return state;
  }
}

export default function configureStore() {
  const store = createStore(
    rootReducer,
    inititalState,
    composeWithDevTools(
      applyMiddleware(thunk),
    ),
  );
  return store;
}
