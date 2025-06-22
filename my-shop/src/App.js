import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import AllProducts from './pages/AllProducts/AllProducts';
import AllCategories from './pages/AllCategories/AllCategories';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import NotFound from './pages/NotFound/NotFound';
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/all-sales" element={<AllProducts />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:categoryId" element={<AllProducts />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="*" element={<NotFound />} /> {}
      </Routes>
    </Router>
  );
}

export default App;