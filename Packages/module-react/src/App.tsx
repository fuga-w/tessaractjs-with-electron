import React from 'react';
import './App.css'
import Webcam from "react-webcam";
import {recognize} from "module-tessaract/web"

const WebcamCapture = ({deviceId}: {deviceId: string}) => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    deviceId: { exact: deviceId }
  };
  const [text, setText] = React.useState<string>("");
  const webcamRef = React.useRef<Webcam>(null);
  const capture = React.useCallback(
    async () => {
      if (webcamRef.current !== null) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc !== null) {
          const result = await recognize(imageSrc)
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

const DeviceSelector = ({setDeviceId}: {setDeviceId: (deviceId: string) => void}) => {
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const handleDevices = React.useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]
  );

  return (
    <>
      {devices.map((device) => (
        DeviceInfo({deviceId: device.deviceId, deviceLabel: device.label, setDevice: setDeviceId})
        ))}
    </>
  );
};

const DeviceInfo = ({ deviceId, deviceLabel, setDevice }: {deviceId: string, deviceLabel: string, setDevice: (deviceId: string) => void}) => {
  return (
    <div>
      <p>DeviceLabel: {deviceLabel}</p>
      <button onClick={() => setDevice(deviceId)}>Select</button>
    </div>
  )

}
function App() {
  const [deviceId, setDeviceId] = React.useState<string>("");
  return (
    <>
    {deviceId === "" ? <DeviceSelector setDeviceId={setDeviceId} /> : <WebcamCapture deviceId={deviceId} />}
    </>
  )
}

export default App
