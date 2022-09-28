import React, { useState} from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Header from '../../components/Header';

export default function Login() {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  async function handleSubmit(e){
    e.preventDefault();
    let formErrors = false;

    if(cpf.length < 11 || cpf.length >14 ){
      formErrors = true;
      toast.error('CPF deve ter entre 11 e 14 caracteres');
    }

    if(password.length < 3 || password.length >255 ){
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }
    if (formErrors) return;

    try{
      const response = await axios.post('/users/', {
        cpf,
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
    <>
    <Container>
      <h1 className='login'>Login</h1>
      
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          CPF:
          <input type="text" value={cpf} onChange={e=> setCpf(e.target.value)} placeholder="Seu CPF"/>
        </label>
        <label htmlFor="password">
          Senha:
          <input type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder="Sua senha"/>
        </label>
        <button type="submit">Fazer Login</button>
      </Form>

    </Container>
    </>
  
  );
}
