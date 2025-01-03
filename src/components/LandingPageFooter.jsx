import React from "react";
import styles from "./LandingPageFooter.module.css";
import landingnavLink from "../assets/landingnavLink.png";
import footersvg from "../assets/footersvg.png";
import { Link } from "react-router-dom";
function LandingPageFooter() {
  return (
    <>
      <div className={styles.footerCol1}>
        <img src={landingnavLink} alt="LandingNav Logo" />
        <p>
          Made with ❤️ by <br />
          <span>@cuvette</span>
        </p>
      </div>
      <div className={styles.footerCol2}>
        <p className={styles.footerHeadings}>Product</p>
        <div className={styles.footerList}>
          <Link>
            Status&nbsp;
            <img src={footersvg} />
          </Link>
          <Link>
            Documentation&nbsp;
            <img src={footersvg} />
          </Link>
          <Link>
            Roadmap&nbsp;
            <img src={footersvg} />
          </Link>
          <Link>
            Pricing&nbsp;
            <img src={footersvg} />
          </Link>
        </div>
      </div>
      <div className={styles.footerCol3}>
        <p className={styles.footerHeadings}>Community</p>
        <div className={styles.footerList}>
          <Link>
            Discord&nbsp;
            <img src={footersvg} />
          </Link>
          <Link>
            GitHub repository&nbsp;
            <img src={footersvg} />
          </Link>
          <Link>
            Twitter&nbsp;
            <img src={footersvg} />
          </Link>
          <Link>
            LinkedIn&nbsp;
            <img src={footersvg} />
          </Link>
          <Link>
            OSS Friends&nbsp;
            <img src={footersvg} />
          </Link>
        </div>
      </div>
      <div className={styles.footerCol4}>
        <p className={styles.footerHeadings}>Company</p>
        <div className={styles.footerList}>
          <Link>About</Link>
          <Link>Contact</Link>
          <Link>Terms of Service</Link>
          <Link>Privacy Policy</Link>
        </div>
      </div>
    </>
  );
}

export default LandingPageFooter;
