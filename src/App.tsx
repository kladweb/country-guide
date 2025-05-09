import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PagesRouter } from './routes/PagesRouter';
import { store } from './redux/store';
import { Header } from './components/Header/Header';
import './styles/app.scss';

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Header/>
      <main>
        <PagesRouter/>
      </main>
    </BrowserRouter>
  </Provider>
);
