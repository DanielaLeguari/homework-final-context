import styles from './Header.module.css'

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <h2>Endereços</h2>
      </div>
      <div className={styles.roles}>
        <span>Tipo</span>
        <span>Logradouro</span>
        <span>Número</span>
        <span>Complemento</span>
        <span>CEP</span>
        <span>Cidade</span>
        <span>Estado</span>
        <span>País</span>
        <span>Ações</span>
      </div>
    </>
  )
}

export default Header