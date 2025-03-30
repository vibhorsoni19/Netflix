import React, { useState, useRef } from "react";
import { checkValidateData } from "../utils/validate";
import Header from "./Header";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
  };

  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);

    if (message) return;
    //do sign in and sign out
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          //update user profile
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShYwM33sSN7MtnLIq0k1qjhpoEtSstLE26gA&s",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("success", user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fbf440b2-24a0-49f5-b2ba-a5cbe8ea8736/web/IN-en-20250324-TRIFECTA-perspective_d7c906ec-0531-47de-8ece-470d5061c88a_small.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black bg-opacity-80 my-36 mx-auto right-0 left-0 text-white rounded-lg"
      >
        <h1 className="font-bold text-3xl py-5">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            placeholder="Name"
            ref={name}
            className="p-4 my-2 w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          ref={email}
          className="p-4 my-2 w-full bg-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="p-4 my-2 w-full bg-gray-700"
        />

        <p className="text-red-600 font-bold text-lg py-4">{errorMessage}</p>
        <button
          type="submit"
          className="py-4 my-6 bg-red-600 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? " New to Netflix Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
