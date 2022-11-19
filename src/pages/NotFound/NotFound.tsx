import { Link } from 'react-router-dom';

import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.info}>
          <h1>Página não encontrada</h1>
          <button><Link to={'/dashboard'}><span>&#129064;</span></Link></button>
        </div>
      </div>
    </>
  )
};

export default NotFound;