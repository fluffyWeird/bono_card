import crypto from "crypto";

export function verifyTelegramData(data, botToken) {
  const secretKey = crypto.createHash("sha256").update(botToken).digest();
  const checkString = Object.keys(data)
    .filter((k) => k !== "hash")
    .sort()
    .map((k) => `${k}=${data[k]}`)
    .join("\n");

  const hmac = crypto
    .createHmac("sha256", secretKey)
    .update(checkString)
    .digest("hex");

  return hmac === data.hash;
}
