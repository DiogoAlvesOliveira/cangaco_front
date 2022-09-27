import React, { useState} from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Header from '../../components/Header';

export default function Login() {
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  async function handleSubmit(e){
    e.preventDefault();
    let formErrors = false;

    if(nome.length < 3 || nome.length >255 ){
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if(password.length < 3 || password.length >255 ){
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }
    if (formErrors) return;

    try{
      const response = await axios.post('/users/', {
        nome,
        password,
      });
      toast.success('Cadastro Realizado!');
      history.push('/');

      console.log(response.data);
    } catch(e){
      const status = get(e , 'response.status', 0);
      const errors = get(e , 'response.data.errors', [] );

      errors.map(error => toast.error(error));
    }
  }
  return (
  
    <Container>
      <h1>Login</h1>
      <Form>
        <label htmlFor="nome">
          Nome:
          <input type="text" value={nome} onChange={e=> setNome(e.target.value)} placeholder="Seu nome"/>
        </label>
        <label htmlFor="password">
          Senha:
          <input type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder="Sua senha"/>
        </label>
        <button type="submit">Fazer Login</button>
      </Form>

    </Container>
  );
}
