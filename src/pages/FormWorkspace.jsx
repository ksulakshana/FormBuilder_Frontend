import React, { useState, useEffect } from "react";
import styles from "./FormWorkspace.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import shareBtn from "../assets/shareBtn.png";
import saveFile from "../assets/saveFile.png";
import close_icon from "../assets/close_icon.png";
import { getUserData, updateUser } from "../services/auth";
import NewFile from "../components/NewFile";
import { createForm } from "../services/file";
import NewFileWithId from "../components/NewFileWithId";
import { getFormData } from "../services/file";
import UserFormShareComponent from "../components/UserFormShareComponent";

function FormWorkspace() {
  const [isToggled, setIsToggled] = useState(true);
  const [user, setUser] = useState();
  const [dataFromNewFileComponent, setDataFromNewFileComponent] = useState("");
  let root = document.querySelector(":root");
  const formParams = useParams();
  const [formTitle, setFormTitle] = useState();
  const [shareOpenModal, setshareOpenModal] = useState(false);
  const navigate = useNavigate();
  const [workspaceId, setWorkspaceId] = useState(
    localStorage.getItem("WorkingWorkspaceId")
  );

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

  function handleDataFromNewFileComponent(data) {
    setDataFromNewFileComponent(data);
  }

  const shareHandleModalOpen = () => {
    setshareOpenModal(true);
  };

  const saveData = async (dataFromNewFileComponent) => {
    const title = document.getElementsByName("title")[0];
    const titleName = title.value;
    if (title.value == "") {
      alert("Please provide a name for the Form");
      return;
    }
    const formData = [
      { title: titleName },
      { fieldData: dataFromNewFileComponent },
      { wsId: workspaceId },
    ];
    try {
      const res = await createForm(formData);
      if (res.status === 201) {
        alert("Form Created Successfully");
        location.reload();
      } else if (res.status === 400) {
        alert(res.response.data.message);
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
      } else {
      }
    }
  };

  useEffect(() => {
    getUserData()
      .then((res) => {
        if (!res.data) {
          alert("please login to visit the dashboard page");
          navigate("/login");
        }
        setUser(res.data.userdata.name);
        if (res.data.userdata.theme == "dark") {
          setIsToggled(true);
          root.classList.toggle("dark");
          document.body.classList.remove("light");
        } else {
          setIsToggled(false);
          root.classList.toggle("light");
          document.body.classList.add("light");
        }
        if (formParams.formId != "new") {
          getFormData(formParams.formId)
            .then((res) => {
              if (!res.data) {
                alert("No form exists with this Id");
                navigate("/login");
              }
              setFormTitle(res.data.formData.name);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className={styles.workspaceContainer}>
      <div className={styles.workspaceTopSection}>
        <div className={styles.fileNameInput}>
          {formParams && formParams.formId == "new" ? (
            <input
              name="title"
              type="text"
              placeholder="Enter Form Name"
              value={formTitle}
              onChange={(e) => {
                setFormTitle(e.target.value);
              }}
            />
          ) : (
            <input
              name="title"
              type="text"
              placeholder="Enter Form Name"
              value={formTitle}
              onChange={(e) => {
                setFormTitle(e.target.value);
              }}
              disabled
            />
          )}
        </div>
        <div className={styles.fileMiddleSection}>
          {formParams && formParams.formId == "new" ? (
            <Link to="/createform/new">Flow</Link>
          ) : (
            <Link to={`/createform/${formParams.formId}`}>Flow</Link>
          )}
          {formParams && formParams.formId == "new" ? (
            <Link to="/analytics/new">Response</Link>
          ) : (
            <Link to={`/analytics/${formParams.formId}`}>Response</Link>
          )}
        </div>
        <div className={styles.fileRightSection}>
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
          {formParams && formParams.formId == "new" ? (
            <Link
              className={styles.disabledCursor}
              onClick={(event) => {
                event.preventDefault();
                alert("Please save the form to share");
              }}
            >
              <img src={shareBtn} />
            </Link>
          ) : (
            <Link className={styles.shareBtn} onClick={shareHandleModalOpen}>
              <img src={shareBtn} />
            </Link>
          )}
          <Link
            className={styles.saveFile}
            onClick={() => saveData(dataFromNewFileComponent)}
          >
            <img src={saveFile} />
          </Link>
          <Link className={styles.cancelFile}>
            <img src={close_icon} />
          </Link>
        </div>
      </div>
      <div className={styles.workspaceBottomSection}>
        {formParams && formParams.formId == "new" ? (
          <NewFile
            sendDataBack={handleDataFromNewFileComponent}
            props={formParams.formId}
          />
        ) : (
          <NewFileWithId
            sendDataBack={handleDataFromNewFileComponent}
            props={formParams.formId}
          />
        )}
      </div>
      {shareOpenModal && (
        <UserFormShareComponent shareCloseModal={setshareOpenModal} />
      )}
    </div>
  );
}

export default FormWorkspace;
