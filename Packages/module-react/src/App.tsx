import React from 'react';
import './App.css'
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment",
};

const WebcamCapture = () => {
  const webcamRef = React.useRef<Webcam>(null);
  const capture = React.useCallback(
    () => {
      if (webcamRef.current !== null) {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc)
        console.log(webcamRef.current)
      }
    },
    [webcamRef]
  );
  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
};
function App() {
  return (
    <>
      <WebcamCapture />
    </>
  )
}

export default App
