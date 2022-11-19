import { useContext } from 'react'
import styles from './Address.module.css'

import edit from '../../assets/edit-icon.svg'
import deleteIcon from '../../assets/delete-icon.svg'

import Aside from '../../components/Aside/Aside'
import Header from './Header/Header'

import { AddressContext } from '../../context/AddressContext'

import { useNavigate } from 'react-router-dom'
import { AddressPagination } from '../../components/AddressPagination/AddressPagination'

const Address = () => {
  const navigate = useNavigate()
  const { addressList } = useContext(AddressContext)
  const { deleteAddress } = useContext(AddressContext)

  return (
    <>
      <Aside />
      <main>
        <h1>Lista de endereços</h1>
        <div className={styles.container}>
          <Header />
          {addressList.map((actualAddress) => (
            <div key={actualAddress.idPessoa} className={styles.content}>
              <span>{actualAddress.tipo}</span>
              <span>{actualAddress.logradouro}</span>
              <span>{actualAddress.numero}</span>
              <span>{actualAddress.complemento}</span>
              <span>{actualAddress.cep.replace(/\D/g, '')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{3})\d+?$/, '$1')}
              </span>
              <span>{actualAddress.cidade}</span>
              <span>{actualAddress.estado}</span>
              <span>{actualAddress.pais}</span>
              <div>
                <button onClick={() => { navigate('/address/update', { state: actualAddress }) }}><img src={edit} alt="Edit Icon" /></button>

                <button onClick={() => deleteAddress(actualAddress.idEndereco)}><img src={deleteIcon} alt="Delete Icon" /></button>
              </div>
            </div>
          ))}
          <AddressPagination />
        </div>
      </main>
    </>
  )
}

export default Address