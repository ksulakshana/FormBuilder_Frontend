import React from "react";
import styles from "./LoginPage.module.css";
import login_triangle from "../assets/register_triangle.png";
import pink_ellipse from "../assets/pink_ellipse.png";
import yellow_ellipse from "../assets/yellow_ellipse.png";
import arrow_back from "../assets/arrow_back.png";
import LoginForm from "../components/LoginForm";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginNav}>
        <Link onClick={() => navigate(-1)}>
          <img src={arrow_back} />
        </Link>
      </div>
      <div className={styles.loginMidSection}>
        <img className={styles.login_triangle} src={login_triangle} />
        <div className={styles.loginFormDiv}>
          <LoginForm />
        </div>
        <img className={styles.pink_ellipse} src={pink_ellipse} />
      </div>
      <div className={styles.yellow_ellipse_div}>
        <img className={styles.yellow_ellipse} src={yellow_ellipse} />
      </div>
    </div>
  );
}

export default LoginPage;
