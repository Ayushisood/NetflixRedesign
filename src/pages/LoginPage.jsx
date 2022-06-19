import React, { useState } from "react";
import SignUpPage from "./SignUpPage";

export default function LoginPage() {
  const [signIn, setSignIn] = useState(false);
  const [inputValue, setInputValue] = useState(null);

  const getInputValue = (event) => {
    // store the user input value
    setInputValue(event.target.value);
  };

  return (
    <div className="relative h-screen md:bg-cover md:bg-no-repeat md:bg-center md:bg-[url('https://rb.gy/p2hphi')] bg-black/75 ">
      <div>
        {/* Netflix logo */}
        <img
          className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
          src="https://rb.gy/ulxxee"
          width={150}
          height={150}
          alt="logo"
        />

        {/* Background effect */}
        <div className="w-screen h-screen z-1 bg-gradient-to-b opacity-80" />
      </div>

      <div>
        {signIn ? (
          <SignUpPage enteredValue={inputValue} />
        ) : (
          <div className="absolute top-1/3 text-center left-0 right-0 text-white z-1 mx-auto p-5 ">
            {/* Headings */}
            <h1 className="text-xl md:text-2xl mb-5 font-bold">
              Unlimited films, TV programmes and more.
            </h1>
            <h2 className="font-semibold text-lg md:text-xl mb-3">
              Watch anywhere. Cancel at any anytime.
            </h2>
            <h3 className="font-medium md:text-lg mb-2">
              Ready to watch? Enter your email to create or Restart your
              membership.
            </h3>

            {/* Form to enter email with a button */}
            <div className="m-5">
              <form>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input md:bg-white"
                  onChange={getInputValue}
                />
                <button
                  type="button"
                  onClick={() => setSignIn(true)}
                  className="font-semibold text-xl bg-red-700 text-white border-0 rounded cursor-pointer px-5 py-3  my-5 w-full md:w-1/3"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
