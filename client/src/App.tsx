import { BrowserRouter } from 'react-router-dom';
import { AppRoute } from './routes/AppRoute';
import './App.css';
import { Toaster } from "sonner"; 

function App() {
  return (
    <BrowserRouter>
      <AppRoute />
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default App;