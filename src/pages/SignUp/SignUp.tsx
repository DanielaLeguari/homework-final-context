import styles from './SignUp.module.css';
import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { TUser } from '../../utils/types';

import { AuthContext } from '../../context/AuthContext';

const SignUp = () => {
  const { register, handleSubmit, reset } = useForm<TUser>();
  const { handleUserSignUp } = useContext(AuthContext);

  const handleSignUp = (data: TUser) => { handleUserSignUp(data); reset() };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(handleSignUp)}>
        <div className={styles.container}>
          <h2>Criar conta</h2>
          <div>
            <label htmlFor="login"><span>*</span>Usuário:</label>
            <input type="text" placeholder='Digite o seu usuário' required id='login' {...register('login')} />
          </div>
          <div>
            <label htmlFor="senha"><span>*</span>Senha:</label>
            <input type="password" placeholder='Digite a sua senha' required id='senha' {...register('senha')} />
          </div>
          <input type="submit" value='Cadastrar agora' />
          <Link to={'/'}>Já tem uma conta? Faça login!</Link>
        </div>
      </form>
    </>
  )
};

export default SignUp;