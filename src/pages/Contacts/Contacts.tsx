import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactsContext } from '../../context/ContactContext';

import edit from '../../assets/edit-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';

import styles from './Contacts.module.css';
import Header from './Header/Header';
import Aside from '../../components/Aside/Aside';


const Contacts = () => {
  const navigate = useNavigate();
  const { contactsList, getContacts } = useContext(ContactsContext);

  useEffect(()=>{
    getContacts();
  }, [])

  return (
    <><Aside />
    <main>
      <h1>Lista de endereços</h1>
      <div className={styles.container}>
        <Header />
        {contactsList.map((contact) => (
            <div key={contact.idPessoa} className={styles.content}>
              <span>{contact.tipoContato}</span>
              <span>{contact.telefone}</span>
              <span>{contact.descricao}</span>
              <div>
                <button onClick={() => { navigate('contact/update', { state: contact }) }}><img src={edit} alt="Edit Icon" /></button>
                
                <button><img src={deleteIcon} alt="Delete Icon" /></button>
              </div>
            </div>
          ))}
      </div>
    </main>
    </>
  )
}

export default Contacts