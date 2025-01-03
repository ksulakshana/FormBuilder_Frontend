import React, { useState, useEffect } from "react";
import styles from "./Analytics.module.css";
import { Link, useParams } from "react-router-dom";
import shareBtn from "../assets/shareBtn.png";
import saveFile from "../assets/saveFile.png";
import close_icon from "../assets/close_icon.png";
import { getUserData, updateUser } from "../services/auth";
import ResponseData from "../components/ResponseData";

function Analytics() {
  const [isToggled, setIsToggled] = useState(true);
  const [user, setUser] = useState();

  let root = document.querySelector(":root");

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

  const formParams = useParams();

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
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.analyticsTopSection}>
        <div className={styles.fileMiddleSection}>
          {/* <Link to="/createForm/new">Flow</Link>
          <Link to="#">Response</Link> */}
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
            <Link className={styles.shareBtn}>
              <img src={shareBtn} />
            </Link>
          )}
          <Link
            className={styles.saveFile}
            onClick={() =>
              handleDataFromNewFileComponent(dataFromNewFileComponent)
            }
          >
            <img src={saveFile} />
          </Link>
          <Link className={styles.cancelFile}>
            <img src={close_icon} />
          </Link>
        </div>
      </div>
      <div className={styles.analyticsBottomSection}>
        {formParams && formParams.formId == "new" ? (
          <p>No Response yet collected</p>
        ) : (
          <ResponseData />
        )}
      </div>
    </div>
  );
}

export default Analytics;
