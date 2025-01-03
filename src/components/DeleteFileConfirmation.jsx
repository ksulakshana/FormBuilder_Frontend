import React from "react";
import styles from "./DeleteFileConfirmation.module.css";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteForm } from "../services/file";

function DeleteFileConfirmation({
  deleteFileOpenModal,
  deleteFileCloseModal,
  fileId,
}) {
  let modalRef = useRef();
  const [filesId, setFilesId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setFilesId(fileId);

    document.addEventListener("mousedown", checkClickOutside);
  });
  function checkClickOutside(e) {
    if (
      { deleteFileOpenModal } &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      deleteFileCloseModal(false);
    }
  }

  const deleteFile = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteForm(filesId);
      if (res.status === 200) {
        alert("File deleted Successfully");
        deleteFileCloseModal(false);
        location.reload();
      } else {
        alert("Something went wrong");
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        alert("Invalid Data");
      }
      if (e.response.status === 401) {
        alert("Please Login/Register to Create a file");
      }
    }
  };

  return (
    <div className={styles.deleteContainer}>
      <div className={styles.deleteModalContainer} ref={modalRef}>
        <p className={styles.deleteHeading}>
          Are you sure you want to delete this file ?
        </p>
        <div className={styles.deleteActionLinks}>
          <Link className={styles.deleteConfirmLink} onClick={deleteFile}>
            Confirm
          </Link>
          <span></span>
          <Link
            className={styles.deleteCancelLink}
            onClick={() => deleteFileCloseModal(false)}
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeleteFileConfirmation;
