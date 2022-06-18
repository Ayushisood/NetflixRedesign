import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { users } from "../firebase";
import { getDocs } from "firebase/firestore";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import PlanPage from "./PlanPage";
import {
  showSubscriptionDetail,
  selectSubscription,
} from "../features/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subscription = useSelector(selectSubscription);
  const [prod, setProducts] = useState([]); //useState() hook, sets initial state to an empty array
  const [changePlan, setChangePlan] = useState(false);

  useEffect(() => {
    async function unsubscribe() {
      const item = await getDocs(users);

      const productItem = item.docs.map((doc) => ({
        id: doc.id, //id and data pushed into productItems array
        ...doc.data(),
      }));

      const userProduct = productItem.filter(
        (product) => product.id === auth?.currentUser.email
      );
      setProducts(userProduct);
    }
    unsubscribe();
  }, []);

  const handleClick = () => {
    auth.onAuthStateChanged(() => {
      dispatch(logout());
      dispatch(showSubscriptionDetail({ subscription: false }));
    });
  };

  const manageSubscription = () => {
    dispatch(showSubscriptionDetail({ subscription: false }));
    handleClick();
  };

  const handleChange = () => {
    setChangePlan(true);
  };
  return (
    <div>
      {changePlan ? (
        <PlanPage />
      ) : (
        <>
          <header className={`bg-[#141414]`}>
            <NavLink to="/">
              <img
                src="https://rb.gy/ulxxee"
                width={120}
                height={120}
                className="cursor-pointer object-contain"
                alt=""
              />
            </NavLink>

            <img
              src="https://rb.gy/g1pwyx"
              alt=""
              className="cursor-pointer rounded"
            />
          </header>
          <main className="pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all md:px-10">
            <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
              <h1 className="text-3xl md:text-4xl">Account</h1>
              <div className="-ml-0.5 flex items-center gap-x-1.5">
                <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
                <p className="text-sm font-semibold text-[#555]">
                  Member since {prod[0]?.activateTime}
                </p>
              </div>
            </div>

            {/* membership */}
            <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
              {" "}
              <div className="space-y-2 py-4">
                <h4 className="text-lg text-[gray]">Membership & Billing</h4>
                <button
                  disabled={!subscription}
                  className="h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
                  onClick={manageSubscription}
                >
                  Cancel Membership
                </button>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
                  <div>
                    <p className="font-medium">{auth.currentUser.email}</p>
                    <p className="text-[gray]">Password: ********</p>
                  </div>
                  <div className="md:text-right">
                    <p className="membershipLink">Change email</p>
                    <p className="membershipLink">Change password</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
                  <div>
                    <p>
                      {prod[0]?.activateTime
                        ? "Your membership will end on "
                        : "Your next billing date is "}
                      {prod[0]?.planEndTime}
                    </p>
                  </div>
                  <div className="md:text-right">
                    <p className="membershipLink">Manage payment info</p>
                    <p className="membershipLink">Add backup payment method</p>
                    <p className="membershipLink">Billing Details</p>
                    <p className="membershipLink">Change billing day</p>
                  </div>
                </div>
              </div>
            </div>

            {/* current plan */}
            <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
              <h4 className="text-lg text-[gray]">Plan Details</h4>
              <div className="col-span-2 font-medium">
                {prod[0]?.productType}
              </div>
              <p
                className="cursor-pointer text-blue-500 hover:underline md:text-right"
                onClick={handleChange}
              >
                Change plan
              </p>
            </div>

            {/* log out */}
            <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
              <h4 className="text-lg text-[gray]">Settings</h4>
              <p
                className="col-span-3 cursor-pointer text-blue-500 hover:underline"
                onClick={handleClick}
              >
                Sign out of all devices
              </p>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
