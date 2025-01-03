import React from "react";
import styles from "./LandingPageHeader.module.css";
import { Link } from "react-router-dom";
import landingnavLink from "../assets/landingnavLink.png";

function LandingPageHeader() {
  return (
    <>
      <div className={styles.leftSection}>
        <Link to="/">
          <img src={landingnavLink} alt="LandingNav Logo" />
        </Link>
      </div>
      <div className={styles.rightSection}>
        <Link to="/login" className={styles.signInBox}>
          Sign in
        </Link>
        <Link to="/home" className={styles.createFormBox}>
          Create a FormBot
        </Link>
      </div>
    </>
  );
}

export default LandingPageHeader;
