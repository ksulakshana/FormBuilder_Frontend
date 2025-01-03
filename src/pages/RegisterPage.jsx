import React from "react";
import styles from "./RegisterPage.module.css";
import register_triangle from "../assets/register_triangle.png";
import pink_ellipse from "../assets/pink_ellipse.png";
import yellow_ellipse from "../assets/yellow_ellipse.png";
import arrow_back from "../assets/arrow_back.png";
import RegisterForm from "../components/RegisterForm";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerNav}>
        <Link onClick={() => navigate(-1)}>
          <img src={arrow_back} />
        </Link>
      </div>
      <div className={styles.registerMidSection}>
        <img className={styles.register_triangle} src={register_triangle} />
        <div className={styles.registerFormDiv}>
          <RegisterForm />
        </div>
        <img className={styles.pink_ellipse} src={pink_ellipse} />
      </div>
      <div className={styles.yellow_ellipse_div}>
        <img className={styles.yellow_ellipse} src={yellow_ellipse} />
      </div>
    </div>
  );
}

export default RegisterPage;
