import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import { getUserData, updateUser } from "../services/auth";
import logoutLink from "../assets/logoutLink.png";
import { Link, useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  let root = document.querySelector(":root");
  const [user, setUser] = useState();

  useEffect(() => {
    getUserData()
      .then((res) => {
        if (!res.data) {
          alert("please login to visit the dashboard page");
          navigate("/login");
        }
        setUser(res.data.userdata.name);
        if (res.data.userdata.theme == "dark") {
          root.classList.toggle("dark");
          document.body.classList.remove("light");
        } else {
          root.classList.toggle("light");
          document.body.classList.add("light");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const logoutAction = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    alert("logged out");
    navigate("/login");
  };

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
  };
  return (
    <div className={styles.settingsContainer}>
      <form method="POST" className={styles.settingsFormContainer}>
        <p>Settings</p>

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
          Update
        </button>
      </form>
      <div className={styles.logoutLink}>
        <Link onClick={logoutAction}>
          <img src={logoutLink} />
        </Link>
      </div>
    </div>
  );
}

export default Settings;
