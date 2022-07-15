import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/404NotFound/404NotFound";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
// import AddNewPost from "./pages/Post/AddNewPost/AddNewPost";
import Post from "./pages/Post/Post";
import Register from "./pages/Register/Register";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { useContext, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ActionType } from "./@type/action";
import Account from "./pages/Account/Account";
import AddNewPost from "./pages/Post/AddNewPost/AddNewPost";
import EditPost from "./pages/Post/EditPost/EditPost";
// import EditPost from "./pages/Post/EditPost/EditPost";
function App() {
  const { state, dispatch } = useContext(AuthContext);
  const CheckAuth = async () => {
    if (state.loginSuccess) {
      const docRef = doc(db, "users", state.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        dispatch({ type: ActionType.Logout });
        alert("Vui long dang nhap");
      }
    }
  };
  const RequireAuth = ({ children }: { children: any }) => {
    CheckAuth();
    return state.loginSuccess ? children : <Navigate to="/login" />;
  };
  const RequireLogin = ({ children }: { children: any }) => {
    CheckAuth();
    if (state.loginSuccess) {
      alert("Vui long dang xuat truoc khi dang nhap/dang ki tai khoan khac");
    }
    return state.loginSuccess ? <Navigate to="/" /> : children;
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route />
        <Route
          path="/login"
          element={
            <RequireLogin>
              <Login />
            </RequireLogin>
          }
        />
        <Route
          path="/register"
          element={
            <RequireLogin>
              <Register />
            </RequireLogin>
          }
        />
        <Route path="post/:id" element={<Post />} />
        <Route
          path="add-new-post"
          element={
            <RequireAuth>
              <AddNewPost />
            </RequireAuth>
          }
        />
        <Route
          path="edit/:id"
          element={
            <RequireAuth>
              <EditPost />
            </RequireAuth>
          }
        />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <Account />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
