import { Camera } from "lucide-react";
import React from "react";
import ScanQr from "./ScanQr";
const Body = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6">
      {/* Title Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">Scan QR Code</h2>
        <h3 className="text-sm text-gray-500">
          Position the FAN number on Fayda ID within the frame
        </h3>
      </div>

      {/* Camera Placeholder */}
      <div className="w-72 h-72 rounded-xl border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:border-primary transition">
        {/* Later replace this with your Camera component */}
        <span className="text-gray-400">
          <ScanQr />
        </span>
      </div>
      <div>
        <Camera />{" "}
        {/*capture icon so it is obvious and for the backend to process the qr to get the key*/}
      </div>
    </div>
  );
};

export default Body;
