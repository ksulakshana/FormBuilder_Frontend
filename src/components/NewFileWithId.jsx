import React, { useState, useEffect, useRef } from "react";
import styles from "./NewFileWithId.module.css";
import textIcon from "../assets/textIcon.png";
import imageIcon from "../assets/imageIcon.png";
import videoIcon from "../assets/videoIcon.png";
import gifIcon from "../assets/gifIcon.png";
import inputTextIcon from "../assets/inputTextIcon.png";
import numberIcon from "../assets/numberIcon.png";
import emailIcon from "../assets/emailIcon.png";
import phoneIcon from "../assets/phoneIcon.png";
import dateIcon from "../assets/dateIcon.png";
import ratingIcon from "../assets/ratingIcon.png";
import buttonsIcon from "../assets/buttonsIcon.png";
import startIcon from "../assets/startIcon.png";
import delete_icon from "../assets/delete_icon.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { getFormData } from "../services/file";

function NewFileWithId({ sendDataBack, props }) {
  const [dataFields, setDataFields] = useState([{}]);
  const [myList, setMyList] = useState(dataFields);

  const inputRef = React.useRef(null);
  const [file, setFile] = useState();
  const [inputValue, setInputValue] = useState();
  const [count, setCount] = useState(0);
  const [steps, setSteps] = useState({});
  const [form, setForm] = useState([]);

  function handleTextValue(e) {
    setSteps({
      [e.target.name]: {
        value: e.target.value,
      },
    });

    const myNextList = [...dataFields];
    const textValue = myNextList.find((a) => a.fieldCount === e.target.name);
    textValue.values = e.target.value;
    setMyList(myNextList);
  }

  const handleClick = async (value, field) => {
    setCount(count + 1);

    if (value.includes("bubble")) {
      setDataFields((prevDataFields) => [
        ...prevDataFields,
        {
          fieldName: field,
          fieldCount: value + "_" + count,
          type: "bubble",
          values: steps,
        },
      ]);
    } else {
      setDataFields((prevDataFields) => [
        ...prevDataFields,
        {
          fieldName: field,
          fieldCount: value + "_" + count,
          type: "input",
          values: "",
        },
      ]);
    }
  };

  const handleButtonClick = (e) => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    var filevalue = "";
    if (files.length > 0) {
      const file = files[0];
      setFile(file);
      filevalue = file.name;
    } else {
      setFile(null);
    }
    var tmppath = URL.createObjectURL(e.target.files[0]);

    const myNextList = [...dataFields];
    const fileName = myNextList.find((a) => a.fieldCount === e.target.name);
    fileName.values = filevalue;
    setMyList(myNextList);
  };

  useEffect(() => {
    getFormData(props)
      .then((res) => {
        if (!res.data) {
          alert("No form exists with this Id");
          navigate("/login");
        }
        setForm(res.data.formData);
      })
      .catch((e) => {
        console.log(e);
      });

    const myNextList = [...dataFields];
    setMyList(myNextList);
    sendDataBack(dataFields);
  }, [dataFields, inputRef, inputValue, steps]);

  return (
    <>
      <div className={styles.createFileLeftSection}>
        <div className={styles.bubbles}>
          <span>Bubbles</span>
          <div className={styles.bubbleFields}>
            <Link onClick={() => handleClick("bubbleText", "text")}>
              <img src={textIcon} />
              <span>Text</span>
            </Link>
            <Link onClick={() => handleClick("bubbleImage", "image")}>
              <img src={imageIcon} />
              <span>Image</span>
            </Link>
            <p>
              <img src={videoIcon} />
              <span>Video</span>
            </p>
            <p>
              <img src={gifIcon} />
              <span>GIF</span>
            </p>
          </div>
        </div>
        <div className={styles.inputs}>
          <span>Inputs</span>
          <div className={styles.inputFields}>
            <Link onClick={() => handleClick("inputText", "text")}>
              <img src={inputTextIcon} />
              <span>Text</span>
            </Link>
            <Link onClick={() => handleClick("inputNumber", "number")}>
              <img src={numberIcon} />
              <span>Number</span>
            </Link>
            <Link onClick={() => handleClick("inputEmail", "email")}>
              <img src={emailIcon} />
              <span>Email</span>
            </Link>
            <Link onClick={() => handleClick("inputPhone", "phone")}>
              <img src={phoneIcon} />
              <span>Phone</span>
            </Link>
            <Link onClick={() => handleClick("inputDate", "date")}>
              <img src={dateIcon} />
              <span>Date</span>
            </Link>
            <Link onClick={() => handleClick("inputRating", "rating")}>
              <img src={ratingIcon} />
              <span>Rating</span>
            </Link>
            <Link onClick={() => handleClick("buttons", "button")}>
              <img src={buttonsIcon} />
              <span>Buttons</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.createFileRightSection}>
        <div className={styles.startIcon}>
          <img src={startIcon} />
          <span>Start</span>
        </div>
        {form.fields &&
          form.fields.map((value1, index) => (
            <div key={index} className={styles.formElements}>
              {value1.type === "bubble" ? (
                <div className={styles.bubbleDiv}>
                  {value1.fieldName === "text" ? (
                    <>
                      <span className={styles.bubbleHeading}>Text</span>
                      <input
                        type="text"
                        name={"bubbleText_" + index}
                        placeholder={value1.values}
                        value={inputValue}
                        onChange={handleTextValue}
                        required
                      />
                      <span className={styles.requiredField}>
                        Required Field
                      </span>
                    </>
                  ) : (
                    <>
                      <span className={styles.bubbleHeading}>Image</span>
                      <Link
                        name={"bubbleImage_" + index}
                        className={styles.addImageBubble}
                        onClick={handleButtonClick}
                      >
                        {file && (
                          <span name={"bubbleImage_" + index}>
                            {value1.values}
                          </span>
                        )}
                        {!file && (
                          <span name={"bubbleImage_" + index}>
                            Click to add Link
                          </span>
                        )}
                      </Link>
                      <input
                        name={"bubbleImage_" + index}
                        type="file"
                        id="file"
                        ref={inputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </>
                  )}
                  <Link>
                    <img className={styles.delete_icon} src={delete_icon} />
                  </Link>
                </div>
              ) : (
                <>
                  <div className={styles.inputDiv}>
                    {value1.fieldName === "text" && (
                      <>
                        <p>Input Text</p>
                        <p>Hint : User will input a text on his form</p>
                        <Link>
                          <img
                            className={styles.delete_icon}
                            src={delete_icon}
                          />
                        </Link>
                      </>
                    )}
                    {value1.fieldName === "number" && (
                      <>
                        <p>Input Number</p>
                        <p>Hint : User will input a number on his form</p>
                        <Link>
                          <img
                            className={styles.delete_icon}
                            src={delete_icon}
                          />
                        </Link>
                      </>
                    )}
                    {value1.fieldName === "email" && (
                      <>
                        <p>Input Email</p>
                        <p>Hint : User will input a email on his form</p>
                        <Link>
                          <img
                            className={styles.delete_icon}
                            src={delete_icon}
                          />
                        </Link>
                      </>
                    )}
                    {value1.fieldName === "phone" && (
                      <>
                        <p>Input Phone</p>
                        <p>Hint : User will input a phone on his form</p>
                        <Link>
                          <img
                            className={styles.delete_icon}
                            src={delete_icon}
                          />
                        </Link>
                      </>
                    )}
                    {value1.fieldName === "date" && (
                      <>
                        <p>Input Date</p>
                        <p>Hint : User will select a date</p>
                        <Link>
                          <img
                            className={styles.delete_icon}
                            src={delete_icon}
                          />
                        </Link>
                      </>
                    )}
                    {value1.fieldName === "rating" && (
                      <>
                        <p>Input Rate</p>
                        <p>Hint : User will tap to rate out of 5</p>
                        <Link>
                          <img
                            className={styles.delete_icon}
                            src={delete_icon}
                          />
                        </Link>
                      </>
                    )}
                    {value1.fieldName === "button" && (
                      <>
                        <p>Input Button</p>
                        <button></button>
                        <Link>
                          <img
                            className={styles.delete_icon}
                            src={delete_icon}
                          />
                        </Link>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
}

export default NewFileWithId;
