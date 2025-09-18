import { Scanner } from "@yudiel/react-qr-scanner";

export default function CameraCapture({ onQrDecoded }) {
  return (
    <div className="w-72 h-72 rounded-xl border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:border-primary transition relative">
      <Scanner
        onScan={(result) => {
          if (result) {
            console.log("QR decoded:", result);
          }
        }}
      />

      <span className="absolute bottom-2 bg-primary text-white px-3 py-1 rounded">
        Scanning...
      </span>
    </div>
  );
}
