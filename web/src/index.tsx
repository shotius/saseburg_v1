import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux_tk/app/store';
import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';

ReactDOM.render(
  <ReduxProvider store={store}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
