// src/components/TelegramLogin.jsx
import React, { useEffect } from "react";

const TelegramLogin = () => {
  useEffect(() => {
    // Inject Telegram widget script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.async = true;
    script.setAttribute("data-telegram-login", "bonoauthbot"); // Replace with your bot
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "true");
    script.setAttribute(
      "data-auth-url",
      "http://localhost:3000/api/telegram/auth"
    );
    script.setAttribute("data-request-access", "write");

    document.getElementById("telegram-button").appendChild(script);

    return () => {
      document.getElementById("telegram-button").innerHTML = "";
    };
  }, []);

  return (
    <div>
      <h1>Complete Profile with Telegram</h1>
      <div id="telegram-button"></div>
    </div>
  );
};

export default TelegramLogin;
