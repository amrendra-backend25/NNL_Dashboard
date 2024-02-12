import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { Toaster } from 'react-hot-toast';
import * as serviceWorker from './serviceWorker';
import 'react-quill/dist/quill.snow.css';
ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <CssBaseline />
      <App />
      <Toaster />
    </BrowserRouter>
  </StyledEngineProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
