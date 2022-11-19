import styles from './Header.module.css'

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <h2>Pessoas cadastradas</h2>
        <Link to={'/person/create'}><button>Adicionar pessoa</button></Link>
      </div>
      <div className={styles.roles}>
        <span>Nome</span>
        <span>Data de Nascimento</span>
        <span>CPF</span>
        <span>E-mail</span>
        <span>Ações</span>
      </div>
    </>
  )
}

export default Header