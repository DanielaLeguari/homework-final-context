import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import nProgress from 'nprogress';
import { toast } from 'react-toastify';

import { API } from '../utils/api';
import { toastConfig } from '../utils/toast';
import { TAuthContext, TChildren, TUser } from '../utils/types';

export const AuthContext = createContext({} as TAuthContext);

export const AuthProvider = ({ children }: TChildren) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

  const handleUserLogin = async (user: TUser) => {
    try {
      nProgress.start();
      const { data } = await API.post('/auth', user);
      localStorage.setItem('token', data);
      API.defaults.headers.common['Authorization'] = token;
      setToken(data);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Usuário ou senha inválidos!', toastConfig);
    } finally {
      nProgress.done();
    }
  };

  const handleUserLogout = () => {
    localStorage.removeItem('token');
    API.defaults.headers.common['Authorization'] = undefined;
    setToken('');
  };

  const handleUserSignUp = async (newUser: TUser) => {
    try {
      nProgress.start();
      await API.post('/auth/create', newUser);
      toast.success('Usuário criado com sucesso!', toastConfig);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Houve um erro inesperado!', toastConfig);
    } finally {
      nProgress.done();
    }
  };

  return (
    <AuthContext.Provider value={{ token, handleUserLogin, handleUserLogout, handleUserSignUp }}>
      {children}
    </AuthContext.Provider>
  )
};