import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth, users } from "../firebase";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDocs } from "firebase/firestore";
import { showSubscriptionDetail } from "../features/subscriptionSlice";

export default function SignUpPage({ enteredValue }) {
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState(false); //check if login btn is pressed

  const setUser = (uid, email) => {
    dispatch(login({ uid: uid, email: email }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (event) => {
    if (isLogin) {
      //if user is signing in

      await signInWithEmailAndPassword(auth, event.email, event.password)
        .then((user) => {
          // console.log(auth);
          setUser(auth.currentUser.uid, auth.currentUser.email);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      //if user registers for first time
      await createUserWithEmailAndPassword(auth, event.email, event.password)
        .then((user) => {
          setUser(auth.currentUser.uid, auth.currentUser.email);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  //if user clicks on sign in, fetch his details from firebase
  const handleSignIn = () => {
    setLogin(true);

    async function unsubscribe() {
      const item = await getDocs(users);

      const productItem = item.docs.map((doc) => ({
        id: doc.id, //id and data pushed into productItems array
        ...doc.data(),
      }));

      const userProduct = productItem.filter(
        (product) => product.id === auth?.currentUser.email
      );

      dispatch(
        showSubscriptionDetail({ subscription: userProduct[0]?.subscribed })
      );
    }
    unsubscribe();
  };

  return (
    <div className="absolute top-5 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 ">
      <form
        className="mt-24 space-y-8 w-screen rounded md:bg-black/75 py-10 px-8 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          {/* input email */}
          <label className="inline-block w-full">
            <input
              type="email"
              value={enteredValue}
              className={`input`}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>

          {/* input password */}
          <label className="inline-block w-full">
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className={`input `}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        {/* sign in button */}
        <button
          className="w-full rounded bg-[#E50914] py-3 font-semibold"
          onClick={handleSignIn}
          type="submit"
        >
          Sign In
        </button>

        {/* sign up button */}
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            className="cursor-pointer text-white hover:underline"
            onClick={() => setLogin(false)}
            type="submit"
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
}
