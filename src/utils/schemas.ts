import * as yup from "yup";

export const personFormSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite seu nome").min(2, "O nome precisa ter no mínimo 2 caracteres"),
  dataNascimento: yup.string().required("Por favor, digite sua data de nascimento"),
  cpf: yup.string().required("Por favor, digite seu CPF").length(14, "O CPF precisa ter 11 dígitos"),
  email: yup.string().required("Por favor, digite seu e-mail").email("Por favor, digite um e-mail válido")
});

export const contactsFormSchema = yup.object().shape({
  tipoContato: yup.string().required("Por favor, digite o tipo de contato "),
  telefone: yup.string().required("Por favor, digite um número de telefone").min(11, "Por favor, digite um número de telefone válido"),
  descricao: yup.string().required("Por favor, digite uma descrição")
})

export const addressFormSchema = yup.object().shape({
  cep:yup.string().required("Por favor, digite o CEP").length(9, "O CEP precisa ter 9 dígitos"),
  logradouro: yup.string().required("Por favor, digite o logradouro").min(1, "O logradouro precisa ter no mínimo 1 caracter"),
  numero: yup.string().required("Por favor, digite o número"),
  complemento: yup.string().required("Por favor, digite o complemento"),
  cidade: yup.string().required("Por favor, informe a cidade"),
  estado: yup.string().required("Por favor, informe o estado"),
  pais: yup.string().required("Por favor, informa o país"),
 })