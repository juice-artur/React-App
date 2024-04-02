
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles.css';
import { Provider } from 'react-redux';
import store from './store/store.tsx';
import { BrowserRouter } from 'react-router-dom';


module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </Provider>
);