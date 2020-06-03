import React from 'react';
import MuiProvider from './MuiProvider'; 

const Providers = ({
  children, 
}) => {
  return (
    [
      MuiProvider, 

    ].reduce((children, Provider) => {
      return (
        <Provider>{children}</Provider>
      );
    }, children)
  );
}

export default Providers
