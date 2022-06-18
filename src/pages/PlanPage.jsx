import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { logout } from "../features/userSlice";
import { AiOutlineCheck } from "react-icons/ai";
import { products, users } from "../firebase";
import { getDocs, setDoc, doc } from "firebase/firestore";
import Table from "../components/Table";
//import { BiLoaderAlt } from "react-icons/bi";
import {
  showSubscriptionDetail,
  selectSubscription,
} from "../features/subscriptionSlice";
import { useNavigate } from "react-router-dom";

export default function PlanPage() {
  const navigate = useNavigate();
  const subscription = useSelector(selectSubscription);
  const [prod, setProducts] = useState([]); //useState() hook, sets initial state to an empty array
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    async function unsubscribe() {
      const item = await getDocs(products);

      const productItem = item.docs.map((doc) => ({
        id: doc.id, //id and data pushed into productItems array
        ...doc.data(),
      }));

      setProducts(productItem);
      setSelectedPlan(productItem[2]);
    }
    unsubscribe();
  }, []);

  const dispatch = useDispatch();
  const handleClick = () => {
    auth.onAuthStateChanged(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  const manageSubscription = () => {
    if (subscription) navigate("/");
    navigate(-1);
  };

  async function setData(data) {
    await setDoc(doc(users, `${auth.currentUser.email}`), {
      productType: data,
      email: auth.currentUser.email,
      subscribed: true,
      activateTime: new Date().toLocaleString(),
      planEndTime: `${
        new Date().getMonth() + 2
      }/${new Date().getDate()}/${new Date().getFullYear()}`,
    });
  }
  const subscribeToPlan = () => {
    if (!auth) return;

    dispatch(showSubscriptionDetail({ subscription: true }));

    setData(selectedPlan?.name);
    navigate("/");
  };

  return (
    <div>
      <header className="border-b border-white/10 bg-[#141414] ">
        <img
          alt=""
          src="https://rb.gy/ulxxee"
          width={150}
          height={90}
          className="cursor-pointer object-contain"
          onClick={manageSubscription}
        />

        <button
          className="text-lg font-medium hover:underline"
          onClick={handleClick}
        >
          Sign Out
        </button>
      </header>
      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-lg md:text-3xl font-medium">
          Choose the plan that's right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-sm md:text-lg">
            <AiOutlineCheck className=" h-5 w-5 md:h-7 md:w-7 text-[#E50914]" />{" "}
            Watch all you want. Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-sm md:text-lg">
            <AiOutlineCheck className=" h-5 w-5 md:h-7 md:w-7 text-[#E50914]" />{" "}
            Recommendations just for you.
          </li>
          <li className="flex items-center gap-x-2 text-sm md:text-lg">
            <AiOutlineCheck className=" h-5 w-5 md:h-7 md:w-7 text-[#E50914]" />{" "}
            Change or cancel your plan anytime.
          </li>
        </ul>

        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center self-end md:w-3/5">
            {prod.map((product) => (
              <div
                className={`planBox ${
                  selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"
                }`}
                key={product.id}
                onClick={() => setSelectedPlan(product)} //here if i have directly called the stateSetter i.e setSelectedPlan then it is getting called soon after the component mount stage, and keeps on rerender the state and getting stuck into loops. hence ()=> setSelected()
              >
                {product.name}
              </div>
            ))}
          </div>
          <Table products={prod} selectedPlan={selectedPlan} />
          <button
            disabled={!selectedPlan}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] `}
            onClick={subscribeToPlan}
          >
            Subscribe
          </button>
        </div>
      </main>
    </div>
  );
}
