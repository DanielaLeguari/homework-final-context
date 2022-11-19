import Aside from '../../components/Aside/Aside';
import styles from './UpdateContacts.module.css';

import { useForm } from "react-hook-form";
import { TContacts } from '../../utils/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactsFormSchema } from '../../utils/schemas';
import { useContext } from 'react';
import { ContactsContext } from '../../context/ContactContext';
import { useLocation } from 'react-router-dom';
import InputMask from 'react-input-mask'

const UpdateContacts = () => {
  const { state } = useLocation()
  const { register, handleSubmit, formState: { errors } } = useForm<TContacts>({
    resolver: yupResolver(contactsFormSchema)
  });
  const { updateContact } = useContext(ContactsContext);

  return (
    <>
    <Aside />
    <form className={styles.form} onSubmit={handleSubmit((data: TContacts) => updateContact(state.idContato, data))}>
      <div className={styles.container}>
      <h2>Cadastrar novo Contato</h2>

      <div>
        <label htmlFor="tipoContato"><span>*</span> TipoContato:</label>
        <input type="text" id="tipoContato" {...register("tipoContato")} />
        {errors.tipoContato && <span>{errors.tipoContato.message}</span>}
      </div>

      <div>
      <label htmlFor="telefone"><span>*</span> Telefone:</label>
        <InputMask mask="(99)99999-9999" type="text" id="telefone" {...register("telefone")} />
        {errors.telefone && <span>{errors.telefone.message}</span>}
      </div>

      <div>
        <label htmlFor="descricao"><span>*</span> Descrição:</label>
        <input type="text" id="descricao" {...register("descricao")} />
        {errors.descricao && <span>{errors.descricao.message}</span>}
      </div>

      <input type="submit" value="Cadastrar" />
      </div>
    </form>
    </>
  )
}

export default UpdateContacts