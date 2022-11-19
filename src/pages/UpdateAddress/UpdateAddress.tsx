import Aside from '../../components/Aside/Aside';
import styles from './UpdateAddress.module.css';

import { useForm } from "react-hook-form";
import { useContext } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { addressFormSchema } from "../../utils/schemas";

import { TAddressData } from "../../utils/types";
import { AddressContext } from '../../context/AddressContext';

import InputMask from "react-input-mask";
import { useLocation } from 'react-router-dom';

const UpdateAddress = () => {
  const { state } = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm<TAddressData>({
    resolver: yupResolver(addressFormSchema)
  });
  const { updateAddress } = useContext(AddressContext);

  return (
    <>
      <Aside />
      <form className={styles.form} onSubmit={handleSubmit((data: TAddressData) => updateAddress(data.idEndereco, data))}>
        <div className={styles.container}>
          <h2>Atualizar Endereço</h2>
          <input type="hidden" id="idEndereco" defaultValue={state.idEndereco} {...register("idEndereco")} />

          <input type="hidden" id="idPessoa" defaultValue={state.idPessoa} {...register("idPessoa")} />
          <div>
            <label htmlFor="cep"><span>*</span> CEP</label>
            <InputMask mask="99999-999" type="text" defaultValue={state.cep} id="cep" {...register("cep")} />
            {errors.cep && <p>{errors.cep.message}</p>}
          </div>

          <div>
            <label htmlFor="tipo"><span>*</span> Tipo do endereço</label>
            <select id="tipo" defaultValue={state.tipo} {...register("tipo")}>
              <option value="RESIDENCIAL">Residencial</option>
              <option value="COMERCIAL">Comercial</option>
            </select>
            {errors.tipo && <p>{errors.tipo.message}</p>}
          </div>

          <div>
            <label htmlFor="logradouro"><span>*</span> Logradouro</label>
            <input type="text" defaultValue={state.logradouro} id="logradouro" {...register("logradouro")} />
            {errors.logradouro && <p>{errors.logradouro.message}</p>}
          </div>

          <div>
            <label htmlFor="numero"><span>*</span> Número</label>
            <input type="number" defaultValue={state.numero} id="numero" {...register("numero")} />
            {errors.numero && <p>{errors.numero.message}</p>}
          </div>

          <div>
            <label htmlFor="complemento"><span>*</span> Complemento</label>
            <input type="text" defaultValue={state.complemento} id="complemento" {...register("complemento")} />
            {errors.complemento && <p>{errors.complemento.message}</p>}
          </div>

          <div>
            <label htmlFor="cidade"><span>*</span> Cidade</label>
            <input type="text" defaultValue={state.cidade} id="cidade" {...register("cidade")} />
            {errors.cidade && <p>{errors.cidade.message}</p>}
          </div>

          <div>
            <label htmlFor="estado"><span>*</span> Estado</label>
            <input type="text" defaultValue={state.estado} id="estado" {...register("estado")} />
            {errors.estado && <p>{errors.estado.message}</p>}
          </div>

          <div>
            <label htmlFor="pais"><span>*</span> País</label>
            <input type="text" id="pais" defaultValue='Brasil' {...register("pais")} />
            {errors.pais && <p>{errors.pais.message}</p>}
          </div>

          <input type="submit" value="Atualizar" />
        </div>
      </form>
    </>
  )
}

export default UpdateAddress