import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/authContext";
import { ActionType } from "../../@type/action";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
export interface user {
  account: string;
  password: string;
}
const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLoginButtonClick = async (e: user) => {
    try {
      const res = await signInWithEmailAndPassword(auth, e.account, e.password);
      const docs = await getDoc(doc(db, "users", res.user.uid));
      dispatch({ type: ActionType.Login, payload: res.user });
      localStorage.setItem("userInfor", JSON.stringify(docs.data()));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    validationSchema: Yup.object({
      account: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required"),
    }),
    onSubmit: (value) => {
      handleLoginButtonClick(value);
    },
  });

  return (
    <div className="flex bg-gray-50 h-[100vh]">
      <div className="w-96 max-w-[100%] m-auto mt-1 bg-white shadow-lg rounded-lg ">
        <p className=" uppercase text-2xl text-center m-4 ">Đăng nhập</p>
        <div>
          <form
            className="flex flex-col p-5 border-y"
            onSubmit={formik.handleSubmit}
          >
            <span className="text-lg mt-3 mb-2">Tài khoản</span>
            <input
              type="text"
              name="account"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg forcus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@company.com"
              value={formik.values.account}
              onChange={formik.handleChange}
            />
            {formik.errors.account && formik.touched.account && (
              <p className="text-red-600 text-base">{formik.errors.account}</p>
            )}
            <span className="text-lg mt-3 mb-2">Mật khẩu</span>
            <input
              type="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600 text-base">{formik.errors.password}</p>
            )}
            <button
              type="submit"
              className="w-full my-7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Đăng nhập
            </button>
          </form>
        </div>
        <div>
          <p className="text-center mt-8">
            Chưa có tài khoản ?
            <Link to="/register" className="text-blue-800 cursor-pointer">
              Đăng ký
            </Link>
          </p>
          <p className="text-center mt-3 mb-8 text-blue-800 cursor-pointer">
            Lấy lại tài khoản?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
