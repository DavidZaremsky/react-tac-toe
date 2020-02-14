import rootReducer from '../redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(initialState = {}) {


  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../redux', () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
}
