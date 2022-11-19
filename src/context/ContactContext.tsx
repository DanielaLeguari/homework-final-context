import { TChildren, TContactsContext, TContactsData, TContacts } from '../utils/types'
import { createContext, useState } from "react";

import { API } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import nProgress from 'nprogress';
import { toastConfig } from "../utils/toast";

export const ContactsContext = createContext({} as TContactsContext);

export const ContactsProvider = ({ children }: TChildren) => {
  const token = localStorage.getItem('token');
  const [contactsList, setContacts] = useState<TContactsData[]>([]);
  const navigate = useNavigate();

  const getContacts = async () => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      const { data } = await API.get(`/contato`);
      setContacts(data);
    } catch (error) {
      toast.error('Houve um erro inesperado', toastConfig);
    } finally {
      nProgress.done();
    }
  };

  const createContact = async (contact: TContacts, state: number) => { //NÃO ESTÁ FUNCIONANDO
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      contact.tipoContato = contact.tipoContato.toUpperCase();
      contact.idPessoa = state;
      await API.post(`/contato/${state}`, contact);
      toast.success("Contato cadastrado com sucesso!", toastConfig);
      navigate("/contacts");
    } catch (error) {
      toast.error('Houve um erro inesperado', toastConfig);
    } finally {
      nProgress.done();
    }
  };

  const deleteContact = async (idContato: number) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      await API.delete(`/contato/${idContato}`);
      toast.success("Contato excluído com sucesso!",toastConfig);
      getContacts()
    } catch (error) {
      toast.error('Houve um erro inesperado', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const updateContact = async (idContato: number, data: TContacts) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      data.tipoContato = data.tipoContato.toUpperCase();
      await API.put(`/contato/${idContato}`, data);
      toast.success('Contato atualizado com sucesso!', toastConfig);
      navigate('/contacts');
    } catch (error) {
      toast.error('Houve um erro inesperado', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  return (
    <ContactsContext.Provider value={{ getContacts, contactsList, createContact, deleteContact, updateContact }}>
      {children}
    </ContactsContext.Provider>
  )
}