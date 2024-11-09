import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContent';
import { RouteComponent } from './routes';
import './styles/tailwind.css';

function App() {
  return (
    <AuthProvider isTestMode={true}>
      <BrowserRouter>
        <RouteComponent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
