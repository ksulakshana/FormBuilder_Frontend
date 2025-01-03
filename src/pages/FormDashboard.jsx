import React, { useState, useEffect } from "react";
import styles from "./FormDashboard.module.css";
import shareBtn from "../assets/shareBtn.png";
import { Link, useNavigate } from "react-router-dom";
import folder_icon from "../assets/folder_icon.png";
import delete_icon from "../assets/delete_icon.png";
import plus_icon from "../assets/plus_icon.png";
import { getUserData, updateUser } from "../services/auth";
import NewFolder from "../components/NewFolder";
import DeleteConfirmation from "../components/DeleteConfirmation";
import ShareComponent from "../components/ShareComponent";
import { getAllFoldersForWorkspace } from "../services/folder";
import { getAllForms } from "../services/file";

import {
  shareWorkspace,
  getUserAllWorkspace,
  getWorkspaceData,
  updateWorkspace,
} from "../services/workspace";

function FormDashboard() {
  const [isToggled, setIsToggled] = useState(true);
  const [user, setUser] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [shareOpenModal, setshareOpenModal] = useState(false);
  const [wsData, setWSData] = useState([]);
  const navigate = useNavigate();
  let root = document.querySelector(":root");
  const [selectedWS, setSelectedWS] = useState();
  const [folderData, setFolderData] = useState([]);
  const [folderId, setFolderId] = useState();
  const [fileData, setFileData] = useState([]);

  const toggleDark = async (value) => {
    let webtheme;
    if (value == false) {
      webtheme = "light";
      root.classList.toggle("light");
    } else {
      webtheme = "dark";
      root.classList.toggle("dark");
    }
    const formdata = { theme: webtheme };
    await updateUser(formdata)
      .then((res) => {
        location.reload();
      })
      .catch((e) => {
        console.log(e.message);
      });
    setIsToggled(!isToggled);
  };

  const handleModalOpen = (e) => {
    setOpenModal(true);
  };

  const handleDeleteModalOpen = (e) => {
    setFolderId(e.target.id);
    setDeleteOpenModal(true);
  };

  const shareHandleModalOpen = () => {
    setshareOpenModal(true);
  };

  const newSelection = (e) => {
    const home = "/home?" + e.target.value;
    if (e.target.value == "logout") {
      localStorage.removeItem("token");
      alert("logged out");
      navigate("/login");
    } else if (e.target.value == "settings") {
      navigate("/settings");
    } else {
      navigate(home);
    }
    setSelectedWS(e.target.value);
    localStorage.setItem("WorkingWorkspaceId", e.target.value);
  };

  useEffect(() => {
    getUserData()
      .then((res) => {
        if (!res.data) {
          alert("please login to visit the dashboard page");
          navigate("/login");
        }
        setUser(res.data.userdata.name);
        getUserAllWorkspace()
          .then((res) => {
            if (!res.data) {
              alert("No Dashboard!! Something is wrong.. Please register");
              navigate("/register");
            }
            setWSData(res.data.workspaceData);
            document.getElementById("wsSelect").selectedIndex = 0;
            var x = document.getElementById("wsSelect").selectedIndex;
            var y = document.getElementsByTagName("option");
            setSelectedWS(y[x].value);
            localStorage.setItem("WorkingWorkspaceId", y[x].value);

            getAllFoldersForWorkspace(y[x].value)
              .then((res) => {
                if (!res.data) {
                  alert("No Folders Created");
                }
                setFolderData(res.data.folderData);
                getFiles();
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((e) => {
            console.log(e);
          });
        if (res.data.userdata.theme == "dark") {
          setIsToggled(true);
          root.classList.toggle("dark");
          document.body.classList.remove("light");
        } else {
          setIsToggled(false);
          root.classList.toggle("light");
          document.body.classList.add("light");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [wsData]);

  const getFiles = () => {
    getAllForms()
      .then((res) => {
        if (res.data) {
          setFileData(res.data.formData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardTopSection}>
        <select
          id="wsSelect"
          className={styles.dashboardNavOptions}
          onChange={newSelection}
        >
          {wsData &&
            wsData.map((item, i) => (
              <>
                <option key={i} value={item._id}>
                  {item.name} Workspace
                </option>
                <option value="settings">Settings</option>
                <option value="logout">Logout</option>
              </>
            ))}
        </select>
        <div className={styles.toggleDiv}>
          <span>Light</span>
          <label className={styles.toggle_switch}>
            <input
              type="checkbox"
              checked={isToggled}
              onChange={() => toggleDark(!isToggled)}
            />
            <span className={styles.slider}></span>
          </label>
          &nbsp;&nbsp;&nbsp;
          <span>Dark</span>
        </div>
        <div className={styles.shareLink}>
          <Link className={styles.shareBtn} onClick={shareHandleModalOpen}>
            <img src={shareBtn} />
          </Link>
        </div>
      </div>
      <div className={styles.dashboardBottomSection}>
        <div className={styles.createFolderSection}>
          <Link className={styles.createFolder} onClick={handleModalOpen}>
            <img src={folder_icon} />
            <span>Create a folder</span>
          </Link>
          {folderData.map((folder, index) => (
            <div id={folder._id} className={styles.createdFolder} key={index}>
              <Link>
                <span>{folder.name}</span>
              </Link>
              <Link>
                <img
                  src={delete_icon}
                  onClick={handleDeleteModalOpen}
                  id={folder._id}
                />
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.createFileSection}>
          <div className={styles.createFile}>
            <Link to={`/createform/new`}>
              <img src={plus_icon} />
            </Link>
            <Link>
              <span>Create a typebot</span>
            </Link>
          </div>
          {openModal && (
            <NewFolder
              openModal={openModal}
              closeModal={setOpenModal}
              selectedWS={selectedWS}
            />
          )}
          {deleteOpenModal && (
            <DeleteConfirmation
              deleteCloseModal={setDeleteOpenModal}
              folderId={folderId}
            />
          )}

          {fileData.map((file, index) => (
            <div id={file._id} className={styles.createdFile} key={index}>
              <Link>
                <img
                  src={delete_icon}
                  onClick={handleDeleteModalOpen}
                  id={file._id}
                />
              </Link>
              <Link to={`/createform/${file._id}`}>
                <span>{file.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {shareOpenModal && <ShareComponent shareCloseModal={setshareOpenModal} />}
    </div>
  );
}

export default FormDashboard;
