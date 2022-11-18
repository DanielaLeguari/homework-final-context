import { TChildren, TAddressContext, TAddressData } from '../utils/types'
import { createContext, useState } from "react";

import { API } from '../utils/api';
import nProgress from 'nprogress';

export const AddressContext = createContext({} as TAddressContext);

export const AddressProvider = ({ children }: TChildren) => {
  const token = localStorage.getItem('token');
  const [totalPages, setTotalPages] = useState(0);
  const [addressList, setAddress] = useState<TAddressData[]>([])

  const getAddress = async (page: string) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      const { data } = await API.get(`/endereco?pagina=${parseInt(page) - 1}&tamanhoDasPaginas=20`);
      setTotalPages(data.totalPages);
      setAddress(data.content);
    } catch (error) {
      console.error(error)
    } finally {
      nProgress.done();
    }
  };

  return (
    <AddressContext.Provider value={{ getAddress, addressList, totalPages }}>
      {children}
    </AddressContext.Provider>
  )
}