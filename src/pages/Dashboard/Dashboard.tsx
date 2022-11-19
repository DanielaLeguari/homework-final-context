import { useContext } from 'react'
import styles from './Dashboard.module.css'

import edit from '../../assets/edit-icon.svg'
import deleteIcon from '../../assets/delete-icon.svg'
import locationIcon from '../../assets/location-icon.svg'
import contactIcon from '../../assets/contact-icon.svg'

import Aside from '../../components/Aside/Aside'
import Header from './Header/Header'

import { PersonContext } from '../../context/PersonContext'

import { useNavigate } from 'react-router-dom'
import { Pagination } from '../../components/Pagination/Pagination'

const Dashboard = () => {
  const navigate = useNavigate()
  const { people, deletePerson } = useContext(PersonContext)

  return (
    <>
      <Aside />
      <main>
        <h1>Lista de pessoas</h1>
        <div className={styles.container}>
          <Header />
          {people.map((person) => (
            <div key={person.idPessoa} className={styles.content}>
              <span>{person.nome}</span>
              <span>{person.dataNascimento.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}</span>
              <span>{person.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</span>
              <span>{person.email}</span>
              <div>
                <button onClick={() => { navigate('/address/create', { state: person.idPessoa }) }}><img src={locationIcon} alt="Location Icon" /></button>

                <button onClick={() => { navigate('/contact/create', { state: person.idPessoa }) }}><img src={contactIcon} alt="Contact Icon" /></button>

                <button onClick={() => { navigate('/person/update', { state: person }) }}><img src={edit} alt="Edit Icon" /></button>
                
                <button onClick={() => deletePerson(person.idPessoa)}><img src={deleteIcon} alt="Delete Icon" /></button>
              </div>
            </div>
          ))}
          <Pagination />
        </div>
      </main>
    </>
  )
}

export default Dashboard