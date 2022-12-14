import React from "react"

export type TUser = {
  login: string,
  senha: string
}

export type TChildren = {
  children: React.ReactNode;
}

// Tipos Auth Context
export type TAuthContext = {
  handleUserSignUp: (newUser: TUser) => Promise<void>,
  handleUserLogin: (user: TUser) => Promise<void>,
  handleUserLogout: () => void,
  token: string | null
}

// Tipos Person Context
export type TPeopleContext = {
  createPerson: (people: TPeople) => Promise<void>,
  deletePerson: (idPessoa: number) => Promise<void>,
  updatePerson: (id: number, people: TPeople) => Promise<void>,
  getPerson: (page: string) => Promise<void>,
  people: TPeopleData[],
  totalPages: number
}

export type TPeople = {
  nome: string,
  dataNascimento: string,
  cpf: string,
  email: string
}
 
export interface TPeopleData extends TPeople {
  idPessoa: number
}

// Tipos Address Context
export type TAddressContext = {
  getAddress: (page: string) => Promise<void>,
  createAddress: (data: TAddress) => Promise<void>,
  deleteAddress: (idEndereco: number) => Promise<void>,
  updateAddress: (idEndereco:number, data: TAddress) => Promise<void>,
  getAddressByCep: (cep: string) => Promise<void>,
  addressFromApi: Record<string, string>,
  addressList: TAddressData[],
  totalPages: number
}

export type TAddress = {
  idPessoa: number,
  tipo: string,
  logradouro: string,
  numero: number,
  complemento: string,
  cep: string,
  cidade: string,
  estado: string,
  pais: string
}

export interface TAddressData extends TAddress {
  idEndereco: number,
  idPessoa: number
}

// Tipos Contacts Context
export type TContactsContext = {
  getContacts: () => Promise<void>,
  createContact: (contact: TContacts, status: number) => Promise<void>,
  deleteContact: (idContato: number) => Promise<void>,
  updateContact: (idContato: number, people: TContacts) => Promise<void>,
  contactsList: TContactsData[]
}

export type TContacts = {
  idPessoa: number
  tipoContato: string,
  telefone: string,
  descricao: string,
}

export interface TContactsData extends TContacts {
  idContato: number
}