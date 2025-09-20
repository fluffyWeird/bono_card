import React, { useEffect } from "react";
import "../index.css";
const Login = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "bonoauthbot");
    script.setAttribute("data-size", "large");
    script.setAttribute(
      "data-auth-url",
      "https://bonoauth.senaycreatives.com/api/auth/telegram"
    );
    script.setAttribute("data-request-access", "write");
    script.async = true;
    document.getElementById("telegram-login-container").appendChild(script);
  }, []);
  return (
    <div
      data-theme="forest"
      className="flex min-h-screen items-center justify-center bg-base-200 p-4"
    >
      {/* Card container */}
      <div className="card w-full max-w-sm bg-base-100 shadow-xl rounded-2xl p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-base-content mb-6">
          Login with Telegram
        </h1>

        {/* Telegram login widget container */}
        <div
          id="telegram-login-container"
          className="flex justify-center mb-4"
        ></div>

        {/* Optional footer / note */}
        {/* <p className="text-sm text-center text-base-content/70 mt-4">
          By logging in, you agree to our{" "}
          <a href="#" className="link link-primary">
            terms
          </a>
          .
        </p> */}
      </div>
    </div>
  );
};

export default Login;
