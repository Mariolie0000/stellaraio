import { createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./reducers";
import storage from 'redux-persist/lib/storage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export function configureStore(initialState) {

  const store = createStore(
    persistedReducer,
      initialState,
      composeEnhancers(),
  );
  let persistor = persistStore(store)
  return {store, persistor};
}