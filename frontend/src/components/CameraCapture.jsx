import { Scanner } from "@yudiel/react-qr-scanner";

export default function CameraCapture({ onQrDecoded }) {
  return (
    <div className="w-72 h-72 rounded-xl border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:border-primary transition relative">
      <Scanner
        onScan={(result) => {
          if (result) {
            console.log("QR decoded:", result);

            // Send only the QR text to the backend
            fetch("/api/process-qr-text", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ qrText: result }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Backend response:", data);
                if (onQrDecoded) onQrDecoded(data);
              })
              .catch((err) => console.error(err));
          }
        }}
        onError={(err) => console.error(err?.message)}
        style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
      />

      <span className="absolute bottom-2 bg-primary text-white px-3 py-1 rounded">
        Scanning...
      </span>
    </div>
  );
}
