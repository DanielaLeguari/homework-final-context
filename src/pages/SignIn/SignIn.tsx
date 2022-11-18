import styles from './SignIn.module.css';
import { useContext } from 'react';

import { Link, Navigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { TUser } from '../../utils/types';

import { AuthContext } from '../../context/AuthContext';

const SignIn = () => {
  const { register, handleSubmit, reset } = useForm<TUser>();
  const { handleUserLogin, token } = useContext(AuthContext);

  const handleLogin = (data: TUser) => { handleUserLogin(data); reset() };
  if(token) return <Navigate to={'/dashboard'} />

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
        <div className={styles.container}>
          <h2>Fazer Login</h2>
          <div>
            <label htmlFor="login"><span>*</span>Usuário:</label>
            <input type="text" placeholder='Digite o seu usuário' required id='login' {...register('login')} />
          </div>
          <div>
            <label htmlFor="senha"><span>*</span>Senha:</label>
            <input type="password" placeholder='Digite a sua senha' required id='senha' {...register('senha')} />
          </div>
          <input type="submit" value='Entrar' />
          <Link to={'/signup'}>Cadastre-se agora!</Link>
        </div>
      </form>
    </>
  )
};

export default SignIn;