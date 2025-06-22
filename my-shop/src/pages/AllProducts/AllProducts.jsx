import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {  fetchProducts } from '../../store/productsSlice';
import { fetchCategories } from '../../store/categoriesSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import Header from '../../components/Header/Header';

import style from "./AllProducts.module.css"

function AllProducts() {
  const dispatch = useDispatch();
  const { items: products, status: prodStatus } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState('by default');
  const location = useLocation();
  const { categoryId } = useParams();

  useEffect(() => {
    if (prodStatus === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories()); 
    }
  }, [dispatch, prodStatus]);

  useEffect(() => {
    applyFilters(products);
  }, [products, priceFrom, priceTo, discountOnly, sortBy, location, categoryId]);

  const applyFilters = (data) => {
    let result = [...data];
    if (categoryId) result = result.filter((p) => p.categoryId === Number(categoryId));
    if (discountOnly || location.pathname === '/all-sales') result = result.filter((p) => p.discont_price && p.discont_price < p.price);
    if (priceFrom) result = result.filter((p) => (p.discont_price || p.price) >= Number(priceFrom));
    if (priceTo) result = result.filter((p) => (p.discont_price || p.price) <= Number(priceTo));

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'price: high-low':
        result.sort((a, b) => (b.discont_price || b.price) - (a.discont_price || a.price));
        break;
      case 'price: low-high':
        result.sort((a, b) => (a.discont_price || a.price) - (b.discont_price || b.price));
        break;
      default:
        break;
    }
    setFilteredProducts(result);
  };

  const handleFilter = () => applyFilters(products);


  const title = categoryId
    ? categories.find((cat) => cat.id === Number(categoryId))?.title || `Category ${categoryId}`
    : location.pathname === '/all-sales' ? 'Discounted items' : 'All products';

  if (prodStatus === 'loading') return <div>Loading...</div>;
  if (prodStatus === 'failed') return <div>Error loading data</div>;

  return (
    
    <div>
      <Header />
        <div className={style.main}>
          <h2>{title}</h2>
          <div className={style.product_filter}>
            <label>Price <input type="number" placeholder='from' value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} /></label>
            <label> <input type="number" placeholder='to' value={priceTo} onChange={(e) => setPriceTo(e.target.value)} /></label>
            {location.pathname !== '/all-sales' && !categoryId && (
              <label className={style.Discounted_items}> Discounted items<input type="checkbox" checked={discountOnly} onChange={(e) => setDiscountOnly(e.target.checked)} /> </label>
            )}
            <p>Sorted</p>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="by default">by default</option>
              <option value="newest">newest</option>
              <option value="price: high-low">price: high-low</option>
              <option value="price: low-high">price: low-high</option>
            </select>
            
          </div>
          <div className={style.prod_Card}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
          </div>
        </div>
    </div>
  );
}

export default AllProducts;