import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AuthContextProvider from './context/AuthContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
