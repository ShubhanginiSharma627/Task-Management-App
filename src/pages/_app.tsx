import { Provider } from 'mobx-react';
import React from 'react';

import { rootStore, RootStoreType } from '../store';
import { ReactNode } from 'react';

interface AppProps {
  Component: any;
  pageProps: any;
}

export const RootStoreContext = React.createContext<RootStoreType | undefined>(undefined);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider rootStore={rootStore}>
      <RootStoreContext.Provider value={rootStore}>
        <Component {...pageProps} />
      </RootStoreContext.Provider>
    </Provider>
  );
};

export default App;
