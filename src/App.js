import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AppRouter } from './router/AppRouter';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { ToastProvider } from 'react-toast-notifications';

export const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </ChakraProvider>
    </Provider>
  );
};
