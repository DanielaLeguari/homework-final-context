import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <h2>Contatos</h2>
      </div>
      <div className={styles.roles}>
        <span>Tipo</span>
        <span>Telefone</span>
        <span>Descrição</span>
        <span>Ações</span>
      </div>
    </>
  )
}

export default Header