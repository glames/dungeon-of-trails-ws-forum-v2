import { useState, useEffect } from 'react';

const Loader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [show]);

  return (
    <div className={`loader-wrapper ${show ? '' : 'loderhide'}`}>
      <div className='loader-box'>
        <div className='loader-15'></div>
      </div>
    </div>
  );
};

export default Loader;
