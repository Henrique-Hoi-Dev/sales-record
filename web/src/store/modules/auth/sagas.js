import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import { api } from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
 const { email, password } =  payload
  try {
    const response = yield call(api.post, 'users/authenticate', {
      email,
      password,
    });

    const { token, users } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, users));
    history.push('/');
  } catch (err) {
    toast.error('Falha na autenticação verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users/register', {
      name,
      email,
      password,
    });

    history.push('/login');
    toast.success('Cadastro concluído com sucesso!');
  } catch (err) {
    toast.error('Falha no cadrastro, verifique seu dados!');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token} `;
  }
}

export function signOut() {
  history.push('/login');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
