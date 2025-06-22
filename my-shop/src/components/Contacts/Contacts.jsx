import style from './Contacts.module.css';
import img1 from '../../assets/ic-instagram.png'
import img2 from '../../assets/ic-whatsapp.png'
function Contacts() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Contact</h1>
      <div className={style.infoSection}>
        <div className={style.ContactsInfo}>
          <div className={style.infoCard}>
            <h2 className={style.sectionTitle}>Phone</h2>
            <p className={style.text}>+7 (499) 350-66-04</p>
          </div>
          <div className={style.infoCard}>
            <h2 className={style.sectionTitle}>Address</h2>
            <p className={style.text}>Dubininskaya Ulitsa, 96, Moscow, Russia, 115093</p>
          </div>
        </div>
    
        
        <div className={style.ContactsInfo} >
         <div className={style.infoCard}>
            <h2 className={style.sectionTitle}>Social</h2>
            <div className={style.socialIcons}>
              <div className={style.socialIcon}><img src={img1} alt="" /></div>
              <div className={style.socialIcon}><img src={img2} alt="" /></div>
            </div>
          </div>
        



          <div className={style.infoCard}>
              <h2 className={style.sectionTitle}>Working Hours</h2>
              <p className={style.text}>24 hours a day</p>
          </div>

        </div>
       
      </div>
      <div className={style.mapContainer}>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A0078e14aa4c6f945da2fea0649ad05c0e97b7fd588f396b606215fb067788848&source=constructor"
          className={style.map}
          title="map"
        ></iframe>
      </div>
    </div>
  );
}

export default Contacts;