import React, { useState, useEffect } from "react";
import {updateProfile} from "firebase/auth";
import { stylesColor } from "./UploadConfig";

export default function UploadImg({ currentUser }) {
  const [myWidget, setmyWidget] = useState({});

  useEffect(() => {
    var myWidgetConect = window.cloudinary.createUploadWidget(
      {
        cloudName: "dokwep38h",
        uploadPreset: "ok2cosyd",
        language: "en",
        buttonClass: "bg-action",
        // text: translationEn,
        styles: stylesColor,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          updateProfile(currentUser, {
            photoURL: result.info.url
          })
        }
      }
    );
    myWidgetConect.open();
    myWidgetConect.close();
    setmyWidget(myWidgetConect); // eslint-disable-next-line
  }, []);

  async function uploadImage() {
    await myWidget.open();
  }

  return (
    <div onClick={() => uploadImage()}>
      {/* <Button variant="contained" color="primary" onClick={() => uploadImage()}>
        Subir foto
      </Button> */}
      <svg
        enablBackground="new 0 0 29 30"
        height="30px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 29 30"
        width="29px"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <rect
            height="22.68"
            transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 10.4473 37.3449)"
            width="10.846"
            x="7.536"
            y="5.169"
          />
          <path d="M27.638,3.996l-2.46-2.459c-1.357-1.358-3.56-1.358-4.917,0l-1.725,1.724l7.67,7.669l1.725-1.724   C29.288,7.848,28.997,5.354,27.638,3.996z" />
          <polygon points="0,30 7.088,30 0,22.28  " />
        </g>
      </svg>
    </div>
  );
}
