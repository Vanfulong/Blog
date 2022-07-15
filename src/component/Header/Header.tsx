import { Avatar, Dropdown } from "flowbite-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ActionType } from "../../@type/action";
import { AuthContext } from "../../context/authContext";
import { Data } from "../New feed/NewFeed";

const Header = ({ loginSuccess }: { loginSuccess: boolean }) => {
  const [hide, setHide] = useState(true);

  const { dispatch } = useContext(AuthContext);
  const handleLogoutClick = () => {
    dispatch({ type: ActionType.Logout });
  };
  const divStyle = {
    "margin-top": " 0.75rem !important",
  };
  return (
    <div className="w-full flex justify-between items-center px-4 py-4 md:px-6 bg-white border-b">
      <Link className="uppercase text-blue-500 text-3xl cursor-pointer" to="/">
        blog
      </Link>
      <div className="flex">
        {loginSuccess ? (
          <Link
            to="/add-new-post"
            className="my-3 mr-5 text-blue-500 bg-white hover:bg-blue-50 border border-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Đăng bài
          </Link>
        ) : (
          ""
        )}

        {!loginSuccess ? (
          <Link
            className="my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            to="/login"
          >
            Đăng nhập
          </Link>
        ) : (
          <>
            <div className="my-3">
              <Dropdown
                label={
                  <Avatar
                    alt="User settings"
                    img="https://img.icons8.com/color/344/user.png"
                    rounded={true}
                    bordered={true}
                  />
                }
                arrowIcon={false}
                inline={true}
                style={{ marginTop: " 0.75rem !important" }}
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    {JSON.parse(localStorage.getItem("userInfor") ?? "").name}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {JSON.parse(localStorage.getItem("userInfor") ?? "").email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                  <Link to="/profile">Tài khoản</Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogoutClick}>
                  Đăng xuất
                </Dropdown.Item>
              </Dropdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
