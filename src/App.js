import { useEffect } from "react";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import PlanPage from "./pages/PlanPage";
import { getDocs } from "firebase/firestore";
import { auth, users } from "./firebase";
import {
  selectSubscription,
  showSubscriptionDetail,
} from "./features/subscriptionSlice";

function App() {
  const user = useSelector(selectUser); //for retrieving logged in user from userSlice store, where logged in user info is stored

  const isSubscribed = useSelector(selectSubscription);

  const dispatch = useDispatch();

  //on reload check if user is already signed in,fetch data from firebaes and set subscription state accordingly
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

      dispatch(
        showSubscriptionDetail({ subscription: userProduct[0]?.subscribed })
      );
    }
    unsubscribe();
  }, [isSubscribed, dispatch]);

  //checking if user is already signed in then set login state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      console.log(userAuth);
      // observe the state change in user's sign in activity
      if (userAuth) {
        dispatch(login({ uid: userAuth.uid, email: userAuth.email }));
      } else {
        //logged out
        dispatch(logout());
      }
    });

    return unsubscribe; // for cleanup the previous state
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        {!user ? (
          <LoginPage />
        ) : (
          <>
            {!isSubscribed ? (
              <PlanPage />
            ) : (
              <>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="detailScreen" element={<DetailPage />} />
                  <Route path="profileScreen" element={<ProfilePage />} />
                </Routes>
              </>
            )}
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
