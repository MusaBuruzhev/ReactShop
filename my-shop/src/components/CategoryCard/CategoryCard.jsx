import { Link } from 'react-router-dom';
import style from "./CategoryCard.module.css";

function CategoryCard({ id, title, image }) {
  return (
    <div className={style.card}>
      <Link className={style.category_card} to={`/category/${id}`}>
        <img src={`http://localhost:3333`+image}  alt={title} />
        <h3>{title}</h3>
      </Link>
    </div>
  );
}

export default CategoryCard;