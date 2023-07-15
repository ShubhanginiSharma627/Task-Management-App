import { useContext } from 'react';
import { RootStoreContext } from '../pages/_app';
import { Task } from "../store";
export const useRootStore = () => {
  const rootStore = useContext(RootStoreContext);

  if (!rootStore) {
    throw new Error('Root store is not available');
  }

  return rootStore;
};
