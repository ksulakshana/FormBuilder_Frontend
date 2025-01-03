import React, { useState, useEffect } from "react";
import styles from "./UserForm.module.css";
import bubble from "../assets/bubble.png";
import landingCenterImage from "../assets/landingCenterImage.png";
import sendButton from "../assets/sendButton.png";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getFormData } from "../services/file";
import {
  startUserForm,
  completeUserForm,
  addViewCount,
  addStartCount,
  addCompleteCount,
} from "../services/userform";

function UserForm() {
  let root = document.querySelector(":root");
  const [form, setForm] = useState([]);
  const formParams = useParams();
  const [inputText, setInputText] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputNumber, setInputNumber] = useState();
  const [inputPhone, setInputPhone] = useState();
  const [inputDate, setInputDate] = useState();
  const [inputRating, setInputRating] = useState();
  const [formArray, setFormArray] = useState({});
  const obj = {};
  const navigate = useNavigate();

  useEffect(() => {
    root.classList.toggle("light");
    document.body.classList.add("light");

    getFormData(formParams.id)
      .then((res) => {
        if (!res.data) {
          alert("No form exists with this Id");
        }
        setForm(res.data.formData);
        const countId = { formId: formParams.id };
        addViewCounts(countId);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const addViewCounts = (countId) => {
    addViewCount(countId)
      .then((res) => {
        if (!res.data) {
          alert("No form exists with this Id");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addStartCounts = (countId) => {
    addStartCount(countId)
      .then((res) => {
        if (!res.data) {
          alert("No form exists with this Id");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addCompleteCounts = (countId) => {
    addCompleteCount(countId)
      .then((res) => {
        if (!res.data) {
          alert("No form exists with this Id");
        }
        window.location.reload(countId);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const submitForm = (e) => {
    e.preventDefault();

    const field_length = form.fields.length;
    for (var i = 0; i < field_length; i++) {
      const fieldName = form.fields[i].fieldCount;
      const fieldValues = form.fields[i].values;
      if (fieldName.includes("bubble")) {
        obj[fieldName] = fieldValues;
      } else {
        if (fieldName.includes("Rating")) {
          const collection = document.getElementsByName(fieldName);
          for (let i = 0; i < collection.length; i++) {
            if (collection[i].hasAttribute("selected")) {
              obj[fieldName] = collection[i].value;
            }
          }
        } else {
          const element = document.getElementById(fieldName).value;
          obj[fieldName] = element;
        }
      }
    }

    completeUserForm(formParams.id, obj)
      .then((res) => {
        if (!res.data) {
          alert("No form exists with this Id");
        }
        const countId = { formId: formParams.id };
        alert("Thank you for submitting the form");
        addCompleteCounts(countId);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleList = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = "#ff8e21";
    setInputRating(e.target.value);
    e.target.setAttribute("selected", "true");
  };

  return (
    <div className={styles.userMainContainer}>
      <form className={styles.userFormContainer} method="POST">
        {form.fields &&
          form.fields.map((value1, index) => (
            <>
              {value1.type === "bubble" ? (
                <div key={index} className={styles.bubble}>
                  {value1.fieldName === "text" ? (
                    <>
                      <img src={bubble} className={styles.bubbleImg} />
                      <p className={styles.bubblePara}>{value1.values}</p>
                    </>
                  ) : (
                    <>
                      <img src={bubble} className={styles.bubbleImg} />
                      <img
                        className={styles.bubble_uploadedImg}
                        src={landingCenterImage}
                      />
                    </>
                  )}
                </div>
              ) : (
                <div key={index} className={styles.input}>
                  {value1.fieldName === "text" && (
                    <>
                      <input
                        id={value1.fieldCount}
                        name={value1.fieldCount}
                        type="text"
                        placeholder="Enter Your Text"
                        className={styles.inputTextFromUser}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                      />
                      <img src={sendButton} />
                    </>
                  )}
                  {value1.fieldName === "number" && (
                    <>
                      <input
                        id={value1.fieldCount}
                        name={value1.fieldCount}
                        type="number"
                        placeholder="Enter a number"
                        className={styles.inputTextFromUser}
                        value={inputNumber}
                        onChange={(e) => setInputNumber(e.target.value)}
                      />
                      <img src={sendButton} />
                    </>
                  )}
                  {value1.fieldName === "email" && (
                    <>
                      <input
                        id={value1.fieldCount}
                        name={value1.fieldCount}
                        type="email"
                        placeholder="Enter your email"
                        className={styles.inputTextFromUser}
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                      />
                      <img src={sendButton} />
                    </>
                  )}
                  {value1.fieldName === "phone" && (
                    <>
                      <input
                        id={value1.fieldCount}
                        name={value1.fieldCount}
                        type="number"
                        placeholder="Enter your phone"
                        className={styles.inputTextFromUser}
                        value={inputPhone}
                        onChange={(e) => setInputPhone(e.target.value)}
                      />
                      <img src={sendButton} />
                    </>
                  )}
                  {value1.fieldName === "date" && (
                    <>
                      <input
                        id={value1.fieldCount}
                        name={value1.fieldCount}
                        placeholder="Select a date"
                        className={styles.inputTextFromUser}
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        value={inputDate}
                        onChange={(e) => setInputDate(e.target.value)}
                      />
                      <img src={sendButton} />
                    </>
                  )}
                  {value1.fieldName === "rating" && (
                    <>
                      <ul
                        id={value1.fieldCount}
                        // name={value1.fieldCount}
                        className={styles.selections}
                        value={inputRating}
                      >
                        <li
                          name={value1.fieldCount}
                          onClick={handleList}
                          value="1"
                        >
                          1
                        </li>
                        <li
                          name={value1.fieldCount}
                          onClick={handleList}
                          value="2"
                        >
                          2
                        </li>
                        <li
                          name={value1.fieldCount}
                          onClick={handleList}
                          value="3"
                        >
                          3
                        </li>
                        <li
                          name={value1.fieldCount}
                          onClick={handleList}
                          value="4"
                        >
                          4
                        </li>
                        <li
                          name={value1.fieldCount}
                          onClick={handleList}
                          value="5"
                        >
                          5
                        </li>
                      </ul>
                      <img src={sendButton} />
                    </>
                  )}
                  {value1.fieldName === "button" && (
                    <>
                      <button
                        id={value1.fieldCount}
                        name={value1.fieldCount}
                        className={styles.inputTextFromUser}
                        onClick={submitForm}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          ))}
      </form>
    </div>
  );
}

export default UserForm;
