import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { signUpRequest } from '../../store/modules/auth/actions';
import { Content, Wrapper } from 'pages/SignIn/styles';

import * as Yup from 'yup';
import CheckboxComponent from 'components/atoms/checkbox/checkbox';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é Obrigatório.'),
  email: Yup.string().email('Insira um e-mail válido.').required('O e-mail é obrigatório.'),
  password: Yup.string().min(6, 'No mínimo 6 caracteres').required('A Senha é obrigatória.'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  const [data, setData] = useState({});

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  console.log(data, "confirma senha", confirmPassword)

  function handleSubmit({ name, email, password }) {
    if(password !== confirmPassword){
      setPasswordError(true)
      return
    }
    setPasswordError(false)
    console.log("função salrvar", name, email, password, confirmPassword)
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <Wrapper>
      <Content>
        <Form schema={schema} onSubmit={handleSubmit} className='animate__animated animate__bounce'>
          <h2>Registro usuário</h2>
          <Input name="name" placeholder="Seu nome completo" />
          <Input name="email" type="email" placeholder="Seu e-mail" />
          <Input
            name="password" 
            placeholder="Senha" 
            type={showPassword ? "text" : "password"}
            value={data?.password ?? ""}
            onChange={(ev) =>
              setData((state) => ({
                  ...state,
                  password: ev.target.value
              }))
            }
          />

          <Input
            name="confirmar" 
            placeholder="Confirmar Senha" 
            type={showPassword ? "text" : "password"}
            value={confirmPassword ?? ""}
            onChange={(ev) => setConfirmPassword(ev.target.value)}
          />
          {passwordError && (
            <span style={{  color: "red" }}>Senha não são iguais</span>
          )}

          <div className="check">
            <CheckboxComponent
              checked={showPassword}
              onChange={(ev) => setShowPassword(ev.target.checked)}
            />
            <h3>Visualizar Senha</h3>
          </div>
          <button type="submit">Cadastrar</button>
          <Link to="/">já sou cadastrado</Link>
        </Form>
      </Content>
    </Wrapper>
  );
}
