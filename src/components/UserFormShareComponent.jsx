import React from "react";
import styles from "./UserFormShareComponent.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import close_icon from "../assets/close_icon.png";
import sendInvite_Btn from "../assets/sendInvite_Btn.png";
import copyLink_Btn from "../assets/copyLink_Btn.png";

function UserFormShareComponent({ shareOpenModal, shareCloseModal }) {
  const navigate = useNavigate();
  const formParams = useParams();

  let modalRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", checkClickOutside);
  });

  function checkClickOutside(e) {
    if (
      { shareOpenModal } &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      shareCloseModal(false);
    }
  }

  const [formData, setFormData] = useState({
    email: "",
  });

  const [error, setError] = useState({
    email: false,
  });

  const errorMessages = {
    email: {
      message: "Title is required",
      isValid: formData.email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, title: true }));
      },
    },
  };

  const validateEmail = (e) => {
    e.preventDefault();
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!pattern.test(formData.email)) {
      alert("Please provide a valid email address");
      return false;
    } else {
      alert("Invite has been sent to the provided email address. Thank you!");
      shareCloseModal(false);
    }
  };

  function copy() {
    const copyLink = window.location.origin + "/form/" + formParams.formId;
    alert(copyLink + " Link Copied");
    navigator.clipboard.writeText(copyLink);
  }

  return (
    <div className={styles.shareContainer}>
      <form className={styles.shareModalContainer} ref={modalRef} method="POST">
        <Link
          className={styles.closeIcon}
          onClick={() => shareCloseModal(false)}
        >
          <img src={close_icon} />
        </Link>
        <br />
        <input
          id="email"
          name="email"
          type="email"
          className={styles.shareEmail}
          placeholder="Enter email id"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <br />
        <Link className={styles.sendInviteLink} onClick={validateEmail}>
          <img src={sendInvite_Btn} />
        </Link>
        <br />
        <span className={styles.copyLinkSpan}>Invite by link</span>
        <br />
        <Link className={styles.copyLink} onClick={copy}>
          <img src={copyLink_Btn} />
        </Link>
      </form>
    </div>
  );
}

export default UserFormShareComponent;
