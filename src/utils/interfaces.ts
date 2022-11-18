export interface IUser {
  nome: string,
  cpf: string,
  rg: string,
  cnh: string,
  nomeMae: string,
  nomePai: string,
  tituloEleitor: string,
  sexo: 'F' | 'M'
}

export interface IChildren {
  children?: React.ReactNode
}