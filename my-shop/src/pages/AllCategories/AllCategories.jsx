import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/categoriesSlice';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Header from '../../components/Header/Header';
import style from './AllCategories.module.css'
import Contacts from '../../components/Contacts/Contacts';

function AllCategories() {
  const dispatch = useDispatch();
  const { items: categories, status: catStatus } = useSelector((state) => state.categories);

  useEffect(() => {
    if (catStatus === 'idle') dispatch(fetchCategories());
  }, [dispatch, catStatus]);

  if (catStatus === 'loading') return <div>Loading...</div>;
  if (catStatus === 'failed') return <div>Error loading data</div>;

  return (
    <div>
      <Header />

      <div className={style.main_categori}>
      
      <h2>All Categories</h2>
      <div className={style.categorie}>
      {categories.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
      </div>
    </div>
      <Contacts/>
    </div>
    
  );
}

export default AllCategories;