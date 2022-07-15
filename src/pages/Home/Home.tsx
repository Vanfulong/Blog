import React, { useContext } from "react";
import Footer from "../../component/Footer/Footer";
import Header from "../../component/Header/Header";
import NewFeed from "../../component/New feed/NewFeed";
import { AuthContext } from "../../context/authContext";

const Home = () => {
  const { state } = useContext(AuthContext);
  document.title = "Trang chủ - Blog";
  return (
    <div>
      <Header loginSuccess={state.loginSuccess} />
      <NewFeed />
      <Footer />
    </div>
  );
};

export default Home;
