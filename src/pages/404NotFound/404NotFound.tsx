import Header from "../../component/Header/Header";

const NotFound = () => {
  return (
    <>
      <Header loginSuccess />
      <div className="text-center text-4xl font-bold mt-8">
        Page Not Found Sorry the page you were looking for cannot be found.
      </div>
    </>
  );
};

export default NotFound;
