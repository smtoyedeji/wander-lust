import React, { createContext, useState } from 'react';

const WanderContext = createContext();

const WanderProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <WanderContext.Provider value={{ data, setData }}>
      {children}
    </WanderContext.Provider>
  );
};

export { WanderContext, WanderProvider };
