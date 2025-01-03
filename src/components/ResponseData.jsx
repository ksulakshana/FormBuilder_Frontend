import React, { useState, useEffect } from "react";
import styles from "./ResponseData.module.css";
import ChartComponent from "./ChartComponent";
import { getAllUserForms, getCount } from "../services/userform";
import { useParams } from "react-router-dom";

function ResponseData() {
  const [formData, setFormData] = useState([]);
  const [formDataCount, setFormDataCount] = useState(0);
  const [fieldArrayHeading, setFieldArrayHeading] = useState([]);
  const formParams = useParams();
  const params = formParams.formId;
  const [viewCount, setViewCount] = useState();
  const [startCount, setStartCount] = useState();
  const [submitCount, setSubmitCount] = useState();

  useEffect(() => {
    getAllUserForms(params)
      .then((res) => {
        if (!res.data) {
          alert("No forms filled for this Id");
        }
        setFormDataCount(res.data.userFormData.length);
        setFormData(res.data.userFormData);
        const newArray = Object.keys(res.data.userFormData[0].fieldArray[0]);
        setFieldArrayHeading(newArray);
        getCounts(params);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const getCounts = (params) => {
    getCount(params)
      .then((res) => {
        if (!res.data) {
          alert("No forms filled for this Id");
        }
        setViewCount(res.data.totalCount.viewCount);
        setStartCount(res.data.totalCount.startCount);
        setSubmitCount(res.data.totalCount.submissionCount);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      {formData && formDataCount == 0 ? (
        <p>No Response yet collected</p>
      ) : (
        <>
          <div className={styles.firstDataSection}>
            <div className={styles.viewsCount}>
              <span>Views</span>
              <span>{viewCount}</span>
            </div>
            <div className={styles.startsCount}>
              <span>Starts</span>
              <span>{startCount}</span>
            </div>
          </div>
          <div className={styles.secondDataSection}>
            <table>
              <tr>
                <th></th>
                <th>Submitted at</th>
                {formData &&
                  fieldArrayHeading.map((value1, index) => (
                    <th key={index}>{value1}</th>
                  ))}
              </tr>
              {formData &&
                formData.map((v, i) => (
                  <tr>
                    <td></td>
                    <td>{v.completedDate}</td>
                    {v.fieldArray.map((v1, index2) => (
                      <>
                        {Object.entries(v1).map(([key, val]) => (
                          <td>{val}</td>
                        ))}
                      </>
                    ))}
                  </tr>
                ))}
            </table>
          </div>
          <div className={styles.chartSection}>
            {viewCount && (
              <ChartComponent
                viewCount={viewCount}
                startCount={startCount}
                submitCount={submitCount}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default ResponseData;
