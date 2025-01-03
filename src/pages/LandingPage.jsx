import React from "react";
import styles from "./LandingPage.module.css";
import LandingPageHeader from "../components/LandingPageHeader";
import LandingPageFooter from "../components/LandingPageFooter";
import blue_arc from "../assets/blue_arc.png";
import orange_arc from "../assets/orange_arc.png";
import { Link } from "react-router-dom";
import landingCenterimage from "../assets/landingCenterImage.png";
function LandingPage() {
  return (
    <div className={styles.landingPageContainer}>
      <div className={styles.landingHeader}>
        <LandingPageHeader />
      </div>
      <div className={styles.landingPageMiddleSection}>
        <div className={styles.upperMiddleSection}>
          <img className={styles.orangearc} src={orange_arc} alt="orange arc" />
          <div className={styles.middleContent}>
            <p className={styles.landingHeading1}>
              Build advanced chatbots visually
            </p>
            <p className={styles.landingHeading2}>
              Typebot gives you powerful blocks to create unique chat
              experiences. Embed them anywhere on your web/mobile apps and start
              collecting results like magic.
            </p>
            <Link to="/home">Create a FormBot for free</Link>
          </div>
          <img className={styles.bluearc} src={blue_arc} alt="blue arc" />
        </div>
        <div className={styles.lowerMiddleSection}>
          <img src={landingCenterimage} />
        </div>
      </div>
      <div className={styles.landingFooter}>
        <LandingPageFooter />
      </div>
    </div>
  );
}

export default LandingPage;
