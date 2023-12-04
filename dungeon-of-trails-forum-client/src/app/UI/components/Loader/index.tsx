import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import styles from './Loader.module.scss';

const Loader = () => {
  const [show, setShow] = useState(true);

  return (
    <div className={styles.LoadCont}>
      <ReactLoading color="#367223" />
    </div>
  );
};

export default Loader;
