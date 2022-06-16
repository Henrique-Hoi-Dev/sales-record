import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';

import history from './services/history';
import App from './App';
import Loading from './components/atoms/loading/loading';

import GlobalStyle from './styles/global';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loading titulo="Carregando" />}>
        <BrowserRouter history={history}>
          <ToastContainer autoClose={3000} />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
          <GlobalStyle />
        </BrowserRouter>
      </Suspense>
    </Provider>
  </React.StrictMode>
);

