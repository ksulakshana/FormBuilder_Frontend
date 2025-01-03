import React from "react";
import styles from "./DeleteConfirmation.module.css";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteFolder } from "../services/folder";
function DeleteConfirmation({ deleteOpenModal, deleteCloseModal, folderId }) {
  let modalRef = useRef();
  const [foldersId, setFoldersId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setFoldersId(folderId);

    document.addEventListener("mousedown", checkClickOutside);
  });
  function checkClickOutside(e) {
    if (
      { deleteOpenModal } &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      deleteCloseModal(false);
    }
  }

  const deleteFolders = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteFolder(foldersId);
      if (res.status === 200) {
        alert("Folder deleted Successfully");
        deleteCloseModal(false);
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
        alert("Please Login/Register to Create a folder");
      }
    }
  };

  return (
    <div className={styles.deleteContainer}>
      <div className={styles.deleteModalContainer} ref={modalRef}>
        <p className={styles.deleteHeading}>
          Are you sure you want to delete this folder ?
        </p>
        <div className={styles.deleteActionLinks}>
          <Link className={styles.deleteConfirmLink} onClick={deleteFolders}>
            Confirm
          </Link>
          <span></span>
          <Link
            className={styles.deleteCancelLink}
            onClick={() => deleteCloseModal(false)}
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
