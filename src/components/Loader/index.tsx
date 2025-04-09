import * as React from 'react';
import './styles.css';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center backdrop-blur-md z-50">
      <div className="relative size-60 loader" />
    </div>
  );
};

export default Loader;
