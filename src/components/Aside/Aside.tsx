import { Link } from 'react-router-dom'
import styles from './Aside.module.css'

import brand from '../../assets/brand.svg'
import location from '../../assets/location.svg'
import contact from '../../assets/contact.svg'
import user from '../../assets/user-icon.svg'
import logout from '../../assets/logout-icon.svg'

import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Aside = () => {
  const { handleUserLogout } = useContext(AuthContext)

  return (
    <>
      <aside className={styles.container}>
        <div className={styles.logo}>
          <img src={brand} alt="Brand" />
          <span>Admin Panel</span>
        </div>
        <div className={styles.info}>
          <span>Menu</span>
          <div>
            <img src={user} alt="Icon User" />
            <Link to={'/dashboard'}><span>Dashboard</span></Link>
          </div>
          <div>
            <img src={location} alt="Icon Location" />
            <Link to={'/address'}><span>Endereços</span></Link>
          </div>
          <div>
            <img src={contact} alt="Icon Contact" />
            <Link to={'/contacts'}><span>Contatos</span></Link>
          </div>
          <div>
            <img src={logout} alt="Icon Logout" />
            <span onClick={handleUserLogout}>SAIR</span>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Aside