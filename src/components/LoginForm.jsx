import React from "react";
import { useState } from "react";
import styles from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import Google_Icon from "../assets/Google_Icon.png";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const errorMessages = {
    email: {
      message: "Email is required or User Exists",
      isValid: formData.email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, email: true }));
      },
    },
    password: {
      message: "Password is required",
      isValid: formData.password.length > 0,
      onError: () => {
        setError((error) => ({ ...error, password: true }));
      },
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let isError = false;

    Object.keys(errorMessages).forEach((key) => {
      if (!errorMessages[key].isValid) {
        isError = true;
        errorMessages[key].onError();
      }
    });

    if (!isError) {
      try {
        const res = await login(formData);
        if (res.status === 200) {
          alert("Logged in successfully");
          const token = res.data.token;
          localStorage.setItem("token", token);
          navigate("/home");
        } else {
          alert("Something went wrong");
        }
      } catch (e) {
        if (e.response.status === 400) {
          alert("Invalid email or password");
        }
        if (e.response.status === 401) {
          alert("Invalid email or password");
        }
      }
    }
  };

  return (
    <>
      <form method="POST" className={styles.loginFormContainer}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        {error["email"] ? (
          <p className={styles.errorMessage}>
            {errorMessages["email"].message}
          </p>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="**********"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        {error["password"] ? (
          <p className={styles.errorMessage}>
            {errorMessages["password"].message}
          </p>
        ) : null}

        <button className={styles.loginButton} type="button" onClick={onSubmit}>
          Log In
        </button>
        <br />
        <span className={styles.paraOR}>OR</span>
        <button className={styles.loginButton} type="button" onClick={onSubmit}>
          <p>
            <img src={Google_Icon} />
          </p>
          <span>Sign In with Google</span>
        </button>
        <br />
        <p className={styles.loginLink}>
          Don’t have an account?&nbsp;
          <Link to="/register">
            <span>Register now</span>
          </Link>
        </p>
      </form>
    </>
  );
}

export default LoginForm;
