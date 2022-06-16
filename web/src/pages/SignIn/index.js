import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';
import { Content, Wrapper } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('! Insira um e-mail válido')
    .required('! O e-mail é obrigatório'),
  password: Yup.string().required('! A Senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <Wrapper>
      <Content>
        <Form schema={schema} onSubmit={handleSubmit} className='animate__animated animate__bounce'>
          <h2>Login usuário</h2>
          <Input name="email" type="email" placeholder="Seu e-mail" />
          <Input name="password" type="password" placeholder="Sua senha" />

          <button type="submit">{loading ? 'Carregando..' : 'Acessar'}</button>
          <Link to="/register">Cadastrar Usuário</Link>
        </Form>
      </Content>
    </Wrapper>
  );
}
