
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles.css';
import { Provider } from 'react-redux';
import store from './Store/store.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
);