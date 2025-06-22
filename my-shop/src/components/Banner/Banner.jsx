import style from './Banner.module.css';
function Banner() {
  return (
     <div className={style.main}>
        <div className={style.cont}>
          <h1>Amazing Discounts on Garden Products!</h1>
          <button>Check out</button>
        </div>
     </div>
  );
}

export default Banner;