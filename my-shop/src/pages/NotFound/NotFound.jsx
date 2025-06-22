import Header from '../../components/Header/Header';
import img from '../../assets/404.png'
import style from './NotFound.module.css'
import Contacts from '../../components/Contacts/Contacts';
function NotFound() {

  return (
    <div>
      <Header />
        <div className={style.cont}>
          <img src={img} alt="" />
          <h2>Page Not Found</h2>
          <p>We’re sorry, the page you requested could not be found.Please go back to the homepage.</p>
          <a href="/">Go Home</a>
        </div>
        <Contacts/>
    </div>
  );
}

export default NotFound;