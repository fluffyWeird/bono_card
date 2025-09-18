import React from "react";
import TelegramLogin from "./components/TelegramLogin";
import NavigationBar from "./components/NavigationBar";
import Body from "./components/Body";
import CameraCapture from "./components/CameraCapture";

const App = () => {
  return (
    <div className="px-6">
      <NavigationBar />
      <Body />
      {/* <CameraCapture /> */}
    </div>
  );
};

export default App;
