import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AuthContextProvider from './components/context/AuthContext.jsx';


function App() {
  return (
    <AuthContextProvider>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </AuthContextProvider>
  );
}

export default App;
