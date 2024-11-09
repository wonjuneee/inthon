import './App.css';
import { BrowserRouter } from 'react-router-dom';

import { RouteComponent } from './routes';
import './styles/tailwind.css';

function App() {
  return (
    <BrowserRouter>
      <RouteComponent />
    </BrowserRouter>
  );
}

export default App;
