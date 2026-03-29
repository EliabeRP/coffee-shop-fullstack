import { Route, Router, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Login from './pages/Login';

function App() {
  return (
   <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
