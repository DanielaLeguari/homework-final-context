import { TChildren, TAddressContext, TAddressData, TAddress } from '../utils/types'
import { createContext, useState } from "react";

import { API } from '../utils/api';
import nProgress from 'nprogress';

import { toastConfig } from '../utils/toast';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AddressContext = createContext({} as TAddressContext);

export const AddressProvider = ({ children }: TChildren) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [totalPages, setTotalPages] = useState(0);
  const [addressList, setAddress] = useState<TAddressData[]>([])
  const [addressFromApi, setAddressFromApi] = useState<Record<string, string>>({});

  const getAddress = async (page: string) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      const { data } = await API.get(`/endereco?pagina=${parseInt(page) - 1}&tamanhoDasPaginas=20`);
      setTotalPages(data.totalPages);
      setAddress(data.content);
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  //get Viacep
  const getAddressByCep = async (cep: string) => {
    try {
      nProgress.start();
      cep = cep.replace(/[^\d]/g, '');
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddressFromApi(data);
      console.log(addressFromApi);
    } catch (error) {
      console.error(error);
    } finally {
      nProgress.done();
    }
  }

  //Post
  const createAddress = async (data: TAddress) => {
    try {
      nProgress.start();

      data.cep = data.cep.replace(/[^\d]/g, '');
      console.log(data);
      API.defaults.headers.common["Authorization"] = token;
      await API.post(`/endereco/${data.idPessoa}?idPessoa=${data.idPessoa}`, data); 
      toast.success("Endereço cadastrado com sucesso!", toastConfig);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro no cadastro, tente novamente!", toastConfig);
    } finally {
      nProgress.done();
    }
  }

  //delete
  const deleteAddress = async (idEndereco: number) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      await API.delete(`/endereco/${idEndereco}`);
      toast.success("Endereço excluído com sucesso!", toastConfig);
      navigate("/address");
      await getAddress("1");
    } catch (error) {
      toast.error("Houve algum erro, tente novamente!", toastConfig);
    } finally {
      nProgress.done();
    }
  }

  //put
  const updateAddress = async (idEndereco: number, data: TAddress) => {
    try {
      nProgress.start();
      data.cep = data.cep.replace(/[^\d]/g, '');
      console.log(data);
      API.defaults.headers.common["Authorization"] = token;
      await API.put(`/endereco/${idEndereco}`, data);
      toast.success("Endereço atualizado com sucesso!", toastConfig);
      navigate("/address");
    } catch (error) {
      console.log(error);
      toast.error("Houve algum erro, tente novamente!", toastConfig);
    } finally {
      nProgress.done();
    }
  }

  return (
    <AddressContext.Provider value={{ getAddress, addressList, totalPages, createAddress, deleteAddress, updateAddress, getAddressByCep, addressFromApi }}>
      {children}
    </AddressContext.Provider>
  )
}