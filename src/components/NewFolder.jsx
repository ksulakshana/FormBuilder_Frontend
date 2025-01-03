import React from "react";
import styles from "./NewFolder.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { createFolder, getAllFoldersForWorkspace } from "../services/folder";
function NewFolder({ openModal, closeModal, selectedWS }) {
  // const selectedWS = selectedWS;
  let modalRef = useRef();
  const [currentWS, setCurrentWS] = useState("");
  useEffect(() => {
    document.addEventListener("mousedown", checkClickOutside);
    setCurrentWS(selectedWS);
  });

  function checkClickOutside(e) {
    if (
      { openModal } &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      closeModal(false);
    }
  }

  const [formData, setFormData] = useState({
    title: "",
    workspace: currentWS,
  });

  const [error, setError] = useState({
    title: false,
  });

  const saveNewFolder = async (e) => {
    let isError = false;
    e.preventDefault();

    Object.keys(errorMessages).forEach((key) => {
      if (!errorMessages[key].isValid) {
        isError = true;
        errorMessages[key].onError();
      }
    });

    if (!isError) {
      try {
        const res = await createFolder(formData);
        if (res.status === 201) {
          alert("Folder Created Successfully");
          closeModal(false);
          location.reload();
        } else {
          alert("Something went wrong");
        }
      } catch (e) {
        if (e.response.status === 400) {
          alert("Invalid Data");
        }
        if (e.response.status === 401) {
          alert("Please Login/Register to Create a folder");
        }
      }
    }
  };

  const errorMessages = {
    title: {
      message: "Title is required",
      isValid: formData.title.length > 0,
      onError: () => {
        setError((error) => ({ ...error, title: true }));
      },
    },
  };

  return (
    <div className={styles.newFolder}>
      <form className={styles.modalContainer} ref={modalRef} method="POST">
        <p className={styles.heading}>Create New Folder</p>
        <input type="hidden" name="workspace" value={currentWS} />
        <input
          name="title"
          type="text"
          placeholder="Enter folder name"
          className={styles.folderName}
          value={formData.title}
          onChange={(e) => {
            setFormData({
              ...formData,
              title: e.target.value,
              workspace: currentWS,
            });
          }}
        />
        {error["title"] ? (
          <p className={styles.errorMessage}>
            {errorMessages["title"].message}
          </p>
        ) : null}

        <div className={styles.actionLinks}>
          <Link className={styles.doneLink} onClick={saveNewFolder}>
            Done
          </Link>
          <span></span>
          <Link className={styles.cancelLink} onClick={() => closeModal(false)}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default NewFolder;
