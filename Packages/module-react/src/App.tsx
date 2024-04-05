import React from 'react';
import './App.css'
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment",
};

const WebcamCapture = () => {
  const [text, setText] = React.useState<string>("");
  const webcamRef = React.useRef<Webcam>(null);
  const capture = React.useCallback(
    async () => {
      if (webcamRef.current !== null) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc !== null) {
          const result = await window.electron.recognizeText(imageSrc);
          console.log(result);
          setText(result);
        }
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
      <p>{text}</p>
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
