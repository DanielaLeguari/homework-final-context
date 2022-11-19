import styles from './CreatePerson.module.css'

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { PersonContext } from "../../context/PersonContext";
import { TPeople } from "../../utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { personFormSchema } from "../../utils/schemas";
import InputMask from "react-input-mask";
import Aside from '../../components/Aside/Aside';

const CreatePerson = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TPeople>({
    resolver: yupResolver(personFormSchema)
  });
  const { createPerson } = useContext(PersonContext);

  return (
    <>
      <Aside />
      <form className={styles.form} onSubmit={handleSubmit((data: TPeople) => createPerson(data))}>
        <div className={styles.container}>
        <h2>Cadastrar nova pessoa</h2>

        <div>
          <label htmlFor="nome"><span>*</span>Nome:</label>
          <input type="text" id="nome" {...register("nome")} />
          {errors.nome && <span>{errors.nome.message}</span>}
        </div>

        <div>
        <label htmlFor="dataNascimento"><span>*</span>Data de Nascimento:</label>
          <input type="date" id="dataNascimento" {...register("dataNascimento")} />
          {errors.dataNascimento && <span>{errors.dataNascimento.message}</span>}
        </div>

        <div>
          <label htmlFor="cpf"><span>*</span>CPF:</label>
          <InputMask mask="999.999.999-99" type="text" id="cpf" {...register("cpf")} />
          {errors.cpf && <span>{errors.cpf.message}</span>}
        </div>

        <div>
          <label htmlFor="email"><span>*</span>E-mail:</label>
          <input type="text" id="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <input type="submit" value="Cadastrar" />
        </div>
      </form>
    </>
  )
}

export default CreatePerson