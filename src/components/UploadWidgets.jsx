import { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dkc3wexlc",
        uploadPreset: "uploadPreset1",
      },
      function (error, result) {
        if (result) {
          console.log("result");
          if (result.info.secure_url !== undefined)
            alert(result.info.secure_url);
        } else {
          console.log(error);
        }
      }
    );
  }, []);

  return (
    <div>
      <button onClick={() => widgetRef.current.open()}>Upload</button>
    </div>
  );
};

export default UploadWidget;
