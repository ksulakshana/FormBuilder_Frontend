import React from "react";
import { useState } from "react";
import styles from "./RegisterForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth";
import Google_Icon from "../assets/Google_Icon.png";

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const errorMessages = {
    name: {
      message: "Name is required",
      isValid: formData.name.length > 0,
      onError: () => {
        setError((error) => ({ ...error, name: true }));
      },
    },
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
    confirmPassword: {
      message: "Password is required",
      isValid: formData.password == formData.confirmPassword,
      onError: () => {
        setError((error) => ({ ...error, confirmPassword: true }));
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
      const res = await register(formData);

      if (res.status === 201) {
        alert("Registered successfully");
        navigate("/login");
      } else if (res.data.message === "User Exists") {
        alert("User Exists");
        errorMessages["email"].onError();
      } else {
        alert(res.data.message);
      }
    }
  };

  return (
    <>
      <form method="POST" className={styles.registerFormContainer}>
        <label htmlFor="name">Username</label>
        <input
          name="name"
          type="text"
          placeholder="Enter a username"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
        {error["name"] ? (
          <p className={styles.errorMessage}>{errorMessages["name"].message}</p>
        ) : null}

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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="**********"
          value={formData.confirmPassword}
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e.target.value });
          }}
        />
        {error["confirmPassword"] ? (
          <p className={styles.errorMessage}>
            {errorMessages["confirmPassword"].message}
          </p>
        ) : null}

        <button className={styles.loginButton} type="button" onClick={onSubmit}>
          Sign Up
        </button>
        <br />
        <span className={styles.paraOR}>OR</span>
        <button className={styles.loginButton} type="button" onClick={onSubmit}>
          <p>
            <img src={Google_Icon} />
          </p>
          <span>Sign Up with Google</span>
        </button>
        <br />
        <p className={styles.loginLink}>
          Already have an account ?
          <Link to="/login">
            <span>Login</span>
          </Link>
        </p>
      </form>
    </>
  );
}

export default RegisterForm;
