import styles from './CreateContacts.module.css'

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { TContacts } from "../../utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactsFormSchema } from "../../utils/schemas";
import InputMask from "react-input-mask";
import Aside from '../../components/Aside/Aside';
import { ContactsContext } from '../../context/ContactContext';
import { useLocation } from 'react-router-dom';


const CreateContacts = () => {
  const { state } = useLocation();
  const { createContact } = useContext(ContactsContext);
  const { register, handleSubmit, formState: { errors } } = useForm<TContacts>({
    resolver: yupResolver(contactsFormSchema)
  });

  return (
    <>
      <Aside />
      <form className={styles.form} onSubmit={handleSubmit((data: TContacts) => createContact(data, state))}>
        <div className={styles.container}>
        <h2>Cadastrar novo contato</h2>

        <div>
          <label htmlFor="tipoContato"><span>*</span> Tipo do Contato:</label>
          <select id="tipoContato" {...register("tipoContato")}>
            <option value="RESIDENCIAL">Residencial</option>
            <option value="COMERCIAL">Comercial</option>
          </select>
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

export default CreateContacts