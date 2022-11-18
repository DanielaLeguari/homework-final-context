import Aside from '../../components/Aside/Aside';
import styles from './UpdatePerson.module.css';

import { useForm } from "react-hook-form";
import { TPeople } from '../../utils/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { personFormSchema } from '../../utils/schemas';
import { useContext } from 'react';
import { PersonContext } from '../../context/PersonContext';
import { useLocation } from 'react-router-dom';
import InputMask from 'react-input-mask'

const UpdatePerson = () => {
  const { state } = useLocation()
  const { register, handleSubmit, formState: { errors } } = useForm<TPeople>({
    resolver: yupResolver(personFormSchema)
  });
  const { updatePerson } = useContext(PersonContext);

  return (
    <>
      <Aside />
      <form className={styles.form} onSubmit={handleSubmit((data: TPeople) => updatePerson(state.idPessoa, data))}>
        <div className={styles.container}>
          <h2>Atualizar dados</h2>

          <div>
            <label htmlFor="nome"><span>*</span> Nome:</label>
            <input type="text" defaultValue={state.nome} id="nome" {...register("nome")} />
            {errors.nome && <span>{errors.nome.message}</span>}
          </div>

          <div>
          <label htmlFor="dataNascimento"><span>*</span> Data de Nascimento:</label>
            <input type="date" defaultValue={state.dataNascimento} id="dataNascimento" {...register("dataNascimento")} />
            {errors.dataNascimento && <span>{errors.dataNascimento.message}</span>}
          </div>

          <div>
            <label htmlFor="cpf"><span>*</span> CPF:</label>
            <InputMask mask="999.999.999-99" type="text" disabled value={state.cpf} id="cpf" {...register("cpf")} />
          </div>

          <div>
            <label htmlFor="email"><span>*</span> E-mail:</label>
            <input type="text" defaultValue={state.email} id="email" {...register("email")} />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <input type="submit" value='Editar' />
        </div>
      </form>
    </>
  )
}

export default UpdatePerson