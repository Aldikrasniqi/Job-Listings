/* eslint-disable jsx-a11y/anchor-is-valid */
import Footer from './Layouts/Footer';
import Header from './Layouts/Header';
import AppRoutes from './Routes/Routes';
import { store } from './Store/Store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
function App() {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
