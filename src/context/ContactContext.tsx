import { TChildren, TContactsContext, TContactsData } from '../utils/types'
import { createContext, useState } from "react";

import { API } from '../utils/api';
import nProgress from 'nprogress';

export const ContactsContext = createContext({} as TContactsContext);

export const ContactsProvider = ({ children }: TChildren) => {
  const token = localStorage.getItem('token');
  const [totalPages, setTotalPages] = useState(0);
  const [contactsList, setContacts] = useState<TContactsData[]>([])

  const getContacts = async () => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      const { data } = await API.get(`/contato`);
      setTotalPages(data.totalPages);
      setContacts(data);
      console.log(data)
    } catch (error) {
      console.error(error)
    } finally {
      nProgress.done();
    }
  };

  return (
    <ContactsContext.Provider value={{ getContacts, contactsList, totalPages }}>
      {children}
    </ContactsContext.Provider>
  )
}