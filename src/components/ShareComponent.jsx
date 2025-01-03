import React from "react";
import styles from "./ShareComponent.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import close_icon from "../assets/close_icon.png";
import sendInvite_Btn from "../assets/sendInvite_Btn.png";
import copyLink_Btn from "../assets/copyLink_Btn.png";

function ShareComponent({ shareOpenModal, shareCloseModal }) {
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

  return (
    <div className={styles.shareContainer}>
      <form className={styles.shareModalContainer} ref={modalRef} method="POST">
        <Link
          className={styles.closeIcon}
          onClick={() => shareCloseModal(false)}
        >
          <img src={close_icon} />
        </Link>

        <div className={styles.editorviewPanel}>
          <span>Invite by Email</span>
          <select className={styles.selectEditMode}>
            <option>Edit</option>
            <option>View</option>
          </select>
        </div>

        {/* <input
          name="title"
          type="text"
          placeholder="Enter folder name"
          className={styles.folderName}
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
          }}
        /> */}

        <input
          name="email"
          type="text"
          className={styles.shareEmail}
          placeholder="Enter email id"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />

        <Link className={styles.sendInviteLink}>
          <img src={sendInvite_Btn} />
        </Link>
        <span className={styles.copyLinkSpan}>Invite by link</span>
        <Link className={styles.copyLink}>
          <img src={copyLink_Btn} />
        </Link>
      </form>
    </div>
  );
}

export default ShareComponent;
