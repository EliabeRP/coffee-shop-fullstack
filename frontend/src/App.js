import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import UserDetails from './pages/UserDetails';
import UserEdit from './pages/UserEdit';
import UserOrders from './pages/UserOrders';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import ProductForm from './components/ProductForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<UserDetails />} />
        <Route path="/profile/edit" element={<UserEdit />} />
        <Route path="/profile/orders" element={<UserOrders />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products/new" element={<ProductForm />} />
        <Route path="/admin/products/edit/:id" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
