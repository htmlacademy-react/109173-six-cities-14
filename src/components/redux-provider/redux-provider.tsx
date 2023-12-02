import React from 'react';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { store } from '../../store';

type ReduxProviderProps = {
  children: React.ReactElement;
  reduxStore: Store;
};

type ReduxProviderWrapperProps = {
  children: React.ReactElement;
};

export function ReduxProvider({ children, reduxStore }: ReduxProviderProps) {
  return (
    <Provider store={ reduxStore }>{ children }</Provider>
  );
}

export function ReduxProviderWrapper({ children }: ReduxProviderWrapperProps) {
  return <ReduxProvider reduxStore={ store }>{ children }</ReduxProvider>;
}
