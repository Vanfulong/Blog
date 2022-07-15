import { doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import Footer from "../../component/Footer/Footer";
import Header from "../../component/Header/Header";
import { Data } from "../../component/New feed/NewFeed";
import { AuthContext } from "../../context/authContext";
import { db } from "../../firebase";

const Account = () => {
  const { state } = useContext(AuthContext);
  const temp: Data = JSON.parse(localStorage.getItem("userInfor") || "{}");
  const [dateOfBirth, setDateOfBirth] = useState(
    temp.dateOfBirth ?? "1/1/1999"
  );
  const [email, setEmail] = useState(temp.email);
  const [gender, setGender] = useState(temp.gender ?? true);
  const [name, setName] = useState(temp.name);

  const handleOkButtonClick = async (e: any) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", state.currentUser.uid), {
        dateOfBirth: dateOfBirth,
        gender: gender,
        email: email,
        name: name,
      });
      localStorage.setItem(
        "userInfor",
        JSON.stringify({
          dateOfBirth: dateOfBirth,
          gender: gender,
          email: email,
          name: name,
        })
      );
      alert("Da thay doi thong tin thanh cong");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header loginSuccess />
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold">Thong tin tai khoan</h1>
        <form
          className="flex w-[60%] m-auto flex-col"
          onSubmit={handleOkButtonClick}
        >
          <label
            htmlFor="base-input"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Ten
          </label>
          <input
            type="text"
            id="base-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
          <label
            htmlFor="base-input"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Gioi tinh
          </label>
          <div className="flex">
            <div className="flex items-center mr-4">
              <input
                checked={gender}
                onChange={(e) => setGender(e.target.checked)}
                id="default-radio-1"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Nam
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={!gender}
                onChange={(e) => setGender(!e.target.checked)}
                id="default-radio-2"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Nu
              </label>
            </div>
          </div>
          <label
            htmlFor="base-input"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="text"
            id="base-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
          <label
            htmlFor="base-input"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Ngay sinh
          </label>
          <input
            type="text"
            id="base-input"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
          <button
            type="submit"
            className="flex  mx-auto my-7 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Xac Nhan
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Account;
