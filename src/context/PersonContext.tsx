import { createContext, useState } from "react";

import { toast } from "react-toastify";
import nProgress from "nprogress";
import { useNavigate } from 'react-router-dom';

import { API } from "../utils/api";
import { TPeopleContext, TChildren, TPeople, TPeopleData } from "../utils/types";
import { toastConfig } from "../utils/toast";

export const PersonContext = createContext({} as TPeopleContext);

export const PersonProvider = ({ children }: TChildren) => {
  const [totalPages, setTotalPages] = useState(0);
  const [people, setPeople] = useState<TPeopleData[]>([])
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const createPerson = async (people: TPeople) => {
    try {
      nProgress.start();
      people.cpf = people.cpf.replace(/[^\d]/g, '');
      API.defaults.headers.common["Authorization"] = token;
      await API.post("/pessoa", people);
      toast.success("Pessoa cadastrada com sucesso!", toastConfig);
      navigate("/");
    } catch (error) {
      toast.error("Houve algum erro", toastConfig);
    } finally {
      nProgress.done();
    }
  }
  
  const deletePerson = async (idPessoa: number) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      await API.delete(`/pessoa/${idPessoa}`);
      toast.success("Usuário excluído com sucesso!",toastConfig);
      navigate("/");
    } catch (error) {
      toast.error("Houve algum erro, tente novamente!",toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const updatePerson = async (id: number, people: TPeople) => {
    try {
      nProgress.start();
      people.cpf = people.cpf.replace(/[^\d]/g, '');
      API.defaults.headers.common["Authorization"] = token;
      await API.put(`/pessoa/${id}`, people);
      toast.success('Dados atualizados com sucesso!', toastConfig);
      navigate('/');
    } catch (error) {
      toast.error('Houve um erro inesperado', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const getPerson = async (page: string) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      let { data } = await API.get(`/pessoa?pagina=${parseInt(page) - 1}&tamanhoDasPaginas=20`);
      setTotalPages(data.totalPages);
      setPeople(data.content);
    } catch (error) {
      console.error(error)
    } finally {
      nProgress.done();
    }
  };

  return (
    <PersonContext.Provider value={{ createPerson, people, totalPages, getPerson, deletePerson, updatePerson }}>
      {children}
    </PersonContext.Provider>
  )
}