import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchProducts } from '../../store/productsSlice';
import { fetchCategories } from '../../store/categoriesSlice';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Coupon from '../../components/Coupon/Coupon';
import ProductCard from '../../components/ProductCard/ProductCard';
import Contacts from '../../components/Contacts/Contacts';

import style from './Home.module.css';

function Home() {
  const dispatch = useDispatch();
  const { items: categories, status: catStatus } = useSelector((state) => state.categories);
  const { items: products, status: prodStatus } = useSelector((state) => state.products);

  useEffect(() => {
    if (catStatus === 'idle') dispatch(fetchCategories());
    if (prodStatus === 'idle') dispatch(fetchProducts());
  }, [dispatch, catStatus, prodStatus]);

  const discountedProducts = products
    .filter((p) => p.discont_price && p.discont_price < p.price)
    .slice(0, 4);

  if (catStatus === 'loading' || prodStatus === 'loading') return <div>Loading...</div>;
  if (catStatus === 'failed' || prodStatus === 'failed') return <div>Error loading data</div>;

  return (
    <>
      <Header />
      <Banner />
      <div className={style.title_cards}>
        <h2>Categories</h2>
        <div></div>
        <a href="/all-categories">All categories</a></div>
      <div className={style.categorie}>
        
        {categories.slice(0, 4).map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
      <Coupon />
      <div className={style.title_cards}>
        <h2>Sale</h2>
        <div></div>
        <a href="/all-sales">All sales</a>
      </div>
      <div className={style.prod_Card}>
        
        {discountedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <Contacts />
    </>
  );
}

export default Home;