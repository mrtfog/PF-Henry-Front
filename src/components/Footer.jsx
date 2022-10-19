import React from "react";
import { Link } from "react-router-dom";
import style from "../scss/components/_footer.module.scss";

export default function Footer() {
  return (
    <footer>
      <div className={style.footer_container}>
        <div className={`${style.left} ${style.box}`}>
          <h2>About us</h2>
          <div className={style.content}>
            <p>
              We want to entertain the world. Whatever your taste, and no matter
              where you live, we give you access to best-in-class movies, both
              in our movie theaters and at home. Our subscribers control what
              they want to watch, when they want it, with no ads, in one simple
              subscription. We’re always looking to help you find your next
              favorite story.
            </p>
            <div className={style.social}>
              {/* ------------------------------------- FACEBOOK LOGO -------------------------------------*/}

              <a href="#">
                <span className={`${style.fab} ${style.fa_facebook_f}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    height="40px"
                    width="40px"
                    fill="#000"
                  >
                    <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
                  </svg>
                </span>
              </a>

              {/* ------------------------------------- INSTAGRAM LOGO -------------------------------------*/}

              <a href="#">
                <span className={`${style.fab} ${style.fa_instagram}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    height="40px"
                    width="40px"
                    fill="#000"
                  >
                    <path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z" />
                  </svg>
                </span>
              </a>

              {/* ------------------------------------- TWITTER LOGO -------------------------------------*/}

              <a href="#">
                <span className={`${style.fab} ${style.fa_twitter}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    height="40px"
                    width="40px"
                    fill="#000"
                  >
                    <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className={`${style.center} ${style.box}`}>
          <h2>Address & Contact</h2>
          <div className={style.content}>
            <div className={style.place}>
              {/* ------------------------------------- ADDRESS LOGO -------------------------------------*/}

              <span className={`${style.fas} ${style.fa_map_marker_alt}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  height="40px"
                  width="40px"
                  fill="#000"
                >
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
                </svg>
              </span>
              <div>
                <p className={style.text}>Buenos Aires - Argentina</p>
                <p className={style.text}>Lima - Perú.</p>
              </div>
            </div>

            {/* ------------------------------------- PHONE LOGO -------------------------------------*/}

            <div className={style.phone}>
              <span className={`${style.fas} ${style.fa_phone_alt}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  height="40px"
                  width="40px"
                  fill="#000"
                >
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                </svg>
              </span>
              <p className={style.text}>0800-999-9999</p>
            </div>

            {/* ------------------------------------- EMAIL LOGO -------------------------------------*/}
            <div className={style.email}>
              <span className={`${style.fas} ${style.fa_email_alt}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  height="40px"
                  width="40px"
                  fill="#000"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
              </span>
              <p className={style.text}>henry.pf.notifications@gmail.com</p>
            </div>
          </div>
        </div>
        <div className={`${style.right} ${style.box}`}>
          <h2>
            Your opinion matters, <br /> help us to improve.
          </h2>
          <div className={style.content}>
            <h4>Leave us a review! </h4>
            <Link to="/reviews">
              <button className={style.reviewBtn}>Send</button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
