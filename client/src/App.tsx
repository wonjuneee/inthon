import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContent';
import { RouteComponent } from './routes';
import './styles/tailwind.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteComponent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
