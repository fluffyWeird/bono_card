// components/ScanQr.jsx
import { Scanner } from "@yudiel/react-qr-scanner";

export default function ScanQr() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Scanner
        onDecode={(result) => console.log("QR Result:", result)}
        onError={(error) => console.error(error?.message)}
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
}
