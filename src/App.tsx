import {BrowserRouter, Route} from 'react-router-dom'
import { Home } from './pages/Home';
import { Newroom } from './pages/Newroom';
import { AuthContextProvider } from './contexts/AuthContext';

export function App() {
 
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/rooms/new" component={Newroom}/>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

